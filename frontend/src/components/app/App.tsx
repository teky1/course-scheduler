import "@mantine/core/styles.css";
import styles from "./app.module.css";

// import { useState } from 'react';
import { AppShell, MantineProvider } from "@mantine/core";
import Navbar from "../navbar/Navbar";
import CourseList from "../courselist/CourseList";
import ScheduleArea from "../schedule/ScheduleArea";
import { useState } from "react";
import { Course, Section } from "../../types/api";
import { Toaster } from "react-hot-toast";

function App() {
  let [selectedSections, setSelectedSections] = useState<[Course, Section][]>(
    []
  );
  let [searchBarToggled, setSearchBarToggle] = useState<boolean>(false);

  return (
    <MantineProvider forceColorScheme="dark">
      <div className={styles.toast}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 1500,
            style: {
              background: "#495057",
              color: "#C9C9C9",
              fontWeight: "bold",
            },
          }}
        />
      </div>
      <AppShell header={{ height: "4rem" }}>
        <Navbar searchToggle={(b) => setSearchBarToggle(b)} />

        <AppShell.Main className={styles.main}>
          <CourseList
            selectedSections={selectedSections}
            update={setSelectedSections}
            toggled={searchBarToggled}
          />
          <ScheduleArea sections={selectedSections} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
