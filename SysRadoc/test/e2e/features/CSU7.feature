#language: pt

Funcionalidade: Abrir Processo de Est�gio Probat�rio
Como a secretaria
Quero abrir um processo eletr�nico para registrar e armazenar as informa��es de  cada docente
Para que eu possa manter um hist�rico das informa��es do usu�rio

Contexto:
Dado que o docente j� possui um Radoc
	E que fa�o parte da secretaria
E que o est�gio probat�rio ter� uma dura��o de 36 meses, gerando um um radoc anual caso o docente tenha adentrado no in�cio do ano ou, um radoc semestral caso este tenha adentrado no segundo semestre
Eu gostaria de ter acesso ao SysRadoc para registrar e armazenar Radocs dos docentes

Cen�rio 1: Abrir Processo do Est�gio Probat�rio
Dado que estou na p�gina de abrir o processo de um usu�rio
Quando eu clicar em abrir um processo
E selecionar abrir um est�gio probat�rio de um docente, poderei cadastrar as	informa��es deste docente (Nome completo, ano de ingresso na UFG, matr�cula da UFG)
E o sistema notifica o docente da situa��o do processo