const users = require("./service");
const validators = require("./validator");

module.exports = {
  configure(app) {
    //app.get('/api/user', users.find);
    //app.patch('/api/user', users.update);
    app.post("/api/users/create", validators.registerValidator, users.create);
  },
};
