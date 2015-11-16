var parseConfig = require('./radocParseConfig'),
    parseMethods = require('./radocParseMethods');

var getStringArrayFromPDF = function (pdf) {
    var texts = [];

    for (var pageNumber = 0; pageNumber < pdf.data.Pages.length; pageNumber++) {
        var page = pdf.data.Pages[pageNumber];
        //Range de 3 até length - 1 para não pegar cabeçalho nem rodapé.
        for (var t = 3; t < page.Texts.length - 2; t++) {
            texts.push(decodeURIComponent(page.Texts[t].R[0].T));
        }
    }
    return texts;

};

var getTextArrayFromPDF = function (pdf) {
    var texts = [];

    for (var pageNumber = 0; pageNumber < pdf.data.Pages.length; pageNumber++) {
        var page = pdf.data.Pages[pageNumber];
        //Range de 3 até length - 1 para não pegar cabeçalho nem rodapé.
        for (var t = 3; t < page.Texts.length - 2; t++) {
            texts.push(page.Texts[t]);
        }
    }
    return texts;

};

exports.parse = function(pdf){
    var pdfArray = getStringArrayFromPDF(pdf);
    var objectArray = getTextArrayFromPDF(pdf);
    var radoc = {};
    for (var s = 0; s < parseConfig.sections.length; s++){
        var section = [],
            sectionConfig = parseConfig.sections[s];
        if(sectionConfig.sectionType === "linear")
            section = parseMethods.parseLinearSection(pdfArray, sectionConfig);
        else if (sectionConfig.sectionType === "table")
            section = parseMethods.parseTableSection(pdfArray, objectArray, sectionConfig);

        console.log(section);
        radoc[sectionConfig.header] = section;
    }

    return radoc;
};
