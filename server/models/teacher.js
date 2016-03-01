var mongoose = require('mongoose'),
    encryption = require('../services/encryption'),
    extend = require('mongoose-schema-extend');

module.exports = function () {

    var teacherSchema = mongoose.models.User.schema.extend({
        classe: String,
        dataDeIngresso: Date,
        nivel: String,
        titulacao: String
    });

    return mongoose.model('Professor', teacherSchema);
};
