var mongoose = require('mongoose');

module.exports = function () {

    var requestSchema = mongoose.Schema({
        idUsuario: { type: mongoose.Schema.ObjectId, ref: 'User' },
        nomeUsuario: String,
        tipo: String
    });

    return mongoose.model('Request', requestSchema);
};
