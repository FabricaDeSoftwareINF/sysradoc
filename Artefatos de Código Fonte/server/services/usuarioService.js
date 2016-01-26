var moongose = require('mongoose');

exports.criarUsuarioPelaCategoria = function (userData, models) {
	var categoria = userData.categoria;
	moongose.models[categoria].create(userData, function (err, user) {
		if (err) {
			if (err.toString().indexOf('E11000') > -1) {
				err = new Error('Este email já foi cadastrado no sistema.');
			}
			res.status(400);
			return {reason: err.toString()};
		}
		return {success: true};
	});
};