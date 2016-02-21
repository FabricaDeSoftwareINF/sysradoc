#language: pt

Funcionalidade: Visualizar Lista de Processos Concluídos
Como qualquer usuário
Quero abrir para visualizar a lista de processos concluídos dos docentes.
Para que eu possa acompanhar os processos que estão com status de concluídos.

Contexto:
Dado que eu estou logado no sistema 
E na tela de pesquisa de processos concluídos.
Eu gostaria de acompanhar os processos concluídos.

cenário 1: Visualizar Lista de Processos Concluídos
Quando eu clicar no botão pesquisar e digitar o nome docente.
Então o software vai apresentar a lista de processos concluídos do docente até a data atual.

cenário 2: Sem Processos Concluidos
	Quando eu clicar no botão  pesquisar e um processo concluído.
E se não houver processos concluídos até a data de pesquisa.
Então o sistema irá informar  <Sem_Processos_concluidos>