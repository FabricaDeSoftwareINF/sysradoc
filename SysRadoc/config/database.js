var mongoose = require('mongoose');
var encryption = require('../server/services/encryption');

var createDefaultUsers = function(User) {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0){
            var salt = encryption.createSalt();
            var hash = encryption.hashPwd(salt, "12345");
            User.create({
                name: "Leonardo Freitas",
                email: "leonardo_freitas1995@hotmail.com",
                instructorClass: "A",
                salt: salt,
                hash: hash,
                roles: ["teacher"]
            });
        }
    });
};

module.exports = function (app, config) {
    userModel = app.models.user;
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));

    db.once('open', function () {
        console.log('sysradoc db opened');
    });

	db.on('disconnect', function(){
		console.log('sysradoc db is disconnected in: ' + config.db);
	});

    createDefaultUsers(userModel);
};
