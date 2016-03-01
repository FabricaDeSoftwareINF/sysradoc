#language: pt

Funcionalidade: Excluir Usuário
	Como a secretaria
	Quero excluir o cadastro de um usuário qualquer do sistema
	Para que este usuário n�o mais tenha acesso ao sistema

	Contexto:
		Dado que estou devidamente autorizado no sistema
		E que faço parte da secretaria
		E o usuário que será removido está devidamente cadastrado no sistema
		E que estou na página de gerenciamento de cadastros

	Cenario: Confirmar Exclusão de usuário
		Dado que selecionei um usuário qualquer
		Quando eu clicar em "Excluir usuário"
		E eu clicar em Confirmar Exclusão de usuário
		Entao o sistema irá excluir o usuário do sistema
		E o sistema irá informar que o usuário foi deletado
		E o sistema irá voltar para página de gerenciamento de cadastro

	Cenario: Cancelar Exclusão de usuário
		Quando eu clicar em "Excluir usuário"
		E eu clicar em Cancelar
		Entao o sistema irá para a página do usuário
