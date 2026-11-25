import { criarSidebar } from "../components/sidebar.js";

const PLANOS_EMPRESA = [
  {
    id: "gratuito",
    nome: "Gratuito",
    preco: "R$ 0,00",
    periodo: "/mês",
    descricao: "Ideal para conhecer a plataforma.",
    destaque: null,
    recursos: [
      "Até 1 recrutador",
      "Até 3 vagas ativas",
      "Banco de talentos com até 100 candidatos",
      "Suporte via e-mail"
    ],
    comparativo: {
      recrutadores: "1",
      vagas: "3",
      bancoTalentos: "100",
      relatorios: "—",
      suportePrioritario: "—",
      integracoes: "—"
    }
  },
  {
    id: "profissional",
    nome: "Profissional",
    preco: "R$ 145,00",
    periodo: "/mês",
    descricao: "Para empresas em crescimento.",
    destaque: "Mais escolhido",
    recursos: [
      "Até 5 recrutadores",
      "Até 15 vagas ativas",
      "Banco de talentos com até 500 candidatos",
      "Relatórios avançados",
      "Suporte prioritário"
    ],
    comparativo: {
      recrutadores: "5",
      vagas: "15",
      bancoTalentos: "500",
      relatorios: "✓",
      suportePrioritario: "✓",
      integracoes: "—"
    }
  },
  {
    id: "empresarial",
    nome: "Empresarial/Educacional",
    preco: "R$ 349,00",
    periodo: "/mês",
    descricao: "Para empresas com maior volume de contratações.",
    destaque: null,
    recursos: [
      "Recrutadores ilimitados",
      "Vagas ilimitadas",
      "Banco de talentos ilimitado",
      "Relatórios avançados",
      "Suporte dedicado",
      "Integrações e personalizações"
    ],
    comparativo: {
      recrutadores: "Ilimitados",
      vagas: "Ilimitadas",
      bancoTalentos: "Ilimitado",
      relatorios: "✓",
      suportePrioritario: "✓",
      integracoes: "✓"
    }
  }
];

function escaparHtml(texto = "") {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderMeusPlanosEmpresa(usuarioLogado = "Empresa") {
  const container = document.createElement("div");
  container.className = "pagina-layout-dashboard mp-layout";

  const sidebar = criarSidebar("empresa", usuarioLogado);
  container.appendChild(sidebar);

  const main = document.createElement("main");
  main.className = "conteudo-principal mp-main";
  container.appendChild(main);

  let planoAtualId = "gratuito";
  let planoSelecionadoId = "empresarial";
  let feedbackTexto = "";

  function renderizarConteudo() {
    const planoAtual = PLANOS_EMPRESA.find(p => p.id === planoAtualId) || PLANOS_EMPRESA[0];
    const planoSelecionado = PLANOS_EMPRESA.find(p => p.id === planoSelecionadoId) || PLANOS_EMPRESA[1];

    main.innerHTML = `
      <header class="mp-header">
        <h1 class="mp-title">Alterar planos</h1>
        <p class="mp-subtitle">Escolha o plano ideal. Você pode alterar sua assinatura a qualquer momento.</p>
      </header>

      <div class="mp-banner-atual" role="status">
        <span class="mp-banner-icon" aria-hidden="true">i</span>
        <div class="mp-banner-text">
          <strong>Seu plano atual é ${escaparHtml(planoAtual.nome)}</strong>
          <p>Faça um upgrade para acessar mais recursos, aumentar os limites da sua empresa e potencializar seu processo de recrutamento.</p>
        </div>
      </div>

      ${
        feedbackTexto
          ? `<div class="mp-feedback-ok" role="status">${escaparHtml(feedbackTexto)}</div>`
          : ""
      }

      <div class="mp-grid">
        <div class="mp-left-col">
          <section class="mp-cards-grid" aria-label="Planos disponíveis">
            ${PLANOS_EMPRESA.map(plano => {
              const ehAtual = plano.id === planoAtualId;
              const ehSelecionado = plano.id === planoSelecionadoId;

              return `
                <article class="mp-card ${ehSelecionado ? "is-selected" : ""} ${ehAtual ? "is-current" : ""}" data-plano-id="${plano.id}">
                  ${plano.destaque ? `<span class="mp-badge">${escaparHtml(plano.destaque)}</span>` : ""}
                  <h3 class="mp-card-title">${escaparHtml(plano.nome)}</h3>
                  <p class="mp-card-desc">${escaparHtml(plano.descricao)}</p>

                  <div class="mp-price-row">
                    <span class="mp-price">${escaparHtml(plano.preco)}</span>
                    <span class="mp-period">${escaparHtml(plano.periodo)}</span>
                  </div>

                  <ul class="mp-features">
                    ${plano.recursos
                      .map(recurso => `<li class="mp-feature-item">${escaparHtml(recurso)}</li>`)
                      .join("")}
                  </ul>

                  <button
                    type="button"
                    class="mp-card-btn ${ehAtual ? "is-current-btn" : ehSelecionado ? "is-selected-btn" : ""}"
                    data-acao-plano="${plano.id}"
                    ${ehAtual ? "disabled" : ""}
                  >
                    ${ehAtual ? "Plano atual" : "Selecionar plano"}
                  </button>
                </article>
              `;
            }).join("")}
          </section>

          <section class="mp-compare-card" aria-label="Compare os planos">
            <h2 class="mp-compare-title">Compare os planos</h2>
            <p class="mp-compare-subtitle">Veja em detalhes o que cada plano oferece.</p>

            <div class="mp-table-wrap">
              <table class="mp-table">
                <thead>
                  <tr>
                    <th>Recurso</th>
                    <th>Gratuito</th>
                    <th>Profissional</th>
                    <th>Empresarial/Educacional</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Recrutadores</td>
                    <td>${PLANOS_EMPRESA[0].comparativo.recrutadores}</td>
                    <td>${PLANOS_EMPRESA[1].comparativo.recrutadores}</td>
                    <td>${PLANOS_EMPRESA[2].comparativo.recrutadores}</td>
                  </tr>
                  <tr>
                    <td>Vagas ativas</td>
                    <td>${PLANOS_EMPRESA[0].comparativo.vagas}</td>
                    <td>${PLANOS_EMPRESA[1].comparativo.vagas}</td>
                    <td>${PLANOS_EMPRESA[2].comparativo.vagas}</td>
                  </tr>
                  <tr>
                    <td>Banco de talentos</td>
                    <td>${PLANOS_EMPRESA[0].comparativo.bancoTalentos}</td>
                    <td>${PLANOS_EMPRESA[1].comparativo.bancoTalentos}</td>
                    <td>${PLANOS_EMPRESA[2].comparativo.bancoTalentos}</td>
                  </tr>
                  <tr>
                    <td>Relatórios avançados</td>
                    <td>${PLANOS_EMPRESA[0].comparativo.relatorios}</td>
                    <td>${PLANOS_EMPRESA[1].comparativo.relatorios}</td>
                    <td>${PLANOS_EMPRESA[2].comparativo.relatorios}</td>
                  </tr>
                  <tr>
                    <td>Suporte prioritário</td>
                    <td>${PLANOS_EMPRESA[0].comparativo.suportePrioritario}</td>
                    <td>${PLANOS_EMPRESA[1].comparativo.suportePrioritario}</td>
                    <td>${PLANOS_EMPRESA[2].comparativo.suportePrioritario}</td>
                  </tr>
                  <tr>
                    <td>Integrações e personalizações</td>
                    <td>${PLANOS_EMPRESA[0].comparativo.integracoes}</td>
                    <td>${PLANOS_EMPRESA[1].comparativo.integracoes}</td>
                    <td>${PLANOS_EMPRESA[2].comparativo.integracoes}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <aside class="mp-right-col" aria-label="Resumo da mudança">
          <div class="mp-summary-card">
            <h2 class="mp-summary-title">Resumo da mudança</h2>

            <div class="mp-summary-box">
              <span class="mp-summary-label">Plano atual</span>
              <strong class="mp-summary-plan-name">${escaparHtml(planoAtual.nome)}</strong>
              <span class="mp-summary-plan-price">${escaparHtml(planoAtual.preco)} ${escaparHtml(planoAtual.periodo)}</span>
            </div>

            <div class="mp-summary-box is-new">
              <span class="mp-summary-label">Novo plano</span>
              <strong class="mp-summary-plan-name">${escaparHtml(planoSelecionado.nome)}</strong>
              <span class="mp-summary-plan-price">${escaparHtml(planoSelecionado.preco)} ${escaparHtml(planoSelecionado.periodo)}</span>
            </div>

            <div class="mp-billing-info">
              <div class="mp-billing-item">
                <span>Próxima cobrança</span>
                <strong>05 de outubro de 2026</strong>
              </div>
              <div class="mp-billing-item">
                <span>Valor da próxima cobrança</span>
                <strong>${escaparHtml(planoSelecionado.preco)}/mês</strong>
              </div>
            </div>

            <button type="button" id="btn-confirmar-alteracoes-plano" class="mp-confirm-btn">
              Confirmar alterações
            </button>
          </div>

          <div class="mp-help-card">
            <h3>Precisa de ajuda?</h3>
            <p>Nossa equipe está pronta para ajudar você a escolher o melhor plano para sua empresa.</p>
            <button type="button" id="btn-falar-suporte-plano" class="mp-help-btn">
              💬 Falar com suporte
            </button>
          </div>
        </aside>
      </div>
    `;

    main.querySelectorAll("[data-acao-plano]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-acao-plano");
        if (id && id !== planoAtualId) {
          planoSelecionadoId = id;
          feedbackTexto = "";
          renderizarConteudo();
        }
      });
    });

    main.querySelector("#btn-confirmar-alteracoes-plano")?.addEventListener("click", () => {
      planoAtualId = planoSelecionadoId;
      feedbackTexto = `Plano atualizado para ${planoSelecionado.nome} (${planoSelecionado.preco}${planoSelecionado.periodo}).`;
      renderizarConteudo();
    });

    main.querySelector("#btn-falar-suporte-plano")?.addEventListener("click", () => {
      window.location.hash = "#suporte";
    });
  }

  renderizarConteudo();
  return container;
}