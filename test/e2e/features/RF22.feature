#language: pt

RF22 - Mudar Classe do Docente(Promo��o)

Funcionalidade: Mudar Classe do Docente(Promo��o)
	Como a Secretaria 
	Quero mudar a classe do docente
	Para atualizar a classe atual do docente

	Contexto:
		Dado que estou na tela de mudan�a de classe e n�vel do Docente
		E que alterei o campo Classe

Cen�rio: Alterar Classe sem alterar o n�vel
	Dado que n�o alterei o Campo N�vel
	Quando eu clicar em �Salvar Altera��es�
	Ent�o o sistema ira mudar a Classe do Docente para a nova Classe
	E mudar o N�vel para 1

Cen�rio: Alterar a Classe alterando o N�vel
	Dado que alterei o Campo N�vel
	Quando eu clicar em �Salvar Altera��es�
	Ent�o o sistema ira mudar a Classe do Docente para a nova Classe
	E mudar o N�vel para o novo N�vel

Cen�rio: Cancelar altera��o
	Quando eu clicar em �Cancelar altera��o�
	Ent�o o sistema ir� descartar as mudan�as