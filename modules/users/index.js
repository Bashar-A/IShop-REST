const users = require('./service');

module.exports = {
  configure(app) {
    //app.get('/api/users/:id', users.find);
    //app.patch('/api/users/:id', users.update);
    app.post('/api/users/create', users.create);
  }
};