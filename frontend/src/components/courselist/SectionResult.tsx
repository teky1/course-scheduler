import styles from "./courselist.module.css";

import { SectionResultComponent } from "./courselist.types";

const SectionResult: 
  SectionResultComponent = ({section, onclick}) => {

    let gpa = Math.round((Math.random()*2+2)*100)/100;

  return (
    <div onClick={() => onclick(section)} className={styles.section}>
        <div className={styles.sectionTopRow}>
          <div>
            <span>{section.section_id}</span>
            <span>{(section.footnote_marked) ? "*" : ""}</span>
          </div>
          <div className={styles.instructors}>
            {
              section.instructors.map(name => <span>{name}</span>)
            }
          </div>
          <div className={styles.gpa}>
            <span>GPA: {gpa}</span>
          </div>
        </div>
        
        

    </div>
  );
}

export default SectionResult;
