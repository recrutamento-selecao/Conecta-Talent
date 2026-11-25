import { criarSidebar } from "../components/sidebar.js";
import { criarTabela } from "../components/table.js";
import { vagasRecrutadorEstado } from "./criar-vagas.js";

function escaparHtml(texto = "") {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function obterIniciais(titulo = "") {
  return (
    titulo
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(p => p[0]?.toUpperCase() || "")
      .join("") || "VG"
  );
}

export function renderMinhasVagasRecrutador(recrutadorLogado = "Thaeny Soares") {
  const containerPagina = document.createElement("div");
  containerPagina.className = "pagina-layout-dashboard";

  const sidebar = criarSidebar("recrutador", recrutadorLogado);
  containerPagina.appendChild(sidebar);

  const conteudoPrincipal = document.createElement("main");
  conteudoPrincipal.className = "conteudo-principal";
  containerPagina.appendChild(conteudoPrincipal);

  let vagaSelecionadaId = null;
  let paginaAtual = 1;
  let itensPorPagina = 6;

  const filtros = {
    busca: "",
    status: "todos",
    area: "todas",
    modalidade: "todas"
  };

  const cabecalho = document.createElement("div");
  cabecalho.className = "cabecalho-secao-acao";
  cabecalho.innerHTML = `
    <div>
      <h1 class="titulo-pagina">Minhas vagas</h1>
      <p class="subtitulo-pagina">Acompanhe todas as vagas cadastradas por você e veja seus detalhes.</p>
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
        id="mvr-busca-inline"
        class="bt-input-busca-inline"
        placeholder="Buscar por título da vaga, empresa, local ou área..."
      />
    </div>

    <select id="mvr-select-status" class="bt-select-inline" aria-label="Status">
      <option value="todos">Status: Todos</option>
      <option value="Ativa">Ativa</option>
      <option value="Pausada">Pausada</option>
    </select>

    <select id="mvr-select-area" class="bt-select-inline" aria-label="Área">
      <option value="todas">Área: Todas</option>
      <option value="Dados">Dados</option>
      <option value="TI">TI</option>
      <option value="Design">Design</option>
      <option value="Recursos Humanos">Recursos Humanos</option>
    </select>

    <select id="mvr-select-modalidade" class="bt-select-inline" aria-label="Modalidade">
      <option value="todas">Modalidade: Todas</option>
      <option value="Presencial">Presencial</option>
      <option value="Híbrido">Híbrido</option>
      <option value="Remoto">Remoto</option>
    </select>

    <button type="button" id="mvr-btn-limpar-inline" class="bt-btn-limpar-inline">
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

  function sincronizarVisibilidadePainel(vaga) {
    if (!vaga) {
      painelDetalhe.style.display = "none";
      gradePrincipal.classList.remove("bt-painel-aberto");
      painelDetalhe.innerHTML = "";
      return true;
    }

    painelDetalhe.style.display = "";
    gradePrincipal.classList.add("bt-painel-aberto");
    return false;
  }

  function filtrarVagas() {
    const termo = filtros.busca.trim().toLowerCase();

    return vagasRecrutadorEstado
      .filter(v => v.recrutador === recrutadorLogado)
      .filter(v => {
        if (filtros.status !== "todos" && v.status !== filtros.status) return false;
        if (filtros.area !== "todas" && v.area !== filtros.area) return false;
        if (filtros.modalidade !== "todas" && v.modalidade !== filtros.modalidade) return false;

        if (termo) {
          const emTitulo = (v.titulo || "").toLowerCase().includes(termo);
          const emEmpresa = (v.empresa || "").toLowerCase().includes(termo);
          const emLocal = (v.localizacao || "").toLowerCase().includes(termo);
          const emArea = (v.area || "").toLowerCase().includes(termo);
          if (!emTitulo && !emEmpresa && !emLocal && !emArea) return false;
        }

        return true;
      });
  }

  function renderPainelDetalhe(vaga) {
    if (sincronizarVisibilidadePainel(vaga)) {
      return;
    }

    const responsabilidadesHtml = (vaga.responsabilidades || [])
      .map(item => `<li>${escaparHtml(item)}</li>`)
      .join("");

    const requisitosHtml = (vaga.requisitosObrigatorios || [])
      .map(item => `<li>${escaparHtml(item)}</li>`)
      .join("");

    const diferenciaisHtml = (vaga.diferenciais || [])
      .map(item => `<li>${escaparHtml(item)}</li>`)
      .join("");

    const etapasHtml = (vaga.etapas || [])
      .map((etapa, idx) => {
        const nomeEtapa = typeof etapa === "string" ? etapa : etapa.nome;
        const perguntas = typeof etapa === "object" && Array.isArray(etapa.perguntas) ? etapa.perguntas : [];
        if (perguntas.length === 0) {
          return `<li>${idx + 1}. ${escaparHtml(nomeEtapa)}</li>`;
        }
        const itensPergunta = perguntas
          .map((p, pIdx) => {
            const rotulo = p.obrigatoria ? "Obrigatória" : "Optativa";
            const enunciado = (p.enunciado || "").trim() || `Pergunta ${pIdx + 1}`;
            return `<li>${escaparHtml(enunciado)} <em>(${rotulo})</em></li>`;
          })
          .join("");
        return `<li>${idx + 1}. ${escaparHtml(nomeEtapa)}<ul>${itensPergunta}</ul></li>`;
      })
      .join("");

    painelDetalhe.innerHTML = `
      <div class="bt-figma-topo">
        <div class="bt-celula-candidato">
          <span class="bt-avatar-tabela">${escaparHtml(obterIniciais(vaga.titulo))}</span>
          <div>
            <h3 class="bt-figma-nome">${escaparHtml(vaga.titulo)}</h3>
            <p class="bt-figma-cargo-topo">${escaparHtml(vaga.empresa || "Nome da empresa")}</p>
          </div>
        </div>
        <button type="button" id="mvr-fechar-painel" class="bt-btn-fechar-painel" title="Fechar">✕</button>
      </div>

      <div class="bt-figma-chips-linha">
        <span class="bt-figma-chip">📍 ${escaparHtml(vaga.localizacao || "Local")}</span>
        <span class="bt-figma-chip">💼 ${escaparHtml(vaga.contrato || "Contrato")}</span>
        <span class="bt-figma-chip">🏠 ${escaparHtml(vaga.modalidade || "Modalidade")}</span>
        <span class="bt-figma-chip">📁 ${escaparHtml(vaga.area || "Área")}</span>
      </div>

      <div class="bt-detalhe-corpo bt-figma-corpo">
        <div class="bt-figma-bloco">
          <h4>Descrição da vaga</h4>
          <p class="bt-figma-texto">${escaparHtml(vaga.descricao || "Sem descrição informada.")}</p>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-bloco">
          <h4>Principais responsabilidades</h4>
          <ul class="bt-figma-texto">${responsabilidadesHtml}</ul>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-bloco">
          <h4>Requisitos obrigatórios</h4>
          <ul class="bt-figma-texto">${requisitosHtml}</ul>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-bloco">
          <h4>Diferenciais</h4>
          <ul class="bt-figma-texto">${diferenciaisHtml}</ul>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-bloco">
          <h4>Processo seletivo</h4>
          <ol class="bt-figma-texto" style="list-style: none; padding-left: 0;">${etapasHtml}</ol>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-formacao-grid">
          <div class="bt-figma-box-formacao">
            <span class="bt-figma-box-label">ÁREA</span>
            <strong class="bt-figma-box-valor">${escaparHtml(vaga.area || "—")}</strong>
          </div>
          <div class="bt-figma-box-formacao">
            <span class="bt-figma-box-label">CONTRATO</span>
            <strong class="bt-figma-box-valor">${escaparHtml(vaga.contrato || "—")}</strong>
          </div>
          <div class="bt-figma-box-formacao">
            <span class="bt-figma-box-label">MODALIDADE</span>
            <strong class="bt-figma-box-valor">${escaparHtml(vaga.modalidade || "—")}</strong>
          </div>
        </div>
      </div>
    `;

    painelDetalhe.querySelector("#mvr-fechar-painel")?.addEventListener("click", () => {
      vagaSelecionadaId = null;
      colunaTabela.querySelectorAll("tbody tr").forEach(r => r.classList.remove("bt-linha-ativa"));
      renderPainelDetalhe(null);
    });
  }

  function atualizarTela() {
    const filtradas = filtrarVagas();
    const totalItens = filtradas.length;
    const totalPaginas = Math.max(1, Math.ceil(totalItens / itensPorPagina));
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const paginadas = filtradas.slice(inicio, inicio + itensPorPagina);

    if (vagaSelecionadaId !== null && !paginadas.some(v => v.id === vagaSelecionadaId)) {
      vagaSelecionadaId = null;
    }

    const colunas = [
      {
        titulo: "Vaga",
        chave: "titulo",
        ordenavel: true,
        render: (_, item) => {
          const wrap = document.createElement("div");
          wrap.className = "bt-celula-candidato";

          const avatar = document.createElement("span");
          avatar.className = "bt-avatar-tabela";
          avatar.textContent = obterIniciais(item.titulo);

          const info = document.createElement("div");
          info.innerHTML = `
            <strong class="bt-tabela-nome">${escaparHtml(item.titulo)}</strong>
            <span class="bt-tabela-sub">${escaparHtml(item.empresa || "Nome da empresa")}</span>
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
            <span class="bt-tabela-principal">${escaparHtml(item.localizacao || "Local")}</span>
            <span class="bt-tabela-sub">${escaparHtml(item.modalidade || "Modalidade")}</span>
          `;
          return info;
        }
      },
      {
        titulo: "Contrato",
        chave: "contrato",
        ordenavel: true
      },
      {
        titulo: "Status",
        chave: "status",
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
        <select id="mvr-select-por-pagina" class="bt-select-por-pagina">
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
        esquerda: `Mostrando ${inicioTexto} a ${fimTexto} de ${totalItens} vagas`,
        direita: paginacaoHtml
      }
    });

    colunaTabela.querySelectorAll("tbody tr").forEach((tr, idx) => {
      const vaga = paginadas[idx];
      if (!vaga) return;
      if (vaga.id === vagaSelecionadaId) {
        tr.classList.add("bt-linha-ativa");
      }
      tr.style.cursor = "pointer";
      tr.addEventListener("click", (e) => {
        if (e.target.closest('input[type="checkbox"], button')) return;
        vagaSelecionadaId = vaga.id;
        renderPainelDetalhe(vaga);
        colunaTabela.querySelectorAll("tbody tr").forEach(r => r.classList.remove("bt-linha-ativa"));
        tr.classList.add("bt-linha-ativa");
      });
    });

    colunaTabela.querySelector("#mvr-select-por-pagina")?.addEventListener("change", (e) => {
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

    const selecionada = paginadas.find(v => v.id === vagaSelecionadaId) || null;
    renderPainelDetalhe(selecionada);
  }

  const inputBusca = barraFiltros.querySelector("#mvr-busca-inline");
  const selectStatus = barraFiltros.querySelector("#mvr-select-status");
  const selectArea = barraFiltros.querySelector("#mvr-select-area");
  const selectModalidade = barraFiltros.querySelector("#mvr-select-modalidade");

  function aplicarFiltros() {
    filtros.busca = inputBusca.value;
    filtros.status = selectStatus.value;
    filtros.area = selectArea.value;
    filtros.modalidade = selectModalidade.value;
    paginaAtual = 1;
    atualizarTela();
  }

  inputBusca.addEventListener("input", aplicarFiltros);
  selectStatus.addEventListener("change", aplicarFiltros);
  selectArea.addEventListener("change", aplicarFiltros);
  selectModalidade.addEventListener("change", aplicarFiltros);

  barraFiltros.querySelector("#mvr-btn-limpar-inline").addEventListener("click", () => {
    inputBusca.value = "";
    selectStatus.value = "todos";
    selectArea.value = "todas";
    selectModalidade.value = "todas";
    aplicarFiltros();
  });

  atualizarTela();
  return containerPagina;
}