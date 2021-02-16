const users = require('./service');
const validators = require('./validator')

module.exports = {
  configure(app) {
    //app.get('/api/users/:id', users.find);
    //app.patch('/api/users/:id', users.update);
    app.post('/api/users/create', validators.registerValidator, users.create);
  }
};