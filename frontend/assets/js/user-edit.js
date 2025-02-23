async function editarAluno(id) {
  try {
    const response = await fetch(`http://localhost:3000/alunos/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar aluno");

    const aluno = await response.json();

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("dt_nascimento").value = aluno.dt_nascimento;
    document.getElementById("contato").value = aluno.contato;
    document.getElementById("email").value = aluno.email;
    document.getElementById("endereco").value = aluno.endereco;
    document.getElementById("cidade").value = aluno.cidade;
    document.getElementById("faixa").value = aluno.faixa;
    document.getElementById("grau").value = aluno.grau;
    document.getElementById("ultgraduacao").value = aluno.ultgraduacao;
    document.getElementById("nomeemergencia").value = aluno.nomeemergencia;
    document.getElementById("contatoemergencia").value =
      aluno.contatoemergencia;

    const form = document.getElementById("cadastro-form");
    form.dataset.editingId = id;
  } catch (error) {
    console.error("Erro ao carregar dados do aluno:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-form");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const id = form.dataset.editingId;
      const aluno = {
        nome: document.getElementById("nome").value,
        dt_nascimento: document.getElementById("dt_nascimento").value,
        contato: document.getElementById("contato").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,
        cidade: document.getElementById("cidade").value,
        faixa: document.getElementById("faixa").value,
        grau: document.getElementById("grau").value,
        ultgraduacao: document.getElementById("ultgraduacao").value,
        nomeemergencia: document.getElementById("nomeemergencia").value,
        contatoemergencia: document.getElementById("contatoemergencia").value,
      };

      try {
        const method = id ? "PUT" : "POST";
        const url = id
          ? `http://localhost:3000/alunos/${id}`
          : "http://localhost:3000/alunos";

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aluno),
        });

        if (!response.ok) throw new Error("Erro ao salvar aluno");

        alert(
          id ? "Aluno atualizado com sucesso!" : "Aluno cadastrado com sucesso!"
        );
        form.reset();
        delete form.dataset.editingId;
        carregarAlunos();
      } catch (error) {
        console.error("Erro:", error.message);
      }
    });
  }
});
