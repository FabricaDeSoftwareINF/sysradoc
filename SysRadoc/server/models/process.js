var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

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
        idQuadroSumario: mongoose.Schema.Types.ObjectId,
        radocs: [{ type: mongoose.Schema.ObjectId, ref: 'Radoc' }]

    });

    autoIncrement.initialize(mongoose.connection);

    processSchema.plugin(autoIncrement.plugin, {
        model: 'Process',
        field: 'numero',
        startAt: 1,
        incrementBy: 1
    });

    return mongoose.model('Process', processSchema);
};
