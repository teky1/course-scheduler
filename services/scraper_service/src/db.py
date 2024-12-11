from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo import TEXT

with open("db_uri.txt") as f:
    uri = f.read()

client = MongoClient(uri, server_api=ServerApi('1'))

client.admin.command('ping')
print("Connected to DB.")

db = client["CourseNotifierCluster"]

# This can be changed to track course update changes
# at a later time
def update_all_courses(semester, course_data):
    collection = f"courses-{semester}"
    course_db = db[collection]

    course_db.create_index([("name", TEXT)])
    
    # Deletes entire contents and updates it
    # This behavior can be changed to be more efficient and
    # also keep track of changes
    course_db.delete_many({})
    course_db.insert_many(list(course_data.values()))


def close():
    client.close()


