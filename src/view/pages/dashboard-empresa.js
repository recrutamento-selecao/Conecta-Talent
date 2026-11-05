import { criarSidebar } from '../components/sidebar.js';

const DADOS_EMPRESA = {
    usuario: { nome: "Twelse LTDA", perfil: "empresa" },
    kpis: [
        { titulo: "Vagas Abertas", valor: "12", destaque: "↑ 2 novas", subtexto: "este mês", tipo: "positivo" },
        { titulo: "Total Candidatos", valor: "128", destaque: "↑ 18%", subtexto: "vs. mês anterior", tipo: "positivo" },
        { titulo: "Entrevistas Agendadas", valor: "14", destaque: "Para esta semana", subtexto: "", tipo: "neutro" },
        { titulo: "Taxa de Preenchimento", valor: "84%", destaque: "↑ 5%", subtexto: "meta mantida", tipo: "positivo" }
    ],
    vagas: [
        { cargo: "Analista de Marketing", area: "Marketing", status: "Ativa", classeStatus: "ativa", candidatos: 48, etapa: "Triagem", corEtapa: "azul" },
        { cargo: "Desenvolvedor Front-end", area: "Tecnologia", status: "Ativa", classeStatus: "ativa", candidatos: 36, etapa: "Entrevista", corEtapa: "roxo" },
        { cargo: "Analista de RH", area: "Recursos Humanos", status: "Pausada", classeStatus: "pausada", candidatos: 15, etapa: "Avaliação", corEtapa: "laranja" },
        { cargo: "Designer UI/UX", area: "Design", status: "Rascunho", classeStatus: "rascunho", candidatos: 0, etapa: "—", corEtapa: "cinza" }
    ],
    recrutadores: [
        { nome: "Rafael Costa", empresa: "Twelse LTDA", email: "rafael@email.com", status: "Ativo" },
        { nome: "Beatriz Silva", empresa: "Twelse LTDA", email: "beatriz@email.com", status: "Ativo" },
        { nome: "Lucas Mendes", empresa: "Twelse LTDA", email: "lucas@email.com", status: "Ativo" }
    ],
    desempenho: [
        { area: "Marketing", inscritos: 48, pct: "90%" },
        { area: "Dev Front", inscritos: 36, pct: "72%" },
        { area: "Analista RH", inscritos: 29, pct: "58%" },
        { area: "Design", inscritos: 15, pct: "30%" },
        { area: "Estágio", inscritos: 8, pct: "16%" }
    ],
    contratacoesMes: [
        { mes: "Mai", qtd: 3, pct: "40%" },
        { mes: "Jun", qtd: 5, pct: "66%" },
        { mes: "Jul", qtd: 4, pct: "53%" },
        { mes: "Ago", qtd: 7, pct: "93%" },
        { mes: "Set", qtd: 6, pct: "80%" }
    ]
};

function criarHeaderSaudacao(nome) {
    const header = document.createElement("header");
    header.classList.add("header-saudacao");
    header.innerHTML = `
        <h1>Olá, ${nome}!</h1>
        <p>Bem-vindo ao painel de empresa do Conecta Talent</p>
    `;
    return header;
}

function criarGridKPIs(kpis) {
    const section = document.createElement("section");
    section.classList.add("kpi-grid");
    kpis.forEach(kpi => {
        const card = document.createElement("div");
        card.classList.add("kpi-card");
        card.innerHTML = `
            <span class="kpi-titulo">${kpi.titulo}</span>
            <div class="kpi-valor">${kpi.valor}</div>
            <div class="kpi-status ${kpi.tipo}">
                <span>${kpi.destaque}</span>
                <small>${kpi.subtexto}</small>
            </div>
        `;
        section.appendChild(card);
    });
    return section;
}

function criarTabelaVagas(vagas) {
    const card = document.createElement("div");
    card.classList.add("tabela-card", "card-vagas");
    
    card.innerHTML = `
        <div class="card-painel-header">
            <div>
                <h3>Vagas Cadastradas</h3>
                <small>Gerenciamento dos processos seletivos abertos</small>
            </div>
            <a href="#gerenciar-vagas" class="link-acao">Ver todas as vagas →</a>
        </div>
        <div class="tabela-responsive">
            <table class="tabela-empresas">
                <thead>
                    <tr>
                        <th>CARGO</th>
                        <th>ÁREA</th>
                        <th>STATUS</th>
                        <th>CANDIDATOS</th>
                        <th>ETAPA ATUAL</th>
                        <th class="text-right">AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    ${vagas.map(v => `
                        <tr>
                            <td><strong>${v.cargo}</strong></td>
                            <td>${v.area}</td>
                            <td><span class="badge status-${v.classeStatus}">${v.status}</span></td>
                            <td><strong>${v.candidatos}</strong></td>
                            <td><span class="ponto-etapa ${v.corEtapa}">●</span> ${v.etapa}</td>
                            <td class="text-right">
                                <button class="btn-icone" title="Opções">⋮</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <div class="card-painel-footer">
            <span>Exibindo 4 de 12 vagas cadastradas</span>
            <span class="badge-subtil verde">● 2 Vagas ativas no momento</span>
        </div>
    `;
    return card;
}

function criarCardRecrutadores(recrutadores) {
    const card = document.createElement("div");
    card.classList.add("tabela-card", "card-recrutadores");

    card.innerHTML = `
        <div class="card-painel-header">
            <div>
                <h3>Recrutadores</h3>
                <small>Equipe responsável pelas seleções</small>
            </div>
            <button class="btn-adicionar">+ Adicionar</button>
        </div>
        <div class="lista-recrutadores">
            ${recrutadores.map(r => `
                <div class="item-recrutador">
                    <div class="recrutador-info">
                        <div class="recrutador-avatar">${r.nome.charAt(0)}</div>
                        <div>
                            <strong>${r.nome}</strong> <small class="tag-empresa">${r.empresa}</small>
                            <p class="email-recrutador">${r.email}</p>
                        </div>
                    </div>
                    <div class="recrutador-acoes">
                        <span class="badge status-ativa">${r.status}</span>
                        <button class="btn-acao-sm" title="Editar">✏️</button>
                        <button class="btn-acao-sm apagar" title="Remover">🗑️</button>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="card-painel-footer">
            <span>Total de recrutadores: <strong>${recrutadores.length} ativos</strong></span>
        </div>
    `;
    return card;
}

function criarGraficoDesempenho(dados) {
    const card = document.createElement("div");
    card.classList.add("tabela-card", "card-grafico");

    card.innerHTML = `
        <div class="card-painel-header">
            <div>
                <h3>Desempenho Geral</h3>
                <small>Volume de inscritos por vaga aberta</small>
            </div>
            <span class="legenda-grafico"><span class="quadrado-cor azul"></span> Candidatos Registrados</span>
        </div>
        <div class="grafico-barras-container">
            ${dados.map(d => `
                <div class="coluna-grafico">
                    <span class="valor-coluna">${d.inscritos}</span>
                    <div class="barra-fundo-vert">
                        <div class="barra-preenchida-vert azul" style="height: ${d.pct};"></div>
                    </div>
                    <span class="label-coluna">${d.area}</span>
                </div>
            `).join('')}
        </div>
        <div class="card-painel-footer">
            <span>Média de 27.2 inscritos por vaga divulgada</span>
            <span class="texto-positivo">+14% vs. mês anterior</span>
        </div>
    `;
    return card;
}

function criarGraficoContratacoes(dados) {
    const card = document.createElement("div");
    card.classList.add("tabela-card", "card-grafico");

    card.innerHTML = `
        <div class="card-painel-header">
            <div>
                <h3>Contratações por Mês</h3>
                <small>Evolução de novos talentos integrados</small>
            </div>
            <span class="legenda-grafico"><span class="quadrado-cor verde"></span> Finalizadas</span>
        </div>
        <div class="grafico-barras-container">
            ${dados.map(d => `
                <div class="coluna-grafico">
                    <span class="valor-coluna">${d.qtd}</span>
                    <div class="barra-fundo-vert">
                        <div class="barra-preenchida-vert verde" style="height: ${d.pct};"></div>
                    </div>
                    <span class="label-coluna">${d.mes}</span>
                </div>
            `).join('')}
        </div>
        <div class="card-painel-footer">
            <span>Total no semestre: <strong>25 contratações</strong></span>
            <span class="texto-positivo">↑ Meta atingida</span>
        </div>
    `;
    return card;
}

export function renderDashboardEmpresa() {
    const container = document.createElement('div');
    container.classList.add('page-dashboard-empresa');

    const sidebar = criarSidebar(DADOS_EMPRESA.usuario.perfil, DADOS_EMPRESA.usuario.nome);
    container.appendChild(sidebar);

    const main = document.createElement("main");
    main.classList.add("conteudo-principal");

    main.appendChild(criarHeaderSaudacao(DADOS_EMPRESA.usuario.nome));
    main.appendChild(criarGridKPIs(DADOS_EMPRESA.kpis));

    const gridGeral = document.createElement("div");
    gridGeral.classList.add("grid-dashboard-empresa");

    const colunaEsquerda = document.createElement("div");
    colunaEsquerda.classList.add("coluna-dashboard");
    colunaEsquerda.appendChild(criarTabelaVagas(DADOS_EMPRESA.vagas));
    colunaEsquerda.appendChild(criarGraficoDesempenho(DADOS_EMPRESA.desempenho));

    const colunaDireita = document.createElement("div");
    colunaDireita.classList.add("coluna-dashboard");
    colunaDireita.appendChild(criarCardRecrutadores(DADOS_EMPRESA.recrutadores));
    colunaDireita.appendChild(criarGraficoContratacoes(DADOS_EMPRESA.contratacoesMes));

    gridGeral.appendChild(colunaEsquerda);
    gridGeral.appendChild(colunaDireita);

    main.appendChild(gridGeral);
    container.appendChild(main);

    return container;
}