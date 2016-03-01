var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

module.exports = function () {

    var requestSchema = mongoose.Schema({
        idUsuario: { type: mongoose.Schema.ObjectId, ref: 'User' },
        dataDeInicio: Date,
        dataFim: Date,
        tipo: String,
        data: Date
    });

    autoIncrement.initialize(mongoose.connection);

    requestSchema.plugin(autoIncrement.plugin, {
        model: 'Request',
        field: 'numero',
        startAt: 1,
        incrementBy: 1
    });

    return mongoose.model('Request', requestSchema);
};
