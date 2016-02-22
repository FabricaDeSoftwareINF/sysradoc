#language: pt

Funcionalidade: Gerar e Visualizar Quadro sumário
	Como a CAD
	Quero instanciar um quadro sumário para um docente
	Para armazenar as informações de cada docente

	Contexto:
		Dado que estou logado no sistema
		E que faço parte da CAD
		Eu gostaria de gerenciar as informações básicas de um docente

	Cenario:  Gerar Quadro Sumário
		Dado que estou logado como CAD
		Quando as informações do Radoc do docente terminarem de ser convertidas
		Entao o sistema irá gerar o quadro sumário automaticamente
		E preenchê-lo com as informações convertidas pelo requisito RF06

	Cenario: Visualizar Quadro Sumário
		Dado que estou logado como qualquer usuário
		Quando o Quadro Sumário de determinado docente estiver pronto
		Entao será possível visualizar o Quadro Sumário com as informações contidas nele
