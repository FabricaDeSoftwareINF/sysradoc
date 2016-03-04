var mongoose = require('mongoose');

module.exports = function () {

    var summaryTableSchema = mongoose.Schema({
        idProcesso: { type: mongoose.Schema.ObjectId, ref: 'Process' },
        idProfessor: { type: mongoose.Schema.ObjectId, ref: 'User' },
        tipo: String,
        status: String,
        instituto: String,
        regime: String,
        tabela: [
            {
                idRadoc: { type: mongoose.Schema.ObjectId, ref: 'Radoc' },
                idPontuacaoRadoc: { type: mongoose.Schema.ObjectId, ref: 'RadocScore' },
                anoBase: Number,
                mesesAvaliados: Number,
                pontuacaoRadoc: {
                    ensino: {
                        graduacao: Number,
                        posGraduacao: Number,
                        total: Number
                    },
                    producaoIntelectual: {
                        cientifica: Number,
                        artisticaCultural: Number,
                        tecnicaTecnologica: Number,
                        outros: Number,
                        total: Number
                    },
                    pesquisaExtensao: {
                        pesquisa: Number,
                        extensao: Number,
                        total: Number
                    },
                    administrativas: {
                        direcaoFuncaoGratificada: Number,
                        administrativas: Number,
                        outras: Number,
                        representacaoFora: Number,
                        total: Number
                    },
                    outrasAtividades: {
                        orientacao: Number,
                        academicas: Number,
                        aprendizado: Number,
                        total: Number
                    },
                    total: Number
                },
                notasAvaliacao: {
                    notaCAD: Number,
                    notaChefia: Number,
                    notaDiscente: Number,
                    producaoIntelectual: Number
                },
                notaParcial: {
                    estagioProbatorio: Number,
                    progressao: Number,
                    mediaDiscente: Number
                },
                notaFinalGlobal: {
                    estagioProbatorio: Number,
                    progressao: Number,
                    mediaItemI: Number,
                    mediaItemIV4: Number,
                    pontuacaoParagrafo5Art27: Number
                }
            }
        ],
        resultado: String
    });

    return mongoose.model('SummaryTable', summaryTableSchema);
};
