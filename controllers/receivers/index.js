// Register receivers
exports.newNotification = require('./newNotification').receive;
exports.chargingBattery = require('./chargingBattery').receive;
exports.lowBattery = require('./lowBattery').receive;
exports.incomingCall = require('./incomingCall').receive;
