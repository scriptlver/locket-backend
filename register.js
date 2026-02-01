const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// middlewares
app.use(cors());
app.use(express.json());

// "banco" temporário
const usuarios = [];

// rota de teste
app.get("/", (req, res) => {
  res.send("Backend rodando 🚀");
});

// REGISTER
app.post("/register", (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      error: "Preencha todos os campos"
    });
  }

  usuarios.push({
    id: usuarios.length + 1,
    nome,
    email,
    senha
  });

  res.status(201).json({
    message: "Usuário criado com sucesso"
  });
});

// LISTAR USUÁRIOS
app.get("/users", (req, res) => {
  res.json(usuarios);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
