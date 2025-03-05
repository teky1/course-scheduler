import { Course, Section } from "../../types/api";
import { JSX } from "react";



export type ScheduleAreaComponent = React.FC<{sections: [Course, Section][]}>;

export type RenderSectionsFunc = (sections: [Course, Section][]) => JSX.Element[];