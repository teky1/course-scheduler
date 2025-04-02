import asyncio

import httpx
from bs4 import BeautifulSoup
from fastapi import APIRouter
import logging
import orjson
import db

router = APIRouter()

with open("locations.json") as f:
    location_map = orjson.loads(f.read())

@router.get("/traveltime/{loc1}/{loc2}")
async def traveltime(loc1: str, loc2: str, mode: str = "foot"):

    cache_key = f"travel:{loc1}:{loc2}:{mode}"
    cached = db.cache.get(cache_key)
    if cached:
        return orjson.loads(cached)
    
    try:
        time_secs = await get_travel_time(location_map[loc1], location_map[loc2], mode)
    except KeyError:
        return {"success": False, "error": "Couldn't find locations", "time_mins": 0, "time_secs": 0}
    
    time_mins = round(time_secs/60, 2)
    out = {"success": True, "error": "", "time_mins": time_mins, "time_secs": time_secs}

    db.cache.setex(cache_key, 60*60*24*7, orjson.dumps(out))

    return out


async def get_travel_time(coord1, coord2, mode):
    url = f"http://graphhopper-service:8989/" \
        + f"route?point={coord1[0]},{coord1[1]}" \
        + f"&point={coord2[0]},{coord2[1]}&profile={mode}"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        data = response.json()
    
    time_secs = data["paths"][0]["time"]//1000

    return time_secs
    