import React from 'react';
import './App.css';
import HookTimer from './HookTimer.js'
// import { Button, Drawer, List, ListItem, ListItemText, Divider, FormControl, Input, InputLabel } from '@material-ui/core';

function App() {

  
  return (
    <div className="App font">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Encode+Sans+SC:wght@200&family=Raleway:wght@200&display=swap" rel="stylesheet"/>
      <h1 className="font">A Simple Timer</h1>
      <HookTimer/>
      
    </div>
  );
}

export default App;
