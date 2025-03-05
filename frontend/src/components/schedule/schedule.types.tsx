import { Course, Section } from "../../types/api";
import { JSX } from "react";



export type ScheduleAreaComponent = React.FC<{sections: [Course, Section][]}>;