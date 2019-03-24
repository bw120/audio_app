import React, { Component } from "react";
import ReactDOM from "react-dom";
import ControlBar from "./interface/ControlBar.jsx";
import styles from './app.module';
const { ipcRenderer } = require('electron');

class App extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div>
        <h1 className={styles.red}>React is working!!!!</h1>
        <ControlBar/>
      </div>
    );
  }
}
export default App;