const { app, BrowserWindow } = require('electron');
const appRoot = require('app-root-path');
const { ipcMain } = require('electron');

import VolumeControl from './modules/VolumeControl.js';

let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ 
    width: 800, 
    height: 600,
    frame: false,
    // titleBarStyle: 'hidden'
  })

  // load the index.html of the app.
  win.loadFile(appRoot + '/dist/ui/index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
}

// start up the window when Electron finishes loading
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

VolumeControl();