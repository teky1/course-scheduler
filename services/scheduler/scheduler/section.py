from __future__ import annotations

from typing import List

import scheduler


class Section:

    def __init__(self, course: scheduler.Course, section_id: int,
                 meetings: List[scheduler.TimeBlock] = None, instructors: List[str] = None):

        self.course = course
        self.section_id = section_id

        self.meetings = meetings if meetings is not None else list()
        self.instructors = instructors if instructors is not None else list()