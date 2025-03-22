import { Course, Section, TimeBlock } from "../../types/api"



export type ScheduleAreaComponent = React.FC<{sections: [Course, Section][]}>;

export type MeetingBlockComponent = React.FC<{
    block: TimeBlock, groupSize: number, groupIndex: number, 
    range: {start: number; end: number}, sectionOrder: [Course, Section][]
}>;