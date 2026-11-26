export const PAGAMENTOS_ADM_INICIAIS = [
    {
        id: 'PAY-10842',
        empresa: 'BlueCore Sistemas',
        cnpj: '12.345.678/0001-90',
        plano: 'Profissional',
        ciclo: 'Mensal',
        valor: 179.9,
        desconto: 0,
        taxas: 0,
        data: '15/09/2026',
        dataHora: '15/09/2026 às 10:35',
        transacaoId: 'TXN-98234175',
        formaPagamento: 'Cartão de crédito',
        detalhePagamento: 'Final •••• 4821',
        status: 'Pago',
        historico: [
            { titulo: 'Pagamento iniciado', data: '15/09/2026 às 10:32' },
            { titulo: 'Pagamento aprovado', data: '15/09/2026 às 10:35' },
            { titulo: 'Recibo registrado', data: '15/09/2026 às 10:36' }
        ]
    },
    {
        id: 'PAY-10841',
        empresa: 'TechNova Solutions',
        cnpj: '23.456.789/0001-01',
        plano: 'Empresarial/Educacional',
        ciclo: 'Anual',
        valor: 3490.0,
        desconto: 0,
        taxas: 0,
        data: '12/09/2026',
        dataHora: '12/09/2026 às 09:14',
        transacaoId: 'TXN-98234112',
        formaPagamento: 'Pix',
        detalhePagamento: 'Chave CNPJ confirmada',
        status: 'Pago',
        historico: [
            { titulo: 'Pagamento iniciado', data: '12/09/2026 às 09:12' },
            { titulo: 'Pagamento aprovado', data: '12/09/2026 às 09:14' },
            { titulo: 'Recibo registrado', data: '12/09/2026 às 09:15' }
        ]
    },
    {
        id: 'PAY-10840',
        empresa: 'Grupo Alfa Educação',
        cnpj: '45.678.901/0001-23',
        plano: 'Empresarial/Educacional',
        ciclo: 'Anual',
        valor: 3490.0,
        desconto: 0,
        taxas: 0,
        data: '10/09/2026',
        dataHora: '10/09/2026 às 14:20',
        transacaoId: 'TXN-98233998',
        formaPagamento: 'Boleto',
        detalhePagamento: 'Vencimento 18/09/2026',
        status: 'Pendente',
        historico: [
            { titulo: 'Boleto emitido', data: '10/09/2026 às 14:20' },
            { titulo: 'Aguardando compensação bancária', data: '10/09/2026 às 14:21' }
        ]
    },
    {
        id: 'PAY-10839',
        empresa: 'StartUp Hub',
        cnpj: '56.789.012/0001-34',
        plano: 'Profissional',
        ciclo: 'Mensal',
        valor: 149.9,
        desconto: 0,
        taxas: 0,
        data: '05/09/2026',
        dataHora: '05/09/2026 às 11:02',
        transacaoId: 'TXN-98233840',
        formaPagamento: 'Cartão de crédito',
        detalhePagamento: 'Final •••• 9910',
        status: 'Falhou',
        historico: [
            { titulo: 'Tentativa de cobrança iniciada', data: '05/09/2026 às 11:01' },
            { titulo: 'Transação recusada pela operadora', data: '05/09/2026 às 11:02' }
        ]
    },
    {
        id: 'PAY-10838',
        empresa: 'Inova RH',
        cnpj: '34.567.890/0001-12',
        plano: 'Profissional',
        ciclo: 'Mensal',
        valor: 179.9,
        desconto: 0,
        taxas: 0,
        data: '03/09/2026',
        dataHora: '03/09/2026 às 16:45',
        transacaoId: 'TXN-98233711',
        formaPagamento: 'Cartão de crédito',
        detalhePagamento: 'Final •••• 3104',
        status: 'Pago',
        historico: [
            { titulo: 'Pagamento iniciado', data: '03/09/2026 às 16:44' },
            { titulo: 'Pagamento aprovado', data: '03/09/2026 às 16:45' },
            { titulo: 'Recibo registrado', data: '03/09/2026 às 16:46' }
        ]
    },
    {
        id: 'PAY-10837',
        empresa: 'Instituto Futuro',
        cnpj: '67.890.123/0001-45',
        plano: 'Gratuito',
        ciclo: 'Gratuito',
        valor: 0,
        desconto: 0,
        taxas: 0,
        data: '01/09/2026',
        dataHora: '01/09/2026 às 08:30',
        transacaoId: 'TXN-98233600',
        formaPagamento: '—',
        detalhePagamento: 'Plano gratuito',
        status: 'Pago',
        historico: [
            { titulo: 'Fatura gratuita registrada', data: '01/09/2026 às 08:30' }
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

export function renderPagamentosAdm(callbacks = {}) {
    const pagina = document.createElement('section');
    pagina.className = 'pagina-pagamentos-adm';

    let busca = '';
    let filtroPlano = 'Todos';
    let filtroStatus = 'Todos';

    const abrirPagamento = callbacks.onVisualizar || ((pag) => {
        window.location.hash = `#/pagamentos/${encodeURIComponent(pag.id)}`;
    });

    pagina.innerHTML = `
        <style>
            .pa-breadcrumb { font-size: 0.85rem; color: #64748b; margin-bottom: 0.35rem; }
            .pa-titulo { margin: 0 0 0.25rem; font-size: 1.75rem; font-weight: 700; color: #0f172a; }
            .pa-subtitulo { margin: 0 0 1.5rem; font-size: 0.92rem; color: #64748b; }
            .pa-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.25rem; }
            .pa-kpi { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.1rem 1.25rem; display: flex; flex-direction: column; gap: 0.35rem; }
            .pa-kpi-label { font-size: 0.8rem; color: #64748b; font-weight: 500; }
            .pa-kpi-valor { font-size: 1.45rem; font-weight: 700; color: #0f172a; }
            .pa-kpi-meta { font-size: 0.74rem; font-weight: 600; color: #16a34a; }
            .pa-kpi-meta.amarelo { color: #b45309; }
            .pa-kpi-meta.vermelho { color: #dc2626; }
            .pa-filtros { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0.9rem 1.15rem; display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
            .pa-busca { flex: 1 1 240px; padding: 0.55rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; }
            .pa-select { padding: 0.55rem 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.84rem; background: #fff; color: #334155; }
            .pa-btn-exportar { margin-left: auto; background: #fff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.55rem 0.95rem; font-size: 0.84rem; font-weight: 600; color: #334155; cursor: pointer; }
            .pa-tabela-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
            .pa-tabela-wrap { overflow-x: auto; }
            .pa-tabela { width: 100%; border-collapse: collapse; font-size: 0.84rem; text-align: left; }
            .pa-tabela th { background: #f8fafc; color: #64748b; font-size: 0.74rem; font-weight: 600; padding: 0.8rem 1rem; border-bottom: 1px solid #e2e8f0; text-transform: uppercase; }
            .pa-tabela td { padding: 0.9rem 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; vertical-align: middle; }
            .pa-linha { cursor: pointer; }
            .pa-linha:hover { background: #f8fafc; }
            .pa-emp-nome { font-weight: 700; color: #0f172a; display: block; }
            .pa-emp-cnpj { font-size: 0.74rem; color: #64748b; display: block; margin-top: 0.1rem; }
            .pa-pill { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 999px; font-size: 0.74rem; font-weight: 600; }
            .pa-pill.pago { background: #dcfce7; color: #15803d; }
            .pa-pill.pendente { background: #fef3c7; color: #b45309; }
            .pa-pill.falhou { background: #fee2e2; color: #b91c1c; }
            .pa-rodape { display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 1rem; font-size: 0.8rem; color: #64748b; flex-wrap: wrap; gap: 0.5rem; }
            .pa-pag { display: flex; gap: 0.3rem; }
            .pa-pag button { border: 1px solid #cbd5e1; background: #fff; color: #334155; border-radius: 6px; padding: 0.28rem 0.6rem; font-size: 0.78rem; cursor: pointer; }
            .pa-pag button.ativa { background: #1d4ed8; color: #fff; border-color: #1d4ed8; font-weight: 600; }
            @media (max-width: 1024px) { .pa-kpis { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 640px) { .pa-kpis { grid-template-columns: 1fr; } }
        </style>

        <div class="pa-breadcrumb">Assinatura &gt; Pagamentos</div>
        <h1 class="pa-titulo">Pagamentos</h1>
        <p class="pa-subtitulo">Consulte o histórico de pagamentos realizados pelas empresas e acompanhe seus respectivos status.</p>

        <section class="pa-kpis">
            <article class="pa-kpi">
                <span class="pa-kpi-label">Pagamentos recebidos</span>
                <strong class="pa-kpi-valor">R$ 48.720</strong>
                <span class="pa-kpi-meta">↑ 8,1% este mês</span>
            </article>
            <article class="pa-kpi">
                <span class="pa-kpi-label">Pagamentos aprovados</span>
                <strong class="pa-kpi-valor">172</strong>
                <span class="pa-kpi-meta">94,5% das transações</span>
            </article>
            <article class="pa-kpi">
                <span class="pa-kpi-label">Pendentes</span>
                <strong class="pa-kpi-valor">9</strong>
                <span class="pa-kpi-meta amarelo">Aguardando confirmação</span>
            </article>
            <article class="pa-kpi">
                <span class="pa-kpi-label">Falhas</span>
                <strong class="pa-kpi-valor">7</strong>
                <span class="pa-kpi-meta vermelho">Nos últimos 30 dias</span>
            </article>
        </section>

        <section class="pa-filtros">
            <input type="text" id="pa-busca" class="pa-busca" placeholder="Buscar empresa ou ID do pagamento..." />
            <select id="pa-plano" class="pa-select">
                <option value="Todos">Todos os planos</option>
                <option value="Gratuito">Gratuito</option>
                <option value="Profissional">Profissional</option>
                <option value="Empresarial/Educacional">Empresarial/Educacional</option>
            </select>
            <select id="pa-status" class="pa-select">
                <option value="Todos">Todos os status</option>
                <option value="Pago">Pago</option>
                <option value="Pendente">Pendente</option>
                <option value="Falhou">Falhou</option>
            </select>
            <select id="pa-periodo" class="pa-select">
                <option value="Todos">Todos os períodos</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
            </select>
            <button type="button" id="pa-exportar" class="pa-btn-exportar">↓ Exportar</button>
        </section>

        <section class="pa-tabela-card">
            <div class="pa-tabela-wrap">
                <table class="pa-tabela">
                    <thead>
                        <tr>
                            <th>ID do pagamento</th>
                            <th>Empresa / Instituição</th>
                            <th>Plano</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Forma de pagamento</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="pa-corpo"></tbody>
                </table>
            </div>
            <div class="pa-rodape" id="pa-rodape"></div>
        </section>
    `;

    function obterFiltrados() {
        return PAGAMENTOS_ADM_INICIAIS.filter((item) => {
            const termo = busca.trim().toLowerCase();
            const matchBusca =
                !termo ||
                item.empresa.toLowerCase().includes(termo) ||
                item.id.toLowerCase().includes(termo) ||
                item.cnpj.toLowerCase().includes(termo);
            const matchPlano = filtroPlano === 'Todos' || item.plano === filtroPlano;
            const matchStatus = filtroStatus === 'Todos' || item.status === filtroStatus;
            return matchBusca && matchPlano && matchStatus;
        });
    }

    function renderizarTabela() {
        const filtrados = obterFiltrados();
        const tbody = pagina.querySelector('#pa-corpo');

        if (!filtrados.length) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:2rem;color:#64748b;">Nenhum pagamento encontrado.</td></tr>`;
        } else {
            tbody.innerHTML = filtrados
                .map((item) => {
                    const classeStatus = item.status.toLowerCase();
                    return `
                        <tr class="pa-linha" data-id="${escapar(item.id)}">
                            <td><strong style="color:#0f172a;">#${escapar(item.id)}</strong></td>
                            <td>
                                <span class="pa-emp-nome">${escapar(item.empresa)}</span>
                                <span class="pa-emp-cnpj">CNPJ ${escapar(item.cnpj)}</span>
                            </td>
                            <td>${escapar(item.plano)}</td>
                            <td><strong style="color:#0f172a;">${formatarMoeda(item.valor)}</strong></td>
                            <td>${escapar(item.data)}</td>
                            <td>${escapar(item.formaPagamento)}</td>
                            <td><span class="pa-pill ${classeStatus}">${escapar(item.status)}</span></td>
                        </tr>
                    `;
                })
                .join('');
        }

        pagina.querySelector('#pa-rodape').innerHTML = `
            <span>Mostrando 1 a ${filtrados.length} de 188 pagamentos</span>
            <div class="pa-pag">
                <button type="button">&lt;</button>
                <button type="button" class="ativa">1</button>
                <button type="button">2</button>
                <button type="button">3</button>
                <button type="button">4</button>
                <button type="button">5</button>
                <button type="button">&gt;</button>
            </div>
        `;

        tbody.querySelectorAll('.pa-linha').forEach((tr) => {
            tr.addEventListener('click', () => {
                const alvo = PAGAMENTOS_ADM_INICIAIS.find((p) => p.id === tr.dataset.id);
                if (alvo) abrirPagamento(alvo);
            });
        });
    }

    pagina.querySelector('#pa-busca').addEventListener('input', (e) => {
        busca = e.target.value;
        renderizarTabela();
    });
    pagina.querySelector('#pa-plano').addEventListener('change', (e) => {
        filtroPlano = e.target.value;
        renderizarTabela();
    });
    pagina.querySelector('#pa-status').addEventListener('change', (e) => {
        filtroStatus = e.target.value;
        renderizarTabela();
    });
    pagina.querySelector('#pa-exportar').addEventListener('click', () => {
        const linhas = obterFiltrados().map(
            (i) => `${i.id};${i.empresa};${i.plano};${formatarMoeda(i.valor)};${i.data};${i.formaPagamento};${i.status}`
        );
        const csv = 'ID;Empresa;Plano;Valor;Data;FormaPagamento;Status\n' + linhas.join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pagamentos-conecta-talent.csv';
        a.click();
        URL.revokeObjectURL(url);
    });

    renderizarTabela();
    return pagina;
}

export function renderVisualizarPagamento(pagamentoId = 'PAY-10842', callbacks = {}) {
    const pagamento =
        PAGAMENTOS_ADM_INICIAIS.find((p) => p.id === pagamentoId) || PAGAMENTOS_ADM_INICIAIS[0];

    const voltar = callbacks.onVoltar || (() => {
        window.location.hash = '#/pagamentos';
    });

    const verEmpresa = callbacks.onVerEmpresa || (() => {
        window.location.hash = '#/usuarios';
    });

    const totalPago = Math.max(0, Number(pagamento.valor || 0) - Number(pagamento.desconto || 0) + Number(pagamento.taxas || 0));

    const pagina = document.createElement('section');
    pagina.className = 'pagina-visualizar-pagamento';

    pagina.innerHTML = `
        <style>
            .vp-breadcrumb { font-size: 0.85rem; color: #64748b; margin-bottom: 0.35rem; }
            .vp-titulo { margin: 0 0 0.25rem; font-size: 1.75rem; font-weight: 700; color: #0f172a; }
            .vp-subtitulo { margin: 0 0 1.5rem; font-size: 0.92rem; color: #64748b; }
            .vp-grid { display: grid; grid-template-columns: minmax(0, 1.75fr) minmax(290px, 1fr); gap: 1.5rem; align-items: start; }
            .vp-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.4rem; }
            .vp-card h2 { margin: 0 0 1rem; font-size: 0.98rem; font-weight: 700; color: #0f172a; }
            .vp-topo-pay { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #f1f5f9; gap: 0.75rem; }
            .vp-pay-info { display: flex; align-items: center; gap: 0.8rem; }
            .vp-icone-rs { width: 42px; height: 42px; border-radius: 10px; background: #dbeafe; color: #1d4ed8; font-weight: 700; font-size: 0.92rem; display: flex; align-items: center; justify-content: center; }
            .vp-pay-id { font-size: 1rem; font-weight: 700; color: #0f172a; display: block; }
            .vp-pay-sub { font-size: 0.78rem; color: #64748b; display: block; }
            .vp-badge { background: #dcfce7; color: #15803d; padding: 0.22rem 0.65rem; border-radius: 999px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; }
            .vp-badge.pendente { background: #fef3c7; color: #b45309; }
            .vp-badge.falhou { background: #fee2e2; color: #b91c1c; }
            .vp-dados-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem 1.5rem; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #f1f5f9; }
            .vp-campo small { display: block; font-size: 0.75rem; color: #64748b; margin-bottom: 0.2rem; }
            .vp-campo strong { font-size: 0.88rem; color: #0f172a; font-weight: 600; }
            .vp-valor-destaque { padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #f1f5f9; }
            .vp-valor-destaque small { display: block; font-size: 0.75rem; color: #64748b; margin-bottom: 0.2rem; }
            .vp-valor-destaque strong { font-size: 1.55rem; color: #1d4ed8; font-weight: 800; }
            .vp-valor-destaque span { font-size: 0.78rem; color: #64748b; margin-left: 0.25rem; }
            .vp-cartao-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.85rem 1rem; display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.15rem; }
            .vp-cartao-icone { width: 34px; height: 24px; border-radius: 6px; background: #fff; border: 1px solid #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: #0f172a; }
            .vp-acoes { display: flex; gap: 0.75rem; flex-wrap: wrap; }
            .vp-btn { background: #fff; border: 1px solid #cbd5e1; color: #334155; border-radius: 8px; padding: 0.58rem 1.05rem; font-size: 0.84rem; font-weight: 600; cursor: pointer; }
            .vp-btn:hover { background: #f8fafc; }
            .vp-col-direita { display: flex; flex-direction: column; gap: 1.25rem; }
            .vp-resumo-linha { display: flex; justify-content: space-between; font-size: 0.84rem; padding: 0.5rem 0; border-bottom: 1px solid #f1f5f9; }
            .vp-resumo-linha span:first-child { color: #64748b; }
            .vp-resumo-linha span:last-child { color: #0f172a; font-weight: 600; }
            .vp-resumo-total { display: flex; justify-content: space-between; font-size: 0.92rem; padding: 0.75rem 0; font-weight: 700; }
            .vp-resumo-total span:last-child { color: #16a34a; }
            .vp-aviso-azul { background: #eff6ff; border: 1px solid #dbeafe; color: #1e40af; border-radius: 8px; padding: 0.7rem 0.85rem; font-size: 0.77rem; line-height: 1.45; margin-top: 0.35rem; }
            .vp-timeline { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.9rem; }
            .vp-timeline li { display: flex; align-items: flex-start; gap: 0.65rem; }
            .vp-ponto { width: 8px; height: 8px; border-radius: 50%; background: #1d4ed8; margin-top: 0.35rem; flex-shrink: 0; }
            .vp-timeline strong { display: block; font-size: 0.84rem; color: #0f172a; }
            .vp-timeline small { display: block; font-size: 0.74rem; color: #64748b; }
            @media (max-width: 960px) { .vp-grid { grid-template-columns: 1fr; } }
            @media (max-width: 560px) { .vp-dados-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="vp-breadcrumb">Assinatura &gt; Pagamentos &gt; Visualizar pagamento</div>
        <h1 class="vp-titulo">Visualizar pagamento</h1>
        <p class="vp-subtitulo">Consulte os detalhes e o status da transação realizada pela empresa.</p>

        <div class="vp-grid">
            <section class="vp-card">
                <h2>Detalhes do pagamento</h2>
                <div class="vp-topo-pay">
                    <div class="vp-pay-info">
                        <span class="vp-icone-rs">R$</span>
                        <div>
                            <span class="vp-pay-id">#${escapar(pagamento.id)}</span>
                            <span class="vp-pay-sub">Pagamento realizado em ${escapar(pagamento.dataHora)}</span>
                        </div>
                    </div>
                    <span class="vp-badge ${pagamento.status.toLowerCase()}">${escapar(pagamento.status)}</span>
                </div>

                <div class="vp-dados-grid">
                    <div class="vp-campo"><small>Empresa / Instituição</small><strong>${escapar(pagamento.empresa)}</strong></div>
                    <div class="vp-campo"><small>CNPJ</small><strong>${escapar(pagamento.cnpj)}</strong></div>
                    <div class="vp-campo"><small>Plano</small><strong>${escapar(pagamento.plano)}</strong></div>
                    <div class="vp-campo"><small>Ciclo</small><strong>${escapar(pagamento.ciclo)}</strong></div>
                    <div class="vp-campo"><small>Data de pagamento</small><strong>${escapar(pagamento.data)}</strong></div>
                    <div class="vp-campo"><small>ID da transação</small><strong>${escapar(pagamento.transacaoId)}</strong></div>
                </div>

                <div class="vp-valor-destaque">
                    <small>Valor pago</small>
                    <strong>${formatarMoeda(totalPago)}</strong><span>BRL</span>
                </div>

                <small style="display:block;font-size:0.75rem;color:#64748b;margin-bottom:0.45rem;">Forma de pagamento</small>
                <div class="vp-cartao-box">
                    <span class="vp-cartao-icone">💳</span>
                    <div>
                        <strong style="display:block;font-size:0.86rem;color:#0f172a;">${escapar(pagamento.formaPagamento)}</strong>
                        <small style="font-size:0.75rem;color:#64748b;">${escapar(pagamento.detalhePagamento)}</small>
                    </div>
                </div>

                <div class="vp-acoes">
                    <button type="button" class="vp-btn" id="vp-ver-empresa">Ver empresa</button>
                    <button type="button" class="vp-btn" id="vp-voltar">Voltar para pagamentos</button>
                </div>
            </section>

            <div class="vp-col-direita">
                <section class="vp-card">
                    <h2>Resumo financeiro</h2>
                    <div class="vp-resumo-linha"><span>Valor da assinatura</span><span>${formatarMoeda(pagamento.valor)}</span></div>
                    <div class="vp-resumo-linha"><span>Desconto</span><span>${formatarMoeda(pagamento.desconto)}</span></div>
                    <div class="vp-resumo-linha"><span>Taxas</span><span>${formatarMoeda(pagamento.taxas)}</span></div>
                    <div class="vp-resumo-total"><span>Total pago</span><span>${formatarMoeda(totalPago)}</span></div>
                    <div class="vp-aviso-azul">
                        Pagamento aprovado e registrado com sucesso. Nenhuma ação administrativa é necessária para esta transação.
                    </div>
                </section>

                <section class="vp-card">
                    <h2>Histórico da transação</h2>
                    <ul class="vp-timeline">
                        ${pagamento.historico
                            .map(
                                (h) => `
                            <li>
                                <span class="vp-ponto"></span>
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

    pagina.querySelector('#vp-ver-empresa').addEventListener('click', verEmpresa);
    pagina.querySelector('#vp-voltar').addEventListener('click', voltar);
    return pagina;
}