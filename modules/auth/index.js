const session = require('./service')

module.exports = {
    configure(app) {
        app.post('/api/login', session.create);
        app.get('/api/logout', session.close);
    }
}