export const PLANOS_ADM_INICIAIS = [
    {
        id: 'gratuito',
        nome: 'Gratuito',
        descricao: 'Ideal para pequenas instituições que estão começando.',
        precoMensal: 0,
        precoAnual: null,
        descontoAnual: '',
        recrutadores: 1,
        vagas: 5,
        candidatos: 100,
        recursos: [
            'Banco de talentos',
            'Publicação de vagas',
            'Processo seletivo básico',
            'Gerenciamento de candidatos'
        ],
        totalRecursosExibidos: 3,
        empresas: 42,
        status: 'Ativo',
        tipo: 'Gratuito'
    },
    {
        id: 'profissional',
        nome: 'Profissional',
        descricao: 'Plano completo para empresas em crescimento.',
        precoMensal: 149.9,
        precoAnual: 1499.0,
        descontoAnual: '-17%',
        recrutadores: 5,
        vagas: 50,
        candidatos: 1000,
        recursos: [
            'Banco de talentos',
            'Publicação de vagas',
            'Gerenciamento de candidatos',
            'Processo seletivo básico',
            'Relatórios avançados',
            'Integração com testes'
        ],
        totalRecursosExibidos: 6,
        empresas: 68,
        status: 'Ativo',
        tipo: 'Profissional'
    },
    {
        id: 'empresarial-educacional',
        nome: 'Empresarial / Educacional',
        descricao: 'Solução completa para grandes instituições de ensino.',
        precoMensal: 349.9,
        precoAnual: 3499.0,
        descontoAnual: '-17%',
        recrutadores: 'Ilimitados',
        vagas: 'Ilimitadas',
        candidatos: 'Ilimitados',
        recursos: [
            'Todos os recursos do Profissional',
            'Suporte dedicado',
            'Personalização da plataforma',
            'Banco de talentos',
            'Publicação de vagas',
            'Gerenciamento de candidatos',
            'Processo seletivo básico',
            'Relatórios avançados',
            'API e integrações'
        ],
        totalRecursosExibidos: 9,
        empresas: 76,
        status: 'Ativo',
        tipo: 'Empresarial / Educacional'
    }
];

function formatarMoeda(valor) {
    if (valor === null || valor === undefined || Number.isNaN(Number(valor))) return '—';
    return Number(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function formatarLimite(valor, singular, plural) {
    if (typeof valor === 'string') return `Recrutadores ${valor.toLowerCase()}`.replace(/^recrutadores /, '');
    return `${Number(valor).toLocaleString('pt-BR')} ${Number(valor) === 1 ? singular : plural}`;
}

function escapar(texto = '') {
    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export function renderGerenciarPlanos(planosData = PLANOS_ADM_INICIAIS, callbacks = {}) {
    const pagina = document.createElement('section');
    pagina.className = 'pagina-gerenciar-planos';

    let planos = planosData.map((p) => ({ ...p, recursos: [...(p.recursos || [])] }));
    let busca = '';
    let filtroStatus = 'Todos';
    let filtroTipo = 'Todos';

    const irParaNovoPlano = callbacks.onNovoPlano || (() => {
        window.location.hash = '#/planos/novo';
    });

    const irParaEditarPlano = callbacks.onEditarPlano || ((plano) => {
        window.location.hash = `#/planos/editar/${encodeURIComponent(plano.id)}`;
    });

    pagina.innerHTML = `
        <style>
            .gp-breadcrumb { font-size: 0.85rem; color: #64748b; margin-bottom: 0.35rem; }
            .gp-topo { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
            .gp-titulo { margin: 0 0 0.25rem; font-size: 1.75rem; font-weight: 700; color: #0f172a; }
            .gp-subtitulo { margin: 0; font-size: 0.92rem; color: #64748b; }
            .gp-btn-primario { display: inline-flex; align-items: center; gap: 0.45rem; background: #1d4ed8; color: #fff; border: none; border-radius: 8px; padding: 0.65rem 1.15rem; font-size: 0.88rem; font-weight: 600; cursor: pointer; }
            .gp-btn-primario:hover { background: #1e40af; }
            .gp-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.25rem; }
            .gp-kpi-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.1rem 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; }
            .gp-kpi-topo { display: flex; align-items: center; gap: 0.6rem; color: #64748b; font-size: 0.82rem; font-weight: 500; }
            .gp-kpi-icone { width: 32px; height: 32px; border-radius: 8px; background: #eff6ff; color: #1d4ed8; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; }
            .gp-kpi-valor { font-size: 1.45rem; font-weight: 700; color: #0f172a; }
            .gp-kpi-meta { font-size: 0.75rem; color: #16a34a; font-weight: 600; }
            .gp-kpi-meta.neutro { color: #64748b; font-weight: 500; }
            .gp-filtros { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0.9rem 1.15rem; display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
            .gp-busca { flex: 1 1 260px; padding: 0.55rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.86rem; color: #0f172a; }
            .gp-select { padding: 0.55rem 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; background: #fff; color: #334155; }
            .gp-limpar { background: transparent; border: none; color: #1d4ed8; font-weight: 600; font-size: 0.84rem; cursor: pointer; padding: 0.35rem 0.5rem; }
            .gp-tabela-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
            .gp-tabela-wrap { overflow-x: auto; }
            .gp-tabela { width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left; }
            .gp-tabela th { background: #f8fafc; color: #64748b; font-size: 0.75rem; font-weight: 600; padding: 0.8rem 1rem; border-bottom: 1px solid #e2e8f0; }
            .gp-tabela td { padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; vertical-align: top; }
            .gp-plano-nome { font-weight: 700; color: #0f172a; font-size: 0.92rem; display: block; margin-bottom: 0.2rem; }
            .gp-plano-desc { font-size: 0.78rem; color: #64748b; display: block; max-width: 240px; line-height: 1.4; }
            .gp-preco-destaque { font-weight: 700; color: #0f172a; font-size: 0.9rem; display: block; }
            .gp-desconto { display: inline-block; margin-top: 0.25rem; background: #dcfce7; color: #15803d; font-size: 0.72rem; font-weight: 700; padding: 0.1rem 0.45rem; border-radius: 999px; }
            .gp-limites-lista { list-style: none; margin: 0; padding: 0; font-size: 0.8rem; color: #475569; line-height: 1.5; }
            .gp-recursos-lista { list-style: none; margin: 0; padding: 0; font-size: 0.8rem; color: #334155; line-height: 1.5; }
            .gp-check-verde { color: #16a34a; font-weight: 700; margin-right: 0.25rem; }
            .gp-ver-todos { background: none; border: none; padding: 0; margin-top: 0.2rem; color: #1d4ed8; font-size: 0.78rem; font-weight: 600; cursor: pointer; }
            .gp-status-acoes { display: flex; align-items: center; gap: 0.5rem; }
            .gp-badge-ativo { background: #dcfce7; color: #15803d; padding: 0.2rem 0.65rem; border-radius: 999px; font-size: 0.74rem; font-weight: 600; }
            .gp-badge-inativo { background: #f1f5f9; color: #64748b; padding: 0.2rem 0.65rem; border-radius: 999px; font-size: 0.74rem; font-weight: 600; }
            .gp-btn-icone { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.35rem 0.5rem; cursor: pointer; font-size: 0.85rem; color: #334155; }
            .gp-btn-icone:hover { background: #f8fafc; }
            .gp-rodape { display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 1rem; font-size: 0.8rem; color: #64748b; flex-wrap: wrap; gap: 0.5rem; }
            .gp-paginacao { display: flex; gap: 0.35rem; align-items: center; }
            .gp-pag-btn { border: 1px solid #cbd5e1; background: #fff; color: #334155; border-radius: 6px; padding: 0.3rem 0.65rem; font-size: 0.8rem; cursor: pointer; }
            .gp-pag-btn.ativa { background: #1d4ed8; color: #fff; border-color: #1d4ed8; font-weight: 600; }
            @media (max-width: 1024px) { .gp-kpis { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 640px) { .gp-kpis { grid-template-columns: 1fr; } }
        </style>

        <div class="gp-breadcrumb">Planos &gt; Gerenciar planos</div>
        <div class="gp-topo">
            <div>
                <h1 class="gp-titulo">Gerenciar planos</h1>
                <p class="gp-subtitulo">Visualize, crie e gerencie os planos de assinatura da plataforma.</p>
            </div>
            <button type="button" class="gp-btn-primario" id="gp-btn-novo-plano">+ Novo plano</button>
        </div>

        <section class="gp-kpis" id="gp-kpis"></section>

        <section class="gp-filtros">
            <input type="text" id="gp-busca" class="gp-busca" placeholder="Buscar por nome ou descrição do plano..." />
            <select id="gp-filtro-status" class="gp-select">
                <option value="Todos">Status: Todos</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
            </select>
            <select id="gp-filtro-tipo" class="gp-select">
                <option value="Todos">Tipo de plano: Todos</option>
                <option value="Gratuito">Gratuito</option>
                <option value="Profissional">Profissional</option>
                <option value="Empresarial / Educacional">Empresarial / Educacional</option>
            </select>
            <button type="button" id="gp-limpar" class="gp-limpar">↻ Limpar filtros</button>
        </section>

        <section class="gp-tabela-card">
            <div class="gp-tabela-wrap">
                <table class="gp-tabela">
                    <thead>
                        <tr>
                            <th>Plano</th>
                            <th>Preço mensal</th>
                            <th>Preço anual</th>
                            <th>Limites</th>
                            <th>Recursos principais</th>
                            <th>Empresas</th>
                            <th>Status / Ações</th>
                        </tr>
                    </thead>
                    <tbody id="gp-corpo"></tbody>
                </table>
            </div>
            <div class="gp-rodape" id="gp-rodape"></div>
        </section>
    `;

    function renderizarKpis() {
        const ativos = planos.filter((p) => p.status === 'Ativo').length;
        const inativos = planos.length - ativos;
        const totalEmpresas = planos.reduce((acc, p) => acc + Number(p.empresas || 0), 0);

        pagina.querySelector('#gp-kpis').innerHTML = `
            <article class="gp-kpi-card">
                <div class="gp-kpi-topo"><span class="gp-kpi-icone">□</span><span>Total de planos</span></div>
                <strong class="gp-kpi-valor">${planos.length}</strong>
                <span class="gp-kpi-meta neutro">${ativos} ativos e ${inativos} inativo${inativos === 1 ? '' : 's'}</span>
            </article>
            <article class="gp-kpi-card">
                <div class="gp-kpi-topo"><span class="gp-kpi-icone">⊞</span><span>Empresas ativas</span></div>
                <strong class="gp-kpi-valor">${totalEmpresas || 128}</strong>
                <span class="gp-kpi-meta">↑ 12% nos últimos 30 dias</span>
            </article>
            <article class="gp-kpi-card">
                <div class="gp-kpi-topo"><span class="gp-kpi-icone">$</span><span>Receita mensal</span></div>
                <strong class="gp-kpi-valor">R$ 42.350,00</strong>
                <span class="gp-kpi-meta">↑ 18% nos últimos 30 dias</span>
            </article>
            <article class="gp-kpi-card">
                <div class="gp-kpi-topo"><span class="gp-kpi-icone">▣</span><span>Assinaturas ativas</span></div>
                <strong class="gp-kpi-valor">186</strong>
                <span class="gp-kpi-meta">↑ 10% nos últimos 30 dias</span>
            </article>
        `;
    }

    function obterFiltrados() {
        return planos.filter((p) => {
            const termo = busca.trim().toLowerCase();
            const matchBusca =
                !termo ||
                p.nome.toLowerCase().includes(termo) ||
                p.descricao.toLowerCase().includes(termo);
            const matchStatus = filtroStatus === 'Todos' || p.status === filtroStatus;
            const matchTipo = filtroTipo === 'Todos' || p.tipo === filtroTipo;
            return matchBusca && matchStatus && matchTipo;
        });
    }

    function renderizarTabela() {
        const filtrados = obterFiltrados();
        const tbody = pagina.querySelector('#gp-corpo');

        if (!filtrados.length) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:2rem;color:#64748b;">Nenhum plano encontrado.</td></tr>`;
        } else {
            tbody.innerHTML = filtrados
                .map((plano) => {
                    const qtdExibida = Math.min(3, plano.recursos.length);
                    const itensRecurso = plano.recursos
                        .slice(0, qtdExibida)
                        .map((rec) => `<li><span class="gp-check-verde">✓</span>${escapar(rec)}</li>`)
                        .join('');

                    const totalLabel = plano.totalRecursosExibidos || plano.recursos.length;
                    const badgeClass = plano.status === 'Ativo' ? 'gp-badge-ativo' : 'gp-badge-inativo';

                    return `
                        <tr data-id="${escapar(plano.id)}">
                            <td>
                                <span class="gp-plano-nome">${escapar(plano.nome)}</span>
                                <span class="gp-plano-desc">${escapar(plano.descricao)}</span>
                            </td>
                            <td><span class="gp-preco-destaque">${formatarMoeda(plano.precoMensal)}</span></td>
                            <td>
                                ${
                                    plano.precoAnual
                                        ? `<span class="gp-preco-destaque">${formatarMoeda(plano.precoAnual)}</span>
                                           <span class="gp-desconto">${escapar(plano.descontoAnual || '-17%')}</span>`
                                        : '—'
                                }
                            </td>
                            <td>
                                <ul class="gp-limites-lista">
                                    <li>${formatarLimite(plano.recrutadores, 'recrutador', 'recrutadores')}</li>
                                    <li>${formatarLimite(plano.vagas, 'vaga', 'vagas')}</li>
                                    <li>${formatarLimite(plano.candidatos, 'candidato', 'candidatos')}</li>
                                </ul>
                            </td>
                            <td>
                                <ul class="gp-recursos-lista">
                                    ${itensRecurso}
                                </ul>
                                <button type="button" class="gp-ver-todos" data-ver-todos="${escapar(plano.id)}">
                                    ✓ Ver todos os recursos (${totalLabel})
                                </button>
                            </td>
                            <td><strong style="color:#0f172a;">${Number(plano.empresas || 0)}</strong></td>
                            <td>
                                <div class="gp-status-acoes">
                                    <span class="${badgeClass}">${escapar(plano.status)}</span>
                                    <button type="button" class="gp-btn-icone gp-btn-editar" data-editar="${escapar(plano.id)}" title="Editar plano">✏️</button>
                                    <button type="button" class="gp-btn-icone gp-btn-status" data-status="${escapar(plano.id)}" title="Alternar status">⋮</button>
                                </div>
                            </td>
                        </tr>
                    `;
                })
                .join('');
        }

        pagina.querySelector('#gp-rodape').innerHTML = `
            <span>Mostrando 1 a ${filtrados.length} de ${planos.length} planos</span>
            <div class="gp-paginacao">
                <button type="button" class="gp-pag-btn" disabled>&lt;</button>
                <button type="button" class="gp-pag-btn ativa">1</button>
                <button type="button" class="gp-pag-btn" disabled>&gt;</button>
            </div>
        `;

        tbody.querySelectorAll('.gp-ver-todos').forEach((btn) => {
            btn.addEventListener('click', () => {
                const alvo = planos.find((p) => p.id === btn.dataset.verTodos);
                if (!alvo) return;
                const ul = btn.previousElementSibling;
                ul.innerHTML = alvo.recursos
                    .map((rec) => `<li><span class="gp-check-verde">✓</span>${escapar(rec)}</li>`)
                    .join('');
                btn.remove();
            });
        });

        tbody.querySelectorAll('.gp-btn-editar').forEach((btn) => {
            btn.addEventListener('click', () => {
                const alvo = planos.find((p) => p.id === btn.dataset.editar);
                if (alvo) irParaEditarPlano(alvo);
            });
        });

        tbody.querySelectorAll('.gp-btn-status').forEach((btn) => {
            btn.addEventListener('click', () => {
                const alvo = planos.find((p) => p.id === btn.dataset.status);
                if (!alvo) return;
                alvo.status = alvo.status === 'Ativo' ? 'Inativo' : 'Ativo';
                renderizarKpis();
                renderizarTabela();
            });
        });
    }

    pagina.querySelector('#gp-btn-novo-plano').addEventListener('click', irParaNovoPlano);
    pagina.querySelector('#gp-busca').addEventListener('input', (e) => {
        busca = e.target.value;
        renderizarTabela();
    });
    pagina.querySelector('#gp-filtro-status').addEventListener('change', (e) => {
        filtroStatus = e.target.value;
        renderizarTabela();
    });
    pagina.querySelector('#gp-filtro-tipo').addEventListener('change', (e) => {
        filtroTipo = e.target.value;
        renderizarTabela();
    });
    pagina.querySelector('#gp-limpar').addEventListener('click', () => {
        busca = '';
        filtroStatus = 'Todos';
        filtroTipo = 'Todos';
        pagina.querySelector('#gp-busca').value = '';
        pagina.querySelector('#gp-filtro-status').value = 'Todos';
        pagina.querySelector('#gp-filtro-tipo').value = 'Todos';
        renderizarTabela();
    });

    renderizarKpis();
    renderizarTabela();
    return pagina;
}