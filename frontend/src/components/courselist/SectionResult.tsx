import { textGradient, getGradientColor, backgroundGradient } from "../schedule/utils/colors";
import styles from "./courselist.module.css";

import { SectionResultComponent } from "./courselist.types";
import { setupCache } from "axios-cache-interceptor";
import axios from "axios";
import { useState } from "react";
import { ProfessorGPA } from "../../types/api";


const api = setupCache(axios.create(), {
  ttl: 1000*60*5
});


const SectionResult: 
  SectionResultComponent = ({section, onclick}) => {
  
  let [gpa, setGPA] = useState<number | null>(Math.round((Math.random()*3+1)*100)/100);
  let [rating, setRatings] = useState<{[prof: string]: number}>({});
  
  // api.get(`https://api.joelchem.com/search/202508`, {params: {query: event.target.value}})
  // api.get("https://api.joelchem.com/prof", {params: {prof: se}})
  // CONSIDER HAVING MULTIPLE PROFESSORS AND HOW THAT AFFECTS THINGSSS

  if(section.instructors.length > 0) {
    api.get("https://api.joelchem.com/prof", {params: {prof: section.instructors}});
  }

  let res: Promise<ProfessorGPA>[] = section.instructors.map(async prof => 
    await api.get("https://api.joelchem.com/prof", {params: {prof: section.instructors}}));
  
  if(section.instructors.length > 0) {
    res[0].then(res => setGPA(res.gpa))
  }
  
  res.forEach((promise, i) => promise.then(res => setRatings(ratings => {...ratings, })))
  

  return (
    <div onClick={() => onclick(section)} className={styles.section}>
        <div className={styles.sectionTopRow}>
          <div className={styles.sectionID}>
            <span>{section.section_id}</span>
          </div>
          <div className={styles.instructors}>
            {
              section.instructors.map((name, i) => (
                <span key={name}>
                  {name}
                  {
                    (rating) ?
                    <span 
                      className={styles.profRating}
                      style={{backgroundColor: getGradientColor(backgroundGradient, 100*rating[i]/5)}}
                    >
                    {rating}
                    </span> : null
                  }
                </span>
              ))
            }
          </div>
          <div className={styles.gpa}>
            {gpa ? <span>GPA: <span style={{color: getGradientColor(textGradient, 100*gpa/4)}}>{gpa}</span></span>
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
