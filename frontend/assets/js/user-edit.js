async function editarAluno(id) {
  try {
    const response = await fetch(`http://localhost:3000/alunos/${id}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar aluno: ${response.status}`);
    }

    const aluno = await response.json();
    console.log("Aluno carregado:", aluno);
    // Preencher os campos do formulário com os dados do aluno...
  } catch (error) {
    console.error("Erro ao carregar aluno:", error);
    alert("Aluno não encontrado!");
  }
}
