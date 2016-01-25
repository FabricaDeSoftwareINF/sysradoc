var crypto = require('crypto');

exports.createHash = function() {
    return crypto.randomBytes(128).toString('base64');
};

exports.gerarSenhaAleatoria = function(){
	return crypto.randomBytes(8).toString('hex');
};

exports.hashPassword = function(hash, password) {
    var hmac = crypto.createHmac('sha512', hash);
    hmac.setEncoding('hex');
    hmac.write(password);
    hmac.end();
    return hmac.read();
};

exports.createToken = function(){
    return crypto.randomBytes(128).toString('hex');
};
