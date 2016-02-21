#language: pt

Funcionalidade: Login de Usuário
	Como usuário qualquer
	Quero me logar no sistema
Para que eu possa ter acesso as funcionalidades disponíveis para o usuário cadastrado

	Contexto:
		Dado que estou na página de login 

	Cenário 01: Login de usuário qualquer
		Dado que sou um usuário cadastrado
		E que preenchi corretamente os dados login: joaquina@intituto.com.br
		E senha: joaquina123
		Quando eu clicar no botão “Login”
		Então o sistema irá entrar na página principal
E me dar acesso às funcionalidades referentes ao meu cadastro 

	Cenário 02: Login/senha inválido
		Dado que sou um usuário qualquer que não está cadastrado
E que preenchi incorretamente os dados email: joaquina@instituto.kom ou senha: joaquina124
		Quando eu clicar no botão “Login”
Então o sistema irá informar que o login/senha está inválido
E ir para a página de login