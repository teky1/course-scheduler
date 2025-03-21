import { textGradient, getGradientColor, backgroundGradient } from "../schedule/utils/colors";
import styles from "./courselist.module.css";

import { SectionResultComponent } from "./courselist.types";
import { setupCache } from "axios-cache-interceptor";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProfessorGPA } from "../../types/api";


const api = setupCache(axios.create(), {
  ttl: 1000*60*5
});


const SectionResult: 
  SectionResultComponent = ({section, course, onclick}) => {
  
  let [gpa, setGPA] = useState<number | null>(null);
  let [rating, setRatings] = useState<{[prof: string]: number}>({});

  useEffect(() => {
    let res: Promise<ProfessorGPA>[] = section.instructors.map(async prof => (await api.get("https://api.joelchem.com/prof", {params: {prof: prof, course: course._id}})).data)
    if(res.length > 0) {
      res[0].then(res => {setGPA(res.gpa)});
    }
    
    res.forEach((promise, i) => promise.then(res => setRatings(
      ratings => (res.rating) ? {...ratings, [section.instructors[i]]: res.rating} : ratings)));

  }, [section.instructors, course])
  

  

  return (
    <div onClick={() => onclick(section)} className={styles.section}>
        <div className={styles.sectionTopRow}>
          <div className={styles.sectionID}>
            <span>{section.section_id}</span>
          </div>
          <div className={styles.instructors}>
            {
              section.instructors.map(name => (
                <span key={name}>
                  {name}
                  {
                    (rating[name]) ?
                    <span 
                      className={styles.profRating}
                      style={{backgroundColor: getGradientColor(backgroundGradient, 100*rating[name]/5)}}
                    >
                    {rating[name].toFixed(2)}
                    </span> : null
                  }
                </span>
              ))
            }
          </div>
          <div className={styles.gpa}>
            {gpa ? <span>GPA: <span style={{color: getGradientColor(textGradient, 100*gpa/4)}}>{gpa.toFixed(2)}</span></span>
            : null}
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
              // let type = ["warn", "x", "check", "neutral"][Math.floor(Math.random()*4)];
              let type = "neutral";
              return (
                <div className={styles.meeting} key={meeting.time} 
                  style={{
                    fontWeight: (type == "check" || type == "neutral") ? "normal" : "bold",  
                    color: (type == "check") ? "#868E96" : "inherit"
                  }}>
                  <div className={styles.meetingIndicator}>{type != "neutral" ? <img src={`/${type}.svg`}/> : null}</div>
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
