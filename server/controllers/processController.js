module.exports = function(app) {

    var processValidator = require("../services/processValidator")(app);

    var Process = app.models.process,
        Request = app.models.request,
        RadocScore = app.models.radocScore,
        Radoc = app.models.radoc;

    var controller = {};


    controller.getProcesses = function (req, res) {
        Process.find({}).populate("idProfessor idAvaliador idQuadroSumario").exec(function (err, processes) {
            res.send(processes);
        });
    };

    controller.getProcessesById = function (req, res) {
        Process.find({idProfessor: req.params.id}).populate("idProfessor idAvaliador idQuadroSumario").exec(function (err, processes) {
            res.send(processes);
        });
    };

    controller.createProcess = function (req, res) {
        var processData = req.body;
        if (processData.idAvaliador === "" || processData.idAvaliador === "-1")
            delete processData.idAvaliador;
        processData.situacao = "ABERTO";
        processData.pendencias = [];

        Process.findOne({identificador: processData.identificador}).exec(function(err, doc){
            if (doc){
                res.send({reason: "Já existe um processo cadastrado com este identificador"});
            }
            else{
                processValidator.validateAndCreate(processData, function (response) {
                    res.send(response);
                });
            }
        });



    };

    controller.updateAppraiser = function (req, res) {
        if (req.body.idAvaliador === "" || req.body.idAvaliador === "-1")
            req.body.idAvaliador = undefined;
        Process.findOne({_id: req.body.id}).exec(function (err, proc) {
            proc.idAvaliador = req.body.idAvaliador;
            if (proc.pendencias.indexOf("Aguardando associação de relator ao processo") !== -1){
                proc.pendencias.splice(proc.pendencias.indexOf("Aguardando associação de relator ao processo"), 1);
                if (proc.pendencias.length === 0){
                    //proc.pendencias.push("Aguardando parecer da CAD");
                    proc.mudancaDeAvaliadorDisponivel = false;
                    var now = new Date();
                    if (proc.tipo === "Estágio Probatório" && proc.anoEstagioProbatorio < (new Date(proc.dataFim)).getFullYear()){
                        proc.anoEstagioProbatorio++;
                        if (now.getFullYear() > proc.anoEstagioProbatorio || (now.getFullYear() === proc.anoEstagioProbatorio && now.getMonth() > (new Date(proc.dataFim)).getMonth()) ){
                            proc.pendencias.push("RADOC " + proc.anoEstagioProbatorio + " pendente");
                            proc.save();
                            Radoc.findOne({idUsuario: proc.idProfessor, anoBase: proc.anoEstagioProbatorio}).exec(function(err, radocDoc){
                                if (radocDoc){
                                    service.updateSentRadocPendencies(radocDoc);
                                }
                            });
                        }
                        else{
                            proc.pendencias.push("Aguardando período de atividades");
                            proc.save();
                        }
                    }
                }
            }
            proc.save();
            res.send({success: true});
        });
    };

    controller.updateScores = function(req, res){
        var depRedirect = {discente: "Pontuação dos Discentes pendente", diretoria: "Pontuação da Diretoria pendente"};
        Process.findOne({_id: req.body.idProcess}).populate("idQuadroSumario").exec(function (err, proc) {
            if (proc.pendencias.indexOf(depRedirect[req.body.noteType]) === -1){
                res.send({reason: "O processo parece estar desatualizado. Atualize a página e tente novamente."});
            }
            else{
                processValidator.updateSentScoresPendencies(req.body, proc, function(response){
                    res.send(response);
                });
            }
        });
    };

    controller.generateSummaryTable = function (req, res) {

        var radocs;
        var radocIDs;

        Process.findAll({_id: req.body.id}).exec(function (err, process) {
            radocs = process.radocs;
            radocIDs = [];
            for (var i = 0; i < radocs.length; i++) {
                radocIDs.push(radocs[i].get_id());
            }

            RadocScore.find({"idRadoc": {$in: radocIDs}}, function (err, scores) {
                var summaryTable = {};
                summaryTable.idProcesso = process.get_id();
                summaryTable.idProfessor = process.idProfessor.get_id();
                summaryTable.tipo = process.tipo;
                summaryTable.status = process.situacao;
                summaryTable.instituto = radocs[0].instituto;
                summaryTable.regime = radocs[0].regime;
                for (var i = 0; i < radocs.length; i++) {
                    summaryTable.tabela[i] = {
                        idRadoc: radocs[i].get_id(),
                        anoBase: radocs[i].anoBase,
                        mesesAvaliados: radocs[i].mesesAvaliados
                    };
                }
            });
            return summaryTable;
        });
    };

    return controller;
};
