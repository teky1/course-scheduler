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
import { getActiveSchedule, getScheduleList, saveSchedule, setActiveSchedule } from "./storage";
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { unusedColors } from "../schedule/utils/colors";

const api = setupCache(axios.create(), {
  ttl: 1000 * 60 * 5,
});

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
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
  colorMap: {[section: string]: number};
  setColorMap: React.Dispatch<React.SetStateAction<{[section: string]: number}>>;
  nextColor: number;
  setNextColor: React.Dispatch<React.SetStateAction<number>>;
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
  let [searchVal, setSearchVal] = useState<string>("");
  let [colorMap, setColorMap] = useState<{[section: string]: number}>({});
  let [nextColor, setNextColor] = useState<number>(0);

  useEffect(() => {
    // on first load
    console.log("first load")
    if(window.location.pathname.startsWith("/share/")) {
      let id = window.location.pathname.replace("/share/", "");
      api.get(`https://api.scheduleterp.com/schedule/get?id=${id}`).then(
        (response) => {
          if(response.data.success) {
            
            let out: [Course, Section][] = [];

            let promises = [];

            for(let sectionCode of response.data.schedule.sections) {
              let [courseID, sectionID]: string[] = sectionCode.split("-");

              promises.push(api.get(`https://api.scheduleterp.com/search/202508?query=${courseID}`).then((response) => {
                if(response.data.size) {
                  let course: Course = response.data.courses[0];
                  let section: Section | undefined = course.sections.find((s) => s.section_id == sectionID);
                  if(course && section) {
                    out.push([course, section])
                  }
                }
              }));
            }

            Promise.all(promises).then(() => {
              let sched = {
                id: crypto.randomUUID(),
                name: `Shared [${id}]`,
                colorMap: response.data.schedule.colorMap,
                sections: out
              }
              console.log(sched)
              saveSchedule(sched);
              setActiveSchedule(sched.id);
              window.location.href = window.location.href.replace("/share/"+id, "");
            });

            

          } else {
            console.log(response.data);
            alert("Couldn't load that schedule.");
          }
        }
      ).catch((error) => {
        console.error(error);
        alert("Couldn't load that schedule.");
      });
    }

    // check to see if there is a share URL

    let schedule = getActiveSchedule();
    let scheduleList = getScheduleList();

    // set everything for that active schedule
    setCurrentScheduleID(schedule.id);
    setSchedulesList(scheduleList);
  }, []);


  useEffect(() => {
    
    if(!currentScheduleID.trim()) {
      return;
    }

    saveSchedule({
      id: currentScheduleID,
      name: currentScheduleName,
      sections: selectedSections,
      colorMap: colorMap
    });
  }, [currentScheduleName, selectedSections, colorMap]);

  useEffect(() => {
    if(!currentScheduleID.trim()) {
      return;
    }
    setActiveSchedule(currentScheduleID);
    let schedule = getActiveSchedule();
    setColorMap(schedule.colorMap);
    setCurrentScheduleName(schedule.name);
    setSelectedSections(schedule.sections);
    setSchedulesList(getScheduleList());
    let colorOpts = unusedColors(schedule.sections, schedule.colorMap);
    setNextColor(colorOpts[Math.floor(Math.random()*colorOpts.length)]);
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
        setCurrentScheduleID,
        searchVal,
        setSearchVal,
        colorMap,
        setColorMap,
        nextColor,
        setNextColor
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
