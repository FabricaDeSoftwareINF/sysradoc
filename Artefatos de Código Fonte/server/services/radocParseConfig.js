/*
    PDFParse to radoc config
    header: nome da seção
    sectionType: tipo da sessão ('table' ou 'linear')
    nextSection: nome da próxima seção
    afterHeaderSkip: quantidade de linhas a pular para início dos dados (contando com a header)
    labels: campos da secção

    /!\ ATENÇÃO /!\
    Este arquivo de configuração também reflete como os Schemas do mongoose são criados
    Alterar algo aqui significa também mudar a modelagem do banco.
*/

exports.sections = [
    {
        header: "Dados do docente",
        sectionType: "linear",
        nextSection: "Afastamento",
        singleLineEnd: true,
        afterHeaderSkip: 1,
        labels: [
            "Nome:",
            "Matrícula SIAPE:",
            "Unidade:",
            "Titulação:",
            "Regime de trabalho:",
            "Classe:",
            "Nível:",
            "CH contratada:",
            "CH executada:",
            "E-mail:",
            "Data ingresso na UFG:",
            "Data ingresso serviço no público:"
        ]
    },
    {
        header: "Afastamento",
        sectionType: "linear",
        nextSection: "Atividades de ensino",
        afterHeaderSkip: 1,
        labels: [
            "Tabela:",
            "Processo:",
            "Descrição:",
            "Motivo:",
            "CHA:",
            "Data de início:",
            "Data de término:"
        ]
    },
    {
        header: "Atividades de ensino",
        sectionType: "table",
        nextSection: "Atividades de orientação",
        afterHeaderSkip: 2,
        labels: [
            "Curso",
            "Disciplina",
            "CHA",
            "Ano",
            "Sem",
            "Turma",
            "Sub",
            "Nº alunos",
            "Nº sub",
            "CHT",
            "CHP",
            "CHAC",
            "Conjug"
        ]
    },
    {
        header: "Atividades de orientação",
        sectionType: "linear",
        nextSection: "Atividades em projetos",
        afterHeaderSkip: 1,
        labels: [
            "Título do trabalho:",
            "Tabela:",
            "Orientando:",
            "Matrícula:",
            "Função do docente:",
            "Nível:",
            "Curso:",
            "IES:",
            "CHA:",
            "Data início:",
            "Data término:",
            "Tipo Orientação:"
        ]
    },
    {
        header: "Atividades em projetos",
        sectionType: "linear",
        nextSection: "Atividades de extensão",
        afterHeaderSkip: 1,
        labels: [
            "Título do Projeto:",
            "Tabela:",
            "Unidade Responsável:",
            "Tipo:",
            "Situação:",
            "Função:",
            "Financiado:",
            "CHA:",
            "Data Início:",
            "Data Término:"
        ]
    },
    {
        header: "Atividades de extensão",
        sectionType: "linear",
        nextSection: "Atividades de qualificação",
        afterHeaderSkip: 1,
        labels: [
            "Tabela:",
            "CHA:",
            "Data início:",
            "Data término:",
            "Descrição da atividade:",
            "Descrição da clientela:"
        ]
    },
    {
        header: "Atividades de qualificação",
        sectionType: "linear",
        nextSection: "Atividades acadêmicas especiais",
        afterHeaderSkip: 1,
        labels: [
            "Tabela:",
            "Descrição:",
            "CHA:",
            "Data de início:",
            "Data de término:"
        ]
    },
    {
        header: "Atividades acadêmicas especiais",
        sectionType: "linear",
        nextSection: "Atividades administrativas",
        afterHeaderSkip: 1,
        labels: [
            "Tabela:",
            "CHA:",
            "Data início:",
            "Data término:",
            "Descrição Complementar:",
            "Descrição da Clientela:"
        ]
    },
    {
        header: "Atividades administrativas",
        sectionType: "linear",
        nextSection: "Produtos",
        afterHeaderSkip: 1,
        labels: [
            "Tabela:",
            "Descrição:",
            "Órgão emissor",
            "Órgão servido",
            "Portaria",
            "CHA:",
            "Data início:",
            "Data término:"
        ]
    },
    {
        header: "Produtos",
        sectionType: "linear",
        nextSection: "",
        afterHeaderSkip: 1,
        labels: [
            "Descrição do produto:",
            "Título do produto:",
            "Autoria:",
            "Associação do produto:",
            "Projeto associado:",
            "Veiculação:",
            "Local:",
            "Data:",
            "Ano de publicação:",
            "Página inicial:",
            "Página final:",
            "Número de páginas:",
            "Nº da patente:",
            "Editora:"
        ]
    },
];
