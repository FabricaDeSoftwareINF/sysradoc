var encryption = require('../services/encryption');

module.exports = function(app){
	var User = app.models.user;

	var controller = {};

    controller.createUser = function (req, res, next) {
        var userData = req.body;

        userData.email = userData.email.toLowerCase();
        userData.roles = ["teacher"];
        userData.salt = encryption.createSalt();
        userData.hashedPwd = encryption.hashPwd(userData.salt, userData.password);
        userData.access = undefined;
		userData.password = undefined;
		userData.repeatPassword = undefined;

        User.create(userData, function (err, user) {
            if (err) {
                if (err.toString().indexOf('E11000') > -1) {
                    err = new Error('Este email já foi cadastrado no sistema.');
                }
                res.status(400);
                return res.send({reason: err.toString()});
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                user.salt = undefined;
                user.hashedPwd = undefined;
                res.send(user);
            });
        });
    };

	return controller;
};
