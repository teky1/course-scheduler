from fastapi import FastAPI, HTTPException

import logging

from routers import traveltime, courses

app = FastAPI()

app.include_router(traveltime.router)
app.include_router(courses.router)

logging.basicConfig(level=logging.INFO)

@app.get("/")
async def root():
    return {"Title": "ScheduleTerp Backend", "Description": "This is the ScheduleTerp Backend"}