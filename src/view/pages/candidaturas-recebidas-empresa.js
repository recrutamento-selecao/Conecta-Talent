import { criarSidebar } from "../components/sidebar.js";
import { criarTabela } from "../components/table.js";
import { vagasRecrutadorEstado } from "./criar-vagas.js";

const CANDIDATURAS_INICIAIS = [
  {
    id: 101,
    vagaId: 1,
    vagaTitulo: "Analista de Dados Pleno",
    empresa: "Conecta Talent",
    recrutador: "Thaeny Soares",
    candidatoNome: "Ana Clara Silva",
    cargoInteresse: "Analista de Dados",
    subtituloCargo: "Ciência de Dados e Business Intelligence",
    area: "Dados",
    habilidades: ["SQL", "Power BI", "Python", "Excel", "DAX"],
    experiencia: "3 anos",
    nivelExperiencia: "Pleno",
    localizacao: "São Paulo - SP",
    modalidade: "Híbrido",
    statusCandidatura: "Recebida",
    etapaAtual: "Inscrição",
    dataCandidatura: "24/11/2026",
    formacao: "Superior",
    cursoFormacao: "Análise e Desenvolvimento de Sistemas",
    instituicao: "Universidade de São Paulo",
    email: "ana.clara.s@email.com",
    telefone: "(11) 91234-5678",
    sobre: "Profissional com experiência em análise de dados, criação de dashboards e acompanhamento de indicadores.",
    curriculoResumo: "Graduação em ADS, atuação em BI comercial e financeiro, ETL e modelagem dimensional."
  },
  {
    id: 102,
    vagaId: 1,
    vagaTitulo: "Analista de Dados Pleno",
    empresa: "Conecta Talent",
    recrutador: "Thaeny Soares",
    candidatoNome: "Gabriel Rocha",
    cargoInteresse: "Desenvolvedor Front-end",
    subtituloCargo: "Dados e Web",
    area: "TI",
    habilidades: ["HTML", "CSS", "JavaScript", "Git", "SQL"],
    experiencia: "3 anos",
    nivelExperiencia: "Júnior",
    localizacao: "Sorocaba - SP",
    modalidade: "Remoto",
    statusCandidatura: "Recebida",
    etapaAtual: "Inscrição",
    dataCandidatura: "23/11/2026",
    formacao: "Superior",
    cursoFormacao: "Análise e Desenvolvimento de Sistemas",
    instituicao: "FATEC Sorocaba",
    email: "gabriel.rocha@email.com",
    telefone: "(15) 95432-1098",
    sobre: "Focado em construção de aplicações, interfaces e organização de dados.",
    curriculoResumo: "Graduação em ADS, desenvolvimento web e versionamento com Git."
  }
];

// Estado em memória compartilhado das candidaturas recebidas nas vagas do recrutador
export const candidaturasRecebidasEstado = CANDIDATURAS_INICIAIS.map(item => ({
  ...item,
  habilidades: [...(item.habilidades || [])]
}));

/**
 * Chamada quando um candidato se candidata a uma vaga criada pelo recrutador.
 * Vincula automaticamente ao recrutador da vaga em vagasRecrutadorEstado.
 */
export function registrarCandidaturaNaVaga(dados = {}) {
  const vagaEncontrada = vagasRecrutadorEstado.find(v => v.id === dados.vagaId) || null;
  const recrutadorDaVaga = dados.recrutador || vagaEncontrada?.recrutador || "Thaeny Soares";
  const tituloDaVaga = dados.vagaTitulo || vagaEncontrada?.titulo || "Vaga cadastrada";
  const empresaDaVaga = dados.empresa || vagaEncontrada?.empresa || "Nome da empresa";

  const novaCandidatura = {
    id: Date.now(),
    vagaId: vagaEncontrada?.id ?? dados.vagaId ?? null,
    vagaTitulo: tituloDaVaga,
    empresa: empresaDaVaga,
    recrutador: recrutadorDaVaga,
    candidatoNome: dados.candidatoNome || "Candidato",
    cargoInteresse: dados.cargoInteresse || tituloDaVaga,
    subtituloCargo: dados.subtituloCargo || `Vaga: ${tituloDaVaga}`,
    area: dados.area || vagaEncontrada?.area || "Geral",
    habilidades: Array.isArray(dados.habilidades) ? [...dados.habilidades] : [],
    experiencia: dados.experiencia || "—",
    nivelExperiencia: dados.nivelExperiencia || "—",
    localizacao: dados.localizacao || vagaEncontrada?.localizacao || "—",
    modalidade: dados.modalidade || vagaEncontrada?.modalidade || "—",
    statusCandidatura: dados.statusCandidatura || "Recebida",
    etapaAtual: dados.etapaAtual || "Inscrição",
    dataCandidatura: dados.dataCandidatura || new Date().toLocaleDateString("pt-BR"),
    formacao: dados.formacao || "—",
    cursoFormacao: dados.cursoFormacao || "—",
    instituicao: dados.instituicao || "—",
    email: dados.email || "—",
    telefone: dados.telefone || "—",
    sobre: dados.sobre || "Candidatura enviada através da vaga.",
    curriculoResumo: dados.curriculoResumo || "Currículo enviado na candidatura."
  };

  candidaturasRecebidasEstado.unshift(novaCandidatura);
  return novaCandidatura;
}

function escaparHtml(texto = "") {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function obterIniciais(nome = "") {
  return (
    nome
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(p => p[0]?.toUpperCase() || "")
      .join("") || "CR"
  );
}

export function renderCandidaturasRecebidasEmpresa(recrutadorLogado = "Thaeny Soares") {
  const containerPagina = document.createElement("div");
  containerPagina.className = "pagina-layout-dashboard";

  const sidebar = criarSidebar("recrutador", recrutadorLogado);
  containerPagina.appendChild(sidebar);

  const conteudoPrincipal = document.createElement("main");
  conteudoPrincipal.className = "conteudo-principal";
  containerPagina.appendChild(conteudoPrincipal);

  let candidaturaSelecionadaId = null;
  let abaAtiva = "resumo";
  let paginaAtual = 1;
  let itensPorPagina = 6;

  const filtros = {
    busca: "",
    status: "todos",
    vaga: "todas",
    area: "todas",
    local: "todos"
  };

  const vagasDoRecrutador = vagasRecrutadorEstado.filter(v => v.recrutador === recrutadorLogado);

  const cabecalho = document.createElement("div");
  cabecalho.className = "cabecalho-secao-acao";
  cabecalho.innerHTML = `
    <div>
      <h1 class="titulo-pagina">Candidaturas recebidas</h1>
      <p class="subtitulo-pagina">Acompanhe os candidatos que se inscreveram nas vagas criadas por você.</p>
    </div>
  `;
  conteudoPrincipal.appendChild(cabecalho);

  const barraFiltros = document.createElement("section");
  barraFiltros.className = "bt-barra-filtros-inline";
  barraFiltros.innerHTML = `
    <div class="bt-campo-busca-wrap">
      <svg class="bt-icone-lupa" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        id="cr-busca-inline"
        class="bt-input-busca-inline"
        placeholder="Buscar por candidato, vaga, habilidade ou cidade..."
      />
    </div>

    <select id="cr-select-status" class="bt-select-inline" aria-label="Status">
      <option value="todos">Status: Todos</option>
      <option value="Recebida">Recebida</option>
      <option value="Em triagem">Em triagem</option>
    </select>

    <select id="cr-select-vaga" class="bt-select-inline" aria-label="Vaga">
      <option value="todas">Vaga: Todas</option>
      ${vagasDoRecrutador
        .map(v => `<option value="${escaparHtml(v.titulo)}">${escaparHtml(v.titulo)}</option>`)
        .join("")}
    </select>

    <select id="cr-select-area" class="bt-select-inline" aria-label="Área">
      <option value="todas">Área: Todas</option>
      <option value="Dados">Dados</option>
      <option value="TI">TI</option>
      <option value="Design">Design</option>
      <option value="Recursos Humanos">Recursos Humanos</option>
    </select>

    <select id="cr-select-local" class="bt-select-inline" aria-label="Local">
      <option value="todos">Local: Todos</option>
      <option value="São Paulo - SP">São Paulo - SP</option>
      <option value="Sorocaba - SP">Sorocaba - SP</option>
      <option value="Rio de Janeiro - RJ">Rio de Janeiro - RJ</option>
      <option value="Campinas - SP">Campinas - SP</option>
    </select>

    <button type="button" id="cr-btn-limpar-inline" class="bt-btn-limpar-inline">
      ↺ Limpar
    </button>
  `;
  conteudoPrincipal.appendChild(barraFiltros);

  const gradePrincipal = document.createElement("div");
  gradePrincipal.className = "bt-layout-split";

  const colunaTabela = document.createElement("div");
  colunaTabela.className = "bt-coluna-tabela";

  const painelDetalhe = document.createElement("aside");
  painelDetalhe.className = "bt-painel-detalhe";

  gradePrincipal.append(colunaTabela, painelDetalhe);
  conteudoPrincipal.appendChild(gradePrincipal);

  function sincronizarVisibilidadePainel(item) {
    if (!item) {
      painelDetalhe.style.display = "none";
      gradePrincipal.classList.remove("bt-painel-aberto");
      painelDetalhe.innerHTML = "";
      return true;
    }

    painelDetalhe.style.display = "";
    gradePrincipal.classList.add("bt-painel-aberto");
    return false;
  }

  function filtrarCandidaturas() {
    const termo = filtros.busca.trim().toLowerCase();
    const idsVagasRecrutador = new Set(vagasDoRecrutador.map(v => v.id));

    return candidaturasRecebidasEstado
      .filter(c => {
        if (c.recrutador === recrutadorLogado) return true;
        if (c.vagaId !== null && idsVagasRecrutador.has(c.vagaId)) return true;
        return false;
      })
      .filter(c => {
        if (filtros.status !== "todos" && c.statusCandidatura !== filtros.status) return false;
        if (filtros.vaga !== "todas" && c.vagaTitulo !== filtros.vaga) return false;
        if (filtros.area !== "todas" && c.area !== filtros.area) return false;
        if (filtros.local !== "todos" && c.localizacao !== filtros.local) return false;

        if (termo) {
          const emNome = (c.candidatoNome || "").toLowerCase().includes(termo);
          const emVaga = (c.vagaTitulo || "").toLowerCase().includes(termo);
          const emCargo = (c.cargoInteresse || "").toLowerCase().includes(termo);
          const emLocal = (c.localizacao || "").toLowerCase().includes(termo);
          const emHab = (c.habilidades || []).some(h => h.toLowerCase().includes(termo));
          if (!emNome && !emVaga && !emCargo && !emLocal && !emHab) return false;
        }

        return true;
      });
  }

  function renderPainelDetalhe(item) {
    if (sincronizarVisibilidadePainel(item)) {
      return;
    }

    let corpoAbaHtml = "";

    if (abaAtiva === "resumo") {
      corpoAbaHtml = `
        <div class="bt-figma-bloco">
          <div class="bt-figma-bloco-titulo">
            <span class="bt-figma-icone-secao">💼</span>
            <h4>Vaga aplicada</h4>
          </div>
          <p class="bt-figma-destaque-titulo">${escaparHtml(item.vagaTitulo)}</p>
          <p class="bt-figma-subtexto">
            ${escaparHtml(item.empresa || "Empresa")} · Etapa: ${escaparHtml(item.etapaAtual || "Inscrição")} · Enviada em ${escaparHtml(item.dataCandidatura || "—")}
          </p>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-bloco">
          <div class="bt-figma-bloco-titulo">
            <span class="bt-figma-icone-secao">👤</span>
            <h4>Sobre o candidato</h4>
          </div>
          <p class="bt-figma-texto">${escaparHtml(item.sobre || "Sem descrição informada.")}</p>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-bloco">
          <div class="bt-figma-bloco-titulo">
            <span class="bt-figma-icone-secao">💡</span>
            <h4>Habilidades principais</h4>
          </div>
          <div class="bt-figma-chips-linha">
            ${(item.habilidades || []).map(h => `<span class="bt-figma-chip">${escaparHtml(h)}</span>`).join("")}
          </div>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-duas-colunas">
          <div>
            <div class="bt-figma-bloco-titulo">
              <span class="bt-figma-icone-secao">🗓️</span>
              <h4>Experiência</h4>
            </div>
            <p class="bt-figma-destaque-titulo">${escaparHtml(item.experiencia || "—")}</p>
            <p class="bt-figma-subtexto">${escaparHtml(item.nivelExperiencia || "—")}</p>
          </div>

          <div>
            <div class="bt-figma-bloco-titulo">
              <span class="bt-figma-icone-secao">📍</span>
              <h4>Localização</h4>
            </div>
            <p class="bt-figma-destaque-titulo">${escaparHtml(item.localizacao || "—")}</p>
            <p class="bt-figma-subtexto">${escaparHtml(item.modalidade || "—")}</p>
          </div>
        </div>
      `;
    } else if (abaAtiva === "curriculo") {
      corpoAbaHtml = `
        <div class="bt-figma-bloco">
          <div class="bt-figma-bloco-titulo">
            <span class="bt-figma-icone-secao">📄</span>
            <h4>Resumo do currículo</h4>
          </div>
          <p class="bt-figma-texto">${escaparHtml(item.curriculoResumo || "—")}</p>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-formacao-grid">
          <div class="bt-figma-box-formacao">
            <span class="bt-figma-box-label">E-mail</span>
            <strong class="bt-figma-box-valor">${escaparHtml(item.email || "—")}</strong>
          </div>
          <div class="bt-figma-box-formacao">
            <span class="bt-figma-box-label">Telefone</span>
            <strong class="bt-figma-box-valor">${escaparHtml(item.telefone || "—")}</strong>
          </div>
        </div>
      `;
    } else if (abaAtiva === "formacao") {
      corpoAbaHtml = `
        <div class="bt-figma-bloco">
          <div class="bt-figma-bloco-titulo">
            <span class="bt-figma-icone-secao">🎓</span>
            <h4>Formação acadêmica</h4>
          </div>
          <div class="bt-figma-formacao-grid">
            <div class="bt-figma-box-formacao">
              <span class="bt-figma-box-label">Curso</span>
              <strong class="bt-figma-box-valor">${escaparHtml(item.cursoFormacao || "—")}</strong>
            </div>
            <div class="bt-figma-box-formacao">
              <span class="bt-figma-box-label">Instituição</span>
              <strong class="bt-figma-box-valor">${escaparHtml(item.instituicao || "—")}</strong>
            </div>
          </div>
        </div>
      `;
    }

    painelDetalhe.innerHTML = `
      <div class="bt-figma-topo">
        <div>
          <h3 class="bt-figma-nome">${escaparHtml(item.candidatoNome)}</h3>
          <p class="bt-figma-cargo-topo">${escaparHtml(item.vagaTitulo)}</p>
          <p class="bt-figma-contato-linha">
            ${escaparHtml(item.localizacao || "—")} &nbsp;|&nbsp; ${escaparHtml(item.modalidade || "—")} &nbsp; ${escaparHtml(item.email || "—")}
          </p>
        </div>
        <button type="button" id="cr-fechar-painel" class="bt-btn-fechar-painel" title="Fechar">✕</button>
      </div>

      <div class="bt-detalhe-abas bt-figma-abas">
        <button type="button" class="bt-aba-item ${abaAtiva === "resumo" ? "ativa" : ""}" data-aba="resumo">Resumo</button>
        <button type="button" class="bt-aba-item ${abaAtiva === "curriculo" ? "ativa" : ""}" data-aba="curriculo">Currículo</button>
        <button type="button" class="bt-aba-item ${abaAtiva === "formacao" ? "ativa" : ""}" data-aba="formacao">Formação</button>
      </div>

      <div class="bt-detalhe-corpo bt-figma-corpo">
        ${corpoAbaHtml}
      </div>

      <div class="bt-detalhe-rodape">
        <button type="button" id="cr-btn-triagem" class="bt-btn-favoritar ${item.statusCandidatura === "Em triagem" ? "ativo" : ""}">
          ${item.statusCandidatura === "Em triagem" ? "✓ Em triagem" : "Mover para triagem"}
        </button>
      </div>
    `;

    painelDetalhe.querySelectorAll(".bt-aba-item").forEach(btn => {
      btn.addEventListener("click", () => {
        abaAtiva = btn.getAttribute("data-aba");
        renderPainelDetalhe(item);
      });
    });

    painelDetalhe.querySelector("#cr-fechar-painel")?.addEventListener("click", () => {
      candidaturaSelecionadaId = null;
      colunaTabela.querySelectorAll("tbody tr").forEach(r => r.classList.remove("bt-linha-ativa"));
      renderPainelDetalhe(null);
    });

    painelDetalhe.querySelector("#cr-btn-triagem")?.addEventListener("click", () => {
      item.statusCandidatura = item.statusCandidatura === "Em triagem" ? "Recebida" : "Em triagem";
      item.etapaAtual = item.statusCandidatura === "Em triagem" ? "Triagem" : "Inscrição";
      atualizarTela();
    });
  }

  function atualizarTela() {
    const filtradas = filtrarCandidaturas();
    const totalItens = filtradas.length;
    const totalPaginas = Math.max(1, Math.ceil(totalItens / itensPorPagina));
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const paginadas = filtradas.slice(inicio, inicio + itensPorPagina);

    if (candidaturaSelecionadaId !== null && !paginadas.some(c => c.id === candidaturaSelecionadaId)) {
      candidaturaSelecionadaId = null;
    }

    const colunas = [
      {
        titulo: "Candidato",
        chave: "candidatoNome",
        ordenavel: true,
        render: (_, item) => {
          const wrap = document.createElement("div");
          wrap.className = "bt-celula-candidato";

          const avatar = document.createElement("span");
          avatar.className = "bt-avatar-tabela";
          avatar.textContent = obterIniciais(item.candidatoNome);

          const info = document.createElement("div");
          info.innerHTML = `
            <strong class="bt-tabela-nome">${escaparHtml(item.candidatoNome)}</strong>
            <span class="bt-tabela-sub">${escaparHtml(item.vagaTitulo)}</span>
          `;

          wrap.append(avatar, info);
          return wrap;
        }
      },
      {
        titulo: "Área",
        chave: "area",
        ordenavel: true
      },
      {
        titulo: "Localização",
        chave: "localizacao",
        ordenavel: true,
        render: (_, item) => {
          const info = document.createElement("div");
          info.innerHTML = `
            <span class="bt-tabela-principal">${escaparHtml(item.localizacao || "—")}</span>
            <span class="bt-tabela-sub">${escaparHtml(item.modalidade || "—")}</span>
          `;
          return info;
        }
      },
      {
        titulo: "Habilidades",
        chave: "habilidades",
        render: (habs = []) => {
          const wrap = document.createElement("div");
          wrap.className = "bt-tabela-tags";
          habs.slice(0, 3).forEach(h => {
            const chip = document.createElement("span");
            chip.className = "bt-tag-mini";
            chip.textContent = h;
            wrap.appendChild(chip);
          });
          if (habs.length > 3) {
            const mais = document.createElement("span");
            mais.className = "bt-tag-mais";
            mais.textContent = `+${habs.length - 3}`;
            wrap.appendChild(mais);
          }
          return wrap;
        }
      },
      {
        titulo: "Experiência",
        chave: "experiencia",
        ordenavel: true
      },
      {
        titulo: "Status",
        chave: "statusCandidatura",
        ordenavel: true,
        render: (val) => {
          const badge = document.createElement("span");
          badge.className = "bt-badge-disponivel";
          badge.textContent = val;
          return badge;
        }
      }
    ];

    const inicioTexto = totalItens === 0 ? 0 : inicio + 1;
    const fimTexto = Math.min(inicio + itensPorPagina, totalItens);

    const paginacaoHtml = `
      <div class="bt-paginacao">
        <span class="bt-pag-label">Itens por página:</span>
        <select id="cr-select-por-pagina" class="bt-select-por-pagina">
          <option value="6" ${itensPorPagina === 6 ? "selected" : ""}>6</option>
          <option value="10" ${itensPorPagina === 10 ? "selected" : ""}>10</option>
        </select>
        <button type="button" class="bt-btn-pag" data-pag="prev" ${paginaAtual <= 1 ? "disabled" : ""}>&lt;</button>
        ${Array.from({ length: totalPaginas }, (_, idx) => idx + 1)
          .map(num => `<button type="button" class="bt-btn-pag ${num === paginaAtual ? "ativa" : ""}" data-pag="${num}">${num}</button>`)
          .join("")}
        <button type="button" class="bt-btn-pag" data-pag="next" ${paginaAtual >= totalPaginas ? "disabled" : ""}>&gt;</button>
      </div>
    `;

    colunaTabela.innerHTML = "";
    criarTabela(colunas, paginadas, {
      container: colunaTabela,
      acoes: false,
      selecionavel: true,
      rodape: {
        esquerda: `Mostrando ${inicioTexto} a ${fimTexto} de ${totalItens} candidaturas`,
        direita: paginacaoHtml
      }
    });

    colunaTabela.querySelectorAll("tbody tr").forEach((tr, idx) => {
      const cand = paginadas[idx];
      if (!cand) return;
      if (cand.id === candidaturaSelecionadaId) {
        tr.classList.add("bt-linha-ativa");
      }
      tr.style.cursor = "pointer";
      tr.addEventListener("click", (e) => {
        if (e.target.closest('input[type="checkbox"], button')) return;
        candidaturaSelecionadaId = cand.id;
        renderPainelDetalhe(cand);
        colunaTabela.querySelectorAll("tbody tr").forEach(r => r.classList.remove("bt-linha-ativa"));
        tr.classList.add("bt-linha-ativa");
      });
    });

    colunaTabela.querySelector("#cr-select-por-pagina")?.addEventListener("change", (e) => {
      itensPorPagina = Number(e.target.value) || 6;
      paginaAtual = 1;
      atualizarTela();
    });

    colunaTabela.querySelectorAll(".bt-btn-pag").forEach(btn => {
      btn.addEventListener("click", () => {
        const acao = btn.getAttribute("data-pag");
        if (acao === "prev" && paginaAtual > 1) paginaAtual--;
        else if (acao === "next" && paginaAtual < totalPaginas) paginaAtual++;
        else if (!Number.isNaN(Number(acao))) paginaAtual = Number(acao);
        atualizarTela();
      });
    });

    const selecionada = paginadas.find(c => c.id === candidaturaSelecionadaId) || null;
    renderPainelDetalhe(selecionada);
  }

  const inputBusca = barraFiltros.querySelector("#cr-busca-inline");
  const selectStatus = barraFiltros.querySelector("#cr-select-status");
  const selectVaga = barraFiltros.querySelector("#cr-select-vaga");
  const selectArea = barraFiltros.querySelector("#cr-select-area");
  const selectLocal = barraFiltros.querySelector("#cr-select-local");

  function aplicarFiltros() {
    filtros.busca = inputBusca.value;
    filtros.status = selectStatus.value;
    filtros.vaga = selectVaga.value;
    filtros.area = selectArea.value;
    filtros.local = selectLocal.value;
    paginaAtual = 1;
    atualizarTela();
  }

  inputBusca.addEventListener("input", aplicarFiltros);
  selectStatus.addEventListener("change", aplicarFiltros);
  selectVaga.addEventListener("change", aplicarFiltros);
  selectArea.addEventListener("change", aplicarFiltros);
  selectLocal.addEventListener("change", aplicarFiltros);

  barraFiltros.querySelector("#cr-btn-limpar-inline").addEventListener("click", () => {
    inputBusca.value = "";
    selectStatus.value = "todos";
    selectVaga.value = "todas";
    selectArea.value = "todas";
    selectLocal.value = "todos";
    aplicarFiltros();
  });

  atualizarTela();
  return containerPagina;
}