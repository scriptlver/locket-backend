const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// middlewares
app.use(cors());
app.use(express.json());

// "banco" temporário
const usuarios = [];

// rota teste
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

  const emailExiste = usuarios.find(u => u.email === email);
  if (emailExiste) {
    return res.status(400).json({
      error: "Email já cadastrado"
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

// LOGIN
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      error: "Email e senha obrigatórios"
    });
  }

  const usuario = usuarios.find(
    u => u.email === email && u.senha === senha
  );

  if (!usuario) {
    return res.status(401).json({
      error: "Email ou senha inválidos"
    });
  }

  res.json({
    message: "Login realizado com sucesso",
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }
  });
});

// LISTAR USUÁRIOS
app.get("/users", (req, res) => {
  res.json(usuarios);
});

// iniciar servidor (SEMPRE NO FINAL)
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
