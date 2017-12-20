const { ToastNotification, TileNotification, Template } = require('electron-windows-notifications');
const { shell } = require('electron');
const NotificationTokenTag = require('uuid-token-generator');
const {
  getImg, getTmp, socketLog, deleteTmp,
} = require('../../utils');
const path = require('path');

const appId = 'phone.integration.21connect';

exports.factory = (type, title, message, img, data) => {
  switch (type) {
    case 'LOW_BATTERY':
      const lowBattery = new ToastNotification({
        appId,
        template: `
        <toast scenario="reminder">
          <visual>
          <binding template="ToastGeneric">
              <image placement="appLogoOverride" hint-crop="circle" src="%s"/>
              <text hint-maxLines="1">%s</text>
              <text>%s</text>
            </binding>
          </visual>
          <audio src="ms-winsoundevent:Notification.Reminder"/>
        </toast>`,
        strings: [getImg('low_battery', 'png'), 'Battery', 'Your battery is low. Please, connect to charger!'],
      });

      lowBattery.show();
      socketLog(type);
      break;
    case 'CHARGING_BATTERY':
      const chargingBattery = new ToastNotification({
        appId,
        template: `
          <toast scenario="reminder">
            <visual>
            <binding template="ToastGeneric">
                <image placement="appLogoOverride" hint-crop="circle" src="%s"/>
                <text hint-maxLines="1">%s</text>
                <text>%s</text>
              </binding>
            </visual>
            <audio src="ms-winsoundevent:Notification.Reminder"/>
          </toast>`,
        strings: [getImg('charging', 'png'), 'Battery', 'Your battery is charging.'],
      });

      chargingBattery.show();
      socketLog(type);
      break;
    case 'INCOMING_CALL':
      const incomingCall = new ToastNotification({
        appId,
        template: `
          <toast scenario="reminder">
            <visual>
            <binding template="ToastGeneric">
                <image placement="appLogoOverride" hint-crop="circle" src="%s"/>
                <text hint-maxLines="1">%s</text>
                <text>%s</text>
              </binding>
            </visual>
            <audio src="ms-winsoundevent:Notification.Looping.Call"/>
          </toast>`,
        strings: [getImg(img, 'png'), title, message],
      });

      incomingCall.show();
      socketLog(type);
      break;
    case 'YOUTUBE':
      const youtubeNotification = new ToastNotification({
        appId,
        group: data.pkg,
        tag: new NotificationTokenTag().generate(),
        template: `
        <toast>
          <visual>
            <binding template="ToastGeneric">
              <image placement="appLogoOverride" hint-crop="circle" src="%s"/>
              <text hint-maxLines="1">%s</text>
              <text>%s</text>
              <text placement="attribution">Via Youtube</text>
            </binding>
          </visual>
        </toast>`,
        strings: [getImg(img, 'png'), title, message],
      });

      youtubeNotification.show();
      break;
    case 'YOUTUBE_ADVANCED':
      const youtubeAdvancedNotification = new ToastNotification({
        appId,
        group: data.pkg,
        tag: new NotificationTokenTag().generate(),
        template: `
        <toast>
          <visual>
            <binding template="ToastGeneric">
              <image placement="appLogoOverride" hint-crop="circle" src="%s"/>
              <text hint-maxLines="1">%s</text>
              <text>%s</text>
              <text placement="attribution">Via Youtube</text>
              <image placement="hero" src="%s"/> 
            </binding>
          </visual>
        </toast>`,
        strings: [getImg(img, 'png'), title, message, getTmp(data.thumb, 'jpg')],
      });

      youtubeAdvancedNotification.on('activated', () => {
        shell.openExternal(`https://www.youtube.com/watch?v=${data.thumb}`);
        deleteTmp(data.thumb, 'jpg');
      });

      youtubeAdvancedNotification.on('dismissed', () => {
        deleteTmp(data.thumb, 'jpg');
      });

      youtubeAdvancedNotification.show();
      break;
    case 'KNOWN_NOTIFICATION_SOURCE':
      const knownNotification = new ToastNotification({
        appId,
        group: data.pkg,
        tag: new NotificationTokenTag().generate(),
        template: `
        <toast>
          <visual>
            <binding template="ToastGeneric">
             <image placement="appLogoOverride" hint-crop="circle" src="%s"/>
             <text hint-maxLines="1">%s</text>
              <text>%s</text>
              <text placement="attribution">Via %s</text>
            </binding>
          </visual>
        </toast>`,
        strings: [getImg(img, 'png'), title, message, img[0].toUpperCase() + img.slice(1)],
      });

      knownNotification.show();
      break;
    default:
      const customUnknownNotification = new ToastNotification({
        appId,
        group: data.pkg,
        tag: new NotificationTokenTag().generate(),
        template: `<toast>
        <visual>
          <binding template="ToastGeneric">
            <image placement="appLogoOverride" src="%s"/>
            <text hint-maxLines="1">%s</text>
            <text>%s</text>
            <text placement="attribution">Via %s</text>
          </binding>
        </visual>
        </toast>`,
        strings: [getImg(img, 'png'), title, message, data.device],
      });

      customUnknownNotification.show();
      socketLog(type);
  }
};
