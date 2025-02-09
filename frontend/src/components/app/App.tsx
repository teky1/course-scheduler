import '@mantine/core/styles.css';
import styles from "./app.module.css";

// import { useState } from 'react';
import {AppShell, MantineProvider } from '@mantine/core';
import Navbar from '../navbar/Navbar';
import CourseList from '../courselist/CourseList';
import ScheduleArea from '../schedule/ScheduleArea';


function App() {
  // const [count, setCount] = useState(0);

  return (
    <MantineProvider forceColorScheme='dark'>
      <AppShell
        header={{height: "4rem"}}
      >
        <Navbar/>

        <AppShell.Main className={styles.main}>
          <CourseList/>
          <ScheduleArea/>
        </AppShell.Main>

      </AppShell>
    </MantineProvider>
  );
}

export default App
