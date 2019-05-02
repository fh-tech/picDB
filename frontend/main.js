"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win, serve;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });
function createWindow() {
    var size = electron_1.screen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: {
            nodeIntegration: true
        }
    });
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/node_modules/electron")
        });
        win.loadURL('http://localhost:4200');
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    // TODO: uncomment again -- to avoid opening devTools when running npm run electron:local:dev
    // if (serve) {
    win.webContents.openDevTools();
    // }
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    createMenu();
}
function createMenu() {
    var template = [
        {
            label: 'Images',
            submenu: [
                {
                    label: 'Manage',
                    click: function (item, focusedWindow) {
                        sendNavigateImage();
                    }
                },
                {
                    label: 'Choose folder',
                    click: function (item, focusedWindow) {
                        var folderPaths = selectDirectory();
                        if (folderPaths) {
                            sendFolderPath(folderPaths[0]);
                        }
                    }
                },
            ]
        },
        {
            label: 'Photographer',
            submenu: [
                {
                    label: 'Manage',
                    click: function (item, focusedWindow) {
                        sendNavigatePhotographer();
                    }
                }
            ]
        }
    ];
    var menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
/////// ipc ///////
electron_1.ipcMain.on('getFolderPath', function (event, arg) {
    var folderPath = selectDirectory();
    if (folderPath) {
        sendFolderPath(folderPath[0]);
    }
});
function sendFolderPath(folderPath) {
    if (folderPath) {
        win.webContents.send('folderPath', folderPath);
    }
}
function sendNavigatePhotographer() {
    win.webContents.send('photographers');
}
function sendNavigateImage() {
    win.webContents.send('images');
}
function selectDirectory() {
    return electron_1.dialog.showOpenDialog(win, {
        title: 'Folder to load images from',
        // defaultPath: 'D:\\electron-app',
        buttonLabel: 'Choose folder',
        properties: ['openDirectory']
    });
}
//# sourceMappingURL=main.js.map