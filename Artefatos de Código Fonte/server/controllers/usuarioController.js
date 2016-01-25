var encryption = require('../services/encryption'),
	nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: "Zoho",
	auth: {
		user: 'no-reply@everemind.herokuapp.com',
		pass: 'evestaff321'
	}
});

var mailOptions = {
	from: 'SysRadoc <no-reply@everemind.herokuapp.com>',
	to: '',
	subject: '',
	html: ""
};

var criarUsuarioPelaCategoria = function (userData) {
	app.models[userData.categoria].create(userData, function (err, user) {
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

var enviarEmail = function (email, assunto, conteudo, numeroTentativas) {
	mailOptions.to = email;
	mailOptions.subject = assunto;
	mailOptions.html = conteudo;

	var tentativas = numeroTentativas;
	var tentarNovamente = true;
	var resposta = false;

	while (tentarNovamente && tentativas > 0) {
		tentarNovamente = false;
		tentativas--;
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				tentarNovamente = true;
				console.log(error);
				if (tentarNovamente && tentativas > 0)
					console.log("Retry[" + (3 - tentativas) + "/3]...");
				else
					console.log("Out of retries.");
			} else {
				console.log('Message sent: ' + info.response);
			}
		});
	}
	return sucesso;
};

module.exports = function (app) {
	var Usuario = app.models.usuario,
		Token = app.models.token;

	var controller = {};

	controller.createUser = function (req, res, next) {
		var userData = req.body;
		var senhaAleatoria = encryption.gerarSenhaAleatoria();


		userData.email = req.body.emailRequest;
		userData.hash = encryption.createHash();
		userData.senhaEncriptada = encryption.hashPassword(userData.hash, senhaAleatoria);
		userData.password = undefined;
		userData.repeatPassword = undefined;

		var resposta = criarUsuarioPelaCategoria(userData.categoria);

		if(resposta.reason){
			res.send(resposta);
		} else {
			var email = userData.email;
			var assunto = 'Bem-vindo ao SysRadoc';
			var conteudo = 'Sua senha no sistema SysRadoc é: ' + senhaAleatoria;

			var resposta = enviarEmail(email, assunto, conteudo, 3);

			res.send(resposta);
		}
	};

	controller.recover = function (req, res) {
		var email = req.params.email;
		Usuario.findOne({email: email}).exec(function (err, user) {
			if (!!user) {
				var tokenGenerated = encryption.createToken().substring(0, 16);
				var resetPage = 'http://' + req.headers.host + "/resetPassword";
				var pageParams = "?email=" + email + "&token=" + tokenGenerated;

				var assunto = "Redefinição de Senha - SysRadoc";
				var conteudo = "Prezada(o),<br><br>Foi requisitada no SysRadoc uma redefinição de senha. Para informar uma nova senha, clique <a href='" + (resetPage + pageParams) + "'>aqui</a> e defina sua nova senha.<br><br>Caso o link não funcione, siga as seguintes instruções:<br><ol><li>Entre em <a href='" + resetPage + "'>" + resetPage + "</a></li><li>Informe seu email</li><li>Informe a chave: <strong>" + tokenGenerated + "</strong></li><li>Informe a nova senha</li></ol><br><br>Caso não tenha requisitado essa redefinição, ignore este email.<br><br>Sysradoc.";

				enviarEmail(email, assunto, conteudo, 3);

				Token.findOne({email: email}).exec(function (err, tokenFound) {
					if (!!tokenFound) {
						tokenFound.token = tokenGenerated;
						tokenFound.save();
					}
					else {
						Token.create({email: email, token: tokenGenerated});
					}
				});
				res.send({success: true});
			}
			else {
				res.send({success: false});
			}
		});
	};

	controller.reset = function (req, res) {
		var email = req.params.email;
		var tokenUsed = req.params.token;
		var password = req.body.password;
		Token.findOneAndRemove({email: email, token: tokenUsed}, function (err, token) {
			if (!!token) {
				Usuario.findOne({email: email}).exec(function (err, user) {
					var hash = encryption.createHash();
					var hashedPwd = encryption.hashPassword(salt, password);
					user.salt = salt;
					user.hashedPwd = hashedPwd;
					user.save();
					res.send({success: true});
				});
			}
			else {
				res.send({success: false});
			}
		});
	};

	return controller;
};
