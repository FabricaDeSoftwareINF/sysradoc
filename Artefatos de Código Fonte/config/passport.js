var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {
    var User = app.models.usuario;

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({email: username}).exec(function (err, usuario) {
                if (usuario && usuario.autenticar(password)) {
                    return done(null, usuario);
                } else {
                    return done(null, false);
                }
            });
        }
    ));

    passport.serializeUser(function (usuario, done) {
        if (usuario) {
            done(null, usuario._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });

};
