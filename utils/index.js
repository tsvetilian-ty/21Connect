const hostInfo = require('./hostInfo');
const images = require('./images');

module.exports = {
    getImg: images.getImg,
    hostInfo: hostInfo.hostInfo,
  };