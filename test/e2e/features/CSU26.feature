#language: pt

RF26 - Homologar o parecer do relator (outros membros da CAD)

Funcionalidade: Homologar o parecer do relator (outros membros da CAD)
	Como membro secund�rio da CAD
	Quero homologar o parecer do relator
	Para que o parecer seja validado e repassado para o Conselho diretor

	Contexto:
		Dado que estou devidamente autorizado no sistema
		Que o relator ja tenha criado o parecer
		E que o status do processo seja �Aguardando homologa��o da CAD�

Cen�rio: Homologa��o parcial 
	Quando eu for o primeiro a homologar o parecer
	E clicar em homologar parecer
	Ent�o o sistema salvar minha homologa��o
	E ir� aguardar a segunda homologa��o;

Cen�rio: Homologa��o completa
	Quando eu for o segundo a homologar o parecer
	E clicar em homologar parecer
	Ent�o o sistema ir� salvar a minha homologa��o;
	E ir� mudar o status do processo para �Aguardando delibera��o do Conselho Diretor�
	E ir� notificar o Conselho Diretor que um novo parecer foi gerado; 
