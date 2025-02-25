import styles from "./courselist.module.css";

import { SectionResultComponent } from "./courselist.types";

const SectionResult: 
  SectionResultComponent = ({section, onclick}) => {

    let gpa = Math.round((Math.random()*2+2)*100)/100;

  return (
    <div onClick={() => onclick(section)} className={styles.section}>
        <div className={styles.sectionTopRow}>
          <div className={styles.sectionID}>
            <span>{section.section_id}</span>
          </div>
          <div className={styles.instructors}>
            {
              section.instructors.map(name => <span>{name}</span>)
            }
          </div>
          <div className={styles.gpa}>
            <span>GPA: <span>{gpa}</span></span>
          </div>
        </div>

        <div className={styles.seatSection}>
          <span className={styles.seats}>{section.open_seats}/{section.total_seats} seats open</span>
          <div className={styles.waitlistHoldfile}>
            <span>Waitlist: {section.waitlist} </span>
            <span>Holdfile: {section.holdfile}</span>
          </div>
        </div>

        <div className={styles.meetingIndicators}>
          {section.meetings.map(() => "check")}
        </div>
        <div className={styles.meetingTimes}>
          {section.meetings.map(meeting => meeting.time)}
        </div>
        <div className={styles.meetingLocations}>
          {section.meetings.map(meeting => meeting.location)}
        </div>
        
        

    </div>
  );
}

export default SectionResult;
