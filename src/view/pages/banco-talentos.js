import { criarSidebar } from "../components/sidebar.js";
import { criarTabela } from "../components/table.js";

const CANDIDATOS_EXEMPLO = [
  {
    id: 1,
    nome: "Ana Clara Silva",
    cargoInteresse: "Analista de Dados",
    subtituloCargo: "Ciência de Dados e Business Intelligence",
    area: "Dados",
    habilidades: ["SQL", "Power BI", "Python", "Excel", "DAX"],
    experiencia: "3 anos",
    nivelExperiencia: "Pleno",
    localizacao: "São Paulo - SP",
    modalidade: "Híbrido",
    disponibilidade: "Disponível",
    formacao: "Superior",
    cursoFormacao: "Análise e Desenvolvimento de Sistemas",
    instituicao: "Universidade de São Paulo",
    email: "ana.clara.s@email.com",
    telefone: "(11) 91234-5678",
    sobre: "Profissional com experiência em análise de dados, criação de dashboards e acompanhamento de indicadores. Possui conhecimentos em Power BI, SQL, Python e Excel.",
    experiencias: [
      { cargo: "Analista de Dados Jr", empresa: "Dados & Co", periodo: "2023 - Atual", resumo: "Construção de painéis em Power BI, consultas SQL e ETL." }
    ],
    curriculoResumo: "Graduação em ADS, atuação em BI comercial e financeiro, ETL e modelagem dimensional.",
    favorito: false
  },
  {
    id: 2,
    nome: "Bruno Almeida",
    cargoInteresse: "Desenvolvedor Full Stack",
    subtituloCargo: "Web / APIs",
    area: "TI",
    habilidades: ["JavaScript", "Node.js", "HTML", "CSS", "TypeScript", "MySQL"],
    experiencia: "4 anos",
    nivelExperiencia: "Pleno",
    localizacao: "Sorocaba - SP",
    modalidade: "Remoto",
    disponibilidade: "Disponível",
    formacao: "Superior",
    cursoFormacao: "Engenharia de Software",
    instituicao: "FACENS",
    email: "bruno.almeida@email.com",
    telefone: "(15) 99876-5432",
    sobre: "Desenvolvedor web com foco em aplicações JavaScript/Node.js, interfaces responsivas e integração com bancos relacionais.",
    experiencias: [
      { cargo: "Desenvolvedor Full Stack", empresa: "Conecta Web", periodo: "2022 - Atual", resumo: "Desenvolvimento de sistemas web e APIs REST." }
    ],
    curriculoResumo: "Experiência com JavaScript, Node.js, Express, HTML, CSS e bancos SQL.",
    favorito: true
  },
  {
    id: 3,
    nome: "Carla Mendes",
    cargoInteresse: "UX/UI Designer",
    subtituloCargo: "Product Design",
    area: "Design",
    habilidades: ["Figma", "UI Design", "Prototipagem", "Design System"],
    experiencia: "5 anos",
    nivelExperiencia: "Sênior",
    localizacao: "Rio de Janeiro - RJ",
    modalidade: "Híbrido",
    disponibilidade: "Disponível",
    formacao: "Superior",
    cursoFormacao: "Design Digital",
    instituicao: "PUC-Rio",
    email: "carla.mendes@email.com",
    telefone: "(21) 98765-4321",
    sobre: "Designer focada em fluxos claros, componentes acessíveis, prototipagem interativa e padronização de interfaces.",
    experiencias: [
      { cargo: "Product Designer", empresa: "Estúdio Criativo", periodo: "2021 - Atual", resumo: "Criação de design systems e jornadas web/mobile." }
    ],
    curriculoResumo: "5 anos criando interfaces web, design systems e testes com usuários.",
    favorito: false
  },
  {
    id: 4,
    nome: "Diego Souza",
    cargoInteresse: "Suporte Técnico",
    subtituloCargo: "Infraestrutura",
    area: "TI",
    habilidades: ["Windows", "Linux", "Redes", "Suporte"],
    experiencia: "3 anos",
    nivelExperiencia: "Pleno",
    localizacao: "Campinas - SP",
    modalidade: "Presencial",
    disponibilidade: "Disponível",
    formacao: "Técnico",
    cursoFormacao: "Técnico em Informática",
    instituicao: "ETEC Campinas",
    email: "diego.souza@email.com",
    telefone: "(19) 97654-3210",
    sobre: "Atendimento a chamados, manutenção de estações, configuração de redes locais e apoio em rotinas de infraestrutura.",
    experiencias: [
      { cargo: "Técnico de Suporte", empresa: "InfraTech", periodo: "2023 - Atual", resumo: "Suporte N1/N2, Windows/Linux e redes." }
    ],
    curriculoResumo: "Formação técnica em Informática com experiência em redes e suporte ao usuário.",
    favorito: false
  },
  {
    id: 5,
    nome: "Fernanda Lima",
    cargoInteresse: "Analista de RH",
    subtituloCargo: "Business Partner",
    area: "Recursos Humanos",
    habilidades: ["Recrutamento", "RH", "Comunicação", "Indicadores"],
    experiencia: "4 anos",
    nivelExperiencia: "Pleno",
    localizacao: "São Paulo - SP",
    modalidade: "Híbrido",
    disponibilidade: "Disponível",
    formacao: "Superior",
    cursoFormacao: "Gestão de Recursos Humanos",
    instituicao: "Mackenzie",
    email: "fernanda.lima@email.com",
    telefone: "(11) 96543-2109",
    sobre: "Atuação em processos seletivos, acompanhamento de indicadores de turnover e suporte a gestores e lideranças.",
    experiencias: [
      { cargo: "Analista de RH", empresa: "Gente & Cultura", periodo: "2022 - Atual", resumo: "Seleção de talentos, onboarding e métricas de RH." }
    ],
    curriculoResumo: "Experiência em recrutamento, seleção e gestão de indicadores de pessoas.",
    favorito: false
  },
  {
    id: 6,
    nome: "Gabriel Rocha",
    cargoInteresse: "Desenvolvedor Front-end",
    subtituloCargo: "Web",
    area: "TI",
    habilidades: ["HTML", "CSS", "JavaScript", "Git"],
    experiencia: "3 anos",
    nivelExperiencia: "Júnior",
    localizacao: "Sorocaba - SP",
    modalidade: "Remoto",
    disponibilidade: "Disponível",
    formacao: "Superior",
    cursoFormacao: "Análise e Desenvolvimento de Sistemas",
    instituicao: "FATEC Sorocaba",
    email: "gabriel.rocha@email.com",
    telefone: "(15) 95432-1098",
    sobre: "Focado em construção de layouts responsivos, componentes reutilizáveis e boas práticas com HTML, CSS e JavaScript.",
    experiencias: [
      { cargo: "Desenvolvedor Front-end Jr", empresa: "Pixel & Código", periodo: "2023 - Atual", resumo: "Implementação de interfaces e integração com APIs." }
    ],
    curriculoResumo: "Graduação em ADS, desenvolvimento front-end e versionamento com Git.",
    favorito: false
  }
];

// Estado em memória compartilhado entre Banco de Talentos e Candidatos Favoritados
export const candidatosEstado = CANDIDATOS_EXEMPLO.map(c => ({ ...c }));

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

export function renderBancoTalentos() {
  const containerPagina = document.createElement("div");
  containerPagina.className = "pagina-layout-dashboard";

  const sidebar = criarSidebar("recrutador", "Thaeny Soares");
  containerPagina.appendChild(sidebar);

  const conteudoPrincipal = document.createElement("main");
  conteudoPrincipal.className = "conteudo-principal";
  containerPagina.appendChild(conteudoPrincipal);

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
    <h1 class="titulo-pagina">Banco de talentos</h1>
    <p class="subtitulo-pagina">Encontre e gerencie candidatos para oportunidades futuras.</p>
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
        id="bt-busca-inline"
        class="bt-input-busca-inline"
        placeholder="Buscar por candidato, cargo, habilidade ou cidade..."
      />
    </div>

    <select id="bt-select-status" class="bt-select-inline" aria-label="Status">
      <option value="todos">Status: Todos</option>
      <option value="Disponível">Status: Disponível</option>
    </select>

    <select id="bt-select-area" class="bt-select-inline" aria-label="Área">
      <option value="todas">Todas</option>
      <option value="Dados">Dados</option>
      <option value="TI">TI</option>
      <option value="Design">Design</option>
      <option value="Recursos Humanos">Recursos Humanos</option>
    </select>

    <select id="bt-select-habilidade" class="bt-select-inline" aria-label="Habilidade">
      <option value="todas">Habilidade: Todas</option>
      <option value="SQL">SQL</option>
      <option value="Power BI">Power BI</option>
      <option value="Python">Python</option>
      <option value="JavaScript">JavaScript</option>
      <option value="Node.js">Node.js</option>
      <option value="Figma">Figma</option>
    </select>

    <select id="bt-select-local" class="bt-select-inline" aria-label="Local">
      <option value="todos">Local: Todos</option>
      <option value="São Paulo - SP">São Paulo - SP</option>
      <option value="Sorocaba - SP">Sorocaba - SP</option>
      <option value="Rio de Janeiro - RJ">Rio de Janeiro - RJ</option>
      <option value="Campinas - SP">Campinas - SP</option>
    </select>

    <button type="button" id="bt-btn-limpar-inline" class="bt-btn-limpar-inline">
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

    return candidatosEstado.filter(c => {
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
                <div class="bt-figma-box-formacao" style="margin-bottom: 10px;">
                  <span class="bt-figma-box-label">${escaparHtml(exp.periodo)} · ${escaparHtml(exp.empresa)}</span>
                  <strong class="bt-figma-box-valor">${escaparHtml(exp.cargo)}</strong>
                  <p class="bt-figma-texto" style="margin-top: 6px;">${escaparHtml(exp.resumo)}</p>
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
        <button type="button" id="bt-fechar-painel" class="bt-btn-fechar-painel" title="Fechar">✕</button>
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
        <button type="button" id="bt-btn-favoritar" class="bt-btn-favoritar ${candidato.favorito ? "ativo" : ""}">
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

    painelDetalhe.querySelector("#bt-fechar-painel")?.addEventListener("click", () => {
      candidatoSelecionadoId = null;
      colunaTabela.querySelectorAll("tbody tr").forEach(r => r.classList.remove("bt-linha-ativa"));
      renderPainelDetalhe(null);
    });

    painelDetalhe.querySelector("#bt-btn-favoritar")?.addEventListener("click", () => {
      candidato.favorito = true;
      window.location.hash = "#candidatos-favoritos";
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
        <select id="bt-select-por-pagina" class="bt-select-por-pagina">
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
        esquerda: `Mostrando ${inicioTexto} a ${fimTexto} de ${totalItens} candidatos`,
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

    colunaTabela.querySelector("#bt-select-por-pagina")?.addEventListener("change", (e) => {
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

  const inputBusca = barraFiltros.querySelector("#bt-busca-inline");
  const selectStatus = barraFiltros.querySelector("#bt-select-status");
  const selectArea = barraFiltros.querySelector("#bt-select-area");
  const selectHabilidade = barraFiltros.querySelector("#bt-select-habilidade");
  const selectLocal = barraFiltros.querySelector("#bt-select-local");

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

  barraFiltros.querySelector("#bt-btn-limpar-inline").addEventListener("click", () => {
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