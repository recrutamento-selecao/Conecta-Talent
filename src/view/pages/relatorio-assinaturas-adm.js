const ASSINATURAS_RELATORIO = [
    {
        id: 'escola-futuro',
        empresa: 'Escola Futuro',
        email: 'contato@escolafuturo.edu.br',
        responsavel: 'Juliana Martins',
        plano: 'Profissional',
        dataInicio: '10/09/2026',
        dataRenovacao: '10/10/2026',
        valor: 'R$ 199,90',
        status: 'Ativa',
        pagamento: 'Pago',
        formaPagamento: 'Cartão de crédito'
    },
    {
        id: 'tech-solucoes',
        empresa: 'Tech Soluções',
        email: 'contato@techsolucoes.com',
        responsavel: 'Rafael Costa',
        plano: 'Empresarial',
        dataInicio: '09/09/2026',
        dataRenovacao: '09/10/2026',
        valor: 'R$ 399,90',
        status: 'Ativa',
        pagamento: 'Pago',
        formaPagamento: 'Pix'
    },
    {
        id: 'inova-cursos',
        empresa: 'Inova Cursos',
        email: 'financeiro@inovacursos.com',
        responsavel: 'Carlos Mendes',
        plano: 'Empresarial',
        dataInicio: '08/09/2026',
        dataRenovacao: '08/10/2026',
        valor: 'R$ 399,90',
        status: 'Ativa',
        pagamento: 'Pago',
        formaPagamento: 'Boleto bancário'
    },
    {
        id: 'rh-educa',
        empresa: 'RH Educa',
        email: 'contato@rheduca.com',
        responsavel: 'Ana Alves',
        plano: 'Profissional',
        dataInicio: '22/08/2026',
        dataRenovacao: '22/09/2026',
        valor: 'R$ 199,90',
        status: 'Ativa',
        pagamento: 'Pago',
        formaPagamento: 'Cartão de crédito'
    },
    {
        id: 'gestao-talentos',
        empresa: 'Gestão Talentos',
        email: 'contato@gestaotalentos.com',
        responsavel: 'Bruno Almeida',
        plano: 'Profissional',
        dataInicio: '05/09/2026',
        dataRenovacao: '05/10/2026',
        valor: 'R$ 199,90',
        status: 'Ativa',
        pagamento: 'Pago',
        formaPagamento: 'Pix'
    },
    {
        id: 'centro-de-ensino',
        empresa: 'Centro de Ensino',
        email: 'contato@centroensino.com',
        responsavel: 'Diego Fernandes',
        plano: 'Profissional',
        dataInicio: '18/08/2026',
        dataRenovacao: '18/09/2026',
        valor: 'R$ 199,90',
        status: 'Ativa',
        pagamento: 'Pago',
        formaPagamento: 'Boleto bancário'
    },
    {
        id: 'colegio-horizonte',
        empresa: 'Colégio Horizonte',
        email: 'contato@colegiohorizonte.com',
        responsavel: 'Larissa Souza',
        plano: 'Gratuito',
        dataInicio: '08/09/2026',
        dataRenovacao: '—',
        valor: 'R$ 0,00',
        status: 'Ativa',
        pagamento: '—',
        formaPagamento: '—'
    },
    {
        id: 'educa-mais',
        empresa: 'Educa Mais',
        email: 'contato@educamais.com',
        responsavel: 'Fernanda Lima',
        plano: 'Profissional',
        dataInicio: '06/09/2026',
        dataRenovacao: '06/10/2026',
        valor: 'R$ 199,90',
        status: 'Pendente',
        pagamento: 'Pendente',
        formaPagamento: 'Cartão de crédito'
    },
    {
        id: 'escola-tec',
        empresa: 'Escola Tec',
        email: 'contato@escolatec.edu.br',
        responsavel: 'Camila Rocha',
        plano: 'Empresarial',
        dataInicio: '02/09/2026',
        dataRenovacao: '02/10/2026',
        valor: 'R$ 399,90',
        status: 'Cancelada',
        pagamento: '—',
        formaPagamento: 'Pix'
    },
    {
        id: 'nova-geracao',
        empresa: 'Nova Geração',
        email: 'contato@novageracao.com',
        responsavel: 'Thiago Pereira',
        plano: 'Gratuito',
        dataInicio: '25/08/2026',
        dataRenovacao: '—',
        valor: 'R$ 0,00',
        status: 'Inativa',
        pagamento: '—',
        formaPagamento: '—'
    }
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
    const estilo = mapa[plano] || 'background:#f1f5f9;color:#334155;';
    return `<span style="display:inline-block;padding:0.18rem 0.55rem;border-radius:999px;font-size:0.72rem;font-weight:600;${estilo}">${escapar(plano)}</span>`;
}

function pillStatus(valor) {
    if (!valor || valor === '—') return '<span style="color:#94a3b8;">—</span>';
    const mapa = {
        Ativa: 'background:#dcfce7;color:#15803d;',
        Pago: 'background:#dcfce7;color:#15803d;',
        Pendente: 'background:#fef3c7;color:#b45309;',
        Cancelada: 'background:#fee2e2;color:#b91c1c;',
        Inativa: 'background:#f3e8ff;color:#7e22ce;'
    };
    const estilo = mapa[valor] || 'background:#f1f5f9;color:#334155;';
    return `<span style="display:inline-block;padding:0.18rem 0.55rem;border-radius:999px;font-size:0.72rem;font-weight:600;${estilo}">${escapar(valor)}</span>`;
}

export function renderRelatorioAssinaturasAdm() {
    const pagina = document.createElement('section');
    pagina.className = 'pagina-relatorio-assinaturas-adm';

    let filtrosAtivos = {
        dataInicio: '2026-09-01',
        dataFim: '2026-09-30',
        plano: 'Todos',
        statusAssinatura: 'Todos',
        empresa: 'Todos',
        formaPagamento: 'Todos',
        situacaoPagamento: 'Todos',
        buscaLateral: '',
        buscaTabela: ''
    };

    pagina.innerHTML = `
        <style>
            .ras-breadcrumb { font-size: 0.85rem; color: #64748b; margin-bottom: 0.35rem; }
            .ras-titulo { margin: 0 0 0.2rem; font-size: 1.7rem; font-weight: 700; color: #0f172a; }
            .ras-subtitulo { margin: 0 0 1.35rem; font-size: 0.88rem; color: #64748b; }
            .ras-layout { display: grid; grid-template-columns: 270px minmax(0, 1fr); gap: 1.25rem; align-items: start; }
            .ras-filtros-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.1rem; }
            .ras-filtros-card h2 { margin: 0 0 0.15rem; font-size: 0.95rem; font-weight: 700; color: #0f172a; }
            .ras-filtros-sub { margin: 0 0 1rem; font-size: 0.74rem; color: #64748b; }
            .ras-campo { margin-bottom: 0.8rem; }
            .ras-label { display: block; font-size: 0.74rem; font-weight: 600; color: #334155; margin-bottom: 0.3rem; }
            .ras-datas { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 0.35rem; }
            .ras-datas span { font-size: 0.72rem; color: #64748b; }
            .ras-input, .ras-select { width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem; border: 1px solid #cbd5e1; border-radius: 7px; font-size: 0.78rem; color: #0f172a; background: #fff; }
            .ras-btn-gerar { width: 100%; background: #1d4ed8; color: #fff; border: none; border-radius: 8px; padding: 0.6rem; font-size: 0.82rem; font-weight: 600; cursor: pointer; margin-top: 0.25rem; }
            .ras-btn-gerar:hover { background: #1e40af; }
            .ras-btn-limpar { width: 100%; background: none; border: none; color: #1d4ed8; font-size: 0.76rem; font-weight: 600; cursor: pointer; margin-top: 0.55rem; }
            .ras-resultados-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
            .ras-resultados-topo { display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0.95rem 1.15rem; border-bottom: 1px solid #f1f5f9; flex-wrap: wrap; }
            .ras-resultados-titulo { font-size: 0.92rem; font-weight: 700; color: #0f172a; }
            .ras-resultados-titulo span { font-weight: 400; font-size: 0.78rem; color: #64748b; margin-left: 0.35rem; }
            .ras-acoes-topo { display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap; }
            .ras-busca-tabela { width: 230px; padding: 0.42rem 0.7rem; border: 1px solid #cbd5e1; border-radius: 7px; font-size: 0.78rem; }
            .ras-btn-exportar { background: #fff; border: 1px solid #cbd5e1; border-radius: 7px; padding: 0.42rem 0.8rem; font-size: 0.78rem; font-weight: 600; color: #334155; cursor: pointer; }
            .ras-tabela-wrap { overflow-x: auto; }
            .ras-tabela { width: 100%; border-collapse: collapse; font-size: 0.78rem; text-align: left; }
            .ras-tabela th { background: #f8fafc; color: #64748b; font-weight: 600; padding: 0.65rem 0.85rem; border-bottom: 1px solid #e2e8f0; white-space: nowrap; }
            .ras-tabela td { padding: 0.72rem 0.85rem; border-bottom: 1px solid #f1f5f9; color: #334155; vertical-align: middle; }
            .ras-emp-nome { font-weight: 600; color: #0f172a; display: block; }
            .ras-emp-email { font-size: 0.7rem; color: #94a3b8; display: block; }
            .ras-rodape { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1.15rem; font-size: 0.76rem; color: #64748b; flex-wrap: wrap; gap: 0.5rem; }
            .ras-pag { display: flex; gap: 0.25rem; }
            .ras-pag button { border: 1px solid #cbd5e1; background: #fff; color: #334155; border-radius: 6px; padding: 0.22rem 0.52rem; font-size: 0.74rem; cursor: pointer; }
            .ras-pag button.ativa { background: #1d4ed8; color: #fff; border-color: #1d4ed8; font-weight: 600; }
            @media (max-width: 960px) { .ras-layout { grid-template-columns: 1fr; } }
        </style>

        <div class="ras-breadcrumb">Relatório &gt; Relatório de assinaturas</div>
        <h1 class="ras-titulo">Relatórios de assinaturas</h1>
        <p class="ras-subtitulo">Acompanhe as assinaturas e planos da plataforma.</p>

        <div class="ras-layout">
            <aside class="ras-filtros-card">
                <h2>Filtros do relatório</h2>
                <p class="ras-filtros-sub">Selecione os filtros para gerar o relatório.</p>

                <div class="ras-campo">
                    <span class="ras-label">Período de assinatura</span>
                    <div class="ras-datas">
                        <input type="date" id="ras-data-inicio" class="ras-input" value="2026-09-01" />
                        <span>até</span>
                        <input type="date" id="ras-data-fim" class="ras-input" value="2026-09-30" />
                    </div>
                </div>

                <div class="ras-campo">
                    <label class="ras-label" for="ras-plano">Plano</label>
                    <select id="ras-plano" class="ras-select">
                        <option value="Todos">Todos</option>
                        <option value="Gratuito">Gratuito</option>
                        <option value="Profissional">Profissional</option>
                        <option value="Empresarial">Empresarial</option>
                    </select>
                </div>

                <div class="ras-campo">
                    <label class="ras-label" for="ras-status">Status da assinatura</label>
                    <select id="ras-status" class="ras-select">
                        <option value="Todos">Todos</option>
                        <option value="Ativa">Ativa</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Cancelada">Cancelada</option>
                        <option value="Inativa">Inativa</option>
                    </select>
                </div>

                <div class="ras-campo">
                    <label class="ras-label" for="ras-empresa">Empresa</label>
                    <select id="ras-empresa" class="ras-select">
                        <option value="Todos">Todas</option>
                        ${ASSINATURAS_RELATORIO.map((a) => `<option value="${escapar(a.empresa)}">${escapar(a.empresa)}</option>`).join('')}
                    </select>
                </div>

                <div class="ras-campo">
                    <label class="ras-label" for="ras-forma">Forma de pagamento</label>
                    <select id="ras-forma" class="ras-select">
                        <option value="Todos">Todas</option>
                        <option value="Cartão de crédito">Cartão de crédito</option>
                        <option value="Pix">Pix</option>
                        <option value="Boleto bancário">Boleto bancário</option>
                    </select>
                </div>

                <div class="ras-campo">
                    <label class="ras-label" for="ras-situacao">Situação do pagamento</label>
                    <select id="ras-situacao" class="ras-select">
                        <option value="Todos">Todas</option>
                        <option value="Pago">Pago</option>
                        <option value="Pendente">Pendente</option>
                    </select>
                </div>

                <div class="ras-campo">
                    <label class="ras-label" for="ras-busca-lat">Buscar por nome ou empresa</label>
                    <input type="text" id="ras-busca-lat" class="ras-input" placeholder="Nome da empresa..." />
                </div>

                <button type="button" id="ras-gerar" class="ras-btn-gerar">Gerar relatório</button>
                <button type="button" id="ras-limpar" class="ras-btn-limpar">↻ Limpar filtros</button>
            </aside>

            <section class="ras-resultados-card">
                <div class="ras-resultados-topo">
                    <div class="ras-resultados-titulo" id="ras-contador-topo">
                        Resultados do relatório <span>(18 assinaturas encontradas)</span>
                    </div>
                    <div class="ras-acoes-topo">
                        <input type="text" id="ras-busca-tab" class="ras-busca-tabela" placeholder="Buscar empresa, responsável ou e-mail..." />
                        <button type="button" id="ras-exportar" class="ras-btn-exportar">↓ Exportar</button>
                    </div>
                </div>

                <div class="ras-tabela-wrap">
                    <table class="ras-tabela">
                        <thead>
                            <tr>
                                <th>Empresa</th>
                                <th>Responsável</th>
                                <th>Plano</th>
                                <th>Data de início</th>
                                <th>Data de renovação</th>
                                <th>Valor</th>
                                <th>Status</th>
                                <th>Pagamento</th>
                            </tr>
                        </thead>
                        <tbody id="ras-corpo"></tbody>
                    </table>
                </div>

                <div class="ras-rodape" id="ras-rodape"></div>
            </section>
        </div>
    `;

    function obterFiltrados() {
        return ASSINATURAS_RELATORIO.filter((item) => {
            const bLat = filtrosAtivos.buscaLateral.trim().toLowerCase();
            const bTab = filtrosAtivos.buscaTabela.trim().toLowerCase();
            const matchLat = !bLat || item.empresa.toLowerCase().includes(bLat) || item.responsavel.toLowerCase().includes(bLat);
            const matchTab =
                !bTab ||
                item.empresa.toLowerCase().includes(bTab) ||
                item.responsavel.toLowerCase().includes(bTab) ||
                item.email.toLowerCase().includes(bTab);
            const matchPlano = filtrosAtivos.plano === 'Todos' || item.plano === filtrosAtivos.plano;
            const matchStatus = filtrosAtivos.statusAssinatura === 'Todos' || item.status === filtrosAtivos.statusAssinatura;
            const matchEmpresa = filtrosAtivos.empresa === 'Todos' || item.empresa === filtrosAtivos.empresa;
            const matchForma = filtrosAtivos.formaPagamento === 'Todos' || item.formaPagamento === filtrosAtivos.formaPagamento;
            const matchSit = filtrosAtivos.situacaoPagamento === 'Todos' || item.pagamento === filtrosAtivos.situacaoPagamento;
            return matchLat && matchTab && matchPlano && matchStatus && matchEmpresa && matchForma && matchSit;
        });
    }

    function renderizar() {
        const lista = obterFiltrados();
        const totalLabel = lista.length === ASSINATURAS_RELATORIO.length ? 18 : lista.length;

        pagina.querySelector('#ras-contador-topo').innerHTML = `
            Resultados do relatório <span>(${totalLabel} assinaturas encontradas)</span>
        `;

        pagina.querySelector('#ras-corpo').innerHTML = lista.length
            ? lista
                  .map(
                      (a) => `
                <tr>
                    <td>
                        <span class="ras-emp-nome">${escapar(a.empresa)}</span>
                        <span class="ras-emp-email">${escapar(a.email)}</span>
                    </td>
                    <td>${escapar(a.responsavel)}</td>
                    <td>${pillPlano(a.plano)}</td>
                    <td>${escapar(a.dataInicio)}</td>
                    <td>${escapar(a.dataRenovacao)}</td>
                    <td>${escapar(a.valor)}</td>
                    <td>${pillStatus(a.status)}</td>
                    <td>${pillStatus(a.pagamento)}</td>
                </tr>
            `
                  )
                  .join('')
            : `<tr><td colspan="8" style="text-align:center;padding:2rem;color:#64748b;">Nenhuma assinatura encontrada.</td></tr>`;

        pagina.querySelector('#ras-rodape').innerHTML = `
            <span>Total de registros: ${totalLabel}</span>
            <div class="ras-pag">
                <button type="button">&lt;</button>
                <button type="button" class="ativa">1</button>
                <button type="button">2</button>
                <button type="button">&gt;</button>
            </div>
        `;
    }

    pagina.querySelector('#ras-gerar').addEventListener('click', () => {
        filtrosAtivos = {
            ...filtrosAtivos,
            dataInicio: pagina.querySelector('#ras-data-inicio').value,
            dataFim: pagina.querySelector('#ras-data-fim').value,
            plano: pagina.querySelector('#ras-plano').value,
            statusAssinatura: pagina.querySelector('#ras-status').value,
            empresa: pagina.querySelector('#ras-empresa').value,
            formaPagamento: pagina.querySelector('#ras-forma').value,
            situacaoPagamento: pagina.querySelector('#ras-situacao').value,
            buscaLateral: pagina.querySelector('#ras-busca-lat').value
        };
        renderizar();
    });

    pagina.querySelector('#ras-limpar').addEventListener('click', () => {
        pagina.querySelector('#ras-data-inicio').value = '2026-09-01';
        pagina.querySelector('#ras-data-fim').value = '2026-09-30';
        pagina.querySelector('#ras-plano').value = 'Todos';
        pagina.querySelector('#ras-status').value = 'Todos';
        pagina.querySelector('#ras-empresa').value = 'Todos';
        pagina.querySelector('#ras-forma').value = 'Todos';
        pagina.querySelector('#ras-situacao').value = 'Todos';
        pagina.querySelector('#ras-busca-lat').value = '';
        pagina.querySelector('#ras-busca-tab').value = '';
        filtrosAtivos = {
            dataInicio: '2026-09-01',
            dataFim: '2026-09-30',
            plano: 'Todos',
            statusAssinatura: 'Todos',
            empresa: 'Todos',
            formaPagamento: 'Todos',
            situacaoPagamento: 'Todos',
            buscaLateral: '',
            buscaTabela: ''
        };
        renderizar();
    });

    pagina.querySelector('#ras-busca-tab').addEventListener('input', (e) => {
        filtrosAtivos.buscaTabela = e.target.value;
        renderizar();
    });

    pagina.querySelector('#ras-exportar').addEventListener('click', () => {
        const linhas = obterFiltrados().map(
            (a) => `${a.empresa};${a.responsavel};${a.plano};${a.dataInicio};${a.dataRenovacao};${a.valor};${a.status};${a.pagamento}`
        );
        const csv = 'Empresa;Responsavel;Plano;DataInicio;DataRenovacao;Valor;Status;Pagamento\n' + linhas.join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'relatorio-assinaturas.csv';
        link.click();
        URL.revokeObjectURL(url);
    });

    renderizar();
    return pagina;
}