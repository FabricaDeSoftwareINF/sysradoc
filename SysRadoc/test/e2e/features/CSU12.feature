#language: pt

Funcionalidade: Continuar Processo de Est�gio Probat�rio
	Como a secretaria
	Quero enviar os dados para dar continuidade no Processo de Est�gio Probat�rio
	Para que eu possa continuar o processo avaliativo de um docente

	Contexto:
		Dado que estou devidamente autorizada no sistema
		E que fa�o parte da secretaria
		E o docente pode continuar participando do Processo de Est�gio Probat�rio

cen�rio 1:  Continuar Processo de Est�gio Probat�rio
Dado que estou na p�gina de confirma��o para continuar o processo de est�gio probat�rio
	Quando eu clicar em confirmar  
E enviar a confirma��o, esta � armazenada no sistema
	Ent�o as informa��es ficaram aguardando a aprova��o

Exemplos:
| exemplo_radoc_pdf | mensagem_radoc |
|radoc_exemplo01.pdf| v�lido, mensagem de sucesso |
|radoc_exemplo02.pdf| v�lido, mensagem de sucesso |
|radoc_exemplo03.xls| inv�lido, mensagem de formato de Radoc inv�lido|
