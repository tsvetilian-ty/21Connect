const path = require('path');
const fs = require('fs');

const imgPath = path.join(__dirname, '../', 'assets/img');

exports.getImg = (name, extension) => path.join(imgPath, `${name}.${extension}`);
