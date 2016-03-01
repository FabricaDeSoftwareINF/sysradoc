var crypto = require('crypto');
var mv = require('mv');

exports.moveUpload = function(source, ext, folder, callback) {
    var iterativeMove = function(){
        var hexName = crypto.randomBytes(128).toString('hex').substring(0, 16);
        var dest = "uploads/" + folder + "/" + hexName + ext;
        mv(source, dest, {mkdirp: true}, function(err) {
            if (err && err.code === 'EEXIST'){
                iterativeMove();
            }
            else if (err){
                callback(err, null);
            }

            callback(null, dest);
        });
    };

    iterativeMove();
};
