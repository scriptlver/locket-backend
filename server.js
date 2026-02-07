const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// middlewares
app.use(cors());
app.use(express.json());

// rotas
const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

app.use("/uploads", express.static("uploads"));


// rota teste
app.get("/", (req, res) => {
  res.send("Backend rodando 🚀");
});

app.get("/teste", (req, res) => {
  res.send("rota teste ok");
});

// iniciar servidor (sempre por último, e eu nn sabia hahahaha)
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
