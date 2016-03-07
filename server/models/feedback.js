var mongoose = require('mongoose');

module.exports = function () {

    var feedbackSchema = mongoose.Schema({
        dataDeRealizacao: Date,
        idProcesso: { type: mongoose.Schema.ObjectId, ref: 'Process' },
        idAvaliador: { type: mongoose.Schema.ObjectId, ref: 'User' },
        texto: String,
        notaFinal: String
    });

    return mongoose.model('Feedback', feedbackSchema);
};
