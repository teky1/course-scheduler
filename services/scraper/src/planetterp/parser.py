
def parse_section_gpa(res):
    grades = {}
    letter_grades = {
                "A+": 4.0,
                "A": 4.0,
                "A-": 3.7,
                "B+": 3.3,
                "B": 3.0,
                "B-": 2.7,
                "C+": 2.3,
                "C-": 1.7,
                "D+": 1.3,
                "D": 1.0,
                "D-": 0.7,
                "F": 0.0,
            }
    for section in res:
        professor = section["professor"]
        if professor not in grades:
            grades[professor] = {g:0 for g in letter_grades} 
        
        for g in letter_grades:
            if g in section:
                grades[professor][g] += section[g]
    out = {}
    for prof in grades:
        students = sum(grades[prof].values())
        for g in grades[prof]:
            grades[prof][g] *= letter_grades[g]
        if students != 0:
            gpa = sum(grades[prof].values())/students
            out[prof] = {"gpa": gpa, "students": students}
    
    return out
        
        