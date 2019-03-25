import React, { Component } from "react";
const { ipcRenderer } = require('electron');

import ControlBar from "./interface/ControlBar.jsx";
import StatusBar from "./interface/StatusBar.jsx";

import styles from './styles/app.module';

class App extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div className={styles.app}>
        <StatusBar/>
        <div className={styles.mainScreen}>
          <h1 className={styles.red}>Main screen</h1>
        </div>
          
        <ControlBar/>
      </div>
    );
  }
}
export default App;