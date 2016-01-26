var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    helmet = require('helmet'),
    load = require('express-load');

module.exports = function (app, config) {

    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    //view engine jade
    app.set('views', './server/views');
    app.set('view engine', 'jade');

    //stylus compile
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: compile
    }));

    //default middlewares
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    app.use(session(
      {
       secret:'5y5_r4d0c_5up3r_53cr3t',
       resave:true,
       saveUninitialized:true
      }
     ));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(helmet());
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.disable('x-power-by');
    app.use(helmet.hidePoweredBy({setTo:'PHP 5.5.14'}));
    app.use(express.static(config.rootPath + '/public'));

    load('models/usuario', {cwd: 'server'})
		.then('models')
        .then('controllers')
        .then('routes')
        .into(app);
};
