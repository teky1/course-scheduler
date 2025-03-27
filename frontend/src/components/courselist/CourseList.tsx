import { TextInput } from "@mantine/core";
import styles from "./courselist.module.css";
import { useEffect, useRef, useState } from "react";
import CourseResult from "./CourseResult";
import { Course, Section } from "../../types/api";
import { CourseListComponent } from "./courselist.types";
import { setupCache } from "axios-cache-interceptor";
import axios from "axios";
import { CourseListGuide } from "./CourseListGuide";

const api = setupCache(axios.create(), {
  ttl: 1000 * 60 * 5,
});

const DEBOUNCE = 250;

let CourseList: CourseListComponent = ({
  selectedSections,
  update,
  toggled,
  setToggled,
}) => {
  let [searchVal, setSearchVal] = useState("");
  let [serachResults, setSearchResults] = useState<Course[]>([]);
  // let [guideShown, ]
  let inputRef = useRef<HTMLInputElement>(null);


  let sectionSelect: (course: Course, section: Section) => void = (
    course,
    section
  ) => {
    update((old) => {
      if (
        old.some(
          ([c, s]) => c._id == course._id && s.section_id == section.section_id
        )
      ) {
        return old.filter(
          ([c, s]) =>
            !(c._id == course._id && s.section_id == section.section_id)
        );
      } else {
        return [...old, [course, section]];
      }
    });
  };

  useEffect(() => {
    if (toggled && serachResults.length == 0) {
      inputRef.current?.focus();
    }
  }, [toggled]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      
      if(searchVal.trim() == "") {
        let out: Course[] = [];
        selectedSections.forEach(([course]) => {
          out = out.filter(c => c._id != course._id).concat([course]);
        })
        console.log(out);
        setSearchResults(out);
        return;
      }

      let res = await api.get(`https://api.scheduleterp.com/search/202508`, {
        params: { query: searchVal },
      });

      if (res.status >= 200 && res.status < 300) {
        setSearchResults(res.data.courses);
      }
    }, DEBOUNCE);

    return () => {
      clearTimeout(handler);
    };
  }, [searchVal]);

  return (
    <>
      {toggled ? (
        <div
          className={styles.exitCapture}
          onClick={() => setToggled(false)}
        ></div>
      ) : null}
      <div className={`${styles.root} ${toggled ? styles.rootOpen : ""}`}>
        <TextInput
          ref={inputRef}
          classNames={{
            input: styles.searchBox,
          }}
          value={searchVal}
          placeholder="Search courses..."
          onChange={(event) => setSearchVal(event.target.value)}
          spellCheck={false}
        />

        <div className={styles.resultsContainer}>
          {(searchVal.trim() == "" && false) ? <CourseListGuide /> : null}
          {serachResults.map((course) => (
            <CourseResult
              key={course._id}
              course={course}
              onSectionSelect={sectionSelect}
              selectedSections={selectedSections}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;
