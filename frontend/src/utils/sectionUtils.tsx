import { Course, Day, Section, TimeBlock } from "../types/api";

function parseTime(time: string) : number {

    const period = time.slice(-2).toLowerCase()
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

function doesIntersect(time1: TimeBlock, time2: TimeBlock) : boolean {
    return time1.start < time2.end && time2.start < time1.end;
}

export function parseMeetingTime(time: string) : {days: Day[]; start: number; end: number}{
    
    // If a section meeting has "TBA" "Class time/details on ELMS" or "Sa" or "Su"
    // in it then give it "Other" day
    if(time.includes("TBA") || time.includes("Class time/details on ELMS")
        || time.includes("Sa") || time.includes("Su")) {
        return {days: ["Other",], start: 0, end: 0}
    }

    let rawParts = time.split(" ");
    let days: Day[] = ["M", "Tu", "W", "Th", "F"];
    days = days.filter(day => rawParts[0].includes(day));



    return {days: days, start: parseTime(rawParts[1]), end:parseTime(rawParts[3])};
}


export function getTimeBlocks(sections: [Course, Section][]): TimeBlock[] {

    let out: TimeBlock[] = [];

    sections.forEach(section => {
        section[1].meetings.forEach(meeting => {

            let parsedTime = parseMeetingTime(meeting.time);
            parsedTime.days.forEach(day => {
                out.push({
                    course: section[0],
                    section: section[1],
                    meeting: meeting,
                    day: day,
                    start: parsedTime.start,
                    end: parsedTime.end
                });
            });


        });
    });

    return out;
}

export function groupTimeBlocks(blocks: TimeBlock[]): TimeBlock[][] {

    let out: TimeBlock[][] = [];

    for(let block of blocks) {
        for(let group of out) {

            for(let innerBlock of group) {
                if(doesIntersect(block, innerBlock)) {
                    group.push(block);
                } else {
                    // MAKE SURE TO CREATE LOGIC HERE SUCH THAT IF ONE SECTION 
                    // INTERSECTS WITH MULTIPLE OTHER GROUPS ITS HANDLED CORRECTLY
                }
                    
            }
        
        }
    }

    blocks.forEach(block => {
        out.forEach(group => {
            for(let innerBlock of group) {

            }
        })
    });

    return [];
}