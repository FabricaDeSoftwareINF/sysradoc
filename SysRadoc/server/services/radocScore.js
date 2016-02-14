var config = require('./radocParseConfig');

/*
    /!\ ATENÇÃO /!\
    Este arquivo usa referências diretas a ordem das sessões no arquivo radocParseConfig.js.
    Caso houver qualquer alteração no arquivo, seja na ordem das sessões ou mesmo na ordem das labels,
    este arquivo deve ser refatorado para manter seu funcionamento. |TODAS| as referências
    estão listadas abaixo:

    config.sections[2].header = "RGCG - Regime de Graduação Semestral"
    config.sections[3].header = "Pós-Graduação Lato Sensu/Sctricto Sensu (RDC)"
    config.sections[10].header = "Produtos"
    config.sections[10].labels[0] = "Descrição do produto:"
    config.sections[5].header = "Atividades em projetos"
    config.sections[5].labels[1] = "Tabela:"
    config.sections[6].header = "Atividades de extensão"
    config.sections[6].labels[0] = "Tabela:"
    config.sections[9].header = "Atividades administrativas"
    config.sections[9].labels[0] = "Tabela:"
    config.sections[4].header = "Atividades de orientação"
    config.sections[4].labels[1] = "Tabela:"
    config.sections[8].header = "Atividades acadêmicas especiais"
    config.sections[8].labels[0] = "Tabela:"
    config.sections[7].header = "Atividades de qualificação"
    config.sections[7].labels[0] = "Tabela:"

    Este arquivo é dividido em duas sessões:
    -Somas
    -Podas

    O trecho de somas constitui o calculo de cada item do radoc
    O trecho de podas constitui a limitação por quantidade máxima de pontos ou por ano
    de uma atividade

*/

var getMonths = function(data){
    var init = data["Data início:"];
    var ending = data["Data término:"];
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
            {section: "1", subsection: "1", subitem: "", score: (parseInt(radoc[config.sections[2].header][subjectsGrad].CHA) / 32) * 10}
        );
    }

    for (var subjectsLSS = 0; subjectsLSS < radoc[config.sections[3].header].length; subjectsLSS++){
        score[config.sections[3].header].push(
            {section: "1", subsection: "2", subitem: "", score: (parseInt(radoc[config.sections[3].header][subjectsLSS].CHA) / 30) * 10}
        );
    }


    for (var prod = 0; prod < radoc[config.sections[10].header].length; prod++){
        var prodScore = score[config.sections[10].header];
        var product = radoc[config.sections[10].header][prod];
        var description = product[config.sections[10].labels[0]];
        if (description.indexOf("publicado em periódico") !== -1){
            if (description.toLowerCase().indexOf("não sujeito à classificação") !== -1)
                prodScore.push({section: "2", subsection: "1", subitem: "1", score: 10});
            else
                prodScore.push({section: "2", subsection: "1", subitem: "1", score: 20});

        }
        else if (description.indexOf("Resumo de artigo em periódicos especializados") !== -1){
            prodScore.push({section: "2", subsection: "1", subitem: "2", score: 5});
        }
        else if (description.indexOf("Artigos ou textos literários em repositórios de publicação eletrônica") !== -1){
            prodScore.push({section: "2", subsection: "1", subitem: "3", score: 5});
        }
        else if (description.indexOf("Resumo expandido publicado em anais") !== -1){
            if (description.toLowerCase().indexOf("internacional") !== -1)
                prodScore.push({section: "2", subsection: "1", subitem: "4", score: 8});
            else if (description.toLowerCase().indexOf("nacional") !== -1)
                prodScore.push({section: "2", subsection: "1", subitem: "4", score: 6});
            else
                prodScore.push({section: "2", subsection: "1", subitem: "4", score: 4});

        }
        else if (description.indexOf("Resumo simples publicado em anais") !== -1){
            if (description.toLowerCase().indexOf("internacional") !== -1)
                prodScore.push({section: "2", subsection: "1", subitem: "5", score: 8});
            else if (description.toLowerCase().indexOf("nacional") !== -1)
                prodScore.push({section: "2", subsection: "1", subitem: "5", score: 6});
            else
                prodScore.push({section: "2", subsection: "1", subitem: "5", score: 4});
        }
        else if (description.indexOf("Trabalho completo publicado em anais de congresso cientifico") !== -1){
            prodScore.push({section: "2", subsection: "1", subitem: "6", score: 10});
        }
        else if (description.toLowerCase().indexOf("publicado com") !== -1){
            if (description.toLowerCase().indexOf("capítulo") !== -1){
                if (description.indexOf("traduzido") !== -1){
                    prodScore.push({section: "2", subsection: "1", subitem: "12", score: 5});
                }
                else{
                    prodScore.push({section: "2", subsection: "1", subitem: "10", score: 10});
                }
            }
            else if (description.toLowerCase().indexOf("edição") || description.toLowerCase().contains("organização de livro") !== -1){
                prodScore.push({section: "2", subsection: "1", subitem: "11", score: 12});
            }
            else if (description.toLowerCase().indexOf("editor") || description.toLowerCase().contains("coordenador editorial") !== -1){
                prodScore.push({section: "2", subsection: "1", subitem: "7", score: 20});
            }
            else if (description.indexOf("Livro publicado com selo de editora que possua corpo editorial") !== -1) {
                prodScore.push({section: "2", subsection: "1", subitem: "8", score: 40});
            }
            else if (description.toLowerCase().indexOf("não possua corpo editorial") !== -1){
                prodScore.push({section: "2", subsection: "1", subitem: "9", score: 10});
            }
            else if (description.toLowerCase().indexOf("livro traduzido") !== -1){
                prodScore.push({section: "2", subsection: "1", subitem: "13", score: 10});
            }
        }
        else if (description.toLowerCase().indexOf("resenha") || description.toLowerCase().contains("prefácio") || description.toLowerCase().contains("verbete") !== -1){
            prodScore.push({section: "2", subsection: "1", subitem: "14", score: 10});
        }
        else if (description.indexOf("Livro didático desenvolvido para projetos") !== -1){
            prodScore.push({section: "2", subsection: "1", subitem: "15", score: 10});
        }
        else if (description.indexOf("Editor de periódicos especializados indexados com corpo editorial") !== -1){
            prodScore.push({section: "2", subsection: "1", subitem: "16", score: 20});
        }
        else if (description.indexOf("com distribuição") !== -1){
            if (description.toLowerCase().indexOf("internacional") !== -1)
                prodScore.push({section: "2", subsection: "1", subitem: "17", score: 20});
            else if (description.toLowerCase().indexOf("nacional") !== -1)
                prodScore.push({section: "2", subsection: "1", subitem: "17", score: 20});
            else
                prodScore.push({section: "2", subsection: "1", subitem: "17", score: 15});
        }
        else if (description.indexOf("Dissertação de Mestrado defendida de aprovada") !== -1){
            prodScore.push({section: "2", subsection: "1", subitem: "18", score: 10});
        }
        else if (description.indexOf("Tese de Doutorado defendida e aprovada") !== -1){
            prodScore.push({section: "2", subsection: "1", subitem: "19", score: 15});
        }
        else if (description.indexOf("apresentado em evento") !== -1){
            if (description.toLowerCase().indexOf("internacional") !== -1)
                prodScore.push({section: "2", subsection: "2", subitem: "1", score: 20});
            else if (description.toLowerCase().indexOf("nacional") !== -1)
                prodScore.push({section: "2", subsection: "2", subitem: "1", score: 15});
            else
                prodScore.push({section: "2", subsection: "2", subitem: "1", score: 10});
        }
        else if (description.indexOf("Criação e produção do projeto gráfico") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "2", score: 10});
        }
        else if (description.indexOf("Design (gráfico, de luz, de figurino e formas animadas, cenográfico e similares)") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "3", score: 5});
        }
        else if (description.indexOf("Design de impressos por peça") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "4", score: 1});
        }
        else if (description.indexOf("Design de interfaces digitais com inovação tecnológica") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "6", score: 20});
        }
        else if (description.indexOf("Design de interfaces digitais") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "5", score: 10});
        }
        else if (description.indexOf("Produtos com inovação tecnológica") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "7", score: 20});
        }
        else if (description.indexOf("Exposições e apresentações artísticas locais ou regionais") !== -1){
            if (description.toLowerCase().indexOf("Participação individual, camerista, solista ou ator principal") !== -1){
                prodScore.push({section: "2", subsection: "2", subitem: "8", score: 16});
            }
            else {
                prodScore.push({section: "2", subsection: "2", subitem: "8", score: 5});
            }
        }
        else if (description.indexOf("Exposições e apresentações artísticas nacionais") !== -1){
            if (description.toLowerCase().indexOf("Participação individual, camerista, solista ou ator principal") !== -1){
                prodScore.push({section: "2", subsection: "2", subitem: "9", score: 20});
            }
            else {
                prodScore.push({section: "2", subsection: "2", subitem: "9", score: 10});
            }
        }
        else if (description.indexOf("Exposições e apresentações artísticas internacionais") !== -1){
            if (description.toLowerCase().indexOf("Participação individual, camerista, solista ou ator principal") !== -1){
                prodScore.push({section: "2", subsection: "2", subitem: "10", score: 20});
            }
            else {
                prodScore.push({section: "2", subsection: "2", subitem: "10", score: 15});
            }
        }
        else if (description.indexOf("Composições musicais") !== -1){
            if (description.toLowerCase().indexOf("Editadas") !== -1)
                prodScore.push({section: "2", subsection: "2", subitem: "11", score: 20});
            else if (description.toLowerCase().indexOf("Publicadas em revistas científicas") !== -1)
                prodScore.push({section: "2", subsection: "2", subitem: "11", score: 20});
            else if (description.toLowerCase().indexOf("Gravadas") !== -1)
                prodScore.push({section: "2", subsection: "2", subitem: "11", score: 15});
            else if (description.toLowerCase().indexOf("Executadas em apresentações públicas") !== -1)
                prodScore.push({section: "2", subsection: "2", subitem: "11", score: 15});

        }
        else if (description.indexOf("Produção artística, arquitetônica ou de design premiada em evento") !== -1){
            if (description.toLowerCase().indexOf("internacional") !== -1)
                prodScore.push({section: "2", subsection: "2", subitem: "12", score: 15});
            else if (description.toLowerCase().indexOf("nacional") !== -1)
                prodScore.push({section: "2", subsection: "2", subitem: "12", score: 10});
            else
                prodScore.push({section: "2", subsection: "2", subitem: "12", score: 5});
        }
        else if (description.indexOf("Arranjos musicais") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "13", score: 5});
        }
        else if (description.indexOf("Apresentação artística ou cultural em rádio ou TV") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "14", score: 5});
        }
        else if (description.indexOf("Sonoplastia") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "15", score: 3});
        }
        else if (description.indexOf("Desenvolvimento de programa de computador") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "1", score: 20});
        }
        else if (description.indexOf("Desenvolvimento de software com divulgação em periódicos") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "2", score: 10});
        }
        else if (description.indexOf("Desenvolvimento de software para uso institucional") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "3", score: 5});
        }
        else if (description.indexOf("Desenvolvimento e registro no INPI de topografia de circuito integrado") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "4", score: 20});
        }
        else if (description.indexOf("Desenvolvimento de produto, processo ou técnica com registro de patente") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "5", score: 20});
        }
        else if (description.indexOf("Desenvolvimento e registro no INPI de desenho industrial") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "6", score: 20});
        }
        else if (description.indexOf("Desenvolvimento e registro no INPI de processo de indicação geográfica") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "7", score: 20});
        }
        else if (description.indexOf("Desenvolvimento e registro no INPI de marcas") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "8", score: 5});
        }
        else if (description.indexOf("Participação em comitê editorial de periódicos") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "9", score: 10});
        }
        else if (description.indexOf("Parecer de consultoria ad hoc em comitês de avaliação") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "10", score: 3});
        }
        else if (description.indexOf("Parecer de consultoria ad hoc para periódicos especializados") !== -1){
            prodScore.push({section: "2", subsection: "2", subitem: "11", score: 3});
        }
        else if (description.indexOf("realizado em consultoria ou assessoria officializada por convite, convênio, contrato ou designação") !== -1){
            if (description.indexOf("Parecer") !== -1){
                if (description.indexOf("sem anotação") !== -1)
                    prodScore.push({section: "2", subsection: "3", subitem: "12", score: 5});
                else
                    prodScore.push({section: "2", subsection: "3", subitem: "12", score: 10});

            }
            else{
                if (description.indexOf("sem anotação") !== -1)
                    prodScore.push({section: "2", subsection: "3", subitem: "12", score: 10});
                else
                    prodScore.push({section: "2", subsection: "3", subitem: "12", score: 20});
            }
        }
        else if (description.indexOf("Anais, Manuais, catálogos, boletins, com ficha bibliográfica") !== -1){
            prodScore.push({section: "2", subsection: "3", subitem: "13", score: 5});
        }
        else if (description.indexOf("Produção e publicação de mapas, cartas ou similares") !== -1){
            prodScore.push({section: "2", subsection: "3", subitem: "14", score: 10});
        }
        else if (description.indexOf("Desenvolvimento de maquete") !== -1){
            prodScore.push({section: "2", subsection: "3", subitem: "15", score: 5});
        }
        else if (description.indexOf("obra artística") !== -1){
            if (description.toLowerCase().indexOf("restauração") !== -1)
                prodScore.push({section: "2", subsection: "3", subitem: "16.1", score: 20});
            else
                prodScore.push({section: "2", subsection: "3", subitem: "16.2", score: 10});
        }
        else if (description.indexOf("Curadoria de exposições") !== -1){
            prodScore.push({section: "2", subsection: "3", subitem: "17", score: 5});
        }
        else if (description.indexOf("Produção de cinema,") !== -1){
            if (description.toLowerCase().indexOf("editor") !== -1)
                prodScore.push({section: "2", subsection: "3", subitem: "18.1", score: 20});
            else
                prodScore.push({section: "2", subsection: "3", subitem: "18.2", score: 3});
        }
        else if (description.indexOf("Artigos de opinião veiculados em jornais e revistas") !== -1){
            prodScore.push({section: "2", subsection: "4", subitem: "1", score: 1});
        }
        else if (description.indexOf("Texto ou material didático para uso institucional") !== -1){
            prodScore.push({section: "2", subsection: "4", subitem: "2", score: 2});
        }
        else if (description.indexOf("Artigos de divulgação científica, tecnológica e artística veiculados em jornais") !== -1){
            prodScore.push({section: "2", subsection: "4", subitem: "3", score: 3});
        }
        else if (description.indexOf("Apresentação oral de trabalho publicado em anais de congresso científico") !== -1){
            prodScore.push({section: "2", subsection: "4", subitem: "4", score: 3});
        }
        else if (description.indexOf("Apresentação em painel de trabalho publicado em anais de congresso") !== -1){
            prodScore.push({section: "2", subsection: "4", subitem: "5", score: 1});
        }
        else if (description.indexOf("Trabalho premiado em evento científico nacional ou internacional") !== -1){
            prodScore.push({section: "2", subsection: "4", subitem: "6", score: 5});
        }
        else if (description.indexOf("Tese, dissertação e trabalho de iniciação científica premiados por instituições") !== -1){
            prodScore.push({section: "2", subsection: "4", subitem: "7", score: 8});
        }
        else{
            prodScore.push({officialReason: "Atividade não encontrada na resolução", section: "", subsection: "", subitem: "", score: 0});
        }
    }

    for (var research = 0; research < radoc[config.sections[5].header].length; research++){
        var researchScore = score[config.sections[5].header];
        var resTable = radoc[config.sections[5].header][research][config.sections[5].labels[1]];
        if (resTable.indexOf("Coordenador de projeto conjuntos de pesquisa e cooperação científica") !== -1){
            researchScore.push({section: "3", subsection: "1", subitem: "1", score: 10});
        }
        else if (resTable.indexOf("Coordenador de projeto de pesquisa aprovado com comprovação de financiamento") !== -1){
            researchScore.push({section: "3", subsection: "1", subitem: "2", score: 10});
        }
        else if (resTable.indexOf("Coordenador de projeto de pesquisa aprovado sem financiamento") !== -1){
            researchScore.push({section: "3", subsection: "1", subitem: "3", score: 5});
        }
        else if (resTable.indexOf("Coordenador de projeto de extensão aprovado com comprovação") !== -1){
            researchScore.push({section: "3", subsection: "2", subitem: "1", score: 10});
        }
        else if (resTable.indexOf("Coordenador de projeto ou programa de extensão/cultura cadastrado") !== -1){
            researchScore.push({section: "3", subsection: "2", subitem: "2", score: 5});
        }
        else if (resTable.indexOf("Coordenador de contratos e de convênios de cooperação institucional internacional") !== -1){
            researchScore.push({section: "3", subsection: "2", subitem: "3", score: 5});
        }
        else if (resTable.indexOf("Coordenador de contratos e de convênios de cooperação institucional nacional") !== -1){
            researchScore.push({section: "3", subsection: "2", subitem: "4", score: 3});
        }
        else if (resTable.indexOf("Participante de projeto de extensão/cultura cadastrado na PROEC") !== -1){
            researchScore.push({section: "3", subsection: "2", subitem: "5", score: 3});
        }
        else if (resTable.indexOf("Curso de extensão ministrado com 20 ou mais horas") !== -1){
            researchScore.push({section: "3", subsection: "2", subitem: "6", score: 5});
        }
        else if (resTable.indexOf("Curso de extensão ministrado com 20 ou mais horas") !== -1){
            researchScore.push({section: "3", subsection: "2", subitem: "7", score: 2});
        }
        else if (resTable.indexOf("Palestrante, conferencista ou participante em mesa redonda em evento científico, cultural ou artístico") !== -1){
            if (resTable.toLowerCase().indexOf("evento internacional") !== -1)
                researchScore.push({section: "3", subsection: "2", subitem: "8.1", score: 5});
            else if (resTable.toLowerCase().indexOf("evento nacional") !== -1)
                researchScore.push({section: "3", subsection: "2", subitem: "8.2", score: 4});
            else if (resTable.toLowerCase().indexOf("evento regional ou local") !== -1)
                researchScore.push({section: "3", subsection: "2", subitem: "8.3", score: 3});
        }
        else if (resTable.indexOf("Promoção ou produção de eventos artísticos e científicos locais") !== -1){
            if (resTable.toLowerCase().indexOf("presidente") !== -1)
                researchScore.push({section: "3", subsection: "2", subitem: "9", score: 4});
            else if (resTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                researchScore.push({section: "3", subsection: "2", subitem: "9", score: 2});
        }
        else if (resTable.indexOf("Promoção ou produção de eventos artísticos e científicos regionais") !== -1){
            if (resTable.toLowerCase().indexOf("presidente") !== -1)
                researchScore.push({section: "3", subsection: "2", subitem: "10", score: 6});
            else if (resTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                researchScore.push({section: "3", subsection: "2", subitem: "10", score: 3});
        }
        else if (resTable.indexOf("Promoção ou produção de eventos artísticos e científicos nacionais") !== -1){
            if (resTable.toLowerCase().indexOf("presidente") !== -1)
                researchScore.push({section: "3", subsection: "2", subitem: "11", score: 8});
            else if (resTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                researchScore.push({section: "3", subsection: "2", subitem: "11", score: 4});
        }
        else if (resTable.indexOf("Promoção ou produção de eventos artísticos e científicos internacionais") !== -1){
            if (resTable.toLowerCase().indexOf("presidente") !== -1)
                researchScore.push({section: "3", subsection: "2", subitem: "12", score: 10});
            else if (resTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                researchScore.push({section: "3", subsection: "2", subitem: "12", score: 5});
        }
        else{
            researchScore.push({officialReason: "Atividade não encontrada na resolução", section: "", subsection: "", subitem: "", score: 0});
        }
    }

    for (var ext = 0; ext < radoc[config.sections[6].header].length; ext++){
        var extScore = score[config.sections[6].header];
        var extTable = radoc[config.sections[6].header][ext][config.sections[6].labels[0]];
        if (extTable.indexOf("Coordenador de projeto de extensão aprovado com comprovação") !== -1){
            extScore.push({section: "3", subsection: "2", subitem: "1", score: 10});
        }
        else if (extTable.indexOf("Coordenador de projeto ou programa de extensão/cultura cadastrado") !== -1){
            extScore.push({section: "3", subsection: "2", subitem: "2", score: 5});
        }
        else if (extTable.indexOf("Coordenador de contratos e de convênios de cooperação institucional internacional") !== -1){
            extScore.push({section: "3", subsection: "2", subitem: "3", score: 5});
        }
        else if (extTable.indexOf("Coordenador de contratos e de convênios de cooperação institucional nacional") !== -1){
            extScore.push({section: "3", subsection: "2", subitem: "4", score: 3});
        }
        else if (extTable.indexOf("Participante de projeto de extensão/cultura cadastrado na PROEC") !== -1){
            extScore.push({section: "3", subsection: "2", subitem: "5", score: 3});
        }
        else if (extTable.indexOf("Curso de extensão ministrado com 20 ou mais horas") !== -1){
            extScore.push({section: "3", subsection: "2", subitem: "6", score: 5});
        }
        else if (extTable.indexOf("Curso de extensão ministrado com 20 ou mais horas") !== -1){
            extScore.push({section: "3", subsection: "2", subitem: "7", score: 2});
        }
        else if (extTable.indexOf("Palestrante, conferencista ou participante em mesa redonda em evento científico, cultural ou artístico") !== -1){
            if (extTable.toLowerCase().indexOf("evento internacional") !== -1)
                extScore.push({section: "3", subsection: "2", subitem: "8.1", score: 5});
            else if (extTable.toLowerCase().indexOf("evento nacional") !== -1)
                extScore.push({section: "3", subsection: "2", subitem: "8.2", score: 4});
            else if (extTable.toLowerCase().indexOf("evento regional ou local") !== -1)
                extScore.push({section: "3", subsection: "2", subitem: "8.3", score: 3});
        }
        else if (extTable.indexOf("Promoção ou produção de eventos artísticos e científicos locais") !== -1){
            if (extTable.toLowerCase().indexOf("presidente") !== -1)
                extScore.push({section: "3", subsection: "2", subitem: "9", score: 4});
            else if (extTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                extScore.push({section: "3", subsection: "2", subitem: "9", score: 2});
        }
        else if (extTable.indexOf("Promoção ou produção de eventos artísticos e científicos regionais") !== -1){
            if (extTable.toLowerCase().indexOf("presidente") !== -1)
                extScore.push({section: "3", subsection: "2", subitem: "10", score: 6});
            else if (extTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                extScore.push({section: "3", subsection: "2", subitem: "10", score: 3});
        }
        else if (extTable.indexOf("Promoção ou produção de eventos artísticos e científicos nacionais") !== -1){
            if (extTable.toLowerCase().indexOf("presidente") !== -1)
                extScore.push({section: "3", subsection: "2", subitem: "11", score: 8});
            else if (extTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                extScore.push({section: "3", subsection: "2", subitem: "11", score: 4});
        }
        else if (extTable.indexOf("Promoção ou produção de eventos artísticos e científicos internacionais") !== -1){
            if (extTable.toLowerCase().indexOf("presidente") !== -1)
                extScore.push({section: "3", subsection: "2", subitem: "12", score: 10});
            else if (extTable.toLowerCase().indexOf("comissão organizadora") !== -1)
                extScore.push({section: "3", subsection: "2", subitem: "12", score: 5});
        }
        else{
            extScore.push({officialReason: "Atividade não encontrada na resolução", section: "", subsection: "", subitem: "", score: 0});
        }
    }

    for (var adm = 0; adm < radoc[config.sections[9].header].length; adm++){
        var admScore = score[config.sections[9].header];
        var admTable = radoc[config.sections[9].header][adm][config.sections[9].labels[0]];
        if (admTable.indexOf("Reitor ou Vice-Reitor ou Pró-Reitor") !== -1){
            admScore.push({section: "4", subsection: "1", subitem: "1", score: getMonths(radoc[config.sections[9].header][adm]) * 14});
        }
        else if (admTable.indexOf("Chefe de Gabinete") !== -1){
                admScore.push({section: "4", subsection: "1", subitem: "2", score: getMonths(radoc[config.sections[9].header][adm]) * 10});
        }
        else if (admTable.indexOf("Coordenador ou assessor vinculado à Reitoria") !== -1){
            admScore.push({section: "4", subsection: "1", subitem: "3", score: getMonths(radoc[config.sections[9].header][adm]) * 10});
        }
        else if (admTable.indexOf("Diretor de Unidade Acadêmica, de Unidade Acadêmica Especial") !== -1){
            admScore.push({section: "4", subsection: "1", subitem: "4", score: getMonths(radoc[config.sections[9].header][adm]) * 10});
        }
        else if (admTable.indexOf("Diretor de Campus do interior") !== -1){
            admScore.push({section: "4", subsection: "1", subitem: "5", score: getMonths(radoc[config.sections[9].header][adm]) * 12});
        }
        else if (admTable.indexOf("Vice-diretor de Campus do interior") !== -1){
            admScore.push({section: "4", subsection: "1", subitem: "6", score: getMonths(radoc[config.sections[9].header][adm]) * 12});
        }
        else if (admTable.indexOf("Diretor Geral do Hospital das Clínicas") !== -1){
            admScore.push({section: "4", subsection: "1", subitem: "7", score: getMonths(radoc[config.sections[9].header][adm]) * 10});
        }
        else if (admTable.indexOf("Coordenador ou assessor vinculado às Pró-Reitorias ou à Direção dos Campus") !== -1){
            admScore.push({section: "4", subsection: "1", subitem: "8", score: getMonths(radoc[config.sections[9].header][adm]) * 8});
        }
        else if (admTable.indexOf("Coordenador de Programa de Pós-Graduação stricto sensu") !== -1){
            admScore.push({section: "4", subsection: "1", subitem: "9", score: getMonths(radoc[config.sections[9].header][adm]) * 8});
        }
        else if (admTable.indexOf("Coordenador de Curso de Ensino Básico ou de Graduação") !== -1){
            admScore.push({section: "4", subsection: "1", subitem: "10", score: getMonths(radoc[config.sections[9].header][adm]) * 8});
        }
        else if (admTable.indexOf("Vice-diretor de Unidade Acadêmica ou Unidade Acadêmica Especial") !== -1){
            admScore.push({section: "4", subsection: "1", subitem: "11", score: getMonths(radoc[config.sections[9].header][adm]) * 8});
        }
        else if (admTable.indexOf("Diretor do Hospital Veterinário") !== -1){
            admScore.push({section: "4", subsection: "1", subitem: "12", score: getMonths(radoc[config.sections[9].header][adm]) * 8});
        }
        else if (admTable.indexOf("Diretor de Órgão da Administração") !== -1){
            admScore.push({section: "4", subsection: "1", subitem: "13", score: getMonths(radoc[config.sections[9].header][adm]) * 8});
        }
        else if (admTable.indexOf("Coordenador de projeto institucional com financiamento ou de contratos") !== -1){
            admScore.push({section: "4", subsection: "2", subitem: "1", score: 5});
        }
        else if (admTable.indexOf("Coordenador de curso de especialização, residência médica ou residência") !== -1){
            admScore.push({section: "4", subsection: "2", subitem: "2", score: 10});
        }
        else if (admTable.indexOf("Membro representante de classe da carreira docente no CONSUNI") !== -1){
            admScore.push({section: "4", subsection: "2", subitem: "3", score: 10});
        }
        else if (admTable.indexOf("Membro do Conselho de Curadores ou do Plenário do CEPEC ou de Conselho") !== -1){
            admScore.push({section: "4", subsection: "2", subitem: "4", score: 10});
        }
        else if (admTable.indexOf("Atividades acadêmicas e administrativas designadas por portaria do Reitor") !== -1){
            maxScore = 10;
            cha = parseInt(radoc[config.sections[9].header][adm]["CHA:"]);
            if (cha < 150)
                maxScore = maxScore * (cha / 150);
            admScore.push({section: "4", subsection: "2", subitem: "5", score: maxScore});
        }
        else if (admTable.indexOf("Presidente da CPPD") !== -1){
            admScore.push({section: "4", subsection: "3", subitem: "1", score: getMonths(radoc[config.sections[9].header][adm]) * 7});
        }
        else if (admTable.indexOf("Presidente da Comissão de Avaliação Institucional ou da Comissão Própria") !== -1){
            admScore.push({section: "4", subsection: "3", subitem: "2", score: getMonths(radoc[config.sections[9].header][adm]) * 5});
        }
        else if (admTable.indexOf("Membros da Coordenação Permanente do Centro de Seleção") !== -1){
            admScore.push({section: "4", subsection: "3", subitem: "3", score: getMonths(radoc[config.sections[9].header][adm]) * 5});
        }
        else if (admTable.indexOf("Diretores do HC") !== -1){
            admScore.push({section: "4", subsection: "3", subitem: "4", score: getMonths(radoc[config.sections[9].header][adm]) * 5});
        }
        else if (admTable.indexOf("Presidente do Comitê de Ética em Pesquisa da UFG e do HC/UFG") !== -1){
            admScore.push({section: "4", subsection: "3", subitem: "5", score: getMonths(radoc[config.sections[9].header][adm]) * 5});
        }
        else if (admTable.indexOf("Membros da CPPD ou da Comissão de Avaliação Institucional") !== -1){
            admScore.push({section: "4", subsection: "3", subitem: "6", score: getMonths(radoc[config.sections[9].header][adm]) * 5});
        }
        else if (admTable.indexOf("Coordenador de Pesquisa ou de Ensino ou de Extensão") !== -1){
            admScore.push({section: "4", subsection: "3", subitem: "7", score: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("Chefe de Departamento") !== -1){
            admScore.push({section: "4", subsection: "3", subitem: "8", score: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("Chefe do Pronto Socorro ou da Maternidade ou do CEROF") !== -1){
            admScore.push({section: "4", subsection: "3", subitem: "9", score: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("Coordenador das Atividades de Interação com a Sociedade") !== -1){
            admScore.push({section: "4", subsection: "3", subitem: "10", score: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("Coordenador das Atividades de Pesquisa e de Pós–Graduação lato sensu") !== -1){
            admScore.push({section: "4", subsection: "3", subitem: "11", score: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("Membros do Comitê de Ética da UFG e do HC/UFG") !== -1){
            admScore.push({section: "4", subsection: "3", subitem: "12", score: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("Membros do Comitê Interno e Externo do PIBIC") !== -1){
            admScore.push({section: "4", subsection: "3", subitem: "13", score: getMonths(radoc[config.sections[9].header][adm]) * 3});
        }
        else if (admTable.indexOf("Representante titular em conselho de classe profissional") !== -1){
            maxScore = 10;
            cha = parseInt(radoc[config.sections[9].header][adm]["CHA:"]);
            if (cha < 150)
                maxScore = maxScore * (cha / 150);
            admScore.push({section: "4", subsection: "4", subitem: "1", score: maxScore});
        }
        else if (admTable.indexOf("Representante titular em conselho de classe profissional") !== -1){
            admScore.push({section: "4", subsection: "4", subitem: "2", score: 10});
        }
        else if (admTable.indexOf("Diretor do Sindicato de Docentes da UFG") !== -1){
            admScore.push({section: "4", subsection: "4", subitem: "3", score: 3});
        }
        else if (admTable.indexOf("Representante sindical com carga horária igual ou superior a 150 horas") !== -1){
            maxScore = 10;
            cha = parseInt(radoc[config.sections[9].header][adm]["CHA:"]);
            if (cha < 150)
                maxScore = maxScore * (cha / 150);
            admScore.push({section: "4", subsection: "4", subitem: "4", score: maxScore});
        }
        else if (admTable.indexOf("Representante em entidade científica, artística e cultural") !== -1){
            maxScore = 10;
            cha = parseInt(radoc[config.sections[9].header][adm]["CHA:"]);
            if (cha < 150)
                maxScore = maxScore * (cha / 150);
            admScore.push({section: "4", subsection: "4", subitem: "5", score: maxScore});
        }
        else if (admTable.indexOf("Representante em comissão de órgão governamental") !== -1){
            maxScore = 10;
            cha = parseInt(radoc[config.sections[9].header][adm]["CHA:"]);
            if (cha < 150)
                maxScore = maxScore * (cha / 150);
            admScore.push({section: "4", subsection: "4", subitem: "6", score: maxScore});
        }
        else{
            admScore.push({officialReason: "Atividade não encontrada na resolução", section: "", subsection: "", subitem: "", score: 0});
        }
    }

    for (var orientation = 0; orientation < radoc[config.sections[4].header].length; orientation++){
        var oriScore = score[config.sections[4].header];
        var oriTable = radoc[config.sections[4].header][orientation][config.sections[4].labels[1]];
        if (oriTable.indexOf("Aluno orientado em tese de doutorado defendida e aprovada") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "1", score: 20});
        }
        else if (oriTable.indexOf("Aluno co-orientado em tese de doutorado defendida e aprovada") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "2", score: 7});
        }
        else if (oriTable.indexOf("Aluno orientado em tese de doutorado em andamento") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "3", score: 10});
        }
        else if (oriTable.indexOf("Aluno co-orientado em tese de doutorado em andamento") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "4", score: 4});
        }
        else if (oriTable.indexOf("Aluno orientado em dissertação de mestrado defendida e aprovada") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "5", score: 15});
        }
        else if (oriTable.indexOf("Aluno co-orientado em dissertação de mestrado defendida e aprovada") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "6", score: 5});
        }
        else if (oriTable.indexOf("Aluno orientado em dissertação de mestrado em andamento") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "7", score: 8});
        }
        else if (oriTable.indexOf("Aluno co-orientado em dissertação de mestrado em andamento") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "8", score: 3});
        }
        else if (oriTable.indexOf("Aluno orientado em monografia de especialização aprovada") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "9", score: 8});
        }
        else if (oriTable.indexOf("Aluno orientado em monografia de especialização em andamento") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "10", score: 4});
        }
        else if (oriTable.indexOf("Aluno orientado em residência médica ou em residência multiprofissional em saúde") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "11", score: 5});
        }
        else if (oriTable.indexOf("Aluno orientado em estágio supervisionado") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "12", score: 3});
        }
        else if (oriTable.indexOf("Aluno orientado em projeto de final de curso") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "13", score: 3});
        }
        else if (oriTable.indexOf("Aluno de outra IFE orientado em tese de doutorado defendida e aprovada") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "14", score: 6});
        }
        else if (oriTable.indexOf("Aluno de outra IFE co-orientado em tese de doutorado defendida e aprovada") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "15", score: 3});
        }
        else if (oriTable.indexOf("Aluno de outra IFE orientado em tese de doutorado em andamento") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "16", score: 3});
        }
        else if (oriTable.indexOf("Aluno de outra IFE co-orientado em tese de doutorado em andamento") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "17", score: 2});
        }
        else if (oriTable.indexOf("Aluno de outra IFE orientado em dissertação de mestrado defendida e aprovada") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "18", score: 4});
        }
        else if (oriTable.indexOf("Aluno de outra IFE co-orientado em dissertação de mestrado defendida e aprovada") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "19", score: 2});
        }
        else if (oriTable.indexOf("Aluno de outra IFE orientado em dissertação de mestrado em andamento") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "20", score: 2});
        }
        else if (oriTable.indexOf("Aluno de outra IFE co-orientado em dissertação de mestrado em andamento") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "21", score: 1});
        }
        else if (oriTable.indexOf("Aluno orientado em programa de iniciação científica") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "22", score: 6});
        }
        else if (oriTable.indexOf("Aluno orientado em programa de iniciação científica júnior") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "23", score: 5});
        }
        else if (oriTable.indexOf("Aluno orientado em programa especial de treinamento") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "24", score: 5});
        }
        else if (oriTable.indexOf("Aluno orientado com bolsa de DTI, PIBIT, AT, Jovens Talentos e similares") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "25", score: 5});
        }
        else if (oriTable.indexOf("Aluno orientado com bolsa de licenciatura") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "26", score: 5});
        }
        else if (oriTable.indexOf("Aluno orientado com bolsa extensão/cultura/ensino") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "27", score: 5});
        }
        else if (oriTable.indexOf("Aluno orientado em projetos de extensão/cultura/ensino sem bolsa") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "28", score: 3});
        }
        else if (oriTable.indexOf("Aluno orientado com bolsa PROCOM ou similar") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "29", score: 5});
        }
        else if (oriTable.indexOf("Aluno orientado em programa de monitoria") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "30", score: 3});
        }
        else if (oriTable.indexOf("Aluno orientado em atividade não curricular com bolsa") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "31", score: 2});
        }
        else if (oriTable.indexOf("Aluno orientado em atividade não curricular sem bolsa") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "32", score: 1});
        }
        else if (oriTable.indexOf("Pesquisador supervisionado em estágio de pós-doutoramento") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "33", score: 8});
        }
        else if (oriTable.indexOf("Aluno orientado em Prática como Componente Curricular") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "34", score: 1});
        }
        else if (oriTable.indexOf("Aluno com deficiência, transtornos globais do desenvolvimento") !== -1){
            oriScore.push({section: "5", subsection: "1", subitem: "35", score: 20});
        }
        else{
            oriScore.push({officialReason: "Atividade não encontrada na resolução", section: "", subsection: "", subitem: "", score: 0});
        }
    }

    for (var academic = 0; academic < radoc[config.sections[8].header].length; academic++){
        var acdScore = score[config.sections[8].header];
        var acdTable = radoc[config.sections[8].header][academic][config.sections[8].labels[0]];
        if (acdTable.indexOf("Membro de banca de concurso para docente efetivo") !== -1){
            if (acdTable.toLowerCase().indexOf("na instituição") !== -1)
                acdScore.push({section: "5", subsection: "2", subitem: "1", score: 4});
            else if (acdTable.toLowerCase().indexOf("em outra instituição") !== -1)
                acdScore.push({section: "5", subsection: "2", subitem: "1", score: 6});
        }
        else if (acdTable.indexOf("Membro de banca de concurso para docente substituto") !== -1){
            acdScore.push({section: "5", subsection: "2", subitem: "2", score: 2});
        }
        else if (acdTable.indexOf("Membro de banca de defesa de dissertação de mestrado") !== -1){
            if (acdTable.toLowerCase().indexOf("na instituição") !== -1)
                acdScore.push({section: "5", subsection: "2", subitem: "3", score: 4});
            else if (acdTable.toLowerCase().indexOf("em outra instituição") !== -1)
                acdScore.push({section: "5", subsection: "2", subitem: "3", score: 6});
        }
        else if (acdTable.indexOf("Membro de banca de defesa de tese de doutorado") !== -1){
            if (acdTable.toLowerCase().indexOf("na instituição") !== -1)
                acdScore.push({section: "5", subsection: "2", subitem: "4", score: 6});
            else if (acdTable.toLowerCase().indexOf("em outra instituição") !== -1)
                acdScore.push({section: "5", subsection: "2", subitem: "4", score: 8});
        }
        else if (acdTable.indexOf("Membro de banca de qualificação de mestrado") !== -1){
            if (acdTable.toLowerCase().indexOf("na instituição") !== -1)
                acdScore.push({section: "5", subsection: "2", subitem: "5", score: 3});
            else if (acdTable.toLowerCase().indexOf("em outra instituição") !== -1)
                acdScore.push({section: "5", subsection: "2", subitem: "5", score: 4});
        }
        else if (acdTable.indexOf("Membro de banca de qualificação de doutorado") !== -1){
            if (acdTable.toLowerCase().indexOf("na instituição") !== -1)
                acdScore.push({section: "5", subsection: "2", subitem: "6", score: 5});
            else if (acdTable.toLowerCase().indexOf("em outra instituição") !== -1)
                acdScore.push({section: "5", subsection: "2", subitem: "6", score: 6});
        }
        else if (acdTable.indexOf("Membro de banca de defesa de monografia, projeto final de curso e outros tipos") !== -1){
            acdScore.push({section: "5", subsection: "2", subitem: "7", score: 2});
        }
        else if (acdTable.indexOf("Membro de corpo de júri") !== -1){
            if (acdTable.toLowerCase().indexOf("na instituição") !== -1)
                acdScore.push({section: "5", subsection: "2", subitem: "8", score: 8});
            else
                acdScore.push({section: "5", subsection: "2", subitem: "8", score: 6});
        }
        else if (acdTable.indexOf("Cursos, palestras ou treinamento não curricular ministrados para docentes") !== -1){
            acdScore.push({section: "5", subsection: "2", subitem: "9", score: 2});
        }
        else if (acdTable.indexOf("Coordenador de projeto institucional de intercâmbio internacional") !== -1){
            acdScore.push({section: "5", subsection: "2", subitem: "10", score: 10});
        }
        else{
            acdScore.push({officialReason: "Atividade não encontrada na resolução", section: "", subsection: "", subitem: "", score: 0});
        }
    }

    for (var qualification = 0; qualification < radoc[config.sections[7].header].length; qualification++){
        var quaScore = score[config.sections[7].header];
        var quaTable = radoc[config.sections[7].header][qualification][config.sections[7].labels[0]];
        if (quaTable.indexOf("Docente regularmente matriculado em curso de doutorado com relatórios") !== -1){
            quaScore.push({section: "5", subsection: "3", subitem: "1", score: 12});
        }
        else if (quaTable.indexOf("Estágio Pós-Doutoral ou Estágio Sênior") !== -1){
            quaScore.push({section: "5", subsection: "3", subitem: "2", score: getMonths(radoc[config.sections[7].header][qualification]) * 12});
        }
        else if (quaTable.indexOf("Docente em licença para capacitação") !== -1){
            quaScore.push({section: "5", subsection: "3", subitem: "3", score: getMonths(radoc[config.sections[7].header][qualification]) * 12});
        }
        else if (quaTable.indexOf("Curso de aperfeiçoamento realizado com carga horária superior a 40 horas") !== -1){
            quaScore.push({section: "5", subsection: "3", subitem: "4", score: 3});
        }
        else if (quaTable.indexOf("Curso de aperfeiçoamento realizado com carga horária inferior a 40 horas") !== -1){
            quaScore.push({section: "5", subsection: "3", subitem: "5", score: 1});
        }
        else if (quaTable.indexOf("Participação em Congressos, Seminários, Encontros, Jornadas") !== -1){
            quaScore.push({section: "5", subsection: "3", subitem: "6", score: 1});
        }
        else{
            quaScore.push({officialReason: "Atividade não encontrada na resolução", section: "", subsection: "", subitem: "", score: 0});
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

        if (maxScores[scoreObj.subsection + "-" + scoreObj.subitem]){
            if (maxScores[scoreObj.subsection + "-" + scoreObj.subitem].score === maxScores[scoreObj.subsection + "-" + scoreObj.subitem].maxScore){
                scoreObj.score = 0;
            }
            else{
                maxScores[scoreObj.subsection + "-" + scoreObj.subitem].score += scoreObj.score;
            }
        }

        if (scoreByYear[scoreObj.subsection + "-" + scoreObj.subitem] !== undefined){
            if (scoreByYear[scoreObj.subsection + "-" + scoreObj.subitem])
                scoreObj.score = 0;
            else
                scoreByYear[scoreObj.subsection + "-" + scoreObj.subitem] = true;
        }

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

        if (maxScores[scoreObj.subsection + "-" + scoreObj.subitem]){
            if (maxScores[scoreObj.subsection + "-" + scoreObj.subitem].score === maxScores[scoreObj.subsection + "-" + scoreObj.subitem].maxScore){
                scoreObj.score = 0;
            }
            else{
                maxScores[scoreObj.subsection + "-" + scoreObj.subitem].score += scoreObj.score;
            }
        }

        if (scoreByYear[scoreObj.subsection + "-" + scoreObj.subitem] !== undefined){
            if (scoreByYear[scoreObj.subsection + "-" + scoreObj.subitem])
                scoreObj.score = 0;
            else
                scoreByYear[scoreObj.subsection + "-" + scoreObj.subitem] = true;
        }
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

        if (maxScores[scoreObj.subsection + "-" + scoreObj.subitem]){
            if (maxScores[scoreObj.subsection + "-" + scoreObj.subitem].score === maxScores[scoreObj.subsection + "-" + scoreObj.subitem].maxScore){
                scoreObj.score = 0;
            }
            else{
                maxScores[scoreObj.subsection + "-" + scoreObj.subitem].score += scoreObj.score;
            }
        }

        if (scoreByYear[scoreObj.subsection + "-" + scoreObj.subitem] !== undefined){
            if (scoreByYear[scoreObj.subsection + "-" + scoreObj.subitem])
                scoreObj.score = 0;
            else
                scoreByYear[scoreObj.subsection + "-" + scoreObj.subitem] = true;
        }
    }

    maxScores = {
        "1-10": {score: 0, maxScore: 12},
        "1-35": {score: 0, maxScore: 40}
    };

    for (var oriScores = 0; oriScores < score[config.sections[4].header].length; oriScores++){

        scoreObj = score[config.sections[4].header][oriScores];

        if (maxScores[scoreObj.subsection + "-" + scoreObj.subitem]){
            if (maxScores[scoreObj.subsection + "-" + scoreObj.subitem].score === maxScores[scoreObj.subsection + "-" + scoreObj.subitem].maxScore){
                scoreObj.score = 0;
            }
            else{
                maxScores[scoreObj.subsection + "-" + scoreObj.subitem].score += scoreObj.score;
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

        if (maxScores[scoreObj.subsection + "-" + scoreObj.subitem]){
            if (maxScores[scoreObj.subsection + "-" + scoreObj.subitem].score === maxScores[scoreObj.subsection + "-" + scoreObj.subitem].maxScore){
                scoreObj.score = 0;
            }
            else{
                maxScores[scoreObj.subsection + "-" + scoreObj.subitem].score += scoreObj.score;
            }
        }

        if (scoreByYear[scoreObj.subsection + "-" + scoreObj.subitem] !== undefined){
            if (scoreByYear[scoreObj.subsection + "-" + scoreObj.subitem])
                scoreObj.score = 0;
            else
                scoreByYear[scoreObj.subsection + "-" + scoreObj.subitem] = true;
        }
    }

    maxScores = {
        "1-6": {score: 0, maxScore: 3}
    };

    for (var quaScores = 0; quaScores < score[config.sections[7].header].length; quaScores++){

        scoreObj = score[config.sections[8].header][quaScores];

        if (maxScores[scoreObj.subsection + "-" + scoreObj.subitem]){
            if (maxScores[scoreObj.subsection + "-" + scoreObj.subitem].score === maxScores[scoreObj.subsection + "-" + scoreObj.subitem].maxScore){
                scoreObj.score = 0;
            }
            else{
                maxScores[scoreObj.subsection + "-" + scoreObj.subitem].score += scoreObj.score;
            }
        }
    }

    return score;

};
