import { criarSidebar } from "../components/sidebar.js";
import { criarTabela } from "../components/table.js";
import { candidatosEstado } from "./banco-talentos.js";

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
      .join("") || "BT"
  );
}

export function renderCandidatosFavoritados(listaInicial = candidatosEstado) {
  const containerPagina = document.createElement("div");
  containerPagina.className = "pagina-layout-dashboard";

  const sidebar = criarSidebar("recrutador", "Thaeny Soares");
  containerPagina.appendChild(sidebar);

  const conteudoPrincipal = document.createElement("main");
  conteudoPrincipal.className = "conteudo-principal";
  containerPagina.appendChild(conteudoPrincipal);

  let candidatos = listaInicial;
  let candidatoSelecionadoId = null;
  let abaAtiva = "resumo";
  let paginaAtual = 1;
  let itensPorPagina = 6;

  const filtros = {
    busca: "",
    status: "todos",
    area: "todas",
    habilidade: "todas",
    local: "todos"
  };

  const cabecalho = document.createElement("div");
  cabecalho.className = "cabecalho-secao-acao";
  cabecalho.innerHTML = `
    <h1 class="titulo-pagina">Candidatos favoritados</h1>
    <p class="subtitulo-pagina">Acompanhe os candidatos salvos para processos e futuras oportunidades.</p>
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
        id="fav-busca-inline"
        class="bt-input-busca-inline"
        placeholder="Buscar por candidato, cargo, habilidade ou cidade..."
      />
    </div>

    <select id="fav-select-status" class="bt-select-inline" aria-label="Status">
      <option value="todos">Status: Todos</option>
      <option value="Disponível">Status: Disponível</option>
    </select>

    <select id="fav-select-area" class="bt-select-inline" aria-label="Área">
      <option value="todas">Todas</option>
      <option value="Dados">Dados</option>
      <option value="TI">TI</option>
      <option value="Design">Design</option>
      <option value="Recursos Humanos">Recursos Humanos</option>
    </select>

    <select id="fav-select-habilidade" class="bt-select-inline" aria-label="Habilidade">
      <option value="todas">Habilidade: Todas</option>
      <option value="SQL">SQL</option>
      <option value="Power BI">Power BI</option>
      <option value="Python">Python</option>
      <option value="JavaScript">JavaScript</option>
      <option value="Node.js">Node.js</option>
      <option value="Figma">Figma</option>
    </select>

    <select id="fav-select-local" class="bt-select-inline" aria-label="Local">
      <option value="todos">Local: Todos</option>
      <option value="São Paulo - SP">São Paulo - SP</option>
      <option value="Sorocaba - SP">Sorocaba - SP</option>
      <option value="Rio de Janeiro - RJ">Rio de Janeiro - RJ</option>
      <option value="Campinas - SP">Campinas - SP</option>
    </select>

    <button type="button" id="fav-btn-limpar-inline" class="bt-btn-limpar-inline">
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

  function sincronizarVisibilidadePainel(candidato) {
    if (!candidato) {
      painelDetalhe.style.display = "none";
      gradePrincipal.classList.remove("bt-painel-aberto");
      painelDetalhe.innerHTML = "";
      return true;
    }

    painelDetalhe.style.display = "";
    gradePrincipal.classList.add("bt-painel-aberto");
    return false;
  }

  function filtrarCandidatos() {
    const termo = filtros.busca.trim().toLowerCase();

    return candidatos
      .filter(c => Boolean(c.favorito))
      .filter(c => {
        if (filtros.status !== "todos" && c.disponibilidade !== filtros.status) return false;
        if (filtros.area !== "todas" && c.area !== filtros.area) return false;
        if (filtros.habilidade !== "todas" && !c.habilidades.includes(filtros.habilidade)) return false;
        if (filtros.local !== "todos" && c.localizacao !== filtros.local) return false;

        if (termo) {
          const emNome = c.nome.toLowerCase().includes(termo);
          const emCargo = c.cargoInteresse.toLowerCase().includes(termo);
          const emLocal = c.localizacao.toLowerCase().includes(termo);
          const emArea = c.area.toLowerCase().includes(termo);
          const emHab = c.habilidades.some(h => h.toLowerCase().includes(termo));
          if (!emNome && !emCargo && !emLocal && !emArea && !emHab) return false;
        }

        return true;
      });
  }

  function renderPainelDetalhe(candidato) {
    if (sincronizarVisibilidadePainel(candidato)) {
      return;
    }

    let corpoAbaHtml = "";

    if (abaAtiva === "resumo") {
      corpoAbaHtml = `
        <div class="bt-figma-bloco">
          <div class="bt-figma-bloco-titulo">
            <span class="bt-figma-icone-secao">👤</span>
            <h4>Sobre mim</h4>
          </div>
          <p class="bt-figma-texto">${escaparHtml(candidato.sobre)}</p>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-bloco">
          <div class="bt-figma-bloco-titulo">
            <span class="bt-figma-icone-secao">💼</span>
            <h4>Cargo de interesse</h4>
          </div>
          <p class="bt-figma-destaque-titulo">${escaparHtml(candidato.cargoInteresse)}</p>
          <p class="bt-figma-subtexto">${escaparHtml(candidato.subtituloCargo)}</p>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-bloco">
          <div class="bt-figma-bloco-titulo">
            <span class="bt-figma-icone-secao">💡</span>
            <h4>Habilidades principais</h4>
          </div>
          <div class="bt-figma-chips-linha">
            ${candidato.habilidades.map(h => `<span class="bt-figma-chip">${escaparHtml(h)}</span>`).join("")}
          </div>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-duas-colunas">
          <div>
            <div class="bt-figma-bloco-titulo">
              <span class="bt-figma-icone-secao">🗓️</span>
              <h4>Experiência</h4>
            </div>
            <p class="bt-figma-destaque-titulo">${escaparHtml(candidato.experiencia)}</p>
            <p class="bt-figma-subtexto">${escaparHtml(candidato.nivelExperiencia)}</p>
          </div>

          <div>
            <div class="bt-figma-bloco-titulo">
              <span class="bt-figma-icone-secao">📍</span>
              <h4>Localização</h4>
            </div>
            <p class="bt-figma-destaque-titulo">${escaparHtml(candidato.localizacao)}</p>
            <p class="bt-figma-subtexto">${escaparHtml(candidato.modalidade)}</p>
          </div>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-bloco">
          <div class="bt-figma-bloco-titulo">
            <span class="bt-figma-icone-secao">🎓</span>
            <h4>Formação</h4>
          </div>
          <div class="bt-figma-formacao-grid">
            <div class="bt-figma-box-formacao">
              <span class="bt-figma-box-label">Curso</span>
              <strong class="bt-figma-box-valor">${escaparHtml(candidato.cursoFormacao)}</strong>
            </div>
            <div class="bt-figma-box-formacao">
              <span class="bt-figma-box-label">Instituição</span>
              <strong class="bt-figma-box-valor">${escaparHtml(candidato.instituicao)}</strong>
            </div>
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
          <p class="bt-figma-texto">${escaparHtml(candidato.curriculoResumo)}</p>
        </div>

        <hr class="bt-figma-divisor" />

        <div class="bt-figma-formacao-grid">
          <div class="bt-figma-box-formacao">
            <span class="bt-figma-box-label">E-mail</span>
            <strong class="bt-figma-box-valor">${escaparHtml(candidato.email)}</strong>
          </div>
          <div class="bt-figma-box-formacao">
            <span class="bt-figma-box-label">Telefone</span>
            <strong class="bt-figma-box-valor">${escaparHtml(candidato.telefone)}</strong>
          </div>
        </div>
      `;
    } else if (abaAtiva === "habilidades") {
      corpoAbaHtml = `
        <div class="bt-figma-bloco">
          <div class="bt-figma-bloco-titulo">
            <span class="bt-figma-icone-secao">💡</span>
            <h4>Habilidades principais</h4>
          </div>
          <div class="bt-figma-chips-linha">
            ${candidato.habilidades.map(h => `<span class="bt-figma-chip">${escaparHtml(h)}</span>`).join("")}
          </div>
        </div>
      `;
    } else if (abaAtiva === "experiencia") {
      corpoAbaHtml = `
        <div class="bt-figma-bloco">
          <div class="bt-figma-bloco-titulo">
            <span class="bt-figma-icone-secao">🗓️</span>
            <h4>Histórico profissional</h4>
          </div>
          ${candidato.experiencias
            .map(
              exp => `
                <div class="bt-figma-box-formacao">
                  <span class="bt-figma-box-label">${escaparHtml(exp.periodo)} · ${escaparHtml(exp.empresa)}</span>
                  <strong class="bt-figma-box-valor">${escaparHtml(exp.cargo)}</strong>
                  <p class="bt-figma-texto">${escaparHtml(exp.resumo)}</p>
                </div>
              `
            )
            .join("")}
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
              <strong class="bt-figma-box-valor">${escaparHtml(candidato.cursoFormacao)}</strong>
            </div>
            <div class="bt-figma-box-formacao">
              <span class="bt-figma-box-label">Instituição</span>
              <strong class="bt-figma-box-valor">${escaparHtml(candidato.instituicao)}</strong>
            </div>
          </div>
        </div>
      `;
    }

    painelDetalhe.innerHTML = `
      <div class="bt-figma-topo">
        <div>
          <h3 class="bt-figma-nome">${escaparHtml(candidato.nome)}</h3>
          <p class="bt-figma-cargo-topo">${escaparHtml(candidato.cargoInteresse)}</p>
          <p class="bt-figma-contato-linha">
            ${escaparHtml(candidato.localizacao)} &nbsp;|&nbsp; ${escaparHtml(candidato.modalidade)} &nbsp; ${escaparHtml(candidato.email)} &nbsp; ${escaparHtml(candidato.telefone)}
          </p>
        </div>
        <button type="button" id="fav-fechar-painel" class="bt-btn-fechar-painel" title="Fechar">✕</button>
      </div>

      <div class="bt-detalhe-abas bt-figma-abas">
        <button type="button" class="bt-aba-item ${abaAtiva === "resumo" ? "ativa" : ""}" data-aba="resumo">Resumo</button>
        <button type="button" class="bt-aba-item ${abaAtiva === "curriculo" ? "ativa" : ""}" data-aba="curriculo">Currículo</button>
        <button type="button" class="bt-aba-item ${abaAtiva === "habilidades" ? "ativa" : ""}" data-aba="habilidades">Habilidades</button>
        <button type="button" class="bt-aba-item ${abaAtiva === "experiencia" ? "ativa" : ""}" data-aba="experiencia">Experiência</button>
        <button type="button" class="bt-aba-item ${abaAtiva === "formacao" ? "ativa" : ""}" data-aba="formacao">Formação</button>
      </div>

      <div class="bt-detalhe-corpo bt-figma-corpo">
        ${corpoAbaHtml}
      </div>

      <div class="bt-detalhe-rodape">
        <button type="button" id="fav-btn-favoritar" class="bt-btn-favoritar ${candidato.favorito ? "ativo" : ""}">
          ${candidato.favorito ? "★ Salvo nos favoritos" : "☆ Salvar nos favoritos"}
        </button>
      </div>
    `;

    painelDetalhe.querySelectorAll(".bt-aba-item").forEach(btn => {
      btn.addEventListener("click", () => {
        abaAtiva = btn.getAttribute("data-aba");
        renderPainelDetalhe(candidato);
      });
    });

    painelDetalhe.querySelector("#fav-fechar-painel")?.addEventListener("click", () => {
      candidatoSelecionadoId = null;
      colunaTabela.querySelectorAll("tbody tr").forEach(r => r.classList.remove("bt-linha-ativa"));
      renderPainelDetalhe(null);
    });

    painelDetalhe.querySelector("#fav-btn-favoritar")?.addEventListener("click", () => {
      candidato.favorito = !candidato.favorito;
      if (!candidato.favorito && candidatoSelecionadoId === candidato.id) {
        candidatoSelecionadoId = null;
      }
      atualizarTela();
    });
  }

  function atualizarTela() {
    const filtrados = filtrarCandidatos();
    const totalItens = filtrados.length;
    const totalPaginas = Math.max(1, Math.ceil(totalItens / itensPorPagina));
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const paginados = filtrados.slice(inicio, inicio + itensPorPagina);

    if (candidatoSelecionadoId !== null && !paginados.some(c => c.id === candidatoSelecionadoId)) {
      candidatoSelecionadoId = null;
    }

    const colunas = [
      {
        titulo: "Candidato",
        chave: "nome",
        ordenavel: true,
        render: (_, item) => {
          const wrap = document.createElement("div");
          wrap.className = "bt-celula-candidato";

          const avatar = document.createElement("span");
          avatar.className = "bt-avatar-tabela";
          avatar.textContent = obterIniciais(item.nome);

          const info = document.createElement("div");
          info.innerHTML = `
            <strong class="bt-tabela-nome">${escaparHtml(item.nome)}</strong>
            <span class="bt-tabela-sub">${escaparHtml(item.cargoInteresse)}</span>
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
            <span class="bt-tabela-principal">${escaparHtml(item.localizacao)}</span>
            <span class="bt-tabela-sub">${escaparHtml(item.modalidade)}</span>
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
        chave: "disponibilidade",
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
        <select id="fav-select-por-pagina" class="bt-select-por-pagina">
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
    criarTabela(colunas, paginados, {
      container: colunaTabela,
      acoes: false,
      selecionavel: true,
      rodape: {
        esquerda: `Mostrando ${inicioTexto} a ${fimTexto} de ${totalItens} favoritos`,
        direita: paginacaoHtml
      }
    });

    colunaTabela.querySelectorAll("tbody tr").forEach((tr, idx) => {
      const cand = paginados[idx];
      if (!cand) return;
      if (cand.id === candidatoSelecionadoId) {
        tr.classList.add("bt-linha-ativa");
      }
      tr.style.cursor = "pointer";
      tr.addEventListener("click", (e) => {
        if (e.target.closest('input[type="checkbox"], button')) return;
        candidatoSelecionadoId = cand.id;
        renderPainelDetalhe(cand);
        colunaTabela.querySelectorAll("tbody tr").forEach(r => r.classList.remove("bt-linha-ativa"));
        tr.classList.add("bt-linha-ativa");
      });
    });

    colunaTabela.querySelector("#fav-select-por-pagina")?.addEventListener("change", (e) => {
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

    const selecionado = paginados.find(c => c.id === candidatoSelecionadoId) || null;
    renderPainelDetalhe(selecionado);
  }

  const inputBusca = barraFiltros.querySelector("#fav-busca-inline");
  const selectStatus = barraFiltros.querySelector("#fav-select-status");
  const selectArea = barraFiltros.querySelector("#fav-select-area");
  const selectHabilidade = barraFiltros.querySelector("#fav-select-habilidade");
  const selectLocal = barraFiltros.querySelector("#fav-select-local");

  function aplicarFiltros() {
    filtros.busca = inputBusca.value;
    filtros.status = selectStatus.value;
    filtros.area = selectArea.value;
    filtros.habilidade = selectHabilidade.value;
    filtros.local = selectLocal.value;
    paginaAtual = 1;
    atualizarTela();
  }

  inputBusca.addEventListener("input", aplicarFiltros);
  selectStatus.addEventListener("change", aplicarFiltros);
  selectArea.addEventListener("change", aplicarFiltros);
  selectHabilidade.addEventListener("change", aplicarFiltros);
  selectLocal.addEventListener("change", aplicarFiltros);

  barraFiltros.querySelector("#fav-btn-limpar-inline").addEventListener("click", () => {
    inputBusca.value = "";
    selectStatus.value = "todos";
    selectArea.value = "todas";
    selectHabilidade.value = "todas";
    selectLocal.value = "todos";
    aplicarFiltros();
  });

  atualizarTela();
  return containerPagina;
}