#language: pt

Funcionalidade: Atualizar Usuário
	Como a secretaria
	Quero atualizar os dados de um usuário já cadastrado
	Para que eu mantenha atualizados os dados salvos no sistema

	Contexto:
		Dado que estou devidamente autorizada no sistema
		E que faço parte da secretaria
		E que estou na página de usuários cadastrados
		Quando eu clicar sobre um nome de usuário, apareça a opção "Atualizar Dados"

	Cenario: Atualizar cadastro
		E preencher os campos de dados a serem atualizados papel: CAD, nome: João, matrícula: 54321, e-mail: joao@instituto.ufg.br, classe: B e nível: 2
		E clicar em Atualizar Dados
		Entao o sistema irá informar que o cadastro foi atualizado com sucesso.

	Cenario: Dado inválido
		E preencher os campos de dados a serem atualizados nome: Jo@quina ou classe: G ou nível: 13
		Entao o sistema irá informar que um dos dados está incorreto
		E apontar o dado errado
