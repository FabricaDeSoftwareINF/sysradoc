#language: pt

Funcionalidade: Converter Radoc
	Como a secretaria
Quero extrair os dados de um documento Radoc em formato pdf e salvá-los no banco de dados
	Para que a CAD possa utilizá-los durante o processo avaliativo de um docente.

	Contexto:
		Dado que estou devidamente autorizado no sistema
		Que faço parte da secretaria
		E que o Radoc tenha sido enviado com sucesso

Cenário 1: Confirmação de envio
Dado que estou na página de documentos enviados
	Quando eu receber a mensagem de envio com sucesso
	Então o software deverá extrair os dados do Radoc em PDF

Cenário 2: Sucesso de conversão
	Dado que os dados foram extraídos com sucesso
	Quando os dados terminarem de serem extraídos
	Então o software deverá salvar os dados no Banco de Dados
	E irá informar que o Radoc foi enviado com sucesso
	