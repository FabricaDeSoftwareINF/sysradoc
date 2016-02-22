#language: pt

Funcionalidade: Abrir processo de promoção na carreira de magistério
	Como secretaria
	Quero abrir um processo de promoção na carreira de magistério
	Para acompanhar e registrar os dados do processo e ter um controle maior sobre as informações.

	Contexto:
		Dado que o docente fez a solicitação para abertura do processo
		E que o docente se encontra no nivel correspondente para avançar na promoção.
		E já ter sido aprovado em estágio probatório
		E ter cumprido o intervalo de no minimo dois anos no nível da classe atual
		Eu gostaria de abrir o processo do docente

	Cenario: "Pesquisar" processos por docente
		Dado que estou na pagina de "Pesquisar" docentes podendo filtrar por nome
		Quando clicar em "Pesquisar"
		Entao o sistema irá me listar os docentes de acordo com o filtro de pesquisa

	Cenario: "Pesquisar" processo por pedidos
		Dado que estou na pagina de "Pesquisar" pedidos de abertura de processos, podendo filtrar por nome do docente
		Quando clicar em "Pesquisar"
		Entao o sistema irá me listar os pedidos de processos de acordo com o filtro de pesquisa

	Cenario: Abrir processo de promoção
		Dado que a pesquisa já tenha sido efetuada
		E que encontrei o pedido na pesquisa
		Quando eu clicar em abrir processo de promoção
		Entao o sistema irá dar a opção para confirmar e atualizar, caso necessário, as informações deste docente (Nome completo, ano de ingresso na UFG, matrícula da UFG)
		E o validará se o radoc se encontra atualizado
		E caso esteja desatualizado, deverá enviar um email para o docente solicitando a atualização.
		E deverá criar um processo com status em andamento.
