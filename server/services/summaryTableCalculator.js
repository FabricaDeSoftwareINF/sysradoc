 var config = require("./radocParseConfig");

 /*
     /!\ ATENÇÃO /!\
     Este arquivo usa referências diretas a ordem das sessões no arquivo radocParseConfig.js.
     Caso houver qualquer alteração no arquivo, seja na ordem das sessões ou mesmo na ordem das labels,
     este arquivo deve ser refatorado para manter seu funcionamento. |TODAS| as referências
     estão listadas abaixo:

     config.sections[2].header = "RGCG  Regime de Graduação Semestral"
     config.sections[3].header = "PósGraduação Lato Sensu/Sctricto Sensu (RDC)"
     config.sections[10].header = "Produtos"
     config.sections[5].header = "Atividades em projetos"
     config.sections[6].header = "Atividades de extensão"
     config.sections[9].header = "Atividades administrativas"
     config.sections[4].header = "Atividades de orientação"
     config.sections[8].header = "Atividades acadêmicas especiais"
     config.sections[7].header = "Atividades de qualificação"

 */

module.exports = function(){

	var service = {};

    service.calculateSummaryTable = function(radocScore){
        var pontuacaoRadoc = {
        	ensino: {
        		graduacao: 0,
        		posGraduacao: 0,
        		total: 0
        	},
        	producaoIntelectual: {
        		cientifica: 0,
        		artisticaCultural: 0,
        		tecnicaTecnologica: 0,
        		outros: 0,
        		total: 0
        	},
        	pesquisaExtensao: {
        		pesquisa: 0,
        		extensao: 0,
        		total: 0
        	},
        	administrativas: {
        		direcaoFuncaoGratificada: 0,
        		administrativas: 0,
        		outras: 0,
        		representacaoFora: 0,
        		total: 0
        	},
        	outrasAtividades: {
        		orientacao: 0,
        		academicas: 0,
        		aprendizado: 0,
        		total: 0
        	},
        	total: 0
        };
        var it;
        for (it = 0; it < radocScore[config.sections[2].header].length; it++){
            pontuacaoRadoc.ensino.graduacao += radocScore[config.sections[2].header][it].pontuacao;
            pontuacaoRadoc.ensino.total += radocScore[config.sections[2].header][it].pontuacao;
            pontuacaoRadoc.total += radocScore[config.sections[2].header][it].pontuacao;
        }

        for (it = 0; it < radocScore[config.sections[3].header].length; it++){
            pontuacaoRadoc.ensino.posGraduacao += radocScore[config.sections[3].header][it].pontuacao;
            pontuacaoRadoc.ensino.total += radocScore[config.sections[3].header][it].pontuacao;
            pontuacaoRadoc.total += radocScore[config.sections[3].header][it].pontuacao;
        }

        for (it = 0; it < radocScore[config.sections[10].header].length; it++){
            if (radocScore[config.sections[10].header][it].subsecao === "1"){
                pontuacaoRadoc.producaoIntelectual.cientifica += radocScore[config.sections[10].header][it].pontuacao;
            }
            else if (radocScore[config.sections[10].header][it].subsecao === "2"){
                pontuacaoRadoc.producaoIntelectual.artisticaCultural += radocScore[config.sections[10].header][it].pontuacao;
            }
            else if (radocScore[config.sections[10].header][it].subsecao === "3"){
                pontuacaoRadoc.producaoIntelectual.tecnicaTecnologica += radocScore[config.sections[10].header][it].pontuacao;
            }
            else if (radocScore[config.sections[10].header][it].subsecao === "4"){
                pontuacaoRadoc.producaoIntelectual.outros += radocScore[config.sections[10].header][it].pontuacao;
            }

            pontuacaoRadoc.producaoIntelectual.total += radocScore[config.sections[10].header][it].pontuacao;
            pontuacaoRadoc.total += radocScore[config.sections[10].header][it].pontuacao;
        }

        for (it = 0; it < radocScore[config.sections[5].header].length; it++){
            pontuacaoRadoc.pesquisaExtensao.pesquisa += radocScore[config.sections[5].header][it].pontuacao;
            pontuacaoRadoc.pesquisaExtensao.total += radocScore[config.sections[5].header][it].pontuacao;
            pontuacaoRadoc.total += radocScore[config.sections[5].header][it].pontuacao;
        }

        for (it = 0; it < radocScore[config.sections[6].header].length; it++){
            pontuacaoRadoc.pesquisaExtensao.extensao += radocScore[config.sections[6].header][it].pontuacao;
            pontuacaoRadoc.pesquisaExtensao.total += radocScore[config.sections[6].header][it].pontuacao;
            pontuacaoRadoc.total += radocScore[config.sections[6].header][it].pontuacao;
        }

        for (it = 0; it < radocScore[config.sections[9].header].length; it++){
            if (radocScore[config.sections[9].header][it].subsecao === "1"){
                pontuacaoRadoc.administrativas.direcaoFuncaoGratificada += radocScore[config.sections[9].header][it].pontuacao;
            }
            else if (radocScore[config.sections[9].header][it].subsecao === "2"){
                pontuacaoRadoc.administrativas.administrativas += radocScore[config.sections[9].header][it].pontuacao;
            }
            else if (radocScore[config.sections[9].header][it].subsecao === "3"){
                pontuacaoRadoc.administrativas.outras += radocScore[config.sections[9].header][it].pontuacao;
            }
            else if (radocScore[config.sections[9].header][it].subsecao === "4"){
                pontuacaoRadoc.administrativas.representacaoFora += radocScore[config.sections[9].header][it].pontuacao;
            }

            pontuacaoRadoc.administrativas.total += radocScore[config.sections[9].header][it].pontuacao;
            pontuacaoRadoc.total += radocScore[config.sections[9].header][it].pontuacao;
        }

        for (it = 0; it < radocScore[config.sections[4].header].length; it++){
            pontuacaoRadoc.outrasAtividades.orientacao += radocScore[config.sections[4].header][it].pontuacao;
            pontuacaoRadoc.outrasAtividades.total += radocScore[config.sections[4].header][it].pontuacao;
            pontuacaoRadoc.total += radocScore[config.sections[4].header][it].pontuacao;
        }

        for (it = 0; it < radocScore[config.sections[8].header].length; it++){
            pontuacaoRadoc.outrasAtividades.academicas += radocScore[config.sections[8].header][it].pontuacao;
            pontuacaoRadoc.outrasAtividades.total += radocScore[config.sections[8].header][it].pontuacao;
            pontuacaoRadoc.total += radocScore[config.sections[8].header][it].pontuacao;
        }

        for (it = 0; it < radocScore[config.sections[7].header].length; it++){
            pontuacaoRadoc.outrasAtividades.aprendizado += radocScore[config.sections[7].header][it].pontuacao;
            pontuacaoRadoc.outrasAtividades.total += radocScore[config.sections[7].header][it].pontuacao;
            pontuacaoRadoc.total += radocScore[config.sections[7].header][it].pontuacao;
        }

        return pontuacaoRadoc;
    };

	return service;
};
