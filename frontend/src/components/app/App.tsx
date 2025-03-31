import "@mantine/core/styles.css";
import styles from "./app.module.css";

// import { useState } from 'react';
import { AppShell, MantineProvider } from "@mantine/core";
import Navbar from "../navbar/Navbar";
import CourseList from "../courselist/CourseList";
import ScheduleArea from "../schedule/ScheduleArea";
import { createContext, useEffect, useState } from "react";
import { Course, Schedule, Section } from "../../types/api";
import { Toaster } from "react-hot-toast";
import ControlPanel from "../controlpanel/ControlPanel";
import { getActiveSchedule, getSchedule, getScheduleList, saveSchedule, setActiveSchedule } from "./storage";

export type AppContextType = {
  hovered: [Course, Section] | null;
  setHovered: React.Dispatch<React.SetStateAction<[Course, Section] | null>>;
  selectedSections: [Course, Section][];
  setSelectedSections: React.Dispatch<
    React.SetStateAction<[Course, Section][]>
  >;
  controlPanelToggled: boolean;
  setControlPanelToggle: React.Dispatch<React.SetStateAction<boolean>>;
  schedulesList: Schedule[];
  setSchedulesList: React.Dispatch<React.SetStateAction<Schedule[]>>;
  currentScheduleName: string;
  setCurrentScheduleName: React.Dispatch<React.SetStateAction<string>>;
  currentScheduleID: string;
  setCurrentScheduleID: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = createContext<AppContextType | null>(null);

function App() {
  let [selectedSections, setSelectedSections] = useState<[Course, Section][]>(
    []
  );
  let [hovered, setHovered] = useState<[Course, Section] | null>(null);
  let [searchBarToggled, setSearchBarToggle] = useState<boolean>(false);
  let [controlPanelToggled, setControlPanelToggle] = useState<boolean>(false);
  let [currentScheduleName, setCurrentScheduleName] = useState<string>("");
  let [currentScheduleID, setCurrentScheduleID] = useState<string>("");
  let [schedulesList, setSchedulesList] = useState<Schedule[]>([]);

  useEffect(() => {
    // on first load

    // check to see if there is a share URL

    let schedule = getActiveSchedule();
    let scheduleList = getScheduleList();

    // set everything for that active schedule
    setCurrentScheduleID(schedule.id);
    setCurrentScheduleName(schedule.name);
    setSelectedSections(schedule.sections);
    setSchedulesList(scheduleList);
  }, []);

  useEffect(() => {
    saveSchedule({
      id: currentScheduleID,
      name: currentScheduleName,
      sections: selectedSections,
    });
  }, [currentScheduleName, selectedSections]);

  useEffect(() => {
    setActiveSchedule(currentScheduleID);
    let schedule = getSchedule(currentScheduleID);
    setCurrentScheduleName(schedule.name);
    setSelectedSections(schedule.sections);
  }, [currentScheduleID]);

  return (
    <AppContext.Provider
      value={{
        hovered,
        setHovered,
        selectedSections,
        setSelectedSections,
        controlPanelToggled,
        setControlPanelToggle,
        schedulesList,
        setSchedulesList,
        currentScheduleName,
        setCurrentScheduleName,
        currentScheduleID,
        setCurrentScheduleID
      }}
    >
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
            <ControlPanel />
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </AppContext.Provider>
  );
}

export default App;
