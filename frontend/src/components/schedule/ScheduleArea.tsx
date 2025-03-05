import styles from "./schedule.module.css";
import { ScheduleAreaComponent } from "./schedule.types";

let  ScheduleArea: ScheduleAreaComponent = ({sections}) => {

  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];

  let line = (percent: number, time?: string ) => 
    <>
      <div className={styles.line} style={{top: percent+"%"}}></div>
      {(time) ? <span className={styles.lineTime} style={{top: percent+"%"}}>{time}</span> : <></>}
    </>
  let lines = [0,10,20,30,40,50,60,70,80,90,100];


  return (
    <div className={styles.root}>
        {/* {sections.map(section => 
          <span style={{position: "relative", zIndex: 2}}>
            {section[0]._id}-{section[1].section_id}&nbsp;&nbsp;&nbsp;</span>
        )} */}
        <div className={styles.daysContainer}>
          {days.map(day => <span className={styles.dayLabel}>{day}</span>)}
        </div>
        <div className={styles.sectionArea}>
          {lines.map((x,time) => line(x))}
          {line(0, "8am")}
          {line(20, "9am")}
          {line(40, "10am")}
          {line(60, "11am")}
          {line(80, "12am")}
          {line(100, "1pm")}
        </div>
    </div>
  );
}


export default ScheduleArea;
