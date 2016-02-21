#language: pt

Funcionalidade: Visualizar Status do processo Quadro Sumário
Como usuário devidamente logado.
Quero abrir o quadro sumário de um determinado docente.
Para que eu possa visualizar as notas de um determinado docente.

Contexto:
Dado que estou devidamente logado no sistema e eu tenha acesso a funcionalidade de visualizar quadro sumário. 
Dado que o docente já possui um Radoc.
E nota da secretaria ou nota dos discentes inseridas no sistema.
E que eu tenha permissão para executar tal função
Eu gostaria de ter acesso ao quadro sumário para acompanhar o andamento da avaliação e conferir as notas do docente em questão avaliado.

cenário 1: Visualizando Quadro Sumário
Dado que a tela de pesquisa de quadro sumário está aberta.
Quando eu inserir os dados da pesquisa.
E procurar pelos mesmos.
E selecionar um determinado docente retornado da pesquisa, que já tenha um quadro sumário gerado.
Então o software irá abrir o quadro sumário do docente informado, contendo as notas já processada até o momento e as apresentará na tela.
Mas se o docente não possuir notas inseridas no sistema até o momento da solicitação.
Então o sistema irá informar que o docente solicitado <mensagem_radoc>