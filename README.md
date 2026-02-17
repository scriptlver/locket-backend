# 🔒🪽 locket backend — madison beer album 🤍

backend desenvolvido para o projeto **locket**, um site inspirado no álbum *locket* da madison beer 🤍.  
esse backend é responsável por autenticação de usuários, gerenciamento de perfil, favoritos, upload de fotos e persistência de dados.

---

## 🪽 tecnologias utilizadas

- node.js  
- express  
- cors  
- fs (file system)  
- path  
- render  
- postman  

---

## 🤍 hospedagem

backend hospedado no render:

- dashboard:  
  https://dashboard.render.com/web/srv-d68vjnogjchc73ceipt0  

- base url:  
  https://locket-backend-78sy.onrender.com  

---

## 🔒 configuração principal

- servidor express rodando na porta 3000 (ou variável de ambiente)  
- cors configurado para:
  - http://localhost:5173  
  - https://locket-frontend-xi.vercel.app  
- upload de imagens salvo em /uploads  
- dados persistidos em /data/usuarios.json  

---

## 🪽 funcionalidades

- registrar usuário  
- login  
- listar usuários  
- buscar usuário por id  
- buscar usuário por email  
- editar perfil  
- deletar conta  
- sistema de favoritos  
- upload de foto de perfil  

---

## 🤍 rotas da api

todas as rotas começam com `/api`

---

### 🪽 registrar usuário

**post**  
/api/register


body:
```json
{
  "nomeUsuario": "lavisbeirk",
  "nome": "lavi",
  "email": "madisonkanye@gmail.com",
  "senha": "123456",
  "foto": "data:image/png;base64,...",
  "bio": "i love madison beer 🤍"
}
```

### 🔒 login
**post**
/api/login

```json
body:
{
  "email": "madisonkanye@gmail.com",
  "senha": "123456"
}
```

### 🤍 listar usuários
**get**
/api/users

### 🪽 buscar usuário por id
**get**
/api/users/:id
# exemplo:
/api/users/4

### 🤍 buscar usuário por email
**get**
/api/users/email/:email
# exemplo:
/api/users/email/madisonkanye@gmail.com

### 🪽 editar perfil
**put**
/api/editar-perfil

```json
body:
{
  "id": 2,
  "nomeUsuario": "teste",
  "nome": "testeteste",
  "email": "teste@gmail.com",
  "senha": "teste123",
  "foto": "data:image/jpeg;base64,...",
  "bio": "guaguguaguagaugaugau"
}
```

### 🪽 deletar usuário
**delete**
/api/users/:id
# exemplo:
/api/users/5

### 🤍 contar usuários
**get**
/api/users-count

## 🪽 como rodar o backend localmente 🤍

siga os passos abaixo para rodar o backend do locket na sua máquina 🔒🪽

---

### 🤍 pré-requisitos

- node.js (versão 18 ou superior)  
- npm ou yarn  
- git (opcional)  

verifique se o node está instalado:
```bash
node -v
npm -v
```

### 🪽 clonando o repositório
```json
git clone https://github.com/seu-usuario/locket-backend.git
cd locket-backend
```
(se não usar git, apenas baixe o projeto e entre na pasta)

### 🔒 instalando dependências
npm install

🤍 estrutura necessária

antes de rodar, garanta que essas pastas existam:

locket-backend/
├─ data/
│  └─ usuarios.json
├─ uploads/
├─ routes/
│  └─ auth.routes.js
├─ index.js
└─ package.json


obs: se o arquivo usuarios.json não existir, o backend cria automaticamente 🤍

🪽 rodando o servidor
node index.js


ou, se usar nodemon:

npx nodemon index.js

🔒 porta do servidor

por padrão, o backend roda em:

http://localhost:3000

🤍 testando se está funcionando

acesse no navegador ou postman:

http://localhost:3000


resposta esperada:

backend rodando!!!

🪽 conectando com o frontend

no frontend, configure a variável de api:

const API_URL =
  location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://locket-backend-78sy.onrender.com";

🤍 rodar em produção (render)

faça push do projeto para o github

crie um web service no render

configure:

build command: npm install

start command: node index.js

o render detecta a porta automaticamente via process.env.PORT

### 🪽 observações
- dados armazenados em json
- projeto educacional / portfólio
- testes realizados com postman
- integração total com o frontend

🤍 feito por
desenvolvido por lavinia ribeiro 🪽🤍
projeto inspirado no álbum locket — madison beer 🔒🤍