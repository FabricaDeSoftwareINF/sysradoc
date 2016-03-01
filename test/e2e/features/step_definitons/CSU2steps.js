'use strict';

var loginSteps = function() {

  this.Given(/^que estou na página de login$/, function(callback) {
    browser.get("/");
    this.expect(browser.getTitle())
      .to.eventually.equal('Sys Radoc').and.notify(callback);
  });

  this.Given(/^sou um usuário cadastrado$/, function(callback) {
    this.expect(browser.getTitle())
      .to.eventually.equal('Sys Radoc').and.notify(callback);
  });

  this.Given(/^eu gostaria de ter acesso ao SysRadoc para facilitação do processo de avaliação de docentes$/, function(callback) {
    this.expect(browser.getTitle())
      .to.eventually.equal('Sys Radoc').and.notify(callback);
  });

  this.Given(/^que estou na caixa "([^"]*)"$/, function(arg1, callback) {
    this.expect(browser.getTitle())
      .to.eventually.equal('Sys Radoc').and.notify(callback);
  });

  this.Given(/^que preenchi corretamente os dados do login: joaquina@instituto\.ufg\.br$/, function(callback) {
    var login = element(by.model('data.login.email'));
    this.expect(browser.isElementPresent(login)).to.eventually
      .equal(true).and.notify(callback);
    login.sendKeys('leonardo_freitas1995@hotmail.com').then(function(argument) {
      console.log(['hello', argument]);
    });
  });

  this.Given(/^senha: joaquina(\d+)$/, function(arg1, callback) {
    var password = element(by.model('data.login.password'));
    this.expect(browser.isElementPresent(password)).to.eventually
      .equal(true).and.notify(callback);
    password.sendKeys('12345');
    password.getSize().then(function(argument) {
      console.log(argument);
    });
  });

  this.Given(/^eu clicar no botão "([^"]*)"$/, function(arg1, callback) {
    var button = element(by.css('button[ng-click*="signin()"]'));
    this.expect(browser.isElementPresent(button)).to.eventually
      .equal(true).and.notify(callback);
    button.click();
    console.log('click');
  });

  this.Given(/^o sistema irá entrar na "([^"]*)"$/, function(arg1, callback) {
    this.expect(browser.getCurrentUrl()).to
      .eventually.equal('http://localhost:3030/dashboard').and.notify(callback);
  });

  this.Given(/^me dar acesso às funcionalidades referentes ao meu cadastro$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^que sou um usuário qualquer que não está cadastrado$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^que preenchi incorretamente os dados email: joaquina@instituto\.ufg\.br$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^o sistema informa: "([^"]*)"$/, function(arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });


};

module.exports = loginSteps;