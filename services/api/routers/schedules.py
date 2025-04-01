from fastapi import APIRouter, Request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import redis
import asyncio
import orjson
import db
import random

router = APIRouter()

@router.post("/schedule/upload")
async def upload(request: Request):
    # validate (sections, colors, semester)
    data = await request.json()

    if not (await db.verify_semester(data.get("semester"))):
        return {"success": False, "error": "invalid semester", "id": None}

    if len(data.get("sections")) > 50:
        return {"success": False, "error": "too many sections", "id": None}
    
    if len("".join(data.get("sections"))) > 500:
        return {"success": False, "error": "section names too long", "id": None}

    if len(data.get("sections")) != len(data.get("colors")):
        return {"success": False, "error": "sections and colors size don't match", "id": None}

    colorMap = {}

    for i,sec in enumerate(data.get("sections")):
        colorMap[sec] = data.get("colors")[i]
    
    alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" 
    id = random.choice(alpha)+random.choice(alpha)+random.choice(alpha)+random.choice(alpha)+random.choice(alpha)

    res = await db.save_schedule(id, data.get("semester"), colorMap, data.get("sections"))

    if not res:
        return {"success": False, "error": "couldn't upload to mongodb", "id": None}
    
    return {"success": True, "error": None,"id": res}

@router.get("/schedule/get")
async def get(id: str):
    res = await db.get_schedule(id)

    if res is None:
        return {"success": False, "schedule": None}

    return {"success":  True, "schedule": res}


    
