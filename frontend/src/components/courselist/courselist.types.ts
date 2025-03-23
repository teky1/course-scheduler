import { Course, Section } from "../../types/api";

export type CourseListComponent = React.FC<{
  selectedSections: [Course, Section][],
  update: React.Dispatch<React.SetStateAction<[Course, Section][]>>,
  toggled: boolean
}>;

export type CourseResultComponent = React.FC<{
  course: Course,
  selectedSections: [Course, Section][],
  onSectionSelect: (course: Course, section: Section) => void
}>;

export type SectionResultComponent = React.FC<{section: Section, course: Course, 
  selectedSections: [Course, Section][], onclick: (section: Section) => void}>;
