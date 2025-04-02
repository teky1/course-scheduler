import { MeetingBlockComponent } from "./schedule.types";
import styles from "./schedule.module.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Day } from "../../types/api";
import { timeToPercent } from "./utils/schedulePlacement";
import { useContext } from "react";
import { AppContext } from "../app/App";
import { minifyTimeCode } from "../../utils/sectionUtils";

const BORDER_RADIUS = 0.2; //em
const MARGIN = 0.25 + 2 * BORDER_RADIUS; // em


const days: Day[] = ["M", "Tu", "W", "Th", "F"];

function addSpace(courseID: string): string {
  const match = courseID.match(/\d/);
  if (!match) return courseID;

  const index = match.index!;
  return courseID.slice(0, index) + "​" + courseID.slice(index);
}

let getDayLeft: (day: Day) => number = (day) => days.indexOf(day) * 20;

let MeetingBlock: MeetingBlockComponent = ({
  block,
  groupSize,
  groupIndex,
  range,
  // sectionOrder,
  ghost
}) => {

  let appContext = useContext(AppContext);

  if (block.day == "Other") {
    return <></>;
  }

  
  let sectionCode = block.course._id+"-"+block.section.section_id;
  
  return (
    <div
      className={`${styles.meetingRoot} ${ghost ? styles.ghostBlock : ''}`}
      style={
        {
          width: `calc((20% / ${groupSize}) - ${MARGIN}em)`,
          left: `calc(${getDayLeft(block.day)}% + ${
            MARGIN / 2
          }em + (${groupIndex} * (20% / ${groupSize})))`,
          top: `calc(${timeToPercent(
            block.start,
            range
          )}% + ${BORDER_RADIUS}em)`,
          bottom: `calc(${
            100 - timeToPercent(block.end, range)
          }% + ${BORDER_RADIUS}em)`,
          "--hue": (ghost || (appContext && !(sectionCode in appContext.colorMap))) ? appContext?.nextColor : appContext?.colorMap[sectionCode],
        } as React.CSSProperties
      }
    >
      <div className={styles.meetingInner}>
        <i className={`fa-solid fa-xmark ${styles.meetingRemove}`} onClick={() => {
          appContext?.setSelectedSections(old => old.filter(([c, s]) =>
              !(c._id == block.course._id && s.section_id == block.section.section_id)))
        }}></i>
        <span className={styles.courseId}>{addSpace(block.course._id)}</span>
        <span className={styles.sectionId}> {block.section.section_id}</span>
        <br />
        <span className={styles.meetingLoc}>
          {block.meeting.location.replace(" ", "")}
        </span>
        <span className={styles.meetingTime}>
          {" "}
          @ {minifyTimeCode(block.meeting.time)}
        </span>
      </div>
    </div>
  );
};

export default MeetingBlock;
