#language: pt

Funcionalidade: Gerar e Visualizar Quadro sum�rio
	Como a CAD
	Quero instanciar um quadro sum�rio para um docente
	Para armazenar as informa��es de cada docente

	Contexto:
		Dado que estou logado no sistema
		E que fa�o parte da CAD

cen�rio 1:  Gerar Quadro Sum�rio
Dado que estou logado como CAD
	Quando as informa��es do Radoc do docente terminarem de ser convertidas
	Ent�o o sistema ir� gerar o quadro sum�rio automaticamente 
E preench�-lo com as informa��es convertidas pelo requisito RF06 

cen�rio 2: Visualizar Quadro Sum�rio
Dado que estou logado como qualquer usu�rio
	Quando o Quadro Sum�rio de determinado docente estiver pronto
	Ent�o ser� poss�vel visualizar o Quadro Sum�rio com as informa��es contidas nele 
