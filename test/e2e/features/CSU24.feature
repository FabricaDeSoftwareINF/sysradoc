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
		E que tenha sido gerado o quadro sumário.
		E que o status do processo seja “Aguardando Parecer da CAD”

Cenário: Criando Parecer
	Dado que estou com quadro sumario aberto 
	E que já avaliei o quadro sumário
	Quando eu clicar em “Criar Parecer”
	Então o sistema irá abrir um editor de texto

Cenário: Salvando o Parecer
	Dado que já criei o parecer
	Quando eu clicar em “Salvar”
	Então o sistema irá salvar o parecer no servidor
	E irá notificar os outros membros da CAD que o Parecer da CAD está pronto
	E irá mudar o status do processo para “Aguardando homologação da CAD”

Cenário: Cancelando Parecer
	Dado que já criei o parecer
	Quando eu clicar em “Cancelar”
	Então o software irá descartar o parecer criado