var radocScoreService = require("./radocScore");

module.exports = function(app){

	var Process = app.models.process,
        Request = app.models.request,
        User = app.models.user,
        Radoc = app.models.radoc,
        RadocScore = app.models.radocScore,
        SummaryTable = app.models.summaryTable;

	var service = {};

    service.validateAndCreate = function(processData, callback){
        Request.findOne({idUsuario: processData.idProfessor, tipo: processData.tipo}, function(err, requestDoc){

            if (requestDoc){
                var dataInicioA = new Date(processData.dataDeInicio), dataInicioB = new Date(requestDoc.dataDeInicio);
                var dataFimA = new Date(processData.dataFim), dataFimB = new Date(requestDoc.dataFim);
                if (
                    dataInicioA.getMonth() !== dataInicioB.getMonth() ||
                    dataInicioA.getFullYear() !== dataInicioB.getFullYear() ||
                    dataFimA.getMonth() !== dataFimB.getMonth() ||
                    dataFimA.getFullYear() !== dataFimB.getFullYear()){
                        callback({reason: "As datas do processo não coincidem com a da solicitação."});
                        return;
                    }

                if (processData.tipo === "Estágio Probatório"){
                    processData.anoEstagioProbatorio = dataInicioA.getFullYear();
                }
                Process.create(processData, function(err, processDoc){
                    Request.remove({idUsuario: processData.idProfessor, tipo: processData.tipo}).exec(function(err, collection){
                        callback({success: true});
                        service.updateInitialStatusAndPendencies(processDoc);
                    });

                });
            }
            else{
                callback({reason: "Não existe nenhuma solicitação de " + processData.tipo + " para este docente."});
            }
        });
    };

    service.updateInitialStatusAndPendencies = function(processDoc){
        var summaryTableData = {
            idProcesso: processDoc._id,
            idProfessor: processDoc.idProfessor,
            tipo: processDoc.tipo,
            status: "",
            tabela: [],
            resultado: ""
        };
        var dataDeInicio = new Date(processDoc.dataDeInicio);
        var dataFim = new Date(processDoc.dataFim);

        var lastYear = dataFim.getFullYear();

        if (processDoc.tipo === "Estágio Probatório"){
            lastYear = dataDeInicio.getFullYear();
        }

        function makeRadocCallback(year){
            var months = 12;
            if (year === dataDeInicio.getFullYear())
                months = 12 - dataDeInicio.getMonth();
            else if (year === dataFim.getFullYear())
                months = dataFim.getMonth() + 1;

            return function processRadoc(err, radocDoc){
                if (radocDoc){
                    var scoredRadoc = radocScoreService.calculateScore(parsedRadoc);
                    scoredRadoc.idRadoc = radocDoc._id;
                    scoredRadoc.idProfessor = processDoc.idProfessor;
                    scoredRadoc.idProcesso = processDoc._id;
                    RadocScore.create(scoredRadoc, function(err, scoredRadocDoc){
                        var pontuacaoRadoc = {};
                        summaryTableData.tabela.push({
                            idRadoc: radocDoc._id,
                            idPontuacaoRadoc: scoredRadocDoc._id,
                            anoBase: year,
                            mesesAvaliados: months,
                            pontuacaoRadoc: pontuacaoRadoc
                        });
                    });
                    processDoc.radocs.push(radocDoc._id);                }
                else{
                    summaryTableData.tabela.push({idRadoc: null, anoBase: year, mesesAvaliados: months});
                    processDoc.pendencias.push("RADOC " + year + " pendente");
                }

                if (year === lastYear){
                    endRadocParseCallback();
                }
            };
        }

        function endRadocParseCallback(){
            if (processDoc.pendencias.length === 0){
                processDoc.pendencias.push("Pontuação da Diretoria pendente");
                processDoc.pendencias.push("Pontuação dos Discentes pendente");
            }
            SummaryTable.create(summaryTableData, function(err, summaryTableDoc){
                processDoc.idQuadroSumario = summaryTableDoc._id;
                processDoc.save();
            });
        }

        if (processDoc.tipo !== "Estágio Probatório" || (new Date()).getFullYear() > dataDeInicio.getFullYear() ){
            for (var year = dataDeInicio.getFullYear(); year <= lastYear; year++){
                Radoc.findOne({idUsuario: processDoc.idProfessor, anoBase: year}).exec(makeRadocCallback(year));
            }
        }
        else{
            processDoc.pendencias.push("Esperando período de atividades");
        }

    };

    service.updateSentRadocPendencies = function(radocDoc, updating){
        if (!updating){
            Process.find({idProfessor: radocDoc.idUsuario, pendencias: "RADOC " + radocDoc.anoBase + " pendente"}).populate("idQuadroSumario").exec(function(err, processArr){
                for (var index = 0; index < processArr.length; index++){
                    var processDoc = processArr[index];
                    var tableIndex = -1;
                    for (var t = 0; t < processDoc.idQuadroSumario.tabela.length; t++){
                        if (processDoc.idQuadroSumario.tabela[t].anoBase === radocDoc.anoBase){
                            tableIndex = t;
                            break;
                        }
                    }
                    if (tableIndex === -1)
                        return false;

                    var scoredRadoc = radocScoreService.calculateScore(radocDoc);
                    scoredRadoc.idRadoc = radocDoc._id;
                    scoredRadoc.idProfessor = processDoc.idProfessor;
                    scoredRadoc.idProcesso = processDoc._id;
                    processDoc.radocs.push(radocDoc._id);
                    processDoc.pendencias.splice(processDoc.pendencias.indexOf("RADOC " + radocDoc.anoBase + " pendente"), 1);
                    if (processDoc.pendencias.length === 0){
                        processDoc.pendencias.push("Pontuação da Diretoria pendente");
                        processDoc.pendencias.push("Pontuação dos Discentes pendente");
                    }
                    RadocScore.create(scoredRadoc, function(err, scoredRadocDoc){
                        var radocTabela = processDoc.idQuadroSumario.tabela[tableIndex];
                        var pontuacaoRadoc = {};
                        radocTabela.idRadoc = radocDoc._id;
                        radocTabela.idPontuacaoRadoc = scoredRadocDoc._id;
                        radocTabela.pontuacaoRadoc = pontuacaoRadoc;
                        processDoc.idQuadroSumario.save();
                        processDoc.save();
                    });
                }
            });
        }
        else{
            var notPendenciesMatch = [
                "Aguardando período de atividades",
                "Aguardando parecer da CAD",
                "Aguardando deliberação do Conselho Diretor"
            ];
            Process.find({idProfessor: radocDoc.idUsuario, radocs: radocDoc._id, situacao: "ABERTO", pendencias: { $nin: notPendenciesMatch}}).exec(function(err, processArr){
                for (var index = 0; index < processArr.length; index++){
                    var processDoc = processArr[index];
                    if (processDoc.tipo === "Estágio Probatório" && processDoc.anoEstagioProbatorio !== radocDoc.anoBase){
                        continue;
                    }
                    SummaryTable.findOne({_id: processDoc.idQuadroSumario}).populate("tabela.idPontuacaoRadoc").exec(function(err, summaryTableDoc){

                        var tableIndex = -1;
                        for (var t = 0; t < summaryTableDoc.tabela.length; t++){
                            if (summaryTableDoc.tabela[t].idRadoc.toString() === radocDoc._id.toString()){
                                tableIndex = t;
                                break;
                            }
                        }

                        if (tableIndex === -1)
                            return;

                        var scoredRadoc = radocScoreService.calculateScore(radocDoc);

                        for (var attr in scoredRadoc){
                            summaryTableDoc.tabela[tableIndex].idPontuacaoRadoc[attr] = scoredRadoc[attr];
                        }

                        var pontuacaoRadoc = {};
                        summaryTableDoc.tabela[tableIndex].pontuacaoRadoc = pontuacaoRadoc;

                        summaryTableDoc.tabela[tableIndex].idPontuacaoRadoc.save();

                    });
                }
            });
        }
    };

    service.updateSentScoresPendencies = function(scoreData, processDoc, callback){
        var depRedirect = {discente: "Pontuação dos Discentes pendente", diretoria: "Pontuação da Diretoria pendente"};
        var attrRedirect = {discente: "notaDiscente", diretoria: "notaChefia"};
        for (var t = 0; t < processDoc.idQuadroSumario.tabela.length; t++){
            var yearIndex = scoreData.yearsArr.indexOf(processDoc.idQuadroSumario.tabela[t].anoBase);
            if (yearIndex !== -1){
                processDoc.idQuadroSumario.tabela[t].notasAvaliacao[attrRedirect[scoreData.noteType]] = scoreData.inputArr[yearIndex];
            }
        }
        processDoc.idQuadroSumario.save();
        processDoc.pendencias.splice(processDoc.pendencias.indexOf(depRedirect[scoreData.noteType]), 1);
        if (processDoc.pendencias.length === 0){
            processDoc.pendencias.push("Aguardando parecer da CAD");
            processDoc.mudancaDeAvaliadorDisponivel = false;
        }
        processDoc.save();
        callback({success: true});
    };

	return service;
};
