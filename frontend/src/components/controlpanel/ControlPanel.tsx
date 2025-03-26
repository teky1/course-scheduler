import { useContext } from "react";
import styles from "./controlpanel.module.css";
import { AppContext } from "../app/App";

function ControlPanel() {

    let appContext = useContext(AppContext);

    return (
        <div className={`${styles.root} ${(appContext?.controlPanelToggled) ? styles.rootOpen : ""}`}>
            hi
        </div>
    )
}

export default ControlPanel;