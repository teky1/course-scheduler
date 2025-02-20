import styles from "./schedule.module.css";
import { ScheduleAreaComponent } from "./schedule.types";

let  ScheduleArea: ScheduleAreaComponent = ({sections}) => {

  // let days = ["M", "Tu", "W", "Th", "F"];

  let line = (percent: number) => <div className={styles.line} style={{top: percent+"%"}}></div>
  let lines = [0,10,20,30,40,50,60,70,80,90,100];

  return (
    <div className={styles.root}>
        {sections.map(section => 
          <span style={{position: "relative", zIndex: 2}}>
            {section[0]._id}-{section[1].section_id}&nbsp;&nbsp;&nbsp;</span>
        )}

        {lines.map(x => line(x))}
    </div>
  );
}


export default ScheduleArea;
