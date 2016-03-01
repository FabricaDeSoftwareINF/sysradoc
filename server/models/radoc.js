var mongoose = require('mongoose');
var radocParseConfig = require("./../services/radocParseConfig");

module.exports =  function(){
    var radocSchemaJSON = {
        anoBase: Number,
        idUsuario: { type: mongoose.Schema.ObjectId, ref: 'User' },
        instituicao: String,
        urlPdf: String,
    };

    var sectionsSchemas = [];
    for (var s = 0; s < radocParseConfig.sections.length; s++){
        var section = radocParseConfig.sections[s];
        var sectionSchemaJSON = {};
        for (var l = 0; l < section.labels.length; l++){
            sectionSchemaJSON[section.labels[l]] = String;
        }
        sectionsSchemas.push({
            label: section.header,
            schema: sectionSchemaJSON
        });
        radocSchemaJSON[sectionsSchemas[s].label] = [sectionsSchemas[s].schema];
    }

    var radocSchema = mongoose.Schema(radocSchemaJSON);

    return mongoose.model('Radoc', radocSchema);
};
