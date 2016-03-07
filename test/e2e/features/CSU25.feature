#language: pt

RF25 - Editar Parecer da CAD (Conselho Diretor)

Funcionalidade: Editar Parecer da CAD (Conselho Diretor)
	Como o Conselho Diretor
	Quero poder editar o parecer postado pela CAD
	Para que o Parecer do Conselho Diretor seja criado

	Contexto:
		Dado que estou devidamente autorizado no sistema
		Que fa�o parte do Conselho Diretor
		E que o parecer da CAD j� tenha sido postado no sistema.
		E que o status do processo seja �Aguardando Delibera��o do Conselho Diretor�

Cen�rio: Editar o Parecer
	Dado que estou com o parecer da CAD aberto
	Quando eu clicar em �Editar�
	Ent�o o software ir� abrir o Parecer da CAD em um editor de texto

Cen�rio: Salvar o Parecer
	Dado que j� editei o Parecer da CAD
	Quando eu clicar em �Salvar�
	Ent�o o software ir� salvar este parecer como o Parecer do Conselho Diretor

Cen�rio: Cancelar o Parecer
	Dado que j� editei o Parecer da CAD
	Quando eu clicar em �Cancelar�
	Ent�o o software ir� descartar as mudan�as no Parecer da CAD