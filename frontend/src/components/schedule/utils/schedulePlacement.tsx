import { Fragment, JSX } from "react";
import { Course, Section, TimeBlock } from "../../../types/api";
import styles from "../schedule.module.css";
import { sameSection, timeToStr } from "../../../utils/sectionUtils";
import MeetingBlock from "../MeetingBlock";

export let line = (percent: number, time?: string) => (
  <Fragment key={percent}>
    <div
      className={styles.line}
      style={{ top: percent + "%" }}
      key={percent}
    ></div>
    {time ? (
      <span
        className={styles.lineTime}
        style={{ top: percent + "%" }}
        key={time}
      >
        {time}
      </span>
    ) : (
      <></>
    )}
  </Fragment>
);

export function getTimeRange(blocks: TimeBlock[]): {
  start: number;
  end: number;
} {
  let start: number = 24 * 60;
  let end: number = 0;

  for (let block of blocks) {
    if (block.day == "Other") {
      continue;
    }
    start = Math.min(start, block.start);
    end = Math.max(end, block.end);
  }

  if (end < start) {
    return { start: 9 * 60, end: 15 * 60 };
  }

  if(end - start >= 8*60) {
    return {start: start, end: end};
  }

  let s = Math.min(11*60, 60*Math.floor(start/60))

  return {
    start: s,
    end: Math.max(Math.max(15*60, s + 6*60), 60*Math.ceil(end/60 + 1))
  }


  // return {
  //   start: Math.min(start, 9*60),
  //   end: Math.max(16 * 60, 60 * (Math.floor(end / 60) + 1)),
  // };
}
export function timeToPercent(
  time: number,
  range: { start: number; end: number }
): number {
  return (100 * (time - range.start)) / (range.end - range.start);
}

export function produceLines(blocks: TimeBlock[]): JSX.Element[] {
  let range = getTimeRange(blocks);
  let out: JSX.Element[] = [];
  for (let i = range.start; i <= range.end; i += 30) {
    if (i % 60 == 0) {
      out.push(line(timeToPercent(i, range), timeToStr(i)));
    } else {
      out.push(line(timeToPercent(i, range)));
    }
  }
  return out;
}

export function renderSections(
  groups: TimeBlock[][],
  sections: [Course, Section][],
  hovered: [Course, Section] | null
): JSX.Element[] {
  let out: JSX.Element[] = [];
  let range = getTimeRange(groups.flat());

  groups.forEach((group, groupNum) => {
    group.forEach((block, i, arr) => {
      out.push(
        <MeetingBlock
          key={`${groupNum} ${i}`}
          block={block}
          groupIndex={i}
          groupSize={arr.length}
          range={range}
          sectionOrder={sections}
          ghost={sameSection(hovered, [block.course, block.section])}
        />
      );
    });
  });

  return out;
}
