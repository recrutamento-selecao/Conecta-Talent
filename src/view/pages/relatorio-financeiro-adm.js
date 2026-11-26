const FINANCEIRO_RELATORIO = [
    { empresa: 'Escola Futuro', email: 'contato@escolafuturo.edu.br', responsavel: 'Juliana Martins', plano: 'Profissional', dataPagamento: '10/09/2026', periodo: '10/09 a 10/10', valor: 'R$ 199,90', forma: 'Cartão de crédito', situacao: 'Pago' },
    { empresa: 'Tech Soluções', email: 'contato@techsolucoes.com', responsavel: 'Rafael Costa', plano: 'Empresarial', dataPagamento: '09/09/2026', periodo: '09/09 a 09/10', valor: 'R$ 399,90', forma: 'Pix', situacao: 'Pago' },
    { empresa: 'Inova Cursos', email: 'financeiro@inovacursos.com', responsavel: 'Carlos Mendes', plano: 'Empresarial', dataPagamento: '08/09/2026', periodo: '08/09 a 08/10', valor: 'R$ 399,90', forma: 'Boleto bancário', situacao: 'Pago' },
    { empresa: 'RH Educa', email: 'contato@rheduca.com', responsavel: 'Ana Alves', plano: 'Profissional', dataPagamento: '22/08/2026', periodo: '22/08 a 22/09', valor: 'R$ 199,90', forma: 'Cartão de crédito', situacao: 'Pago' },
    { empresa: 'Gestão Talentos', email: 'contato@gestaotalentos.com', responsavel: 'Bruno Almeida', plano: 'Profissional', dataPagamento: '05/09/2026', periodo: '05/09 a 05/10', valor: 'R$ 199,90', forma: 'Pix', situacao: 'Pago' },
    { empresa: 'Centro de Ensino', email: 'contato@centroensino.com', responsavel: 'Diego Fernandes', plano: 'Profissional', dataPagamento: '18/08/2026', periodo: '18/08 a 18/09', valor: 'R$ 199,90', forma: 'Boleto bancário', situacao: 'Pago' },
    { empresa: 'Colégio Horizonte', email: 'contato@colegiohorizonte.com', responsavel: 'Larissa Souza', plano: 'Gratuito', dataPagamento: '—', periodo: '—', valor: 'R$ 0,00', forma: '—', situacao: '—' },
    { empresa: 'Educa Mais', email: 'contato@educamais.com', responsavel: 'Fernanda Lima', plano: 'Profissional', dataPagamento: '06/09/2026', periodo: '06/09 a 06/10', valor: 'R$ 199,90', forma: 'Cartão de crédito', situacao: 'Pendente' },
    { empresa: 'Escola Tec', email: 'contato@escolatec.edu.br', responsavel: 'Camila Rocha', plano: 'Empresarial', dataPagamento: '02/09/2026', periodo: '02/09 a 02/10', valor: 'R$ 399,90', forma: 'Pix', situacao: 'Falha' },
    { empresa: 'Nova Geração', email: 'contato@novageracao.com', responsavel: 'Thiago Pereira', plano: 'Gratuito', dataPagamento: '—', periodo: '—', valor: 'R$ 0,00', forma: '—', situacao: '—' }
];

function escapar(texto = '') {
    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function pillPlano(plano) {
    const mapa = {
        Profissional: 'background:#dbeafe;color:#1d4ed8;',
        Empresarial: 'background:#ede9fe;color:#6d28d9;',
        Gratuito: 'background:#f1f5f9;color:#475569;'
    };
    return `<span style="display:inline-block;padding:0.18rem 0.55rem;border-radius:999px;font-size:0.72rem;font-weight:600;${mapa[plano] || 'background:#f1f5f9;color:#334155;'}">${escapar(plano)}</span>`;
}

function pillSituacao(sit) {
    if (!sit || sit === '—') return '<span style="color:#94a3b8;">—</span>';
    const mapa = {
        Pago: 'background:#dcfce7;color:#15803d;',
        Pendente: 'background:#fef3c7;color:#b45309;',
        Falha: 'background:#fee2e2;color:#b91c1c;'
    };
    return `<span style="display:inline-block;padding:0.18rem 0.55rem;border-radius:999px;font-size:0.72rem;font-weight:600;${mapa[sit] || 'background:#f1f5f9;color:#334155;'}">${escapar(sit)}</span>`;
}

export function renderRelatorioFinanceiroAdm() {
    const pagina = document.createElement('section');
    pagina.className = 'pagina-relatorio-financeiro-adm';

    let filtros = {
        plano: 'Todos',
        statusAssinatura: 'Todos',
        situacaoPagamento: 'Todos',
        formaPagamento: 'Todos',
        empresa: 'Todos',
        buscaLat: '',
        buscaTab: ''
    };

    pagina.innerHTML = `
        <style>
            .rfi-breadcrumb { font-size: 0.85rem; color: #64748b; margin-bottom: 0.35rem; }
            .rfi-titulo { margin: 0 0 0.2rem; font-size: 1.7rem; font-weight: 700; color: #0f172a; }
            .rfi-subtitulo { margin: 0 0 1.35rem; font-size: 0.88rem; color: #64748b; }
            .rfi-layout { display: grid; grid-template-columns: 270px minmax(0, 1fr); gap: 1.25rem; align-items: start; }
            .rfi-filtros-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.1rem; }
            .rfi-filtros-card h2 { margin: 0 0 0.15rem; font-size: 0.95rem; font-weight: 700; color: #0f172a; }
            .rfi-filtros-sub { margin: 0 0 1rem; font-size: 0.74rem; color: #64748b; }
            .rfi-campo { margin-bottom: 0.8rem; }
            .rfi-label { display: block; font-size: 0.74rem; font-weight: 600; color: #334155; margin-bottom: 0.3rem; }
            .rfi-datas { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 0.35rem; }
            .rfi-datas span { font-size: 0.72rem; color: #64748b; }
            .rfi-input, .rfi-select { width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem; border: 1px solid #cbd5e1; border-radius: 7px; font-size: 0.78rem; color: #0f172a; background: #fff; }
            .rfi-btn-gerar { width: 100%; background: #1d4ed8; color: #fff; border: none; border-radius: 8px; padding: 0.6rem; font-size: 0.82rem; font-weight: 600; cursor: pointer; margin-top: 0.25rem; }
            .rfi-btn-gerar:hover { background: #1e40af; }
            .rfi-btn-limpar { width: 100%; background: none; border: none; color: #1d4ed8; font-size: 0.76rem; font-weight: 600; cursor: pointer; margin-top: 0.55rem; }
            .rfi-col-dir { display: flex; flex-direction: column; gap: 1rem; }
            .rfi-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.85rem; }
            .rfi-kpi { border-radius: 10px; padding: 0.95rem 1.05rem; border: 1px solid #e2e8f0; }
            .rfi-kpi.azul { background: #eff6ff; border-color: #bfdbfe; }
            .rfi-kpi.verde { background: #f0fdf4; border-color: #bbf7d0; }
            .rfi-kpi.amarelo { background: #fefce8; border-color: #fde047; }
            .rfi-kpi.vermelho { background: #fef2f2; border-color: #fecaca; }
            .rfi-kpi-topo { display: flex; align-items: center; gap: 0.45rem; font-size: 0.76rem; font-weight: 600; color: #334155; margin-bottom: 0.35rem; }
            .rfi-kpi-valor { font-size: 1.25rem; font-weight: 800; color: #0f172a; display: block; margin-bottom: 0.25rem; }
            .rfi-kpi-meta { font-size: 0.7rem; font-weight: 500; }
            .rfi-kpi.azul .rfi-kpi-meta, .rfi-kpi.verde .rfi-kpi-meta { color: #15803d; }
            .rfi-kpi.amarelo .rfi-kpi-meta { color: #b45309; }
            .rfi-kpi.vermelho .rfi-kpi-meta { color: #dc2626; }
            .rfi-resultados-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
            .rfi-resultados-topo { display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0.95rem 1.15rem; border-bottom: 1px solid #f1f5f9; flex-wrap: wrap; }
            .rfi-resultados-titulo { font-size: 0.92rem; font-weight: 700; color: #0f172a; }
            .rfi-resultados-titulo span { font-weight: 400; font-size: 0.78rem; color: #64748b; margin-left: 0.35rem; }
            .rfi-busca-tabela { width: 250px; padding: 0.42rem 0.7rem; border: 1px solid #cbd5e1; border-radius: 7px; font-size: 0.78rem; }
            .rfi-tabela-wrap { overflow-x: auto; }
            .rfi-tabela { width: 100%; border-collapse: collapse; font-size: 0.78rem; text-align: left; }
            .rfi-tabela th { background: #f8fafc; color: #64748b; font-weight: 600; padding: 0.65rem 0.85rem; border-bottom: 1px solid #e2e8f0; white-space: nowrap; }
            .rfi-tabela td { padding: 0.72rem 0.85rem; border-bottom: 1px solid #f1f5f9; color: #334155; vertical-align: middle; }
            .rfi-emp-nome { font-weight: 600; color: #0f172a; display: block; }
            .rfi-emp-email { font-size: 0.7rem; color: #94a3b8; display: block; }
            .rfi-rodape { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1.15rem; font-size: 0.76rem; color: #64748b; flex-wrap: wrap; gap: 0.5rem; }
            .rfi-pag { display: flex; gap: 0.25rem; }
            .rfi-pag button { border: 1px solid #cbd5e1; background: #fff; color: #334155; border-radius: 6px; padding: 0.22rem 0.52rem; font-size: 0.74rem; cursor: pointer; }
            .rfi-pag button.ativa { background: #1d4ed8; color: #fff; border-color: #1d4ed8; font-weight: 600; }
            @media (max-width: 1100px) { .rfi-kpis { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 960px) { .rfi-layout { grid-template-columns: 1fr; } }
            @media (max-width: 560px) { .rfi-kpis { grid-template-columns: 1fr; } }
        </style>

        <div class="rfi-breadcrumb">Relatório &gt; Relatório financeiro</div>
        <h1 class="rfi-titulo">Relatório financeiro</h1>
        <p class="rfi-subtitulo">Acompanhe as receitas, pagamentos e o desempenho financeiro da plataforma.</p>

        <div class="rfi-layout">
            <aside class="rfi-filtros-card">
                <h2>Filtros do relatório</h2>
                <p class="rfi-filtros-sub">Selecione os filtros para gerar o relatório.</p>

                <div class="rfi-campo">
                    <span class="rfi-label">Período de pagamento</span>
                    <div class="rfi-datas">
                        <input type="date" class="rfi-input" value="2026-09-01" />
                        <span>até</span>
                        <input type="date" class="rfi-input" value="2026-09-30" />
                    </div>
                </div>

                <div class="rfi-campo">
                    <label class="rfi-label" for="rfi-plano">Plano</label>
                    <select id="rfi-plano" class="rfi-select">
                        <option value="Todos">Todos</option>
                        <option value="Gratuito">Gratuito</option>
                        <option value="Profissional">Profissional</option>
                        <option value="Empresarial">Empresarial</option>
                    </select>
                </div>

                <div class="rfi-campo">
                    <label class="rfi-label" for="rfi-status-ass">Status da assinatura</label>
                    <select id="rfi-status-ass" class="rfi-select">
                        <option value="Todos">Todos</option>
                        <option value="Ativa">Ativa</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>

                <div class="rfi-campo">
                    <label class="rfi-label" for="rfi-situacao">Situação do pagamento</label>
                    <select id="rfi-situacao" class="rfi-select">
                        <option value="Todos">Todas</option>
                        <option value="Pago">Pago</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Falha">Falha</option>
                    </select>
                </div>

                <div class="rfi-campo">
                    <label class="rfi-label" for="rfi-forma">Forma de pagamento</label>
                    <select id="rfi-forma" class="rfi-select">
                        <option value="Todos">Todas</option>
                        <option value="Cartão de crédito">Cartão de crédito</option>
                        <option value="Pix">Pix</option>
                        <option value="Boleto bancário">Boleto bancário</option>
                    </select>
                </div>

                <div class="rfi-campo">
                    <label class="rfi-label" for="rfi-empresa">Empresa</label>
                    <select id="rfi-empresa" class="rfi-select">
                        <option value="Todos">Todas</option>
                        ${FINANCEIRO_RELATORIO.map((f) => `<option value="${escapar(f.empresa)}">${escapar(f.empresa)}</option>`).join('')}
                    </select>
                </div>

                <div class="rfi-campo">
                    <label class="rfi-label" for="rfi-busca-lat">Buscar por empresa ou responsável</label>
                    <input type="text" id="rfi-busca-lat" class="rfi-input" placeholder="Nome da empresa ou responsável..." />
                </div>

                <button type="button" id="rfi-gerar" class="rfi-btn-gerar">Gerar relatório</button>
                <button type="button" id="rfi-limpar" class="rfi-btn-limpar">↻ Limpar filtros</button>
            </aside>

            <div class="rfi-col-dir">
                <section class="rfi-kpis">
                    <article class="rfi-kpi azul">
                        <div class="rfi-kpi-topo"><span>$</span><span>Receita total</span></div>
                        <strong class="rfi-kpi-valor">R$ 12.480,00</strong>
                        <span class="rfi-kpi-meta">↑ 12% em relação ao período anterior</span>
                    </article>
                    <article class="rfi-kpi verde">
                        <div class="rfi-kpi-topo"><span>✓</span><span>Pagamentos realizados</span></div>
                        <strong class="rfi-kpi-valor">R$ 11.680,00</strong>
                        <span class="rfi-kpi-meta">↑ 10% em relação ao período anterior</span>
                    </article>
                    <article class="rfi-kpi amarelo">
                        <div class="rfi-kpi-topo"><span>◔</span><span>Pagamentos pendentes</span></div>
                        <strong class="rfi-kpi-valor">R$ 399,90</strong>
                        <span class="rfi-kpi-meta">↑ 5% em relação ao período anterior</span>
                    </article>
                    <article class="rfi-kpi vermelho">
                        <div class="rfi-kpi-topo"><span>✕</span><span>Pagamentos com falha</span></div>
                        <strong class="rfi-kpi-valor">R$ 399,90</strong>
                        <span class="rfi-kpi-meta">↓ 8% em relação ao período anterior</span>
                    </article>
                </section>

                <section class="rfi-resultados-card">
                    <div class="rfi-resultados-topo">
                        <div class="rfi-resultados-titulo" id="rfi-contador-topo">
                            Resultados do relatório <span>(18 registros encontrados)</span>
                        </div>
                        <input type="text" id="rfi-busca-tab" class="rfi-busca-tabela" placeholder="Buscar empresa, responsável ou número do pagamento..." />
                    </div>

                    <div class="rfi-tabela-wrap">
                        <table class="rfi-tabela">
                            <thead>
                                <tr>
                                    <th>Empresa</th>
                                    <th>Responsável</th>
                                    <th>Plano</th>
                                    <th>Data do pagamento</th>
                                    <th>Período</th>
                                    <th>Valor</th>
                                    <th>Forma de pagamento</th>
                                    <th>Situação</th>
                                </tr>
                            </thead>
                            <tbody id="rfi-corpo"></tbody>
                        </table>
                    </div>

                    <div class="rfi-rodape" id="rfi-rodape"></div>
                </section>
            </div>
        </div>
    `;

    function obterFiltrados() {
        return FINANCEIRO_RELATORIO.filter((item) => {
            const bLat = filtros.buscaLat.trim().toLowerCase();
            const bTab = filtros.buscaTab.trim().toLowerCase();
            const matchLat = !bLat || item.empresa.toLowerCase().includes(bLat) || item.responsavel.toLowerCase().includes(bLat);
            const matchTab = !bTab || item.empresa.toLowerCase().includes(bTab) || item.responsavel.toLowerCase().includes(bTab) || item.email.toLowerCase().includes(bTab);
            const matchPlano = filtros.plano === 'Todos' || item.plano === filtros.plano;
            const matchSit = filtros.situacaoPagamento === 'Todos' || item.situacao === filtros.situacaoPagamento;
            const matchForma = filtros.formaPagamento === 'Todos' || item.forma === filtros.formaPagamento;
            const matchEmp = filtros.empresa === 'Todos' || item.empresa === filtros.empresa;
            return matchLat && matchTab && matchPlano && matchSit && matchForma && matchEmp;
        });
    }

    function renderizar() {
        const lista = obterFiltrados();
        const totalLabel = lista.length === FINANCEIRO_RELATORIO.length ? 18 : lista.length;

        pagina.querySelector('#rfi-contador-topo').innerHTML = `
            Resultados do relatório <span>(${totalLabel} registros encontrados)</span>
        `;

        pagina.querySelector('#rfi-corpo').innerHTML = lista.length
            ? lista
                  .map(
                      (f) => `
                <tr>
                    <td>
                        <span class="rfi-emp-nome">${escapar(f.empresa)}</span>
                        <span class="rfi-emp-email">${escapar(f.email)}</span>
                    </td>
                    <td>${escapar(f.responsavel)}</td>
                    <td>${pillPlano(f.plano)}</td>
                    <td>${escapar(f.dataPagamento)}</td>
                    <td>${escapar(f.periodo)}</td>
                    <td>${escapar(f.valor)}</td>
                    <td>${escapar(f.forma)}</td>
                    <td>${pillSituacao(f.situacao)}</td>
                </tr>
            `
                  )
                  .join('')
            : `<tr><td colspan="8" style="text-align:center;padding:2rem;color:#64748b;">Nenhum registro encontrado.</td></tr>`;

        pagina.querySelector('#rfi-rodape').innerHTML = `
            <span>Total de registros: ${totalLabel}</span>
            <div class="rfi-pag">
                <button type="button">&lt;</button>
                <button type="button" class="ativa">1</button>
                <button type="button">2</button>
                <button type="button">&gt;</button>
            </div>
        `;
    }

    pagina.querySelector('#rfi-gerar').addEventListener('click', () => {
        filtros = {
            ...filtros,
            plano: pagina.querySelector('#rfi-plano').value,
            statusAssinatura: pagina.querySelector('#rfi-status-ass').value,
            situacaoPagamento: pagina.querySelector('#rfi-situacao').value,
            formaPagamento: pagina.querySelector('#rfi-forma').value,
            empresa: pagina.querySelector('#rfi-empresa').value,
            buscaLat: pagina.querySelector('#rfi-busca-lat').value
        };
        renderizar();
    });

    pagina.querySelector('#rfi-limpar').addEventListener('click', () => {
        pagina.querySelector('#rfi-plano').value = 'Todos';
        pagina.querySelector('#rfi-status-ass').value = 'Todos';
        pagina.querySelector('#rfi-situacao').value = 'Todos';
        pagina.querySelector('#rfi-forma').value = 'Todos';
        pagina.querySelector('#rfi-empresa').value = 'Todos';
        pagina.querySelector('#rfi-busca-lat').value = '';
        pagina.querySelector('#rfi-busca-tab').value = '';
        filtros = { plano: 'Todos', statusAssinatura: 'Todos', situacaoPagamento: 'Todos', formaPagamento: 'Todos', empresa: 'Todos', buscaLat: '', buscaTab: '' };
        renderizar();
    });

    pagina.querySelector('#rfi-busca-tab').addEventListener('input', (e) => {
        filtros.buscaTab = e.target.value;
        renderizar();
    });

    renderizar();
    return pagina;
}