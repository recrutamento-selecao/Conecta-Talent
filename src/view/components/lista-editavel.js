import { criarElemento } from "../utils/dom.js";

export function criarListaEditavel(configuracao = {}) {
  const itens = [...(configuracao.itens || [])];
  const raiz = criarElemento("section", "lista-editavel");
  const cabecalho = criarElemento("div", "lista-editavel-cabecalho");
  const textos = criarElemento("div", "");
  textos.append(criarElemento("h3", "", configuracao.titulo || "Itens"));
  if (configuracao.subtitulo) textos.append(criarElemento("p", "", configuracao.subtitulo));
  cabecalho.append(textos);

  const entrada = criarElemento("div", "lista-editavel-entrada");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = configuracao.placeholder || "Digite um item";
  const adicionar = criarElemento("button", "botao-secundario botao-compacto", configuracao.rotuloAdicionar || "Adicionar");
  adicionar.type = "button";
  entrada.append(input, adicionar);

  const lista = criarElemento("div", "lista-editavel-itens");
  const vazio = criarElemento("p", "lista-vazia", configuracao.mensagemVazia || "Nenhum item adicionado.");

  function emitir() {
    configuracao.onChange?.([...itens]);
  }

  function mover(indice, direcao) {
    const destino = indice + direcao;
    if (destino < 0 || destino >= itens.length) return;
    [itens[indice], itens[destino]] = [itens[destino], itens[indice]];
    renderizar();
    emitir();
  }

  function renderizar() {
    lista.replaceChildren();
    vazio.hidden = itens.length > 0;
    itens.forEach((texto, indice) => {
      const item = criarElemento("div", "lista-editavel-item");
      const numero = criarElemento("span", "lista-editavel-numero", String(indice + 1));
      const nome = criarElemento("span", "lista-editavel-texto", texto);
      const acoes = criarElemento("div", "lista-editavel-acoes");
      const subir = criarElemento("button", "botao-icone", "↑");
      const descer = criarElemento("button", "botao-icone", "↓");
      const remover = criarElemento("button", "botao-icone perigo", "×");
      [subir, descer, remover].forEach((botao) => botao.type = "button");
      subir.disabled = indice === 0;
      descer.disabled = indice === itens.length - 1;
      subir.title = "Mover para cima";
      descer.title = "Mover para baixo";
      remover.title = "Remover item";
      subir.addEventListener("click", () => mover(indice, -1));
      descer.addEventListener("click", () => mover(indice, 1));
      remover.addEventListener("click", () => {
        itens.splice(indice, 1);
        renderizar();
        emitir();
      });
      acoes.append(subir, descer, remover);
      item.append(numero, nome, acoes);
      lista.append(item);
    });
  }

  function adicionarItem() {
    const valor = input.value.trim();
    if (!valor || itens.includes(valor)) {
      input.focus();
      return;
    }
    itens.push(valor);
    input.value = "";
    renderizar();
    emitir();
    input.focus();
  }

  adicionar.addEventListener("click", adicionarItem);
  input.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
      evento.preventDefault();
      adicionarItem();
    }
  });

  raiz.append(cabecalho, entrada, vazio, lista);
  renderizar();

  return {
    elemento: raiz,
    obterItens: () => [...itens],
    atualizar(novosItens = []) {
      itens.splice(0, itens.length, ...novosItens);
      renderizar();
    }
  };
}