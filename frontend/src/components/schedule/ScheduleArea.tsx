import { getTimeBlocks, groupTimeBlocks } from "../../utils/sectionUtils";
import styles from "./schedule.module.css";
import { ScheduleAreaComponent } from "./schedule.types";
import { produceLines, renderSections } from "./utils/schedulePlacement";

let ScheduleArea: ScheduleAreaComponent = ({ sections }) => {
  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];

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
        {renderSections(groups, sections)}
      </div>
    </div>
  );
};

export default ScheduleArea;
