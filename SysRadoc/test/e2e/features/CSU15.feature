#language: pt

Funcionalidade: Visualizar Lista de Processos Conclu�dos
Como qualquer usu�rio
Quero abrir para visualizar a lista de processos conclu�dos dos docentes.
Para que eu possa acompanhar os processos que est�o com status de conclu�dos.

Contexto:
Dado que eu estou logado no sistema 
E na tela de pesquisa de processos conclu�dos.
Eu gostaria de acompanhar os processos conclu�dos.

cen�rio 1: Visualizar Lista de Processos Conclu�dos
Quando eu clicar no bot�o pesquisar e digitar o nome docente.
Ent�o o software vai apresentar a lista de processos conclu�dos do docente at� a data atual.

cen�rio 2: Sem Processos Concluidos
	Quando eu clicar no bot�o  pesquisar e um processo conclu�do.
E se n�o houver processos conclu�dos at� a data de pesquisa.
Ent�o o sistema ir� informar  <Sem_Processos_concluidos>