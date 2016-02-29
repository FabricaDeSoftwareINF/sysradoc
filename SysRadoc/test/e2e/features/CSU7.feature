#language: pt

Funcionalidade: Abrir Processo de Estágio Probatório
	Como a secretaria
	Quero abrir um processo eletrônico para registrar e armazenar as informações de cada docente
	Para que eu possa manter um histórico das informações do usuário

	Contexto:
		Dado que o docente já possui um Radoc
		E que faço parte da secretaria
		E que o estágio probatório terá uma duração de 36 meses, gerando um um radoc anual caso o docente tenha adentrado no início do ano ou, um radoc semestral caso este tenha adentrado no segundo semestre
		Entao eu gostaria de ter acesso ao SysRadoc para registrar e armazenar Radocs dos docentes

	Cenario: Abrir Processo do Estágio Probatório
		Dado que estou na página de abrir o processo de um usuário
		Quando eu clicar em abrir um processo
		E selecionar abrir um estágio probatório de um docente, poderei cadastrar as informações deste docente (Nome completo, ano de ingresso na UFG, matrícula da UFG)
		Entao o sistema notifica o docente da situação do processo
