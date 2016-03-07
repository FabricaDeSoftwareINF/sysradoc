#language: pt

RF27 - Deliberar Parecer sobre o processo 

Funcionalidade: Deliberar Parecer sobre o processo 
	Como o Conselho Diretor
	Quero Deliberar o parecer de um processo
	Para que eu possa concluir um processo ou uma etapa do Estágio Probatório

	Contexto:
		Dado que estou devidamente autorizado no sistema
		E que o status do processo é “Aguardando deliberação do Conselho Diretor”

Cenário: Concordando com o parecer da CAD (conclusão de processo)
	Dado que eu estou com o Parecer da CAD aberto
	Quando eu clicar em Deliberar Parecer
	Então o software deverá salvar uma cópia do Parecer da CAD como Parecer do Conselho Diretor
	E notificar os interessados que o “Processo foi Deliberado”
	E mudar o status do processo para “Concluído: Aguardando Fechamento”

Cenário: Concordando com o parecer da CAD (etapa do Estágio Probatório)
	Dado que eu estou com o Parecer da CAD aberto
	Quando eu clicar em Deliberar Parecer
	Então o software deverá salvar uma cóia do Parecer da CAD como Parecer do Conselho Diretor
	E notificar os interessados que o “Etapa do Estágio Probatório foi Concluída”
	E mudar o status do processo para “Etapa Concluída”

Cenário: Revisando o parecer da CAD (conclusão de processo)
	Dado que eu editei o parecer da CAD
	E salvei o novo Parecer do Conselho Diretor
	E que estou com o novo Parecer do Conselho Diretor aberto
	Quando eu clicar em Deliberar Parecer
	Então o software deverá notificar aos interessados que o Processo foi Deliberado
	E mudar o status do processo para “Concluído: Aguardando Fechamento”

Cenário: Revisando o parecer da CAD (etapa do Estágio Probatório)
	Dado que eu editei o parecer da CAD
	E salvei o novo Parecer do Conselho Diretor
	E que estou com o novo Parecer do Conselho Diretor aberto
	Quando eu clicar em Deliberar Parecer
	Então o software deverá notificar aos interessados que a “Etapa do Estágio Probatório foi Concluída”
	E mudar o status do processo para “Etapa Concluída”