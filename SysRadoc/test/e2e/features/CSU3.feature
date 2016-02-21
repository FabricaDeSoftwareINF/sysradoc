#language: pt

Funcionalidade: Submeter Radoc
	Como a secretaria
	Quero enviar um documento Radoc em formato pdf 
	Para que eu possa iniciar ou continuar o processo avaliativo de um docente

	Contexto:
		Dado que estou devidamente autorizado no sistema
		E que fa�o parte da secretaria
E que estou na p�gina de envio de documentos
		
Cen�rio 1: Valida��o da estrutura do Radoc
	Quando eu clicar em enviar um Radoc
E selecionar um Radoc no formato pdf no estilo radoc_exemplo01.pdf 
Ent�o o sistema ir� validar se o arquivo enviado est� no formato de pdf correto

Cen�rio 2:  Radoc inv�lido
	Quando eu clicar em enviar um Radoc
E selecionar um Radoc em formato incorreto Radoc.odt
	Ent�o o sistema ir� informar que o Radoc  est� em formato inv�lido