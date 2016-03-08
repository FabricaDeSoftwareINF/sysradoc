#language: pt

Funcionalidade: Visualizar Lista de Processos em andamento
	Como qualquer usuário
	Quero visualizar a lista de processos em andamento dos docentes ou a minha própria lista
	Para que eu possa acompanhar os processos que ainda se encontram em andamento.

	Contexto:
	Dado que eu estou logado no sistema
	E na tela de pesquisa de processos
	Então eu gostaria de acompanhar os processos em andamento

	Cenario: Visualizar Lista de Processos em andamento
		Quando eu clicar no botão "Pesquisar" e "Pesquisar" um determinado docente
		Entao o software irá apresentar todos os processos em andamento daquele usuário até a data atual

	Cenario: Sem Processos em Andamento
		Quando eu clicar em "Pesquisar" um determinado processo em andamento
		E se não houver processos em andamento até a data de pesquisa
		Entao o sistema irá informar "Sem Processo em andamento!"
