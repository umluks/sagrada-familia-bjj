const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rota para salvar um novo usuário
app.post("/usuarios", (req, res) => {
  const {
    nome,
    dtnascimento, // Corrigido para minúsculas
    contato,
    email,
    endereco,
    cidade,
    faixa,
    ultgraduacao, // Corrigido para minúsculas
    nomeemergencia, // Corrigido para minúsculas
    contatoemergencia, // Corrigido para minúsculas
  } = req.body;

  if (
    !nome ||
    !dtnascimento ||
    !contato ||
    !email ||
    !endereco ||
    !cidade ||
    !faixa ||
    !ultgraduacao ||
    !nomeemergencia ||
    !contatoemergencia
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const sql = `INSERT INTO usuarios 
    (nome, dt_nascimento, contato, email, endereco, cidade, faixa, ult_graduacao, nome_emergencia, contato_emergencia) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      nome,
      dtnascimento, // Agora está igual ao que o frontend envia
      contato,
      email,
      endereco,
      cidade,
      faixa,
      ultgraduacao, // Agora está igual ao que o frontend envia
      nomeemergencia, // Agora está igual ao que o frontend envia
      contatoemergencia, // Agora está igual ao que o frontend envia
    ],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir usuário:", err);
        return res.status(500).json({ error: "Erro ao cadastrar usuário" });
      }
      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    }
  );
});

// Rota para listar usuários cadastrados
app.get("/usuarios", (req, res) => {
  const sql = "SELECT * FROM usuarios";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuários:", err);
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
    res.json({ message: "Sucesso", data: results });
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
