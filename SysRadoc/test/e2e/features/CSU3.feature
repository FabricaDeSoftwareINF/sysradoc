#language: pt

Funcionalidade: Submeter Radoc
	Como um docente
	Quero enviar um documento Radoc em formato pdf
	Para que eu possa iniciar ou continuar o processo avaliativo de um docente

	Contexto:
		Dado que estou na página principal
		E sou um usuário devidamente logado no sistema
		E que faço parte da secretaria
		E que estou na página de envio de documentos

	Cenario: Validação da estrutura do Radoc
		Quando eu clicar em enviar um Radoc
		E selecionar um Radoc no formato pdf no estilo "radoc_exemplo01.pdf"
		Entao o sistema irá validar se o arquivo enviado está no formato de pdf correto

	Cenario: Radoc inválido
		Quando eu clicar em enviar um Radoc
		E selecionar um Radoc em formato incorreto "Radoc.odt"
		Entao o sistema informa: "Ocorreu um erro no envio do arquivo. Tente novamente."
