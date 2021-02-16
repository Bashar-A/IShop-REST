const session = require('./service')
const passport = require('passport')
const { configurePassport } = require('./jwt')

module.exports = {
    configure(app) {
        configurePassport(passport, app)
        app.use(passport.initialize())

        app.post('/api/login', session.create)
    }
}