exports.parseLinearSection = function(pdfArray, sectionConfig) {
    if (pdfArray.indexOf(sectionConfig.header) === -1)
        return [];

    var start = pdfArray.indexOf(sectionConfig.header) + sectionConfig.afterHeaderSkip,
        pos = start,
        sectionArray = [],
        labels = sectionConfig.labels;

    while(true){
        var newSection = {},
            addSection = true;
            
        for (var l = 0; l < labels.length; l++){
            var nextLabel = labels[(l + 1) % labels.length];
            if (labels[l] !== pdfArray[pos]){
                addSection = false;
                break;
            }
            if (pdfArray[pos + 1] === nextLabel || pdfArray[pos + 1].indexOf("_______/") !== -1){
                newSection[labels[l]] = "";
                pos++;
            }
            else{
                var relPos = 1;
                var value = "";
                while(true){
                    if (pdfArray.length > pos + relPos &&
                        pdfArray[pos + relPos] !== nextLabel &&
                        pdfArray[pos + relPos] !== sectionConfig.nextSection &&
                        (relPos <= 1 || l < labels.length - 1 || !sectionConfig.singleLineEnd)){
                        if (relPos > 1)
                            value += "\n";

                        value += pdfArray[pos + relPos];
                        relPos++;
                    }
                    else{
                        break;
                    }
                }
                newSection[labels[l]] = value;
                pos += relPos;
            }
        }

        if(addSection)
            sectionArray.push(newSection);
        else
            break;
    }


    return sectionArray;
};

exports.parseTableSection = function(pdfArray, objectArray, sectionConfig) {
    if (pdfArray.indexOf(sectionConfig.header) === -1)
        return [];

    var start = pdfArray.indexOf(sectionConfig.header) + sectionConfig.afterHeaderSkip,
        pos = start,
        end = pdfArray.indexOf(sectionConfig.nextSection),
        sectionArray = [],
        xLabelPos = [],
        labels = sectionConfig.labels;

    for (var lx = 0; lx < labels.length; lx++){
        xLabelPos.push(objectArray[pos + lx].x);
    }
    pos += labels.length;

    while(true){
        if (end - pos >= labels.length){
            var newSection = {};
            var walk = 0;
            for (var l = 0; l < labels.length; l++){
                if(xLabelPos[l] == objectArray[pos + walk].x){
                    newSection[labels[l]] = pdfArray[pos + walk];
                    walk++;
                }
                else if (xLabelPos[l - 1] == objectArray[pos + walk].x){
                    newSection[labels[l - 1]] += (" " + pdfArray[pos + walk]);
                    walk++;
                    l--;
                }
                else{
                    newSection[labels[l]] = "";
                }
            }
            sectionArray.push(newSection);
            pos += walk;
        }
        else{
            break;
        }
    }

    return sectionArray;
};
