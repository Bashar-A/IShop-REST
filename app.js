const express = require("express");
const mongoose = require("mongoose");
const keys = require("./keys");
const cors = require('cors')

const MODULES = ["auth", "users", "attributes", "products", "categories","vendors"];
global.__basedir = __dirname;


module.exports = function createApp() {
  const app = express();
  app.use(cors())
  // app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  //   if (req.method === "OPTIONS") {
  //     return res.status(200).end();
  //   }
  //   next();
  // });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(keys.UPLOAD_DIR, express.static(`.${keys.UPLOAD_DIR}`));

  MODULES.forEach((moduleName) => {
    const appModule = require(`./modules/${moduleName}`);

    if (typeof appModule.configure === "function") {
      appModule.configure(app);
    }
  });

  // app._router.stack.forEach(function(r){
  //   if (r.route && r.route.path){
  //     console.log(r.route.stack[0].method+ ': ' +  r.route.path)
  //   }
  // })

  mongoose.Promise = global.Promise;
  return mongoose
    .connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => app);
};
