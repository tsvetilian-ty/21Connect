const path = require('path');
const Datastore = require('nedb');
const Uuid = require('uuid-token-generator');

const db = new Datastore({ filename: path.join(__dirname, '../', 'db/devices.db'), autoload: true });

exports.generateToken = (cb) => {
  db.find({}, (err, docs) => {
    if (err || docs.length === 0) {
      const tokenToBeGenerated = new Uuid(256, Uuid.BASE62);
      const generatedToken = tokenToBeGenerated.generate();
      addTokenToRegistry(generatedToken, (added) => {
        if (added) { console.log('Token successfully added'); }
      });
      return cb(generatedToken);
    }
    return cb(docs[0].authToken);
  });
};

exports.revokeToken = (token) => {
  if (token === 'current') {
    db.remove({}, (err, numRemoved) => {
      if (err) {
        console.log('Error occurred during token revocation');
      }
    });
    this.generateToken((newToken) => {
      console.log(`Token successfully generated: ${newToken}`);
    });
    return;
  }

  db.remove({ authToken: token }, {}, (err, numRemoved) => {
    if (numRemoved >= 1) {
      console.log('Token successfully revoked');
    }
  });
};

exports.isAuth = (token, cb) => {
  db.find({ authToken: token }, (err, docs) => {
    if (err || docs.length === 0) {
      console.log('Unauthorized');
      return cb(false);
    }
    console.log('Authorized');
    return cb(true);
  });
};

let addTokenToRegistry = (token, cb) => {
  db.insert({ authToken: token }, (err, docs) => {
    if (err || docs.length === 0) {
      console.log('Can\'t add token');
      return cb(false);
    }
    cb(true);
  });
};
