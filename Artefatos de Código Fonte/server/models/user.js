var mongoose = require('mongoose'),
    encryption = require('../services/encryption');

module.exports =  function(){
    var userSchema = mongoose.Schema({
        name: String,
        email: {
            type: String,
            unique: true
        },
        instructorClass: String,
        salt: {type: String, required: '{PATH} is required!'},
        hashedPwd: {type: String, required: '{PATH} is required!'},
        roles: { type: [String], required: '{PATH} is required!'}
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return encryption.hashPwd(this.salt, passwordToMatch) === this.hashedPwd;
        },
        hasRole: function(role) {
            return this.roles.indexOf(role) > -1;
        }
    };

    return mongoose.model('User', userSchema);
};
