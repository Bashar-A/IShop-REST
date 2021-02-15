const attributes = require('./service');

module.exports = {
  configure(app) {
    app.get('/api/attributes', attributes.findAll)
    app.post('/api/attributes', attributes.create)

    app.get('/api/attributes/:id', attributes.find)
    app.patch('/api/attributes/:id', attributes.update)
    app.delete('/api/attributes/:id', attributes.remove)

  }
};