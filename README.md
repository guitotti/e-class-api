# E-Class API

## Descrição

A E-Class é uma aplicação destinada a professores e estudantes de inglês, permitindo que os professores gerenciem o andamento das tarefas e as corrijam, enviem materiais extras aos alunos, dentre outras funcionalidades.

## Requisitos

* Node.js: ^14.17.0 (ou superior)
* Banco de dados: SQLite (usando o pacote `sqlite3`)
* Dependências:
	+ `dotenv`: ^16.4.5
	+ `express`: ^4.21.1
	+ `jsonwebtoken`: ^9.0.2
	+ `multer`: ^1.4.5-lts.1
	+ `nodemon`: ^3.1.7

## Instalação

1. Clone o repositório: `git clone https://github.com/seu-usuario/e-class-api.git`
2. Instale as dependências: `npm install`
3. Configure o arquivo `.env` com as variáveis de ambiente necessárias (consulte o arquivo `src/db_config.js` para obter mais informações)
4. Inicie a aplicação: `npm run dev`

## Rodando a Aplicação

1. A aplicação estará disponível em `http://localhost:3000`
2. Use o endpoint `/` para verificar se a aplicação está funcionando corretamente

## Endpoints

* `/teachers`: lista de professores
* `/students`: lista de estudantes
* `/tasks`: lista de tarefas
* `/materials`: lista de materiais extras
