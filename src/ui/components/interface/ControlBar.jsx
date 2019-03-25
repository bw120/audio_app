import React, { useEffect, useState } from "react";
const { ipcRenderer } = require('electron');
import { PlayerIcon } from 'react-player-controls'
import styles from '../../styles/components/ControlBar.module';

const ControlBar = (props) => {

    useEffect(() => {
        ipcRenderer.on('volume-status', updateVolume);

        ipcRenderer.send('volume', 'get')

        return () => {
            ipcRenderer.removeListener('volume-status', updateVolume)
        };
    }, []);

    const [volumeState, setVolumeState] = useState(true);

    const updateVolume = function(event, arg) {
        setVolumeState(arg);
    }

    const changeVolume = function(e, direction) {
        if (e != null) {
            e.preventDefault();
        }

        ipcRenderer.send('volume', direction)
    }

    return (
        <div className={styles.controlBar}>
            <a onClick={(e) => {changeVolume(e, "up")}}>+</a> <span>{ volumeState.volume }</span>
            <a onClick={(e) => {changeVolume(e, "mute")}} className={styles.iconButton}>
                {
                    (volumeState.muted) ?
                        (<PlayerIcon.SoundOff width={30} height={30} fill="#ff0000" stroke="#ff0000" />) : (<PlayerIcon.SoundOn width={30} height={30} fill="#fff" stroke="#fff" />)
                }
            </a>
            <a onClick={(e) => {changeVolume(e, "down")}}>-</a>
      </div>
    );
}

export default ControlBar;