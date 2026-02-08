const fs = require("fs");
const path = require("path");
const express = require("express");

const router = express.Router();

const usuariosPath = path.join(__dirname, "../data/usuarios.json");
const uploadsPath = path.join(__dirname, "../uploads");

/* ========================================================= */
/* ================= CRIAR PASTAS SE NÃO EXISTIREM ========= */
/* ========================================================= */

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

/* ========================================================= */
/* ================= SALVAR FOTO BASE64 ==================== */
/* ========================================================= */

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

/* ========================================================= */
/* ================= LER USUÁRIOS ========================== */
/* ========================================================= */

function lerUsuarios() {
  try {
    if (!fs.existsSync(usuariosPath)) {
      fs.writeFileSync(usuariosPath, "[]", "utf-8");
    }

    return JSON.parse(fs.readFileSync(usuariosPath, "utf-8"));
  } catch (err) {
    console.error("Erro ao ler usuários:", err);
    return [];
  }
}

/* ========================================================= */
/* ================= SALVAR USUÁRIOS ======================= */
/* ========================================================= */

function salvarUsuarios(usuarios) {
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
}

/* ========================================================= */
/* ================= REGISTRO ============================== */
/* ========================================================= */

router.post("/register", (req, res) => {
  const { nomeUsuario, nome, email, senha, foto, bio } = req.body;

  if (!nomeUsuario || !nome || !email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Digite um email válido" });
  }

  if (senha.length < 6) {
    return res.status(400).json({
      error: "A senha deve ter no mínimo 6 caracteres",
    });
  }

  const usuarios = lerUsuarios();

  if (usuarios.find((u) => u.email === email)) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  if (usuarios.find((u) => u.nomeUsuario === nomeUsuario)) {
    return res.status(400).json({ error: "Nome de usuário já existe" });
  }

  const fotoSalva = salvarFotoBase64(foto);

  const novoUsuario = {
    id: usuarios.length + 1,
    nomeUsuario,
    nome,
    email,
    senha,
    foto: fotoSalva,
    bio: bio || ""
  };

  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);

  res.status(201).json({ message: "Usuário criado com sucesso" });
});

/* ========================================================= */
/* ================= LOGIN ================================ */
/* ========================================================= */

router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha obrigatórios" });
  }

  const usuarios = lerUsuarios();

  const usuario = usuarios.find(
    (u) => u.email === email && u.senha === senha
  );

  if (!usuario) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  res.json({
    message: "Login realizado com sucesso",
    usuario: {
      id: usuario.id,
      nomeUsuario: usuario.nomeUsuario,
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      foto: usuario.foto,
      bio: usuario.bio || ""
    },
  });
});

/* ========================================================= */
/* ================= LISTAR USUÁRIOS ====================== */
/* ========================================================= */

router.get("/users", (req, res) => {
  res.json(lerUsuarios());
});

/* ========================================================= */
/* ================= BUSCAR POR ID ======================== */
/* ========================================================= */

router.get("/users/:id", (req, res) => {
  const usuarios = lerUsuarios();
  const usuario = usuarios.find((u) => u.id === Number(req.params.id));

  if (!usuario) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  res.json(usuario);
});

/* ========================================================= */
/* ================= EDITAR PERFIL ======================== */
/* ========================================================= */

router.put("/editar-perfil", (req, res) => {
  const { id, nomeUsuario, nome, email, senha, foto, bio } = req.body;

  const usuarios = lerUsuarios();
  const index = usuarios.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  if (nomeUsuario) {
    const existe = usuarios.find(
      (u) => u.nomeUsuario === nomeUsuario && u.id !== id
    );

    if (existe) {
      return res.status(400).json({ error: "Nome de usuário já existe" });
    }

    usuarios[index].nomeUsuario = nomeUsuario;
  }

  if (nome) usuarios[index].nome = nome;
  if (email) usuarios[index].email = email;

  if (senha && senha.length >= 6) {
    usuarios[index].senha = senha;
  }

  if (bio !== undefined) {
    usuarios[index].bio = bio;
  }

  if (foto && foto.startsWith("data:image")) {
    usuarios[index].foto = salvarFotoBase64(foto);
  }

  salvarUsuarios(usuarios);

  res.json({
    message: "Perfil atualizado com sucesso",
    usuario: usuarios[index],
  });
});

/* ========================================================= */
/* ================= DELETAR USUÁRIO ====================== */
/* ========================================================= */

router.delete("/users/:id", (req, res) => {
  const usuarios = lerUsuarios();
  const index = usuarios.findIndex(
    (u) => u.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const usuarioRemovido = usuarios.splice(index, 1);
  salvarUsuarios(usuarios);

  res.json({
    message: "Usuário deletado com sucesso",
    usuario: usuarioRemovido[0],
  });
});

module.exports = router;
