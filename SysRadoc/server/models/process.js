var mongoose = require('mongoose');

module.exports = function () {

    var processSchema = mongoose.Schema({
        tipo: String,
        dataDeInicio: Date,
        dataFim: Date,
        idProfessor: { type: mongoose.Schema.ObjectId, ref: 'User' },
        idAvaliador: { type: mongoose.Schema.ObjectId, ref: 'User' },
        nota: String,
        situacao: String,
        idQuadroSumario: mongoose.Schema.Types.ObjectId,
        radocs: [{ type: mongoose.Schema.ObjectId, ref: 'Radoc' }]

    });

    return mongoose.model('Process', processSchema);
};
