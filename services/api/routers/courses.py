from fastapi import APIRouter
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import redis

import re
import logging
import orjson

RESULT_LIMIT = 20

router = APIRouter()

with open("db_uri.txt") as f:
    uri = f.read()



mongo = MongoClient(uri, server_api=ServerApi('1'))
mongo.admin.command('ping')
logging.info("API Service Connected to MongoDB")

cache = redis.Redis(host="redis", port=6379)
if cache.ping():
    logging.info("API Service Connected to Redis")
else:
    logging.error("API could NOT connect to Redis")



@router.get("/search/{semester}")
async def search(semester: int, query: str, offset: int = 0): 
    
    cache_key = f"{semester}:{offset}:{query}"
    cached = cache.get(cache_key)
    if cached:
        return orjson.loads(cached)

    if not await verify_semester(semester):
        return {"error": "invalid semester"}

    collection = mongo["CourseNotifierCluster"][f"courses-{semester}"]

    res=None
    if re.search(r'^([A-Z]{4}\d{3}[A-Z]?|[A-Z]{1,4}|[A-Z]{4}\d{1,3})$', query.strip().upper()):

        pipeline = [
            {
                "$match": {
                    "$or": [
                        {"_id": {"$regex": f"^{re.escape(query.strip().upper())}"}},
                        {"name": {"$regex": re.escape(query.strip()), "$options": "i"}}
                    ]
                }
            },
            {
                "$addFields": {
                    "sortKey": {
                        "$cond": {
                            "if": {
                                "$regexMatch": {
                                    "input": "$_id",
                                    "regex": f"^{re.escape(query.strip().upper())}"
                                }
                            },
                            "then": 0,
                            "else": 1
                        }
                    }
                }
            },
            {
                "$sort": {"sortKey": 1, "_id": 1}
            },
            {"$skip": offset},
            {"$limit": RESULT_LIMIT}
        ]

        res = list(collection.aggregate(pipeline))
    else:
        res = list(
            collection.find({"name": {"$regex": re.escape(query.strip()), "$options": "i"}})
            .skip(offset)
            .limit(RESULT_LIMIT)
        )

    await hydrate_courses(res, semester)

    out = {"size": len(res), "courses": res}

    cache.setex(cache_key, 5*60, orjson.dumps(out))
    return out

    
async def hydrate_courses(courses, semester):
    
    collection = mongo["CourseNotifierCluster"][f"sections-{semester}"]

    ids = [course["_id"] for course in courses]
    res = collection.find({"_id": {"$in": ids}})

    sections_map = {sections["_id"]:sections["sections"] for sections in res}
    
    for course in courses:
        course["sections"] = [] if course["_id"] not in sections_map else sections_map[course["_id"]]

async def verify_semester(semester):

    if cache.get(semester):
        return True
 
    collection = mongo["Metadata"]["all-semesters"]
    semesters = list(collection.find())

    for sem in semesters:
        cache.set(sem["_id"], 1)

    return bool(cache.get(semester))
