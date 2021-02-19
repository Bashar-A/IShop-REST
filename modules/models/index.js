const models = require('./service')
const validators = require('./validator')
const passport = require('passport')

module.exports = {
  configure(app) {
    app.get('/api/models', models.findAll)

    app.post('/api/model', 
      passport.authenticate('jwt', {session: false}), 
      validators.addModelValidator,
      models.create
    )

    app.get('/api/model', models.find)

    app.patch('/api/model', 
      passport.authenticate('jwt', {session: false}), 
      models.update
    )

    app.delete('/api/model', 
      passport.authenticate('jwt', {session: false}), 
      models.remove
    )

  }
};