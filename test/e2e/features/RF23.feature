#language: pt

RF23 - Alterar N�vel do Docente(Progress�o)

Funcionalidade: Mudar N�vel do Docente(Progre��o)
	Como a Secretaria 
	Quero mudar o n�vel do docente
	Para atualizar o n�vel atual do docente

	Contexto:
		Dado que estou na tela de mudan�a de classe e n�vel do Docente
		E que alterei o campo N�vel

Cen�rio: Alterar Classe sem alterar o n�vel
	Quando eu clicar em �Salvar Altera��es�
	Ent�o o sistema ira mudar o N�vel para o novo N�vel


Cen�rio: Cancelar Altera�o
	Quando eu clicar em �Cancelar altera��o�
	Ent�o o sistema ir� descartar as mudan�as
