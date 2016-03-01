#language: pt

Funcionalidade: Inserir Nota Docente (Diretoria)
	Como a secretaria
	Quero inserir a nota do docente dada pela diretoria
	Para prosseguir com o processo de avaliação do Docente

	Contexto:
		Dado que estou devidamente logado no sistema
		E que o meu usuário tenha acesso à etapa descrita
		E que o Radoc ja tenha sido inserido
		E que o docente ja tenha sido pesquisado
		Então eu gostaria de inserir a nota do docente dada pela diretoria

	Cenario: Inserir notas
		Quando Pesquisar os processos que estão com o status "em andamento"
		E podendo filtrar por status ou nome do docente.
		Entao o software ira listar o resultado da pesquisa
		Quando eu clicar em inserir media do discente.
		Entao o software ira mostrar um campo para digitar a nota da diretoria
	    E logo acima os campos para inserir a nota dos discentes
		Quando inserir as notas
		E clicar em submeter dados as medidas devem ser salvas.
	    E deve ser validado se todos os campos foram preenchidos inclusive a média dos discentes
