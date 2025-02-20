import datetime
import re
import asyncio
import itertools
import json

import httpx
from bs4 import BeautifulSoup, NavigableString

import utils

async def get_semesters():
    year = datetime.datetime.now().year
    years = (year-1, year, year+1)
    # terms = ("01", "05", "08", "12")
    terms = ("01", "08") # only support fall and spring for now
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

    soup = BeautifulSoup(res.text, "lxml")

    prefix_spans = soup.find_all(class_="prefix-abbrev")
    
    return [span.text for span in prefix_spans]


async def get_dept(semester, dept, client):
    url = f"https://app.testudo.umd.edu/soc/{semester}/{dept}"

    res = await utils.client_get(client, url)

    soup = BeautifulSoup(res.text, "html.parser")
    courses = soup.find_all(class_="course")
    
    return {tag.get("id"):tag for tag in courses}


# courses is a list of course ids
async def get_sections(semester, courses):
    out = []
    while len(courses) > 0:
        url = f"https://app.testudo.umd.edu/soc/{semester}/sections?courseIds="+courses.pop()
        while len(url) < 2000 and len(courses) > 0:
            url += f",{courses.pop()}"

        res = await utils.single_get(url)

        soup = BeautifulSoup(res.text, "html.parser")
        courses_found = soup.find_all(class_="course-sections")

        for course in courses_found:
            course_id = course.get("id")
            course_data = {"_id": course_id, "sections": [], "footnote": ""}
            
            sections = course.find_all(class_="section")

            for msg in course.find_all(class_="footnote-message"):
                course_data["footnote"] += msg.text.strip()+"\n"

            for section in sections:
                course_data["sections"].append(parse_section(section))
            
            out.append(course_data)

        


    with open("section-out.json", "w") as f:
        json.dump(out, f, indent=2)
    
    return out


def parse_section(root):
    out = {}
    out["section_id"] = root.find_all(class_="section-id")[0].text.strip()

    out["total_seats"] = int(root.find_all(class_="total-seats-count")[0].text.strip())
    out["open_seats"] = int(root.find_all(class_="open-seats-count")[0].text.strip())

    waitlist_elements = root.find_all(class_="waitlist-count")

    out["waitlist"] = 0 if len(waitlist_elements) < 1 else int(waitlist_elements[0].text.strip())

    if len(waitlist_elements) > 1:
        out["holdfile"] = int(waitlist_elements[1].text.strip())
    else:
        out["holdfile"] = 0

    out["instructors"] = [instruc.text.strip() for instruc in root.find_all(class_="section-instructor")]

    out["footnote_marked"] = len(root.find_all(class_="footnote-marker")) > 0

    meetings_raw = root.find_all(class_="class-days-container")[0]
    meetings = []
    for meeting in meetings_raw.find_all(class_="row"):
        current_meeting_data = {}

        time = meeting.find_all(class_="section-day-time-group")
        location = meeting.find_all(class_="section-class-building-group")
        meeting_type = meeting.find_all(class_="class-type")
        meeting_message = meeting.find_all(class_="class-message")

        current_meeting_data["time"] = "" if len(time) == 0 else time[0].text.strip().replace("\n", " ")
        current_meeting_data["location"] = "" if len(location) == 0 else location[0].text.strip().replace("\n", " ")
        current_meeting_data["type"] = "" if len(meeting_type) == 0 else meeting_type[0].text.strip()
        current_meeting_data["message"] = "" if len(meeting_message) == 0 else meeting_message[0].text.strip() 

        meetings.append(current_meeting_data)
    
    out["meetings"] = meetings

    nonstandard_dates = root.find_all(class_="non-standard-dates-message")
    out["non_standard_dates"] = "" if len(nonstandard_dates) == 0 else nonstandard_dates[0].text.strip()

    return out


def parse_raw_courses(courses):
    all_data = {}
    for course in courses:
        all_data[course] = parse_course(courses[course])
    
    # with open("out.json", "w") as f:
    #     json.dump(all_data, f, indent=2)
    
    return all_data


def parse_course(root):

    course_data = {}

    course_data["_id"] = root.find_all(class_="course-id")[0].text
    course_data["name"] = root.find_all(class_="course-title")[0].text
    course_data["reqs"] = {}
    course_data["desc_notes"] = ""
    course_data["desc"] = ""
    course_data["gen_eds"] = None
    course_data["min_credits"] = None
    course_data["max_credits"] = None

    

    # Parse additional course text
    for elem in root.find_all(class_="course-text"):
        course_data["desc_notes"] += "\n".join([line.strip() for line in list(elem.strings)])+"\n"
    
    # Prase special messages
    for e in root.find_all(class_="individual-instruction-message"):
        course_data["desc_notes"] += "\n".join([line.strip() for line in list(e.strings)])+"\n"


    # Parse approved description
    for text_elements in root.find_all(class_="approved-course-text"):

        notes = [tag for tag in text_elements.find_all("div") if tag.find_all("strong", recursive=False)]
        
        if len(notes) == 0:

            course_data["desc"] += text_elements.text+"\n"
            continue
        
        for note in notes:
            
            if note.text.strip() == "":
                continue
            parts = [text.strip().replace(":","") for text in note.strings]

            course_data["reqs"][parts[0]] = parts[1]

    # Parse GenEd
    gen_ed_element = root.find(class_="gen-ed-codes-group")
    if gen_ed_element:
        course_data["gen_eds"] = " ".join(gen_ed_element.text.replace("GenEd:", "").strip().split())

    min_credits_element = root.find(class_="course-min-credits")
    max_credits_element = root.find(class_="course-max-credits")

    if min_credits_element and min_credits_element.text.strip().isdigit():
        course_data["min_credits"] = int(min_credits_element.text.strip())

    if max_credits_element and max_credits_element.text.strip().isdigit():
        course_data["max_credits"] = int(max_credits_element.text.strip())

    return course_data







    
