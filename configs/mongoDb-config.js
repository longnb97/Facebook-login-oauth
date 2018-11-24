const mongoose = require("mongoose");

const key = require('./keys');

mongoose.connect(
    `mongodb://${key.mongoDb.mlab.username}:${key.mongoDb.mlab.password}@ds113134.mlab.com:13134/fblogintestdb`,
    err => {
      if (err) console.error(err);
      else console.log("DB connect success!");
    }
  );
  