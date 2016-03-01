'use strict';

var sampleSteps = function() {

  this.Given(/^que eu estou na página principal$/, function(callback) {
    browser.get("/");
    this.expect(browser.getTitle())
      .to.eventually.equal('Sys Radoc').and.notify(callback);
  });

  this.When(/^eu clicar em Cadastrar Novo Usuário$/, function(callback) {
    var button = element(by.css('a[href*="/signup"]'));
    this.expect(browser.isElementPresent(button)).to
      .become(true).and.notify(callback);
    button.click();
    this.expect(browser.getCurrentUrl()).to
      .eventually.equal('http://localhost:3030/signup').and.notify(callback);
  });

  this.When(/^e selecionar docente em categoria Docente$/, function(callback) {
    //this.expect(browser.getCurrentUrl()).to
    //  .eventually.equal('http://localhost:3030/signup').and.notify(callback);
    var select = element(by.model('data.signup.password'));
    //this.expect(browser.isElementPresent(select)).to
    //  .become(true).and.notify(callback);
    var classe = 'Classe A - Docente Adjunto A, Docente Assistente A, e Docente Auxiliar';
    select.sendKeys(classe);
    //this.expect(select.getAttribute('value').getText()).to.eventually.equal(classe);
  });

  this.Given(/^preencher os campos obrigatórios de nome: "([^"]*)", matrícula: "([^"]*)", e\-mail: "([^"]*)", classe: "([^"]*)", nível: "([^"]*)", data de ingresso: "([^"]*)" e titulação: "([^"]*)"$/, function(arg1, arg2, arg3, arg4, arg5, arg6, arg7, callback) {
    var name = element(by.model('data.signup.name'));
    this.expect(browser.isElementPresent(name)).to
      .become(true).and.notify(callback);
    name.sendKeys('Yuri');
    var email = element(by.model('data.signup.emailRequest'));
    this.expect(browser.isElementPresent(email)).to
      .become(true).and.notify(callback);
    email.sendKeys('yuri@vev.ufg');
  });

  this.Given(/^preencher \(ou não\) o campo opcional papel: "([^"]*)"$/, function(arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^o sistema irá informar: "([^"]*)"$/, function(arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^enviará um e\-mail de confirmação ao docente cadastrado$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
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
};

module.exports = sampleSteps;