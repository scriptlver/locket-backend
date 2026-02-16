const fs = require("fs");
const path = require("path");
const express = require("express");

const router = express.Router();

const usuariosPath = path.join(__dirname, "../data/usuarios.json");
const uploadsPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

function salvarFotoBase64(fotoBase64) {
  if (!fotoBase64) return null;

  const matches = fotoBase64.match(/^data:image\/(\w+);base64,/);
  const extensao = matches ? matches[1] : "png";

  const base64Data = fotoBase64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const nomeArquivo = `user_${Date.now()}.${extensao}`;
  const caminho = path.join(uploadsPath, nomeArquivo);

  fs.writeFileSync(caminho, buffer);

  return nomeArquivo;
}

function lerUsuarios() {
  try {
    if (!fs.existsSync(usuariosPath)) {
      fs.writeFileSync(usuariosPath, "[]", "utf-8");
    }
    return JSON.parse(fs.readFileSync(usuariosPath, "utf-8"));
  } catch {
    return [];
  }
}

function salvarUsuarios(usuarios) {
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
}

// registrar usuário

router.post("/register", (req, res) => {
  const { nomeUsuario, nome, email, senha, foto, bio } = req.body;

  if (!nomeUsuario || !nome || !email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  const usuarios = lerUsuarios();

  if (usuarios.find(u => u.email === email)) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  if (usuarios.find(u => u.nomeUsuario === nomeUsuario)) {
    return res.status(400).json({ error: "Nome de usuário já existe" });
  }

  const fotoSalva = salvarFotoBase64(foto);

  const novoUsuario = {
    id: Date.now(),
    nomeUsuario,
    nome,
    email,
    senha,
    foto: fotoSalva,
    bio: bio || "",
    favoritos: []
  };

  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);

  res.status(201).json({ message: "Usuário criado com sucesso" });
});

// login

router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const usuarios = lerUsuarios();
  const usuario = usuarios.find(
    u => u.email === email && u.senha === senha
  );

  if (!usuario) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  res.json({
    message: "Login realizado com sucesso",
    usuario
  });
});

// obter lista de usuários 

router.get("/users", (req, res) => {
  res.json(lerUsuarios());
});

// obter dados do usuário por id 
router.get("/users/:id", (req, res) => {
  const usuarios = lerUsuarios();
  const usuario = usuarios.find(u => u.id === Number(req.params.id));

  if (!usuario) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  res.json(usuario);
});

// adicionar/remover favoritos

router.post("/favoritos", (req, res) => {
  const { userId, musicaId } = req.body;

  const usuarios = lerUsuarios();
  const usuario = usuarios.find(u => u.id === userId);

  if (!usuario) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  if (usuario.favoritos.includes(musicaId)) {
    usuario.favoritos = usuario.favoritos.filter(id => id !== musicaId);
  } else {
    usuario.favoritos.push(musicaId);
  }

  salvarUsuarios(usuarios);

  res.json({ favoritos: usuario.favoritos });
});

// editar perfil
router.put("/editar-perfil", (req, res) => {
  const { id, nomeUsuario, nome, email, senha, foto, bio } = req.body;

  const usuarios = lerUsuarios();
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  if (nomeUsuario) usuarios[index].nomeUsuario = nomeUsuario;
  if (nome) usuarios[index].nome = nome;
  if (email) usuarios[index].email = email;
  if (bio !== undefined) usuarios[index].bio = bio;
  if (senha && senha.length >= 6) usuarios[index].senha = senha;
  if (foto?.startsWith("data:image")) {
    usuarios[index].foto = salvarFotoBase64(foto);
  }

  salvarUsuarios(usuarios);

  res.json({ message: "Perfil atualizado" });
});

// deletar conta

router.delete("/users/:id", (req, res) => {
  const usuarios = lerUsuarios();
  const id = Number(req.params.id);

  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const usuarioRemovido = usuarios.splice(index, 1);

  salvarUsuarios(usuarios);

  res.json({
    message: "Usuário removido com sucesso",
    usuario: usuarioRemovido[0]
  });
});


module.exports = router;
