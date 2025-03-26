import styles from "./navbar.module.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { AppShell, Title } from "@mantine/core";
import { AppContext } from "../app/App";
import { useContext } from "react";

function Navbar({
  searchOpen,
  searchToggle,
}: {
  searchOpen: boolean;
  searchToggle: (b: boolean) => void;
}) {

  let appContext = useContext(AppContext);

  return (
    <AppShell.Header className={styles.header}>
      <button
        className={styles.searchToggle}
        onClick={() => searchToggle(!searchOpen)}
      >
        {!searchOpen ? (
          <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
        ) : (
          <i className="fa-sharp fa-solid fa-arrow-left"></i>
        )}
      </button>

      <a href="/" style={{ textDecoration: "none" }}>
        <Title className={styles.logoText}>ScheduleTerp</Title>
      </a>

      <button
        className={styles.controlToggle}
        onClick={() => appContext?.setControlPanelToggle(last => !last)}
      >
        {!appContext?.controlPanelToggled ? (
          <i className="fa-solid fa-gear"></i>
        ) : (
          <i className="fa-sharp fa-solid fa-arrow-right"></i>
        )}
      </button>
    </AppShell.Header>
  );
}

export default Navbar;
