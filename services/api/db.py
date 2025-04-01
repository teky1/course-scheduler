from fastapi import APIRouter
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import redis

import logging
import orjson

with open("db_uri.txt") as f:
    uri = f.read()



mongo = MongoClient(uri, server_api=ServerApi('1'))
mongo.admin.command('ping')
logging.info("Connected to MongoDB")

cache = redis.Redis(host="redis", port=6379)
if cache.ping():
    logging.info("Connected to Redis")
else:
    logging.error("FAILED to connect to Redis")

async def verify_semester(semester):

    if cache.get(semester):
        return True
 
    collection = mongo["Metadata"]["all-semesters"]
    semesters = list(collection.find())

    for sem in semesters:
        cache.set(sem["_id"], 1)

    return bool(cache.get(semester))

async def save_schedule(id, semester, colorMap, sections):

    collection = mongo["Public"]["shared-schedules"]

    doc = {
        "_id": id,
        "semester": semester,
        "colorMap": colorMap,
        "sections": sections
    }

    result = collection.insert_one(doc)
    return result.inserted_id if result.acknowledged else None

async def get_schedule(id):
    collection = mongo["Public"]["shared-schedules"]

    res = collection.find_one({"_id": id})
    return res if res else None

async def get_prof_rating(prof):

    cached = cache.get(f"prof-rating:{prof}")
    if cached:
        return orjson.loads(cached)
    
    collection = mongo["ProfessorData"]["ratings"]

    res = collection.find_one({"name": prof})
    res = (None, None) if not res else (res["slug"], res["rating"])
    
    cache.setex(f"prof-rating:{prof}", 60*60*24, orjson.dumps(res))

    return res

async def get_prof_gpa(prof, course):

    cached = cache.get(f"prof-gpa:{prof}:{course}")
    if cached:
        return orjson.loads(cached)

    collection = mongo["ProfessorData"]["gpa"]

    res = collection.find_one({"_id": course})
    if not res or prof not in res:
        res = (None, None)
    else:
        res = (res[prof]["gpa"], res[prof]["students"])
    
    cache.setex(f"prof-gpa:{prof}:{course}", 60*60*24, orjson.dumps(res))

    return res


