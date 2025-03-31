
/*
active: active schedule

*/

import { act } from "react";
import { Schedule } from "../../types/api";

export function saveSchedule(schedule: Schedule) {

    // Save a schedule to storage

}

export function getSchedule(id: string): Schedule {

    // Get a schedule from its ID
    return {id: "", name: "", sections: []};
}

export function getActiveSchedule(): Schedule {

    // Ensure there is an active schedule (if there isn't create one)
    let activeID = localStorage.getItem("active");
    if(activeID) {
        return getSchedule(activeID);
    }

    let scheduleList = getScheduleList();
    if(scheduleList.length > 0) {
        setActiveSchedule(scheduleList[0].id);
        return scheduleList[0];
    }

    // CONSIDER WHAT HAPPENS WHEN YOU DELETE SCHEDULES

    let newSchedule = {
        id: crypto.randomUUID();
        name: "Schedule 1"
    }

    return {id: "", name: "", sections: []};
}

export function setActiveSchedule(id: string) {

}

export function getScheduleList(): Schedule[] {

    return [];
}