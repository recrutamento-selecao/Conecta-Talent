import { criarElemento } from "../utils/dom.js";
import { criarCampo } from "./campos.js";

const TIPOS_ETAPA = [
  { valor: "inscricao", rotulo: "Inscrição" },
  { valor: "triagem", rotulo: "Triagem" },
  { valor: "teste", rotulo: "Teste técnico" },
  { valor: "entrevista", rotulo: "Entrevista" },
  { valor: "dinamica", rotulo: "Dinâmica" },
  { valor: "avaliacao", rotulo: "Avaliação" },
  { valor: "contratacao", rotulo: "Contratação" },
  { valor: "outro", rotulo: "Outra etapa" }
];

function copiar(valor) {
  return JSON.parse(JSON.stringify(valor));
}

function normalizarEtapa(etapa, indice) {
  if (typeof etapa === "string") {
    return {
      id: `etapa-${Date.now()}-${indice}`,
      nome: etapa,
      tipo: indice === 0 ? "triagem" : etapa.toLowerCase().includes("teste") ? "teste" : etapa.toLowerCase().includes("entrevista") ? "entrevista" : "outro",
      descricao: "",
      duracao: "",
      responsavel: "",
      obrigatoria: true,
      configuracao: { notaMinima: "", instrucoes: "", perguntas: [] }
    };
  }
  return {
    id: etapa.id || `etapa-${Date.now()}-${indice}`,
    nome: etapa.nome || `Etapa ${indice + 1}`,
    tipo: etapa.tipo || "outro",
    descricao: etapa.descricao || "",
    duracao: etapa.duracao || "",
    responsavel: etapa.responsavel || "",
    obrigatoria: etapa.obrigatoria !== false,
    configuracao: {
      notaMinima: etapa.configuracao?.notaMinima || "",
      instrucoes: etapa.configuracao?.instrucoes || "",
      perguntas: copiar(etapa.configuracao?.perguntas || [])
    }
  };
}

function rotuloTipo(tipo) {
  return TIPOS_ETAPA.find((item) => item.valor === tipo)?.rotulo || "Outra etapa";
}

export function criarEditorEtapas(etapasIniciais = [], opcoes = {}) {
  const etapas = etapasIniciais.map(normalizarEtapa);
  const raiz = criarElemento("section", "editor-etapas-avancado");
  const cabecalho = criarElemento("header", "editor-etapas-cabecalho");
  const cabecalhoTexto = criarElemento("div", "");
  cabecalhoTexto.append(criarElemento("h3", "", opcoes.titulo || "Etapas do processo seletivo"));
  cabecalhoTexto.append(criarElemento("p", "", opcoes.subtitulo || "Organize a jornada dos candidatos e configure cada avaliação."));
  const adicionar = criarElemento("button", "botao-secundario botao-compacto", "+ Adicionar etapa");
  adicionar.type = "button";
  cabecalho.append(cabecalhoTexto, adicionar);

  const lista = criarElemento("div", "lista-etapas-avancada");
  const vazio = criarElemento("div", "estado-vazio");
  vazio.append(criarElemento("strong", "", "Nenhuma etapa configurada"), criarElemento("span", "", "Adicione ao menos uma etapa para continuar."));

  const modal = criarElemento("div", "modal-recrutamento");
  modal.hidden = true;
  const painel = criarElemento("section", "modal-painel modal-etapa-painel");
  const modalCabecalho = criarElemento("header", "modal-cabecalho");
  const modalTitulo = criarElemento("div", "");
  const tituloModal = criarElemento("h2", "", "Adicionar etapa");
  modalTitulo.append(tituloModal, criarElemento("p", "", "Defina o tipo, as regras e o responsável pela etapa."));
  const fechar = criarElemento("button", "modal-fechar", "×");
  fechar.type = "button";
  modalCabecalho.append(modalTitulo, fechar);

  const formulario = criarElemento("form", "modal-conteudo");
  const grade = criarElemento("div", "grade-campos duas-colunas");
  const tipo = criarCampo({ nome: "tipoEtapa", rotulo: "Tipo da etapa", tipo: "select", obrigatorio: true, opcoes: TIPOS_ETAPA });
  const nome = criarCampo({ nome: "nomeEtapa", rotulo: "Nome da etapa", obrigatorio: true, placeholder: "Ex: Entrevista com RH" });
  const duracao = criarCampo({ nome: "duracaoEtapa", rotulo: "Duração estimada", placeholder: "Ex: 45 minutos" });
  const responsavel = criarCampo({ nome: "responsavelEtapa", rotulo: "Responsável", placeholder: "Ex: Time de RH" });
  const descricao = criarCampo({ nome: "descricaoEtapa", rotulo: "Descrição", tipo: "textarea", classe: "campo-largo", placeholder: "Explique o objetivo e como a etapa será conduzida." });
  grade.append(tipo.grupo, nome.grupo, duracao.grupo, responsavel.grupo, descricao.grupo);

  const obrigatoriaLabel = criarElemento("label", "opcao-switch");
  const obrigatoria = document.createElement("input");
  obrigatoria.type = "checkbox";
  obrigatoria.checked = true;
  const obrigatoriaTexto = criarElemento("span", "");
  obrigatoriaTexto.append(criarElemento("strong", "", "Etapa obrigatória"), criarElemento("small", "", "Todos os candidatos devem concluir esta etapa."));
  obrigatoriaLabel.append(obrigatoria, obrigatoriaTexto);

  const painelTeste = criarElemento("section", "configuracao-teste");
  const painelTesteTitulo = criarElemento("div", "configuracao-teste-titulo");
  painelTesteTitulo.append(criarElemento("h3", "", "Configuração do teste"), criarElemento("p", "", "Defina nota mínima, instruções e perguntas."));
  const testeGrade = criarElemento("div", "grade-campos duas-colunas");
  const notaMinima = criarCampo({ nome: "notaMinima", rotulo: "Nota mínima (%)", tipo: "number", min: 0, max: 100, placeholder: "70" });
  const instrucoes = criarCampo({ nome: "instrucoesTeste", rotulo: "Instruções", tipo: "textarea", classe: "campo-largo", placeholder: "Orientações para o candidato." });
  testeGrade.append(notaMinima.grupo, instrucoes.grupo);
  const perguntasCabecalho = criarElemento("div", "perguntas-cabecalho");
  perguntasCabecalho.append(criarElemento("div", "", "Perguntas do teste"));
  const adicionarPergunta = criarElemento("button", "botao-secundario botao-compacto", "+ Adicionar pergunta");
  adicionarPergunta.type = "button";
  perguntasCabecalho.append(adicionarPergunta);
  const perguntasLista = criarElemento("div", "lista-perguntas");
  painelTeste.append(painelTesteTitulo, testeGrade, perguntasCabecalho, perguntasLista);

  const erroModal = criarElemento("p", "modal-erro");
  erroModal.hidden = true;
  const rodape = criarElemento("footer", "modal-rodape");
  const cancelar = criarElemento("button", "botao-secundario", "Cancelar");
  const salvar = criarElemento("button", "botao-primario", "Salvar etapa");
  cancelar.type = "button";
  salvar.type = "submit";
  rodape.append(cancelar, salvar);
  formulario.append(grade, obrigatoriaLabel, painelTeste, erroModal, rodape);
  painel.append(modalCabecalho, formulario);
  modal.append(painel);

  const modalPergunta = criarElemento("div", "modal-recrutamento modal-pergunta");
  modalPergunta.hidden = true;
  const painelPergunta = criarElemento("section", "modal-painel modal-pergunta-painel");
  const perguntaCabecalho = criarElemento("header", "modal-cabecalho");
  const perguntaTitulo = criarElemento("div", "");
  perguntaTitulo.append(criarElemento("h2", "", "Adicionar pergunta"), criarElemento("p", "", "Configure o enunciado, o tipo e a pontuação."));
  const fecharPergunta = criarElemento("button", "modal-fechar", "×");
  fecharPergunta.type = "button";
  perguntaCabecalho.append(perguntaTitulo, fecharPergunta);
  const formPergunta = criarElemento("form", "modal-conteudo");
  const enunciado = criarCampo({ nome: "enunciadoPergunta", rotulo: "Enunciado", tipo: "textarea", obrigatorio: true, placeholder: "Digite a pergunta" });
  const perguntaGrade = criarElemento("div", "grade-campos duas-colunas");
  const tipoPergunta = criarCampo({ nome: "tipoPergunta", rotulo: "Tipo de questão", tipo: "select", opcoes: [
    { valor: "multiplaEscolha", rotulo: "Múltipla escolha" },
    { valor: "verdadeiroFalso", rotulo: "Verdadeiro ou falso" },
    { valor: "discursiva", rotulo: "Resposta discursiva" }
  ] });
  const pontos = criarCampo({ nome: "pontosPergunta", rotulo: "Pontos", tipo: "number", min: 1, max: 100, valor: 10 });
  perguntaGrade.append(tipoPergunta.grupo, pontos.grupo);
  const alternativas = criarCampo({ nome: "alternativasPergunta", rotulo: "Alternativas", tipo: "textarea", placeholder: "Uma alternativa por linha" });
  const respostaCorreta = criarCampo({ nome: "respostaCorreta", rotulo: "Resposta correta", placeholder: "Digite a alternativa correta" });
  const erroPergunta = criarElemento("p", "modal-erro");
  erroPergunta.hidden = true;
  const rodapePergunta = criarElemento("footer", "modal-rodape");
  const cancelarPergunta = criarElemento("button", "botao-secundario", "Cancelar");
  const salvarPergunta = criarElemento("button", "botao-primario", "Adicionar pergunta");
  cancelarPergunta.type = "button";
  salvarPergunta.type = "submit";
  rodapePergunta.append(cancelarPergunta, salvarPergunta);
  formPergunta.append(enunciado.grupo, perguntaGrade, alternativas.grupo, respostaCorreta.grupo, erroPergunta, rodapePergunta);
  painelPergunta.append(perguntaCabecalho, formPergunta);
  modalPergunta.append(painelPergunta);

  let indiceEdicao = null;
  let perguntasEmEdicao = [];

  function emitir() {
    opcoes.onChange?.(copiar(etapas));
  }

  function moverEtapa(indice, direcao) {
    const destino = indice + direcao;
    if (destino < 0 || destino >= etapas.length) return;
    [etapas[indice], etapas[destino]] = [etapas[destino], etapas[indice]];
    renderizarLista();
    emitir();
  }

  function renderizarLista() {
    lista.replaceChildren();
    vazio.hidden = etapas.length > 0;
    etapas.forEach((etapa, indice) => {
      const item = criarElemento("article", "etapa-card");
      const ordem = criarElemento("span", "etapa-ordem", String(indice + 1));
      const corpo = criarElemento("div", "etapa-card-corpo");
      const topo = criarElemento("div", "etapa-card-topo");
      topo.append(criarElemento("strong", "", etapa.nome), criarElemento("span", `tipo-etapa tipo-${etapa.tipo}`, rotuloTipo(etapa.tipo)));
      const metadados = criarElemento("div", "etapa-metadados");
      if (etapa.responsavel) metadados.append(criarElemento("span", "", etapa.responsavel));
      if (etapa.duracao) metadados.append(criarElemento("span", "", etapa.duracao));
      metadados.append(criarElemento("span", "", etapa.obrigatoria ? "Obrigatória" : "Opcional"));
      if (etapa.tipo === "teste") metadados.append(criarElemento("span", "", `${etapa.configuracao.perguntas.length} pergunta(s)`));
      corpo.append(topo);
      if (etapa.descricao) corpo.append(criarElemento("p", "", etapa.descricao));
      corpo.append(metadados);
      const acoes = criarElemento("div", "etapa-card-acoes");
      const subir = criarElemento("button", "botao-icone", "↑");
      const descer = criarElemento("button", "botao-icone", "↓");
      const editar = criarElemento("button", "botao-icone", "✎");
      const remover = criarElemento("button", "botao-icone perigo", "×");
      [subir, descer, editar, remover].forEach((botao) => botao.type = "button");
      subir.disabled = indice === 0;
      descer.disabled = indice === etapas.length - 1;
      subir.title = "Mover para cima";
      descer.title = "Mover para baixo";
      editar.title = "Editar etapa";
      remover.title = "Remover etapa";
      subir.addEventListener("click", () => moverEtapa(indice, -1));
      descer.addEventListener("click", () => moverEtapa(indice, 1));
      editar.addEventListener("click", () => abrirModalEtapa(indice));
      remover.addEventListener("click", () => {
        etapas.splice(indice, 1);
        renderizarLista();
        emitir();
      });
      acoes.append(subir, descer, editar, remover);
      item.append(ordem, corpo, acoes);
      lista.append(item);
    });
  }

  function renderizarPerguntas() {
    perguntasLista.replaceChildren();
    if (!perguntasEmEdicao.length) {
      perguntasLista.append(criarElemento("p", "lista-vazia", "Nenhuma pergunta adicionada."));
      return;
    }
    perguntasEmEdicao.forEach((pergunta, indice) => {
      const item = criarElemento("div", "pergunta-item");
      const texto = criarElemento("div", "");
      texto.append(criarElemento("strong", "", `${indice + 1}. ${pergunta.enunciado}`));
      texto.append(criarElemento("small", "", `${pergunta.tipoRotulo} • ${pergunta.pontos} ponto(s)`));
      const remover = criarElemento("button", "botao-icone perigo", "×");
      remover.type = "button";
      remover.title = "Remover pergunta";
      remover.addEventListener("click", () => {
        perguntasEmEdicao.splice(indice, 1);
        renderizarPerguntas();
      });
      item.append(texto, remover);
      perguntasLista.append(item);
    });
  }

  function atualizarCamposPergunta() {
    const tipoAtual = tipoPergunta.campo.value;
    alternativas.grupo.hidden = tipoAtual === "discursiva";
    respostaCorreta.grupo.hidden = tipoAtual === "discursiva";
    if (tipoAtual === "verdadeiroFalso") {
      alternativas.campo.value = "Verdadeiro\nFalso";
      alternativas.campo.disabled = true;
      respostaCorreta.campo.placeholder = "Verdadeiro ou Falso";
    } else {
      alternativas.campo.disabled = false;
      respostaCorreta.campo.placeholder = "Digite a alternativa correta";
    }
  }

  function abrirModalEtapa(indice = null) {
    indiceEdicao = indice;
    const etapa = indice === null ? normalizarEtapa({ nome: "", tipo: "triagem" }, etapas.length) : copiar(etapas[indice]);
    tituloModal.textContent = indice === null ? "Adicionar etapa" : "Editar etapa";
    salvar.textContent = indice === null ? "Adicionar etapa" : "Salvar alterações";
    tipo.campo.value = etapa.tipo;
    nome.campo.value = etapa.nome;
    duracao.campo.value = etapa.duracao;
    responsavel.campo.value = etapa.responsavel;
    descricao.campo.value = etapa.descricao;
    obrigatoria.checked = etapa.obrigatoria;
    notaMinima.campo.value = etapa.configuracao.notaMinima;
    instrucoes.campo.value = etapa.configuracao.instrucoes;
    perguntasEmEdicao = copiar(etapa.configuracao.perguntas);
    erroModal.hidden = true;
    painelTeste.hidden = etapa.tipo !== "teste";
    renderizarPerguntas();
    modal.hidden = false;
    nome.campo.focus();
  }

  function fecharModalEtapa() {
    modal.hidden = true;
    formulario.reset();
    perguntasEmEdicao = [];
  }

  function abrirModalPergunta() {
    formPergunta.reset();
    pontos.campo.value = 10;
    erroPergunta.hidden = true;
    atualizarCamposPergunta();
    modalPergunta.hidden = false;
    enunciado.campo.focus();
  }

  function fecharModalPerguntaAtual() {
    modalPergunta.hidden = true;
  }

  tipo.campo.addEventListener("change", () => {
    painelTeste.hidden = tipo.campo.value !== "teste";
    if (!nome.campo.value.trim()) nome.campo.value = rotuloTipo(tipo.campo.value);
  });
  tipoPergunta.campo.addEventListener("change", atualizarCamposPergunta);
  adicionar.addEventListener("click", () => abrirModalEtapa());
  adicionarPergunta.addEventListener("click", abrirModalPergunta);
  fechar.addEventListener("click", fecharModalEtapa);
  cancelar.addEventListener("click", fecharModalEtapa);
  fecharPergunta.addEventListener("click", fecharModalPerguntaAtual);
  cancelarPergunta.addEventListener("click", fecharModalPerguntaAtual);
  modal.addEventListener("click", (evento) => { if (evento.target === modal) fecharModalEtapa(); });
  modalPergunta.addEventListener("click", (evento) => { if (evento.target === modalPergunta) fecharModalPerguntaAtual(); });

  formPergunta.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const texto = enunciado.campo.value.trim();
    const tipoAtual = tipoPergunta.campo.value;
    const listaAlternativas = tipoAtual === "discursiva" ? [] : alternativas.campo.value.split("\n").map((item) => item.trim()).filter(Boolean);
    if (!texto) {
      erroPergunta.textContent = "Informe o enunciado da pergunta.";
      erroPergunta.hidden = false;
      return;
    }
    if (tipoAtual === "multiplaEscolha" && listaAlternativas.length < 2) {
      erroPergunta.textContent = "Adicione pelo menos duas alternativas.";
      erroPergunta.hidden = false;
      return;
    }
    if (tipoAtual !== "discursiva" && !respostaCorreta.campo.value.trim()) {
      erroPergunta.textContent = "Informe a resposta correta.";
      erroPergunta.hidden = false;
      return;
    }
    perguntasEmEdicao.push({
      id: `pergunta-${Date.now()}`,
      enunciado: texto,
      tipo: tipoAtual,
      tipoRotulo: tipoPergunta.campo.options[tipoPergunta.campo.selectedIndex].textContent,
      pontos: Number(pontos.campo.value) || 10,
      alternativas: listaAlternativas,
      respostaCorreta: tipoAtual === "discursiva" ? null : respostaCorreta.campo.value.trim()
    });
    renderizarPerguntas();
    fecharModalPerguntaAtual();
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nomeValor = nome.campo.value.trim();
    if (!nomeValor) {
      erroModal.textContent = "Informe o nome da etapa.";
      erroModal.hidden = false;
      return;
    }
    const etapaAnterior = indiceEdicao === null ? null : etapas[indiceEdicao];
    const etapa = {
      id: etapaAnterior?.id || `etapa-${Date.now()}`,
      nome: nomeValor,
      tipo: tipo.campo.value,
      descricao: descricao.campo.value.trim(),
      duracao: duracao.campo.value.trim(),
      responsavel: responsavel.campo.value.trim(),
      obrigatoria: obrigatoria.checked,
      configuracao: {
        notaMinima: tipo.campo.value === "teste" ? Number(notaMinima.campo.value) || null : null,
        instrucoes: tipo.campo.value === "teste" ? instrucoes.campo.value.trim() : "",
        perguntas: tipo.campo.value === "teste" ? copiar(perguntasEmEdicao) : []
      }
    };
    if (indiceEdicao === null) etapas.push(etapa);
    else etapas[indiceEdicao] = etapa;
    renderizarLista();
    emitir();
    fecharModalEtapa();
  });

  raiz.append(cabecalho, vazio, lista, modal, modalPergunta);
  renderizarLista();
  atualizarCamposPergunta();

  return {
    elemento: raiz,
    obterEtapas: () => copiar(etapas),
    atualizarEtapas(novasEtapas = []) {
      etapas.splice(0, etapas.length, ...novasEtapas.map(normalizarEtapa));
      renderizarLista();
      emitir();
    }
  };
}