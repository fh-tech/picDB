import {app, BrowserWindow, ipcMain, dialog} from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

let win: BrowserWindow;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600});

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/angular-electron/index.html`),
      protocol: 'file:',
      slashes: true
    })
  );

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

/////// ipc ///////
ipcMain.on('getFolderPath', (event, arg) => {
  const folderPath = selectDirectory();
  win.webContents.send('returnFolderPath', folderPath);
});

function selectDirectory() {
  const folderPath = dialog.showOpenDialog(win, {
    title: 'Folder to load images from',
    // defaultPath: 'D:\\electron-app',
    buttonLabel: 'Choose folder',
    properties: ['openDirectory']
  });
  console.log(folderPath);
  return folderPath;
}



