
/*
active: active schedule
totalCreated: 0;
schedules: {
    id: Schedule
}

*/
import { Schedule } from "../../types/api";

export function saveSchedule(schedule: Schedule) {
    // Save a schedule to storage
    let stored = localStorage.getItem("schedules");
    if(!stored) {
        localStorage.setItem("schedules", JSON.stringify({}))
        stored = "{}";
    }
    let schedules: {[id: string]: Schedule} = JSON.parse(stored);

    schedules[schedule.id] = schedule;

    localStorage.setItem("schedules", JSON.stringify(schedules))
}

export function getSchedule(id: string): Schedule | null {

    let stored = localStorage.getItem("schedules");
    if(!stored) {
        return null;
    }
    let schedules: {[id: string]: Schedule} = JSON.parse(stored);
    if(id in schedules) {
        return schedules[id];
    }
    return null;
}

export function createSchedule() {
    let stored = localStorage.getItem("totalCreated");
    let n = (stored) ? parseInt(stored) : 0;

    let newSchedule = {
        id: crypto.randomUUID(),
        name: `Schedule ${n+1}`,
        sections: [] 
    }

    localStorage.setItem("totalCreated", `${n+1}`)
    return newSchedule;
}

export function getActiveSchedule(): Schedule {

    // Ensure there is an active schedule (if there isn't create one)
    let activeID = localStorage.getItem("active");
    if(activeID) {
        let activeSchedule = getSchedule(activeID);
        if(activeSchedule) {
            return activeSchedule;
        }
    }

    let scheduleList = getScheduleList();
    if(scheduleList.length > 0) {
        setActiveSchedule(scheduleList[0].id);
        return scheduleList[0];
    }

    let newSchedule = createSchedule();

    saveSchedule(newSchedule);
    setActiveSchedule(newSchedule.id);
    return newSchedule;
}

export function deleteSchedule(id: string) {
    let stored = localStorage.getItem("schedules");
    if(!stored) {
        localStorage.setItem("schedules", JSON.stringify({}))
        stored = "{}";
    }
    
    let schedules: {[id: string]: Schedule} = JSON.parse(stored);
    let {[id]: string, ...rest} = schedules;
    console.log(schedules, rest);
    localStorage.setItem("schedules", JSON.stringify(rest));
}

export function setActiveSchedule(id: string) {
    console.log("active sched "+id);
    localStorage.setItem("active", id);
}

export function getScheduleList(): Schedule[] {
    let stored = localStorage.getItem("schedules");
    if(!stored) {
        localStorage.setItem("schedules", JSON.stringify({}))
        stored = "{}";
    }
    let schedules: {[id: string]: Schedule} = JSON.parse(stored);
    return Object.values(schedules);
}