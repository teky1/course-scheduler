from scheduler import Course, Section, SectionSchedule, TimeBlock

a = TimeBlock(5, 7)
b = TimeBlock(9, 10)

print(a.does_overlap(b))
print(a.time_diff(b))