#language: pt

Funcionalidade: Abrir Processo de Progress�o Funcional
	Como a secretaria
	Quero abrir um processo eletr�nico para registrar e armazenar as informa��es de  cada docente que est� em progress�o funcional
	Para que eu possa manter um hist�rico das informa��es do usu�rio

Contexto:
	Dado que o docente j� possui um Radoc
	E que fa�o parte da secretaria
E que a progress�o funcional ter� uma dura��o de 24 meses, gerando um um radoc anual caso o docente tenha iniciado seu processo de progress�o funcional no in�cio do ano ou, um radoc semestral caso este tenha adentrado no segundo semestre

Eu gostaria de ter acesso ao SysRadoc para registrar e armazenar Radocs dos docentes

Cen�rio 1: Abrir Processo do Est�gio Probat�rio
Dado que estou na p�gina de abrir o processo de um usu�rio
Quando eu clicar em abrir um processo
E selecionar abrir uma progress�o funcional de um docente, poderei confirmar e atualizar, caso necess�rio,  as	informa��es deste docente (Nome completo, ano de ingresso na UFG, matr�cula da UFG)
E o sistema notifica o docente da situa��o do processo