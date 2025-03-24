import { useContext } from "react";
import { getTimeBlocks, groupTimeBlocks, sectionIncluded } from "../../utils/sectionUtils";
import styles from "./schedule.module.css";
import { ScheduleAreaComponent } from "./schedule.types";
import { produceLines, renderSections } from "./utils/schedulePlacement";
import { AppContext } from "../app/App";

let ScheduleArea: ScheduleAreaComponent = ({ sections }) => {

  let appContext = useContext(AppContext);

  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];
  let ghost = false;
  if (appContext?.hovered != null && !sectionIncluded(appContext.hovered, sections)) {
    sections = sections.concat([appContext.hovered]);
    ghost = true;
  }

  let blocks = getTimeBlocks(sections);
  let groups = groupTimeBlocks(blocks);

  return (
    <div className={styles.root}>
      <div className={styles.daysContainer}>
        {days.map((day) => (
          <span key={day} className={styles.dayLabel}>
            {day}
          </span>
        ))}
      </div>
      <div className={styles.sectionArea}>
        {produceLines(blocks)}
        {renderSections(groups, sections, (appContext && ghost) ? appContext.hovered : null)}
      </div>
    </div>
  );
};

export default ScheduleArea;
