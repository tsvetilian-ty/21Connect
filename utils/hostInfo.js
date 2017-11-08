const crypto = require('crypto');
const ip = require('ip');
const os = require('os');

const memoryToGb = Math.round((os.totalmem() / 1073741824).toFixed(2));
// const memoryToMb = Math.round((os.totalmem() / 1048576).toFixed(2));

exports.hostInfo = {
  hash: crypto.createHash('md5').update(ip.address()).digest('hex'),
  os_uptime: os.uptime(), // Not implemented by default
  name: os.hostname(),
  memory: memoryToGb, // Memory is implemented in GB
  ip: ip.address(),
  cpus: os.cpus()[0].model,
  os: os.type(),
  port: 6677,
};