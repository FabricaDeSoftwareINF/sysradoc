 var radocParseConfig = require("./radocParseConfig");

module.exports = function(app){

	var Process = app.models.process,
        Request = app.models.request,
        User = app.models.user;

	var service = {};

    service.calculateSummaryTable = function(radocScore){
        for (var s = 0; s < radocParseConfig.sections.length; s++){
            var section = radocParseConfig.sections[s].header;
            
        }
    };

	return service;
};
