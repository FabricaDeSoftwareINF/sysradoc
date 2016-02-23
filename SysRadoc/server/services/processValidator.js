module.exports = function(app){

	var Process = app.models.process,
        Request = app.models.request,
        User = app.models.user;

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
                Process.create(processData, function(err, process){
                    Request.remove({idUsuario: processData.idProfessor, tipo: processData.tipo}).exec(function(err, collection){
                        callback({success: true});
                    });

                });
            }
            else{
                callback({reason: "Não existe nenhuma solicitação de " + processData.tipo + " para este docente."});
            }
        });
    };

	return service;
};
