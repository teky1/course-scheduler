import { HueSlider } from "@mantine/core";
import { Course, Section } from "../../types/api";
import styles from "./controlpanel.module.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../app/App";

function SectionComponent({ section }: { section: [Course, Section] }) {
  let appContext = useContext(AppContext);


  let sectionCode = section[0]._id+"-"+section[1].section_id;

  let [hue, setHue] = useState<number>((appContext && sectionCode in appContext.colorMap) ? appContext.colorMap[sectionCode] : 0);
  let [showSlider, setShowSlider] = useState<boolean>(false);

  useEffect(() => {
    appContext?.setColorMap((last) => {
      return ({ ...last, [sectionCode]: hue}); 
    });
  }, [hue])

  useEffect(() => {
    setShowSlider(false);
  }, [appContext?.currentScheduleID]);

  return (
    <div key={section[0]._id+section[1].section_id+appContext?.currentScheduleID} className={styles.section}>
      <div className={styles.sectionTop}>
        <div
          className={styles.colorBlock}
          style={
            {
              "--hue": `${appContext?.colorMap[sectionCode]}`,
            } as React.CSSProperties
          }
          onClick={() => setShowSlider((last) => !last)}
        ></div>
        <span className={styles.courseCode}>
          {sectionCode}
        </span>
        <i
          className={`fa-solid fa-xmark ${styles.sectionRemove}`}
          onClick={() =>
            appContext?.setSelectedSections((old) =>
              old.filter(
                ([co, se]) =>
                  !(co._id == section[0]._id && se.section_id == section[1].section_id)
              )
            )
          }
        ></i>
      </div>
      <div
        className={styles.sliderWrap}
        style={!showSlider ? { display: "none" } : {}}
      >
        <i
          className={`fa-solid fa-xmark ${styles.sliderClose}`}
          onClick={() => setShowSlider(false)}
        ></i>
        <HueSlider
          value={hue}
          onChange={setHue}
          classNames={{ slider: styles.slider }}
        />
      </div>
      {/* {s.instructors.map((instruc, i) => (
        <span className={styles.instructor} key={i}>
          {instruc}
        </span>
      ))}
      {s.meetings.map((meeting, i) => (
        <span key={i} className={styles.meeting}>
          {getDayPartOfTime(meeting.time) + " " + minifyTimeCode(meeting.time)}{" "}
          @ {meeting.location}
        </span>
      ))} */}
    </div>
  );
}

export default SectionComponent;
