import { criarSidebar } from "../components/sidebar.js";
import { criarStepper } from "../components/stepper.js";
import { criarCampo } from "../components/campos.js";

const PASSOS = [
  { id: 1, titulo: "Informações básicas" },
  { id: 2, titulo: "Requisitos" },
  { id: 3, titulo: "Processo seletivo" },
  { id: 4, titulo: "Revisão e publicação" }
];

function extrairLinhas(valor) {
  if (!valor) return [];
  return String(valor)
    .split(/\r?\n/)
    .map(item => item.trim())
    .filter(Boolean);
}

function escaparHtml(texto = "") {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ehEtapaDeTeste(nome = "") {
  return /teste/i.test(String(nome).trim());
}

export function renderCriarVaga() {
  const containerPagina = document.createElement("div");
  containerPagina.className = "pagina-layout-dashboard";

  // Sidebar lateral
  const sidebar = criarSidebar("recrutador", "Thaeny Soares");
  containerPagina.appendChild(sidebar);

  const conteudoPrincipal = document.createElement("main");
  conteudoPrincipal.className = "conteudo-principal";
  containerPagina.appendChild(conteudoPrincipal);

  // Cabeçalho da Página
  const cabecalhoSecao = document.createElement("div");
  cabecalhoSecao.className = "cabecalho-secao-acao";
  cabecalhoSecao.innerHTML = `
    <div>
      <h1 class="titulo-pagina">Criar vaga</h1>
      <p class="subtitulo-pagina">Preencha as informações da vaga para publicá-la e atrair os melhores talentos.</p>
    </div>
  `;
  conteudoPrincipal.appendChild(cabecalhoSecao);

  // Estado local do formulário iniciado vazio
  const estado = {
    basicos: {
      titulo: "",
      empresa: "",
      area: "",
      contratacao: "",
      modalidade: "",
      local: "",
      descricao: ""
    },
    requisitos: {
      responsabilidades: [],
      obrigatorios: [],
      diferenciais: []
    },
    processo: {
      etapas: [
        { nome: "Inscrição", perguntas: [] },
        { nome: "Triagem", perguntas: [] },
        { nome: "Teste", perguntas: [] },
        { nome: "Entrevista", perguntas: [] },
        { nome: "Contratação", perguntas: [] }
      ]
    }
  };

  let etapaAtual = 1;

  // Área do Stepper
  const stepperArea = document.createElement("section");
  stepperArea.className = "cartao stepper-cartao";
  conteudoPrincipal.appendChild(stepperArea);

  // Layout Principal (Formulário à esquerda / Preview à direita)
  const layout = document.createElement("div");
  layout.className = "layout-vaga";

  const cartaoFormulario = document.createElement("section");
  cartaoFormulario.className = "cartao cartao-formulario";

  const corpoFormulario = document.createElement("div");
  corpoFormulario.className = "corpo-formulario";

  // Rodapé com botões de ação
  const rodape = document.createElement("footer");
  rodape.className = "acoes-formulario-vaga";

  const anterior = document.createElement("button");
  anterior.type = "button";
  anterior.className = "botao-secundario";
  anterior.textContent = "Cancelar";

  const avancar = document.createElement("button");
  avancar.type = "button";
  avancar.className = "botao-primario";
  avancar.textContent = "Próximo";

  rodape.append(anterior, avancar);
  cartaoFormulario.append(corpoFormulario, rodape);

  // Painel de Pré-visualização (Direita)
  const preview = document.createElement("aside");
  preview.className = "cartao preview-vaga";

  layout.append(cartaoFormulario, preview);
  conteudoPrincipal.append(layout);

  function atualizarPreview() {
    const iniciais = (estado.basicos.empresa || "CT")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(p => p[0]?.toUpperCase() || "")
      .join("") || "CT";

    const responsabilidadesHtml = estado.requisitos.responsabilidades.length > 0
      ? estado.requisitos.responsabilidades.map(r => `<li>${escaparHtml(r)}</li>`).join("")
      : `<li class="preview-lista-vazia">Nenhuma responsabilidade informada.</li>`;

    const obrigatoriosHtml = estado.requisitos.obrigatorios.length > 0
      ? estado.requisitos.obrigatorios.map(r => `<li>${escaparHtml(r)}</li>`).join("")
      : `<li class="preview-lista-vazia">Nenhum requisito obrigatório informado.</li>`;

    const diferenciaisHtml = estado.requisitos.diferenciais.length > 0
      ? estado.requisitos.diferenciais.map(d => `<li>${escaparHtml(d)}</li>`).join("")
      : `<li class="preview-lista-vazia">Nenhum diferencial informado.</li>`;

    const etapasPreviewHtml = estado.processo.etapas.map(e => {
      const perguntas = Array.isArray(e.perguntas) ? e.perguntas : [];
      if (!ehEtapaDeTeste(e.nome) || perguntas.length === 0) {
        return `<li>${escaparHtml(e.nome)}</li>`;
      }

      const itensPergunta = perguntas
        .map((p, idx) => {
          const rotulo = p.obrigatoria ? "Obrigatória" : "Optativa";
          const enunciado = p.enunciado.trim() || `Pergunta ${idx + 1}`;
          return `<li>${escaparHtml(enunciado)} <em>(${rotulo})</em></li>`;
        })
        .join("");

      return `
        <li>
          ${escaparHtml(e.nome)}
          <ul class="preview-lista-perguntas-etapa">
            ${itensPergunta}
          </ul>
        </li>
      `;
    }).join("");

    preview.innerHTML = `
      <div class="preview-cabecalho-bloco">
        <strong class="preview-titulo-principal">Pré-visualização da vaga</strong>
        <span class="preview-subtitulo-principal">Veja como sua vaga será exibida para os candidatos.</span>
      </div>
      <div class="preview-card-interno">
        <div class="preview-topo-empresa">
          <div class="preview-icone-empresa">${escaparHtml(iniciais)}</div>
          <div>
            <h3 class="preview-titulo-vaga">${escaparHtml(estado.basicos.titulo || "Título da vaga")}</h3>
            <span class="preview-empresa-nome">${escaparHtml(estado.basicos.empresa || "Nome da empresa")}</span>
          </div>
        </div>
        <div class="preview-chips-container">
          <span class="chip-preview">📍 ${escaparHtml(estado.basicos.local || "Local")}</span>
          <span class="chip-preview">💼 ${escaparHtml(estado.basicos.contratacao || "Contrato")}</span>
          <span class="chip-preview">🏠 ${escaparHtml(estado.basicos.modalidade || "Modalidade")}</span>
          <span class="chip-preview">📁 ${escaparHtml(estado.basicos.area || "Área")}</span>
        </div>
        <div class="preview-secao">
          <strong class="preview-rotulo-secao">Descrição da vaga</strong>
          <p class="preview-texto-descricao">${escaparHtml(estado.basicos.descricao || "Sem descrição informada.")}</p>
        </div>
        <div class="preview-secao">
          <strong class="preview-rotulo-secao">Principais responsabilidades</strong>
          <ul class="preview-lista-responsabilidades">
            ${responsabilidadesHtml}
          </ul>
        </div>
        <div class="preview-secao">
          <strong class="preview-rotulo-secao">Requisitos obrigatórios</strong>
          <ul class="preview-lista-requisitos">
            ${obrigatoriosHtml}
          </ul>
        </div>
        <div class="preview-secao">
          <strong class="preview-rotulo-secao">Diferenciais</strong>
          <ul class="preview-lista-diferenciais">
            ${diferenciaisHtml}
          </ul>
        </div>
        <div class="preview-secao">
          <strong class="preview-rotulo-secao">Processo seletivo</strong>
          <ol class="preview-lista-etapas">
            ${etapasPreviewHtml}
          </ol>
        </div>
        <div class="preview-grid-detalhes">
          <div class="preview-item-detalhe">
            <span class="preview-detalhe-rotulo">Área</span>
            <strong class="preview-detalhe-valor">${escaparHtml(estado.basicos.area || "—")}</strong>
          </div>
          <div class="preview-item-detalhe">
            <span class="preview-detalhe-rotulo">Contrato</span>
            <strong class="preview-detalhe-valor">${escaparHtml(estado.basicos.contratacao || "—")}</strong>
          </div>
          <div class="preview-item-detalhe">
            <span class="preview-detalhe-rotulo">Modalidade</span>
            <strong class="preview-detalhe-valor">${escaparHtml(estado.basicos.modalidade || "—")}</strong>
          </div>
        </div>
      </div>
    `;
  }

  function renderPassoUm() {
    const div = document.createElement("div");
    div.className = "passo-container";
    div.innerHTML = `
      <h2 class="passo-titulo">Informações básicas</h2>
      <p class="passo-subtitulo">Defina os principais dados da vaga.</p>
    `;

    const grid = document.createElement("div");
    grid.className = "grade-campos-dupla";

    const cTitulo = criarCampo({
      rotulo: "Título da vaga",
      nome: "titulo",
      obrigatorio: true,
      valor: estado.basicos.titulo,
      placeholder: "Ex: Analista de Dados"
    });

    const cEmpresa = criarCampo({
      rotulo: "Empresa",
      nome: "empresa",
      tipo: "text",
      obrigatorio: true,
      valor: estado.basicos.empresa,
      placeholder: "Ex: Tech Soluções"
    });

    const cArea = criarCampo({
      rotulo: "Área",
      nome: "area",
      tipo: "text",
      obrigatorio: true,
      valor: estado.basicos.area,
      placeholder: "Ex: Dados, Tecnologia..."
    });

    const cContrato = criarCampo({
      rotulo: "Tipo de contrato",
      nome: "contratacao",
      tipo: "select",
      obrigatorio: true,
      valor: estado.basicos.contratacao,
      opcoes: ["CLT", "PJ", "Estágio"]
    });

    const cModalidade = criarCampo({
      rotulo: "Modalidade",
      nome: "modalidade",
      tipo: "select",
      obrigatorio: true,
      valor: estado.basicos.modalidade,
      opcoes: ["Presencial", "Híbrido", "Remoto"]
    });

    const cLocal = criarCampo({
      rotulo: "Localização",
      nome: "local",
      obrigatorio: true,
      valor: estado.basicos.local,
      placeholder: "Ex: Sorocaba - SP"
    });

    const cDescricao = criarCampo({
      rotulo: "Descrição da vaga",
      nome: "descricao",
      tipo: "textarea",
      obrigatorio: true,
      valor: estado.basicos.descricao,
      placeholder: "Descreva o contexto da vaga e o que você espera..."
    });

    cTitulo.campo.addEventListener("input", (e) => {
      estado.basicos.titulo = e.target.value;
      atualizarPreview();
    });

    cEmpresa.campo.addEventListener("input", (e) => {
      estado.basicos.empresa = e.target.value;
      atualizarPreview();
    });

    cArea.campo.addEventListener("input", (e) => {
      estado.basicos.area = e.target.value;
      atualizarPreview();
    });

    cContrato.campo.addEventListener("change", (e) => {
      estado.basicos.contratacao = e.target.value;
      atualizarPreview();
    });

    cModalidade.campo.addEventListener("change", (e) => {
      estado.basicos.modalidade = e.target.value;
      atualizarPreview();
    });

    cLocal.campo.addEventListener("input", (e) => {
      estado.basicos.local = e.target.value;
      atualizarPreview();
    });

    cDescricao.campo.addEventListener("input", (e) => {
      estado.basicos.descricao = e.target.value;
      atualizarPreview();
    });

    grid.append(
      cTitulo.grupo,
      cEmpresa.grupo,
      cArea.grupo,
      cContrato.grupo,
      cModalidade.grupo,
      cLocal.grupo
    );

    div.appendChild(grid);
    div.appendChild(cDescricao.grupo);
    return div;
  }

  function renderPassoDois() {
    const div = document.createElement("div");
    div.className = "passo-container";
    div.innerHTML = `
      <h2 class="passo-titulo">Requisitos e competências</h2>
      <p class="passo-subtitulo">Defina as responsabilidades, requisitos obrigatórios e diferenciais.</p>
    `;

    const cResponsabilidades = criarCampo({
      rotulo: "Principais responsabilidades (uma por linha)",
      nome: "responsabilidades",
      tipo: "textarea",
      obrigatorio: true,
      valor: estado.requisitos.responsabilidades.join("\n"),
      placeholder: "Ex: Analisar e tratar dados de diferentes fontes\nCriar dashboards no Power BI"
    });

    const cObrigatorios = criarCampo({
      rotulo: "Requisitos obrigatórios (um por linha)",
      nome: "obrigatorios",
      tipo: "textarea",
      obrigatorio: false,
      valor: estado.requisitos.obrigatorios.join("\n"),
      placeholder: "Ex: Domínio de SQL e Excel"
    });

    const cDiferenciais = criarCampo({
      rotulo: "Diferenciais (um por linha)",
      nome: "diferenciais",
      tipo: "textarea",
      obrigatorio: false,
      valor: estado.requisitos.diferenciais.join("\n"),
      placeholder: "Ex: Experiência com Python"
    });

    cResponsabilidades.campo.addEventListener("input", (e) => {
      estado.requisitos.responsabilidades = extrairLinhas(e.target.value);
      atualizarPreview();
    });

    cObrigatorios.campo.addEventListener("input", (e) => {
      estado.requisitos.obrigatorios = extrairLinhas(e.target.value);
      atualizarPreview();
    });

    cDiferenciais.campo.addEventListener("input", (e) => {
      estado.requisitos.diferenciais = extrairLinhas(e.target.value);
      atualizarPreview();
    });

    div.append(cResponsabilidades.grupo, cObrigatorios.grupo, cDiferenciais.grupo);
    return div;
  }

  function renderPassoTres() {
    const div = document.createElement("div");
    div.className = "passo-container";
    div.innerHTML = `
      <h2 class="passo-titulo">Processo seletivo</h2>
      <p class="passo-subtitulo">Defina as etapas que os candidatos deverão seguir nesta vaga. Você pode adicionar novas etapas.</p>
    `;

    const listaEtapas = document.createElement("ul");
    listaEtapas.className = "lista-etapas-processo";

    const caixaAdicionar = document.createElement("div");
    caixaAdicionar.className = "adicionar-etapa-box";

    const campoNovaEtapa = criarCampo({
      rotulo: "Nova etapa",
      nome: "novaEtapa",
      tipo: "text",
      obrigatorio: false,
      valor: "",
      placeholder: "Ex: Entrevista com o gestor"
    });

    const botaoAdicionar = document.createElement("button");
    botaoAdicionar.type = "button";
    botaoAdicionar.className = "botao-adicionar-etapa";
    botaoAdicionar.textContent = "+ Adicionar etapa";

    function criarBlocoPerguntasEtapa(etapa, etapaIndex) {
      if (!Array.isArray(etapa.perguntas)) {
        etapa.perguntas = [];
      }

      const wrapper = document.createElement("div");
      wrapper.className = "secao-perguntas-teste";

      const cabecalho = document.createElement("div");
      cabecalho.className = "cabecalho-perguntas-teste";
      cabecalho.innerHTML = `
        <div>
          <h4 class="titulo-perguntas-teste">Perguntas do teste</h4>
          <p class="subtitulo-perguntas-teste">Escolha se cada pergunta será obrigatória ou optativa.</p>
        </div>
      `;

      const btnAddPergunta = document.createElement("button");
      btnAddPergunta.type = "button";
      btnAddPergunta.className = "btn-add-pergunta";
      btnAddPergunta.textContent = "+ Adicionar pergunta";
      btnAddPergunta.addEventListener("click", () => {
        etapa.perguntas.push({
          id: Date.now() + Math.random(),
          enunciado: "",
          tipo: "dissertativa",
          obrigatoria: true,
          alternativas: ["", ""]
        });
        renderListaEtapas();
        atualizarPreview();
      });

      cabecalho.appendChild(btnAddPergunta);
      wrapper.appendChild(cabecalho);

      const listaPerguntas = document.createElement("div");
      listaPerguntas.className = "lista-perguntas-teste";

      if (etapa.perguntas.length === 0) {
        const vazio = document.createElement("div");
        vazio.className = "estado-vazio-perguntas";
        vazio.textContent = "Nenhuma pergunta adicionada nesta etapa.";
        listaPerguntas.appendChild(vazio);
      } else {
        etapa.perguntas.forEach((pergunta, pIdx) => {
          const card = document.createElement("div");
          card.className = "card-pergunta";

          const topo = document.createElement("div");
          topo.className = "card-pergunta-topo";

          const tituloPergunta = document.createElement("span");
          tituloPergunta.className = "numero-pergunta";
          tituloPergunta.textContent = `Pergunta ${pIdx + 1}`;

          const controles = document.createElement("div");
          controles.className = "controles-pergunta-topo";

          const labelObrigatoria = document.createElement("label");
          labelObrigatoria.className = "toggle-obrigatoria";

          const checkObrigatoria = document.createElement("input");
          checkObrigatoria.type = "checkbox";
          checkObrigatoria.className = "check-obrigatoria";
          checkObrigatoria.checked = Boolean(pergunta.obrigatoria);

          const badge = document.createElement("span");
          badge.className = `badge-obrigatoriedade ${pergunta.obrigatoria ? "obrigatoria" : "optativa"}`;
          badge.textContent = pergunta.obrigatoria ? "Obrigatória" : "Optativa";

          checkObrigatoria.addEventListener("change", (e) => {
            pergunta.obrigatoria = e.target.checked;
            badge.className = `badge-obrigatoriedade ${pergunta.obrigatoria ? "obrigatoria" : "optativa"}`;
            badge.textContent = pergunta.obrigatoria ? "Obrigatória" : "Optativa";
            atualizarPreview();
          });

          labelObrigatoria.append(checkObrigatoria, badge);

          const btnRemoverPergunta = document.createElement("button");
          btnRemoverPergunta.type = "button";
          btnRemoverPergunta.className = "btn-remover-pergunta";
          btnRemoverPergunta.textContent = "Remover";
          btnRemoverPergunta.addEventListener("click", () => {
            etapa.perguntas.splice(pIdx, 1);
            renderListaEtapas();
            atualizarPreview();
          });

          controles.append(labelObrigatoria, btnRemoverPergunta);
          topo.append(tituloPergunta, controles);

          const grupoEnunciado = document.createElement("div");
          grupoEnunciado.className = "grupo-campo";

          const rotuloEnunciado = document.createElement("label");
          rotuloEnunciado.className = "campo-rotulo";
          rotuloEnunciado.textContent = "Enunciado da pergunta";

          const textareaEnunciado = document.createElement("textarea");
          textareaEnunciado.placeholder = "Digite a pergunta do teste...";
          textareaEnunciado.value = pergunta.enunciado || "";
          textareaEnunciado.addEventListener("input", (e) => {
            pergunta.enunciado = e.target.value;
            atualizarPreview();
          });

          grupoEnunciado.append(rotuloEnunciado, textareaEnunciado);

          const grupoTipo = document.createElement("div");
          grupoTipo.className = "grupo-campo";

          const rotuloTipo = document.createElement("label");
          rotuloTipo.className = "campo-rotulo";
          rotuloTipo.textContent = "Tipo de resposta";

          const selectTipo = document.createElement("select");
          selectTipo.innerHTML = `
            <option value="dissertativa" ${pergunta.tipo === "dissertativa" ? "selected" : ""}>Dissertativa</option>
            <option value="objetiva" ${pergunta.tipo === "objetiva" ? "selected" : ""}>Objetiva (múltipla escolha)</option>
          `;
          selectTipo.addEventListener("change", (e) => {
            pergunta.tipo = e.target.value;
            if (pergunta.tipo === "objetiva" && (!Array.isArray(pergunta.alternativas) || pergunta.alternativas.length < 2)) {
              pergunta.alternativas = ["", ""];
            }
            renderListaEtapas();
          });

          grupoTipo.append(rotuloTipo, selectTipo);
          card.append(topo, grupoEnunciado, grupoTipo);

          if (pergunta.tipo === "objetiva") {
            const blocoAlternativas = document.createElement("div");
            blocoAlternativas.className = "bloco-alternativas";

            const rotuloAlt = document.createElement("label");
            rotuloAlt.className = "campo-rotulo";
            rotuloAlt.textContent = "Alternativas";
            blocoAlternativas.appendChild(rotuloAlt);

            const listaAlt = document.createElement("div");
            listaAlt.className = "lista-alternativas";

            pergunta.alternativas.forEach((alt, aIdx) => {
              const linhaAlt = document.createElement("div");
              linhaAlt.className = "linha-alternativa";

              const inputAlt = document.createElement("input");
              inputAlt.type = "text";
              inputAlt.placeholder = `Alternativa ${aIdx + 1}`;
              inputAlt.value = alt;
              inputAlt.addEventListener("input", (e) => {
                pergunta.alternativas[aIdx] = e.target.value;
              });

              linhaAlt.appendChild(inputAlt);

              if (pergunta.alternativas.length > 2) {
                const btnRemoverAlt = document.createElement("button");
                btnRemoverAlt.type = "button";
                btnRemoverAlt.className = "btn-remover-alt";
                btnRemoverAlt.textContent = "✕";
                btnRemoverAlt.addEventListener("click", () => {
                  pergunta.alternativas.splice(aIdx, 1);
                  renderListaEtapas();
                });
                linhaAlt.appendChild(btnRemoverAlt);
              }

              listaAlt.appendChild(linhaAlt);
            });

            const btnAddAlt = document.createElement("button");
            btnAddAlt.type = "button";
            btnAddAlt.className = "btn-add-alternativa";
            btnAddAlt.textContent = "+ Adicionar alternativa";
            btnAddAlt.addEventListener("click", () => {
              pergunta.alternativas.push("");
              renderListaEtapas();
            });

            blocoAlternativas.append(listaAlt, btnAddAlt);
            card.appendChild(blocoAlternativas);
          }

          listaPerguntas.appendChild(card);
        });
      }

      wrapper.appendChild(listaPerguntas);
      return wrapper;
    }

    function renderListaEtapas() {
      listaEtapas.innerHTML = "";

      estado.processo.etapas.forEach((etapa, index) => {
        const item = document.createElement("li");
        item.className = "item-etapa-card item-etapa-card-coluna";

        const topoEtapa = document.createElement("div");
        topoEtapa.className = "item-etapa-topo";

        const spanNome = document.createElement("span");
        spanNome.className = "item-etapa-nome";
        spanNome.textContent = `${index + 1}. ${etapa.nome}`;

        const btnRemover = document.createElement("button");
        btnRemover.type = "button";
        btnRemover.className = "botao-remover-etapa";
        btnRemover.textContent = "Remover";
        btnRemover.addEventListener("click", () => {
          estado.processo.etapas.splice(index, 1);
          renderListaEtapas();
          atualizarPreview();
        });

        topoEtapa.append(spanNome, btnRemover);
        item.appendChild(topoEtapa);

        if (ehEtapaDeTeste(etapa.nome)) {
          item.appendChild(criarBlocoPerguntasEtapa(etapa, index));
        }

        listaEtapas.appendChild(item);
      });
    }

    function adicionarEtapa() {
      const nomeLimpo = campoNovaEtapa.campo.value.trim();
      if (!nomeLimpo) return;

      estado.processo.etapas.push({ nome: nomeLimpo, perguntas: [] });
      campoNovaEtapa.campo.value = "";
      campoNovaEtapa.campo.focus();
      renderListaEtapas();
      atualizarPreview();
    }

    botaoAdicionar.addEventListener("click", adicionarEtapa);
    campoNovaEtapa.campo.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        adicionarEtapa();
      }
    });

    renderListaEtapas();
    caixaAdicionar.append(campoNovaEtapa.grupo, botaoAdicionar);
    div.append(listaEtapas, caixaAdicionar);
    return div;
  }

  function renderPassoQuatro() {
    const div = document.createElement("div");
    div.className = "passo-container";

    const obrigatoriosHtml = estado.requisitos.obrigatorios.length > 0
      ? `<ul class="revisao-lista">${estado.requisitos.obrigatorios.map(r => `<li>${escaparHtml(r)}</li>`).join("")}</ul>`
      : `<p class="revisao-vazio">Nenhum requisito obrigatório informado.</p>`;

    const diferenciaisHtml = estado.requisitos.diferenciais.length > 0
      ? `<ul class="revisao-lista">${estado.requisitos.diferenciais.map(d => `<li>${escaparHtml(d)}</li>`).join("")}</ul>`
      : `<p class="revisao-vazio">Nenhum diferencial informado.</p>`;

    const responsabilidadesHtml = estado.requisitos.responsabilidades.length > 0
      ? `<ul class="revisao-lista">${estado.requisitos.responsabilidades.map(r => `<li>${escaparHtml(r)}</li>`).join("")}</ul>`
      : `<p class="revisao-vazio">Nenhuma responsabilidade informada.</p>`;

    const etapasHtml = estado.processo.etapas.length > 0
      ? `<ol class="revisao-lista-numerada">${estado.processo.etapas.map(e => {
          const perguntas = Array.isArray(e.perguntas) ? e.perguntas : [];
          if (!ehEtapaDeTeste(e.nome) || perguntas.length === 0) {
            return `<li>${escaparHtml(e.nome)}</li>`;
          }
          const listaP = perguntas
            .map((p, idx) => `<li>${escaparHtml(p.enunciado.trim() || `Pergunta ${idx + 1}`)} — <strong>${p.obrigatoria ? "Obrigatória" : "Optativa"}</strong></li>`)
            .join("");
          return `<li>${escaparHtml(e.nome)}<ul>${listaP}</ul></li>`;
        }).join("")}</ol>`
      : `<p class="revisao-vazio">Nenhuma etapa configurada.</p>`;

    div.innerHTML = `
      <h2 class="passo-titulo">Revisão e publicação</h2>
      <p class="passo-subtitulo">Confira como ficou a vaga antes de publicar.</p>

      <div class="revisao-bloco">
        <div class="revisao-bloco-cabecalho">
          <h3 class="revisao-bloco-titulo">Informações básicas</h3>
          <button type="button" class="botao-link-editar" data-ir-passo="1">Editar</button>
        </div>
        <div class="revisao-grade-dados">
          <div class="revisao-dado">
            <span class="revisao-rotulo">Título da vaga</span>
            <strong class="revisao-valor">${escaparHtml(estado.basicos.titulo || "—")}</strong>
          </div>
          <div class="revisao-dado">
            <span class="revisao-rotulo">Empresa</span>
            <strong class="revisao-valor">${escaparHtml(estado.basicos.empresa || "—")}</strong>
          </div>
          <div class="revisao-dado">
            <span class="revisao-rotulo">Área</span>
            <strong class="revisao-valor">${escaparHtml(estado.basicos.area || "—")}</strong>
          </div>
          <div class="revisao-dado">
            <span class="revisao-rotulo">Tipo de contrato</span>
            <strong class="revisao-valor">${escaparHtml(estado.basicos.contratacao || "—")}</strong>
          </div>
          <div class="revisao-dado">
            <span class="revisao-rotulo">Modalidade</span>
            <strong class="revisao-valor">${escaparHtml(estado.basicos.modalidade || "—")}</strong>
          </div>
          <div class="revisao-dado">
            <span class="revisao-rotulo">Localização</span>
            <strong class="revisao-valor">${escaparHtml(estado.basicos.local || "—")}</strong>
          </div>
        </div>
      </div>

      <div class="revisao-bloco">
        <div class="revisao-bloco-cabecalho">
          <h3 class="revisao-bloco-titulo">Descrição da vaga</h3>
          <button type="button" class="botao-link-editar" data-ir-passo="1">Editar</button>
        </div>
        <p class="revisao-descricao-texto">${escaparHtml(estado.basicos.descricao || "Sem descrição informada.")}</p>
      </div>

      <div class="revisao-bloco">
        <div class="revisao-bloco-cabecalho">
          <h3 class="revisao-bloco-titulo">Requisitos e responsabilidades</h3>
          <button type="button" class="botao-link-editar" data-ir-passo="2">Editar</button>
        </div>
        <div class="revisao-subsecao">
          <span class="revisao-rotulo">Principais responsabilidades</span>
          ${responsabilidadesHtml}
        </div>
        <div class="revisao-colunas-requisitos">
          <div class="revisao-coluna-card">
            <span class="revisao-rotulo">Requisitos obrigatórios</span>
            ${obrigatoriosHtml}
          </div>
          <div class="revisao-coluna-card">
            <span class="revisao-rotulo">Diferenciais</span>
            ${diferenciaisHtml}
          </div>
        </div>
      </div>

      <div class="revisao-bloco">
        <div class="revisao-bloco-cabecalho">
          <h3 class="revisao-bloco-titulo">Processo seletivo</h3>
          <button type="button" class="botao-link-editar" data-ir-passo="3">Editar</button>
        </div>
        ${etapasHtml}
      </div>
    `;

    div.querySelectorAll("[data-ir-passo]").forEach((btn) => {
      btn.addEventListener("click", () => {
        etapaAtual = Number(btn.getAttribute("data-ir-passo"));
        renderizarEtapa();
      });
    });

    return div;
  }

  function renderizarEtapa() {
    stepperArea.replaceChildren(criarStepper({
      etapas: PASSOS,
      etapaAtual,
      onChange: (id) => {
        etapaAtual = id;
        renderizarEtapa();
      }
    }));

    corpoFormulario.innerHTML = "";
    if (etapaAtual === 1) corpoFormulario.appendChild(renderPassoUm());
    if (etapaAtual === 2) corpoFormulario.appendChild(renderPassoDois());
    if (etapaAtual === 3) corpoFormulario.appendChild(renderPassoTres());
    if (etapaAtual === 4) corpoFormulario.appendChild(renderPassoQuatro());

    anterior.textContent = etapaAtual === 1 ? "Cancelar" : "Voltar";
    avancar.textContent = etapaAtual === 4 ? "Publicar vaga" : "Próximo";
    atualizarPreview();
  }

  anterior.addEventListener("click", () => {
    if (etapaAtual > 1) {
      etapaAtual--;
      renderizarEtapa();
    } else {
      window.location.hash = "#gerenciar-vagas";
    }
  });

  avancar.addEventListener("click", () => {
    if (etapaAtual < 4) {
      etapaAtual++;
      renderizarEtapa();
    } else {
      alert("Vaga publicada com sucesso!");
      window.location.hash = "#gerenciar-vagas";
    }
  });

  renderizarEtapa();
  return containerPagina;
}