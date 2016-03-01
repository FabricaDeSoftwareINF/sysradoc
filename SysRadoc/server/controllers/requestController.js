module.exports = function(app){

    var requestValidator = require("../services/requestValidator")(app);

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
        requestValidator.validateAndCreate(requestData, function(response){
            res.send(response);
        });
    };

	return controller;
};
