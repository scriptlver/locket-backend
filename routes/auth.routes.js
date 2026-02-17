const express = require("express");
const router = express.Router();
const User = require("../models/User");

// registrar usuário
router.post("/register", async (req, res) => {
  try {
    const { nomeUsuario, nome, email, senha, foto, bio } = req.body;

    if (!nomeUsuario || !nome || !email || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const existe = await User.findOne({ $or: [{ email }, { nomeUsuario }] });
    if (existe) {
      return res
        .status(400)
        .json({ error: "Email ou Nome de Usuário já cadastrado" });
    }

    const novoUsuario = new User({
      nomeUsuario,
      nome,
      email,
      senha,
      foto: foto || "",
      bio: bio || "",
      favoritos: [],
    });

    await novoUsuario.save();
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await User.findOne({ email, senha });

    if (!usuario) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    res.json({ message: "Login realizado com sucesso", usuario });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// obter lista de usuários
router.get("/users", async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// obter dados de um usuário específico
router.get("/users/:id", async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: "ID inválido ou erro no servidor" });
  }
});

// adicionar ou remover música dos favoritos
router.post("/favoritos", async (req, res) => {
  try {
    const { userId, musicaId } = req.body;
    const usuario = await User.findById(userId);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (usuario.favoritos.includes(musicaId)) {
      usuario.favoritos = usuario.favoritos.filter((id) => id !== musicaId);
    } else {
      usuario.favoritos.push(musicaId);
    }

    await usuario.save();
    res.json({ favoritos: usuario.favoritos });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar favoritos" });
  }
});

// editar perfil
router.put("/editar-perfil", async (req, res) => {
  try {
    const { id, nomeUsuario, nome, email, senha, foto, bio } = req.body;

    const updateData = {};
    if (nomeUsuario) updateData.nomeUsuario = nomeUsuario;
    if (nome) updateData.nome = nome;
    if (email) updateData.email = email;
    if (bio !== undefined) updateData.bio = bio;
    if (senha && senha.length >= 6) updateData.senha = senha;
    if (foto) updateData.foto = foto;

    const usuarioAtualizado = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }, // retorna o usuário já com as mudanças
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ message: "Perfil atualizado", usuario: usuarioAtualizado });
  } catch (err) {
    res.status(500).json({ error: "Erro ao editar perfil" });
  }
});

// deletar conta
router.delete("/users/:id", async (req, res) => {
  try {
    const usuarioRemovido = await User.findByIdAndDelete(req.params.id);

    if (!usuarioRemovido) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({
      message: "Usuário removido com sucesso",
      usuario: usuarioRemovido,
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar conta" });
  }
});

module.exports = router;
