module.exports = function(app){

    function diffMonths(dateA, dateB){
        var months;
        months = (dateB.getFullYear() - dateA.getFullYear()) * 12;
        months -= dateA.getMonth();
        months += dateB.getMonth();
        return months <= 0 ? 0 : months;
    }

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

    service.validateAndCreate = function(requestData, callback){
        Request.count({idUsuario: requestData.idUsuario}, function(err, countReq){
            if (countReq > 0){
                callback({reason: "Não é possível realizar mais de uma solicitação por vêz."});
            }
            else{
                User.findOne({_id: requestData.idUsuario}).exec(function(err, user){
                    var lastChangeMonths = diffMonths(new Date(user.dataEntradaUltimoNivel), new Date());
                    var timespace = diffMonths(new Date(requestData.dataDeInicio), new Date(requestData.dataFim)) + 1;
                    if (requestData.tipo === "Progressão Funcional"){
                        if (levels[user.classe].indexOf(user.nivel) === levels[user.classe].length - 1){
                            callback({reason: "Não é possível pedir uma progressão, pois você já se encontra no último nível de sua classe."});
                            return false;
                        }
                        else if (lastChangeMonths < 24){
                            callback({reason: "Não é possível pedir uma progressão, pois você não cumpriu ainda um total de 24 meses no seu nível atual."});
                            return false;
                        }
                        else if (timespace !== 24){
                            callback({reason: "O período a ser avaliado deve ser composto por 24 meses."});
                            return false;
                        }

                    }
                    else if (requestData.tipo === "Promoção na Carreira de Magistério"){
                        if (levels[user.classe].indexOf(user.nivel) !== levels[user.classe].length - 1){
                            callback({reason: "Não é possível pedir uma promoção, pois você não se encontra no último nível de sua classe."});
                            return false;
                        }
                        else if (user.classe === "E"){
                            callback({reason: "Não é possível pedir uma promoção, pois você já se encontra na última classe."});
                            return false;
                        }
                        else if (!user.estagioProbatorioCompleto){
                            callback({reason: "Não é possível pedir uma promoção com estágio probatório incompleto."});
                            return false;
                        }
                        else if (lastChangeMonths < 24){
                            callback({reason: "Não é possível pedir uma promoção pois você não cumpriu ainda um total de 2 anos no último nível de sua classe."});
                            return false;
                        }
                        else if (timespace !== 24){
                            callback({reason: "O período a ser avaliado deve ser composto por 24 meses."});
                            return false;
                        }
                    }
                    Request.create(requestData, function(err, request){
                        callback({success: true});
                    });
                });
            }
        });
    };

	return service;
};
