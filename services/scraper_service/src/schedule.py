import datetime
import re
import asyncio
import itertools

import httpx
from bs4 import BeautifulSoup

import utils

async def get_semesters():
    year = datetime.datetime.now().year
    years = (year-1, year, year+1)
    terms = ("01", "05", "08", "12")
    semesters = [f"{y}{t}" for y in years for t in terms]

    async with httpx.AsyncClient() as client:
        results = await asyncio.gather(
            *(utils.client_get(client, f"https://app.testudo.umd.edu/soc/{s}/") for s in semesters))
    
    out = []
    for i,res in enumerate(results):
        
        if "No course prefixes matched your search filters above." not in res.text:
            out.append(semesters[i])
            
    
    return out

async def get_dept_list(semester):
    url = f"https://app.testudo.umd.edu/soc/{semester}"
    res = await utils.single_get(url)

    soup = BeautifulSoup(res.text, "html.parser")

    prefix_spans = soup.find_all(class_="prefix-abbrev")
    right_col = soup.find(id="right-course-prefix-column")
    
    return [span.text for span in prefix_spans]


