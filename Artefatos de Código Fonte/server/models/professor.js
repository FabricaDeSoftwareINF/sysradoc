var mongoose = require('mongoose'),
    encryption = require('../services/encryption'),
    extend = require('mongoose-schema-extend');

module.exports = function () {

    var professorSchema = mongoose.models.Usuario.schema.extend({
        classe: String,
        dataDeIngresso: Date,
        nivel: String,
        titulacao: String
    });

    return mongoose.model('Professor', professorSchema);
};
