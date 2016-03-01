var crypto = require('crypto');

exports.createSalt = function() {
    return crypto.randomBytes(128).toString('base64');
};

exports.createRandomPassword = function() {
    return crypto.randomBytes(8).toString('hex');
};

exports.hashPwd = function(salt, pwd) {
    var hmac = crypto.createHmac('sha512', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
};

exports.createToken = function(){
    return crypto.randomBytes(128).toString('hex');
};
