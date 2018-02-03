// Register utility file
const devices = require('./devices');

// Make the utility public
module.exports = {
  generateToken: devices.generateToken,
  isAuth: devices.isAuth,
  revokeToken: devices.revokeToken,
};
