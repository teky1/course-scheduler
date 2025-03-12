import { textGradient, getGradientColor, backgroundGradient } from "../schedule/utils/colors";
import styles from "./courselist.module.css";

import { SectionResultComponent } from "./courselist.types";


const SectionResult: 
  SectionResultComponent = ({section, onclick}) => {

    let gpa = Math.round((Math.random()*3+1)*100)/100;

  return (
    <div onClick={() => onclick(section)} className={styles.section}>
        <div className={styles.sectionTopRow}>
          <div className={styles.sectionID}>
            <span>{section.section_id}</span>
          </div>
          <div className={styles.instructors}>
            {
              section.instructors.map(name => {
                let rating = Math.round((Math.random()*40+10))/10;
                return (
                <span key={name}>
                  {name}
                  <span 
                    className={styles.profRating}
                    style={{backgroundColor: getGradientColor(backgroundGradient, 100*rating/5)}}
                  >
                    {rating}
                  </span>
                </span>
              )})
            }
          </div>
          <div className={styles.gpa}>
            <span>GPA: <span style={{color: getGradientColor(textGradient, 100*gpa/4)}}>{gpa}</span></span>
          </div>
        </div>

        <div className={styles.seatSection}>
          <span className={styles.seats}
            style={{
              color: (section.open_seats == 0) ? "#cc6666" : 
                (section.open_seats <= Math.max(10, section.total_seats/4)) ? "#C5CA5A" : "#868E96",
              fontWeight: (section.open_seats <= Math.max(10, section.total_seats/4)) ? "bold" : "normal"
            }}
          >
              {section.open_seats}/{section.total_seats} seats open</span>
          <div className={styles.waitlistHoldfile}>
            <span
              style={{
                color: (section.waitlist > 0) ? "inherit" : "#868E96",
                fontWeight: (section.waitlist > 0) ? "bold" : "normal"
              }}
            >Waitlist: {section.waitlist} </span>
            <span
              style={{
                color: (section.holdfile > 0) ? "inherit" : "#868E96",
                fontWeight: (section.holdfile > 0) ? "bold" : "normal"
              }}
            >Holdfile: {section.holdfile}</span>
          </div>
        </div>
        
        <div className={styles.meetingSection}>
          {/* TODO: HANDLE Contact department times */}
          {
            section.meetings.map(meeting => {
              let type = ["warn", "x", "check"][Math.floor(Math.random()*3)];
              return (
                <div className={styles.meeting} key={meeting.time} 
                  style={{
                    fontWeight: (type == "check") ? "normal" : "bold",  
                    color: (type == "check") ? "#868E96" : "inherit"
                  }}>
                  <div className={styles.meetingIndicator}><img src={`/${type}.svg`}/></div>
                  <span className={styles.meetingTime}>{meeting.time}</span>
                  <span className={styles.meetingLocation}>{meeting.location}</span>
                </div>
              )
            })
          }
        </div>
    </div>
  );
}

export default SectionResult;
