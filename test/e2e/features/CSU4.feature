#language: pt

Funcionalidade: Converter Radoc
	Como a secretaria
	Quero extrair os dados de um documento Radoc em formato pdf e salvá-los no banco de dados
	Para que a CAD possa utilizá-los durante o processo avaliativo de um docente.

	Contexto:
		Dado que estou devidamente autorizado no sistema
		E faço parte da secretaria
		E que um Radoc tenha sido enviado com sucesso

	Cenario: Confirmação de envio
		Dado que estou na página de documentos enviados
		Quando eu receber a mensagem de envio com sucesso
		Entao o software deverá extrair os dados do Radoc em PDF

	Cenario: Sucesso de conversão
		Dado que os dados foram extraídos com sucesso
		Quando os dados terminarem de serem extraídos
		Entao o software deverá salvar os dados no Banco de Dados
		E o sistema informa: "Radoc enviado com sucesso!"
