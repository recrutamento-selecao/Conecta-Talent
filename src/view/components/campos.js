import { criarElemento } from "../utils/dom.js";

export function criarCampo(configuracao) {
  const grupo = criarElemento("label", "grupo-campo");
  const rotulo = criarElemento("span", "campo-rotulo", configuracao.rotulo);
  const campo = document.createElement(configuracao.tipo === "textarea" ? "textarea" : configuracao.tipo === "select" ? "select" : "input");

  campo.name = configuracao.nome;
  campo.id = configuracao.nome;

  if (campo.tagName === "INPUT") {
    campo.type = configuracao.tipo || "text";
  }

  if (configuracao.placeholder) {
    campo.placeholder = configuracao.placeholder;
  }

  if (configuracao.opcoes) {
    configuracao.opcoes.forEach((opcao) => {
      const option = criarElemento("option", "", opcao.rotulo || opcao);
      option.value = opcao.valor || opcao;
      campo.append(option);
    });
  }

  if (configuracao.valor !== undefined) {
    campo.value = configuracao.valor;
  }

  grupo.append(rotulo, campo);
  return { grupo, campo };
}

export function criarSeletorSenha(rotulo, nome) {
  const resultado = criarCampo({ rotulo, nome, tipo: "password" });
  const linha = criarElemento("div", "campo-senha");
  const botao = criarElemento("button", "botao-olho", "Mostrar");
  botao.type = "button";

  resultado.grupo.replaceChild(linha, resultado.campo);
  linha.append(resultado.campo, botao);

  botao.addEventListener("click", () => {
    const exibir = resultado.campo.type === "password";
    resultado.campo.type = exibir ? "text" : "password";
    botao.textContent = exibir ? "Ocultar" : "Mostrar";
  });

  return resultado;
}
