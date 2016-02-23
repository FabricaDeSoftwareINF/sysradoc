module.exports = function(app){

    var classes = [
        "A",
        "B",
        "C",
        "D",
        "E"
    ];
    var levels = {
        A: ["1", "2"],
        B: ["1", "2"],
        C: ["1", "2", "3", "4"],
        D: ["1", "2", "3", "4"],
        E: ["1"]
    };

	var Process = app.models.process,
        Request = app.models.request,
        User = app.models.user;

	var service = {};

    service.validateAndCreate = function(processData, callback){
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
    };

	return service;
};
