var mongoose = require('mongoose'),
    encryption = require('../services/encryption');

module.exports =  function(){
    var userSchema = mongoose.Schema({
        name: String,
        email: {
            type: String,
            unique: true
        },
        salt: {type: String, required: '{PATH} is required!'},
        hashedPwd: {type: String, required: '{PATH} is required!'},
        roles: { type: [String], required: '{PATH} is required!'}
    });

    return mongoose.model('User', userSchema);
};
