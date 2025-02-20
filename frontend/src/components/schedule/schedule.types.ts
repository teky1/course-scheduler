import { Course, Section } from "../../types/api";

export type ScheduleAreaComponent = React.FC<{sections: [Course, Section][]}>;