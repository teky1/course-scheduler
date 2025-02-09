import styles from "./navbar.module.css";

import { AppShell, Center, Title } from "@mantine/core";

function Navbar() {
  
  return (
    <AppShell.Header className={styles.header}>
      <a href="/" style={{textDecoration: "none"}}>
        <Title className={styles.logoText}>ScheduleTerp</Title>
      </a>
      
    </AppShell.Header>
    
  );
}

export default Navbar;
