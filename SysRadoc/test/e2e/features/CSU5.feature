#language: pt

Funcionalidade: Atualizar Usu�rio
	Como a secretaria
	Quero atualizar os dados de um usu�rio j� cadastrado
	Para que eu mantenha atualizados os dados salvos no sistema

	Contexto:
		Dado que estou devidamente autorizada no sistema
		E que fa�o parte da secretaria
E que estou na p�gina de usu�rios cadastrados
Quando eu clicar sobre um nome de usu�rio, apare�a a op��o �Atualizar Dados�

	Cen�rio 1: Atualizar cadastro
E preencher os campos de dados a serem atualizados papel: CAD, nome: Jo�o, matr�cula: 54321, e-mail: joao@instituto.com.br, classe: B e n�vel: 2
E clicar em Atualizar Dados
		Ent�o o sistema ir� informar que o cadastro foi atualizado com sucesso.
		
	Cen�rio 2: Dado inv�lido
E preencher os campos de dados a serem atualizados nome: Jo@quina ou classe: G ou n�vel: 13
Ent�o o sistema ir� informar que um dos dados est� incorreto
		E apontar o dado errado