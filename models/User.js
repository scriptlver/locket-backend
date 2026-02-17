const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nomeUsuario: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  foto: { type: String, default: "" },
  bio: { type: String, default: "" },
  favoritos: { type: [String], default: [] }
});

module.exports = mongoose.model("User", UserSchema);