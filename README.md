# 🔒🪽 locket backend 🤍

backend desenvolvido para o projeto **locket**, um site inspirado no álbum *locket* da madison beer 🤍.  
este servidor gerencia a persistência de dados e autenticação utilizando uma infraestrutura baseada em nuvem.

---

## 🪽 tecnologias utilizadas

- **node.js & express**: servidor de api robusto e escalável.
- **mongodb atlas**: banco de dados nosql para armazenamento persistente.
- **mongoose**: modelagem de dados e interface de comunicação com o banco.
- **cors**: controle de acesso para integração segura com o frontend.
- **render**: hospedagem automatizada com deploy contínuo.

---

## 🤍 hospedagem e acesso

- **api base url**: `https://locket-backend-78sy.onrender.com`
- **frontend url**: `https://locket-frontend-xi.vercel.app`

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