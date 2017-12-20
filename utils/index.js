// Register utility file
const hostInfo = require('./hostInfo');
const logger = require('./logger');
const contextMenu = require('./contextMenu');
const images = require('./images');

// Make the utility public
module.exports = {
  contextMenu: contextMenu.contextMenuConfig,
  getImg: images.getImg,
  getTmp: images.getTmp,
  deleteTmp: images.deleteTmp,
  socketLog: logger.log,
  sysLog: logger.sys,
  hostInfo: hostInfo.hostInfo,
};
