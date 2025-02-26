import planetterp
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

with open("db_uri.txt") as f:
    uri = f.read()

print("testudo scraper main!")
    exit(0)

client = MongoClient(uri, server_api=ServerApi('1'))

semesters = [x["_id"] for x in client["Metadata"]["all-semesters"].find()][-2::]


section_combos = set()
profs = set()
for semester in semesters:
    for course in client["CourseNotifierCluster"][f"sections-{semester}"].find():
        for section in course["sections"]:
            for instructor in section["instructors"]:
                section_combos.add(f"{course['_id']};;;{instructor}")
                profs.add(instructor)

print(f"Loading professors")
off = 0
while True:
    res = planetterp.professors(offset=off)
    if len(res) <= 0:
        break
    off+=100
    print(off)
    for prof in res:
        if prof["name"] in profs and "average_rating" in prof and prof["average_rating"]:
            client["ProfessorData"]["ratings"].replace_one(
            {"name": prof["name"]}, 
            {
                "name": prof["name"],
                "slug": prof["slug"],
                "rating": prof["average_rating"]
            }, 
            upsert=True
        )
    

print("\n".join((sorted(list(profs)))))
print(len(profs))
client.close()