module.exports = function(app){

	var Request = app.models.request;

	var controller = {};

    controller.getRequests = function(req, res){
        Request.find({}).exec(function(err, requests){
            res.send(requests);
        });
    };

    controller.createRequest = function(req, res){
        console.log(req.body);
        res.send({});
    };

	return controller;
};
