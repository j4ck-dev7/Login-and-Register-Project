# Login e Register

[![Node.js](https://img.shields.io/badge/Node.js-v22.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-brightgreen)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Um projeto simples de login e register, com autenticação com JWT, criptografia, uso correto de métodos http, testes unitários e validações. 
Desenvolvida com **Node.js + Express + Mongoose + MongoDB** e testada com **Insomnia** e **jest**.

- `POST   /app/signUp` → Registro  
- `POST   /app/signIn` → Login 

## 📦 Tecnologias

| Tecnologia         | Versão  | Uso                          |
|--------------------|---------|------------------------------|
| Node.js            | 20.x.x  | Runtime                      |
| Express            | 5.x.x   | Framework web                |
| Mongoose           | 8.x.x   | ODM MongoDB                  |
| MongoDB            | 6.x.x   | Banco de dados               |
| jsonwebtoken       | 9.0.2   | JWT                          |
| jest               | 30.x.x  | Testes unitários             |

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/j4ck-dev7/Login-and-Register-Project

# Instale as dependências
npm install
```

## Variáveis de ambiente (.env)
```env
PORT=5000
MONGO_URL=mongodb+srv://username:password@cluster1.mongodb.net/blogapi?retryWrites=true&w=majority&appName=Cluster1
SECRET=SuaChaveSuperSecretaAqui!
```
## 🔐 Autenticação
1. Criar usuário
   ```http
   POST http://localhost:5000/app/signUp
   Content-Type: application/json
   
   {
     "name": "User",
     "email": "user@gmail.com",
     "password": "user123",
   }
   ```

2. Logar
   ```http
   POST http://localhost:5000/app/signIn
   Content-Type: application/json
   
   {
     "email": "user@gmail.com",
     "password": "user123",
   }
   ```

## 📄 Licença
Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.