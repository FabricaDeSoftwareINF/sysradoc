#language: pt

Funcionalidade: Gerar e Visualizar Quadro sumário
	Como a CAD
	Quero instanciar um quadro sumário para um docente
	Para armazenar as informações de cada docente

	Contexto:
		Dado que estou logado no sistema
		E que faço parte da CAD

cenário 1:  Gerar Quadro Sumário
Dado que estou logado como CAD
	Quando as informações do Radoc do docente terminarem de ser convertidas
	Então o sistema irá gerar o quadro sumário automaticamente 
E preenchê-lo com as informações convertidas pelo requisito RF06 

cenário 2: Visualizar Quadro Sumário
Dado que estou logado como qualquer usuário
	Quando o Quadro Sumário de determinado docente estiver pronto
	Então será possível visualizar o Quadro Sumário com as informações contidas nele 
