async function excluirAluno(id) {
  if (!confirm(`Tem certeza que deseja excluir?`)) {
    return; // Cancela a exclusão se o usuário desistir
  }

  try {
    const response = await fetch(`http://localhost:3000/alunos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir aluno");
    }

    alert("Aluno excluído com sucesso!");
    carregarAlunos(); // Atualiza a tabela após a exclusão
  } catch (error) {
    console.error("Erro ao excluir aluno:", error);
  }
}
