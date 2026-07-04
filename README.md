# 🔒🪽 locket backend 🤍

backend desenvolvido para o projeto **locket**, um site inspirado no álbum *locket* da madison beer 🤍.  
este servidor gerencia a persistência de dados e autenticação utilizando uma infraestrutura baseada em nuvem.

---

## 🤍 hospedagem e acesso

o projeto está disponível online através da vercel:

* **link do site:** [https://locket-frontend-xi.vercel.app](https://locket-frontend-xi.vercel.app)
* **status:** 🤍 online & integrado ao backend: [https://locket-backend-78sy.onrender.com](https://locket-backend-78sy.onrender.com)
* **vídeo demo:** [assista no youtube](https://youtu.be/ys_g7n42BKc)

---

## 🪽 tecnologias utilizadas

* **react**: base do projeto para alta performance e componentes dinâmicos.
* **html**: estruturação semântica de todo o conteúdo.
* **css**: estilização personalizada, moderna e utilitária.
* **axios**: integração com o backend para consumo da api.
* **mongodb atlas**: banco de dados em nuvem para persistência de dados.
* **postman**: validação e testes rigorosos de todas as rotas da api.
* **figma**: planejamento de ui/ux e prototipagem visual detalhada.
* **vercel**: hospedagem oficial do frontend.
* **render**: hospedagem oficial do backend.
---

## 🔒 arquitetura de dados

- **persistência**: os dados são armazenados no cluster mongodb atlas, garantindo que as informações não sejam perdidas após reinicializações do servidor.
- **imagens**: as fotos de perfil são processadas em **base64** e armazenadas diretamente no banco de dados, eliminando a dependência de sistema de arquivos local (fs).
- **identificação**: utilização de `_id` nativo do mongodb para garantir integridade e unicidade dos registros.

---

## 🪽 funcionalidades principais

- ✅ **autenticação**: registro e login de usuários.
- ✅ **perfil**: edição de informações pessoais, bio e foto.
- ✅ **favoritos**: sistema de gerenciamento de músicas favoritas por usuário.
- ✅ **segurança**: validação de campos obrigatórios e tratamento de erros globais.

---

## 🤍 estrutura do repositório

```text
locket-backend/
├─ models/
│  └─ user.js          # definição do esquema de dados (schema)
├─ routes/
│  └─ auth.routes.js   # endpoints da api e lógica de negócio
├─ server.js           # ponto de entrada e conexão com o banco
└─ package.json        # gerenciamento de dependências
```
---
## 🪽 como rodar localmente 🤍
- **instalação**: execute o comando abaixo para baixar as dependências:
```bash
npm install
```
- **conexão**: verifique se a mongo_uri no arquivo server.js está configurada com suas credenciais do atlas.
- **execução**: suba o servidor localmente com o comando:
```bash
node server.js
```
---
### 🪽 observações finais 🤍

- este projeto possui caráter educativo e de portfólio.
- as senhas são armazenadas em texto simples para fins de teste (não recomendado para produção).
- integração total realizada com o frontend via vercel.
- todos os testes de rotas foram validados via postman.