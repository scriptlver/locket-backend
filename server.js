const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI =
  "mongodb+srv://laviribeiro_db_user:loDyQmZhQRRVmLx9@cluster0.hje9fp6.mongodb.net/locket?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch((err) => console.error("Erro ao conectar ao Mongo:", err));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://locket-frontend-xi.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

app.get("/", (req, res) => res.send("Backend rodando com MongoDB!"));

app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
