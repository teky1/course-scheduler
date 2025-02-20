// import styles from "./courselist.module.css";

import { Section } from "../../types/api";

const SectionResult: React.FC<{section: Section, onclick: (section: Section) => void}> = ({section, onclick}) => {

  return (
    <div onClick={() => onclick(section)}>
        
        <p>
            {section.section_id}
        </p>

    </div>
  );
}

export default SectionResult;
