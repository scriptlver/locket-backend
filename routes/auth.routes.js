console.log("AUTH.ROUTES.JS FOI CARREGADO");

const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

function salvarFotoBase64(fotoBase64) {
  if (!fotoBase64) return null;

  const matches = fotoBase64.match(/^data:image\/(\w+);base64,/);
  const extensao = matches ? matches[1] : "png";

  const base64Data = fotoBase64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const nomeArquivo = `user_${Date.now()}.${extensao}`;
  const caminho = path.join(__dirname, "../uploads", nomeArquivo);

  fs.writeFileSync(caminho, buffer);

  return nomeArquivo; 
}


const usuariosPath = path.join(__dirname, "../data/usuarios.json");

// função para ler usuários
function lerUsuarios() {
  try {
    if (!fs.existsSync(usuariosPath)) {
      fs.writeFileSync(usuariosPath, "[]", "utf-8");
    }
    const data = fs.readFileSync(usuariosPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Erro ao ler usuários:", err);
    return [];
  }
}

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
  const fotoSalva = salvarFotoBase64(foto);



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
    foto: fotoSalva
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

// ================= BUSCAR USUÁRIO POR ID =================
router.get("/users/:id", (req, res) => {
  const { id } = req.params;

  const usuarios = lerUsuarios();
  const usuario = usuarios.find(u => u.id === Number(id));

  if (!usuario) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  res.json({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    senha: usuario.senha,
    foto: usuario.foto
  });
});



// ================= EDITAR PERFIL =================
router.put("/editar-perfil", (req, res) => {
  const { id, nome, email, senha, foto } = req.body;

  const usuarios = lerUsuarios();
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  usuarios[index].nome = nome || usuarios[index].nome;
  usuarios[index].email = email || usuarios[index].email;

  if (foto && foto.startsWith("data:image")) {
    const novaFoto = salvarFotoBase64(foto);
    usuarios[index].foto = novaFoto;
  }

  if (senha && senha.length >= 6) {
    usuarios[index].senha = senha;
  }

  salvarUsuarios(usuarios);

  res.json({
    message: "Perfil atualizado com sucesso",
    usuario: {
      id: usuarios[index].id,
      nome: usuarios[index].nome,
      email: usuarios[index].email,
      senha: usuarios[index].senha,
      foto: usuarios[index].foto
    }
  });
});

module.exports = router;




