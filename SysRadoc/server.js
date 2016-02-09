var express = require('express');

var env = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./config/config')[env];

require('./config/express')(app, config);
require('./config/database')(app, config);
require('./config/passport')(app);
var score = require('./server/services/radocScore');

app.listen(config.port);

console.log('Sys Radoc started on port ' + config.port + '...');

var testRadoc = {
    "_id" : "56b8ec92f4ea49ec57c7d97f",
    "instituição" : "UNIVERSIDADE FEDERAL DE GOIÁS",
    "ano-base" : "2014",
    "urlPdf" : "uploads/56300dc93efb8438b5d818cf/radocs/8f06ed5b7b41ca22.pdf",
    "usuario" : "56300dc93efb8438b5d818cf",
    "Produtos" : [
        {
            "Descrição do produto:" : "Trabalho completo publicado em anais de congresso cientifico",
            "Título do produto:" : "A User Interface Stereotype to build Web Portals",
            "Autoria:" : "Co-autor ",
            "Associação do produto:" : "Projeto de pesquisa",
            "Projeto associado:" : "35828 : ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Veiculação:" : "LA-WEB 2014 - Latin American Web Congress",
            "Local:" : "Ouro Preto - MG",
            "Data:" : "20/10/2014",
            "Ano de publicação:" : "2014",
            "Página inicial:" : "NULL",
            "Página final:" : "NULL",
            "Número de páginas:" : "9",
            "Nº da patente:" : "",
            "Editora:" : "SBC",
            "_id" : "56b8ec92f4ea49ec57c7d98c"
        },
        {
            "Descrição do produto:" : "Parecer realizado em consultoria ou assessoria oficializada por convite, convênio, contrato ou designação - sem anotação de resp. técnica (ART) ou registro de\nresp. técnica (RRT)",
            "Título do produto:" : "Avaliação do Trabalho: Implantação dos Processos de Verificação e Validação do CMMI utilizando o Framework Gaia Vero",
            "Autoria:" : "Primeiro autor",
            "Associação do produto:" : "Projeto de pesquisa",
            "Projeto associado:" : "35828 : ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Veiculação:" : "SBSI 2014 - Simpósio Brasileiro de Sistemas de Informação",
            "Local:" : "Londrina - PR",
            "Data:" : "27/05/2014",
            "Ano de publicação:" : "2014",
            "Página inicial:" : "NULL",
            "Página final:" : "NULL",
            "Número de páginas:" : "",
            "Nº da patente:" : "",
            "Editora:" : "SBC",
            "_id" : "56b8ec92f4ea49ec57c7d98b"
        },
        {
            "Descrição do produto:" : "Parecer realizado em consultoria ou assessoria oficializada por convite, convênio, contrato ou designação - sem anotação de resp. técnica (ART) ou registro de\nresp. técnica (RRT)",
            "Título do produto:" : "Avaliação do Trabalho: Inspeção por Técnicas de Leitura: Uma Proposta para Incluir Requisitos de Acessibilidade",
            "Autoria:" : "Primeiro autor",
            "Associação do produto:" : "Projeto de pesquisa",
            "Projeto associado:" : "35828 : ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Veiculação:" : "SBSI 2014 - Simpósio Brasileiro de Sistemas de Informação",
            "Local:" : "Londrina - PR",
            "Data:" : "27/05/2014",
            "Ano de publicação:" : "2014",
            "Página inicial:" : "NULL",
            "Página final:" : "NULL",
            "Número de páginas:" : "",
            "Nº da patente:" : "",
            "Editora:" : "SBC",
            "_id" : "56b8ec92f4ea49ec57c7d98a"
        },
        {
            "Descrição do produto:" : "Parecer realizado em consultoria ou assessoria oficializada por convite, convênio, contrato ou designação - sem anotação de resp. técnica (ART) ou registro de\nresp. técnica (RRT)",
            "Título do produto:" : "Avaliação do Trabalho: M3: Definindo um Modelo de Maturidade para apoio a Governança Ágil em TIC",
            "Autoria:" : "Primeiro autor",
            "Associação do produto:" : "Projeto de pesquisa",
            "Projeto associado:" : "35828 : ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Veiculação:" : "SBSI 2014 - Simpósio Brasileiro de Sistemas de Informação",
            "Local:" : "Londrina - PR",
            "Data:" : "27/05/2014",
            "Ano de publicação:" : "2014",
            "Página inicial:" : "NULL",
            "Página final:" : "NULL",
            "Número de páginas:" : "",
            "Nº da patente:" : "",
            "Editora:" : "SBC",
            "_id" : "56b8ec92f4ea49ec57c7d989"
        },
        {
            "Descrição do produto:" : "Parecer realizado em consultoria ou assessoria oficializada por convite, convênio, contrato ou designação - sem anotação de resp. técnica (ART) ou registro de\nresp. técnica (RRT)",
            "Título do produto:" : "Avaliação do Trabalho: Proposta de uma Ferramenta de Avaliação e Implantação da Sustentabilidade nas Fábricas de Software",
            "Autoria:" : "Primeiro autor",
            "Associação do produto:" : "Projeto de pesquisa",
            "Projeto associado:" : "35828 : ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Veiculação:" : "SBSI 2014 - Simpósio Brasileiro de Sistemas de Informação",
            "Local:" : "Londrina - PR",
            "Data:" : "27/05/2014",
            "Ano de publicação:" : "2014",
            "Página inicial:" : "NULL",
            "Página final:" : "NULL",
            "Número de páginas:" : "",
            "Nº da patente:" : "",
            "Editora:" : "SBC",
            "_id" : "56b8ec92f4ea49ec57c7d988"
        },
        {
            "Descrição do produto:" : "Parecer realizado em consultoria ou assessoria oficializada por convite, convênio, contrato ou designação - sem anotação de resp. técnica (ART) ou registro de\nresp. técnica (RRT)",
            "Título do produto:" : "Avaliação do Trabalho: Proposta para Teste de Usabilidade para Aplicações Móveis no Contexto de Computação Ubíqua",
            "Autoria:" : "Primeiro autor",
            "Associação do produto:" : "Projeto de pesquisa",
            "Projeto associado:" : "35828 : ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Veiculação:" : "XII Workshop de Teses e Dissertações em Qualidade de Software",
            "Local:" : "Blumenau - SC",
            "Data:" : "04/08/2014",
            "Ano de publicação:" : "2014",
            "Página inicial:" : "NULL",
            "Página final:" : "NULL",
            "Número de páginas:" : "",
            "Nº da patente:" : "",
            "Editora:" : "SBC",
            "_id" : "56b8ec92f4ea49ec57c7d987"
        },
        {
            "Descrição do produto:" : "Parecer realizado em consultoria ou assessoria oficializada por convite, convênio, contrato ou designação - sem anotação de resp. técnica (ART) ou registro de\nresp. técnica (RRT)",
            "Título do produto:" : "Avaliação do Trabalho: TDQM: Análise das Principais Dimensões no Contexto de Um Setor de Cadastro, Crédito e Cobrança",
            "Autoria:" : "Primeiro autor",
            "Associação do produto:" : "Projeto de pesquisa",
            "Projeto associado:" : "35828 : ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Veiculação:" : "SBSI 2014 - Simpósio Brasileiro de Sistemas de Informação",
            "Local:" : "Londrina - PR",
            "Data:" : "27/05/2014",
            "Ano de publicação:" : "2014",
            "Página inicial:" : "NULL",
            "Página final:" : "NULL",
            "Número de páginas:" : "",
            "Nº da patente:" : "",
            "Editora:" : "SBC",
            "_id" : "56b8ec92f4ea49ec57c7d986"
        },
        {
            "Descrição do produto:" : "Parecer realizado em consultoria ou assessoria oficializada por convite, convênio, contrato ou designação - sem anotação de resp. técnica (ART) ou registro de\nresp. técnica (RRT)",
            "Título do produto:" : "Avaliação do trabalho: Estendendo a linguagem XACML para o suporte ao Cálculo de Risco",
            "Autoria:" : "Primeiro autor",
            "Associação do produto:" : "Projeto de pesquisa",
            "Projeto associado:" : "35828 : ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Veiculação:" : "Simpósio Brasileiro de Sistemas de Informação - SBSI 2014",
            "Local:" : "Londrina - PR",
            "Data:" : "27/05/2014",
            "Ano de publicação:" : "2014",
            "Página inicial:" : "NULL",
            "Página final:" : "NULL",
            "Número de páginas:" : "",
            "Nº da patente:" : "",
            "Editora:" : "SBC",
            "_id" : "56b8ec92f4ea49ec57c7d985"
        },
        {
            "Descrição do produto:" : "Parecer realizado em consultoria ou assessoria oficializada por convite, convênio, contrato ou designação - sem anotação de resp. técnica (ART) ou registro de\nresp. técnica (RRT)",
            "Título do produto:" : "Avaliação do trabalho: Um Mapeamento para Apoio ao Processo de Gerência de Portfólio de Projetos no Contexto do MR-MPS-SW adotando Práticas Ágeis",
            "Autoria:" : "Primeiro autor",
            "Associação do produto:" : "Projeto de pesquisa",
            "Projeto associado:" : "35828 : ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Veiculação:" : "XII Workshop de Teses e Dissertações em Qualidade de Software",
            "Local:" : "Blumenau - SC",
            "Data:" : "04/08/2014",
            "Ano de publicação:" : "2014",
            "Página inicial:" : "NULL",
            "Página final:" : "NULL",
            "Número de páginas:" : "",
            "Nº da patente:" : "",
            "Editora:" : "SBC",
            "_id" : "56b8ec92f4ea49ec57c7d984"
        },
        {
            "Descrição do produto:" : "Parecer realizado em consultoria ou assessoria oficializada por convite, convênio, contrato ou designação - sem anotação de resp. técnica (ART) ou registro de\nresp. técnica (RRT)",
            "Título do produto:" : "Avaliação do trabalho: Uma Abordagem para Implementação do Processo de Projeto e Construção do Produto a partir da Adoção das Métodos Ágeis Crystal, XP ,\nFDD , TDD e LEAN",
            "Autoria:" : "Primeiro autor",
            "Associação do produto:" : "Projeto de pesquisa",
            "Projeto associado:" : "35828 : ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Veiculação:" : "XII Workshop de Teses e Dissertações em Qualidade de Software",
            "Local:" : "Blumenau - SC",
            "Data:" : "04/08/2014",
            "Ano de publicação:" : "2014",
            "Página inicial:" : "NULL",
            "Página final:" : "NULL",
            "Número de páginas:" : "",
            "Nº da patente:" : "",
            "Editora:" : "SBC",
            "_id" : "56b8ec92f4ea49ec57c7d983"
        },
        {
            "Descrição do produto:" : "Parecer de consultoria ad hoc em comitês de avaliação de concursos e editais de publicação de livros de editoras com corpo editorial",
            "Título do produto:" : "Membro do Comitê Julgador do Concurso de Teses e Dissertações em Qualidade de Software",
            "Autoria:" : "Primeiro autor",
            "Associação do produto:" : "Projeto de pesquisa",
            "Projeto associado:" : "35828 : ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Veiculação:" : "Simpósio Brasileiro de Qualidade de Software - SQBS 2014",
            "Local:" : "Blumenau - SC",
            "Data:" : "04/08/2014",
            "Ano de publicação:" : "2014",
            "Página inicial:" : "NULL",
            "Página final:" : "NULL",
            "Número de páginas:" : "",
            "Nº da patente:" : "",
            "Editora:" : "SBC",
            "_id" : "56b8ec92f4ea49ec57c7d982"
        },
        {
            "Descrição do produto:" : "Parecer de consultoria ad hoc para periódicos especializados com corpo editorial ou para instituições de fomento à pesquisa ou para livros de editoras com corpo\neditorial",
            "Título do produto:" : "Revisor da Revista de Sistemas de Informação da Faculdade Salesiana Maria Auxiliadora (ISSN 1983-5604) na edição nº 14 de Julho - Dezembro de 2014.",
            "Autoria:" : "Primeiro autor",
            "Associação do produto:" : "Projeto de pesquisa",
            "Projeto associado:" : "35828 : ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Veiculação:" : "Revista de Sistemas de Informação - Faculdade Salesiana Maria Auxiliadora - FSMA",
            "Local:" : "Macaé - RJ",
            "Data:" : "01/07/2014",
            "Ano de publicação:" : "2014",
            "Página inicial:" : "NULL",
            "Página final:" : "NULL",
            "Número de páginas:" : "",
            "Nº da patente:" : "",
            "Editora:" : "Faculdade Salesiana Maria Auxiliadora - FSMA",
            "_id" : "56b8ec92f4ea49ec57c7d981"
        },
        {
            "Descrição do produto:" : "Trabalho completo publicado em anais de congresso cientifico",
            "Título do produto:" : "User Interface Stereotypes: A Model-Based Approach for Information Systems User Interfaces",
            "Autoria:" : "Co-autor ",
            "Associação do produto:" : "Projeto de pesquisa",
            "Projeto associado:" : "35828 : ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Veiculação:" : "SBSI 2014 - Simpósio Brasileiro de Sistemas de Informação",
            "Local:" : "Londrina - PR",
            "Data:" : "27/05/2014",
            "Ano de publicação:" : "2014",
            "Página inicial:" : "NULL",
            "Página final:" : "NULL",
            "Número de páginas:" : "12",
            "Nº da patente:" : "",
            "Editora:" : "SBC",
            "_id" : "56b8ec92f4ea49ec57c7d980"
        }
    ],
    "Atividades administrativas" : [
        {
            "Tabela:" : "Atividades acadêmicas e administrativas designadas por portaria do Reitor, Pró-Reitor ou Diretor de Unidade Acadêmica com carga horária >=150 horas",
            "Descrição:" : "MEMBRO DO NÚCLEO DOCENTE ESTRUTURANTE - N.D.E. - ENGENHARIA DE SOFTWARE",
            "Órgão emissor" : "INF",
            "Órgão servido" : "INF",
            "Portaria" : "19",
            "CHA:" : "100",
            "Data início:" : "01/01/2014",
            "Data término:" : "31/12/2014",
            "_id" : "56b8ec92f4ea49ec57c7d992"
        },
        {
            "Tabela:" : "Membros da CPPD ou da Comissão de Avaliação Institucional ou da Comissão Própria de Avaliação ou da CAD",
            "Descrição:" : "PRESIDENTE DA COMISSÃO DE AVALIAÇÃO DOCENTE - CAD - PARA TRATAR PRIORITARIAMENTE \nDOS PROCESSOS DE PROMOÇÃO À CLASSE D",
            "Órgão emissor" : "INF",
            "Órgão servido" : "INF",
            "Portaria" : "005",
            "CHA:" : "100",
            "Data início:" : "01/01/2014",
            "Data término:" : "31/12/2014",
            "_id" : "56b8ec92f4ea49ec57c7d991"
        },
        {
            "Tabela:" : "Atividades acadêmicas e administrativas designadas por portaria do Reitor, Pró-Reitor ou Diretor de Unidade Acadêmica com carga horária >=150 horas",
            "Descrição:" : "COORDENADOR DA FÁBRICA DE SOFTWARE",
            "Órgão emissor" : "INF",
            "Órgão servido" : "INF",
            "Portaria" : "011",
            "CHA:" : "100",
            "Data início:" : "01/01/2014",
            "Data término:" : "31/12/2014",
            "_id" : "56b8ec92f4ea49ec57c7d990"
        },
        {
            "Tabela:" : "Outras Atividades Administrativas e de Representação",
            "Descrição:" : "Preenchimento de RADOC",
            "Órgão emissor" : "INF",
            "Órgão servido" : "INF",
            "Portaria" : "NA",
            "CHA:" : "8",
            "Data início:" : "01/01/2014",
            "Data término:" : "12/11/2014",
            "_id" : "56b8ec92f4ea49ec57c7d98f"
        },
        {
            "Tabela:" : "Outras Atividades Administrativas e de Representação",
            "Descrição:" : "Preenchimento de CV Lattes",
            "Órgão emissor" : "INF",
            "Órgão servido" : "INF",
            "Portaria" : "NA",
            "CHA:" : "8",
            "Data início:" : "01/01/2014",
            "Data término:" : "12/11/2014",
            "_id" : "56b8ec92f4ea49ec57c7d98e"
        },
        {
            "Tabela:" : "Outras Atividades Administrativas e de Representação",
            "Descrição:" : "PARTICIPAÇÕES EM REUNIÕES DO CD 2014",
            "Órgão emissor" : "INF",
            "Órgão servido" : "INF",
            "Portaria" : "NA",
            "CHA:" : "12",
            "Data início:" : "01/01/2014",
            "Data término:" : "31/12/2014",
            "_id" : "56b8ec92f4ea49ec57c7d98d"
        }
    ],
    "Atividades acadêmicas especiais" : [
        {
            "Tabela:" : "Membro de banca de defesa de monografia, projeto final de curso e outros tipos de bancas",
            "CHA:" : "4",
            "Data início:" : "17/07/2014",
            "Data término:" : "17/07/2014",
            "Descrição Complementar:" : "Banca de PFC de Amanda Lira - Experiência de Implantação de Processos numa Fábrica de Software",
            "Descrição da Clientela:" : "INF",
            "_id" : "56b8ec92f4ea49ec57c7d998"
        },
        {
            "Tabela:" : "Membro de banca de defesa de monografia, projeto final de curso e outros tipos de bancas",
            "CHA:" : "4",
            "Data início:" : "16/12/2014",
            "Data término:" : "16/12/2014",
            "Descrição Complementar:" : "Banca de PFC de Igor Alves - Um estudo de caso sobre Engenharia de Requisitos em desenvolvimento de software baseado no Scrum",
            "Descrição da Clientela:" : "INF",
            "_id" : "56b8ec92f4ea49ec57c7d997"
        },
        {
            "Tabela:" : "Membro de banca de defesa de monografia, projeto final de curso e outros tipos de bancas",
            "CHA:" : "4",
            "Data início:" : "16/12/2014",
            "Data término:" : "16/12/2014",
            "Descrição Complementar:" : "Banca de PFC de Farid Junior - Um estudo de caso sobre implantação de Cobit em uma microempresa",
            "Descrição da Clientela:" : "INF",
            "_id" : "56b8ec92f4ea49ec57c7d996"
        },
        {
            "Tabela:" : "Membro de banca de defesa de monografia, projeto final de curso e outros tipos de bancas",
            "CHA:" : "4",
            "Data início:" : "16/12/2014",
            "Data término:" : "16/12/2014",
            "Descrição Complementar:" : "Banca de PFC de Ariel Souza - Estudo de Caso: Implantação de Processos da ITIL em uma Microempresa",
            "Descrição da Clientela:" : "INF",
            "_id" : "56b8ec92f4ea49ec57c7d995"
        },
        {
            "Tabela:" : "Membro de banca de defesa de monografia, projeto final de curso e outros tipos de bancas",
            "CHA:" : "4",
            "Data início:" : "16/12/2014",
            "Data término:" : "16/12/2014",
            "Descrição Complementar:" : "Banca de PFC de Deborah Ulacia - Definição de Processos na Fábrica de Software do INF",
            "Descrição da Clientela:" : "INF",
            "_id" : "56b8ec92f4ea49ec57c7d994"
        },
        {
            "Tabela:" : "Membro de corpo de júri - Concursos nacionais",
            "CHA:" : "12",
            "Data início:" : "03/07/2014",
            "Data término:" : "03/08/2014",
            "Descrição Complementar:" : "Membro do Comitê Julgador do Concurso Nacional de Teses e Dissertações em Qualidade de Software",
            "Descrição da Clientela:" : "SBC",
            "_id" : "56b8ec92f4ea49ec57c7d993"
        }
    ],
    "Atividades de qualificação" : [
        {
            "Tabela:" : "Docente em licença para capacitação (Artigo 87, Lei N.8112)",
            "Descrição:" : "Licença para Capacitação na área de Gestão de Serviços de Tecnologia da Informação, com fundamento no Artigo 87, da Lei nº 9527, de 10/12/97.",
            "CHA:" : "440",
            "Data de início:" : "15/03/2014",
            "Data de término:" : "14/06/2014",
            "_id" : "56b8ec92f4ea49ec57c7d99a"
        },
        {
            "Tabela:" : "Participação em Congressos, Seminários, Encontros, Jornadas etc.",
            "Descrição:" : "CNPq - 5º Encontro Técnico do RHAE Pesquisador na Empresa Brasília-DF",
            "CHA:" : "16",
            "Data de início:" : "11/11/2014",
            "Data de término:" : "12/11/2014",
            "_id" : "56b8ec92f4ea49ec57c7d999"
        }
    ],
    "Atividades de extensão" : [
        {
            "Tabela:" : "Palestrante, conferencista ou participante em mesa redonda em evento científico, cultural ou artístico - Evento regional ou local",
            "CHA:" : "4",
            "Data início:" : "29/04/2014",
            "Data término:" : "29/04/2014",
            "Descrição da atividade:" : "Palestra sobe Qualidade de Software com MPS.BR",
            "Descrição da clientela:" : "Membros da comunidade acadêmica da Universo em Goiânia-GO",
            "_id" : "56b8ec92f4ea49ec57c7d99b"
        }
    ],
    "Atividades em projetos" : [
        {
            "Título do Projeto:" : "ESTRATÉGIAS E MÉTODOS PARA MELHORIA DE SOFTWARE",
            "Tabela:" : "Coordenador de projeto de pesquisa aprovado sem financiamento",
            "Unidade Responsável:" : "INF - Instituto de Informática",
            "Tipo:" : "Projeto de Pesquisa",
            "Situação:" : "Em andamento",
            "Função:" : "Coordenador",
            "Financiado:" : "Não",
            "CHA:" : "400",
            "Data Início:" : "04/01/2010",
            "Data Término:" : "31/12/2015",
            "_id" : "56b8ec92f4ea49ec57c7d99d"
        },
        {
            "Título do Projeto:" : "Simpósio Brasileiro de Sistemas de Informação",
            "Tabela:" : "Participante de projeto de extensão/cultura cadastrado na PROEC",
            "Unidade Responsável:" : "INF - Instituto de Informática",
            "Tipo:" : "Projeto de Extensão",
            "Situação:" : "Em andamento",
            "Função:" : "Participante",
            "Financiado:" : "Não",
            "CHA:" : "100",
            "Data Início:" : "30/06/2014",
            "Data Término:" : "18/08/2014",
            "_id" : "56b8ec92f4ea49ec57c7d99c"
        }
    ],
    "Atividades de orientação" : [
        {
            "Título do trabalho:" : "ESTUDO DE CASO: IMPLANTAÇÃO DE PROCESSOS DA ITIL EM UMA MICROEMPRESA",
            "Tabela:" : "Aluno orientado em projeto de final de curso",
            "Orientando:" : "ARIEL SOUZA SILVA",
            "Matrícula:" : "100353",
            "Função do docente:" : "Orientador",
            "Nível:" : "Graduação",
            "Curso:" : "SISTEMAS DE INFORMAÇÃO",
            "IES:" : "UNIVERSIDADE FEDERAL DE GOIAS",
            "CHA:" : "1",
            "Data início:" : "01/08/2014",
            "Data término:" : "31/12/2014",
            "Tipo Orientação:" : "PRESENCIAL",
            "_id" : "56b8ec92f4ea49ec57c7d9a2"
        },
        {
            "Título do trabalho:" : "UM ESTUDO DE CASO SOBRE ENGENHARIA DE REQUISITOS EM DESENVOLVIMENTO DE SOFTWARE BASEADO NO SCRUM",
            "Tabela:" : "Aluno orientado em projeto de final de curso",
            "Orientando:" : "IGOR ALVES DE OLIVEIRA",
            "Matrícula:" : "096532",
            "Função do docente:" : "Orientador",
            "Nível:" : "Graduação",
            "Curso:" : "SISTEMAS DE INFORMAÇÃO",
            "IES:" : "UNIVERSIDADE FEDERAL DE GOIAS",
            "CHA:" : "1",
            "Data início:" : "01/01/2014",
            "Data término:" : "31/12/2014",
            "Tipo Orientação:" : "PRESENCIAL",
            "_id" : "56b8ec92f4ea49ec57c7d9a1"
        },
        {
            "Título do trabalho:" : "UM ESTUDO DE CASO SOBRE IMPLANTAÇÃO DE COBIT EM UMA MICROEMPRESA",
            "Tabela:" : "Aluno orientado em projeto de final de curso",
            "Orientando:" : "FARID IBRAIM CHAUD JUNIOR",
            "Matrícula:" : "100358",
            "Função do docente:" : "Orientador",
            "Nível:" : "Graduação",
            "Curso:" : "SISTEMAS DE INFORMAÇÃO",
            "IES:" : "UNIVERSIDADE FEDERAL DE GOIAS",
            "CHA:" : "1",
            "Data início:" : "01/08/2014",
            "Data término:" : "31/12/2014",
            "Tipo Orientação:" : "PRESENCIAL",
            "_id" : "56b8ec92f4ea49ec57c7d9a0"
        },
        {
            "Título do trabalho:" : "DEFINIÇÃO DE PROCESSOS NA FABRICA DE SOFTWARE DO INSTITUTO DE INFORMÁTICA DA UFG",
            "Tabela:" : "Aluno orientado em projeto de final de curso",
            "Orientando:" : "DEBORAH SANTANA ULACIA",
            "Matrícula:" : "110977",
            "Função do docente:" : "Orientador",
            "Nível:" : "Graduação",
            "Curso:" : "CIÊNCIAS DA COMPUTAÇÃO",
            "IES:" : "UNIVERSIDADE FEDERAL DE GOIAS",
            "CHA:" : "1",
            "Data início:" : "01/08/2014",
            "Data término:" : "31/12/2014",
            "Tipo Orientação:" : "PRESENCIAL",
            "_id" : "56b8ec92f4ea49ec57c7d99f"
        },
        {
            "Título do trabalho:" : "UM ESTUDO DE CASO SOBRE A INFLUÊNCIA DA REVISÃO DE CÓDIGO NA SEGURANÇA DE SOFTWARE",
            "Tabela:" : "Aluno orientado em programa de iniciação científica(PIBIC/PIVIC/PROLICEN/PICME-OBMEP)",
            "Orientando:" : "VINICIUS ASSUNÇÃO MABONI",
            "Matrícula:" : "110267",
            "Função do docente:" : "Orientador",
            "Nível:" : "Graduação",
            "Curso:" : "ENGENHARIA DE SOFTWARE",
            "IES:" : "UNIVERSIDADE FEDERAL DE GOIAS",
            "CHA:" : "32",
            "Data início:" : "01/01/2014",
            "Data término:" : "30/08/2014",
            "Tipo Orientação:" : "PRESENCIAL",
            "_id" : "56b8ec92f4ea49ec57c7d99e"
        }
    ],
    "Pós-Graduação Lato Sensu/Sctricto Sensu (RDC)" : [],
    "RGCG - Regime de Graduação Semestral" : [
        {
            "Curso" : "SISTEMAS DE INFORMAÇÃO",
            "Disciplina" : "PROJETO FINAL DE CURSO 1",
            "CHA" : "32",
            "Ano" : "2014",
            "Sem" : "1",
            "Turma" : "H",
            "Sub" : "",
            "Nº alunos" : "1",
            "Nº sub" : "0",
            "CHT" : "32",
            "CHP" : "0",
            "CHAC" : "0",
            "Conjug" : "NÃO",
            "_id" : "56b8ec92f4ea49ec57c7d9a7"
        },
        {
            "Curso" : "CIÊNCIAS DA COMPUTAÇÃO",
            "Disciplina" : "PROJETO FINAL DE CURSO 1 NC",
            "CHA" : "64",
            "Ano" : "2014",
            "Sem" : "2",
            "Turma" : "B",
            "Sub" : "",
            "Nº alunos" : "1",
            "Nº sub" : "0",
            "CHT" : "0",
            "CHP" : "64",
            "CHAC" : "",
            "Conjug" : "NÃO",
            "_id" : "56b8ec92f4ea49ec57c7d9a6"
        },
        {
            "Curso" : "ENGENHARIA DE SOFTWARE",
            "Disciplina" : "EXPERIMENTAÇÃO EM ENGENHARIA DE SOFTWARE",
            "CHA" : "64",
            "Ano" : "2014",
            "Sem" : "2",
            "Turma" : "A",
            "Sub" : "",
            "Nº alunos" : "44",
            "Nº sub" : "0",
            "CHT" : "32",
            "CHP" : "32",
            "CHAC" : "90",
            "Conjug" : "NÃO",
            "_id" : "56b8ec92f4ea49ec57c7d9a5"
        },
        {
            "Curso" : "ENGENHARIA DE SOFTWARE",
            "Disciplina" : "INTEGRAÇÃO 2",
            "CHA" : "64",
            "Ano" : "2014",
            "Sem" : "2",
            "Turma" : "A",
            "Sub" : "",
            "Nº alunos" : "38",
            "Nº sub" : "0",
            "CHT" : "0",
            "CHP" : "64",
            "CHAC" : "90",
            "Conjug" : "NÃO",
            "_id" : "56b8ec92f4ea49ec57c7d9a4"
        },
        {
            "Curso" : "SISTEMAS DE INFORMAÇÃO",
            "Disciplina" : "PROJETO FINAL DE CURSO 1",
            "CHA" : "32",
            "Ano" : "2014",
            "Sem" : "2",
            "Turma" : " C ",
            "Sub" : "",
            "Nº alunos" : "3",
            "Nº sub" : "0",
            "CHT" : "32",
            "CHP" : "0",
            "CHAC" : "0",
            "Conjug" : "SIM",
            "_id" : "56b8ec92f4ea49ec57c7d9a3"
        }
    ],
    "Afastamento" : [
        {
            "Tabela:" : "",
            "Processo:" : "23070 - 25667 - 2013 - 10",
            "Descrição:" : "LICENÇA PARA CAPACITAÇÃO, POR TRÊS MÊS (ES), A PARTIR DE 15/03/2014, COM FUNDAMENTO NO ARTIGO 87, DA LEI Nº 9527, DE 10/12/97.",
            "Motivo:" : "Licença capacitação",
            "CHA:" : "",
            "Data de início:" : "15/03/2014",
            "Data de término:" : "14/06/2014",
            "_id" : "56b8ec92f4ea49ec57c7d9a8"
        }
    ],
    "Dados do docente" : [
        {
            "Nome:" : "JULIANO LOPES DE OLIVEIRA",
            "Matrícula SIAPE:" : "1220405",
            "Unidade:" : "INSTITUTO DE INFORMÁTICA",
            "Titulação:" : "Doutor",
            "Regime de trabalho:" : "40",
            "Classe:" : "Associado",
            "Nível:" : "004",
            "CH contratada:" : "1760",
            "CH executada:" : "1760",
            "E-mail:" : "juliano@inf.ufg.br",
            "Data ingresso na UFG:" : "25/03/1997",
            "Data ingresso serviço no público:" : "25/03/1997",
            "_id" : "56b8ec92f4ea49ec57c7d9a9"
        }
    ],
    "__v" : 0
};

score.calculateScore(testRadoc);
