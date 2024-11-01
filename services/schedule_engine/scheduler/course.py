from __future__ import annotations

from typing import List

import scheduler


class Course:

    def __init__(self, course_id: str, sections: List[scheduler.Section] = None):
        self.course_id = course_id
        self.sections = sections if sections is not None else list()
