<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>
<h3 align="center">
  Api Gympoint
</h3>
<blockquote align="center">Sistema para Academia</blockquote>



<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-02?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/stargazers">
  </a>
</p>

## Rodando a aplicação

Para rodar o projeto será necessário instalar as seguintes aplicações:

- Docker
- Node
- Yarn (Opcional)

### Pré-requisitos

Subindo a base de dados:

```sh
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d gympoint
```

Obs: Vocé pode escolher qualquer nome para a base de dados, devendo somente alterar no arquivo `database.js` dentro da pasta `config`, assim como valores referente ao ambiente (usuario, host, etc).

É necessário rodar as migrations para que o _Sequelize_ crie as tabelas necessárias no banco de dados, através do comando:

```
npx sequelize db:migrate
```

Redis é usado para armazenar os valores de sessão.

```
docker run -p 6379:6379 --name redis -d redis
```

Instalando as dependências.

```
yarn install ou npm install
```

Para iniciar o projeto:

```
yarn dev ou npm dev
```

[Acesse aqui](http://localhost:8000)

## Construido com

- [Bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [Express](https://github.com/expressjs/express)
- [Multer](https://github.com/expressjs/multer)
- [pg](https://github.com/brianc/node-postgres)
- [Sequelize](https://github.com/sequelize/sequelize)
- [Yup](https://github.com/jquense/yup)
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [Date-fns](https://date-fns.org/)
- [Bee-queue](https://github.com/bee-queue/bee-queue)
- [@sentry/node](https://sentry.io/for/node/)
- [Nodemailer](https://nodemailer.com/about/)

## Autor

- **Pedro Henrique** - [Github](https://github.com/pedrook16)
