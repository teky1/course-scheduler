import { useState } from "react";
import styles from "./navbar.module.css";
import '@fortawesome/fontawesome-free/css/all.css';

import { AppShell, Title } from "@mantine/core";

function Navbar({searchToggle}: {searchToggle: (b: boolean) => void}) {
  
  let [searchOpen, setSearchOpen] = useState<boolean>(false);

  return (
    <AppShell.Header className={styles.header}>
      <button
        className={styles.searchToggle}
        onClick={() => setSearchOpen(last => {searchToggle(!last); return !last})}
      >{!searchOpen ? 
          <i className="fa-sharp fa-solid fa-magnifying-glass"></i> 
          : 
          <i className="fa-sharp fa-solid fa-arrow-left"></i>
        }</button>

      <a href="/" style={{textDecoration: "none"}}>
        <Title className={styles.logoText}>ScheduleTerp</Title>
      </a>
      
    </AppShell.Header>
    
  );
}

export default Navbar;
