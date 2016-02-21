#language: pt

Funcionalidade: Excluir Usu�rio
	Como a secretaria
	Quero excluir o cadastro de um usu�rio qualquer do sistema
Para que este usu�rio n�o mais tenha acesso ao sistema 
	
	Contexto:
		Dado que estou devidamente autorizado no sistema
		E que fa�o parte da secretaria
		E o usu�rio que ser� removido est� devidamente cadastrado no sistema
	E que estou na p�gina de gerenciamento de cadastros
	
Cen�rio 1: Confirmar Exclus�o de usu�rio
	Dado que selecionei um usu�rio qualquer
Quando eu clicar em �Excluir usu�rio�
E eu clicar em Confirmar exclus�o de usu�rio
Ent�o o sistema ir�  excluir o usu�rio do sistema
E o sistema ir� informar que o usu�rio foi deletado 
E o sistema ir� voltar para p�gina de gerenciamento de cadastro

	Cen�rio 2: Cancelar Exclus�o de usu�rio

Quando eu clicar em �Excluir usu�rio�
E eu clicar em Cancelar
Ent�o o sistema ir� para a p�gina do usu�rio
