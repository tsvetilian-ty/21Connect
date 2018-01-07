/* eslint-env browser */
const { generateToken } = require('../../models');
const electron = require('electron');
const { hostInfo } = require('../../utils');
const pcg = require('../../package.json');
const path = require('path');
const fs = require('fs');

const CaptureDesktop = () => {
  const saveScreenShotPath = path.join(__dirname, '../../', 'assets/tmp', 'desktop.png');

  const getScreenSize = electron.screen.getPrimaryDisplay().workAreaSize;
  const maximumDimentions = Math.max(getScreenSize.width, getScreenSize.height);

  const options = {
    types: ['screen'],
    thumbnailSize: {
      width: maximumDimentions * window.devicePixelRatio,
      height: maximumDimentions * window.devicePixelRatio,
    },
  };

  electron.desktopCapturer.getSources(options, (err, sources) => {
    if (err) console.log(err);
    sources.forEach((source) => {
      if (source.name === 'Entire screen' || source.name === 'Screen 1') {
        fs.writeFile(saveScreenShotPath, source.thumbnail.toPng(), (savingErr) => {
          if (savingErr) { console.log(savingErr); }
        });
      }
    });
  });
};

const appTitle = `${pcg.name}`;
document.getElementById('app_title').innerHTML += appTitle;

const appBuild = `Version: ${pcg.version}`;
document.getElementById('build').innerHTML += appBuild;

const instructions = `To connect your mobile device to ${hostInfo.name} scan the code!`;
document.getElementById('instructions').innerHTML += instructions;

const qrCodeGenerator = () => {
  generateToken((token) => {
    const qrcode = `connect21://${hostInfo.ip}/${hostInfo.name}?token=${token}`;
    console.log(qrcode);
    QRCode.toCanvas(document.getElementById('_canvas'), qrcode, (err) => {
      if (err) {
        electron.ipcRenderer.send('qr-generating-error', err);
      }
    });
  });
};

qrCodeGenerator();
CaptureDesktop();
