import { useContext, useState } from "react";
import styles from "./controlpanel.module.css";
import { AppContext } from "../app/App";
import { Button, Collapse } from "@mantine/core";

function ControlPanel() {

    let appContext = useContext(AppContext);

    let [scheduleNameInp, setSchedNameInp] = useState<string>("Schedule 1");
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
                    value={scheduleNameInp} 
                    onChange={e => setSchedNameInp(e.target.value.substring(0,32))}
                    onBlur={() => setSchedNameInp(last => last ? last : "default")}
                ></input>
            </div>
            <Collapse className={styles.otherSchedulesContainer} in={nameDropdownToggled}>
                <span className={styles.otherSchedules}>Schedule 1</span>
                <span className={styles.otherSchedules}>Schedule 2</span>
                <span className={styles.otherSchedules}>Schedule 3</span>
                <span className={styles.otherSchedules}>Schedule 7</span>
            </Collapse>
            
        </div>
    )
}

export default ControlPanel;