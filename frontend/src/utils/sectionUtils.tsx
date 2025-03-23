import { Course, Day, Meeting, Section, TimeBlock } from "../types/api";

export function parseTime(time: string): number {
  const period = time.slice(-2).toLowerCase();
  time = time.slice(0, -2);

  let [hour, minute] = time.split(":").map(Number);

  if (period === "pm" && hour !== 12) {
    hour += 12;
  }
  if (period === "am" && hour === 12) {
    hour = 0;
  }

  return hour * 60 + minute;
}

// Gets the closest hour (floored)
export function timeToStr(time: number): string {
  let hour = Math.floor(time / 60);
  let ampm = hour < 12 ? "am" : "pm";
  hour = hour < 12 ? hour : hour - 12;
  hour = hour == 0 ? 12 : hour;

  return "" + hour + ampm;
}

export function doesIntersect(time1: TimeBlock, time2: TimeBlock): boolean {
  return (
    time1.day == time2.day && time1.start < time2.end && time2.start < time1.end
  );
}

export function parseMeetingTime(time: string): {
  days: Day[];
  start: number;
  end: number;
} {
  // If a section meeting has "TBA" "Class time/details on ELMS" or "Sa" or "Su"
  // in it then give it "Other" day
  if (
    time.includes("TBA") ||
    time.includes("Class time/details on ELMS") ||
    time.includes("Sa") ||
    time.includes("Su") ||
    time.trim() == ""
  ) {
    return { days: ["Other"], start: 0, end: 0 };
  }

  let rawParts = time.split(" ");
  let days: Day[] = ["M", "Tu", "W", "Th", "F"];
  days = days.filter((day) => rawParts[0].includes(day));

  return {
    days: days,
    start: parseTime(rawParts[1]),
    end: parseTime(rawParts[3]),
  };
}

export function getMeetingTimeBlocks(
  section: [Course, Section],
  meeting: Meeting
): TimeBlock[] {
  let out: TimeBlock[] = [];

  let parsedTime = parseMeetingTime(meeting.time);
  parsedTime.days.forEach((day) => {
    out.push({
      course: section[0],
      section: section[1],
      meeting: meeting,
      day: day,
      start: parsedTime.start,
      end: parsedTime.end,
    });
  });

  return out;
}

export function getTimeBlocks(sections: [Course, Section][]): TimeBlock[] {
  let out: TimeBlock[] = [];

  sections.forEach((section) => {
    section[1].meetings.forEach((meeting) => {
      out = out.concat(getMeetingTimeBlocks(section, meeting));
    });
  });

  return out;
}

export function groupTimeBlocks(blocks: TimeBlock[]): TimeBlock[][] {
  let out: TimeBlock[][] = [];

  for (let block of blocks) {
    let intersect: number[] = [];

    out.forEach((group, i) => {
      for (let innerBlock of group) {
        if (doesIntersect(block, innerBlock)) {
          intersect.push(i);
          break;
        }
      }
    });

    let newGroup = [block];
    intersect.forEach((i) => {
      newGroup = newGroup.concat(out[i]);
    });
    out = out.filter((_, i) => !intersect.includes(i));
    out.push(newGroup);
  }

  return out;
}
export type ConflictState = "check" | "warn" | "x" | "neutral";

export function getConflict(
  section: [Course, Section],
  meeting: Meeting,
  selected: [Course, Section][]
): ConflictState {
  if (parseMeetingTime(meeting.time).days.includes("Other")) {
    return "neutral";
  }

  let meetingBlocks = getMeetingTimeBlocks(section, meeting);
  let otherBlocks = getTimeBlocks(selected);

  let out: ConflictState = "check";

  otherBlocks.forEach((otherBlock) => {
    meetingBlocks.forEach((meetingBlock) => {
      if (
        doesIntersect(meetingBlock, otherBlock) &&
        section[0]._id != otherBlock.course._id
      ) {
        out = "x";
      }
    });
  });

  return out;
}
