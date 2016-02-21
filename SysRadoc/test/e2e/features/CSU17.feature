#language: pt

Funcionalidade: Associar Relator
	Como integrante da CAD
	Quero associar me associar como relator a um processo
	Para prosseguir com o processo de avaliação do Docente

Contexto:
	Dado que o processo de avaliação foi aberto
E que o Radoc já tenha sido inserido
E que o processo esteja “Aguardando relator”

Cenário 1: Alocando Relatores
	Quando selecionar um processo com estado “aguardando relator”
	E clicar em  “Relatar Processo”
	Então eu passarei a ser o relator do processo
	E o processo irá ser pontuado