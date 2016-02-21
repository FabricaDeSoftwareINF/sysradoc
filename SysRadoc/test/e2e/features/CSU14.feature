#language: pt

Funcionalidade: Visualizar Lista de Processos em andamento
Como qualquer usuário
Quero visualizar a lista de processos em andamento dos docentes.
Para que eu possa acompanhar os processos que ainda se encontram em andamento.

Contexto:
Dado que eu estou logado no sistema.
E na tela de pesquisa de processos.
Eu gostaria de acompanhar os processos em andamento.

cenário 1: Visualizar Lista de Processos em andamento
Quando eu clicar no botão pesquisar e pesquisar um determinado docente
Então o software irá apresentar todos os processos em andamentos daquele usuário até a data atual.

cenário 2: Sem Processos em Andamento
	Quando eu clicar em pesquisar um determinado processo em andamento
E se não houver processos em andamento até a data de pesquisa.
Então o sistema irá informar  <Sem_Processo_em_andamento>