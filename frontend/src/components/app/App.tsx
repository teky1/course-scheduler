import "@mantine/core/styles.css";
import styles from "./app.module.css";

// import { useState } from 'react';
import { AppShell, MantineProvider } from "@mantine/core";
import Navbar from "../navbar/Navbar";
import CourseList from "../courselist/CourseList";
import ScheduleArea from "../schedule/ScheduleArea";
import { createContext, useState } from "react";
import { Course, Section } from "../../types/api";
import { Toaster } from "react-hot-toast";
import ControlPanel from "../controlpanel/ControlPanel";

export type AppContextType = {
  hovered: [Course, Section] | null,
  setHovered: React.Dispatch<React.SetStateAction<[Course, Section] | null>>,
  selectedSections: [Course, Section][],
  setSelectedSections: React.Dispatch<React.SetStateAction<[Course, Section][]>>
  controlPanelToggled: boolean,
  setControlPanelToggle: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<AppContextType | null>(null);

function App() {
  let [selectedSections, setSelectedSections] = useState<[Course, Section][]>(
    []
  );
  let [hovered, setHovered] = useState<[Course, Section] | null>(null);
  let [searchBarToggled, setSearchBarToggle] = useState<boolean>(false);
  let [controlPanelToggled, setControlPanelToggle] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{
      hovered, setHovered, selectedSections, setSelectedSections, 
      controlPanelToggled, setControlPanelToggle
    }}>
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
          <Navbar
            searchOpen={searchBarToggled}
            searchToggle={(b) => setSearchBarToggle(b)}
          />

          <AppShell.Main className={styles.main}>
            <CourseList
              selectedSections={selectedSections}
              update={setSelectedSections}
              toggled={searchBarToggled}
              setToggled={(b) => setSearchBarToggle(b)}
            />
            <ScheduleArea sections={selectedSections} />
            <ControlPanel/>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </AppContext.Provider>

  );
}

export default App;
