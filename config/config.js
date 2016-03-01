/* global process, module, __dirname */

var path = require('path');
var rootPath = path.normalize(__dirname + '/../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://127.0.0.1/sysradoc',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://127.0.0.1/sysradoc',
        port: process.env.PORT || 80
    }
};
