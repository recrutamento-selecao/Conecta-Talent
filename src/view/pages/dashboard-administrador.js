import { criarSidebar } from '../components/sidebar.js';
const DADOS_DASHBOARD_POR_PERIODO = {
    "7": {
        kpis: [
            { titulo: "Receita Total", valor: "R$ 5.820,00", destaque: "↑ 4,2%", subtexto: "vs. 7 dias anteriores", tipo: "positivo" },
            { titulo: "Total de Cadastros", valor: "23", destaque: "↑ 1,2%", subtexto: "vs. 7 dias anteriores", tipo: "positivo" },
            { titulo: "Total de Empresas", valor: "8", destaque: "↑ 2,1%", subtexto: "vs. 7 dias anteriores", tipo: "positivo" },
            { titulo: "Planos Ativos", valor: "3", destaque: "↑ 5,0%", subtexto: "vs. 7 dias anteriores", tipo: "positivo" }
        ],
        graficos: {
            crescimento: [0, 0, 0, 0, 0, 0, 0, 0, 5, 18, 0, 0],
            variacao: "+1,2% vs 7d",
            tipos: [15, 5, 3],
            assinaturas: [12, 8, 3]
        },
        empresas: [
            { nome: "TechCorp Brasil", plano: "Empresarial", status: "Ativo", data: "06/10/2026" },
            { nome: "Recruta+", plano: "Profissional", status: "Ativo", data: "04/10/2026" }
        ]
    },
    "30": {
        kpis: [
            { titulo: "Receita Total", valor: "R$ 24.870,00", destaque: "↑ 18,5%", subtexto: "vs. mês anterior", tipo: "positivo" },
            { titulo: "Total de Cadastros", valor: "101", destaque: "↑ 2,65%", subtexto: "vs. mês anterior", tipo: "positivo" },
            { titulo: "Total de Empresas", valor: "55", destaque: "↑ 12,7%", subtexto: "vs. mês anterior", tipo: "positivo" },
            { titulo: "Planos Ativos", valor: "15", destaque: "↑ 25,0%", subtexto: "vs. mês anterior", tipo: "positivo" }
        ],
        graficos: {
            crescimento: [0, 0, 0, 0, 0, 0, 3, 55, 75, 80, 0, 0],
            variacao: "+6,67% vs Set", // <--- Variação dinâmica
            tipos: [63, 21, 16],
            assinaturas: [73, 17, 9]
        },
        empresas: [
            { nome: "TechCorp Brasil", plano: "Empresarial", status: "Ativo", data: "15/09/2026" },
            { nome: "Recruta+", plano: "Profissional", status: "Ativo", data: "12/09/2026" },
            { nome: "StartUp Valley", plano: "Gratuito", status: "Ativo", data: "08/09/2026" },
            { nome: "Global RH", plano: "Empresarial", status: "Inativo", data: "05/09/2026" },
            { nome: "Educa Talentos", plano: "Educacional", status: "Ativo", data: "01/09/2026" }
        ]
    },
    "90": {
        kpis: [
            { titulo: "Receita Total", valor: "R$ 78.450,00", destaque: "↑ 32,1%", subtexto: "vs. trimestre anterior", tipo: "positivo" },
            { titulo: "Total de Cadastros", valor: "310", destaque: "↑ 15,4%", subtexto: "vs. trimestre anterior", tipo: "positivo" },
            { titulo: "Total de Empresas", valor: "142", destaque: "↑ 22,0%", subtexto: "vs. trimestre anterior", tipo: "positivo" },
            { titulo: "Planos Ativos", valor: "48", destaque: "↑ 40,0%", subtexto: "vs. trimestre anterior", tipo: "positivo" }
        ],
        graficos: {
            crescimento: [10, 15, 20, 30, 45, 60, 75, 90, 105, 120, 0, 0],
            variacao: "+15,4% vs trim. ant.", // <--- Variação dinâmica corrigida para 90 dias
            tipos: [180, 70, 60],
            assinaturas: [190, 75, 45]
        },
        empresas: [
            { nome: "TechCorp Brasil", plano: "Empresarial", status: "Ativo", data: "15/09/2026" },
            { nome: "Recruta+", plano: "Profissional", status: "Ativo", data: "12/09/2026" },
            { nome: "StartUp Valley", plano: "Gratuito", status: "Ativo", data: "08/09/2026" },
            { nome: "DataCloud Inc", plano: "Empresarial", status: "Ativo", data: "22/08/2026" },
            { nome: "Inova Tech", plano: "Profissional", status: "Ativo", data: "11/08/2026" },
            { nome: "Global RH", plano: "Empresarial", status: "Inativo", data: "05/08/2026" }
        ]
    },
    "ano": {
        kpis: [
            { titulo: "Receita Total", valor: "R$ 210.300,00", destaque: "↑ 45,0%", subtexto: "vs. ano anterior", tipo: "positivo" },
            { titulo: "Total de Cadastros", valor: "850", destaque: "↑ 38,2%", subtexto: "vs. ano anterior", tipo: "positivo" },
            { titulo: "Total de Empresas", valor: "320", destaque: "↑ 29,8%", subtexto: "vs. ano anterior", tipo: "positivo" },
            { titulo: "Planos Ativos", valor: "115", destaque: "↑ 52,1%", subtexto: "vs. ano anterior", tipo: "positivo" }
        ],
        graficos: {
            crescimento: [25, 40, 55, 70, 95, 120, 150, 200, 280, 310, 0, 0],
            variacao: "+38,2% vs 2025", // <--- Variação dinâmica
            tipos: [520, 180, 150],
            assinaturas: [500, 220, 130]
        },
        empresas: [
            { nome: "TechCorp Brasil", plano: "Empresarial", status: "Ativo", data: "15/09/2026" },
            { nome: "Recruta+", plano: "Profissional", status: "Ativo", data: "12/09/2026" },
            { nome: "StartUp Valley", plano: "Gratuito", status: "Ativo", data: "08/09/2026" },
            { nome: "Alpha Soluções", plano: "Empresarial", status: "Ativo", data: "14/04/2026" },
            { nome: "Beta Systems", plano: "Profissional", status: "Ativo", data: "03/02/2026" }
        ]
    }
};

const USUARIO_LOGADO = { nome: "Pedro", perfil: "administrador" };

let chartCrescimento = null;
let chartTiposUsuarios = null;
let chartAssinaturas = null;

function criarHeaderDashboard(nome) {
    const header = document.createElement("header");
    header.classList.add("header-dashboard");

    header.innerHTML = `
        <div class="boas-vindas">
            <h1>Olá, ${nome}!</h1>
            <p>Bem-vindo ao painel de administrador do Conecta Talent</p>
        </div>
        <div class="container-filtro-periodo">
            <div class="btn-periodo" id="btnFiltroPeriodo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <select id="seletorPeriodo" class="seletor-periodo-select">
                    <option value="7">Últimos 7 dias</option>
                    <option value="30" selected>Últimos 30 dias</option>
                    <option value="90">Últimos 90 dias</option>
                    <option value="ano">Este ano</option>
                    <option value="custom">Personalizado...</option>
                </select>
            </div>
            
            <div id="wrapperDatasPersonalizadas" class="wrapper-datas-custom" style="display: none;">
                <input type="date" id="dataInicio" class="input-data-filtro">
                <span>até</span>
                <input type="date" id="dataFim" class="input-data-filtro">
            </div>
        </div>
    `;

    setTimeout(() => {
        const select = header.querySelector("#seletorPeriodo");
        const wrapperCustom = header.querySelector("#wrapperDatasPersonalizadas");

        select.addEventListener("change", (e) => {
            if (e.target.value === "custom") {
                wrapperCustom.style.display = "flex";
            } else {
                wrapperCustom.style.display = "none";
                atualizarDashboardCompleto(e.target.value);
            }
        });

        const dataInicio = header.querySelector("#dataInicio");
        const dataFim = header.querySelector("#dataFim");

        [dataInicio, dataFim].forEach(input => {
            input.addEventListener("change", () => {
                if (dataInicio.value && dataFim.value) {
                    atualizarDashboardCompleto("custom", dataInicio.value, dataFim.value);
                }
            });
        });
    }, 0);

    return header;
}

function criarGridKPIs(kpis) {
    const section = document.createElement("section");
    section.classList.add("kpi-grid");
    section.id = "containerKpiGrid";

    renderizarConteudoKPIs(section, kpis);
    return section;
}

function renderizarConteudoKPIs(container, kpis) {
    container.innerHTML = "";
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
        container.appendChild(card);
    });
}

function criarSecaoGraficos() {
    const section = document.createElement("section");
    section.classList.add("graficos-grid");

    section.innerHTML = `
        <div class="grafico-card">
            <div class="grafico-header">
                <div>
                    <h3>Crescimento de Usuários</h3>
                    <p>Usuários registrados - 2026</p>
                </div>
                <div class="grafico-destaque">
                    <span class="destaque-numero" id="totalUsuariosDestaque">101</span>
                    <span class="destaque-tag" id="tagUsuariosDestaque">+6,67% vs Set</span>
                </div>
            </div>
            <div class="chart-container">
                <canvas id="chartCrescimentoUsuarios"></canvas>
            </div>
        </div>

        <div class="grafico-card">
            <div class="grafico-header">
                <h3>Usuários por Tipo</h3>
            </div>
            <div class="donut-wrapper">
                <canvas id="chartTiposUsuarios"></canvas>
            </div>
        </div>

        <div class="grafico-card">
            <div class="grafico-header">
                <h3>Assinaturas por Plano</h3>
            </div>
            <div class="donut-wrapper">
                <canvas id="chartAssinaturasPlano"></canvas>
            </div>
        </div>
    `;

    return section;
}

function criarTabelaEmpresas(empresas) {
    const card = document.createElement("div");
    card.classList.add("tabela-card");
    card.id = "containerTabelaEmpresas";

    renderizarConteudoTabela(card, empresas);
    return card;
}

function renderizarConteudoTabela(container, empresas) {
    container.innerHTML = `
        <h3>Empresas Cadastradas</h3>
        <table class="tabela-empresas">
            <thead>
                <tr>
                    <th>EMPRESA</th>
                    <th>PLANO</th>
                    <th>STATUS</th>
                    <th>DATA CADASTRO</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                ${empresas.map(emp => `
                    <tr>
                        <td>
                            <div class="empresa-info">
                                <span class="icone-empresa">🏢</span>
                                <strong>${emp.nome}</strong>
                            </div>
                        </td>
                        <td><span class="badge ${emp.plano.toLowerCase()}">${emp.plano}</span></td>
                        <td><span class="badge ${emp.status === 'Ativo' ? 'ativa' : 'rascunho'}">${emp.status}</span></td>
                        <td>${emp.data}</td>
                        <td>
                            <div class="acoes">
                                <button class="btn-acao" title="Editar">✏️</button>
                                <button class="btn-acao" title="Excluir">🗑️</button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}


function renderizarGraficos(dadosIniciais) {
    if (typeof ChartDataLabels !== 'undefined') {
        Chart.register(ChartDataLabels);
    }

    const ctxCrescimento = document.getElementById('chartCrescimentoUsuarios').getContext('2d');
    chartCrescimento = new Chart(ctxCrescimento, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Usuários',
                data: dadosIniciais.graficos.crescimento,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#2563eb'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, datalabels: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                x: { grid: { display: false } }
            }
        }
    });

    const ctxTipos = document.getElementById('chartTiposUsuarios').getContext('2d');
    chartTiposUsuarios = new Chart(ctxTipos, {
        type: 'doughnut',
        data: {
            labels: ['Candidatos', 'Recrutadores', 'Empresas'],
            datasets: [{
                data: dadosIniciais.graficos.tipos,
                backgroundColor: ['#2563eb', '#f97316', '#10b981'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                datalabels: {
                    color: '#1e293b',
                    font: { weight: 'bold', size: 10 },
                    formatter: (value, ctx) => {
                        let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        if (sum === 0) return "0%";
                        let percentage = (value * 100 / sum).toFixed(1) + "%";
                        return `${value}\n(${percentage})`;
                    }
                }
            }
        }
    });

    const ctxAssinaturas = document.getElementById('chartAssinaturasPlano').getContext('2d');
    chartAssinaturas = new Chart(ctxAssinaturas, {
        type: 'doughnut',
        data: {
            labels: ['Gratuito', 'Profissional', 'Empresarial / Educacional'],
            datasets: [{
                data: dadosIniciais.graficos.assinaturas,
                backgroundColor: ['#2563eb', '#f97316', '#10b981'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                datalabels: {
                    color: '#1e293b',
                    font: { weight: 'bold', size: 10 },
                    formatter: (value, ctx) => {
                        let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        if (sum === 0) return "0%";
                        let percentage = (value * 100 / sum).toFixed(1) + "%";
                        return `${value}\n(${percentage})`;
                    }
                }
            }
        }
    });
}

function atualizarDashboardCompleto(periodo, inicio = null, fim = null) {
    let novosDados = DADOS_DASHBOARD_POR_PERIODO[periodo];

    if (periodo === "custom") {
        novosDados = {
            kpis: [
                { titulo: "Receita Total", valor: "R$ 12.400,00", destaque: "↑ 12,4%", subtexto: "vs. período anterior", tipo: "positivo" },
                { titulo: "Total de Cadastros", valor: "45", destaque: "↑ 8,2%", subtexto: "vs. período anterior", tipo: "positivo" },
                { titulo: "Total de Empresas", valor: "19", destaque: "↑ 15,3%", subtexto: "vs. período anterior", tipo: "positivo" },
                { titulo: "Planos Ativos", valor: "7", destaque: "↑ 10,0%", subtexto: "vs. período anterior", tipo: "positivo" }
            ],
            graficos: {
                crescimento: [0, 0, 0, 0, 0, 10, 15, 20, 0, 0, 0, 0],
                variacao: "+8,2% vs per. ant.", 
                tipos: [25, 12, 8],
                assinaturas: [30, 10, 5]
            },
            empresas: [
                { nome: "Custom Company 1", plano: "Empresarial", status: "Ativo", data: inicio || "01/01/2020" },
                { nome: "Custom Company 2", plano: "Profissional", status: "Ativo", data: fim || "07/10/2025" }
            ]
        };
    }

    if (!novosDados) return;

    const containerKpis = document.getElementById("containerKpiGrid");
    if (containerKpis) {
        renderizarConteudoKPIs(containerKpis, novosDados.kpis);
    }

    const containerTabela = document.getElementById("containerTabelaEmpresas");
    if (containerTabela) {
        renderizarConteudoTabela(containerTabela, novosDados.empresas);
    }

    if (chartCrescimento && chartTiposUsuarios && chartAssinaturas) {
        chartCrescimento.data.datasets[0].data = novosDados.graficos.crescimento;
        chartTiposUsuarios.data.datasets[0].data = novosDados.graficos.tipos;
        chartAssinaturas.data.datasets[0].data = novosDados.graficos.assinaturas;

        chartCrescimento.update();
        chartTiposUsuarios.update();
        chartAssinaturas.update();
    }

    const elDestaque = document.getElementById("totalUsuariosDestaque");
    if (elDestaque) {
        elDestaque.textContent = novosDados.kpis[1].valor;
    }

    const elTag = document.getElementById("tagUsuariosDestaque");
    if (elTag && novosDados.graficos.variacao) {
        elTag.textContent = novosDados.graficos.variacao;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dadosPadrao = DADOS_DASHBOARD_POR_PERIODO["30"];

    const sidebar = criarSidebar(USUARIO_LOGADO.perfil, USUARIO_LOGADO.nome);
    document.body.appendChild(sidebar);

    const main = document.createElement("main");
    main.classList.add("conteudo-principal");

    main.appendChild(criarHeaderDashboard(USUARIO_LOGADO.nome));
    main.appendChild(criarGridKPIs(dadosPadrao.kpis));
    main.appendChild(criarSecaoGraficos());
    main.appendChild(criarTabelaEmpresas(dadosPadrao.empresas));

    document.body.appendChild(main);

    renderizarGraficos(dadosPadrao);
});