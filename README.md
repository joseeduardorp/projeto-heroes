# Projeto de Cadastro de Heróis

Este projeto foi desenvolvido como parte do curso de [Imersão em Desenvolvimento de APIs com Node.js - NodeBR](https://erickwendel.teachable.com/p/node-js-para-iniciantes-nodebr), ministrado pelo [Erick Wendel](https://github.com/erickwendel), com o objetivo de criar uma API REST para cadastro de heróis. O projeto utiliza diversas tecnologias e boas práticas para garantir a segurança, eficiência e facilidade de manutenção.

## Tecnologias Utilizadas

### Back-end

- **Framework:** Hapi
- **Design Pattern:** Strategy
- **Validação de Dados:** JOI
- **Autenticação:** JWT (JSON Web Tokens)
- **Documentação de API:** Swagger
- **Banco de Dados NoSQL:** MongoDB
  - **ODM:** Mongoose
- **Banco de Dados Relacional:** PostgreSQL
  - **ORM:** Sequelize
- **Criptografia de Senhas:** Bcrypt
- **Testes Unitários:** Mocha
- **Cobertura de Testes:** Istanbul

### Front-end

- **HTML**
- **CSS Framework:** Tailwind CSS

## Funcionalidades

- Cadastro, atualização, remoção e consulta de heróis.
- Autenticação de usuários com JWT.
- Documentação detalhada da API gerada automaticamente com Swagger.
- Utilização de banco de dados MongoDB e PostgreSQL para diferentes necessidades de armazenamento.
- Criptografia de senhas para garantir a segurança das informações dos usuários.
- Testes unitários para garantir a integridade do código e cobertura de testes para avaliar a eficácia dos testes realizados.

## Como Executar

1. Clone este repositório.
2. Instale as dependências do back-end e do front-end:
   ```
   cd backend
   npm install
   ```
   ```
   cd frontend
   npm install
   ```
3. Configure as variáveis de ambiente conforme necessário para conexão com bancos de dados e segredos JWT.
4. Inicie o servidor back-end:
   ```
   cd backend
   npm run prod
   ```
5. Acesse a documentação da API em `http://localhost:{PORTA}/documentation`.
6. Inicie o processo de build do Tailwindcss (se necessário):
   ```
   cd frontend
   npm run tail:build
   ```
