var encryption = require('../services/encryption'),
	nodemailer = require('nodemailer'),
    mongoose = require('mongoose');

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
		Token = app.models.token;

	var controller = {};

    controller.createUser = function (req, res, next) {
        var userData = req.body;
        userData.password = encryption.createRandomPassword();
		userData.email = req.body.emailRequest;
        userData.salt = encryption.createSalt();
        userData.hash = encryption.hashPwd(userData.salt, userData.password);

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

            res.send({success: true});
        });
    };

	controller.recover = function(req, res){
		var email = req.params.email;
		User.findOne({email: email}).exec(function (err, user) {
	        if (!!user){
				var tokenGenerated = encryption.createToken().substring(0, 16);
				var resetPage = 'http://' + req.headers.host + "/resetPassword";
				var pageParams = "?email=" + email + "&token=" + tokenGenerated;
				mailOptions.html = "Prezada(o),<br><br>Foi requisitada no SysRadoc uma redefinição de senha. Para informar uma nova senha, clique <a href='" + (resetPage + pageParams) + "'>aqui</a> e defina sua nova senha.<br><br>Caso o link não funcione, siga as seguintes instruções:<br><ol><li>Entre em <a href='" + resetPage + "'>" + resetPage + "</a></li><li>Informe seu email</li><li>Informe a chave: <strong>" + tokenGenerated + "</strong></li><li>Informe a nova senha</li></ol><br><br>Caso não tenha requisitado essa redefinição, ignore este email.<br><br>Sysradoc.";
				mailOptions.subject = "Redefinição de Senha - SysRadoc";
				mailOptions.to = email;
				var tries = 3;
				var retry = true;
				while(retry && tries > 0){
					retry = false;
					tries--;
					transporter.sendMail(mailOptions, function(error, info){
						if(error){
							retry = true;
							console.log(error);
							if(retry && tries > 0)
								console.log("Retry[" + (3 - tries) + "/3]...");
							else
								console.log("Out of retries.");
						}else{
							console.log('Message sent: ' + info.response);
						}
					});
				}
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
