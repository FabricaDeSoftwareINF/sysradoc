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
                    notaCAD: {type: Number, default: null},
                    notaChefia: {type: Number, default: null},
                    notaDiscente: {type: Number, default: null},
                    producaoIntelectual: {type: Number, default: null}
                },
                notaParcial: {
                    estagioProbatorio: {type: Number, default: null},
                    progressao: {type: Number, default: null},
                    mediaDiscente: {type: Number, default: null}
                },
                notaFinalGlobal: {
                    estagioProbatorio: {type: Number, default: null},
                    progressao: {type: Number, default: null},
                    mediaItemI: {type: Number, default: null},
                    mediaItemIV4: {type: Number, default: null},
                    pontuacaoParagrafo5Art27: {type: Number, default: null}
                }
            }
        ],
        resultado: String
    });

    return mongoose.model('SummaryTable', summaryTableSchema);
};
