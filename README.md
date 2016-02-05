# ![SysRadoc](../../wiki/Projeto/Extras/Logo/SysRadoc.svg)

Projeto de Software apresentado como trabalho de conclusão para obtenção de aprovação na disciplina de *Integração 1* e *Métodos e Ferramentas de Engenharia de Software*, elaborado por estudantes do 6º período do semestre 2015/2 do curso de Engenharia de Software da Universidade Federal de Goiás.

#### Facilitadores
[Prof. Dr. Juliano Lopes de Oliveira](mailto:juliano@inf.ufg.br) e [Prof. Msc. Otávio Calaça Xavier](mailto:otavio@inf.ufg.br).

Descrição
---------
**SysRadoc** é um projeto de aplicação Web que visa automatizar o processo de avaliação de pessoal docente da UFG em relação ao estágio probatório, à progressão funcional e à promoção na Carreira do Magistério Superior. Com o **SysRadoc** basta enviar os Radocs gerados pela PROGRAD para o sistema cruzar as informações e mostrar os resultados automaticamente calculados segundo as definições contidas na RESOLUÇÃO - CONSUNI Nº 32/2013 da UFG.

A aplicação resultante deste projeto deverá auxiliar a CAD, faculdades da UFG, e os docentes avaliadores, no processo de avaliação.

Instalação
----------

**Configuração de Ambiente:** 
Para rodar localmente o código fonte, é necessário configurar o ambiente, istalando o [Node.js](https://nodejs.org/en/) e o [MongoDB](https://www.mongodb.org/downloads#production). Para Windows, após a instalação do mongo, é preciso ir na partição do Sistema Operacional (Provavelmente '*C:\\*'), criar uma pasta chamada *data*, e dentro desta pasta uma chamada *db*.


**Resolução de Dependências:** 
Após a instalação do Node.js e do MongoDB, é preciso resolver as dependências do código (Este passo é necessário sempre que novas dependências são adicionadas, ou o repositorio é clonado do zero). Vá para a pasta do código fonte (Onde se encontra o arquivo *server.js*) com o console/prompt de comando e execute os seguintes comandos (A execução de cada um pode demorar alguns minutos):


```
#!console

npm install
bower install
```


**Execução do Servidor:** 
Para executar o servidor, primeiro inicie o banco de dados, que provavelmente estará dentro da pasta onde o MongoDB foi instalado, no caminho */bin/mongod.exe*. Após sua inicialização, vá para a pasta do código fonte com o console/prompt de comando, e execute:

```
#!console

node server.js
```

Pronto, o sistema estará disponível por qualquer browser utilizando [http://localhost:3030/](http://localhost:3030/).


Autores
-------
 * Gabriela Aimée Guimarães - <gabrielaimeeg@hotmail.com>
 * Gleibson Wemerson Silva Borges - <gleibsongyn@gmail.com>
 * Gustavo Moraes dos Santos - <gustavo_moraiss@hotmail.com>
 * Hiago Augusto Koziel Rahmig - <hiagokoziel100@gmail.com>
 * Julianny Alves da Silva - <julianny.alves@hotmail.com>
 * Paulo de Oliveira Neto - <pauloesgyn@gmail.com>
 * Pedro Henrique Silva Farias - <pedrohenriquedrim@gmail.com>
 * Renan Ofugi Mikami - <renangyn2010@hotmail.com>


*Quick Start*
-------------
Para trabalhar no projeto localmente, vá para uma pasta que deseja colocar o projeto (de preferência na pasta de projetos da IDE - workspace) e abra um Terminal UNIX nessa pasta (Git Bash no Windows), digitando o seguinte comando:

* **Repositório de código-fonte:**  
`git clone https://NOME_DE_USUARIO@bitbucket.org/SysRadocTeam/sysradoc.git` (substitua `NOME_DE_USUARIO` pelo seu nome de usuário no Bitbucket)
    * **Repositório de documentação (Wiki):**  
    `git clone https://NOME_DE_USUARIO@bitbucket.org/SysRadocTeam/sysradoc-temp.git/wiki` (substitua `NOME_DE_USUARIO` pelo seu nome de usuário no Bitbucket)

* Ao trabalhar no projeto, deve-se seguir as seguintes regras para Gerência de Configuração do projeto:
	* Todo nome de arquivo e pasta não pode ter acentos e/ou barra de espaço; devendo usar traço ("`-`") para substituir o espaço (**exceto** páginas da Wiki do repositório).
	* Não é permitido colocar no repositório arquivos binários tais como arquivos de suítes Office (.docx, .xlsx, .pptx, .odt, .ods, etc.) tanto no repositório principal quanto na Wiki.

* Após terminar de trabalhar algo no projeto, digite (**Obs.:** Se foram criados novos arquivos, deve-se adicioná-los ao repositório local com o comando `git add -a`, depois disso digite):

    * `git commit` e uma mensagem de *commit* que descreva de forma **sucinta** e **clara** o que foi feito no projeto.

* Após o *commit*, digite `git push` para enviar para o repositório remoto no Bitbucket.

Mais informações no [Plano de Gerência de Configuração](../../wiki/Plano de Gerência de Configuração).

Bug tracker
-----------

Bugs, novos recursos e melhorias estão sendo gerenciadas em **Quadros** do [Trello](https://trello.com):

 * [Equipe de Gerência de Projeto (GPR)](https://trello.com/b/MuZ1B5Lj/atividades-equipe-gerencia)
 * [Equipe de Engenharia de Requisitos (REQ)](https://trello.com/b/5Oqwmm4R/atividades-equipe-de-requisitos)
 * [Equipe de Arquitetura de Software (ARQ)](https://trello.com/b/j7QfzuOZ/atividades-equipe-de-arquitetura)
 * [Equipe de Construção de Software](https://trello.com/b/rnTXAr5X/atividades-construcao)
 * [Equipe de Verificação, Validação e Qualidade (VV&Q)]()
 * [Equipe de Integração](https://trello.com/b/StEpdoui/atividades-integracao)