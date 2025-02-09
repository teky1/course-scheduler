import '@mantine/core/styles.css';

// import { useState } from 'react';
import {AppShell, MantineProvider } from '@mantine/core';
import Navbar from './components/navbar/Navbar';


function App() {
  // const [count, setCount] = useState(0);

  return (
    <MantineProvider forceColorScheme='dark'>
      <AppShell
        header={{height: "4rem"}}
      >
        <Navbar/>

        <AppShell.Main>
          <div>
            
          </div>
        </AppShell.Main>

      </AppShell>
    </MantineProvider>
  );
}

export default App
