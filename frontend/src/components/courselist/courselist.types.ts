import { Course, Section } from "../../types/api";

export type CourseListComponent = React.FC<{
  update: React.Dispatch<React.SetStateAction<[Course, Section][]>>
}>;

export type CourseResultComponent = React.FC<{
  course: Course,
  onSectionSelect: (course: Course, section: Section) => void
}>;

export type SectionResultComponent = React.FC<{section: Section, onclick: (section: Section) => void}>;
