var mongoose = require('mongoose'),
    encryption = require('../services/encryption');

module.exports = function () {
    var usuarioSchema = mongoose.Schema({
            nome: String,
            email: {
                type: String,
                unique: true
            },
            matricula: String,
            hash: {type: String, required: '{PATH} is required!'},
			senhaEncriptada: {type: String, required: '{PATH} is required!'},
            papeis: {type: [String], required: '{PATH} is required!'}
        },
        {
            collection: 'usuarios',
            discriminatorKey: '_categoria'
        }
    );

    usuarioSchema.methods = {
        autenticar: function (senhaDigitada) {
            return encryption.hashPassword(this.hash, senhaDigitada) === this.senhaEncriptada;
        },
        possuiPapel: function (papel) {
            return this.papeis.indexOf(papel) > -1;
        }
    };

    return mongoose.model('Usuario', usuarioSchema);
};
