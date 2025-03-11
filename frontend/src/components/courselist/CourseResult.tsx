import styles from "./courselist.module.css";

import { Section } from "../../types/api";
import { CourseResultComponent } from "./courselist.types";
import SectionResult from "./SectionResult";

const CourseResult: 
  CourseResultComponent = ({course, onSectionSelect}) => {

  let sectionClick: (section: Section) => void = (section) => {
    onSectionSelect(course, section);
    
  }


  return (
    <div className={styles.course}>
      <div className={styles.courseInfo}>
        <div className={styles.courseHeader}>
          <span className={styles.courseID}>{course._id}</span>
          <span className={styles.courseCredits}>{course.min_credits}{(course.max_credits) ? "-"+course.max_credits : ""} credits</span>
        </div>
        <span className={styles.courseName}>{course.name}</span>
        {/* {(course.gen_eds) ? <span>GenEd: {course.gen_eds}</span> : null} */}
        <div>
          
        </div>
        
      </div>



      <div>
          {course.sections.map(section => <SectionResult key={section.section_id} onclick={sectionClick} section={section} />)}
      </div>

    </div>
  );
}

export default CourseResult;
