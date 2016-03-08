#language: pt

RF26 - Homologar o parecer do relator (outros membros da CAD)

Funcionalidade: Homologar o parecer do relator (outros membros da CAD)
	Como membro secundário da CAD
	Quero homologar o parecer do relator
	Para que o parecer seja validado e repassado para o Conselho diretor

	Contexto:
		Dado que estou devidamente autorizado no sistema
		Que o relator ja tenha criado o parecer
		E que o status do processo seja “Aguardando homologação da CAD”

Cenário: Homologação parcial 
	Quando eu for o primeiro a homologar o parecer
	E clicar em homologar parecer
	Então o sistema salvar minha homologação
	E irá aguardar a segunda homologação;

Cenário: Homologação completa
	Quando eu for o segundo a homologar o parecer
	E clicar em homologar parecer
	Então o sistema irá salvar a minha homologação;
	E irá mudar o status do processo para “Aguardando deliberação do Conselho Diretor”
	E irá notificar o Conselho Diretor que um novo parecer foi gerado; 
