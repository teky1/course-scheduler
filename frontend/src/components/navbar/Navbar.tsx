import styles from "./navbar.module.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { AppShell, Title } from "@mantine/core";

function Navbar({
  searchOpen,
  searchToggle,
}: {
  searchOpen: boolean;
  searchToggle: (b: boolean) => void;
}) {
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
    </AppShell.Header>
  );
}

export default Navbar;
