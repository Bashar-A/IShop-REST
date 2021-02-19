const User = require('../users/model')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../../keys')


function configurePassport(passport, app) {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = keys.JWT_SIGNATURE
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({_id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(null, false)
            }
            if (user?.isAdmin) {
                return done(null, user.toJSON())
            } else {
                return done(null, false)
            }
        })
    }))
}

module.exports = {
  configurePassport
}
