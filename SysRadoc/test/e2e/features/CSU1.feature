#language: pt

Funcionalidade: Criar Usuário
	Como uma secretária
	Quero cadastrar um docente
	Para que ele possa ter acesso as funcionalidades disponíveis para docentes

	Cenario: Cadastrar docente
		Dado que eu estou na página principal
		Quando eu clicar em Cadastrar Novo Usuário
		E e selecionar docente em categoria Docente
		E preencher os campos obrigatórios de nome: "Joaquina", matrícula: "12345", e-mail: "joaquina@instituto.ufg.br", classe: "A", nível: "1", data de ingresso: "05 de janeiro de 2015" e titulação: "Mestre"
		E preencher (ou não) o campo opcional papel: "Conselho Diretor"
		Então o sistema irá informar: "O cadastro foi realizado com sucesso"
		E enviará um e-mail de confirmação ao docente cadastrado

	Cenario: Cadastrar secretária
		Dado que eu estou na página principal
		Quando eu clicar em "Cadastrar Novo Usuário"
		E selecionar secretária na categoria "Secretaria"
		E preencher os campos obrigatórios nome: "Joaquina", matrícula: "12321" e e-mail: "joaquina@instituto.ufg.br"
		Então o sistema irá informar: "O cadastro foi executado com sucesso"
		E enviará um e-mail de confirmação à secretária

	# Cenario: Dado inválido
	# 	Dado que eu estou na página principal
	# 	Quando eu clicar em Cadastrar Novo Docente
	# 	E preencher algum dos campos obrigatórios de forma incorreta
	# 	Então o sistema irá informar que algum dos dados estão incorretos
	# 	E apontar o dado errado
