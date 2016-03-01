#language: pt

Funcionalidade: Solicitar Processo de Promoção na Carreira de Magistério
	Como um docente
	Eu quero solicitar a minha própria promoção
	Para que eu possa crescer na carreira de magistério na UFG.

	Contexto:
		Dado que estou devidamente autenticado no sistema
		E que estou na página de Solicitação de Abertura

	Cenario: Solicitar Processo de Promoção na Carreira de Magistério
		Quando eu clicar na opção de "Solicitar Promoção de Magistério"
		Entao o software envia um e-mail pré configurado para a secretária
		E irá avisar que o e-mail foi enviado com sucesso
		Entao o software salva no banco de dados que existe um processo de carreira de magisterio aberto

	Cenario: Atualização do processo
		Dado que eu estou devidamente autenticado no sistema
		Entao o software deverá verificar se o processo foi concluido
		E irá mostrar uma notificação na tela quando eu entrar no sistema
