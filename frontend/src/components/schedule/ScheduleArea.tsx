import styles from "./schedule.module.css";
import { ScheduleAreaComponent } from "./schedule.types";

let  ScheduleArea: ScheduleAreaComponent = ({sections}) => {

  
  return (
    <div className={styles.root}>
        <h1>Schedule Area</h1>
        {sections.map(section => <p>{section[0]._id}-{section[1].section_id}</p>)}
    </div>
  );
}


export default ScheduleArea;
