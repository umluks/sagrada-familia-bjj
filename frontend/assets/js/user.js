document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-form");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const nome = document.getElementById("nome").value;
      const dtnascimento = document.getElementById("dtnascimento").value;
      const contato = document.getElementById("contato").value;
      const email = document.getElementById("email").value;
      const endereco = document.getElementById("endereco").value;
      const cidade = document.getElementById("cidade").value;
      const faixa = document.getElementById("faixa").value;
      const grau = document.getElementById("grau").value;
      const ultgraduacao = document.getElementById("ultgraduacao").value;
      const nomeemergencia = document.getElementById("nomeemergencia").value;
      const contatoemergencia =
        document.getElementById("contatoemergencia").value;

      console.log("Dados do formulário:", {
        nome,
        dtnascimento,
        contato,
        email,
        endereco,
        cidade,
        faixa,
        grau,
        ultgraduacao,
        nomeemergencia,
        contatoemergencia,
      });

      try {
        const response = await fetch("http://localhost:3000/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome,
            dtnascimento,
            contato,
            email,
            endereco,
            cidade,
            faixa,
            grau,
            ultgraduacao,
            nomeemergencia,
            contatoemergencia,
          }),
        });

        if (!response.ok) throw new Error("Erro ao cadastrar usuário");

        alert("Usuário cadastrado com sucesso!");
        form.reset();
        carregarUsuarios();
      } catch (error) {
        alert(error.message);
      }
    });
  }
});

async function carregarUsuarios() {
  const tabela = document.getElementById("tabela-usuarios");
  if (!tabela) return;

  try {
    const response = await fetch("http://localhost:3000/usuarios");
    const data = await response.json();
    const usuarios = data.data || [];

    if (!Array.isArray(usuarios)) {
      console.error("Erro: resposta da API não é um array!", usuarios);
      return;
    }

    tabela.innerHTML = `<tr>
      <th>Nome</th>
      <th>Data de Nascimento</th>
      <th>Contato</th>
      <th>Email</th>
      <th>Endereço</th>
      <th>Cidade</th>
      <th>Faixa</th>
      <th>Grau</th>
      <th>Última Graduação</th>
      <th>Nome Emergência</th>
      <th>Contato Emergência</th>
    </tr>`;

    usuarios.forEach((user) => {
      const getValue = (value) => (value ? value : "Não informado");
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${getValue(user.nome)}</td>
        <td>${getValue(user.dt_nascimento)}</td>
        <td>${getValue(user.contato)}</td>
        <td>${getValue(user.email)}</td>
        <td>${getValue(user.endereco)}</td>
        <td>${getValue(user.cidade)}</td>
        <td>${getValue(user.faixa)}</td>
        <td>${getValue(user.grau)}</td>
        <td>${getValue(user.ultgraduacao)}</td>
        <td>${getValue(user.nomeemergencia)}</td>
        <td>${getValue(user.contatoemergencia)}</td>
      `;
      tabela.appendChild(linha);
    });
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
}

carregarUsuarios();
