const crypto = require('crypto');
const { hostInfo } = require('../../utils');

exports.broadcast = socketid => ({
  hash: hostInfo.hash,
  host_name: hostInfo.name,
  os: hostInfo.os,
  system_memory_gb: hostInfo.memory,
  system_cpu: hostInfo.cpus,
  connection_ip: hostInfo.ip,
  port: hostInfo.port,
  socketId: socketid,
});
