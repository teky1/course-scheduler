import { TextInput } from "@mantine/core";
import styles from "./courselist.module.css";
import { useState } from "react";
import CourseResult from "./CourseResult";

function CourseList() {

  let data = [
    {_id: "CMSC216", name: "Introduction to Computer Systems"},
    {_id: "HACS100", name: "Foundations in Cybersecurity I"},
    {_id: "CMSC351", name: "Algorithms"}
  ]
  

  let [searchVal, setSearchVal] = useState("");
  
  return (
    <div className={styles.root}>
        <h1>Course List</h1>
        <TextInput
          value={searchVal}
          placeholder="Search courses..."
          onChange={event => setSearchVal(event.target.value)}
        />

        <div>
          {data.map(data => <CourseResult id={data._id} name={data.name} />)}
        </div>

    </div>
  );
}

export default CourseList;
