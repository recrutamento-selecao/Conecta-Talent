const EMPRESAS_CADASTRADAS = [
    { id: 1, empresa: 'TechCorp Brasil', recrutadores: 12, vagas: 28, plano: 'Empresarial' },
    { id: 2, empresa: 'Recruta+',        recrutadores: 8,  vagas: 15, plano: 'Profissional' },
    { id: 3, empresa: 'StartUp Valley',  recrutadores: 3,  vagas: 7,  plano: 'Gratuito' },
    { id: 4, empresa: 'Global RH',       recrutadores: 22, vagas: 45, plano: 'Empresarial' },
    { id: 5, empresa: 'Educa Talentos',  recrutadores: 5,  vagas: 12, plano: 'Educacional' }
];

function classeBadgePlano(plano) {
    const mapa = {
        Empresarial: 'empresarial',
        Profissional: 'profissional',
        Gratuito: 'gratuito',
        Educacional: 'educacional'
    };
    return mapa[plano] || 'gratuito';
}

export function renderDashboardAdministrador() {
    const pagina = document.createElement('section');
    pagina.className = 'dashboard-administrador';

    const linhasEmpresas = EMPRESAS_CADASTRADAS.map((item) => `
        <tr>
            <td>
                <div class="empresa-info">
                    <span class="icone-empresa">🏢</span>
                    <span>${item.empresa}</span>
                </div>
            </td>
            <td>${item.recrutadores}</td>
            <td>${item.vagas}</td>
            <td><span class="badge ${classeBadgePlano(item.plano)}">${item.plano}</span></td>
            <td>
                <div class="acoes">
                    <button type="button" class="btn-acao btn-excluir-empresa" data-id="${item.id}" title="Excluir">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');

    pagina.innerHTML = `
        <header class="header-dashboard">
            <div class="boas-vindas">
                <h1>Olá, Pedro!</h1>
                <p>Bem-vinda ao painel de administrador do Conecta Talent</p>
            </div>
            <div class="container-filtro-periodo">
                <div class="btn-periodo">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <select id="filtro-periodo-adm" class="seletor-periodo-select">
                        <option value="30d" selected>Último 30 dias</option>
                        <option value="7d">Últimos 7 dias</option>
                        <option value="90d">Últimos 90 dias</option>
                        <option value="ano">Este ano</option>
                    </select>
                </div>
            </div>
        </header>

        <section class="kpi-grid">
            <article class="kpi-card">
                <span class="kpi-titulo">Receita Total</span>
                <strong class="kpi-valor" id="kpi-receita">R$ 24.870,00</strong>
                <span class="kpi-status positivo">↑ 18,5% <small>vs. mês anterior</small></span>
            </article>
            <article class="kpi-card">
                <span class="kpi-titulo">Total de Cadastros</span>
                <strong class="kpi-valor" id="kpi-cadastros">1.258</strong>
                <span class="kpi-status positivo">↑ 32,4% <small>vs. mês anterior</small></span>
            </article>
            <article class="kpi-card">
                <span class="kpi-titulo">Total de Empresas</span>
                <strong class="kpi-valor" id="kpi-empresas">312</strong>
                <span class="kpi-status positivo">↑ 12,7% <small>vs. mês anterior</small></span>
            </article>
            <article class="kpi-card">
                <span class="kpi-titulo">Planos Ativos</span>
                <strong class="kpi-valor" id="kpi-planos">15</strong>
                <span class="kpi-status positivo">↑ 25,0% <small>vs. mês anterior</small></span>
            </article>
        </section>

        <section class="graficos-grid">
            <article class="grafico-card">
                <div class="grafico-header">
                    <div>
                        <h3>Crescimento de Usuários</h3>
                        <p>Usuários registrados - 2026</p>
                    </div>
                    <div class="grafico-destaque">
                        <span class="destaque-numero">1.258</span>
                        <span class="destaque-tag">↑ 2.696% vs Jan</span>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="grafico-crescimento-usuarios"></canvas>
                </div>
            </article>

            <article class="grafico-card">
                <div class="grafico-header">
                    <div>
                        <h3>Usuários por Tipo</h3>
                    </div>
                </div>
                <div class="donut-wrapper">
                    <canvas id="grafico-usuarios-tipo"></canvas>
                </div>
            </article>

            <article class="grafico-card">
                <div class="grafico-header">
                    <div>
                        <h3>Assinaturas por Plano</h3>
                    </div>
                </div>
                <div class="donut-wrapper">
                    <canvas id="grafico-assinaturas-plano"></canvas>
                </div>
            </article>
        </section>

        <section class="tabela-card">
            <h3>Empresas Cadastradas</h3>
            <table class="tabela-empresas">
                <thead>
                    <tr>
                        <th>EMPRESA</th>
                        <th>RECRUTADORES</th>
                        <th>VAGAS</th>
                        <th>PLANO</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody id="corpo-empresas-cadastradas">
                    ${linhasEmpresas}
                </tbody>
            </table>
        </section>
    `;

    pagina.querySelectorAll('.btn-excluir-empresa').forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.closest('tr')?.remove();
        });
    });

    requestAnimationFrame(() => {
        if (typeof window.Chart === 'undefined') return;

        const ctxLinha = pagina.querySelector('#grafico-crescimento-usuarios');
        if (ctxLinha) {
            new window.Chart(ctxLinha, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets: [{
                        data: [45, 70, 95, 130, 180, 260, 410, 620, 810, 960, 1110, 1258],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.10)',
                        fill: true,
                        tension: 0.35,
                        pointRadius: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } }
                }
            });
        }

        const ctxTipo = pagina.querySelector('#grafico-usuarios-tipo');
        if (ctxTipo) {
            new window.Chart(ctxTipo, {
                type: 'doughnut',
                data: {
                    labels: ['Candidatos (63%)', 'Recrutadores (21%)', 'Empresas (16%)', 'Adm (<1%)'],
                    datasets: [{
                        data: [63, 21, 16, 1],
                        backgroundColor: ['#2563eb', '#f97316', '#10b981', '#eab308'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '68%',
                    plugins: { legend: { position: 'right' } }
                }
            });
        }

        const ctxPlano = pagina.querySelector('#grafico-assinaturas-plano');
        if (ctxPlano) {
            new window.Chart(ctxPlano, {
                type: 'doughnut',
                data: {
                    labels: ['Gratuito (73%)', 'Profissional (17%)', 'Empresarial/Educacional (9%)'],
                    datasets: [{
                        data: [73, 17, 9],
                        backgroundColor: ['#2563eb', '#f97316', '#10b981'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '68%',
                    plugins: { legend: { position: 'right' } }
                }
            });
        }
    });

    return pagina;
}