module.exports = function(app){

	var Process = app.models.process,
        Request = app.models.request,
        User = app.models.user,
        Radoc = app.models.radoc,
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
                Process.create(processData, function(err, processDoc){
                    Request.remove({idUsuario: processData.idProfessor + "s", tipo: processData.tipo}).exec(function(err, collection){
                        callback({success: true});
                        service.updateStatusAndPendencies(processDoc);
                    });

                });
            }
            else{
                callback({reason: "Não existe nenhuma solicitação de " + processData.tipo + " para este docente."});
            }
        });
    };

    service.updateStatusAndPendencies = function(processDoc){
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

        function makeRadocCallback(year){
            var months = 12;
            if (year === dataDeInicio.getFullYear())
                months = 12 - dataDeInicio.getMonth();
            else if (year === dataFim.getFullYear())
                months = dataFim.getMonth() + 1;

            return function processRadoc(err, radocDoc){
                if (radocDoc){
                    var pontuacaoRadoc = {};
                    summaryTableData.tabela.push({
                        idRadoc: radocDoc._id,
                        anoBase: year,
                        mesesAvaliados: months,
                        pontuacaoRadoc: pontuacaoRadoc
                    });
                    if (processDoc.pendencias.indexOf("Pontuação da Diretoria pendente") === -1){
                        processDoc.pendencias.push("Pontuação da Diretoria pendente");
                        processDoc.pendencias.push("Pontuação dos Discentes pendente");
                    }
                }
                else{
                    summaryTableData.tabela.push({idRadoc: null, anoBase: year, mesesAvaliados: months});
                    processDoc.pendencias.push("RADOC " + year + " pendente");
                }

                if (year === dataFim.getFullYear()){
                    endRadocParseCallback();
                }
            };
        }

        function endRadocParseCallback(){
            SummaryTable.create(summaryTableData, function(err, summaryTableDoc){
                processDoc.idQuadroSumario = summaryTableDoc._id;
                processDoc.save();
            });
        }


        for (var year = dataDeInicio.getFullYear(); year <= dataFim.getFullYear(); year++){
            Radoc.findOne({idUsuario: processDoc.idProfessor, anoBase: year}).exec(makeRadocCallback(year));
        }

    };

	return service;
};
