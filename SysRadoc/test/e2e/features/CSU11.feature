#language: pt

Funcionalidade: Solicitar Processo de Progress�o Funcional
	Como docente
	Quero solicitar a abertura de processo de Progress�o Funcional

	Contexto:
		Dado que estou devidamente autorizado no sistema
		E que estou na p�gina de solicita��o de abetura
		E que estou com 24 meses no cargo efetivo

	C�nario 01: Solicitar Abertura do Processo de Progress�o Funcional
		Ao clicar para Solicitar Processo de Progress�o Funcional
		O software notifica os interessados e envolvidos da abertura do processo
		Uma mensagem de sucesso do envio da solicita��o ser� mostrada
		E as informa��es da solicita��o s�o armazenadas no sistema

	C�nario 02: Verificar Resultado Parcial da CAD
		Ao clicar para ver o andamento do Processo de Progress�o Funcional
		Aparece se foi aprovado ou n�o
		Caso n�o seja aprovado, pode ser verificado as sugest�es de melhoria
	C�nario 03: Verificar o Resultado Final da Solicita��o
		Ao clicar para ver o andamento do Processo de Progress�o Funcional
		Caso tenha sido aprovado, ir� mostrar uma mensagem da aprova��o
		Caso n�o tenha sido aprovado, poder� recorrer da decis�o