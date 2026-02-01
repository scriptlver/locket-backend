const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rota teste
app.get("/", (req, res) => {
  res.send("Backend rodando 🚀");
});

// rota de criar conta
app.post("/register", (req, res) => {
  const { nome, email, senha } = req.body;

  res.json({
    message: "Usuário recebido com sucesso",
    nome,
    email
  });
});

// rota de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  res.json({
    message: "Login recebido com sucesso",
    email
  });
});

// iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
