 var radocParseConfig = require("./../services/radocParseConfig");
 var mongoose = require('mongoose');

 module.exports = function () {

     var radocScoreSchemaJSON = {
         idRadoc: { type: mongoose.Schema.ObjectId, ref: 'Radoc' },
         idProcesso: { type: mongoose.Schema.ObjectId, ref: 'Process' },
         idProfessor: { type: mongoose.Schema.ObjectId, ref: 'User' }

     };

     for (var s = 0; s < radocParseConfig.sections.length; s++){
         var section = radocParseConfig.sections[s];
         radocScoreSchemaJSON[section.header] = [{
            secao: String,
            subsecao: String,
            subitem: String,
            pontuacao: Number,
            modificacaoSoftware: String,
            novaPontuacao: Number,
            modificacao: String
         }];
     }

    var radocScoreSchema = mongoose.Schema(radocScoreSchemaJSON);

     return mongoose.model('RadocScore', radocScoreSchema);
 };
