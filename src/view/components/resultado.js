import { criarElemento } from "../utils/dom.js";

export function criarResultadoObjeto() {
  const bloco = criarElemento("section", "resultado-objeto");
  const titulo = criarElemento("h2", "", "Objeto produzido pelo formulário");
  const codigo = criarElemento("pre", "", "Preencha e envie o formulário para visualizar o objeto.");
  bloco.append(titulo, codigo);

  return {
    elemento: bloco,
    atualizar(dados) {
      codigo.textContent = JSON.stringify(dados, null, 2);
    },
  };
}
