#language: pt

RF23 - Alterar Nível do Docente(Progressão)

Funcionalidade: Mudar Nível do Docente(Progreção)
	Como a Secretaria 
	Quero mudar o nível do docente
	Para atualizar o nível atual do docente

	Contexto:
		Dado que estou na tela de mudança de classe e nível do Docente
		E que alterei o campo Nível

Cenário: Alterar Classe sem alterar o nível
	Quando eu clicar em ”Salvar Alterações”
	Então o sistema ira mudar o Nível para o novo Nível


Cenário: Cancelar Alteraão
	Quando eu clicar em “Cancelar alteração”
	Então o sistema irá descartar as mudanças
