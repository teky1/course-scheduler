import asyncio

import httpx
from bs4 import BeautifulSoup
from fastapi import APIRouter
import loggin

router = APIRouter()

@router.get("/traveltime/{loc1}/{loc2}")
async def traveltime(loc1: str, loc2: str, mode: str = "foot"):

    coord1, coord2 = await asyncio.gather(
        get_coords(loc1),
        get_coords(loc2)
    )
    
    time_secs = await get_travel_time(coord1, coord2, mode)

    time_mins = round(time_secs/60, 2)
    return {"time_mins": time_mins, "time_secs": time_secs}


async def get_coords(loc: str):
    code = await get_numeric_building_code(loc)
    logging.info(f"Received Code for {loc}")
    coords = await get_coords_from_building_code(code)
    logging.info(f"Received Coords for {loc}")
    return coords

async def get_numeric_building_code(loc: str):
    if loc.strip().isnumeric():
        return int(loc.strip())
    
    bldg_code_endpoint = f"https://app.testudo.umd.edu/soc/buildings/{loc} 0"

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.get(bldg_code_endpoint)
        response.raise_for_status()
        html_content = response.text
    
    soup = BeautifulSoup(html_content, "html.parser")
    bldg_code = soup.find_all("span", class_="code")[1].get_text()
    return int(bldg_code)


async def get_coords_from_building_code(code: str):
    lat_long_data_url = "https://geodata.md.gov/imap/rest/services/Structure/MD_CampusFacilities/FeatureServer/2/query?where=1%3D1&outFields=*&outSR=4326&f=json"
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.get(lat_long_data_url)
        response.raise_for_status()
        data = response.json()

    for bldg in data["features"]:
        if int(bldg["attributes"]["BUILDINGID"]) != int(code):
            continue 
        
        vertices = bldg["geometry"]["rings"][0]
        lat, long = 0, 0
        for v in vertices:
            long += v[0]
            lat += v[1]
        lat /= len(vertices)
        long /= len(vertices)
        return (lat, long)
    
    return None


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
    