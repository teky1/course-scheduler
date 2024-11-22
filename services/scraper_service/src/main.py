import asyncio
import datetime
import time

import httpx

import utils 
import schedule




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

        courses = {}

        async with httpx.AsyncClient() as client:
            concurrent = 25
            for i in range(0,len(depts), concurrent):
                results = await asyncio.gather(
                    *(schedule.get_dept(semester, dept, client) for dept in depts[i:i+concurrent]))

                for res in results:
                    for course in res:
                        courses[course] = res[course]

                # utils.log(start, f"({min(i+concurrent, len(depts))}/{len(depts)}) depts retrieved")

                await asyncio.sleep(0.5)
        

        utils.log(start, f"{len(courses)} courses loaded total")
        
        schedule.parse_raw_courses(courses)

if __name__ == "__main__":
    asyncio.run(main())
