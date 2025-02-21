import styles from "./courselist.module.css";

import { SectionResultComponent } from "./courselist.types";

const SectionResult: 
  SectionResultComponent = ({section, onclick}) => {

  return (
    <div onClick={() => onclick(section)} className={styles.section}>
        
        <p>
            {section.section_id}
        </p>

    </div>
  );
}

export default SectionResult;
