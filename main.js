const { app, BrowserWindow } = require('electron');
const appName = require('./package.json').name;
const path = require('path');

let main = null;

const CreateWindow = () => {
    // Build Main Window
    main = new BrowserWindow({
      title: appName,
      width: 520,
      height: 200,
      show: false,
      resizable: false,
      skipTaskbar: true,
      frame: false,
    });
    main.loadURL(path.join(__dirname, 'views', 'index.html'));
    main.setMenuBarVisibility(false);
    main.on('closed', (e) => {
      main = null;
    });
  };

app.on('ready', () => {
    CreateWindow();
})