async function excluirAluno(id) {
  try {
    const response = await fetch(`http://localhost:3000/alunos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Erro ao excluir aluno: ${response.status} ${response.statusText}`
      );
    }

    console.log("Aluno excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir aluno:", error);
  }
}

excluirAluno(id);
