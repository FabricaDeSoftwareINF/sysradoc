module.exports = function(app){

	var Process = app.models.process,
        Request = app.models.request;

	var service = {};

    service.validateAndCreate = function(processData, callback){
        Process.count({idProfessor: processData.idProfessor, situacao: "ABERTO"}, function(err, countProcess){
            if (countProcess === 0){
                if (processData.tipo !== "Estágio Probatório"){
                    Request.count({idUsuario: processData.idProfessor, tipo: processData.tipo, dataDeInicio: processData.dataDeInicio, dataFim: processData.dataFim}, function(err, countRequest){
                        if (countRequest > 0){
                            Process.create(req.body, function(err, process){
                                Request.remove({idUsuario: processData.idProfessor, tipo: processData.tipo}).exec(function(err, collection){
                                    callback({success: true});
                                });

                            });
                        }
                        else{
                            callback({reason: "Não existe nenhuma solicitação de " + processData.tipo + " neste período para este docente."});
                        }
                    });

                }
                else{
                    Process.count({idProfessor: processData.idProfessor, tipo: processData.tipo}, function(err, countType){
                        if (countType === 0){
                            Process.create(req.body, function(err, process){
                                callback({success: true});
                            });
                        }
                        else{
                            callback({reason: "Este docente já realizou seu estágio probatório."});
                        }
                    });
                }
            }
            else{
                callback({reason: "Este docente já possui um processo em aberto."});
            }
        });
    };

	return service;
};
