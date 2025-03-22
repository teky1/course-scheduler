import { MeetingBlockComponent } from "./schedule.types";
import styles from "./schedule.module.css";
import { Day } from "../../types/api";
import { timeToPercent } from "./utils/schedulePlacement";

const BORDER_RADIUS = 0.2; //em
const MARGIN = 0.25 + 2*BORDER_RADIUS; // em

const COLORS = [0, 30, 60, 120, 180, 210, 230, 260, 300]

let MeetingBlock: MeetingBlockComponent = ({block, groupSize, groupIndex, range, sectionOrder}) => {

    function addSpace(courseID: string): string {
        const match = courseID.match(/\d/); 
        if (!match) return courseID; 
      
        const index = match.index!;
        return courseID.slice(0, index) + '​' + courseID.slice(index);
    }

    function minifyTimeCode(input: string): string {
        const timeMatch = input.match(/(\d{1,2}:\d{2}|\d{1,2})(am|pm)\s*-\s*(\d{1,2}:\d{2}|\d{1,2})(am|pm)/i);
        if (!timeMatch) return input;
      
        let [, startTime, startPeriod, endTime, endPeriod] = timeMatch;
      
        // Remove :00 from times like 9:00
        const simplifyTime = (time: string) => {
          return time.endsWith(':00') ? time.split(':')[0] : time;
        };
      
        startTime = simplifyTime(startTime);
        endTime = simplifyTime(endTime);
      
        const needsStartPeriod = startPeriod.toLowerCase() !== endPeriod.toLowerCase();
      
        return `${startTime}${needsStartPeriod ? startPeriod : ''}-${endTime}${endPeriod}`;
      }
      
      

    let days: Day[] = ["M", "Tu", "W", "Th", "F"];

    let getDayLeft : (day: Day) => number = day => days.indexOf(day)*20;

    if(block.day == "Other") {
        return <></>;
    }

    let sectionIndex = sectionOrder.findIndex(section => 
        section[0]._id == block.course._id 
        && section[1].section_id == block.section.section_id);

    return (
        <div 
            className={styles.meetingRoot}
            style={{
                width: `calc((20% / ${groupSize}) - ${MARGIN}em)`,
                left: `calc(${getDayLeft(block.day)}% + ${MARGIN/2}em + (${groupIndex} * (20% / ${groupSize})))`,
                top: `calc(${timeToPercent(block.start, range)}% + ${BORDER_RADIUS}em)`,
                bottom: `calc(${100-timeToPercent(block.end, range)}% + ${BORDER_RADIUS}em)`,
                '--hue': COLORS[sectionIndex % COLORS.length]
            } as React.CSSProperties}
        >
            <div className={styles.meetingInner}>
                <span className={styles.courseId}>{addSpace(block.course._id)}</span>
                <span className={styles.sectionId}> {block.section.section_id}</span>
                <br/>
                <span className={styles.meetingLoc}>{block.meeting.location.replace(" ", "")}</span>
                <span className={styles.meetingTime}> @ {minifyTimeCode(block.meeting.time)}</span>
            </div>
            
        </div>
    )
}

export default MeetingBlock;