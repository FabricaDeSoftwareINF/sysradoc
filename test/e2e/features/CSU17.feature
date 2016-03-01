#language: pt

Funcionalidade: Associar Relator
	Como integrante da CAD
	Quero associar me associar como relator a um processo
	Para prosseguir com o processo de avaliação do Docente

	Contexto:
		Dado que o processo de avaliação foi aberto
		E que o Radoc já tenha sido inserido

	Cenario: Alocando Relatores
		Quando selecionar um processo com estado "Aguardando relator"
		E clicar em "Relatar Processo"
		Entao eu passarei a ser o relator do processo
		E o processo irá ser pontuado
