app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  // 1. busca usuário no banco
  // 2. compara senha
  // 3. gera token

  res.json({ token });
});
