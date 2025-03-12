from fastapi import APIRouter
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import redis
import asyncio
import orjson
import db

router = APIRouter()

@router.get("/prof")
async def prof(prof: str, course: str): 

    res = await asyncio.gather(db.get_prof_gpa(prof, course), db.get_prof_rating(prof))
    gpa, students = res[0]
    slug, rating = res[1]

    out = {"slug": slug, "rating": rating, "gpa": gpa, "students": students}

    return out


    
