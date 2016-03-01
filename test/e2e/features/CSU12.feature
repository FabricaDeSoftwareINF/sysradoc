#language: pt

Funcionalidade: Continuar Processo de Estágio Probatório
	Como a secretaria
	Quero enviar os dados para dar continuidade no Processo de Estágio Probatório
	Para que eu possa continuar o processo avaliativo de um docente

	Contexto:
		Dado que estou devidamente autorizada no sistema
		E que faço parte da secretaria
		E o docente pode continuar participando do Processo de Estágio Probatório

	Esquema do Cenario: Continuar Processo de Estágio Probatório
		Dado que estou na página de confirmação para continuar o processo de estágio probatório
		Quando eu clicar em "Confirmar"
		E enviar a confirmação, estaraáarmazenada no sistema
		Então as informações ficaram aguardando a aprovação
		Exemplos:
		| exemplo_radoc_pdf | mensagem_radoc |
		|radoc_exemplo01.pdf| válido, mensagem de sucesso |
		|radoc_exemplo02.pdf| válido, mensagem de sucesso |
		|radoc_exemplo03.xls| inválido, mensagem de formato de Radoc inválido|
