var mongoose = require('mongoose');

module.exports = function () {

    var requestSchema = mongoose.Schema({
        idUsuario: mongoose.Schema.Types.ObjectId,
        nomeUsuario: String,
        tipo: String
    });

    return mongoose.model('Request', requestSchema);
};
