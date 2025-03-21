import { TextInput } from "@mantine/core";
import styles from "./courselist.module.css";
import { useEffect, useState } from "react";
import CourseResult from "./CourseResult";
import { Course, Section } from "../../types/api";
import { CourseListComponent } from "./courselist.types";
import { setupCache } from "axios-cache-interceptor";
import axios from "axios";

const api = setupCache(axios.create(), {
  ttl: 1000*60*5
});

const DEBOUNCE = 250;

let CourseList: 
  CourseListComponent = ({update}) => {
  
  let [searchVal, setSearchVal] = useState("");
  let [serachResults, setSearchResults] = useState<Course[]>([]);
  
  let sectionSelect: 
    (course: Course, section: Section) => void = (course, section) => {

    update(old => {
      if(old.some(([c, s]) => c._id == course._id && s.section_id == section.section_id)) {
        return old.filter(([c, s]) => !(c._id == course._id && s.section_id == section.section_id));
      } else {
        return [...old, [course, section]];
      }
    });
  } 

  useEffect(() => {

    const handler = setTimeout(async () => {
      let res = await api.get(`https://api.scheduleterp.com/search/202508`, {params: {query: searchVal}});

      if(res.status >= 200 && res.status < 300) {
        setSearchResults(res.data.courses);
      }
    }, DEBOUNCE);
    
    return () => {
      clearTimeout(handler); 
    };

  }, [searchVal])

  return (
    <div className={styles.root}>
        <TextInput
          classNames={{
            input: styles.searchBox
          }}
          value={searchVal}
          placeholder="Search courses..."
          onChange={event => setSearchVal(event.target.value)}
        />

        <div className={styles.resultsContainer}>
          {serachResults.map(course => 
          <CourseResult 
            key={course._id}
            course={course} 
            onSectionSelect={sectionSelect}
          />)}
        </div>

    </div>
  );
};

export default CourseList;
