import { useContext } from "react";
import styles from "./controlpanel.module.css";
import { AppContext } from "../app/App";
import { Button } from "@mantine/core";

function ControlPanel() {

    let appContext = useContext(AppContext);

    return (
        <div className={`${styles.root} ${(appContext?.controlPanelToggled) ? styles.rootOpen : ""}`}>
            <div className={`${styles.saveButtonsContainer}`}>
                <Button 
                    className={styles.urlBtn} 
                    classNames={{label: styles.btnLabel}}
                    leftSection={<i className="fa-solid fa-link"></i>}
                    onClick={() => alert("link sharing WIP")}
                >Share Link</Button>
                <Button 
                    className={styles.calBtn}
                    classNames={{label: styles.btnLabel}}
                    leftSection={<i className="fa-regular fa-calendar"></i>}
                    onClick={() => alert("calendar export WIP")}
                >Export Calendar</Button>
            </div>
        </div>
    )
}

export default ControlPanel;