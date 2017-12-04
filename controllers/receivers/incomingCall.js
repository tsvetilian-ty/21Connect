const notification = require('../notifications');

exports.receive = (data) => {
  notification.factory('INCOMING_CALL', 'Incoming call', `${data.number} is calling...`, 'inc_call', data);
};
