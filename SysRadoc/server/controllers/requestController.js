module.exports = function(app){

	var Request = app.models.request,
        Process = app.models.process;

	var controller = {};

    controller.getRequests = function(req, res){
        Request.find({}).populate("idUsuario").exec(function(err, requests){
            res.send(requests);
        });
    };

    controller.getRequestsById = function(req, res){
        Request.find({idUsuario: req.params.id}).populate("idUsuario").exec(function(err, requests){
            res.send(requests);
        });
    };

    controller.createRequest = function(req, res){
        var requestData = req.body;
        requestData.data = new Date();
        Request.count({idUsuario: requestData.idUsuario}, function(err, countReq){
            if (countReq > 0){
                res.send({reason: "Não é possível realizar mais de uma solicitação por vêz."});
            }
            else{
                Process.count({idProfessor: requestData.idUsuario}, function(err, countProc){
                    if (countProc > 0){
                        res.send({reason: "Não é possível fazer uma solicitação com um processo aberto."});
                    }
                    else{
                        Request.create(requestData, function(err, request){
                            res.send({success: true});
                        });
                    }
                });
            }
        });
    };

	return controller;
};
