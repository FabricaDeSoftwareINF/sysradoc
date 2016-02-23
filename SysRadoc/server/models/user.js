var mongoose = require('mongoose'),
    encryption = require('../services/encryption');

module.exports =  function(){
    var userSchema = mongoose.Schema({
        nome: String,
        email: {
            type: String,
            unique: true
        },
        matricula: String,
        estagioProbatorioCompleto: Boolean,
        dataEntradaUltimoNivel: Date,
        salt: {type: String, required: '{PATH} is required!'},
        hash: {type: String, required: '{PATH} is required!'},
        papeis: [String]
    },
    {
        collection: 'users',
        discriminatorKey: '_categoria'
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return encryption.hashPwd(this.salt, passwordToMatch) === this.hash;
        },
        hasRole: function(role) {
            return this.roles.indexOf(role) > -1;
        }
    };

    return mongoose.model('User', userSchema);
};
