const { app, BrowserWindow } = require('electron');
const appRoot = require('app-root-path');
const { ipcMain } = require('electron');

const configFile = require(__dirname + "/config.js");

import VolumeControl from './modules/VolumeControl.js';

const environment = process.env.NODE_ENV;

// Use the config options for the current env
const config = configFile[environment];

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow(config.browserWindowSettings)

  // load the index.html of the app.
  win.loadFile(__dirname + '/ui/index.html')

  // Open the DevTools in development mode
  if (config.browserWindowSettings.devTools) {
      win.webContents.openDevTools();
  }

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

// load modules 
VolumeControl();