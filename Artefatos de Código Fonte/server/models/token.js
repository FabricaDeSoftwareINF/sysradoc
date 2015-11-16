var mongoose = require('mongoose');

module.exports =  function(){
    var tokenSchema = mongoose.Schema({
        token: String,
        email: String
    });

    return mongoose.model('Token', tokenSchema);
};
