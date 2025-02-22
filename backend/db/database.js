const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "DB_SFBJJ",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err.message);
    process.exit(1);
  }
  console.log("✅ Conectado ao MySQL");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS alunos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      dt_nascimento VARCHAR(100) NOT NULL,
      contato VARCHAR(20) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      endereco VARCHAR(255) NOT NULL,
      cidade VARCHAR(100) NOT NULL,
      faixa VARCHAR(50) NOT NULL,
      grau VARCHAR(50) NOT NULL,
      ultgraduacao VARCHAR(100) NOT NULL,
      nomeemergencia VARCHAR(100) NOT NULL,
      contatoemergencia VARCHAR(20) NOT NULL
    )
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Erro ao criar tabela:", err.message);
    } else {
      console.log("✅ Tabela `alunos` pronta para uso!");
    }
  });
});

module.exports = connection;
