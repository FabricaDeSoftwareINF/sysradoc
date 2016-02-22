'use strict';

var sampleSteps = function() {

  this.Given(/^que eu estou na página principal$/, function(callback) {
    browser.get("/");
    this.expect(browser.getTitle()).to.eventually.equal('Sys Radoc2').and.notify(callback);
  });

  this.Given(/^eu clicar em Cadastrar Novo Usuário$/, function(callback) {
    
    callback();
  });

  this.Given(/^e selecionar docente em categoria Docente$/, function(callback) {
    console.log("Hello");
    callback();
  });

  this.Given(/^preencher os campos obrigatórios de nome: Joaquina, matrícula: (\d+), e\-mail: joaquina@instituto\.com\.br, classe: A, nível: (\d+), data de ingresso: (\d+) de janeiro de (\d+) e titulação: Mestre$/, function(arg1, arg2, arg3, arg4, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^eu clicar em "([^"]*)"$/, function(arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^preencher os campos obrigatórios de "([^"]*)": Joaquina, "([^"]*)": (\d+), "([^"]*)": joaquina@instituto\.com\.br, "([^"]*)": A, "([^"]*)": (\d+), "([^"]*)": (\d+) de janeiro de (\d+) e "([^"]*)": Mestre$/, function(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^preencher \(ou não\) o campo opcional "([^"]*)": Conselho Diretor$/, function(arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^o sistema irá informar que o cadastro foi realizado com sucesso$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^enviará um e\-mail de confirmação ao docente cadastrado$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^selecionar secretária na categoria Secretaria$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^preencher os campos obrigatórios nome: Joaquina, matrícula: (\d+) e e\-mail: joaquina@instituto\.com\.br$/, function(arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^o sistema irá informar que o cadastro foi executado com sucesso\.$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^enviará um e\-mail de confirmação à secretária$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^eu clicar em Cadastrar Novo Docente$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^preencher algum dos campos obrigatórios de forma incorreta$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^o sistema irá informar que algum dos dados estão incorretos$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^apontar o dado errado$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });
};

module.exports = sampleSteps;