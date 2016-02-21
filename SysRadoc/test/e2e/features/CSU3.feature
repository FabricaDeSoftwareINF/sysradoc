#language: pt

Funcionalidade: Submeter Radoc
	Como a secretaria
	Quero enviar um documento Radoc em formato pdf 
	Para que eu possa iniciar ou continuar o processo avaliativo de um docente

	Contexto:
		Dado que estou devidamente autorizado no sistema
		E que faço parte da secretaria
E que estou na página de envio de documentos
		
Cenário 1: Validação da estrutura do Radoc
	Quando eu clicar em enviar um Radoc
E selecionar um Radoc no formato pdf no estilo radoc_exemplo01.pdf 
Então o sistema irá validar se o arquivo enviado está no formato de pdf correto

Cenário 2:  Radoc inválido
	Quando eu clicar em enviar um Radoc
E selecionar um Radoc em formato incorreto Radoc.odt
	Então o sistema irá informar que o Radoc  está em formato inválido