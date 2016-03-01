#language: pt

Funcionalidade: Solicitar Processo de Progressão Funcional
	Como um docente
	Quero solicitar a abertura de processo de Progressão Funcional

	Contexto:
		Dado que estou devidamente autorizado no sistema
		E que estou com 24 meses no cargo efetivo

	Cenario: Solicitar Abertura do Processo de Progressão Funcional
		Dado que estou na página de solicitação de abertura
		Quando clicar para Solicitar Processo de Progressão Funcional
		Entao o sistema notifica os interessados e envolvidos da abertura do processo
		E mensagem de sucesso do envio da solicitação será mostrada
		E as informações da solicitação são armazenadas no sistema

	Cenario: Verificar Resultado Parcial de docente aprovado
		Dado que estou na página de solicitação de abertura
		Quando clicar para ver o andamento do Processo de Progressão Funcional
		Entao o sistema mostra a mensagem: "Aprovado" 

	Cenario: Verificar Resultado Parcial de docente reprovado
	 	Dado que estou na página de solicitação de abertura
		Quando clicar para ver o andamento do Processo de Progressão Funcional
		Entao o sistema mostra a mensagem: "reprovado" 
		E pode ser verificado as sugestões de melhoria

	Cenario: Verificar o Resultado Final da Solicitação
		Dado que estou na página de solicitação de abertura
		Quando clicar para ver o andamento do Processo de Progressão Funcional
		Entao o sistema mostrará uma mensagem da aprovação (caso não tenha sido aprovado, poderá recorrer da decisão)
