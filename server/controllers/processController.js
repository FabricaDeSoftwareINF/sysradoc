module.exports = function(app) {

    var processValidator = require("../services/processValidator")(app);

    var Process = app.models.process,
        Request = app.models.request,
        RadocScore = app.models.radocScore;

    var controller = {};


    controller.getProcesses = function (req, res) {
        Process.find({}).populate("idProfessor idAvaliador").populate("radocs", "ano-base").exec(function (err, processes) {
            res.send(processes);
        });
    };

    controller.getProcessesById = function (req, res) {
        Process.find({idProfessor: req.params.id}).populate("idProfessor idAvaliador").populate("radocs", "ano-base").exec(function (err, processes) {
            res.send(processes);
        });
    };

    controller.createProcess = function (req, res) {
        var processData = req.body;
        if (processData.idAvaliador === "" || processData.idAvaliador === "-1")
            delete processData.idAvaliador;
        processData.situacao = "ABERTO";
        processData.pendencias = [];

        processValidator.validateAndCreate(processData, function (response) {
            res.send(response);
        });

    };

    controller.updateAppraiser = function (req, res) {
        if (req.body.idAvaliador === "" || req.body.idAvaliador === "-1")
            req.body.idAvaliador = undefined;
        Process.findOne({_id: req.body.id}).exec(function (err, proc) {
            proc.idAvaliador = req.body.idAvaliador;
            proc.save();
            res.send({success: true});
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
