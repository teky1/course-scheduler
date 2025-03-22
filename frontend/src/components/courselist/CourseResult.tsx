import styles from "./courselist.module.css";

import { Section } from "../../types/api";
import { CourseResultComponent } from "./courselist.types";
import SectionResult from "./SectionResult";
import { Collapse } from "@mantine/core";
import { useState } from "react";

const CourseResult: 
  CourseResultComponent = ({course, selectedSections, onSectionSelect}) => {

  let sectionClick: (section: Section) => void = (section) => {
    onSectionSelect(course, section);
    
  }

  let [expanded, setExpanded] = useState(false);


  return (
    <div className={styles.course}>
      <div className={styles.courseInfo}>
        <div className={styles.courseHeader}>
          <span className={styles.courseID}>{course._id}</span>
          <span className={styles.courseCredits}>{course.min_credits}{(course.max_credits) ? "-"+course.max_credits : ""} credits</span>
        </div>
        <span className={styles.courseName}>{course.name}</span>
        
        <Collapse in={expanded}>
          <div className={styles.courseCollapse}>
            {course.gen_eds ? <span className={styles.courseNote}><strong>GenEd: </strong>{course.gen_eds}</span> : null}
            {Object.entries(course.reqs).map(([req, msg]) => 
              <span key={req} className={styles.courseNote}><strong>{req}: </strong>{msg}</span>
            )}
            <span className={styles.courseDesc}>{course.desc}{"\n\n"+course.desc_notes}</span>
          </div>
        </Collapse>

        <span className={styles.expandBtn} onClick={() => setExpanded(e => !e)}>{expanded ? "Less" : "More"} Info</span>
        
      </div>



      <div>
          {course.sections.map(section => 
          <SectionResult 
            key={section.section_id} 
            onclick={sectionClick} 
            section={section} 
            course={course} 
            selectedSections={selectedSections} 
          />)}
      </div>

    </div>
  );
}

export default CourseResult;
