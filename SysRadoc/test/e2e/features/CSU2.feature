#language: pt

Funcionalidade: Login de Usuário
	Como um docente
	Quero me logar no sistema
	Para que eu possa utilizar o sistema SysRadoc.

	Contexto:
		Dado que estou na página de login
		E sou um usuário cadastrado
		Eu gostaria de ter acesso ao SysRadoc para facilitação do processo de avaliação de docentes

	Cenario: Login de usuário qualquer
		Dado que estou na caixa "Login"
		E que preenchi corretamente os dados do login: joaquina@intituto.ufg.br
		E senha: joaquina123
		Quando eu clicar no botão "Login"
		Entao o sistema irá entrar na "Página principal"
		E me dar acesso às funcionalidades referentes ao meu cadastro

	Cenario: Login/senha inválido
		Dado que sou um usuário qualquer que não está cadastrado
		E que preenchi incorretamente os dados email: joaquina@instituto.ufg.br ou senha: joaquina124
		Quando eu clicar no botão "Login"
		Entao o sistema informa: "Os dados de login não conferem."
		E vai para a página de login
