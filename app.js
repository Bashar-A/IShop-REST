const express = require("express");
const mongoose = require("mongoose");
const keys = require("./keys");


const MODULES = ['auth','users','attributes'];

module.exports = function createApp() {
  const app = express();

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  MODULES.forEach((moduleName) => {
    const appModule = require(`./modules/${moduleName}`);

    if (typeof appModule.configure === 'function') {
        appModule.configure(app);
    }
});

  mongoose.Promise = global.Promise;
  return mongoose
    .connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => app);
};
