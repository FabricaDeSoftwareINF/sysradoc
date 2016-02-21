#language: pt

Funcionalidade: Converter Radoc
	Como a secretaria
Quero extrair os dados de um documento Radoc em formato pdf e salv�-los no banco de dados
	Para que a CAD possa utiliz�-los durante o processo avaliativo de um docente.

	Contexto:
		Dado que estou devidamente autorizado no sistema
		Que fa�o parte da secretaria
		E que o Radoc tenha sido enviado com sucesso

Cen�rio 1: Confirma��o de envio
Dado que estou na p�gina de documentos enviados
	Quando eu receber a mensagem de envio com sucesso
	Ent�o o software dever� extrair os dados do Radoc em PDF

Cen�rio 2: Sucesso de convers�o
	Dado que os dados foram extra�dos com sucesso
	Quando os dados terminarem de serem extra�dos
	Ent�o o software dever� salvar os dados no Banco de Dados
	E ir� informar que o Radoc foi enviado com sucesso
	