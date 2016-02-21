#language: pt

Funcionalidade : Inserir Nota Docente(Discente - Secretaria)
	Como a secretaria
	Quero inserir a nota do docente dada pelo discente
	Para prosseguir com o processo de avaliação do Docente

Contexto :
	Dado que estou devidamente logado no sistema
	E que o meu usuário tenha acesso à etapa descrita
	E que o Radoc ja tenha sido inserido
	E que o docente ja tenha sido pesquisado
	Eu gostaria de inserir a nota do docente por disciplina ministrada

Cenário 1: Pesquisar docente
	Quando pesquisar os processos que estão com o status em andamento
E podendo filtrar por status ou nome do docente.
O software de listar o resultado da pesquisa
 	
Cenário 2: Inserir notas
Quando eu clicar em inserir media do discente.
	Entao o software ira mostrar a quantidade de campos de acordo com a quantidade de disciplinas registradas no radoc do docente escolhido
        	E logo abaixo o campos para inserir a media da avaliação da diretoria 
	Quando inserir as notas 
	E clicar em submeter dados as medidas devem ser salvas.
        	E deve ser validado se todos os campos foram preenchidos inclusive a média da diretoria
