#language: pt

Funcionalidade : Abrir processo de promo��o na carreira de magist�rio
	Como secretaria
	Quero abrir um processo de promo��o na carreira de magist�rio
	Para acompanhar e registrar os dados do processo e ter um controle maior sobre as informa��es.

Contexto :
	Dado que o docente fez a solicita��o para abertura do processo
	E que o docente se encontra no nivel correspondente para avan�ar na promo��o.
	E j� ter sido aprovado em est�gio probat�rio
	E ter comprido o intervalo de no minimo dois anos no n�vel da classe atual
	Eu gostaria de abrir o processo do docente.

Cen�rio 1 : Pesquisar processos por docente
	Dado que estou na pagina de pesquisar docentes podendo filtrar por nome
	Quando clicar em pesquisar
	O software ira me listar os docentes de acordo com o filtro de pesquisa

Cen�rio 2 : Pesquisar processo por pedidos
Dado que estou na pagina de pesquisar pedidos de abertura de processos, podendo filtrar por nome do docente
Quando eu clicar em pesquisar
O software ira me listar os pedidos de processos de acordo com o filtro de pesquisa.

C�nario 3 : Abrir processo de promo��o
Dado que a pesquisa ja tenha sido efetuado
	E que encontrei o pedido na pesquisa
	Quando eu clicar em abrir processo de promo��o 
O software ira dar a op��o para confirmar e atualizar, caso necess�rio,  as	informa��es deste docente (Nome completo, ano de ingresso na UFG, matr�cula da UFG)
	E o software ira validade se o radoc se encontra atualizado
	E caso esteja desatualizado dever� enviar um email para o docente solicitando a atualiza��o.
	E dever� criar um processo com status em andamento.
