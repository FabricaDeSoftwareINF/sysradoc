#language: pt

Funcionalidade: Visualizar Lista de Processos em andamento
Como qualquer usu�rio
Quero visualizar a lista de processos em andamento dos docentes.
Para que eu possa acompanhar os processos que ainda se encontram em andamento.

Contexto:
Dado que eu estou logado no sistema.
E na tela de pesquisa de processos.
Eu gostaria de acompanhar os processos em andamento.

cen�rio 1: Visualizar Lista de Processos em andamento
Quando eu clicar no bot�o pesquisar e pesquisar um determinado docente
Ent�o o software ir� apresentar todos os processos em andamentos daquele usu�rio at� a data atual.

cen�rio 2: Sem Processos em Andamento
	Quando eu clicar em pesquisar um determinado processo em andamento
E se n�o houver processos em andamento at� a data de pesquisa.
Ent�o o sistema ir� informar  <Sem_Processo_em_andamento>