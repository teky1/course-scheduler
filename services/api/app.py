from fastapi import FastAPI, HTTPException

import logging

from routers import travelttime

app = FastAPI()

app.include_router(travelttime.router)

logging.basicConfig(level=logging.INFO)

@app.get("/")
async def root():
    return {"Title": "ScheduleTerp Backend", "Description": "This is the ScheduleTerp Backend"}