const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

const usuariosPath = path.join(__dirname, "../data/usuarios.json");

// Função para ler usuários
function lerUsuarios() {
  try {
    if (!fs.existsSync(usuariosPath)) {
      // Cria o arquivo se não existir
      fs.writeFileSync(usuariosPath, "[]", "utf-8");
    }
    const data = fs.readFileSync(usuariosPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Erro ao ler usuários:", err);
    return [];
  }
}

// Função para salvar usuários
function salvarUsuarios(usuarios) {
  try {
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
  } catch (err) {
    console.error("Erro ao salvar usuários:", err);
  }
}

// ================= REGISTER =================
router.post("/register", (req, res) => {
  const { nome, email, senha, foto } = req.body;

  // validação básica
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  // email válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Digite um email válido" });
  }

  // senha mínima
  if (senha.length < 6) {
    return res.status(400).json({ error: "A senha deve ter no mínimo 6 caracteres" });
  }

  const usuarios = lerUsuarios();

  // verifica se email já existe
  if (usuarios.find(u => u.email === email)) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  // cria novo usuário
  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    senha, 
    foto: foto || null
  };

  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);

  res.status(201).json({ message: "Usuário criado com sucesso" });
});

// ================= LOGIN =================
router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha obrigatórios" });
  }

  const usuarios = lerUsuarios();
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  res.json({
    message: "Login realizado com sucesso",
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      foto: usuario.foto
    }
  });
});

// ================= LISTAR USUÁRIOS =================
router.get("/users", (req, res) => {
  const usuarios = lerUsuarios();
  const usuariosSemSenha = usuarios.map(u => ({
    id: u.id,
    nome: u.nome,
    email: u.email,
    senha: u.senha,
    foto: u.foto
  }));
  res.json(usuariosSemSenha);
});

module.exports = router;
