#language: pt

Funcionalidade: Visualizar Lista de Processos Concluídos
	Como qualquer usuário
	Quero abrir para visualizar a lista de processos concluídos dos docentes
	Para que eu possa acompanhar os processos que estão com status de concluídos.

	Contexto:
		Dado que eu estou logado no sistema
		E na tela de pesquisa de processos concluídos
		Eu gostaria de acompanhar os processos concluídos.

	Cenario: Visualizar Lista de Processos concluídos
		Quando eu clicar no botão "Pesquisar" e digitar o nome docente.
		Entao o software vai apresentar a lista de processos concluídos do docente até a data atual.

	Cenario: Sem Processos Concluidos
		Quando eu clicar no botão "Pesquisar" e um processo concluído.
		E se não houver processos concluídos até a data de pesquisa.
		Entao o sistema irá informar: "Sem Processos concluidos."
