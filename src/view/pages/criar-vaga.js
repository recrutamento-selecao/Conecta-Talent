import { criarSidebar } from "../components/sidebar.js";
import { criarStepper } from "../components/stepper.js";
import { criarCampo } from "../components/campos.js";
import { criarListaEditavel } from "../components/lista-editavel.js";
import { criarEditorEtapas } from "../components/etapas.js";
import { criarMensagem } from "../components/mensagem.js";
import { criarElemento, criarPagina, criarTituloCartao } from "../utils/dom.js";
import { criarVaga, obterDadosLocais, salvarRascunhoVaga } from "../services/recrutamentoApi.js";

const PASSOS = [
  { id: 1, titulo: "Informações básicas" },
  { id: 2, titulo: "Requisitos" },
  { id: 3, titulo: "Processo seletivo" },
  { id: 4, titulo: "Revisão e publicação" }
];

const ETAPAS_PADRAO = [
  { id: "triagem", nome: "Triagem de currículos", tipo: "triagem", descricao: "Análise inicial do perfil e dos requisitos obrigatórios.", duracao: "2 dias", responsavel: "Time de RH", obrigatoria: true, configuracao: { notaMinima: null, instrucoes: "", perguntas: [] } },
  { id: "entrevista-rh", nome: "Entrevista com RH", tipo: "entrevista", descricao: "Conversa sobre experiência, cultura e expectativas.", duracao: "45 minutos", responsavel: "Recrutamento", obrigatoria: true, configuracao: { notaMinima: null, instrucoes: "", perguntas: [] } }
];

function copiar(valor) {
  return JSON.parse(JSON.stringify(valor));
}

function estadoInicial() {
  const rascunho = obterDadosLocais("rascunhoVaga");
  if (rascunho?.basicos && rascunho?.requisitos && rascunho?.processo) return copiar(rascunho);
  return {
    basicos: {
      titulo: "", area: "", contratacao: "", modalidade: "", local: "",
      descricao: "", responsabilidades: []
    },
    requisitos: {
      nivel: "", jornada: "", salarioMin: "", salarioMax: "",
      obrigatorios: [], diferenciais: [], beneficios: []
    },
    processo: { etapas: copiar(ETAPAS_PADRAO) },
    publicacao: { visibilidade: "publica", dataEncerramento: "", publicacaoAutomatica: true }
  };
}

function valorTexto(valor, fallback = "Não informado") {
  return String(valor || "").trim() || fallback;
}

function criarResumoLista(titulo, itens) {
  const bloco = criarElemento("div", "resumo-lista");
  bloco.append(criarElemento("strong", "", titulo));
  if (!itens.length) {
    bloco.append(criarElemento("span", "texto-suave", "Nenhum item informado"));
    return bloco;
  }
  const lista = criarElemento("ul", "");
  itens.forEach((item) => lista.append(criarElemento("li", "", item)));
  bloco.append(lista);
  return bloco;
}

export function renderCriarVaga() {
  const { pagina, conteudo } = criarPagina(
    "pagina-criar-vaga",
    "Criar nova vaga",
    "Cadastre a oportunidade em etapas e acompanhe a prévia em tempo real.",
    { breadcrumb: "Vagas  /  Criar nova vaga", badge: "Rascunho local" }
  );
  pagina.prepend(criarSidebar("empresa", "Empresa01"));

  const estado = estadoInicial();
  let etapaAtual = 1;
  const concluidas = new Set();

  const mensagem = criarMensagem();
  const stepperArea = criarElemento("section", "cartao stepper-cartao");
  const layout = criarElemento("div", "layout-vaga");
  const colunaFormulario = criarElemento("div", "coluna-formulario");
  const cartaoFormulario = criarElemento("section", "cartao cartao-formulario");
  const corpoFormulario = criarElemento("div", "corpo-formulario");
  const rodape = criarElemento("footer", "acoes-formulario-vaga");
  const anterior = criarElemento("button", "botao-secundario", "Voltar");
  const rascunho = criarElemento("button", "botao-terciario", "Salvar rascunho");
  const avancar = criarElemento("button", "botao-primario", "Continuar");
  [anterior, rascunho, avancar].forEach((botao) => botao.type = "button");
  rodape.append(anterior, rascunho, avancar);
  cartaoFormulario.append(corpoFormulario, mensagem.elemento, rodape);
  colunaFormulario.append(cartaoFormulario);

  const preview = criarElemento("aside", "cartao preview-vaga");
  layout.append(colunaFormulario, preview);
  conteudo.append(stepperArea, layout);

  function atualizarPreview() {
    preview.replaceChildren();
    const topo = criarElemento("header", "preview-topo");
    const rotulo = criarElemento("span", "preview-rotulo", "PRÉVIA DA VAGA");
    const status = criarElemento("span", "badge-status", etapaAtual === 4 ? "Pronta para publicar" : "Em edição");
    topo.append(rotulo, status);
    const icone = criarElemento("div", "preview-icone", "CT");
    const titulo = criarElemento("h2", "", valorTexto(estado.basicos.titulo, "Título da oportunidade"));
    const empresa = criarElemento("p", "preview-empresa", "Conecta Talent • Empresa verificada");
    const chips = criarElemento("div", "preview-chips");
    [estado.basicos.local, estado.basicos.modalidade, estado.basicos.contratacao].filter(Boolean).forEach((item) => chips.append(criarElemento("span", "chip", item)));
    if (!chips.children.length) chips.append(criarElemento("span", "chip chip-neutro", "Informações em preenchimento"));
    const descricao = criarElemento("p", "preview-descricao", valorTexto(estado.basicos.descricao, "A descrição da vaga aparecerá aqui conforme você preencher o formulário."));

    const dados = criarElemento("div", "preview-dados");
    const requisitos = estado.requisitos.obrigatorios.length;
    const etapas = estado.processo.etapas.length;
    const faixa = estado.requisitos.salarioMin || estado.requisitos.salarioMax
      ? `R$ ${valorTexto(estado.requisitos.salarioMin, "—")} a R$ ${valorTexto(estado.requisitos.salarioMax, "—")}`
      : "A combinar";
    [
      ["Senioridade", valorTexto(estado.requisitos.nivel, "A definir")],
      ["Faixa salarial", faixa],
      ["Requisitos", `${requisitos} cadastrado(s)`],
      ["Processo", `${etapas} etapa(s)`]
    ].forEach(([rotuloDado, valor]) => {
      const item = criarElemento("div", "preview-dado");
      item.append(criarElemento("span", "", rotuloDado), criarElemento("strong", "", valor));
      dados.append(item);
    });

    const progresso = criarElemento("div", "preview-progresso");
    const progressoTopo = criarElemento("div", "");
    const percentual = Math.round(((concluidas.size + (etapaAtual === 4 ? 1 : 0)) / PASSOS.length) * 100);
    progressoTopo.append(criarElemento("span", "", "Completude do cadastro"), criarElemento("strong", "", `${Math.min(percentual, 100)}%`));
    const trilho = criarElemento("div", "progresso-trilho");
    const barra = criarElemento("span", "progresso-barra");
    barra.style.width = `${Math.min(percentual, 100)}%`;
    trilho.append(barra);
    progresso.append(progressoTopo, trilho);

    preview.append(topo, icone, titulo, empresa, chips, descricao, dados, progresso);
  }

  function vincular(campo, objeto, chave) {
    campo.addEventListener("input", () => {
      objeto[chave] = campo.type === "checkbox" ? campo.checked : campo.value;
      atualizarPreview();
    });
    campo.addEventListener("change", () => {
      objeto[chave] = campo.type === "checkbox" ? campo.checked : campo.value;
      atualizarPreview();
    });
  }

  function campo(configuracao, objeto, chave) {
    const resultado = criarCampo({ ...configuracao, valor: objeto[chave] });
    vincular(resultado.campo, objeto, chave);
    return resultado;
  }

  function renderPassoUm() {
    const fragmento = document.createDocumentFragment();
    fragmento.append(criarTituloCartao("Informações básicas", "Comece pelos dados que identificam e contextualizam a oportunidade."));
    const grade = criarElemento("div", "grade-campos duas-colunas");
    const titulo = campo({ nome: "tituloVaga", rotulo: "Título da vaga", obrigatorio: true, placeholder: "Ex: Analista de Recursos Humanos" }, estado.basicos, "titulo");
    const area = campo({ nome: "areaVaga", rotulo: "Área ou departamento", obrigatorio: true, placeholder: "Ex: Pessoas e Cultura" }, estado.basicos, "area");
    const contratacao = campo({ nome: "contratacao", rotulo: "Tipo de contratação", tipo: "select", obrigatorio: true, placeholder: "Selecione", opcoes: ["CLT", "PJ", "Estágio", "Temporário", "Aprendiz"] }, estado.basicos, "contratacao");
    const modalidade = campo({ nome: "modalidade", rotulo: "Modalidade", tipo: "select", obrigatorio: true, placeholder: "Selecione", opcoes: ["Presencial", "Híbrido", "Remoto"] }, estado.basicos, "modalidade");
    const local = campo({ nome: "local", rotulo: "Local de trabalho", obrigatorio: true, placeholder: "Ex: São Paulo - SP" }, estado.basicos, "local");
    const descricao = campo({ nome: "descricao", rotulo: "Resumo da vaga", tipo: "textarea", classe: "campo-largo", obrigatorio: true, placeholder: "Apresente o propósito da vaga e o impacto esperado." }, estado.basicos, "descricao");
    grade.append(titulo.grupo, area.grupo, contratacao.grupo, modalidade.grupo, local.grupo, descricao.grupo);
    const responsabilidades = criarListaEditavel({
      titulo: "Responsabilidades e atribuições",
      subtitulo: "Adicione uma responsabilidade por vez e organize a ordem de leitura.",
      placeholder: "Ex: Conduzir entrevistas por competência",
      itens: estado.basicos.responsabilidades,
      onChange: (itens) => { estado.basicos.responsabilidades = itens; atualizarPreview(); }
    });
    fragmento.append(grade, responsabilidades.elemento);
    return fragmento;
  }

  function renderPassoDois() {
    const fragmento = document.createDocumentFragment();
    fragmento.append(criarTituloCartao("Requisitos e benefícios", "Defina o perfil desejado sem transformar o formulário em uma barreira."));
    const grade = criarElemento("div", "grade-campos duas-colunas");
    const nivel = campo({ nome: "nivel", rotulo: "Nível da vaga", tipo: "select", obrigatorio: true, placeholder: "Selecione", opcoes: ["Júnior", "Pleno", "Sênior", "Especialista", "Liderança"] }, estado.requisitos, "nivel");
    const jornada = campo({ nome: "jornada", rotulo: "Jornada", tipo: "select", obrigatorio: true, placeholder: "Selecione", opcoes: ["40 horas semanais", "44 horas semanais", "30 horas semanais", "Flexível"] }, estado.requisitos, "jornada");
    const salarioMin = campo({ nome: "salarioMin", rotulo: "Salário mínimo", tipo: "number", min: 0, step: 100, placeholder: "4500" }, estado.requisitos, "salarioMin");
    const salarioMax = campo({ nome: "salarioMax", rotulo: "Salário máximo", tipo: "number", min: 0, step: 100, placeholder: "6500" }, estado.requisitos, "salarioMax");
    grade.append(nivel.grupo, jornada.grupo, salarioMin.grupo, salarioMax.grupo);
    const listas = criarElemento("div", "grade-listas");
    const obrigatorios = criarListaEditavel({ titulo: "Requisitos obrigatórios", subtitulo: "Conhecimentos indispensáveis para a função.", placeholder: "Ex: Experiência com recrutamento", itens: estado.requisitos.obrigatorios, onChange: (itens) => { estado.requisitos.obrigatorios = itens; atualizarPreview(); } });
    const diferenciais = criarListaEditavel({ titulo: "Diferenciais", subtitulo: "Competências que agregam, mas não eliminam candidatos.", placeholder: "Ex: Inglês intermediário", itens: estado.requisitos.diferenciais, onChange: (itens) => { estado.requisitos.diferenciais = itens; atualizarPreview(); } });
    const beneficios = criarListaEditavel({ titulo: "Benefícios", subtitulo: "Destaque o pacote oferecido pela empresa.", placeholder: "Ex: Vale-refeição", itens: estado.requisitos.beneficios, onChange: (itens) => { estado.requisitos.beneficios = itens; atualizarPreview(); } });
    listas.append(obrigatorios.elemento, diferenciais.elemento, beneficios.elemento);
    fragmento.append(grade, listas);
    return fragmento;
  }

  function renderPassoTres() {
    const fragmento = document.createDocumentFragment();
    fragmento.append(criarTituloCartao("Processo seletivo", "Personalize, reordene e detalhe as etapas que o candidato percorrerá."));
    const aviso = criarElemento("div", "aviso-informativo");
    aviso.append(criarElemento("strong", "", "Processo transparente"), criarElemento("span", "", "As etapas e suas descrições serão exibidas ao candidato antes da inscrição."));
    const editor = criarEditorEtapas(estado.processo.etapas, {
      onChange: (etapas) => { estado.processo.etapas = etapas; atualizarPreview(); }
    });
    fragmento.append(aviso, editor.elemento);
    return fragmento;
  }

  function renderPassoQuatro() {
    const fragmento = document.createDocumentFragment();
    fragmento.append(criarTituloCartao("Revisão e publicação", "Confira as informações finais antes de disponibilizar a vaga."));
    const revisao = criarElemento("div", "grade-revisao");
    const resumo = criarElemento("section", "painel-revisao");
    const resumoCabecalho = criarElemento("div", "painel-revisao-topo");
    resumoCabecalho.append(criarElemento("h3", "", valorTexto(estado.basicos.titulo, "Vaga sem título")));
    const editarBasico = criarElemento("button", "link-botao", "Editar informações");
    editarBasico.type = "button";
    editarBasico.addEventListener("click", () => { etapaAtual = 1; renderizar(); });
    resumoCabecalho.append(editarBasico);
    const resumoGrade = criarElemento("div", "resumo-grade");
    [["Área", estado.basicos.area], ["Contratação", estado.basicos.contratacao], ["Modalidade", estado.basicos.modalidade], ["Local", estado.basicos.local], ["Nível", estado.requisitos.nivel], ["Jornada", estado.requisitos.jornada]].forEach(([rotulo, valor]) => {
      const item = criarElemento("div", "");
      item.append(criarElemento("span", "", rotulo), criarElemento("strong", "", valorTexto(valor)));
      resumoGrade.append(item);
    });
    resumo.append(resumoCabecalho, resumoGrade, criarResumoLista("Responsabilidades", estado.basicos.responsabilidades), criarResumoLista("Requisitos obrigatórios", estado.requisitos.obrigatorios));

    const publicacao = criarElemento("section", "painel-revisao configuracao-publicacao");
    publicacao.append(criarElemento("h3", "", "Configuração da publicação"));
    const visibilidade = campo({ nome: "visibilidade", rotulo: "Visibilidade", tipo: "select", opcoes: [{ valor: "publica", rotulo: "Pública" }, { valor: "privada", rotulo: "Privada por link" }] }, estado.publicacao, "visibilidade");
    const data = campo({ nome: "dataEncerramento", rotulo: "Encerrar candidaturas em", tipo: "date" }, estado.publicacao, "dataEncerramento");
    const automatico = criarElemento("label", "opcao-switch");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = estado.publicacao.publicacaoAutomatica;
    vincular(checkbox, estado.publicacao, "publicacaoAutomatica");
    const automaticoTexto = criarElemento("span", "");
    automaticoTexto.append(criarElemento("strong", "", "Publicar imediatamente"), criarElemento("small", "", "A vaga ficará disponível assim que você confirmar."));
    automatico.append(checkbox, automaticoTexto);
    publicacao.append(visibilidade.grupo, data.grupo, automatico);

    const etapasResumo = criarElemento("section", "painel-revisao campo-largo");
    const etapasTopo = criarElemento("div", "painel-revisao-topo");
    etapasTopo.append(criarElemento("h3", "", `Processo seletivo • ${estado.processo.etapas.length} etapa(s)`));
    const editarEtapas = criarElemento("button", "link-botao", "Editar processo");
    editarEtapas.type = "button";
    editarEtapas.addEventListener("click", () => { etapaAtual = 3; renderizar(); });
    etapasTopo.append(editarEtapas);
    const linhaEtapas = criarElemento("div", "linha-etapas-revisao");
    estado.processo.etapas.forEach((etapa, indice) => {
      const item = criarElemento("div", "etapa-revisao");
      item.append(criarElemento("span", "", String(indice + 1)), criarElemento("strong", "", etapa.nome));
      linhaEtapas.append(item);
    });
    etapasResumo.append(etapasTopo, linhaEtapas);
    revisao.append(resumo, publicacao, etapasResumo);
    fragmento.append(revisao);
    return fragmento;
  }

  function validarPasso() {
    if (etapaAtual === 1) {
      if (![estado.basicos.titulo, estado.basicos.area, estado.basicos.contratacao, estado.basicos.modalidade, estado.basicos.local, estado.basicos.descricao].every((valor) => String(valor).trim())) return "Preencha todos os campos obrigatórios das informações básicas.";
    }
    if (etapaAtual === 2) {
      if (!estado.requisitos.nivel || !estado.requisitos.jornada) return "Informe o nível e a jornada da vaga.";
      if (estado.requisitos.salarioMin && estado.requisitos.salarioMax && Number(estado.requisitos.salarioMin) > Number(estado.requisitos.salarioMax)) return "O salário mínimo não pode ser maior que o máximo.";
    }
    if (etapaAtual === 3 && !estado.processo.etapas.length) return "Adicione ao menos uma etapa ao processo seletivo.";
    return "";
  }

  async function publicar() {
    const dados = { ...copiar(estado), status: "publicada", publicadaEm: new Date().toISOString(), origem: "simulacao-local" };
    await criarVaga(dados);
    concluidas.add(4);
    mensagem.mostrar("Vaga publicada na simulação local. Nenhuma API externa foi acionada.");
    avancar.textContent = "Publicada";
    avancar.disabled = true;
    atualizarPreview();
  }

  function atualizarStepper() {
    stepperArea.replaceChildren(criarStepper({
      etapas: PASSOS,
      etapaAtual,
      concluidas: [...concluidas],
      onChange: (id) => { etapaAtual = id; renderizar(); }
    }));
  }

  function renderizar() {
    mensagem.esconder();
    atualizarStepper();
    corpoFormulario.replaceChildren();
    if (etapaAtual === 1) corpoFormulario.append(renderPassoUm());
    if (etapaAtual === 2) corpoFormulario.append(renderPassoDois());
    if (etapaAtual === 3) corpoFormulario.append(renderPassoTres());
    if (etapaAtual === 4) corpoFormulario.append(renderPassoQuatro());
    anterior.hidden = etapaAtual === 1;
    avancar.textContent = etapaAtual === 4 ? "Publicar vaga" : "Continuar";
    avancar.disabled = false;
    atualizarPreview();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  anterior.addEventListener("click", () => {
    if (etapaAtual > 1) etapaAtual -= 1;
    renderizar();
  });

  avancar.addEventListener("click", async () => {
    mensagem.esconder();
    const erro = validarPasso();
    if (erro) {
      mensagem.mostrar(erro, "erro");
      return;
    }
    concluidas.add(etapaAtual);
    if (etapaAtual < 4) {
      etapaAtual += 1;
      renderizar();
      return;
    }
    await publicar();
  });

  rascunho.addEventListener("click", async () => {
    await salvarRascunhoVaga({ ...copiar(estado), salvoEm: new Date().toISOString(), origem: "simulacao-local" });
    mensagem.mostrar("Rascunho salvo somente neste navegador (simulação com localStorage).", "aviso");
  });

  renderizar();
  return pagina;
}