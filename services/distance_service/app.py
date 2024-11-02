import httpx
from bs4 import BeautifulSoup
from fastapi import FastAPI, HTTPException

import asyncio

app = FastAPI()

@app.get("/")
async def root():
    return {"Title": "Distance Service", "Description": "This is the distance service!!"}

@app.get("/traveltime/{loc1}/{loc2}")
async def traveltime(loc1: str, loc2: str, mode: str = "foot"):

    bldg_code_endpoint = lambda loc : f"https://app.testudo.umd.edu/soc/buildings/{loc} 0"
    
    # Get numeric building codes from letter codes
    bldg_codes = []
    for loc in (loc1, loc2):
        url = bldg_code_endpoint(loc)

        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            html_content = response.text

        
        soup = BeautifulSoup(html_content, "html.parser")
        bldg_code = soup.find_all("span", class_="code")[1].get_text()
        bldg_codes.append(int(bldg_code))
    
    # Get lat/long data from the numeric building codes
    lat_long_data_url = "https://geodata.md.gov/imap/rest/services/Structure/MD_CampusFacilities/FeatureServer/2/query?where=1%3D1&outFields=*&outSR=4326&f=json"
    async with httpx.AsyncClient() as client:
        response = await client.get(lat_long_data_url)
        response.raise_for_status()
        data = response.json()

    coords = [None, None]
    for bldg in data["features"]:
        if int(bldg["attributes"]["BUILDINGID"]) not in bldg_codes:
            continue 
        
        vertices = bldg["geometry"]["rings"][0]
        lat, long = 0, 0
        for v in vertices:
            long += v[0]
            lat += v[1]
        lat /= len(vertices)
        long /= len(vertices)
        coords[bldg_codes.index(int(bldg["attributes"]["BUILDINGID"]))] = (lat, long)
    
    # Get routing time between coordinates
    url = f"http://graphhopper-service:8989/" \
        + f"route?point={coords[0][0]},{coords[0][1]}" \
        + f"&point={coords[1][0]},{coords[1][1]}&profile={mode}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        data = response.json()
    
    time_secs = data["paths"][0]["time"]//1000
    time_mins = round(time_secs/60, 2)
    return {"time_mins": time_mins, "time_secs": time_secs}

async def get_numeric_building_code(loc: str):
    if loc.strip().isnumeric():
        return int(loc.strip())
    
    bldg_code_endpoint = f"https://app.testudo.umd.edu/soc/buildings/{loc} 0"

    async with httpx.AsyncClient() as client:
        response = await client.get(bldg_code_endpoint)
        response.raise_for_status()
        html_content = response.text
    
    soup = BeautifulSoup(html_content, "html.parser")
    bldg_code = soup.find_all("span", class_="code")[1].get_text()
    return int(bldg_code)