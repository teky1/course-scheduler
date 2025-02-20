import { Course, Section } from "../../types/api";
import styles from "./schedule.module.css";

let  ScheduleArea: React.FC<{sections: [Course, Section][]}> = ({sections}) => {

  
  return (
    <div className={styles.root}>
        <h1>Schedule Area</h1>
        {sections.map(section => <p>{section[0]._id}-{section[1].section_id}</p>)}
    </div>
  );
}


export default ScheduleArea;
