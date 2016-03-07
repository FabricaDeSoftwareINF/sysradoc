var config = require('./radocParseConfig');

/*
    /!\ ATENÇÃO /!\
    Este arquivo usa referências diretas a ordem das sessões no arquivo radocParseConfig.js.
    Caso houver qualquer alteração no arquivo, seja na ordem das sessões ou mesmo na ordem das labels,
    este arquivo deve ser refatorado para manter seu funcionamento. |TODAS| as referências
    estão listadas abaixo:

    config.sections[2].header = "rgcg - regime de graduação semestral"
    config.sections[3].header = "pós-graduação lato sensu/sctricto sensu (rdc)"
    config.sections[10].header = "produtos"
    config.sections[10].labels[0] = "descrição do produto:"
    config.sections[5].header = "atividades em projetos"
    config.sections[5].labels[1] = "tabela:"
    config.sections[6].header = "atividades de extensão"
    config.sections[6].labels[0] = "tabela:"
    config.sections[9].header = "atividades administrativas"
    config.sections[9].labels[0] = "tabela:"
    config.sections[4].header = "atividades de orientação"
    config.sections[4].labels[1] = "tabela:"
    config.sections[8].header = "atividades acadêmicas especiais"
    config.sections[8].labels[0] = "tabela:"
    config.sections[7].header = "atividades de qualificação"
    config.sections[7].labels[0] = "tabela:"

    Este arquivo é dividido em duas sessões:
    -Somas
    -Podas

    O trecho de somas constitui o calculo de cada item do radoc
    O trecho de podas constitui a limitação por quantidade máxima de pontos ou por ano
    de uma atividade

*/

var getMonths = function(data){
    var init = data["data início:"] || data["data de início:"];
    var ending = data["data término:"] || data["data de término:"];
    return parseInt(ending.substring(3, 5)) - parseInt(init.substring(3, 5)) + 1;
};

exports.calculateScore = function(radoc){

    var score = {};
    var maxScore, cha, maxScores, scoreObj, scoreByYear;

    //Trecho de soma das pontuações

    for (var sect = 0; sect < config.sections.length; sect++){
        score[config.sections[sect].header] = [];
    }

    for (var subjectsGrad = 0; subjectsGrad < radoc[config.sections[2].header].length; subjectsGrad++){
        score[config.sections[2].header].push(
            {secao: "1", subsecao: "1", subitem: "", pontuacao: (parseInt(radoc[config.sections[2].header][subjectsGrad].CHA) / 32) * 10}
        );
    }

    for (var subjectsLSS = 0; subjectsLSS < radoc[config.sections[3].header].length; subjectsLSS++){
        score[config.sections[3].header].push(
            {secao: "1", subsecao: "2", subitem: "", pontuacao: (parseInt(radoc[config.sections[3].header][subjectsLSS].CHA) / 30) * 10}
        );
    }


    for (var prod = 0; prod < radoc[config.sections[10].header].length; prod++){
        var prodScore = score[config.sections[10].header];
        var product = radoc[config.sections[10].header][prod];
        var description = product[config.sections[10].labels[0]].toLowerCase();
        if (description.indexOf("publicado em periódico") !== -1){
            if (description.toLowerCase().indexOf("não sujeito à classificação") !== -1)
                prodScore.push({secao: "2", subsecao: "1", subitem: "1.1", pontuacao: 10});
            else
                prodScore.push({secao: "2", subsecao: "1", subitem: "1.2", pontuacao: 20});

        }
        else if (description.indexOf("resumo de artigo em periódicos especializados") !== -1){
            prodScore.push({secao: "2", subsecao: "1", subitem: "2", pontuacao: 5});
        }
        else if (description.indexOf("artigos ou textos literários em repositórios de publicação eletrônica") !== -1){
            prodScore.push({secao: "2", subsecao: "1", subitem: "3", pontuacao: 5});
        }
        else if (description.indexOf("resumo expandido publicado em anais") !== -1){
            if (description.toLowerCase().indexOf("internacional") !== -1)
                prodScore.push({secao: "2", subsecao: "1", subitem: "4.1", pontuacao: 8});
            else if (description.toLowerCase().indexOf("nacional") !== -1)
                prodScore.push({secao: "2", subsecao: "1", subitem: "4.2", pontuacao: 6});
            else
                prodScore.push({secao: "2", subsecao: "1", subitem: "4.3", pontuacao: 4});

        }
        else if (description.indexOf("resumo simples publicado em anais") !== -1){
            if (description.toLowerCase().indexOf("internacional") !== -1)
                prodScore.push({secao: "2", subsecao: "1", subitem: "5.1", pontuacao: 8});
            else if (description.toLowerCase().indexOf("nacional") !== -1)
                prodScore.push({secao: "2", subsecao: "1", subitem: "5.2", pontuacao: 6});
            else
                prodScore.push({secao: "2", subsecao: "1", subitem: "5.3", pontuacao: 4});

        }
        else if (description.indexOf("trabalho completo publicado em anais de congresso cientifico") !== -1){
            prodScore.push({secao: "2", subsecao: "1", subitem: "6", pontuacao: 10});
        }
        else if (description.toLowerCase().indexOf("publicado com") !== -1){
            if (description.toLowerCase().indexOf("capítulo") !== -1){
                if (description.indexOf("traduzido") !== -1){
                    prodScore.push({secao: "2", subsecao: "1", subitem: "12", pontuacao: 5});
                }
                else{
                    prodScore.push({secao: "2", subsecao: "1", subitem: "10", pontuacao: 10});
                }
            }
            else if (description.toLowerCase().indexOf("edição") || description.toLowerCase().contains("organização de livro") !== -1){
                prodScore.push({secao: "2", subsecao: "1", subitem: "11", pontuacao: 12});
            }
            else if (description.toLowerCase().indexOf("editor") || description.toLowerCase().contains("coordenador editorial") !== -1){
                prodScore.push({secao: "2", subsecao: "1", subitem: "7", pontuacao: 20});
            }
            else if (description.indexOf("livro publicado com selo de editora que possua corpo editorial") !== -1) {
                prodScore.push({secao: "2", subsecao: "1", subitem: "8", pontuacao: 40});
            }
            else if (description.toLowerCase().indexOf("não possua corpo editorial") !== -1){
                prodScore.push({secao: "2", subsecao: "1", subitem: "9", pontuacao: 10});
            }
            else if (description.toLowerCase().indexOf("livro traduzido") !== -1){
                prodScore.push({secao: "2", subsecao: "1", subitem: "13", pontuacao: 10});
            }
        }
        else if (description.toLowerCase().indexOf("resenha") || description.toLowerCase().contains("prefácio") || description.toLowerCase().contains("verbete") !== -1){
            prodScore.push({secao: "2", subsecao: "1", subitem: "14", pontuacao: 10});
        }
        else if (description.indexOf("livro didático desenvolvido para projetos") !== -1){
            prodScore.push({secao: "2", subsecao: "1", subitem: "15", pontuacao: 10});
        }
        else if (description.indexOf("editor de periódicos especializados indexados com corpo editorial") !== -1){
            prodScore.push({secao: "2", subsecao: "1", subitem: "16", pontuacao: 20});
        }
        else if (description.indexOf("com distribuição") !== -1){
            if (description.toLowerCase().indexOf("internacional") !== -1)
                prodScore.push({secao: "2", subsecao: "1", subitem: "17.1", pontuacao: 20});
            else if (description.toLowerCase().indexOf("nacional") !== -1)
                prodScore.push({secao: "2", subsecao: "1", subitem: "17.2", pontuacao: 20});
            else
                prodScore.push({secao: "2", subsecao: "1", subitem: "17.3", pontuacao: 15});
        }
        else if (description.indexOf("dissertação de mestrado defendida de aprovada") !== -1){
            prodScore.push({secao: "2", subsecao: "1", subitem: "18", pontuacao: 10});
        }
        else if (description.indexOf("tese de doutorado defendida e aprovada") !== -1){
            prodScore.push({secao: "2", subsecao: "1", subitem: "19", pontuacao: 15});
        }
        else if (description.indexOf("apresentado em evento") !== -1){
            if (description.toLowerCase().indexOf("internacional") !== -1)
                prodScore.push({secao: "2", subsecao: "2", subitem: "1.1", pontuacao: 20});
            else if (description.toLowerCase().indexOf("nacional") !== -1)
                prodScore.push({secao: "2", subsecao: "2", subitem: "1.2", pontuacao: 15});
            else
                prodScore.push({secao: "2", subsecao: "2", subitem: "1.3", pontuacao: 10});
        }
        else if (description.indexOf("criação e produção do projeto gráfico") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "2", pontuacao: 10});
        }
        else if (description.indexOf("design (gráfico, de luz, de figurino e formas animadas, cenográfico e similares)") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "3", pontuacao: 5});
        }
        else if (description.indexOf("design de impressos por peça") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "4", pontuacao: 1});
        }
        else if (description.indexOf("design de interfaces digitais com inovação tecnológica") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "6", pontuacao: 20});
        }
        else if (description.indexOf("design de interfaces digitais") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "5", pontuacao: 10});
        }
        else if (description.indexOf("produtos com inovação tecnológica") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "7", pontuacao: 20});
        }
        else if (description.indexOf("exposições e apresentações artísticas locais ou regionais") !== -1){
            if (description.toLowerCase().indexOf("participação individual, camerista, solista ou ator principal") !== -1){
                prodScore.push({secao: "2", subsecao: "2", subitem: "8.1", pontuacao: 16});
            }
            else {
                prodScore.push({secao: "2", subsecao: "2", subitem: "8.2", pontuacao: 5});
            }
        }
        else if (description.indexOf("exposições e apresentações artísticas nacionais") !== -1){
            if (description.toLowerCase().indexOf("participação individual, camerista, solista ou ator principal") !== -1){
                prodScore.push({secao: "2", subsecao: "2", subitem: "9.1", pontuacao: 20});
            }
            else {
                prodScore.push({secao: "2", subsecao: "2", subitem: "9.2", pontuacao: 10});
            }
        }
        else if (description.indexOf("exposições e apresentações artísticas internacionais") !== -1){
            if (description.toLowerCase().indexOf("participação individual, camerista, solista ou ator principal") !== -1){
                prodScore.push({secao: "2", subsecao: "2", subitem: "10.1", pontuacao: 20});
            }
            else {
                prodScore.push({secao: "2", subsecao: "2", subitem: "10.2", pontuacao: 15});
            }
        }
        else if (description.indexOf("composições musicais") !== -1){
            if (description.toLowerCase().indexOf("editadas") !== -1)
                prodScore.push({secao: "2", subsecao: "2", subitem: "11.1", pontuacao: 20});
            else if (description.toLowerCase().indexOf("publicadas em revistas científicas") !== -1)
                prodScore.push({secao: "2", subsecao: "2", subitem: "11.2", pontuacao: 20});
            else if (description.toLowerCase().indexOf("gravadas") !== -1)
                prodScore.push({secao: "2", subsecao: "2", subitem: "11.3", pontuacao: 15});
            else if (description.toLowerCase().indexOf("executadas em apresentações públicas") !== -1)
                prodScore.push({secao: "2", subsecao: "2", subitem: "11.4", pontuacao: 15});

        }
        else if (description.indexOf("produção artística, arquitetônica ou de design premiada em evento") !== -1){
            if (description.toLowerCase().indexOf("internacional") !== -1)
                prodScore.push({secao: "2", subsecao: "2", subitem: "12.1", pontuacao: 15});
            else if (description.toLowerCase().indexOf("nacional") !== -1)
                prodScore.push({secao: "2", subsecao: "2", subitem: "12.2", pontuacao: 10});
            else
                prodScore.push({secao: "2", subsecao: "2", subitem: "12.3", pontuacao: 5});
        }
        else if (description.indexOf("arranjos musicais") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "13", pontuacao: 5});
        }
        else if (description.indexOf("apresentação artística ou cultural em rádio ou tv") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "14", pontuacao: 5});
        }
        else if (description.indexOf("sonoplastia") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "15", pontuacao: 3});
        }
        else if (description.indexOf("desenvolvimento de programa de computador") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "1", pontuacao: 20});
        }
        else if (description.indexOf("desenvolvimento de software com divulgação em periódicos") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "2", pontuacao: 10});
        }
        else if (description.indexOf("desenvolvimento de software para uso institucional") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "3", pontuacao: 5});
        }
        else if (description.indexOf("desenvolvimento e registro no inpi de topografia de circuito integrado") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "4", pontuacao: 20});
        }
        else if (description.indexOf("desenvolvimento de produto, processo ou técnica com registro de patente") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "5", pontuacao: 20});
        }
        else if (description.indexOf("desenvolvimento e registro no inpi de desenho industrial") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "6", pontuacao: 20});
        }
        else if (description.indexOf("desenvolvimento e registro no inpi de processo de indicação geográfica") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "7", pontuacao: 20});
        }
        else if (description.indexOf("desenvolvimento e registro no inpi de marcas") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "8", pontuacao: 5});
        }
        else if (description.indexOf("participação em comitê editorial de periódicos") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "9", pontuacao: 10});
        }
        else if (description.indexOf("parecer de consultoria ad hoc em comitês de avaliação") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "10", pontuacao: 3});
        }
        else if (description.indexOf("parecer de consultoria ad hoc para periódicos especializados") !== -1){
            prodScore.push({secao: "2", subsecao: "2", subitem: "11", pontuacao: 3});
        }
        else if (description.indexOf("realizado em consultoria ou assessoria officializada por convite, convênio, contrato ou designação") !== -1){
            if (description.indexOf("parecer") !== -1){
                if (description.indexOf("sem anotação") !== -1)
                    prodScore.push({secao: "2", subsecao: "3", subitem: "12.1", pontuacao: 5});
                else
                    prodScore.push({secao: "2", subsecao: "3", subitem: "12.2", pontuacao: 10});

            }
            else{
                if (description.indexOf("sem anotação") !== -1)
                    prodScore.push({secao: "2", subsecao: "3", subitem: "12.1", pontuacao: 10});
                else
                    prodScore.push({secao: "2", subsecao: "3", subitem: "12.2", pontuacao: 20});
            }
        }
        else if (description.indexOf("anais, manuais, catálogos, boletins, com ficha bibliográfica") !== -1){
            prodScore.push({secao: "2", subsecao: "3", subitem: "13", pontuacao: 5});
        }
        else if (description.indexOf("produção e publicação de mapas, cartas ou similares") !== -1){
            prodScore.push({secao: "2", subsecao: "3", subitem: "14", pontuacao: 10});
        }
        else if (description.indexOf("desenvolvimento de maquete") !== -1){
            prodScore.push({secao: "2", subsecao: "3", subitem: "15", pontuacao: 5});
        }
        else if (description.indexOf("obra artística") !== -1){
            if (description.toLowerCase().indexOf("restauração") !== -1)
                prodScore.push({secao: "2", subsecao: "3", subitem: "16.1", pontuacao: 20});
            else
                prodScore.push({secao: "2", subsecao: "3", subitem: "16.2", pontuacao: 10});
        }
        else if (description.indexOf("curadoria de exposições") !== -1){
            prodScore.push({secao: "2", subsecao: "3", subitem: "17", pontuacao: 5});
        }
        else if (description.indexOf("produção de cinema,") !== -1){
            if (description.toLowerCase().indexOf("editor") !== -1)
                prodScore.push({secao: "2", subsecao: "3", subitem: "18.1", pontuacao: 20});
            else
                prodScore.push({secao: "2", subsecao: "3", subitem: "18.2", pontuacao: 3});
        }
        else if (description.indexOf("artigos de opinião veiculados em jornais e revistas") !== -1){
            prodScore.push({secao: "2", subsecao: "4", subitem: "1", pontuacao: 1});
        }
        else if (description.indexOf("texto ou material didático para uso institucional") !== -1){
            prodScore.push({secao: "2", subsecao: "4", subitem: "2", pontuacao: 2});
        }
        else if (description.indexOf("artigos de divulgação científica, tecnológica e artística veiculados em jornais") !== -1){
            prodScore.push({secao: "2", subsecao: "4", subitem: "3", pontuacao: 3});
        }
        else if (description.indexOf("apresentação oral de trabalho publicado em anais de congresso científico") !== -1){
            prodScore.push({secao: "2", subsecao: "4", subitem: "4", pontuacao: 3});
        }
        else if (description.indexOf("apresentação em painel de trabalho publicado em anais de congresso") !== -1){
            prodScore.push({secao: "2", subsecao: "4", subitem: "5", pontuacao: 1});
        }
        else if (description.indexOf("trabalho premiado em evento científico nacional ou internacional") !== -1){
            prodScore.push({secao: "2", subsecao: "4", subitem: "6", pontuacao: 5});
        }
        else if (description.indexOf("tese, dissertação e trabalho de iniciação científica premiados por instituições") !== -1){
            prodScore.push({secao: "2", subsecao: "4", subitem: "7", pontuacao: 8});
        }
        else{
            prodScore.push({modificacaoSoftware: "atividade não encontrada na resolução", secao: "", subsecao: "", subitem: "", pontuacao: 0});
        }
    }

    for (var research = 0; research < radoc[config.sections[5].header].length; research++){
        var researchScore = score[config.sections[5].header];
        var resTable = radoc[config.sections[5].header][research][config.sections[5].labels[1]].toLowerCase();
        if (resTable.indexOf("coordenador de projeto conjuntos de pesquisa e cooperação científica") !== -1){
            researchScore.push({secao: "3", subsecao: "1", subitem: "1", pontuacao: 10});
        }
        else if (resTable.indexOf("coordenador de projeto de pesquisa aprovado com comprovação de financiamento") !== -1){
            researchScore.push({secao: "3", subsecao: "1", subitem: "2", pontuacao: 10});
        }
        else if (resTable.indexOf("coordenador de projeto de pesquisa aprovado sem financiamento") !== -1){
            researchScore.push({secao: "3", subsecao: "1", subitem: "3", pontuacao: 5});
        }
        else if (resTable.indexOf("coordenador de projeto de extensão aprovado com comprovação") !== -1){
            researchScore.push({secao: "3", subsecao: "2", subitem: "1", pontuacao: 10});
        }
        else if (resTable.indexOf("coordenador de projeto ou programa de extensão/cultura cadastrado") !== -1){
            researchScore.push({secao: "3", subsecao: "2", subitem: "2", pontuacao: 5});
        }
        else if (resTable.indexOf("coordenador de contratos e de convênios de cooperação institucional internacional") !== -1){
            researchScore.push({secao: "3", subsecao: "2", subitem: "3", pontuacao: 5});
        }
        else if (resTable.indexOf("coordenador de contratos e de convênios de cooperação institucional nacional") !== -1){
            researchScore.push({secao: "3", subsecao: "2", subitem: "4", pontuacao: 3});
        }
        else if (resTable.indexOf("participante de projeto de extensão/cultura cadastrado na proec") !== -1){
            researchScore.push({secao: "3", subsecao: "2", subitem: "5", pontuacao: 3});
        }
        else if (resTable.indexOf("curso de extensão ministrado com 20 ou mais horas") !== -1){
            researchScore.push({secao: "3", subsecao: "2", subitem: "6", pontuacao: 5});
        }
        else if (resTable.indexOf("curso de extensão ministrado com 20 ou mais horas") !== -1){
            researchScore.push({secao: "3", subsecao: "2", subitem: "7", pontuacao: 2});
        }
        else if (resTable.indexOf("palestrante, conferencista ou participante em mesa redonda em evento científico, cultural ou artístico") !== -1){
            if (resTable.toLowerCase().indexOf("evento internacional") !== -1)
                researchScore.push({secao: "3", subsecao: "2", subitem: "8.1", pontuacao: 5});
            else if (resTable.toLowerCase().indexOf("evento nacional") !== -1)
                researchScore.push({secao: "3", subsecao: "2", subitem: "8.2", pontuacao: 4});
            else if (resTable.toLowerCase().indexOf("evento regional ou local") !== -1)
                researchScore.push({secao: "3", subsecao: "2", subitem: "8.3", pontuacao: 3});
        }
        else if (resTable.indexOf("promoção ou produção de eventos artísticos e científicos locais") !== -1){
            if (resTable.toLowerCase().indexOf("presidente") !== -1)
                researchScore.push({secao: "3", subsecao: "2", subitem: "9.1", pontuacao: 4});
            else if (resTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                researchScore.push({secao: "3", subsecao: "2", subitem: "9.2", pontuacao: 2});
        }
        else if (resTable.indexOf("promoção ou produção de eventos artísticos e científicos regionais") !== -1){
            if (resTable.toLowerCase().indexOf("presidente") !== -1)
                researchScore.push({secao: "3", subsecao: "2", subitem: "10.1", pontuacao: 6});
            else if (resTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                researchScore.push({secao: "3", subsecao: "2", subitem: "10.2", pontuacao: 3});
        }
        else if (resTable.indexOf("promoção ou produção de eventos artísticos e científicos nacionais") !== -1){
            if (resTable.toLowerCase().indexOf("presidente") !== -1)
                researchScore.push({secao: "3", subsecao: "2", subitem: "11.1", pontuacao: 8});
            else if (resTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                researchScore.push({secao: "3", subsecao: "2", subitem: "11.2", pontuacao: 4});
        }
        else if (resTable.indexOf("promoção ou produção de eventos artísticos e científicos internacionais") !== -1){
            if (resTable.toLowerCase().indexOf("presidente") !== -1)
                researchScore.push({secao: "3", subsecao: "2", subitem: "12.1", pontuacao: 10});
            else if (resTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                researchScore.push({secao: "3", subsecao: "2", subitem: "12.2", pontuacao: 5});
        }
        else{
            researchScore.push({modificacaoSoftware: "atividade não encontrada na resolução", secao: "", subsecao: "", subitem: "", pontuacao: 0});
        }
    }

    for (var ext = 0; ext < radoc[config.sections[6].header].length; ext++){
        var extScore = score[config.sections[6].header];
        var extTable = radoc[config.sections[6].header][ext][config.sections[6].labels[0]].toLowerCase();
        if (extTable.indexOf("coordenador de projeto de extensão aprovado com comprovação") !== -1){
            extScore.push({secao: "3", subsecao: "2", subitem: "1", pontuacao: 10});
        }
        else if (extTable.indexOf("coordenador de projeto ou programa de extensão/cultura cadastrado") !== -1){
            extScore.push({secao: "3", subsecao: "2", subitem: "2", pontuacao: 5});
        }
        else if (extTable.indexOf("coordenador de contratos e de convênios de cooperação institucional internacional") !== -1){
            extScore.push({secao: "3", subsecao: "2", subitem: "3", pontuacao: 5});
        }
        else if (extTable.indexOf("coordenador de contratos e de convênios de cooperação institucional nacional") !== -1){
            extScore.push({secao: "3", subsecao: "2", subitem: "4", pontuacao: 3});
        }
        else if (extTable.indexOf("participante de projeto de extensão/cultura cadastrado na proec") !== -1){
            extScore.push({secao: "3", subsecao: "2", subitem: "5", pontuacao: 3});
        }
        else if (extTable.indexOf("curso de extensão ministrado com 20 ou mais horas") !== -1){
            extScore.push({secao: "3", subsecao: "2", subitem: "6", pontuacao: 5});
        }
        else if (extTable.indexOf("curso de extensão ministrado com 20 ou mais horas") !== -1){
            extScore.push({secao: "3", subsecao: "2", subitem: "7", pontuacao: 2});
        }
        else if (extTable.indexOf("palestrante, conferencista ou participante em mesa redonda em evento científico, cultural ou artístico") !== -1){
            if (extTable.toLowerCase().indexOf("evento internacional") !== -1)
                extScore.push({secao: "3", subsecao: "2", subitem: "8.1", pontuacao: 5});
            else if (extTable.toLowerCase().indexOf("evento nacional") !== -1)
                extScore.push({secao: "3", subsecao: "2", subitem: "8.2", pontuacao: 4});
            else if (extTable.toLowerCase().indexOf("evento regional ou local") !== -1)
                extScore.push({secao: "3", subsecao: "2", subitem: "8.3", pontuacao: 3});
        }
        else if (extTable.indexOf("promoção ou produção de eventos artísticos e científicos locais") !== -1){
            if (extTable.toLowerCase().indexOf("presidente") !== -1)
                extScore.push({secao: "3", subsecao: "2", subitem: "9.1", pontuacao: 4});
            else if (extTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                extScore.push({secao: "3", subsecao: "2", subitem: "9.2", pontuacao: 2});
        }
        else if (extTable.indexOf("promoção ou produção de eventos artísticos e científicos regionais") !== -1){
            if (extTable.toLowerCase().indexOf("presidente") !== -1)
                extScore.push({secao: "3", subsecao: "2", subitem: "10.1", pontuacao: 6});
            else if (extTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                extScore.push({secao: "3", subsecao: "2", subitem: "10.2", pontuacao: 3});
        }
        else if (extTable.indexOf("promoção ou produção de eventos artísticos e científicos nacionais") !== -1){
            if (extTable.toLowerCase().indexOf("presidente") !== -1)
                extScore.push({secao: "3", subsecao: "2", subitem: "11.1", pontuacao: 8});
            else if (extTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                extScore.push({secao: "3", subsecao: "2", subitem: "11.2", pontuacao: 4});
        }
        else if (extTable.indexOf("promoção ou produção de eventos artísticos e científicos internacionais") !== -1){
            if (extTable.toLowerCase().indexOf("presidente") !== -1)
                extScore.push({secao: "3", subsecao: "2", subitem: "12.1", pontuacao: 10});
            else if (extTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                extScore.push({secao: "3", subsecao: "2", subitem: "12.2", pontuacao: 5});
        }
        else{
            extScore.push({modificacaoSoftware: "atividade não encontrada na resolução", secao: "", subsecao: "", subitem: "", pontuacao: 0});
        }
    }

    for (var adm = 0; adm < radoc[config.sections[9].header].length; adm++){
        var admScore = score[config.sections[9].header];
        var admTable = radoc[config.sections[9].header][adm][config.sections[9].labels[0]].toLowerCase();
        if (admTable.indexOf("reitor ou vice-reitor ou pró-reitor") !== -1){
            admScore.push({secao: "4", subsecao: "1", subitem: "1", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 14});
        }
        else if (admTable.indexOf("chefe de gabinete") !== -1){
                admScore.push({secao: "4", subsecao: "1", subitem: "2", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 10});
        }
        else if (admTable.indexOf("coordenador ou assessor vinculado à reitoria") !== -1){
            admScore.push({secao: "4", subsecao: "1", subitem: "3", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 10});
        }
        else if (admTable.indexOf("diretor de unidade acadêmica, de unidade acadêmica especial") !== -1){
            admScore.push({secao: "4", subsecao: "1", subitem: "4", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 10});
        }
        else if (admTable.indexOf("diretor de campus do interior") !== -1){
            admScore.push({secao: "4", subsecao: "1", subitem: "5", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 12});
        }
        else if (admTable.indexOf("vice-diretor de campus do interior") !== -1){
            admScore.push({secao: "4", subsecao: "1", subitem: "6", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 12});
        }
        else if (admTable.indexOf("diretor geral do hospital das clínicas") !== -1){
            admScore.push({secao: "4", subsecao: "1", subitem: "7", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 10});
        }
        else if (admTable.indexOf("coordenador ou assessor vinculado às pró-reitorias ou à direção dos campus") !== -1){
            admScore.push({secao: "4", subsecao: "1", subitem: "8", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 8});
        }
        else if (admTable.indexOf("coordenador de programa de pós-graduação stricto sensu") !== -1){
            admScore.push({secao: "4", subsecao: "1", subitem: "9", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 8});
        }
        else if (admTable.indexOf("coordenador de curso de ensino básico ou de graduação") !== -1){
            admScore.push({secao: "4", subsecao: "1", subitem: "10", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 8});
        }
        else if (admTable.indexOf("vice-diretor de unidade acadêmica ou unidade acadêmica especial") !== -1){
            admScore.push({secao: "4", subsecao: "1", subitem: "11", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 8});
        }
        else if (admTable.indexOf("diretor do hospital veterinário") !== -1){
            admScore.push({secao: "4", subsecao: "1", subitem: "12", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 8});
        }
        else if (admTable.indexOf("diretor de órgão da administração") !== -1){
            admScore.push({secao: "4", subsecao: "1", subitem: "13", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 8});
        }
        else if (admTable.indexOf("coordenador de projeto institucional com financiamento ou de contratos") !== -1){
            admScore.push({secao: "4", subsecao: "2", subitem: "1", pontuacao: 5});
        }
        else if (admTable.indexOf("coordenador de curso de especialização, residência médica ou residência") !== -1){
            admScore.push({secao: "4", subsecao: "2", subitem: "2", pontuacao: 10});
        }
        else if (admTable.indexOf("membro representante de classe da carreira docente no consuni") !== -1){
            admScore.push({secao: "4", subsecao: "2", subitem: "3", pontuacao: 10});
        }
        else if (admTable.indexOf("membro do conselho de curadores ou do plenário do cepec ou de conselho") !== -1){
            admScore.push({secao: "4", subsecao: "2", subitem: "4", pontuacao: 10});
        }
        else if (admTable.indexOf("atividades acadêmicas e administrativas designadas por portaria do reitor") !== -1){
            maxScore = 10;
            cha = parseInt(radoc[config.sections[9].header][adm]["cha:"]);
            if (cha < 150)
                maxScore = maxScore * (cha / 150);
            admScore.push({secao: "4", subsecao: "2", subitem: "5", pontuacao: maxScore});
        }
        else if (admTable.indexOf("presidente da cppd") !== -1){
            admScore.push({secao: "4", subsecao: "3", subitem: "1", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 7});
        }
        else if (admTable.indexOf("presidente da comissão de avaliação institucional ou da comissão própria") !== -1){
            admScore.push({secao: "4", subsecao: "3", subitem: "2", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 5});
        }
        else if (admTable.indexOf("membros da coordenação permanente do centro de seleção") !== -1){
            admScore.push({secao: "4", subsecao: "3", subitem: "3", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 5});
        }
        else if (admTable.indexOf("diretores do hc") !== -1){
            admScore.push({secao: "4", subsecao: "3", subitem: "4", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 5});
        }
        else if (admTable.indexOf("presidente do comitê de ética em pesquisa da ufg e do hc/ufg") !== -1){
            admScore.push({secao: "4", subsecao: "3", subitem: "5", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 5});
        }
        else if (admTable.indexOf("membros da cppd ou da comissão de avaliação institucional") !== -1){
            admScore.push({secao: "4", subsecao: "3", subitem: "6", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 5});
        }
        else if (admTable.indexOf("coordenador de pesquisa ou de ensino ou de extensão") !== -1){
            admScore.push({secao: "4", subsecao: "3", subitem: "7", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("chefe de departamento") !== -1){
            admScore.push({secao: "4", subsecao: "3", subitem: "8", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("chefe do pronto socorro ou da maternidade ou do cerof") !== -1){
            admScore.push({secao: "4", subsecao: "3", subitem: "9", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("coordenador das atividades de interação com a sociedade") !== -1){
            admScore.push({secao: "4", subsecao: "3", subitem: "10", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("coordenador das atividades de pesquisa e de pós–graduação lato sensu") !== -1){
            admScore.push({secao: "4", subsecao: "3", subitem: "11", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("membros do comitê de ética da ufg e do hc/ufg") !== -1){
            admScore.push({secao: "4", subsecao: "3", subitem: "12", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("membros do comitê interno e externo do pibic") !== -1){
            admScore.push({secao: "4", subsecao: "3", subitem: "13", pontuacao: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("representante titular em conselho de classe profissional") !== -1){
            maxScore = 10;
            cha = parseInt(radoc[config.sections[9].header][adm]["cha:"]);
            if (cha < 150)
                maxScore = maxScore * (cha / 150);
            admScore.push({secao: "4", subsecao: "4", subitem: "1", pontuacao: maxScore});
        }
        else if (admTable.indexOf("representante titular em conselho de classe profissional") !== -1){
            admScore.push({secao: "4", subsecao: "4", subitem: "2", pontuacao: 10});
        }
        else if (admTable.indexOf("diretor do sindicato de docentes da ufg") !== -1){
            admScore.push({secao: "4", subsecao: "4", subitem: "3", pontuacao: 3});
        }
        else if (admTable.indexOf("representante sindical com carga horária igual ou superior a 150 horas") !== -1){
            maxScore = 10;
            cha = parseInt(radoc[config.sections[9].header][adm]["cha:"]);
            if (cha < 150)
                maxScore = maxScore * (cha / 150);
            admScore.push({secao: "4", subsecao: "4", subitem: "4", pontuacao: maxScore});
        }
        else if (admTable.indexOf("representante em entidade científica, artística e cultural") !== -1){
            maxScore = 10;
            cha = parseInt(radoc[config.sections[9].header][adm]["cha:"]);
            if (cha < 150)
                maxScore = maxScore * (cha / 150);
            admScore.push({secao: "4", subsecao: "4", subitem: "5", pontuacao: maxScore});
        }
        else if (admTable.indexOf("representante em comissão de órgão governamental") !== -1){
            maxScore = 10;
            cha = parseInt(radoc[config.sections[9].header][adm]["cha:"]);
            if (cha < 150)
                maxScore = maxScore * (cha / 150);
            admScore.push({secao: "4", subsecao: "4", subitem: "6", pontuacao: maxScore});
        }
        else{
            admScore.push({modificacaoSoftware: "atividade não encontrada na resolução", secao: "", subsecao: "", subitem: "", pontuacao: 0});
        }
    }

    for (var orientation = 0; orientation < radoc[config.sections[4].header].length; orientation++){
        var oriScore = score[config.sections[4].header];
        var oriTable = radoc[config.sections[4].header][orientation][config.sections[4].labels[1]].toLowerCase();
        if (oriTable.indexOf("aluno orientado em tese de doutorado defendida e aprovada") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "1", pontuacao: 20});
        }
        else if (oriTable.indexOf("aluno co-orientado em tese de doutorado defendida e aprovada") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "2", pontuacao: 7});
        }
        else if (oriTable.indexOf("aluno orientado em tese de doutorado em andamento") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "3", pontuacao: 10});
        }
        else if (oriTable.indexOf("aluno co-orientado em tese de doutorado em andamento") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "4", pontuacao: 4});
        }
        else if (oriTable.indexOf("aluno orientado em dissertação de mestrado defendida e aprovada") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "5", pontuacao: 15});
        }
        else if (oriTable.indexOf("aluno co-orientado em dissertação de mestrado defendida e aprovada") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "6", pontuacao: 5});
        }
        else if (oriTable.indexOf("aluno orientado em dissertação de mestrado em andamento") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "7", pontuacao: 8});
        }
        else if (oriTable.indexOf("aluno co-orientado em dissertação de mestrado em andamento") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "8", pontuacao: 3});
        }
        else if (oriTable.indexOf("aluno orientado em monografia de especialização aprovada") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "9", pontuacao: 8});
        }
        else if (oriTable.indexOf("aluno orientado em monografia de especialização em andamento") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "10", pontuacao: 4});
        }
        else if (oriTable.indexOf("aluno orientado em residência médica ou em residência multiprofissional em saúde") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "11", pontuacao: 5});
        }
        else if (oriTable.indexOf("aluno orientado em estágio supervisionado") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "12", pontuacao: 3});
        }
        else if (oriTable.indexOf("aluno orientado em projeto de final de curso") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "13", pontuacao: 3});
        }
        else if (oriTable.indexOf("aluno de outra ife orientado em tese de doutorado defendida e aprovada") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "14", pontuacao: 6});
        }
        else if (oriTable.indexOf("aluno de outra ife co-orientado em tese de doutorado defendida e aprovada") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "15", pontuacao: 3});
        }
        else if (oriTable.indexOf("aluno de outra ife orientado em tese de doutorado em andamento") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "16", pontuacao: 3});
        }
        else if (oriTable.indexOf("aluno de outra ife co-orientado em tese de doutorado em andamento") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "17", pontuacao: 2});
        }
        else if (oriTable.indexOf("aluno de outra ife orientado em dissertação de mestrado defendida e aprovada") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "18", pontuacao: 4});
        }
        else if (oriTable.indexOf("aluno de outra ife co-orientado em dissertação de mestrado defendida e aprovada") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "19", pontuacao: 2});
        }
        else if (oriTable.indexOf("aluno de outra ife orientado em dissertação de mestrado em andamento") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "20", pontuacao: 2});
        }
        else if (oriTable.indexOf("aluno de outra ife co-orientado em dissertação de mestrado em andamento") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "21", pontuacao: 1});
        }
        else if (oriTable.indexOf("aluno orientado em programa de iniciação científica") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "22", pontuacao: 6});
        }
        else if (oriTable.indexOf("aluno orientado em programa de iniciação científica júnior") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "23", pontuacao: 5});
        }
        else if (oriTable.indexOf("aluno orientado em programa especial de treinamento") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "24", pontuacao: 5});
        }
        else if (oriTable.indexOf("aluno orientado com bolsa de dti, pibit, at, jovens talentos e similares") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "25", pontuacao: 5});
        }
        else if (oriTable.indexOf("aluno orientado com bolsa de licenciatura") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "26", pontuacao: 5});
        }
        else if (oriTable.indexOf("aluno orientado com bolsa extensão/cultura/ensino") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "27", pontuacao: 5});
        }
        else if (oriTable.indexOf("aluno orientado em projetos de extensão/cultura/ensino sem bolsa") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "28", pontuacao: 3});
        }
        else if (oriTable.indexOf("aluno orientado com bolsa procom ou similar") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "29", pontuacao: 5});
        }
        else if (oriTable.indexOf("aluno orientado em programa de monitoria") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "30", pontuacao: 3});
        }
        else if (oriTable.indexOf("aluno orientado em atividade não curricular com bolsa") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "31", pontuacao: 2});
        }
        else if (oriTable.indexOf("aluno orientado em atividade não curricular sem bolsa") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "32", pontuacao: 1});
        }
        else if (oriTable.indexOf("pesquisador supervisionado em estágio de pós-doutoramento") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "33", pontuacao: 8});
        }
        else if (oriTable.indexOf("aluno orientado em prática como componente curricular") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "34", pontuacao: 1});
        }
        else if (oriTable.indexOf("aluno com deficiência, transtornos globais do desenvolvimento") !== -1){
            oriScore.push({secao: "5", subsecao: "1", subitem: "35", pontuacao: 20});
        }
        else{
            oriScore.push({modificacaoSoftware: "atividade não encontrada na resolução", secao: "", subsecao: "", subitem: "", pontuacao: 0});
        }
    }

    for (var academic = 0; academic < radoc[config.sections[8].header].length; academic++){
        var acdScore = score[config.sections[8].header];
        var acdTable = radoc[config.sections[8].header][academic][config.sections[8].labels[0]].toLowerCase();
        if (acdTable.indexOf("membro de banca de concurso para docente efetivo") !== -1){
            if (acdTable.toLowerCase().indexOf("na instituição") !== -1)
                acdScore.push({secao: "5", subsecao: "2", subitem: "1.1", pontuacao: 4});
            else if (acdTable.toLowerCase().indexOf("em outra instituição") !== -1)
                acdScore.push({secao: "5", subsecao: "2", subitem: "1.2", pontuacao: 6});
        }
        else if (acdTable.indexOf("membro de banca de concurso para docente substituto") !== -1){
            acdScore.push({secao: "5", subsecao: "2", subitem: "2", pontuacao: 2});
        }
        else if (acdTable.indexOf("membro de banca de defesa de dissertação de mestrado") !== -1){
            if (acdTable.toLowerCase().indexOf("na instituição") !== -1)
                acdScore.push({secao: "5", subsecao: "2", subitem: "3.1", pontuacao: 4});
            else if (acdTable.toLowerCase().indexOf("em outra instituição") !== -1)
                acdScore.push({secao: "5", subsecao: "2", subitem: "3.2", pontuacao: 6});
        }
        else if (acdTable.indexOf("membro de banca de defesa de tese de doutorado") !== -1){
            if (acdTable.toLowerCase().indexOf("na instituição") !== -1)
                acdScore.push({secao: "5", subsecao: "2", subitem: "4.1", pontuacao: 6});
            else if (acdTable.toLowerCase().indexOf("em outra instituição") !== -1)
                acdScore.push({secao: "5", subsecao: "2", subitem: "4.2", pontuacao: 8});
        }
        else if (acdTable.indexOf("membro de banca de qualificação de mestrado") !== -1){
            if (acdTable.toLowerCase().indexOf("na instituição") !== -1)
                acdScore.push({secao: "5", subsecao: "2", subitem: "5.1", pontuacao: 3});
            else if (acdTable.toLowerCase().indexOf("em outra instituição") !== -1)
                acdScore.push({secao: "5", subsecao: "2", subitem: "5.2", pontuacao: 4});
        }
        else if (acdTable.indexOf("membro de banca de qualificação de doutorado") !== -1){
            if (acdTable.toLowerCase().indexOf("na instituição") !== -1)
                acdScore.push({secao: "5", subsecao: "2", subitem: "6.1", pontuacao: 5});
            else if (acdTable.toLowerCase().indexOf("em outra instituição") !== -1)
                acdScore.push({secao: "5", subsecao: "2", subitem: "6.2", pontuacao: 6});
        }
        else if (acdTable.indexOf("membro de banca de defesa de monografia, projeto final de curso e outros tipos") !== -1){
            acdScore.push({secao: "5", subsecao: "2", subitem: "7", pontuacao: 2});
        }
        else if (acdTable.indexOf("membro de corpo de júri") !== -1){
            if (acdTable.toLowerCase().indexOf("na instituição") !== -1)
                acdScore.push({secao: "5", subsecao: "2", subitem: "8.1", pontuacao: 8});
            else
                acdScore.push({secao: "5", subsecao: "2", subitem: "8.2", pontuacao: 6});
        }
        else if (acdTable.indexOf("cursos, palestras ou treinamento não curricular ministrados para docentes") !== -1){
            acdScore.push({secao: "5", subsecao: "2", subitem: "9", pontuacao: 2});
        }
        else if (acdTable.indexOf("coordenador de projeto institucional de intercâmbio internacional") !== -1){
            acdScore.push({secao: "5", subsecao: "2", subitem: "10", pontuacao: 10});
        }
        else{
            acdScore.push({modificacaoSoftware: "atividade não encontrada na resolução", secao: "", subsecao: "", subitem: "", pontuacao: 0});
        }
    }

    for (var qualification = 0; qualification < radoc[config.sections[7].header].length; qualification++){
        var quaScore = score[config.sections[7].header];
        var quaTable = radoc[config.sections[7].header][qualification][config.sections[7].labels[0]].toLowerCase();
        if (quaTable.indexOf("docente regularmente matriculado em curso de doutorado com relatórios") !== -1){
            quaScore.push({secao: "5", subsecao: "3", subitem: "1", pontuacao: 12});
        }
        else if (quaTable.indexOf("estágio pós-doutoral ou estágio sênior") !== -1){
            quaScore.push({secao: "5", subsecao: "3", subitem: "2", pontuacao: getMonths(radoc[config.sections[7].header][qualification]) * 12});
        }
        else if (quaTable.indexOf("docente em licença para capacitação") !== -1){
            quaScore.push({secao: "5", subsecao: "3", subitem: "3", pontuacao: getMonths(radoc[config.sections[7].header][qualification]) * 12});
        }
        else if (quaTable.indexOf("curso de aperfeiçoamento realizado com carga horária superior a 40 horas") !== -1){
            quaScore.push({secao: "5", subsecao: "3", subitem: "4", pontuacao: 3});
        }
        else if (quaTable.indexOf("curso de aperfeiçoamento realizado com carga horária inferior a 40 horas") !== -1){
            quaScore.push({secao: "5", subsecao: "3", subitem: "5", pontuacao: 1});
        }
        else if (quaTable.indexOf("participação em congressos, seminários, encontros, jornadas") !== -1){
            quaScore.push({secao: "5", subsecao: "3", subitem: "6", pontuacao: 1});
        }
        else{
            quaScore.push({modificacaoSoftware: "atividade não encontrada na resolução", secao: "", subsecao: "", subitem: "", pontuacao: 0});
        }
    }

    /*
        Trecho de podas
        maxScores são os objects com os limites de pontuação de cada pontuação
        de cada item de cada sessão
        scoreByYear são os objects com limites de 1 item por ano
    */

    maxScores = {
        "1-3": {score: 0, maxScore: 10},
        "1-4": {score: 0, maxScore: 10},
        "1-5": {score: 0, maxScore: 10},
        "1-10": {score: 0, maxScore: 40},
        "1-12": {score: 0, maxScore: 20},
        "2-4": {score: 0, maxScore: 20},
        "3-3": {score: 0, maxScore: 10},
        "3-18": {score: 0, maxScore: 9},
        "4-4": {score: 0, maxScore: 9},
        "4-5": {score: 0, maxScore: 3}
    };

    scoreByYear = {
        "3-9": false,
        "3-16.2": false,
        "3-18.1": false
    };

    for (var prodScores = 0; prodScores < score[config.sections[10].header].length; prodScores++){

        scoreObj = score[config.sections[10].header][prodScores];

        if (maxScores[scoreObj.subsecao + "-" + scoreObj.subitem]){
            if (maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].score === maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].maxScore){
                scoreObj.pontuacao = 0;
            }
            else{
                maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].score += scoreObj.pontuacao;
            }
        }

        // if (scoreByYear[scoreObj.subsecao + "-" + scoreObj.subitem] !== undefined){
        //     if (scoreByYear[scoreObj.subsecao + "-" + scoreObj.subitem])
        //         scoreObj.pontuacao = 0;
        //     else
        //         scoreByYear[scoreObj.subsecao + "-" + scoreObj.subitem] = true;
        // }

    }

    maxScores = {
        "1-3": {score: 0, maxScore: 10},
        "2-2": {score: 0, maxScore: 15},
        "2-6": {score: 0, maxScore: 15},
        "2-7": {score: 0, maxScore: 10},
        "2-8.1": {score: 0, maxScore: 15},
        "2-8.2": {score: 0, maxScore: 12},
        "2-8.3": {score: 0, maxScore: 9}
    };

    scoreByYear = {
        "1-1": false,
        "1-2": false,
        "1-3": false,
        "2-1": false,
        "2-2": false,
        "2-3": false,
        "2-4": false,
        "2-5": false
    };

    for (var extScores = 0; extScores < score[config.sections[5].header].length + score[config.sections[6].header].length; extScores++){
        if (extScores >= score[config.sections[5].header].length)
            scoreObj = score[config.sections[6].header][extScores % score[config.sections[6].header].length];
        else
            scoreObj = score[config.sections[5].header][extScores];

        if (maxScores[scoreObj.subsecao + "-" + scoreObj.subitem]){
            if (maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].score === maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].maxScore){
                scoreObj.pontuacao = 0;
            }
            else{
                maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].score += scoreObj.pontuacao;
            }
        }

        // if (scoreByYear[scoreObj.subsecao + "-" + scoreObj.subitem] !== undefined){
        //     if (scoreByYear[scoreObj.subsecao + "-" + scoreObj.subitem])
        //         scoreObj.pontuacao = 0;
        //     else
        //         scoreByYear[scoreObj.subsecao + "-" + scoreObj.subitem] = true;
        // }
    }

    maxScores = {
        "2-2": {score: 0, maxScore: 10}
    };

    scoreByYear = {
        "2-1": false,
        "4-1": false,
        "4-4": false,
        "4-5": false,
        "4-6": false
    };

    for (var admScores = 0; admScores < score[config.sections[9].header].length; admScores++){

        scoreObj = score[config.sections[9].header][admScores];

        if (maxScores[scoreObj.subsecao + "-" + scoreObj.subitem]){
            if (maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].score === maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].maxScore){
                scoreObj.pontuacao = 0;
            }
            else{
                maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].score += scoreObj.pontuacao;
            }
        }

        // if (scoreByYear[scoreObj.subsecao + "-" + scoreObj.subitem] !== undefined){
        //     if (scoreByYear[scoreObj.subsecao + "-" + scoreObj.subitem])
        //         scoreObj.pontuacao = 0;
        //     else
        //         scoreByYear[scoreObj.subsecao + "-" + scoreObj.subitem] = true;
        // }
    }

    maxScores = {
        "1-10": {score: 0, maxScore: 12},
        "1-35": {score: 0, maxScore: 40}
    };

    for (var oriScores = 0; oriScores < score[config.sections[4].header].length; oriScores++){

        scoreObj = score[config.sections[4].header][oriScores];

        if (maxScores[scoreObj.subsecao + "-" + scoreObj.subitem]){
            if (maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].score === maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].maxScore){
                scoreObj.pontuacao = 0;
            }
            else{
                maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].score += scoreObj.pontuacao;
            }
        }
    }

    maxScores = {
        "2-7": {score: 0, maxScore: 10}
    };

    scoreByYear = {
        "1-10": false
    };

    for (var acdScores = 0; acdScores < score[config.sections[8].header].length; acdScores++){

        scoreObj = score[config.sections[8].header][acdScores];

        if (maxScores[scoreObj.subsecao + "-" + scoreObj.subitem]){
            if (maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].score === maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].maxScore){
                scoreObj.pontuacao = 0;
            }
            else{
                maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].score += scoreObj.pontuacao;
            }
        }

        // if (scoreByYear[scoreObj.subsecao + "-" + scoreObj.subitem] !== undefined){
        //     if (scoreByYear[scoreObj.subsecao + "-" + scoreObj.subitem])
        //         scoreObj.pontuacao = 0;
        //     else
        //         scoreByYear[scoreObj.subsecao + "-" + scoreObj.subitem] = true;
        // }
    }

    maxScores = {
        "1-6": {score: 0, maxScore: 3}
    };

    for (var quaScores = 0; quaScores < score[config.sections[7].header].length; quaScores++){

        scoreObj = score[config.sections[8].header][quaScores];

        if (maxScores[scoreObj.subsecao + "-" + scoreObj.subitem]){
            if (maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].score === maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].maxScore){
                scoreObj.pontuacao = 0;
            }
            else{
                maxScores[scoreObj.subsecao + "-" + scoreObj.subitem].score += scoreObj.pontuacao;
            }
        }
    }

    return score;

};
