#language: pt

Funcionalidade: Solicitar Processo de Progressão Funcional
	Como docente
	Quero solicitar a abertura de processo de Progressão Funcional

	Contexto:
		Dado que estou devidamente autorizado no sistema
		E que estou na página de solicitação de abetura
		E que estou com 24 meses no cargo efetivo

	Cénario 01: Solicitar Abertura do Processo de Progressão Funcional
		Ao clicar para Solicitar Processo de Progressão Funcional
		O software notifica os interessados e envolvidos da abertura do processo
		Uma mensagem de sucesso do envio da solicitação será mostrada
		E as informações da solicitação são armazenadas no sistema

	Cénario 02: Verificar Resultado Parcial da CAD
		Ao clicar para ver o andamento do Processo de Progressão Funcional
		Aparece se foi aprovado ou não
		Caso não seja aprovado, pode ser verificado as sugestões de melhoria
	Cénario 03: Verificar o Resultado Final da Solicitação
		Ao clicar para ver o andamento do Processo de Progressão Funcional
		Caso tenha sido aprovado, irá mostrar uma mensagem da aprovação
		Caso não tenha sido aprovado, poderá recorrer da decisão