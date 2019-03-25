import React from "react";
import Clock from "./Clock.jsx";
import styles from '../styles/StatusBar.module';

const StatusBar = (props) => {
    return (
        <div className={styles.statusBar}>
            <div>App - current status</div>
            <Clock/>
        </div>
    );
}

export default StatusBar;