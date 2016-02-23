var encryption = require('../services/encryption'),
	nodemailer = require('nodemailer'),
    mongoose = require('mongoose'),
    emailAgent = require('../services/emailAgent');

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
    html: "",
};

module.exports = function(app){
	var User = app.models.user,
		Token = app.models.token,
        Request = app.models.request;

	var controller = {};

    controller.getAllUsers = function(req, res, next){
        User.find({}).exec(function(err, users){
            res.send(users);
        });
    };

    controller.getAllUsersByCategory = function(req, res, next){
        User.find({_categoria: req.params.category}).exec(function(err, users){
            res.send(users);
        });
    };

    controller.createUser = function (req, res, next) {
        var userData = req.body;
        userData.password = encryption.createRandomPassword();
		userData.email = req.body.emailRequest;
        userData.salt = encryption.createSalt();
        userData.hash = encryption.hashPwd(userData.salt, userData.password);

        if (!userData.notANewTeacher){
            userData.estagioProbatorioCompleto = false;
            userData.dataEntradaUltimoNivel = userData.dataDeIngresso;
        }

        var model = mongoose.model(userData.categoria);
        model.create(userData, function (err, user) {
            if (err) {
                var errString = "Um erro ocorreu, tente novamente.";
                if (err.toString().indexOf('E11000') > -1) {
                    errString = "Este email já foi cadastrado no sistema.";
                }
                res.status(400);
                return res.send({reason: errString});
            }
            var url = 'http://' + req.headers.host;
            var html = "Prezada(o),<br><br> Uma conta de " + userData.categoria + " foi criada para você no SysRadoc. Acesse <a href='" + url + "'>" + url + "<a> utilizando os seguintes dados:<br><ul><li><strong>Email: </strong>" + userData.email + "</li><li><strong>Senha: </strong>" + userData.password + "</li></ul> <br><br>Sysradoc.";
            var subject = "Conta Cadastrada - SysRadoc";
            emailAgent.sendEmail(userData.email, subject, html, url);
            if (!userData.estagioProbatorioCompleto){
                var dataFim = new Date(userData.dataDeIngresso);
                dataFim.setFullYear(dataFim.getFullYear() + 3);
                var requestData = {
                    tipo: "Estágio Probatório",
                    idUsuario: user._id,
                    dataDeInicio: userData.dataDeIngresso,
                    dataFim: dataFim,
                    data: new Date()
                };
                Request.create(requestData, function(err, requestDoc){
                    res.send({success: true});
                });
            }
            else{
                res.send({success: true});
            }
        });
    };

    controller.updateUser = function(req, res){
        var userData = req.body;
        userData.email = userData.emailRequest;
        userData._categoria = userData.categoria;
        User.findOne({email: req.params.email}).exec(function(err, userDoc){
            for (var attr in userData){
                userDoc[attr] = userData[attr];
            }
            userDoc.save();
            res.send({});
        });
    };

    controller.removeUser = function(req, res){
        User.remove({email: req.params.email}).exec(function (err, collection) {
            res.send({});
        });

    };

	controller.recover = function(req, res){
		var email = req.params.email;
		User.findOne({email: email}).exec(function (err, user) {
	        if (!!user){
				var tokenGenerated = encryption.createToken().substring(0, 16);
				var resetPage = 'http://' + req.headers.host + "/resetPassword";
				var pageParams = "?email=" + email + "&token=" + tokenGenerated;
				var html = "Prezada(o),<br><br>Foi requisitada no SysRadoc uma redefinição de senha. Para informar uma nova senha, clique <a href='" + (resetPage + pageParams) + "'>aqui</a> e defina sua nova senha.<br><br>Caso o link não funcione, siga as seguintes instruções:<br><ol><li>Entre em <a href='" + resetPage + "'>" + resetPage + "</a></li><li>Informe seu email</li><li>Informe a chave: <strong>" + tokenGenerated + "</strong></li><li>Informe a nova senha</li></ol><br><br>Caso não tenha requisitado essa redefinição, ignore este email.<br><br>Sysradoc.";
				var subject = "Redefinição de Senha - SysRadoc";
                emailAgent.sendEmail(email, subject, html, 'http://' + req.headers.host);
				Token.findOne({email: email}).exec(function (err, tokenFound) {
					if (!!tokenFound){
						tokenFound.token = tokenGenerated;
						tokenFound.save();
					}
					else{
						Token.create({email: email, token: tokenGenerated});
					}
				});
				res.send({success: true});
			}
			else{
				res.send({success: false});
			}
	    });
	};

	controller.reset = function(req, res){
		var email = req.params.email;
		var tokenUsed = req.params.token;
		var password = req.body.password;
		Token.findOneAndRemove({email: email, token: tokenUsed}, function (err, token) {
	        if (!!token){
				User.findOne({email: email}).exec(function (err, user) {
					var salt = encryption.createSalt();
					var hash = encryption.hashPwd(salt, password);
					user.salt = salt;
					user.hash = hash;
					user.save();
					res.send({success: true});
				});
			}
			else{
				res.send({success: false});
			}
	    });
	};

	return controller;
};
