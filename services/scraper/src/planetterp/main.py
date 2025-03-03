import datetime
import time

import planetterp
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

with open("db_uri.txt") as f:
    uri = f.read()

start = time.time()

def log(start, msg):
    print(f"[{time.time()-start:7.2f}][PT] {msg}", flush=True)

log(start, f"({datetime.datetime.now()})")
log(start, "Starting scraping...")

log(start, f"Connecting to DB")
client = MongoClient(uri, server_api=ServerApi('1'))

log(start, "Loading semesters")
semesters = [x["_id"] for x in client["Metadata"]["all-semesters"].find()]

log(start, f"Getting target courses")

courses = set()
for semester in semesters:
    for course in client["CourseNotifierCluster"][f"sections-{semester}"].find():
        courses.add(course["_id"])

log(start, f"Loaded {len(courses)} courses")
for course in courses:
    res = planetterp.grades(course=course)

    # CONTINUE WRITING HERE  #####################################

exit(0)

log(start, f"Loading professor data...")
off = 0
while True:
    res = planetterp.professors(offset=off)
    if len(res) <= 0:
        break
    if off % 2000 == 0:
        log(start, f"Professors Page {off//100}")
    off+=100
    for prof in res:
        if "average_rating" in prof and prof["average_rating"]:
            client["ProfessorData"]["ratings"].replace_one(
            {"name": prof["name"]}, 
            {
                "name": prof["name"],
                "slug": prof["slug"],
                "rating": prof["average_rating"]
            }, 
            upsert=True
        )

log(start, f"Finished {(off-100)//100} Professor Pages")    



client.close()