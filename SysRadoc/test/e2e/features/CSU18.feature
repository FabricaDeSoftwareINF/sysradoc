#language: pt

Funcionalidade : Inserir Nota Docente(Discente - Secretaria)
	Como a secretaria
	Quero inserir a nota do docente dada pelo discente
	Para prosseguir com o processo de avalia��o do Docente

Contexto :
	Dado que estou devidamente logado no sistema
	E que o meu usu�rio tenha acesso � etapa descrita
	E que o Radoc ja tenha sido inserido
	E que o docente ja tenha sido pesquisado
	Eu gostaria de inserir a nota do docente por disciplina ministrada

Cen�rio 1: Pesquisar docente
	Quando pesquisar os processos que est�o com o status em andamento
E podendo filtrar por status ou nome do docente.
O software de listar o resultado da pesquisa
 	
Cen�rio 2: Inserir notas
Quando eu clicar em inserir media do discente.
	Entao o software ira mostrar a quantidade de campos de acordo com a quantidade de disciplinas registradas no radoc do docente escolhido
        	E logo abaixo o campos para inserir a media da avalia��o da diretoria 
	Quando inserir as notas 
	E clicar em submeter dados as medidas devem ser salvas.
        	E deve ser validado se todos os campos foram preenchidos inclusive a m�dia da diretoria
