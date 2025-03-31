import { useContext, useState } from "react";
import styles from "./controlpanel.module.css";
import { AppContext } from "../app/App";
import { Button, Collapse } from "@mantine/core";

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
                    onBlur={() => appContext?.setCurrentScheduleName(last => last.trim() ? last : "default")}
                ></input>
            </div>
            <Collapse className={styles.otherSchedulesContainer} in={nameDropdownToggled}>
                {
                    appContext?.schedulesList.map(schedule => (
                        <div className={styles.otherSchedules}>
                            <span>{schedule.name}</span>
                        </div>
                    ))
                }
            </Collapse>
            
        </div>
    )
}

export default ControlPanel;