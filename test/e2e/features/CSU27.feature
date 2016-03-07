#language: pt

RF27 - Deliberar Parecer sobre o processo 

Funcionalidade: Deliberar Parecer sobre o processo 
	Como o Conselho Diretor
	Quero Deliberar o parecer de um processo
	Para que eu possa concluir um processo ou uma etapa do Est�gio Probat�rio

	Contexto:
		Dado que estou devidamente autorizado no sistema
		E que o status do processo � �Aguardando delibera��o do Conselho Diretor�

Cen�rio: Concordando com o parecer da CAD (conclus�o de processo)
	Dado que eu estou com o Parecer da CAD aberto
	Quando eu clicar em Deliberar Parecer
	Ent�o o software dever� salvar uma c�pia do Parecer da CAD como Parecer do Conselho Diretor
	E notificar os interessados que o �Processo foi Deliberado�
	E mudar o status do processo para �Conclu�do: Aguardando Fechamento�

Cen�rio: Concordando com o parecer da CAD (etapa do Est�gio Probat�rio)
	Dado que eu estou com o Parecer da CAD aberto
	Quando eu clicar em Deliberar Parecer
	Ent�o o software dever� salvar uma c�ia do Parecer da CAD como Parecer do Conselho Diretor
	E notificar os interessados que o �Etapa do Est�gio Probat�rio foi Conclu�da�
	E mudar o status do processo para �Etapa Conclu�da�

Cen�rio: Revisando o parecer da CAD (conclus�o de processo)
	Dado que eu editei o parecer da CAD
	E salvei o novo Parecer do Conselho Diretor
	E que estou com o novo Parecer do Conselho Diretor aberto
	Quando eu clicar em Deliberar Parecer
	Ent�o o software dever� notificar aos interessados que o Processo foi Deliberado
	E mudar o status do processo para �Conclu�do: Aguardando Fechamento�

Cen�rio: Revisando o parecer da CAD (etapa do Est�gio Probat�rio)
	Dado que eu editei o parecer da CAD
	E salvei o novo Parecer do Conselho Diretor
	E que estou com o novo Parecer do Conselho Diretor aberto
	Quando eu clicar em Deliberar Parecer
	Ent�o o software dever� notificar aos interessados que a �Etapa do Est�gio Probat�rio foi Conclu�da�
	E mudar o status do processo para �Etapa Conclu�da�