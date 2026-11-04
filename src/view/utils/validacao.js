export function valorObrigatorio(valor) {
  return String(valor || "").trim().length > 0;
}

export function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export function senhasIguais(senha, confirmacao) {
  return senha === confirmacao;
}

export function senhaForte(senha) {
  return senha.length >= 8 && /[A-Z]/.test(senha) && /[a-z]/.test(senha) && /\d/.test(senha) && /[^A-Za-z0-9]/.test(senha);
}

export function limparErros(raiz) {
  raiz.querySelectorAll(".campo-erro").forEach((elemento) => elemento.remove());
  raiz.querySelectorAll(".invalido").forEach((elemento) => elemento.classList.remove("invalido"));
}

export function mostrarErro(campo, mensagem) {
  campo.classList.add("invalido");
  const erro = document.createElement("small");
  erro.className = "campo-erro";
  erro.textContent = mensagem;
  campo.parentElement.append(erro);
}
