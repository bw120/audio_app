import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
const { ipcRenderer } = require('electron');

const ControlBar = (props) => {

    useEffect(() => {
        ipcRenderer.on('volume-status', updateVolume)

        return () => {
            ipcRenderer.removeListener('volume-status', updateVolume)
        };
    }, []);

    const updateVolume = function(event, arg) {
        console.log(event, arg)
    }

    const changeVolume = function(e, direction) {
        if (e != null) {
            e.preventDefault();
        }

        console.log("volume ", direction);
        ipcRenderer.send('volume', direction)
    }

    return (
        <div>
        <span>Volume</span> <a onClick={(e) => {changeVolume(e, "up")}}>Up</a> | 
        <a onClick={(e) => {changeVolume(e, "down")}}>Down</a> | 
        <a onClick={(e) => {changeVolume(e, "mute")}}>Mute</a>
      </div>
    );
}

export default ControlBar;