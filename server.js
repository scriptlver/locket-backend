const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "./favorites.json";

// garante que o arquivo existe
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify([]));
}

// GET favoritos
app.get("/favorites", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

// POST favorito
app.post("/favorites", (req, res) => {
  const favorites = JSON.parse(fs.readFileSync(FILE));
  const song = req.body;

  const exists = favorites.find(f => f.name === song.name);

  if (!exists) {
    favorites.push(song);
    fs.writeFileSync(FILE, JSON.stringify(favorites, null, 2));
  }

  res.json({ success: true });
});

// DELETE favorito
app.delete("/favorites/:name", (req, res) => {
  let favorites = JSON.parse(fs.readFileSync(FILE));
  favorites = favorites.filter(f => f.name !== req.params.name);

  fs.writeFileSync(FILE, JSON.stringify(favorites, null, 2));
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Backend rodando em http://localhost:3000");
});
