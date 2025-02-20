import { TextInput } from "@mantine/core";
import styles from "./courselist.module.css";
import { useState } from "react";
import CourseResult from "./CourseResult";
import { testCourses } from "./testData";
import { Course, Section } from "../../types/api";
import { CourseListComponent } from "./courselist.types";

let CourseList: 
  CourseListComponent = ({update}) => {

  let [searchVal, setSearchVal] = useState("");
  
  let sectionSelect: 
    (course: Course, section: Section) => void = (course, section) => {

    update(old => {
      if(old.some(([c, s]) => c._id == course._id && s.section_id == section.section_id)) {
        return old.filter(([c, s]) => !(c._id == course._id && s.section_id == section.section_id));
      } else {
        return [...old, [course, section]];
      }
    });
  } 

  return (
    <div className={styles.root}>
        <h1>Course List</h1>
        <TextInput
          value={searchVal}
          placeholder="Search courses..."
          onChange={event => setSearchVal(event.target.value)}
        />

        <div className={styles.resultsContainer}>
          {testCourses.map(course => 
          <CourseResult 
            course={course} 
            onSectionSelect={sectionSelect}
          />)}
        </div>

    </div>
  );
};

export default CourseList;
