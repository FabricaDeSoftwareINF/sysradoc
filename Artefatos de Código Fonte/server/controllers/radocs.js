var PDFParser = require("pdf2json/pdfparser");
var radocParse = require("./../services/radocParse");
var formidable = require('formidable');

module.exports = function(app){

	var controller = {};

    controller.receiveRadoc = function(req, res){
        var pdfParser = new PDFParser();
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (err)
                res.send({success: false});
                
            pdfParser.loadPDF(files.radoc.path);
            pdfParser.on('pdfParser_dataReady', function(pdf) {
                if (radocParse.isRadoc(pdf)){
                    radocParse.parse(pdf);
                    res.send({success: true});
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
