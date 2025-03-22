import '@mantine/core/styles.css';
import styles from "./app.module.css";

// import { useState } from 'react';
import {AppShell, MantineProvider } from '@mantine/core';
import Navbar from '../navbar/Navbar';
import CourseList from '../courselist/CourseList';
import ScheduleArea from '../schedule/ScheduleArea';
import { useState } from 'react';
import { Course, Section } from '../../types/api';


function App() {
  const [selectedSections, setSelectedSections] = useState<[Course, Section][]>([]);

  return (
    <MantineProvider forceColorScheme='dark'>
      <AppShell
        header={{height: "4rem"}}
      >
        <Navbar/>

        <AppShell.Main className={styles.main}>
          <CourseList selectedSections={selectedSections} update={setSelectedSections}/>
          <ScheduleArea sections={selectedSections}/>
        </AppShell.Main>

      </AppShell>
    </MantineProvider>
  );
}

export default App
