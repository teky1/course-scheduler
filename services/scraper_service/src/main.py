import asyncio
import datetime
import time

import httpx

import utils 
import schedule



async def get_dept_list():
    url = ""
    await utils.single_get


async def main():
    print(f"{'='*50}\n STARTING SCRAPING {datetime.datetime.now()}\n{'='*50}")
    start = time.time()
    utils.log(start, "Getting semesters...")
    semesters = await schedule.get_semesters()
    utils.log(start, "Done")

    for semester in semesters:
        utils.log(start, f"Processing semester {semester}...")
        depts = await schedule.get_dept_list(semester)
        utils.log(start, f"{len(depts)} departments loaded")


if __name__ == "__main__":
    asyncio.run(main())
