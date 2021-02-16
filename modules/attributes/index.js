const attributes = require('./service')
const validators = require('./validator')
const passport = require('passport')

module.exports = {
  configure(app) {
    app.get('/api/attributes', attributes.findAll)

    app.post('/api/attributes', 
      passport.authenticate('jwt', {session: false}), 
      validators.addAttributeValidator,
      attributes.create
    )

    app.get('/api/attributes/:id', attributes.find)

    app.patch('/api/attributes/:id', 
      passport.authenticate('jwt', {session: false}), 
      attributes.update
    )

    app.delete('/api/attributes/:id', 
      passport.authenticate('jwt', {session: false}), 
      attributes.remove
    )

  }
};