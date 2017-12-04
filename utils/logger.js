exports.log = (type) => {
  console.log(`--> ${type} socket was hit`);
};

exports.sys = (message) => {
  console.log(`--> ${message}`);
};
