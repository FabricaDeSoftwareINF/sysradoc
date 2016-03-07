var CronJob = require('cron').CronJob;

module.exports = function (app) {

    var processValidator = require("../server/services/processValidator")(app);

    var Process = app.models.process,
        Radoc = app.models.radoc;

    new CronJob('00 00 00 1 * *', function() {
        var today = new Date();
        Process.find({pendencias: "Aguardando associação de relator ao processo"}).exec(function(err, procArr){
            for (var p = 0; p < procArr.length; p++){
                var processDoc = procArr[p];
                if (today.getFullYear() > processDoc.anoEstagioProbatorio || today.getMonth() > processDoc.dataFim.getMonth()){
                    processDoc.pendencias = ["RADOC " + processDoc.anoEstagioProbatorio + " pendente"];
                    processDoc.save();
                    Radoc.findOne({idUsuario: processDoc.idProfessor, anoBase: processDoc.anoEstagioProbatorio}).exec(function(err, radocDoc){
                        if (radocDoc){
                            processValidator.updateSentRadocPendencies(radocDoc);
                        }
                    });
                }
            }
        });
    }, null, true, 'America/Sao_Paulo');

};
