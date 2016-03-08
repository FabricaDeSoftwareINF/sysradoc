#language: pt

RF25 - Editar Parecer da CAD (Conselho Diretor)

Funcionalidade: Editar Parecer da CAD (Conselho Diretor)
	Como o Conselho Diretor
	Quero poder editar o parecer postado pela CAD
	Para que o Parecer do Conselho Diretor seja criado

	Contexto:
		Dado que estou devidamente autorizado no sistema
		Que faço parte do Conselho Diretor
		E que o parecer da CAD já tenha sido postado no sistema.
		E que o status do processo seja “Aguardando Deliberação do Conselho Diretor”

Cenário: Editar o Parecer
	Dado que estou com o parecer da CAD aberto
	Quando eu clicar em “Editar”
	Então o software irá abrir o Parecer da CAD em um editor de texto

Cenário: Salvar o Parecer
	Dado que já editei o Parecer da CAD
	Quando eu clicar em “Salvar”
	Então o software irá salvar este parecer como o Parecer do Conselho Diretor

Cenário: Cancelar o Parecer
	Dado que já editei o Parecer da CAD
	Quando eu clicar em “Cancelar”
	Então o software irá descartar as mudanças no Parecer da CAD