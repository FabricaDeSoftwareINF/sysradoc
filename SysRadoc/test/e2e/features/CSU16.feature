#language: pt

Funcionalidade: Visualizar Status do processo Quadro Sum�rio
Como usu�rio devidamente logado.
Quero abrir o quadro sum�rio de um determinado docente.
Para que eu possa visualizar as notas de um determinado docente.

Contexto:
Dado que estou devidamente logado no sistema e eu tenha acesso a funcionalidade de visualizar quadro sum�rio. 
Dado que o docente j� possui um Radoc.
E nota da secretaria ou nota dos discentes inseridas no sistema.
E que eu tenha permiss�o para executar tal fun��o
Eu gostaria de ter acesso ao quadro sum�rio para acompanhar o andamento da avalia��o e conferir as notas do docente em quest�o avaliado.

cen�rio 1: Visualizando Quadro Sum�rio
Dado que a tela de pesquisa de quadro sum�rio est� aberta.
Quando eu inserir os dados da pesquisa.
E procurar pelos mesmos.
E selecionar um determinado docente retornado da pesquisa, que j� tenha um quadro sum�rio gerado.
Ent�o o software ir� abrir o quadro sum�rio do docente informado, contendo as notas j� processada at� o momento e as apresentar� na tela.
Mas se o docente n�o possuir notas inseridas no sistema at� o momento da solicita��o.
Ent�o o sistema ir� informar que o docente solicitado <mensagem_radoc>