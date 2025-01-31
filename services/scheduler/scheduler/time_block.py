from __future__ import annotations


class TimeBlock:

    def __init__(self, start, end, section=None, location=None):
        self.start = start
        self.end = end
        self.section = section
        self.location = location

    def does_overlap(self, other: TimeBlock) -> bool:
        return self.start < other.end and other.start < self.end

    def time_diff(self, other: TimeBlock) -> int:
        return min(abs(other.end-self.start), abs(self.end-other.start))

