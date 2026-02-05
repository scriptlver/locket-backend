const express = require("express");
const cors = require("cors");
const path = require("path");


const app = express();
const PORT = 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// rotas
const authRoutes = require("./routes/auth.routes");
app.use(authRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// rota teste
app.get("/", (req, res) => {
  res.send("Backend rodando 🚀");
});

// iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
