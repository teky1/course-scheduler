import { useContext, useState } from "react";
import styles from "./controlpanel.module.css";
import { AppContext } from "../app/App";
import { Button, Collapse } from "@mantine/core";
import { createSchedule, deleteSchedule, getScheduleList, saveSchedule } from "../app/storage";

function ControlPanel() {

    let appContext = useContext(AppContext);

    let [nameDropdownToggled, setNameDropdownToggle] = useState<boolean>(false);

    return (
        <div className={`${styles.root} ${(appContext?.controlPanelToggled) ? styles.rootOpen : ""}`}>
            <div className={`${styles.saveButtonsContainer}`}>
                <Button 
                    classNames={{label: styles.btnLabel, root: styles.btn}}
                    leftSection={<i className="fa-solid fa-link"></i>}
                    onClick={() => alert("link sharing WIP")}
                >Share Link</Button>
                <Button 
                    classNames={{label: styles.btnLabel, root: styles.btn}}
                    leftSection={<i className="fa-regular fa-calendar"></i>}
                    onClick={() => alert("calendar export WIP")}
                >Export Calendar</Button>

            </div>
            <div className={styles.scheduleSelectContainer}>
                <i 
                    className={`${styles.dropdownIcon} fa-solid fa-caret-${nameDropdownToggled ? "down": "right"}`}
                    onClick={()=>setNameDropdownToggle(last => !last)}
                ></i>
                <input 
                    className={styles.nameEditBox} 
                    value={appContext?.currentScheduleName} 
                    onChange={e => appContext?.setCurrentScheduleName(e.target.value.substring(0,32))}
                    onBlur={() => appContext?.setCurrentScheduleName(last => last.trim() ? last : "Unnamed Schedule")}
                ></input>
                <i 
                    className={`${styles.addBtn} fa-solid fa-plus`}
                    onClick={() => {
                        let sched = createSchedule();
                        let id = sched.id;
                        
                        saveSchedule(sched);
                        appContext?.setCurrentScheduleID(id);
                        setNameDropdownToggle(true);
                    }}></i>
            </div>
            <Collapse className={styles.otherSchedulesContainer} in={nameDropdownToggled}>
                {
                    appContext?.schedulesList.map(schedule => ((schedule.id == appContext.currentScheduleID) ? null :
                        <div className={styles.otherSchedules} 
                            key={schedule.id}>
                            <span className={styles.otherScheduleTitle}
                                onClick={() => appContext.setCurrentScheduleID(schedule.id)}
                            >{schedule.name}</span>
                            <i className={`${styles.deleteScheduleBtn} fa-solid fa-trash`}
                            onClick={() => {
                                let confirm = window.confirm(`Are you sure you want to delete \"${schedule.name}\"?`);
                                if(!confirm) {return;};
                                deleteSchedule(schedule.id);
                                appContext.setSchedulesList(() => getScheduleList());
                            }}></i>
                        </div>
                    ))
                }
            </Collapse>
            
        </div>
    )
}

export default ControlPanel;