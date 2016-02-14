var PDFParser = require("pdf2json/pdfparser");
var radocParse = require("./../services/radocParse");
var uploadMover = require("./../services/uploadMover");
var formidable = require('formidable');

module.exports = function(app){

	var Radoc = app.models.radoc;

	var controller = {};

    controller.getRadocsFromUser = function(req, res){
        Radoc.find({idUsuario: req.params.id}).sort("-anoBase").select("idUsuario anoBase instituicao urlPdf").populate("idUsuario").exec(function(err, radocs){
            res.send(radocs);
        });
    };

    controller.receiveRadoc = function(req, res){
		var user = req.user;
		if (!user)
			res.send({success: false});

        var pdfParser = new PDFParser();
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (err)
                res.send({success: false});

            pdfParser.loadPDF(files.radoc.path);
            pdfParser.on('pdfParser_dataReady', function(pdf) {
                if (radocParse.isRadoc(pdf)){
					uploadMover.moveUpload(files.radoc.path, ".pdf", user._id + "/radocs", function(err, path){
						if (err){
							res.send({success: false});
						}
						else{
		                    var parsedRadoc = radocParse.parse(pdf);
							parsedRadoc.urlPdf = path;
							parsedRadoc.idUsuario = user._id;
							Radoc.findOne({idUsuario: user._id, anoBase: parsedRadoc.anoBase}).exec(function(err, radocDoc){
                                if (radocDoc){
                                    for (var attr in parsedRadoc){
                                        radocDoc[attr] = parsedRadoc[attr];
                                    }
                                    radocDoc.save();
                                }
                                else{
                                    Radoc.create(parsedRadoc, function(err, rad){
        								if (err){
        									res.send({success: false});
        								}
        								else {
        									res.send({success: true});
        								}
        							});
                                }
                            });
						}
					});
                }
                else{
                    res.send({success: false});
                }
            });
            pdfParser.on('pdfParser_dataError', function(error) {
                res.send({success: false});
            });
        });
    };

	return controller;
};
