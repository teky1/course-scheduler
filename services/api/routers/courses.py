from fastapi import APIRouter
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import re
import logging

router = APIRouter()

with open("db_uri.txt") as f:
    uri = f.read()

client = MongoClient(uri, server_api=ServerApi('1'))
db = client["CourseNotifierCluster"]

client.admin.command('ping')
logging.info("API Service Connected to MongoDB")

RESULT_LIMIT = 20

@router.get("/search/{semester}")
async def search(semester: int, query: str, offset: int = 0): 
    # need to add regex cacheing
    # need to verify semester input
    collection = db[f"courses-{semester}"]

    if re.search(r'^([A-Z]{4}\d{3}[A-Z]?|[A-Z]{1,4}|[A-Z]{4}\d{1,3})$', query.strip().upper()):

        res = list(
            collection.find({"_id": {"$regex": f"^{re.escape(query)}"}})
            .sort("_id", 1)
            .skip(offset)
            .limit(RESULT_LIMIT)
        )

        await hydrate_courses(res, semester)

        if len(res) > 0:
            return {"size": len(res), "courses": res}
    
    # remain regex maybe {name: {$regex: "rith", $options: "i"}}
    
async def hydrate_courses(courses, semester):
    
    collection = db[f"sections-{semester}"]

    ids = [course["_id"] for course in courses]
    res = collection.find({"_id": {"$in": ids}})

    sections_map = {sections["_id"]:sections["sections"] for sections in res}
    
    for course in courses:
        course["sections"] = [] if course["_id"] not in sections_map else sections_map[course["_id"]]