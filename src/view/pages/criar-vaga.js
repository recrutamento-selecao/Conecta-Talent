import { criarSidebar } from "../components/sidebar.js";
import { criarCampo } from "../components/campos.js";
import { criarMensagem } from "../components/mensagem.js";
import { criarEditorEtapas } from "../components/etapas.js";
import { criarResultadoObjeto } from "../components/resultado.js";
import { criarElemento, criarPagina } from "../utils/dom.js";
import { limparErros, mostrarErro, valorObrigatorio } from "../utils/validacao.js";
import { criarVaga } from "../services/recrutamentoApi.js";

export function renderCriarVaga() {
  const { pagina, conteudo } = criarPagina("pagina-criar-vaga", "Criar nova vaga", "Preencha as informações para publicar uma oportunidade");
  const formulario = criarElemento("form", "formulario-pagina");
  const cartao = criarElemento("section", "cartao");
  const grade = criarElemento("div", "grade-campos duas-colunas");
  const mensagem = criarMensagem();
  const resultado = criarResultadoObjeto();
  const editorEtapas = criarEditorEtapas(["Triagem de currículos", "Entrevista com RH", "Entrevista técnica", "Proposta"]);
  const campos = {};

  const configuracoes = [
    ["titulo", "Título da vaga", "Ex: Analista de Recursos Humanos"],
    ["departamento", "Área ou departamento", "Ex: Recursos Humanos"],
    ["contratacao", "Tipo de contratação", "Ex: CLT"],
    ["nivel", "Nível da vaga", "Ex: Pleno"],
    ["regime", "Regime de trabalho", "Ex: Híbrido"],
    ["local", "Local de trabalho", "Ex: Sorocaba SP"],
    ["salarioMinimo", "Salário mínimo", "Ex: 4000"],
    ["salarioMaximo", "Salário máximo", "Ex: 6000"],
  ];

  configuracoes.forEach(([nome, rotulo, placeholder]) => {
    const item = criarCampo({ nome, rotulo, placeholder });
    campos[nome] = item.campo;
    grade.append(item.grupo);
  });

  const resumo = criarCampo({ nome: "resumo", rotulo: "Resumo da vaga", tipo: "textarea", placeholder: "Descreva o propósito da vaga" });
  const responsabilidades = criarCampo({ nome: "responsabilidades", rotulo: "Responsabilidades", tipo: "textarea" });
  const requisitos = criarCampo({ nome: "requisitos", rotulo: "Requisitos obrigatórios", tipo: "textarea" });
  const diferenciais = criarCampo({ nome: "diferenciais", rotulo: "Diferenciais", tipo: "textarea" });
  const beneficios = criarCampo({ nome: "beneficios", rotulo: "Benefícios", tipo: "textarea" });
  campos.resumo = resumo.campo;
  campos.responsabilidades = responsabilidades.campo;
  campos.requisitos = requisitos.campo;

  const configuracao = criarElemento("section", "cartao configuracao-publicacao");
  const status = criarCampo({ nome: "status", rotulo: "Status", tipo: "select", opcoes: ["Rascunho", "Publicada"] });
  const visibilidade = criarCampo({ nome: "visibilidade", rotulo: "Visibilidade", tipo: "select", opcoes: ["Pública", "Privada"] });
  configuracao.append(criarElemento("h2", "", "Publicação"), status.grupo, visibilidade.grupo, editorEtapas.elemento);

  function montarObjeto(statusForcado) {
    return {
      titulo: campos.titulo.value.trim(),
      departamento: campos.departamento.value.trim(),
      contratacao: campos.contratacao.value.trim(),
      nivel: campos.nivel.value.trim(),
      regime: campos.regime.value.trim(),
      local: campos.local.value.trim(),
      salario: {
        minimo: Number(campos.salarioMinimo.value) || null,
        maximo: Number(campos.salarioMaximo.value) || null,
      },
      descricao: {
        resumo: resumo.campo.value.trim(),
        responsabilidades: responsabilidades.campo.value.trim(),
        requisitos: requisitos.campo.value.trim(),
        diferenciais: diferenciais.campo.value.trim(),
        beneficios: beneficios.campo.value.trim(),
      },
      status: statusForcado || status.campo.value.toLowerCase(),
      visibilidade: visibilidade.campo.value.toLowerCase(),
      etapas: editorEtapas.obterEtapas(),
      atualizadoEm: new Date().toISOString(),
    };
  }

  function validar() {
    limparErros(formulario);
    let valido = true;
    ["titulo", "departamento", "contratacao", "regime", "local", "resumo", "responsabilidades", "requisitos"].forEach((nome) => {
      if (!valorObrigatorio(campos[nome].value)) {
        mostrarErro(campos[nome], "Campo obrigatório");
        valido = false;
      }
    });
    if (editorEtapas.obterEtapas().length === 0) {
      mensagem.mostrar("Adicione ao menos uma etapa ao processo.", "erro");
      valido = false;
    }
    return valido;
  }

  const acoes = criarElemento("div", "acoes-formulario");
  const rascunho = criarElemento("button", "botao-secundario", "Salvar rascunho");
  const publicar = criarElemento("button", "botao-primario", "Publicar vaga");
  rascunho.type = "button";
  publicar.type = "submit";

  rascunho.addEventListener("click", async () => {
    limparErros(formulario);
    if (!valorObrigatorio(campos.titulo.value)) {
      mostrarErro(campos.titulo, "Informe um título para salvar o rascunho");
      return;
    }
    const objeto = montarObjeto("rascunho");
    await criarVaga(objeto);
    resultado.atualizar(objeto);
    mensagem.mostrar("Rascunho salvo temporariamente.");
  });

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    mensagem.esconder();
    if (!validar()) return;
    const objeto = montarObjeto("publicada");
    await criarVaga(objeto);
    resultado.atualizar(objeto);
    mensagem.mostrar("Vaga validada e preparada para integração com a API.");
  });

  cartao.append(criarElemento("h2", "", "Informações da vaga"), grade, resumo.grupo, responsabilidades.grupo, requisitos.grupo, diferenciais.grupo, beneficios.grupo);
  acoes.append(rascunho, publicar);
  formulario.append(cartao, configuracao, mensagem.elemento, acoes);
  conteudo.append(formulario, resultado.elemento);
  pagina.prepend(criarSidebar());
  return pagina;
}
