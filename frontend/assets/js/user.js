document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-form");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const nome = document.getElementById("nome").value;
      const dt_nascimento = document.getElementById("dt_nascimento").value;
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

      console.log("Enviando dados do formulário...", {
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
      });

      try {
        const response = await fetch("http://localhost:3000/alunos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
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
          }),
        });

        if (!response.ok) throw new Error("Erro ao cadastrar usuário");

        alert("Usuário cadastrado com sucesso!");
        form.reset();
        carregarAlunos();
      } catch (error) {
        console.error("Erro:", error.message);
      }
    });
  }
});

async function carregarAlunos() {
  const tabela = document.getElementById("tabela-alunos");
  if (!tabela) {
    console.error("Erro: Elemento 'tabela-alunos' não encontrado!");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/alunos");

    if (!response.ok)
      throw new Error(`Erro na resposta da API: ${response.status}`);

    const resultado = await response.json(); // ✅ Obtendo a resposta
    console.log("Resposta da API:", resultado); // Debug para verificar os dados

    if (!resultado || !resultado.data || !Array.isArray(resultado.data)) {
      console.error(
        "Erro: resposta da API não contém um array válido!",
        resultado
      );
      return;
    }

    const alunos = resultado.data;

    // ✅ Resetando a tabela para garantir que novos dados sejam renderizados
    tabela.innerHTML = `
      <tr>
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
        <th>Ações</th>
      </tr>
    `;

    alunos.forEach((user) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${user.nome || "Não informado"}</td>
        <td>${user.dt_nascimento || "Não informado"}</td>
        <td>${user.contato || "Não informado"}</td>
        <td>${user.email || "Não informado"}</td>
        <td>${user.endereco || "Não informado"}</td>
        <td>${user.cidade || "Não informado"}</td>
        <td>${user.faixa || "Não informado"}</td>
        <td>${user.grau || "Não informado"}</td>
        <td>${user.ultgraduacao || "Não informado"}</td>
        <td>${user.nomeemergencia || "Não informado"}</td>
        <td>${user.contatoemergencia || "Não informado"}</td>
        <td>
          <button onclick="editarAluno(${user.id})" title="Editar">✏️</button>
          <button onclick="excluirAluno(${user.id})" title="Excluir">🗑️</button>
        </td>
      `;
      tabela.appendChild(linha);
    });

    // Adiciona evento para todos os botões de exclusão
    document.querySelectorAll(".btn-excluir").forEach((botao) => {
      botao.addEventListener("click", (event) => {
        const id = event.target.getAttribute("data-id");
        excluirAluno(id);
      });
    });

    console.log("Tabela atualizada com sucesso!");
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
}

carregarAlunos();
