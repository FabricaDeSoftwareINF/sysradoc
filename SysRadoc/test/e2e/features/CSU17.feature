#language: pt

Funcionalidade: Associar Relator
	Como integrante da CAD
	Quero associar me associar como relator a um processo
	Para prosseguir com o processo de avalia��o do Docente

Contexto:
	Dado que o processo de avalia��o foi aberto
E que o Radoc j� tenha sido inserido
E que o processo esteja �Aguardando relator�

Cen�rio 1: Alocando Relatores
	Quando selecionar um processo com estado �aguardando relator�
	E clicar em  �Relatar Processo�
	Ent�o eu passarei a ser o relator do processo
	E o processo ir� ser pontuado