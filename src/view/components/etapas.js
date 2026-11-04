import { criarElemento } from "../utils/dom.js";

export function criarEditorEtapas(etapasIniciais = []) {
  const raiz = criarElemento("section", "editor-etapas");
  const titulo = criarElemento("h2", "", "Etapas do processo");
  const lista = criarElemento("div", "lista-etapas");
  const novaEtapa = document.createElement("input");
  const adicionar = criarElemento("button", "botao-secundario", "Adicionar etapa");
  const etapas = [...etapasIniciais];

  novaEtapa.placeholder = "Nome da nova etapa";
  adicionar.type = "button";

  function atualizarLista() {
    lista.replaceChildren();
    etapas.forEach((etapa, indice) => {
      const item = criarElemento("div", "etapa-item");
      const nome = criarElemento("span", "", `${indice + 1}. ${etapa}`);
      const remover = criarElemento("button", "botao-remover", "Remover");
      remover.type = "button";
      remover.addEventListener("click", () => {
        etapas.splice(indice, 1);
        atualizarLista();
      });
      item.append(nome, remover);
      lista.append(item);
    });
  }

  adicionar.addEventListener("click", () => {
    const valor = novaEtapa.value.trim();
    if (valor) {
      etapas.push(valor);
      novaEtapa.value = "";
      atualizarLista();
    }
  });

  raiz.append(titulo, lista, novaEtapa, adicionar);
  atualizarLista();

  return { elemento: raiz, obterEtapas: () => [...etapas] };
}
