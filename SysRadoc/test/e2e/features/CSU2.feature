#language: pt

Funcionalidade: Login de Usu�rio
	Como usu�rio qualquer
	Quero me logar no sistema
Para que eu possa ter acesso as funcionalidades dispon�veis para o usu�rio cadastrado

	Contexto:
		Dado que estou na p�gina de login 

	Cen�rio 01: Login de usu�rio qualquer
		Dado que sou um usu�rio cadastrado
		E que preenchi corretamente os dados login: joaquina@intituto.com.br
		E senha: joaquina123
		Quando eu clicar no bot�o �Login�
		Ent�o o sistema ir� entrar na p�gina principal
E me dar acesso �s funcionalidades referentes ao meu cadastro 

	Cen�rio 02: Login/senha inv�lido
		Dado que sou um usu�rio qualquer que n�o est� cadastrado
E que preenchi incorretamente os dados email: joaquina@instituto.kom ou senha: joaquina124
		Quando eu clicar no bot�o �Login�
Ent�o o sistema ir� informar que o login/senha est� inv�lido
E ir para a p�gina de login