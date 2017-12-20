const path = require('path');
const fs = require('fs');

const imgPath = path.join(__dirname, '../', 'assets/img');
const tmpPath = path.join(__dirname, '../', 'assets/tmp');

exports.getImg = (name, extension) => path.join(imgPath, `${name}.${extension}`);

exports.getTmp = (name, extension) => path.join(tmpPath, `${name}.${extension}`);

exports.deleteTmp = (name, extension) => {
  const tmpImageToDeletePath = path.join(tmpPath, `${name}.${extension}`);

  fs.unlink(tmpImageToDeletePath, () => {
    console.log(`Tmp image deleted ${tmpImageToDeletePath}`);
  });
};
