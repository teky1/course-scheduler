from __future__ import annotations

from typing import List

import scheduler


class SectionSchedule:

    def __init__(self, scheduler: scheduler.Scheduler,
                 sections: List[scheduler.Section] = None):
        self.sections = list() if sections is None else sections
        self.scheduler = scheduler

    def can_add(self, new_section: scheduler.Section) -> bool:

        # Check section reqs from AddValidation params

        if new_section.course.course_id in self.scheduler.add_validation.section_reqs:
            reqs = self.scheduler.add_validation.section_reqs[new_section.course.course_id]

            if "section_id" in reqs and new_section.section_id not in reqs["section_id"]:
                return False

            if "instructor"


        # Verifies no courses overlap and time gap is appropriate

        for section in self.sections:

            for new_block in new_section.meetings:
                for old_block in section.meetings:

                    if new_block.does_overlap(old_block):
                        return False

                    time_diff = new_block.time_diff(old_block)
                    if time_diff >= 30:  # Hard-coded value for when you should check traveltime
                        continue

                    dist = self.scheduler.location_manager.distance(
                        old_block.location,
                        new_block.location
                    )

                    time = dist.bike_time if self.scheduler.add_validation.transport == "BIKE" else dist.walk_time

                    if time >= time_diff:
                        return False

        return True

    def copy(self) -> SectionSchedule:
        return SectionSchedule(self.scheduler, self.sections.copy())

    # Assumes this is a valid add
    def add(self, new_section: scheduler.Section) -> None:
        self.sections.append(new_section)

