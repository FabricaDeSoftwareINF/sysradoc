var mongoose = require('mongoose');

module.exports = function () {

    var processSchema = mongoose.Schema({
        tipo: String,
        dataDeInicio: Date,
        dataFim: Date,
        idProfessor: mongoose.Schema.Types.ObjectId,
        idAvaliador: mongoose.Schema.Types.ObjectId,
        nota: String,
        situacao: String,
        idQuadroSumario: mongoose.Schema.Types.ObjectId,
        radocs: [mongoose.Schema.Types.ObjectId]

    });

    return mongoose.model('Process', processSchema);
};
