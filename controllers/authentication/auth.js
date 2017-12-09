const devices = require('../../models');
const { sysLog } = require('../../utils');

exports.autherization = (socket, next) => {
  const deviceToken = socket.handshake.query.auth;

  devices.isAuth(deviceToken, (auth) => {
    if (!auth) {
      return;
    }
    sysLog(socket.id);
    next();
  });
};
