import { criarElemento } from "../utils/dom.js";

export function criarCampo(configuracao) {
  const grupo = criarElemento("label", `grupo-campo ${configuracao.classe || ""}`.trim());
  const rotulo = criarElemento("span", "campo-rotulo");
  rotulo.append(document.createTextNode(configuracao.rotulo));
  if (configuracao.obrigatorio) rotulo.append(criarElemento("b", "campo-obrigatorio", " *"));

  const tag = configuracao.tipo === "textarea" ? "textarea" : configuracao.tipo === "select" ? "select" : "input";
  const campo = document.createElement(tag);
  campo.name = configuracao.nome;
  campo.id = configuracao.id || configuracao.nome;
  if (tag === "input") campo.type = configuracao.tipo || "text";
  if (configuracao.placeholder) campo.placeholder = configuracao.placeholder;
  if (configuracao.min !== undefined) campo.min = configuracao.min;
  if (configuracao.max !== undefined) campo.max = configuracao.max;
  if (configuracao.step !== undefined) campo.step = configuracao.step;
  if (configuracao.autocomplete) campo.autocomplete = configuracao.autocomplete;
  if (configuracao.obrigatorio) campo.required = true;

  if (configuracao.opcoes) {
    if (configuracao.placeholder) {
      const placeholder = criarElemento("option", "", configuracao.placeholder);
      placeholder.value = "";
      placeholder.disabled = Boolean(configuracao.obrigatorio);
      campo.append(placeholder);
    }
    configuracao.opcoes.forEach((opcao) => {
      const option = criarElemento("option", "", opcao.rotulo || opcao);
      option.value = opcao.valor ?? opcao;
      campo.append(option);
    });
  }

  if (configuracao.valor !== undefined && configuracao.valor !== null) campo.value = configuracao.valor;
  grupo.append(rotulo, campo);
  if (configuracao.ajuda) grupo.append(criarElemento("small", "campo-ajuda", configuracao.ajuda));
  return { grupo, campo };
}

export function criarSeletorSenha(rotulo, nome, opcoes = {}) {
  const resultado = criarCampo({ rotulo, nome, tipo: "password", obrigatorio: opcoes.obrigatorio, autocomplete: opcoes.autocomplete });
  const linha = criarElemento("div", "campo-senha");
  const botao = criarElemento("button", "botao-olho", "Mostrar");
  botao.type = "button";
  botao.setAttribute("aria-label", `Mostrar ${rotulo.toLowerCase()}`);
  resultado.grupo.replaceChild(linha, resultado.campo);
  linha.append(resultado.campo, botao);
  botao.addEventListener("click", () => {
    const exibir = resultado.campo.type === "password";
    resultado.campo.type = exibir ? "text" : "password";
    botao.textContent = exibir ? "Ocultar" : "Mostrar";
    botao.setAttribute("aria-label", `${exibir ? "Ocultar" : "Mostrar"} ${rotulo.toLowerCase()}`);
  });
  return resultado;
}