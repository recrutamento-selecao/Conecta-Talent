const CANDIDATURAS_MOCK = [
  {
    id: 1,
    candidato: "Bruno Almeida",
    cargoDesejado: "Desenvolvedor Full Stack",
    tituloVaga: "Analista de Dados / BI Pleno",
    area: "Dados & TI",
    localizacao: "Sorocaba - SP",
    modalidade: "Híbrido",
    habilidades: ["SQL", "Power BI", "Python", "Excel", "DAX", "Git"],
    etapa: "Triagem",
    status: "Em análise",
    dataCandidatura: "24/11/2026"
  },
  {
    id: 2,
    candidato: "Camila Ferreira",
    cargoDesejado: "Analista de Dados Jr",
    tituloVaga: "Analista de Dados / BI Pleno",
    area: "Dados & TI",
    localizacao: "Remoto",
    modalidade: "Remoto",
    habilidades: ["SQL Server", "Power Query", "Excel", "ETL"],
    etapa: "Entrevista",
    status: "Aprovado na etapa",
    dataCandidatura: "23/11/2026"
  },
  {
    id: 3,
    candidato: "Lucas Mendes",
    cargoDesejado: "Assistente Administrativo",
    tituloVaga: "Assistente Administrativo",
    area: "Administração",
    localizacao: "Boituva - SP",
    modalidade: "Presencial",
    habilidades: ["Excel", "Atendimento", "Organização", "Controle de Estoque"],
    etapa: "Inscrição",
    status: "Nova",
    dataCandidatura: "22/11/2026"
  },
  {
    id: 4,
    candidato: "Juliana Ribeiro",
    cargoDesejado: "Desenvolvedora Front-end",
    tituloVaga: "Desenvolvedor Web Full Stack",
    area: "Tecnologia",
    localizacao: "Sorocaba - SP",
    modalidade: "Híbrido",
    habilidades: ["HTML", "CSS", "JavaScript", "TypeScript", "Node.js"],
    etapa: "Avaliação técnica",
    status: "Em análise",
    dataCandidatura: "20/11/2026"
  },
  {
    id: 5,
    candidato: "Rafael Costa",
    cargoDesejado: "Analista de Operações",
    tituloVaga: "Coordenador de Almoxarifado",
    area: "Logística",
    localizacao: "Sorocaba - SP",
    modalidade: "Presencial",
    habilidades: ["Inventário", "Relatórios", "EPIs", "Excel"],
    etapa: "Entrevista",
    status: "Agendada",
    dataCandidatura: "18/11/2026"
  }
];

function obterIniciais(nome = "") {
  return nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() || "")
    .join("");
}

function classeBadgeStatus(status) {
  switch (status) {
    case "Nova":
      return "badge-status badge-nova";
    case "Em análise":
      return "badge-status badge-analise";
    case "Aprovado na etapa":
    case "Agendada":
      return "badge-status badge-positivo";
    default:
      return "badge-status";
  }
}

export function renderCandidaturasRecebidasRecrutador() {
  const wrapper = document.createElement("div");
  wrapper.className = "pagina-layout-dashboard";

  const sidebar =
    typeof criarSidebar === "function"
      ? criarSidebar("recrutador", "Thaeny Soares")
      : document.createElement("aside");

  if (typeof criarSidebar !== "function") {
    sidebar.className = "sidebar";
    sidebar.innerHTML = `
      <div class="sidebar-topo">
        <span class="logo-marca">Conecta <strong>Talent</strong></span>
      </div>
      <nav class="sidebar-menu">
        <a href="#dashboard-recrutador" class="sidebar-link">Dashboard</a>
        <a href="#vagas" class="sidebar-link">Vagas</a>
        <a href="#banco-de-talentos" class="sidebar-link">Banco de Talentos</a>
        <a href="#candidaturas-recebidas" class="sidebar-link ativo">Candidaturas — Recebidas</a>
        <a href="#perfil" class="sidebar-link">Perfil</a>
      </nav>
    `;
  }

  const main = document.createElement("main");
  main.className = "conteudo-principal candidaturas-recebidas-page";

  main.innerHTML = `
    <header class="cand-cabecalho">
      <div>
        <h1 class="cand-titulo">Candidaturas recebidas</h1>
        <p class="cand-subtitulo">Acompanhe os candidatos inscritos nas vagas sob sua responsabilidade.</p>
      </div>
    </header>

    <section class="cand-filtros-card" aria-label="Filtros de candidaturas">
      <div class="cand-busca-box">
        <span class="cand-busca-icone" aria-hidden="true">🔍</span>
        <input
          type="search"
          id="filtroBuscaCandidatura"
          class="cand-input-busca"
          placeholder="Buscar por candidato, título da vaga ou habilidade..."
        />
      </div>

      <select id="filtroVaga" class="cand-select" aria-label="Filtrar por vaga">
        <option value="todas">Vaga: Todas</option>
        <option value="Analista de Dados / BI Pleno">Analista de Dados / BI Pleno</option>
        <option value="Assistente Administrativo">Assistente Administrativo</option>
        <option value="Desenvolvedor Web Full Stack">Desenvolvedor Web Full Stack</option>
        <option value="Coordenador de Almoxarifado">Coordenador de Almoxarifado</option>
      </select>

      <select id="filtroEtapa" class="cand-select" aria-label="Filtrar por etapa">
        <option value="todas">Etapa: Todas</option>
        <option value="Inscrição">Inscrição</option>
        <option value="Triagem">Triagem</option>
        <option value="Avaliação técnica">Avaliação técnica</option>
        <option value="Entrevista">Entrevista</option>
      </select>

      <select id="filtroStatus" class="cand-select" aria-label="Filtrar por status">
        <option value="todos">Status: Todos</option>
        <option value="Nova">Nova</option>
        <option value="Em análise">Em análise</option>
        <option value="Aprovado na etapa">Aprovado na etapa</option>
        <option value="Agendada">Agendada</option>
      </select>

      <button type="button" id="btnLimparFiltrosCand" class="cand-btn-limpar">
        ↻ Limpar
      </button>
    </section>

    <section class="cand-tabela-card">
      <div class="cand-tabela-responsiva">
        <table class="cand-tabela">
          <thead>
            <tr>
              <th class="col-check"><input type="checkbox" id="selecionarTodasCand" aria-label="Selecionar todas as candidaturas" /></th>
              <th>Candidato</th>
              <th>Título da vaga</th>
              <th>Localização</th>
              <th>Habilidades</th>
              <th>Etapa / Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="corpoTabelaCandidaturas"></tbody>
        </table>
      </div>

      <footer class="cand-rodape-paginacao">
        <span id="textoResumoPaginacao" class="cand-resumo-paginacao"></span>

        <div class="cand-controles-paginacao">
          <label for="itensPorPaginaCand" class="cand-label-por-pagina">Itens por página:</label>
          <select id="itensPorPaginaCand" class="cand-select-pagina">
            <option value="6" selected>6</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>

          <div class="cand-botoes-pagina">
            <button type="button" id="btnPaginaAnteriorCand" class="cand-btn-pag" aria-label="Página anterior">&lt;</button>
            <span id="indicadorPaginaCand" class="cand-pag-atual">1</span>
            <button type="button" id="btnProximaPaginaCand" class="cand-btn-pag" aria-label="Próxima página">&gt;</button>
          </div>
        </div>
      </footer>
    </section>
  `;

  wrapper.append(sidebar, main);

  const estado = {
    busca: "",
    vaga: "todas",
    etapa: "todas",
    status: "todos",
    paginaAtual: 1,
    itensPorPagina: 6
  };

  const inputBusca = main.querySelector("#filtroBuscaCandidatura");
  const selectVaga = main.querySelector("#filtroVaga");
  const selectEtapa = main.querySelector("#filtroEtapa");
  const selectStatus = main.querySelector("#filtroStatus");
  const btnLimpar = main.querySelector("#btnLimparFiltrosCand");
  const selectPorPagina = main.querySelector("#itensPorPaginaCand");
  const btnAnterior = main.querySelector("#btnPaginaAnteriorCand");
  const btnProxima = main.querySelector("#btnProximaPaginaCand");
  const indicadorPagina = main.querySelector("#indicadorPaginaCand");
  const textoResumo = main.querySelector("#textoResumoPaginacao");
  const tbody = main.querySelector("#corpoTabelaCandidaturas");

  function filtrarCandidaturas() {
    const termo = estado.busca.trim().toLowerCase();

    return CANDIDATURAS_MOCK.filter((item) => {
      const correspondeBusca =
        !termo ||
        item.candidato.toLowerCase().includes(termo) ||
        item.cargoDesejado.toLowerCase().includes(termo) ||
        item.tituloVaga.toLowerCase().includes(termo) ||
        item.habilidades.some((h) => h.toLowerCase().includes(termo));

      const correspondeVaga = estado.vaga === "todas" || item.tituloVaga === estado.vaga;
      const correspondeEtapa = estado.etapa === "todas" || item.etapa === estado.etapa;
      const correspondeStatus = estado.status === "todos" || item.status === estado.status;

      return correspondeBusca && correspondeVaga && correspondeEtapa && correspondeStatus;
    });
  }

  function renderizarTabela() {
    const filtrados = filtrarCandidaturas();
    const totalItens = filtrados.length;
    const totalPaginas = Math.max(1, Math.ceil(totalItens / estado.itensPorPagina));

    if (estado.paginaAtual > totalPaginas) {
      estado.paginaAtual = totalPaginas;
    }

    const inicio = (estado.paginaAtual - 1) * estado.itensPorPagina;
    const fim = inicio + estado.itensPorPagina;
    const paginaItens = filtrados.slice(inicio, fim);

    if (paginaItens.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="cand-estado-vazio">
            Nenhuma candidatura encontrada com os filtros selecionados.
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = paginaItens
        .map((item) => {
          const visiveis = item.habilidades.slice(0, 3);
          const extras = item.habilidades.length - visiveis.length;

          return `
            <tr data-candidatura-id="${item.id}">
              <td class="col-check">
                <input type="checkbox" class="check-candidatura" aria-label="Selecionar ${item.candidato}" />
              </td>
              <td>
                <div class="cand-pessoa">
                  <span class="cand-avatar">${obterIniciais(item.candidato)}</span>
                  <div class="cand-pessoa-info">
                    <strong class="cand-nome">${item.candidato}</strong>
                    <span class="cand-cargo-sub">${item.cargoDesejado}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="cand-vaga-col">
                  <strong class="cand-vaga-titulo">${item.tituloVaga}</strong>
                  <span class="cand-vaga-area">${item.area}</span>
                </div>
              </td>
              <td>
                <div class="cand-local-col">
                  <span class="cand-local-cidade">${item.localizacao}</span>
                  <span class="cand-local-mod">${item.modalidade}</span>
                </div>
              </td>
              <td>
                <div class="cand-skills-lista">
                  ${visiveis.map((skill) => `<span class="cand-skill-chip">${skill}</span>`).join("")}
                  ${extras > 0 ? `<span class="cand-skill-chip mais">+${extras}</span>` : ""}
                </div>
              </td>
              <td>
                <div class="cand-etapa-col">
                  <strong class="cand-etapa-nome">${item.etapa}</strong>
                  <span class="cand-data-envio">Enviada em ${item.dataCandidatura}</span>
                </div>
              </td>
              <td>
                <span class="${classeBadgeStatus(item.status)}">${item.status}</span>
              </td>
            </tr>
          `;
        })
        .join("");
    }

    const exibindoInicio = totalItens === 0 ? 0 : inicio + 1;
    const exibindoFim = Math.min(fim, totalItens);
    textoResumo.textContent = `Mostrando ${exibindoInicio} a ${exibindoFim} de ${totalItens} candidaturas`;
    indicadorPagina.textContent = String(estado.paginaAtual);
    btnAnterior.disabled = estado.paginaAtual <= 1;
    btnProxima.disabled = estado.paginaAtual >= totalPaginas;
  }

  inputBusca.addEventListener("input", (e) => {
    estado.busca = e.target.value;
    estado.paginaAtual = 1;
    renderizarTabela();
  });

  selectVaga.addEventListener("change", (e) => {
    estado.vaga = e.target.value;
    estado.paginaAtual = 1;
    renderizarTabela();
  });

  selectEtapa.addEventListener("change", (e) => {
    estado.etapa = e.target.value;
    estado.paginaAtual = 1;
    renderizarTabela();
  });

  selectStatus.addEventListener("change", (e) => {
    estado.status = e.target.value;
    estado.paginaAtual = 1;
    renderizarTabela();
  });

  btnLimpar.addEventListener("click", () => {
    estado.busca = "";
    estado.vaga = "todas";
    estado.etapa = "todas";
    estado.status = "todos";
    estado.paginaAtual = 1;

    inputBusca.value = "";
    selectVaga.value = "todas";
    selectEtapa.value = "todas";
    selectStatus.value = "todos";
    renderizarTabela();
  });

  selectPorPagina.addEventListener("change", (e) => {
    estado.itensPorPagina = Number(e.target.value) || 6;
    estado.paginaAtual = 1;
    renderizarTabela();
  });

  btnAnterior.addEventListener("click", () => {
    if (estado.paginaAtual > 1) {
      estado.paginaAtual -= 1;
      renderizarTabela();
    }
  });

  btnProxima.addEventListener("click", () => {
    const totalPaginas = Math.max(
      1,
      Math.ceil(filtrarCandidaturas().length / estado.itensPorPagina)
    );
    if (estado.paginaAtual < totalPaginas) {
      estado.paginaAtual += 1;
      renderizarTabela();
    }
  });

  renderizarTabela();
  return wrapper;
}