#language: pt

Funcionalidade: Solicitar Processo de Promoção na Carreira de Magistério

Como docente
	Quero Solicitar abertura de processo de Processo de Promoção de Carreira
	
	Contexto:
		Dado que estou devidamente autenticado no sistema
		E que estou na página de Solicitação de Abertura

	Cenário 01: Solicitar Processo de Promoção na Carreira de Magistério
Quando eu clicar na opção de Solicitar Promoção de Magistério;
Então o software envia um e-mail pré configurado para a secretária;
E irá avisar que o e-mail foi enviado com sucesso;
Então o software salva no banco de dados que existe um processo de carreira de magistério aberto;


Cenário 02: Atualização do processo
Dado que eu estou devidamente autenticado no sistema
Então o software deverá verificar se o processo foi concluido
E irá mostrar uma notificação na tela quando eu entrar no sistema 