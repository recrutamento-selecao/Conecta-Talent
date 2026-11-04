import { criarElemento } from "../utils/dom.js";

export function criarMensagem() {
  const mensagem = criarElemento("div", "mensagem-formulario");
  mensagem.hidden = true;

  return {
    elemento: mensagem,
    mostrar(texto, tipo = "sucesso") {
      mensagem.textContent = texto;
      mensagem.className = `mensagem-formulario ${tipo}`;
      mensagem.hidden = false;
    },
    esconder() {
      mensagem.hidden = true;
    },
  };
}
