import { criarSidebar } from "../components/sidebar.js";
import { criarCampo } from "../components/campos.js";
import { criarMensagem } from "../components/mensagem.js";
import { criarEditorEtapas } from "../components/etapas.js";
import { criarResultadoObjeto } from "../components/resultado.js";
import { criarElemento, criarPagina } from "../utils/dom.js";
import { limparErros, mostrarErro, valorObrigatorio } from "../utils/validacao.js";
import { atualizarVaga } from "../services/recrutamentoApi.js";

export function renderConfiguracaoVaga(dadosIniciais = {}) {
  const dados = {
    id: dadosIniciais.id || "VAGA-001",
    titulo: dadosIniciais.titulo || "Software Engineer",
    status: dadosIniciais.status || "Publicada",
    visibilidade: dadosIniciais.visibilidade || "Pública",
    limiteCandidatos: dadosIniciais.limiteCandidatos || 100,
    etapas: dadosIniciais.etapas || ["Triagem", "Entrevista com RH", "Entrevista técnica"],
  };
  const { pagina, conteudo } = criarPagina("pagina-configuracao-vaga", "Configuração da vaga", "Atualize as regras de publicação e do processo seletivo");
  const formulario = criarElemento("form", "formulario-pagina");
  const cartao = criarElemento("section", "cartao");
  const mensagem = criarMensagem();
  const resultado = criarResultadoObjeto();
  const titulo = criarCampo({ nome: "titulo", rotulo: "Título", valor: dados.titulo });
  const status = criarCampo({ nome: "status", rotulo: "Status", tipo: "select", opcoes: ["Rascunho", "Publicada", "Pausada"], valor: dados.status });
  const visibilidade = criarCampo({ nome: "visibilidade", rotulo: "Visibilidade", tipo: "select", opcoes: ["Pública", "Privada"], valor: dados.visibilidade });
  const limite = criarCampo({ nome: "limiteCandidatos", rotulo: "Limite de candidatos", tipo: "number", valor: dados.limiteCandidatos });
  const editorEtapas = criarEditorEtapas(dados.etapas);
  const previa = criarElemento("p", "previa-configuracao");
  const salvar = criarElemento("button", "botao-primario", "Salvar configuração");
  salvar.type = "submit";

  function refletirMudancas() {
    previa.textContent = `${titulo.campo.value || "Sem título"} • ${status.campo.value} • ${visibilidade.campo.value}`;
  }

  [titulo.campo, status.campo, visibilidade.campo].forEach((campo) => campo.addEventListener("input", refletirMudancas));
  refletirMudancas();

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    limparErros(formulario);
    mensagem.esconder();
    if (!valorObrigatorio(titulo.campo.value)) {
      mostrarErro(titulo.campo, "Informe o título da vaga");
      return;
    }
    if (editorEtapas.obterEtapas().length === 0) {
      mensagem.mostrar("A vaga precisa ter ao menos uma etapa.", "erro");
      return;
    }
    const objeto = {
      id: dados.id,
      titulo: titulo.campo.value.trim(),
      status: status.campo.value.toLowerCase(),
      visibilidade: visibilidade.campo.value.toLowerCase(),
      limiteCandidatos: Number(limite.campo.value) || null,
      etapas: editorEtapas.obterEtapas(),
      atualizadoEm: new Date().toISOString(),
    };
    await atualizarVaga(objeto);
    resultado.atualizar(objeto);
    mensagem.mostrar("Configuração atualizada.");
  });

  cartao.append(criarElemento("h2", "", "Dados atuais"), previa, titulo.grupo, status.grupo, visibilidade.grupo, limite.grupo, editorEtapas.elemento);
  formulario.append(cartao, mensagem.elemento, salvar);
  conteudo.append(formulario, resultado.elemento);
  pagina.prepend(criarSidebar());
  return pagina;
}
