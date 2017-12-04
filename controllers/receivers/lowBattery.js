const notification = require('../notifications');

exports.receive = () => {
  notification.factory('LOW_BATTERY');
};
