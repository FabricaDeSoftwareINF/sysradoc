#language: pt

RF21 - Concluir Processo (Todos os Processos)

Funcionalidade: Concluir Processo (Todos os Processos)
	Como a Secretaria
	Quero concluir o processo avaliativo de um docente
	Para que os interessados e envolvidos sejam notificados 

	Contexto:
		Dado que estou devidamente autorizada no sistema	
		E que faço parte da Secretaria

Cenário: Conclusão de Estágio Probatório
	Dado que  a avaliação e resultados estejam disponibilizados
	Quando clicar em “Concluir processo”
	Então os envolvidos serão notificados do fim e resultado do processo
	E o status do processo mudará para “Concluído”
	E o status do Estágio Probatório do professor mudará para Concluído

Cenário: Conclusão de Progressão
	Dado que  a avaliação e resultados estejam disponibilizados
	Quando clicar em “Concluir processo”
	Então os envolvidos serão notificados do fim e resultado do processo
	E o status do processo mudará para “Finalizado”
	E o Nível do docente mudará para o Nível imediatamente superior

Cenário: Conclusão de Promoção
	Dado que  a avaliação e resultados estejam disponibilizados
	Quando clicar em “Concluir processo”
	Então os envolvidos serão notificados do fim e resultado do processo
	E o status do processo mudará para “Finalizado”
	E a Classe do docente mudará para a Classe imediatamente superior
