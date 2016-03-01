var mongoose = require('mongoose'),
    encryption = require('../services/encryption'),
    extend = require('mongoose-schema-extend');

module.exports = function () {

    var secretarySchema = mongoose.models.User.schema.extend({
    });

    return mongoose.model('Secretaria', secretarySchema);
};
