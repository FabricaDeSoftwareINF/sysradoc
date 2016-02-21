#language: pt

Funcionalidade: Excluir Usuário
	Como a secretaria
	Quero excluir o cadastro de um usuário qualquer do sistema
Para que este usuário não mais tenha acesso ao sistema 
	
	Contexto:
		Dado que estou devidamente autorizado no sistema
		E que faço parte da secretaria
		E o usuário que será removido está devidamente cadastrado no sistema
	E que estou na página de gerenciamento de cadastros
	
Cenário 1: Confirmar Exclusão de usuário
	Dado que selecionei um usuário qualquer
Quando eu clicar em “Excluir usuário”
E eu clicar em Confirmar exclusão de usuário
Então o sistema irá  excluir o usuário do sistema
E o sistema irá informar que o usuário foi deletado 
E o sistema irá voltar para página de gerenciamento de cadastro

	Cenário 2: Cancelar Exclusão de usuário

Quando eu clicar em “Excluir usuário”
E eu clicar em Cancelar
Então o sistema irá para a página do usuário
