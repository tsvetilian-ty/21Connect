const fs = require('fs');
const path = require('path');
const server = require('http').createServer((req, res) => {
  if (req.url === '/screen') {
    fs.readFile(path.join(__dirname, '../assets/tmp/desktop.png'), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Something is wrong try again later!');
      }
      res.writeHead(200);
      res.end(data);
    });
  }
  fs.readFile(`${__dirname}/socket-init.html`, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Something is wrong try again later!');
    }
    res.writeHead(200);
    res.end(data);
  });
});
const io = require('socket.io')(server, { pingTimeout: 15000, pingInterval: 15000 });

const cast = require('./broadcasters');
const receive = require('./receivers');

server.listen(6677);

io.on('connection', (socket) => {
    // Broadcast Events
    socket.emit('info', cast.info(socket.id));

    socket.on('newNotification', (data) => {
      receive.newNotification(data);
      console.log(data);
      socket.emit('done');
    });
});