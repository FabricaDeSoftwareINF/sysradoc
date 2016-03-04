var mongoose = require('mongoose');

module.exports = function () {

    var processSchema = mongoose.Schema({
        identificador: String, //Modelo 23070.000000/2015-58
        tipo: String,
        dataDeInicio: Date,
        dataFim: Date,
        idProfessor: { type: mongoose.Schema.ObjectId, ref: 'User' },
        idAvaliador: { type: mongoose.Schema.ObjectId, ref: 'User' },
        nota: String,
        situacao: String,
        pendencias: [String],
        anoEstagioProbatorio: Number,
        idQuadroSumario: { type: mongoose.Schema.ObjectId, ref: 'SummaryTable' },
        radocs: [{ type: mongoose.Schema.ObjectId, ref: 'Radoc' }]

    });

    return mongoose.model('Process', processSchema);
};
