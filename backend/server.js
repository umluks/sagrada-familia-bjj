const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/database");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rota para salvar um novo usuário
app.post("/alunos", (req, res) => {
  const {
    nome,
    dt_nascimento,
    contato,
    email,
    endereco,
    cidade,
    faixa,
    grau,
    ultgraduacao,
    nomeemergencia,
    contatoemergencia, // Corrigido para minúsculas
  } = req.body;

  if (
    !nome ||
    !dt_nascimento ||
    !contato ||
    !email ||
    !endereco ||
    !cidade ||
    !faixa ||
    !grau ||
    !ultgraduacao ||
    !nomeemergencia ||
    !contatoemergencia
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const sql = `INSERT INTO alunos 
    (nome, dt_nascimento, contato, email, endereco, cidade, faixa, grau, ultgraduacao, nomeemergencia, contatoemergencia) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      nome,
      dt_nascimento, // Agora está igual ao que o frontend envia
      contato,
      email,
      endereco,
      cidade,
      faixa,
      grau,
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
app.get("/alunos", (req, res) => {
  const sql = "SELECT * FROM alunos";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuários:", err);
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
    res.json({ message: "Sucesso", data: results });
  });
});

// Rota para excluir um aluno pelo ID
app.delete("/alunos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM alunos WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir aluno:", err);
      return res.status(500).json({ error: "Erro ao excluir aluno" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }
    res.json({ message: "Aluno excluído com sucesso!" });
  });
});

// Rota para atualizar um aluno pelo ID
app.put("/alunos/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    dt_nascimento,
    contato,
    email,
    endereco,
    cidade,
    faixa,
    grau,
    ultgraduacao,
    nomeemergencia,
    contatoemergencia,
  } = req.body;

  // Verifica se todos os campos foram enviados
  if (
    !nome ||
    !dt_nascimento ||
    !contato ||
    !email ||
    !endereco ||
    !cidade ||
    !faixa ||
    !grau ||
    !ultgraduacao ||
    !nomeemergencia ||
    !contatoemergencia
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const sql = `UPDATE alunos SET 
    nome = ?, dt_nascimento = ?, contato = ?, email = ?, endereco = ?, 
    cidade = ?, faixa = ?, grau = ?, ultgraduacao = ?, 
    nomeemergencia = ?, contatoemergencia = ? 
    WHERE id = ?`;

  db.query(
    sql,
    [
      nome,
      dt_nascimento,
      contato,
      email,
      endereco,
      cidade,
      faixa,
      grau,
      ultgraduacao,
      nomeemergencia,
      contatoemergencia,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar aluno:", err);
        return res.status(500).json({ error: "Erro ao atualizar aluno" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }
      res.json({ message: "Aluno atualizado com sucesso!" });
    }
  );
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
