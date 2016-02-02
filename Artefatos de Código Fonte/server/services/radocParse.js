var parseConfig = require('./radocParseConfig'),
    parseMethods = require('./radocParseMethods'),
    PDFParser = require("pdf2json/pdfparser");

var getRadocHeader = function(jsonPDF){
    var header_size = 3;
    var rawHeader = jsonPDF.data.Pages[0].Texts.slice(0, 3);
    var header = [];
    for (var h = 0; h < header_size; h++){
        header.push(decodeURIComponent(rawHeader[h].R[0].T));
    }
    return header;
};

var getStringArrayFromPDF = function (jsonPDF) {
    var texts = [];

    for (var pageNumber = 0; pageNumber < jsonPDF.data.Pages.length; pageNumber++) {
        var page = jsonPDF.data.Pages[pageNumber];
        //Range de 3 até length - 1 para não pegar cabeçalho nem rodapé.
        for (var t = 3; t < page.Texts.length - 2; t++) {
            texts.push(decodeURIComponent(page.Texts[t].R[0].T));
        }
    }
    return texts;

};

var getTextArrayFromPDF = function (jsonPDF) {
    var texts = [];

    for (var pageNumber = 0; pageNumber < jsonPDF.data.Pages.length; pageNumber++) {
        var page = jsonPDF.data.Pages[pageNumber];
        //Range de 3 até length - 1 para não pegar cabeçalho nem rodapé.
        for (var t = 3; t < page.Texts.length - 2; t++) {
            texts.push(page.Texts[t]);
        }
    }
    return texts;

};

exports.isRadoc = function(jsonPDF){

    //TODO: Melhorar verificação se é um radoc ou não
    var pdfHeader = getRadocHeader(jsonPDF);
    if (jsonPDF.length < 2)
        return false;

    if (pdfHeader[1] !== "SISTEMA DE CADASTRO DE ATIVIDADES DOCENTES")
        return false;

    return true;
};

exports.parse = function(jsonPDF){
    var pdfArray = getStringArrayFromPDF(jsonPDF);
    var objectArray = getTextArrayFromPDF(jsonPDF);
    var pdfHeader = getRadocHeader(jsonPDF);
    var radoc = {
        "instituição": pdfHeader[0],
        "ano-base": pdfHeader[2].substring(pdfHeader[2].indexOf("ANO BASE") + 10)
    };
    for (var s = 0; s < parseConfig.sections.length; s++){
        var section = [],
            sectionConfig = parseConfig.sections[s];
        if(sectionConfig.sectionType === "linear")
            section = parseMethods.parseLinearSection(pdfArray, sectionConfig);
        else if (sectionConfig.sectionType === "table")
            section = parseMethods.parseTableSection(pdfArray, objectArray, sectionConfig);

        radoc[sectionConfig.header] = section;
    }

    return radoc;
};
