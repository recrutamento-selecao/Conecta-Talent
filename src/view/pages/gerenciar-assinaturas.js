export const ASSINATURAS_ADM_INICIAIS = [
    {
        id: 'bluecore',
        sigla: 'BC',
        empresa: 'BlueCore Sistemas',
        cnpj: '12.345.678/0001-90',
        plano: 'Profissional',
        descricaoPlano: 'Plano completo para empresas em crescimento.',
        ciclo: 'Mensal',
        valor: 179.9,
        inicio: '15/08/2026',
        proximaCobranca: '15/10/2026',
        formaPagamento: 'Cartão de crédito •••• 4821',
        responsavel: 'Mariana Oliveira',
        email: 'mariana@bluecore.com.br',
        status: 'Ativa',
        recursosPlano: ['Até 10 recrutadores', 'Até 100 vagas', 'Até 2.000 candidatos', 'Relatórios avançados'],
        historico: [
            { titulo: 'Assinatura criada', data: '15/08/2026 às 10:32' },
            { titulo: 'Pagamento confirmado', data: '15/09/2026 às 10:35' },
            { titulo: 'Próxima cobrança agendada', data: '15/10/2026' }
        ]
    },
    {
        id: 'technova',
        sigla: 'TN',
        empresa: 'TechNova Solutions',
        cnpj: '23.456.789/0001-01',
        plano: 'Empresarial/Educacional',
        descricaoPlano: 'Solução completa para grandes instituições de ensino.',
        ciclo: 'Anual',
        valor: 3490.0,
        inicio: '02/03/2026',
        proximaCobranca: '02/03/2027',
        formaPagamento: 'Pix empresarial',
        responsavel: 'Ricardo Mendes',
        email: 'ricardo@technova.com.br',
        status: 'Ativa',
        recursosPlano: ['Recrutadores ilimitados', 'Vagas ilimitadas', 'Candidatos ilimitados', 'Suporte dedicado'],
        historico: [
            { titulo: 'Assinatura criada', data: '02/03/2026 às 09:10' },
            { titulo: 'Pagamento confirmado', data: '02/03/2026 às 09:14' },
            { titulo: 'Próxima cobrança agendada', data: '02/03/2027' }
        ]
    },
    {
        id: 'inova-rh',
        sigla: 'IR',
        empresa: 'Inova RH',
        cnpj: '34.567.890/0001-12',
        plano: 'Gratuito',
        descricaoPlano: 'Ideal para pequenas instituições que estão começando.',
        ciclo: 'Gratuito',
        valor: 0,
        inicio: '18/09/2026',
        proximaCobranca: '—',
        formaPagamento: 'Isento (plano gratuito)',
        responsavel: 'Camila Ferreira',
        email: 'camila@inovarh.com.br',
        status: 'Ativa',
        recursosPlano: ['1 recrutador', '5 vagas', '100 candidatos', 'Processo seletivo básico'],
        historico: [
            { titulo: 'Assinatura criada', data: '18/09/2026 às 14:20' }
        ]
    },
    {
        id: 'grupo-alfa',
        sigla: 'GA',
        empresa: 'Grupo Alfa Educação',
        cnpj: '45.678.901/0001-23',
        plano: 'Empresarial/Educacional',
        descricaoPlano: 'Solução completa para grandes instituições de ensino.',
        ciclo: 'Anual',
        valor: 3490.0,
        inicio: '10/01/2026',
        proximaCobranca: '10/01/2027',
        formaPagamento: 'Boleto bancário',
        responsavel: 'Fernando Almeida',
        email: 'fernando@grupoalfa.edu.br',
        status: 'Ativa',
        recursosPlano: ['Recrutadores ilimitados', 'Vagas ilimitadas', 'Candidatos ilimitados', 'Personalização da plataforma'],
        historico: [
            { titulo: 'Assinatura criada', data: '10/01/2026 às 11:05' },
            { titulo: 'Pagamento confirmado', data: '11/01/2026 às 08:40' },
            { titulo: 'Próxima cobrança agendada', data: '10/01/2027' }
        ]
    },
    {
        id: 'startup-hub',
        sigla: 'SH',
        empresa: 'StartUp Hub',
        cnpj: '56.789.012/0001-34',
        plano: 'Profissional',
        descricaoPlano: 'Plano completo para empresas em crescimento.',
        ciclo: 'Mensal',
        valor: 149.9,
        inicio: '05/06/2026',
        proximaCobranca: '05/10/2026',
        formaPagamento: 'Cartão de crédito •••• 9910',
        responsavel: 'Lucas Ribeiro',
        email: 'lucas@startuphub.io',
        status: 'Cancelada',
        recursosPlano: ['5 recrutadores', '50 vagas', '1.000 candidatos', 'Integração com testes'],
        historico: [
            { titulo: 'Assinatura criada', data: '05/06/2026 às 16:00' },
            { titulo: 'Assinatura cancelada pela empresa', data: '20/09/2026 às 18:12' }
        ]
    },
    {
        id: 'instituto-futuro',
        sigla: 'IF',
        empresa: 'Instituto Futuro',
        cnpj: '67.890.123/0001-45',
        plano: 'Gratuito',
        descricaoPlano: 'Ideal para pequenas instituições que estão começando.',
        ciclo: 'Gratuito',
        valor: 0,
        inicio: '21/09/2026',
        proximaCobranca: '—',
        formaPagamento: 'Isento (plano gratuito)',
        responsavel: 'Beatriz Santos',
        email: 'beatriz@institutofuturo.org.br',
        status: 'Ativa',
        recursosPlano: ['1 recrutador', '5 vagas', '100 candidatos', 'Processo seletivo básico'],
        historico: [
            { titulo: 'Assinatura criada', data: '21/09/2026 às 11:45' }
        ]
    }
];

function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function escapar(texto = '') {
    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export function renderGerenciarAssinaturas(callbacks = {}) {
    const pagina = document.createElement('section');
    pagina.className = 'pagina-gerenciar-assinaturas';

    let busca = '';
    let filtroPlano = 'Todos';
    let filtroStatus = 'Todos';
    let filtroCiclo = 'Todos';

    const abrirDetalhes = callbacks.onVisualizar || ((assinatura) => {
        window.location.hash = `#/assinaturas/${encodeURIComponent(assinatura.id)}`;
    });

    pagina.innerHTML = `
        <style>
            .ga-breadcrumb { font-size: 0.85rem; color: #64748b; margin-bottom: 0.35rem; }
            .ga-titulo { margin: 0 0 0.25rem; font-size: 1.75rem; font-weight: 700; color: #0f172a; }
            .ga-subtitulo { margin: 0 0 1.5rem; font-size: 0.92rem; color: #64748b; }
            .ga-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.25rem; }
            .ga-kpi { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.1rem 1.25rem; display: flex; flex-direction: column; gap: 0.35rem; }
            .ga-kpi-label { font-size: 0.8rem; color: #64748b; font-weight: 500; }
            .ga-kpi-valor { font-size: 1.45rem; font-weight: 700; color: #0f172a; }
            .ga-kpi-meta { font-size: 0.74rem; color: #16a34a; font-weight: 600; }
            .ga-kpi-meta.neutro { color: #64748b; font-weight: 500; }
            .ga-filtros { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0.9rem 1.15rem; display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
            .ga-busca { flex: 1 1 240px; padding: 0.55rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; }
            .ga-select { padding: 0.55rem 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.84rem; background: #fff; color: #334155; }
            .ga-btn-exportar { margin-left: auto; background: #fff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.55rem 0.95rem; font-size: 0.84rem; font-weight: 600; color: #334155; cursor: pointer; }
            .ga-btn-exportar:hover { background: #f8fafc; }
            .ga-tabela-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
            .ga-tabela-wrap { overflow-x: auto; }
            .ga-tabela { width: 100%; border-collapse: collapse; font-size: 0.84rem; text-align: left; }
            .ga-tabela th { background: #f8fafc; color: #64748b; font-size: 0.74rem; font-weight: 600; padding: 0.8rem 1rem; border-bottom: 1px solid #e2e8f0; text-transform: uppercase; }
            .ga-tabela td { padding: 0.9rem 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; vertical-align: middle; }
            .ga-linha { cursor: pointer; }
            .ga-linha:hover { background: #f8fafc; }
            .ga-emp-nome { font-weight: 700; color: #0f172a; display: block; }
            .ga-emp-cnpj { font-size: 0.74rem; color: #64748b; display: block; margin-top: 0.1rem; }
            .ga-pill { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 999px; font-size: 0.74rem; font-weight: 600; }
            .ga-pill.ativa { background: #dcfce7; color: #15803d; }
            .ga-pill.cancelada { background: #fee2e2; color: #b91c1c; }
            .ga-btn-detalhes { background: none; border: none; color: #64748b; font-size: 1.05rem; cursor: pointer; padding: 0.25rem 0.45rem; border-radius: 6px; }
            .ga-btn-detalhes:hover { background: #e2e8f0; color: #0f172a; }
            .ga-rodape { display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 1rem; font-size: 0.8rem; color: #64748b; flex-wrap: wrap; gap: 0.5rem; }
            .ga-pag { display: flex; gap: 0.3rem; }
            .ga-pag button { border: 1px solid #cbd5e1; background: #fff; color: #334155; border-radius: 6px; padding: 0.28rem 0.6rem; font-size: 0.78rem; cursor: pointer; }
            .ga-pag button.ativa { background: #1d4ed8; color: #fff; border-color: #1d4ed8; font-weight: 600; }
            @media (max-width: 1024px) { .ga-kpis { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 640px) { .ga-kpis { grid-template-columns: 1fr; } }
        </style>

        <div class="ga-breadcrumb">Assinatura &gt; Gerenciar assinatura</div>
        <h1 class="ga-titulo">Assinaturas</h1>
        <p class="ga-subtitulo">Acompanhe e gerencie as assinaturas das empresas e instituições cadastradas na plataforma.</p>

        <section class="ga-kpis">
            <article class="ga-kpi">
                <span class="ga-kpi-label">Assinaturas ativas</span>
                <strong class="ga-kpi-valor">168</strong>
                <span class="ga-kpi-meta">↑ 7,8% este mês</span>
            </article>
            <article class="ga-kpi">
                <span class="ga-kpi-label">Plano gratuito</span>
                <strong class="ga-kpi-valor">74</strong>
                <span class="ga-kpi-meta neutro">Empresas e instituições</span>
            </article>
            <article class="ga-kpi">
                <span class="ga-kpi-label">Assinaturas canceladas</span>
                <strong class="ga-kpi-valor">18</strong>
                <span class="ga-kpi-meta neutro">Nos últimos 30 dias</span>
            </article>
            <article class="ga-kpi">
                <span class="ga-kpi-label">Receita recorrente mensal</span>
                <strong class="ga-kpi-valor">R$ 42.350</strong>
                <span class="ga-kpi-meta">↑ 6,2% este mês</span>
            </article>
        </section>

        <section class="ga-filtros">
            <input type="text" id="ga-busca" class="ga-busca" placeholder="Buscar empresa ou CNPJ..." />
            <select id="ga-plano" class="ga-select">
                <option value="Todos">Todos os planos</option>
                <option value="Gratuito">Gratuito</option>
                <option value="Profissional">Profissional</option>
                <option value="Empresarial/Educacional">Empresarial/Educacional</option>
            </select>
            <select id="ga-status" class="ga-select">
                <option value="Todos">Todos os status</option>
                <option value="Ativa">Ativa</option>
                <option value="Cancelada">Cancelada</option>
            </select>
            <select id="ga-ciclo" class="ga-select">
                <option value="Todos">Todos os ciclos</option>
                <option value="Mensal">Mensal</option>
                <option value="Anual">Anual</option>
                <option value="Gratuito">Gratuito</option>
            </select>
            <button type="button" id="ga-exportar" class="ga-btn-exportar">↓ Exportar</button>
        </section>

        <section class="ga-tabela-card">
            <div class="ga-tabela-wrap">
                <table class="ga-tabela">
                    <thead>
                        <tr>
                            <th>Empresa / Instituição</th>
                            <th>Plano</th>
                            <th>Ciclo</th>
                            <th>Valor</th>
                            <th>Início</th>
                            <th>Próxima cobrança</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="ga-corpo"></tbody>
                </table>
            </div>
            <div class="ga-rodape" id="ga-rodape"></div>
        </section>
    `;

    function obterFiltrados() {
        return ASSINATURAS_ADM_INICIAIS.filter((item) => {
            const termo = busca.trim().toLowerCase();
            const matchBusca =
                !termo ||
                item.empresa.toLowerCase().includes(termo) ||
                item.cnpj.toLowerCase().includes(termo);
            const matchPlano = filtroPlano === 'Todos' || item.plano === filtroPlano;
            const matchStatus = filtroStatus === 'Todos' || item.status === filtroStatus;
            const matchCiclo = filtroCiclo === 'Todos' || item.ciclo === filtroCiclo;
            return matchBusca && matchPlano && matchStatus && matchCiclo;
        });
    }

    function renderizarTabela() {
        const filtrados = obterFiltrados();
        const tbody = pagina.querySelector('#ga-corpo');

        if (!filtrados.length) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:2rem;color:#64748b;">Nenhuma assinatura encontrada.</td></tr>`;
        } else {
            tbody.innerHTML = filtrados
                .map((item) => {
                    const classeStatus = item.status === 'Ativa' ? 'ativa' : 'cancelada';
                    return `
                        <tr class="ga-linha" data-id="${escapar(item.id)}">
                            <td>
                                <span class="ga-emp-nome">${escapar(item.empresa)}</span>
                                <span class="ga-emp-cnpj">CNPJ ${escapar(item.cnpj)}</span>
                            </td>
                            <td><strong style="color:#0f172a;">${escapar(item.plano)}</strong></td>
                            <td>${escapar(item.ciclo)}</td>
                            <td><strong style="color:#0f172a;">${formatarMoeda(item.valor)}</strong></td>
                            <td>${escapar(item.inicio)}</td>
                            <td>${escapar(item.proximaCobranca)}</td>
                            <td><span class="ga-pill ${classeStatus}">${escapar(item.status)}</span></td>
                            <td><button type="button" class="ga-btn-detalhes" data-id="${escapar(item.id)}" title="Visualizar assinatura">⋮</button></td>
                        </tr>
                    `;
                })
                .join('');
        }

        pagina.querySelector('#ga-rodape').innerHTML = `
            <span>Mostrando 1 a ${filtrados.length} de 186 assinaturas</span>
            <div class="ga-pag">
                <button type="button">&lt;</button>
                <button type="button" class="ativa">1</button>
                <button type="button">2</button>
                <button type="button">3</button>
                <button type="button">4</button>
                <button type="button">5</button>
                <button type="button">&gt;</button>
            </div>
        `;

        tbody.querySelectorAll('.ga-linha').forEach((tr) => {
            tr.addEventListener('click', () => {
                const alvo = ASSINATURAS_ADM_INICIAIS.find((a) => a.id === tr.dataset.id);
                if (alvo) abrirDetalhes(alvo);
            });
        });
    }

    pagina.querySelector('#ga-busca').addEventListener('input', (e) => {
        busca = e.target.value;
        renderizarTabela();
    });
    pagina.querySelector('#ga-plano').addEventListener('change', (e) => {
        filtroPlano = e.target.value;
        renderizarTabela();
    });
    pagina.querySelector('#ga-status').addEventListener('change', (e) => {
        filtroStatus = e.target.value;
        renderizarTabela();
    });
    pagina.querySelector('#ga-ciclo').addEventListener('change', (e) => {
        filtroCiclo = e.target.value;
        renderizarTabela();
    });
    pagina.querySelector('#ga-exportar').addEventListener('click', () => {
        const linhas = obterFiltrados().map(
            (i) => `${i.empresa};${i.cnpj};${i.plano};${i.ciclo};${formatarMoeda(i.valor)};${i.status}`
        );
        const csv = 'Empresa;CNPJ;Plano;Ciclo;Valor;Status\n' + linhas.join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'assinaturas-conecta-talent.csv';
        a.click();
        URL.revokeObjectURL(url);
    });

    renderizarTabela();
    return pagina;
}

export function renderVisualizarAssinatura(assinaturaId = 'bluecore', callbacks = {}) {
    const assinatura =
        ASSINATURAS_ADM_INICIAIS.find((a) => a.id === assinaturaId) || ASSINATURAS_ADM_INICIAIS[0];

    const voltar = callbacks.onVoltar || (() => {
        window.location.hash = '#/assinaturas';
    });

    const verEmpresa = callbacks.onVerEmpresa || (() => {
        window.location.hash = '#/usuarios';
    });

    const pagina = document.createElement('section');
    pagina.className = 'pagina-visualizar-assinatura';

    pagina.innerHTML = `
        <style>
            .va-breadcrumb { font-size: 0.85rem; color: #64748b; margin-bottom: 0.35rem; }
            .va-titulo { margin: 0 0 0.25rem; font-size: 1.75rem; font-weight: 700; color: #0f172a; }
            .va-subtitulo { margin: 0 0 1.5rem; font-size: 0.92rem; color: #64748b; }
            .va-grid { display: grid; grid-template-columns: minmax(0, 1.75fr) minmax(290px, 1fr); gap: 1.5rem; align-items: start; }
            .va-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.4rem; }
            .va-card h2 { margin: 0 0 1rem; font-size: 0.98rem; font-weight: 700; color: #0f172a; }
            .va-emp-topo { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #f1f5f9; gap: 0.75rem; }
            .va-emp-info { display: flex; align-items: center; gap: 0.8rem; }
            .va-sigla { width: 42px; height: 42px; border-radius: 10px; background: #dbeafe; color: #1d4ed8; font-weight: 700; font-size: 0.92rem; display: flex; align-items: center; justify-content: center; }
            .va-emp-nome { font-size: 1rem; font-weight: 700; color: #0f172a; display: block; }
            .va-emp-cnpj { font-size: 0.78rem; color: #64748b; display: block; }
            .va-badge { background: #dcfce7; color: #15803d; padding: 0.22rem 0.65rem; border-radius: 999px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; }
            .va-badge.cancelada { background: #fee2e2; color: #b91c1c; }
            .va-dados-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem 1.5rem; margin-bottom: 1.15rem; }
            .va-campo small { display: block; font-size: 0.75rem; color: #64748b; margin-bottom: 0.2rem; }
            .va-campo strong { font-size: 0.88rem; color: #0f172a; font-weight: 600; }
            .va-aviso-azul { background: #eff6ff; border: 1px solid #dbeafe; color: #1e40af; border-radius: 8px; padding: 0.75rem 0.95rem; font-size: 0.78rem; margin-bottom: 1.15rem; }
            .va-acoes { display: flex; gap: 0.75rem; flex-wrap: wrap; }
            .va-btn { background: #fff; border: 1px solid #cbd5e1; color: #334155; border-radius: 8px; padding: 0.58rem 1.05rem; font-size: 0.84rem; font-weight: 600; cursor: pointer; }
            .va-btn:hover { background: #f8fafc; }
            .va-col-direita { display: flex; flex-direction: column; gap: 1.25rem; }
            .va-plano-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.1rem; }
            .va-plano-box h3 { margin: 0 0 0.2rem; font-size: 1.05rem; color: #0f172a; }
            .va-plano-box p { margin: 0 0 0.85rem; font-size: 0.78rem; color: #64748b; }
            .va-plano-valor { font-size: 1.35rem; font-weight: 800; color: #0f172a; padding-bottom: 0.85rem; margin-bottom: 0.85rem; border-bottom: 1px solid #e2e8f0; }
            .va-plano-valor small { font-size: 0.8rem; font-weight: 500; color: #64748b; }
            .va-recursos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.8rem; color: #334155; }
            .va-recursos li::before { content: "✓ "; color: #16a34a; font-weight: 700; }
            .va-timeline { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.9rem; }
            .va-timeline li { display: flex; align-items: flex-start; gap: 0.65rem; }
            .va-ponto { width: 8px; height: 8px; border-radius: 50%; background: #1d4ed8; margin-top: 0.35rem; flex-shrink: 0; }
            .va-timeline strong { display: block; font-size: 0.84rem; color: #0f172a; }
            .va-timeline small { display: block; font-size: 0.74rem; color: #64748b; }
            @media (max-width: 960px) { .va-grid { grid-template-columns: 1fr; } }
            @media (max-width: 560px) { .va-dados-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="va-breadcrumb">Assinatura &gt; Gerenciar assinatura &gt; Visualizar assinatura</div>
        <h1 class="va-titulo">Visualizar assinatura</h1>
        <p class="va-subtitulo">Consulte os detalhes da assinatura e o plano contratado pela empresa.</p>

        <div class="va-grid">
            <section class="va-card">
                <h2>Dados da assinatura</h2>
                <div class="va-emp-topo">
                    <div class="va-emp-info">
                        <span class="va-sigla">${escapar(assinatura.sigla)}</span>
                        <div>
                            <span class="va-emp-nome">${escapar(assinatura.empresa)}</span>
                            <span class="va-emp-cnpj">CNPJ ${escapar(assinatura.cnpj)}</span>
                        </div>
                    </div>
                    <span class="va-badge ${assinatura.status === 'Ativa' ? '' : 'cancelada'}">${escapar(assinatura.status)}</span>
                </div>

                <div class="va-dados-grid">
                    <div class="va-campo"><small>Plano contratado</small><strong>${escapar(assinatura.plano)}</strong></div>
                    <div class="va-campo"><small>Ciclo de cobrança</small><strong>${escapar(assinatura.ciclo)}</strong></div>
                    <div class="va-campo"><small>Valor da assinatura</small><strong>${formatarMoeda(assinatura.valor)}${assinatura.ciclo === 'Anual' ? '/ ano' : '/ mês'}</strong></div>
                    <div class="va-campo"><small>Data de início</small><strong>${escapar(assinatura.inicio)}</strong></div>
                    <div class="va-campo"><small>Próxima cobrança</small><strong>${escapar(assinatura.proximaCobranca)}</strong></div>
                    <div class="va-campo"><small>Forma de pagamento</small><strong>${escapar(assinatura.formaPagamento)}</strong></div>
                    <div class="va-campo"><small>Responsável</small><strong>${escapar(assinatura.responsavel)}</strong></div>
                    <div class="va-campo"><small>E-mail</small><strong>${escapar(assinatura.email)}</strong></div>
                </div>

                <div class="va-aviso-azul">
                    O administrador possui acesso somente para consulta. Alterações ou cancelamento da assinatura são realizados pela empresa responsável pela conta.
                </div>

                <div class="va-acoes">
                    <button type="button" class="va-btn" id="va-ver-empresa">Ver empresa</button>
                    <button type="button" class="va-btn" id="va-voltar">Voltar para assinaturas</button>
                </div>
            </section>

            <div class="va-col-direita">
                <section class="va-card">
                    <h2>Plano atual</h2>
                    <div class="va-plano-box">
                        <h3>${escapar(assinatura.plano)}</h3>
                        <p>${escapar(assinatura.descricaoPlano)}</p>
                        <div class="va-plano-valor">${formatarMoeda(assinatura.valor)} <small>${assinatura.ciclo === 'Anual' ? '/ano' : '/mês'}</small></div>
                        <ul class="va-recursos">
                            ${assinatura.recursosPlano.map((r) => `<li>${escapar(r)}</li>`).join('')}
                        </ul>
                    </div>
                </section>

                <section class="va-card">
                    <h2>Histórico</h2>
                    <ul class="va-timeline">
                        ${assinatura.historico
                            .map(
                                (h) => `
                            <li>
                                <span class="va-ponto"></span>
                                <div>
                                    <strong>${escapar(h.titulo)}</strong>
                                    <small>${escapar(h.data)}</small>
                                </div>
                            </li>
                        `
                            )
                            .join('')}
                    </ul>
                </section>
            </div>
        </div>
    `;

    pagina.querySelector('#va-ver-empresa').addEventListener('click', verEmpresa);
    pagina.querySelector('#va-voltar').addEventListener('click', voltar);
    return pagina;
}