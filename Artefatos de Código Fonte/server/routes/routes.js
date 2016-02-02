var auth = require('../../config/auth');

module.exports = function (app) {

    var users = app.controllers.users,
        radocs = app.controllers.radocs;

    app.post('/api/users', users.createUser);
    app.post('/api/users/:email', users.recover);
    app.post('/api/users/:email/:token', users.reset);

    app.post('/api/radoc/', radocs.receiveRadoc);

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.all("/api/*", function (req, res) {
       res.send(404);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};
