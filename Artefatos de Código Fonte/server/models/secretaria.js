var mongoose = require('mongoose'),
    encryption = require('../services/encryption');

module.exports =  function(){

    var secretariaSchema = mongoose.Schema({


    });

    return mongoose.model('Secretaria', secretariaSchema);
};
