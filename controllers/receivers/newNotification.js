const notification = require('../notifications');
const youtube = require('../actions/youtubeActions');

exports.receive = (data) => {
  switch (data.pkg) {
    case 'com.android.systemui':
      notification.factory('SYS_UI_NOTIFICATION', `${data.title}`, `${data.content}`, 'system_android', data);
      break;
    case 'com.google.android.youtube':
      youtube.findVideo(data);
      break;
    case 'com.facebook.orca':
      if (data.title !== 'Chat heads active') {
        notification.factory('KNOWN_NOTIFICATION_SOURCE', `${data.title}`, `${data.content}`, 'messanger', data);
      }
      break;
    case 'com.viber.voip':
      notification.factory('KNOWN_NOTIFICATION_SOURCE', `${data.title}`, `${data.content}`, 'viber', data);
      break;
    case 'com.instagram.android':
      notification.factory('KNOWN_NOTIFICATION_SOURCE', `${data.title}`, `${data.content}`, 'instagram', data);
      break;
    case 'com.facebook.lite':
      notification.factory('KNOWN_NOTIFICATION_SOURCE', `${data.title}`, `${data.content}`, 'facebook', data);
      break;
    case 'com.facebook.katana':
      notification.factory('KNOWN_NOTIFICATION_SOURCE', `${data.title}`, `${data.content}`, 'facebook', data);
      break;
    case 'com.discord':
      notification.factory('KNOWN_NOTIFICATION_SOURCE', `${data.title}`, `${data.content}`, 'discord', data);
      break;
    case 'com.twitter.android':
      notification.factory('KNOWN_NOTIFICATION_SOURCE', `${data.title}`, `${data.content}`, 'twitter', data);
      break;
    default:
      notification.factory('NEW_NOTIFICATION', `${data.title}`, `${data.content}`, 'new_notification', data);
  }
};