var auth = require('../../config/auth');
var fs = require('fs');

module.exports = function (app) {

    var userController = app.controllers.userController,
        radocController = app.controllers.radocController,
        processController = app.controllers.processController,
        requestController = app.controllers.requestController;

    app.get('/api/user', userController.getAllUsers);
    app.get('/api/user/:category', userController.getAllUsersByCategory);
    app.post('/api/user', userController.createUser);
    app.post('/api/user/:email', userController.recover);
    app.post('/api/user/:email/:token', userController.reset);
    app.put('/api/user/:email', userController.updateUser);
    app.delete('/api/user/:email', userController.removeUser);

    app.get('/api/radoc/:id', radocController.getRadocsFromUser);
    app.post('/api/radoc/:id', radocController.receiveRadoc);


    app.get('/api/process/', processController.getProcesses);
    app.get('/api/process/:id', processController.getProcessesById);
    app.post('/api/process/', processController.createProcess);
    app.put('/api/process/:id', processController.updateAppraiser);

    app.get('/api/request/', requestController.getRequests);
    app.get('/api/request/:id', requestController.getRequestsById);
    app.post('/api/request/', requestController.createRequest);

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.get('/uploads/*', function (req, res) {
        var file = fs.readFileSync('uploads/' + req.params[0]);
        res.writeHead(200, {'Content-Type': 'application/octet-stream' });
        res.end(file, 'binary');
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
