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

    start = time.time()

    print(f"{'='*50}\n STARTING SCRAPING {datetime.datetime.now()}\n{'='*50}")

    utils.log(start, "Getting semesters...")
    semesters = await schedule.get_semesters()
    utils.log(start, "Done")

    for semester in semesters:
        utils.log(start, f"Processing semester {semester}...")
        depts = await schedule.get_dept_list(semester)
        utils.log(start, f"{len(depts)} departments loaded")

        courses = []

        async with httpx.AsyncClient() as client:
            for i in range(0,len(depts), 20):
                results = await asyncio.gather(
                    *(schedule.get_dept(semester, dept, client) for dept in depts[i:i+20]))

                for res in results:
                    for course in res:
                        courses.append(course)

                utils.log(start, f"\t({min(i+20, len(depts))}/{len(depts)}) depts retrieved")

                await asyncio.sleep(0.5)
        

        utils.log(start, f"{len(courses)} courses loaded total")


if __name__ == "__main__":
    asyncio.run(main())
