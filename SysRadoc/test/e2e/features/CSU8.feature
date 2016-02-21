#language: pt

Funcionalidade: Abrir Processo de Progressão Funcional
	Como a secretaria
	Quero abrir um processo eletrônico para registrar e armazenar as informações de  cada docente que está em progressão funcional
	Para que eu possa manter um histórico das informações do usuário

Contexto:
	Dado que o docente já possui um Radoc
	E que faço parte da secretaria
E que a progressão funcional terá uma duração de 24 meses, gerando um um radoc anual caso o docente tenha iniciado seu processo de progressão funcional no início do ano ou, um radoc semestral caso este tenha adentrado no segundo semestre

Eu gostaria de ter acesso ao SysRadoc para registrar e armazenar Radocs dos docentes

Cenário 1: Abrir Processo do Estágio Probatório
Dado que estou na página de abrir o processo de um usuário
Quando eu clicar em abrir um processo
E selecionar abrir uma progressão funcional de um docente, poderei confirmar e atualizar, caso necessário,  as	informações deste docente (Nome completo, ano de ingresso na UFG, matrícula da UFG)
E o sistema notifica o docente da situação do processo