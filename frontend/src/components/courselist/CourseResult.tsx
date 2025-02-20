// import styles from "./courselist.module.css";

import { Section } from "../../types/api";
import { CourseResultComponent } from "./courselist.types";
import SectionResult from "./SectionResult";

const CourseResult: 
  CourseResultComponent = ({course, onSectionSelect}) => {

  let sectionClick: (section: Section) => void = (section) => {
    onSectionSelect(course, section);
    
  }


  return (
    <div>
        <p>
            <strong>{course._id}</strong> {course.name}
            <br/>
            Credits: {course.min_credits}{(course.max_credits) ? "-"+course.max_credits : ""}
        </p>
        <div>
            {course.sections.map(section => <SectionResult onclick={sectionClick} section={section} />)}
        </div>

        <hr/>

    </div>
  );
}

export default CourseResult;
