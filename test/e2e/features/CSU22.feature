#language: pt

RF22 - Mudar Classe do Docente(Promoção)

Funcionalidade: Mudar Classe do Docente(Promoção)
	Como a Secretaria 
	Quero mudar a classe do docente
	Para atualizar a classe atual do docente

	Contexto:
		Dado que estou na tela de mudança de classe e nível do Docente
		E que alterei o campo Classe

Cenário: Alterar Classe sem alterar o nível
	Dado que não alterei o Campo Nível
	Quando eu clicar em ”Salvar Alterações”
	Então o sistema ira mudar a Classe do Docente para a nova Classe
	E mudar o Nível para 1

Cenário: Alterar a Classe alterando o Nível
	Dado que alterei o Campo Nível
	Quando eu clicar em ”Salvar Alterações”
	Então o sistema ira mudar a Classe do Docente para a nova Classe
	E mudar o Nível para o novo Nível

Cenário: Cancelar alteração
	Quando eu clicar em “Cancelar alteração”
	Então o sistema irá descartar as mudanças