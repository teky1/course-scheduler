from __future__ import annotations

from typing import List

import scheduler


class CourseListParams:
    pass


class AddValidationParams:
    # Transport: WALK=0 BIKE=1
    # section_reqs {
    #   "CMSC131": {
    #       instructors: []
    #       section_id: set() or list() idk yet
    #       ...
    #    }
    # }
    def __init__(self, transport: str = "WALK",
                 section_reqs: dict = None,
                 schedule_blocks: List[scheduler.TimeBlock] = None):

        self.transport = 1 if transport == "BIKE" else 0
        self.section_reqs = {} if section_reqs is None else section_reqs
        self.schedule_blocks = [] if schedule_blocks is None else schedule_blocks


class ScoringCriteria:
    pass


class Scheduler:

    def __init__(self, courses_params: CourseListParams,
                 add_validation: AddValidationParams,
                 scoring_criteria: ScoringCriteria,
                 location_manager: scheduler.LocationManager = None
                 ):

        self.course_params = courses_params
        self.add_validation = add_validation
        self.scoring_criteria = scoring_criteria
        self.location_manager = LocationManager() if location_manager is None else location_manager