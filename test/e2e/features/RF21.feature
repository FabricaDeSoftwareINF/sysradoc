#language: pt

RF21 - Concluir Processo (Todos os Processos)

Funcionalidade: Concluir Processo (Todos os Processos)
	Como a Secretaria
	Quero concluir o processo avaliativo de um docente
	Para que os interessados e envolvidos sejam notificados 

	Contexto:
		Dado que estou devidamente autorizada no sistema	
		E que fa�o parte da Secretaria

Cen�rio: Conclus�o de Est�gio Probat�rio
	Dado que  a avalia��o e resultados estejam disponibilizados
	Quando clicar em �Concluir processo�
	Ent�o os envolvidos ser�o notificados do fim e resultado do processo
	E o status do processo mudar� para �Conclu�do�
	E o status do Est�gio Probat�rio do professor mudar� para Conclu�do

Cen�rio: Conclus�o de Progress�o
	Dado que  a avalia��o e resultados estejam disponibilizados
	Quando clicar em �Concluir processo�
	Ent�o os envolvidos ser�o notificados do fim e resultado do processo
	E o status do processo mudar� para �Finalizado�
	E o N�vel do docente mudar� para o N�vel imediatamente superior

Cen�rio: Conclus�o de Promo��o
	Dado que  a avalia��o e resultados estejam disponibilizados
	Quando clicar em �Concluir processo�
	Ent�o os envolvidos ser�o notificados do fim e resultado do processo
	E o status do processo mudar� para �Finalizado�
	E a Classe do docente mudar� para a Classe imediatamente superior
