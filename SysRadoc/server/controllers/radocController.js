var PDFParser = require("pdf2json/pdfparser");
var radocParse = require("./../services/radocParse");
var uploadMover = require("./../services/uploadMover");
var formidable = require('formidable');
var rm = require('rm-r');

module.exports = function(app){

	var Radoc = app.models.radoc,
        User = app.models.user;

	var controller = {};

    controller.getRadocsFromUser = function(req, res){
        Radoc.find({idUsuario: req.params.id}).sort("-anoBase").select("idUsuario anoBase instituicao urlPdf").populate("idUsuario").exec(function(err, radocs){
            res.send(radocs);
        });
    };

    controller.receiveRadoc = function(req, res){
		var userId = req.params.id;

        var pdfParser = new PDFParser();
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (err)
                res.send({reason: "Não foi possível processar o arquivo enviado."});

            pdfParser.loadPDF(files.radoc.path);
            pdfParser.on('pdfParser_dataReady', function(pdf) {
                if (radocParse.isRadoc(pdf)){
                    User.findOne({_id: userId}).exec(function(err, userDoc){
                        if (err){
                            res.send({reason: "Ocorreu um erro, tente novamente."});
                        }
                        else{
                            var parsedRadoc = radocParse.parse(pdf);
                            parsedRadoc.idUsuario = userId;
                            if (parsedRadoc["Dados do docente"][0]["Matrícula SIAPE:"] !== userDoc.matricula){
                                res.send({reason: "A matrícula que consta no radoc é diferente do usuário selecionado."});
                            }
                            else{
            					uploadMover.moveUpload(files.radoc.path, ".pdf", userId + "/radocs", function(err, path){
            						if (err){
            							res.send({reason: "Ocorreu um erro, tente novamente."});
            						}
            						else{
                                        parsedRadoc.urlPdf = path;
                                        Radoc.findOne({idUsuario: userId, anoBase: parsedRadoc.anoBase}).exec(function(err, radocDoc){
                                            if (radocDoc){
                                                rm.file(radocDoc.urlPdf);
                                                for (var attr in parsedRadoc){
                                                    radocDoc[attr] = parsedRadoc[attr];
                                                }
                                                radocDoc.save();
                                                res.send({success: true, updated: true});
                                            }
                                            else{
                                                Radoc.create(parsedRadoc, function(err, rad){
                    								if (err){
                    									res.send({reason: "Ocorreu um erro, tente novamente."});
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
                        }
                    });
                }
                else{
                    res.send({reason: "O pdf enviado não foi reconhecido como um Radoc."});
                }
            });
            pdfParser.on('pdfParser_dataError', function(error) {
                res.send({reason: "Não foi possível processar o arquivo enviado."});
            });
        });
    };

	return controller;
};
