const {
  app, BrowserWindow, Menu, ipcMain, Tray, desktopCapturer,
} = require('electron');
const { contextMenu, getImg, sysLog } = require('./utils');
const appName = require('./package.json').name;
const path = require('path');
const fs = require('fs');
const Server = require('./controllers/mainController');

// Main window initialization
let main = null;
let tray = null;

app.setAppUserModelId('phone.integration.21connect');


const CreateWindow = () => {
  // Build Main Window
  main = new BrowserWindow({
    title: appName,
    icon: getImg('windows_tray_icon', 'ico'),
    width: 520,
    height: 200,
    show: false,
    resizable: false,
    skipTaskbar: true,
    frame: false,
  });
  main.loadURL(path.join(__dirname, 'views', 'mainView.html'));
  main.setMenuBarVisibility(false);
  main.on('closed', (e) => {
    main = null;
  });
};

const CreateTray = () => {
  // Build Tray Icon
  tray = new Tray(getImg('windows_tray_icon', 'ico'));
  tray.setToolTip(appName);
  tray.setContextMenu(Menu.buildFromTemplate(contextMenu));

  tray.on('click', () => {
    main.isVisible() ? main.hide() : main.show();
  });
};

app.on('ready', () => {
  CreateTray();
  CreateWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('qr-generating-error', (e) => {
  sysLog(e);
});
