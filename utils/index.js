const hostInfo = require('./hostInfo');
const images = require('./images');
const logger = require('./logger');

module.exports = {
    getImg: images.getImg,
    hostInfo: hostInfo.hostInfo,
    socketLog: logger.log,
    sysLog: logger.sys,
  };