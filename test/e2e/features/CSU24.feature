#language: pt

RF24 - Criar Parecer da  CAD

Funcionalidade: Criar Parecer da  CAD
	Como relator da CAD
	Quero criar um parecer sobre o processo avaliado
	Para que o resultado do processo seja comunicado ao Conselho diretor e validado

	Contexto:
		Dado que estou devidamente autorizado no sistema
		E que sou o Relator da CAD
		E que o sistema ja tenha pontuado o radoc 
		E as notas dos discentes e da diretoria ja tenham sido adicionadas no sistema.
		E que tenha sido gerado o quadro sum�rio.
		E que o status do processo seja �Aguardando Parecer da CAD�

Cen�rio: Criando Parecer
	Dado que estou com quadro sumario aberto 
	E que j� avaliei o quadro sum�rio
	Quando eu clicar em �Criar Parecer�
	Ent�o o sistema ir� abrir um editor de texto

Cen�rio: Salvando o Parecer
	Dado que j� criei o parecer
	Quando eu clicar em �Salvar�
	Ent�o o sistema ir� salvar o parecer no servidor
	E ir� notificar os outros membros da CAD que o Parecer da CAD est� pronto
	E ir� mudar o status do processo para �Aguardando homologa��o da CAD�

Cen�rio: Cancelando Parecer
	Dado que j� criei o parecer
	Quando eu clicar em �Cancelar�
	Ent�o o software ir� descartar o parecer criado