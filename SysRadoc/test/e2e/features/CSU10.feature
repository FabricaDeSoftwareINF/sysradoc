#language: pt

Funcionalidade: Solicitar Processo de Promo��o na Carreira de Magist�rio

Como docente
	Quero Solicitar abertura de processo de Processo de Promo��o de Carreira
	
	Contexto:
		Dado que estou devidamente autenticado no sistema
		E que estou na p�gina de Solicita��o de Abertura

	Cen�rio 01: Solicitar Processo de Promo��o na Carreira de Magist�rio
Quando eu clicar na op��o de Solicitar Promo��o de Magist�rio;
Ent�o o software envia um e-mail pr� configurado para a secret�ria;
E ir� avisar que o e-mail foi enviado com sucesso;
Ent�o o software salva no banco de dados que existe um processo de carreira de magist�rio aberto;


Cen�rio 02: Atualiza��o do processo
Dado que eu estou devidamente autenticado no sistema
Ent�o o software dever� verificar se o processo foi concluido
E ir� mostrar uma notifica��o na tela quando eu entrar no sistema 