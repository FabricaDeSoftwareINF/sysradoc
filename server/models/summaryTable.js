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
                        graduacao: {type: Number, default: 0},
                        posGraduacao: {type: Number, default: 0},
                        total: {type: Number, default: 0}
                    },
                    producaoIntelectual: {
                        cientifica: {type: Number, default: 0},
                        artisticaCultural: {type: Number, default: 0},
                        tecnicaTecnologica: {type: Number, default: 0},
                        outros: {type: Number, default: 0},
                        total: {type: Number, default: 0}
                    },
                    pesquisaExtensao: {
                        pesquisa: {type: Number, default: 0},
                        extensao: {type: Number, default: 0},
                        total: {type: Number, default: 0}
                    },
                    administrativas: {
                        direcaoFuncaoGratificada: {type: Number, default: 0},
                        administrativas: {type: Number, default: 0},
                        outras: {type: Number, default: 0},
                        representacaoFora: {type: Number, default: 0},
                        total: {type: Number, default: 0}
                    },
                    outrasAtividades: {
                        orientacao: {type: Number, default: 0},
                        academicas: {type: Number, default: 0},
                        aprendizado: {type: Number, default: 0},
                        total: {type: Number, default: 0}
                    },
                    total: {type: Number, default: 0}
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
