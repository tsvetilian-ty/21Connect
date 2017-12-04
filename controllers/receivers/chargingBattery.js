const notification = require('../notifications');

exports.receive = () => {
  notification.factory('CHARGING_BATTERY');
};
