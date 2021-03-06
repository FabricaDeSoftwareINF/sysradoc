var express = require('express');

var env = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./config/config')[env];

require('./config/express')(app, config);
require('./config/database')(app, config);
require('./config/passport')(app);
require('./config/cronjob')(app);

app.listen(config.port);

console.log('Sys Radoc started on port ' + config.port + '...');
