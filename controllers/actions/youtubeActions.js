const axios = require('axios');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const notification = require('../notifications');

const YOUTUBE_API_KEY = 'AIzaSyDUBcCSP2PmtsvFcONwgTHhRlbBHz8iOYc';

const saveThumb = (id, thumbUri) => new Promise((res, rej) => {
  const tmpPathToTheThumb = path.join('./assets', 'tmp', `${id}.jpg`);
  const writeThumb = fs.createWriteStream(tmpPathToTheThumb);
  axios({
    method: 'GET',
    url: thumbUri,
    responseType: 'stream',
  }).then((img) => {
    img.data.pipe(writeThumb);
    writeThumb.on('error', () => {
      rej();
    });
    writeThumb.on('finish', () => {
      res();
    });
  }).catch(() => {
    rej();
  });
});

exports.findVideo = (data) => {
  const searchQuery = querystring.stringify({ q: data.content });
  const videoBy = data.title;
  axios({
    method: 'GET',
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&${searchQuery}&fields=items(id%2FvideoId%2Csnippet(channelTitle%2CpublishedAt%2Cthumbnails%2Fhigh%2Furl))&order=date&key=${YOUTUBE_API_KEY}`,
  }).then((response) => {
    const responseExtractedVideo = response.data.items.filter(resultObj => resultObj.snippet.channelTitle === videoBy);
    const { videoId } = responseExtractedVideo[0].id;
    const thumbHigh = responseExtractedVideo[0].snippet.thumbnails.high.url;

    saveThumb(videoId, thumbHigh)
      .then(() => {
        data.thumb = videoId;
        notification.factory('YOUTUBE_ADVANCED', `${data.title}`, `${data.content}`, 'youtube', data);
      })
      .catch(() => {
        notification.factory('YOUTUBE', `${data.title}`, `${data.content}`, 'youtube', data);
      });
  }).catch((err) => {
    notification.factory('YOUTUBE', `${data.title}`, `${data.content}`, 'youtube', data);
  });
};