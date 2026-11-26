const USUARIOS_RELATORIO = [
    { iniciais: 'JM', cor: '#dbeafe', textoCor: '#1d4ed8', nome: 'Juliana Martins', email: 'juliana@escolafuturo.edu.br', tipo: 'Recrutador', empresa: 'Escola Futuro', plano: 'Profissional', status: 'Ativo', cadastro: '10/09/2026', acesso: '10/09/2026' },
    { iniciais: 'RC', cor: '#dbeafe', textoCor: '#1d4ed8', nome: 'Rafael Costa', email: 'rafael@techsolucoes.com', tipo: 'Recrutador', empresa: 'Tech Soluções', plano: 'Empresarial', status: 'Ativo', cadastro: '09/09/2026', acesso: '09/09/2026' },
    { iniciais: 'LS', cor: '#dcfce7', textoCor: '#15803d', nome: 'Larissa Souza', email: 'larissa@gmail.com', tipo: 'Candidato', empresa: '—', plano: 'Gratuito', status: 'Ativo', cadastro: '08/09/2026', acesso: '08/09/2026' },
    { iniciais: 'CM', cor: '#fef3c7', textoCor: '#b45309', nome: 'Carlos Mendes', email: 'carlos@inovacursos.com', tipo: 'Empresa', empresa: 'Inova Cursos', plano: 'Empresarial', status: 'Ativo', cadastro: '08/09/2026', acesso: '08/09/2026' },
    { iniciais: 'FL', cor: '#dcfce7', textoCor: '#15803d', nome: 'Fernanda Lima', email: 'fernanda@gmail.com', tipo: 'Candidato', empresa: '—', plano: 'Gratuito', status: 'Ativo', cadastro: '06/09/2026', acesso: '06/09/2026' },
    { iniciais: 'BA', cor: '#dbeafe', textoCor: '#1d4ed8', nome: 'Bruno Almeida', email: 'bruno@gestaotalentos.com', tipo: 'Recrutador', empresa: 'Gestão Talentos', plano: 'Profissional', status: 'Ativo', cadastro: '05/09/2026', acesso: '05/09/2026' },
    { iniciais: 'CR', cor: '#dbeafe', textoCor: '#1d4ed8', nome: 'Camila Rocha', email: 'camila@escolatec.edu.br', tipo: 'Recrutador', empresa: 'Escola Tec', plano: 'Profissional', status: 'Inativo', cadastro: '02/09/2026', acesso: '20/08/2026' },
    { iniciais: 'TP', cor: '#fee2e2', textoCor: '#b91c1c', nome: 'Thiago Pereira', email: 'thiago@gmail.com', tipo: 'Candidato', empresa: '—', plano: 'Gratuito', status: 'Ativo', cadastro: '25/08/2026', acesso: '25/08/2026' },
    { iniciais: 'AA', cor: '#fef3c7', textoCor: '#b45309', nome: 'Ana Alves', email: 'ana@rheduca.com', tipo: 'Empresa', empresa: 'RH Educa', plano: 'Profissional', status: 'Ativo', cadastro: '22/08/2026', acesso: '21/09/2026' },
    { iniciais: 'DF', cor: '#dbeafe', textoCor: '#1d4ed8', nome: 'Diego Fernandes', email: 'diego@centroensino.com', tipo: 'Recrutador', empresa: 'Centro de Ensino', plano: 'Profissional', status: 'Ativo', cadastro: '18/08/2026', acesso: '19/09/2026' }
];

function escapar(texto = '') {
    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function pillTipo(tipo) {
    const mapa = {
        Recrutador: 'background:#dbeafe;color:#1d4ed8;',
        Candidato: 'background:#dcfce7;color:#15803d;',
        Empresa: 'background:#ede9fe;color:#6d28d9;'
    };
    return `<span style="display:inline-block;padding:0.18rem 0.55rem;border-radius:999px;font-size:0.72rem;font-weight:600;${mapa[tipo] || 'background:#f1f5f9;color:#334155;'}">${escapar(tipo)}</span>`;
}

function pillPlano(plano) {
    const mapa = {
        Profissional: 'background:#dbeafe;color:#1d4ed8;',
        Empresarial: 'background:#ede9fe;color:#6d28d9;',
        Gratuito: 'background:#f1f5f9;color:#475569;'
    };
    return `<span style="display:inline-block;padding:0.18rem 0.55rem;border-radius:999px;font-size:0.72rem;font-weight:600;${mapa[plano] || 'background:#f1f5f9;color:#334155;'}">${escapar(plano)}</span>`;
}

export function renderRelatorioUsuariosAdm() {
    const pagina = document.createElement('section');
    pagina.className = 'pagina-relatorio-usuarios-adm';

    let filtros = {
        tipo: 'Todos',
        status: 'Todos',
        perfil: 'Todos',
        plano: 'Todos',
        localizacao: 'Todas',
        buscaLat: '',
        buscaTab: ''
    };

    pagina.innerHTML = `
        <style>
            .rus-breadcrumb { font-size: 0.85rem; color: #64748b; margin-bottom: 0.35rem; }
            .rus-titulo { margin: 0 0 0.2rem; font-size: 1.7rem; font-weight: 700; color: #0f172a; }
            .rus-subtitulo { margin: 0 0 1.35rem; font-size: 0.88rem; color: #64748b; }
            .rus-layout { display: grid; grid-template-columns: 270px minmax(0, 1fr); gap: 1.25rem; align-items: start; }
            .rus-filtros-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.1rem; }
            .rus-filtros-card h2 { margin: 0 0 0.15rem; font-size: 0.95rem; font-weight: 700; color: #0f172a; }
            .rus-filtros-sub { margin: 0 0 1rem; font-size: 0.74rem; color: #64748b; }
            .rus-campo { margin-bottom: 0.8rem; }
            .rus-label { display: block; font-size: 0.74rem; font-weight: 600; color: #334155; margin-bottom: 0.3rem; }
            .rus-datas { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 0.35rem; }
            .rus-datas span { font-size: 0.72rem; color: #64748b; }
            .rus-input, .rus-select { width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem; border: 1px solid #cbd5e1; border-radius: 7px; font-size: 0.78rem; color: #0f172a; background: #fff; }
            .rus-btn-gerar { width: 100%; background: #1d4ed8; color: #fff; border: none; border-radius: 8px; padding: 0.6rem; font-size: 0.82rem; font-weight: 600; cursor: pointer; margin-top: 0.25rem; }
            .rus-btn-gerar:hover { background: #1e40af; }
            .rus-btn-limpar { width: 100%; background: none; border: none; color: #1d4ed8; font-size: 0.76rem; font-weight: 600; cursor: pointer; margin-top: 0.55rem; }
            .rus-resultados-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
            .rus-resultados-topo { display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0.95rem 1.15rem; border-bottom: 1px solid #f1f5f9; flex-wrap: wrap; }
            .rus-resultados-titulo { font-size: 0.92rem; font-weight: 700; color: #0f172a; }
            .rus-resultados-titulo span { font-weight: 400; font-size: 0.78rem; color: #64748b; margin-left: 0.35rem; }
            .rus-acoes-topo { display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap; }
            .rus-busca-tabela { width: 230px; padding: 0.42rem 0.7rem; border: 1px solid #cbd5e1; border-radius: 7px; font-size: 0.78rem; }
            .rus-btn-exportar { background: #fff; border: 1px solid #cbd5e1; border-radius: 7px; padding: 0.42rem 0.8rem; font-size: 0.78rem; font-weight: 600; color: #334155; cursor: pointer; }
            .rus-tabela-wrap { overflow-x: auto; }
            .rus-tabela { width: 100%; border-collapse: collapse; font-size: 0.78rem; text-align: left; }
            .rus-tabela th { background: #f8fafc; color: #64748b; font-weight: 600; padding: 0.65rem 0.8rem; border-bottom: 1px solid #e2e8f0; white-space: nowrap; }
            .rus-tabela td { padding: 0.7rem 0.8rem; border-bottom: 1px solid #f1f5f9; color: #334155; vertical-align: middle; }
            .rus-user-cell { display: flex; align-items: center; gap: 0.55rem; }
            .rus-avatar { width: 26px; height: 26px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.68rem; font-weight: 700; flex-shrink: 0; }
            .rus-status-ativo { background: #dcfce7; color: #15803d; padding: 0.16rem 0.55rem; border-radius: 999px; font-size: 0.7rem; font-weight: 600; }
            .rus-status-inativo { background: #fee2e2; color: #b91c1c; padding: 0.16rem 0.55rem; border-radius: 999px; font-size: 0.7rem; font-weight: 600; }
            .rus-rodape { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1.15rem; font-size: 0.76rem; color: #64748b; flex-wrap: wrap; gap: 0.5rem; }
            .rus-pag { display: flex; gap: 0.25rem; align-items: center; }
            .rus-pag button { border: 1px solid #cbd5e1; background: #fff; color: #334155; border-radius: 6px; padding: 0.22rem 0.52rem; font-size: 0.74rem; cursor: pointer; }
            .rus-pag button.ativa { background: #1d4ed8; color: #fff; border-color: #1d4ed8; font-weight: 600; }
            @media (max-width: 960px) { .rus-layout { grid-template-columns: 1fr; } }
        </style>

        <div class="rus-breadcrumb">Relatório &gt; Relatório de usuários</div>
        <h1 class="rus-titulo">Relatórios de Usuários</h1>
        <p class="rus-subtitulo">Visualize e filtre os usuários cadastrados na plataforma.</p>

        <div class="rus-layout">
            <aside class="rus-filtros-card">
                <h2>Filtros do relatório</h2>
                <p class="rus-filtros-sub">Selecione os filtros para gerar o relatório.</p>

                <div class="rus-campo">
                    <span class="rus-label">Período de cadastro</span>
                    <div class="rus-datas">
                        <input type="date" class="rus-input" value="2026-09-01" />
                        <span>Até</span>
                        <input type="date" class="rus-input" value="2026-09-30" />
                    </div>
                </div>

                <div class="rus-campo">
                    <label class="rus-label" for="rus-tipo">Tipo de usuário</label>
                    <select id="rus-tipo" class="rus-select">
                        <option value="Todos">Todos</option>
                        <option value="Recrutador">Recrutador</option>
                        <option value="Candidato">Candidato</option>
                        <option value="Empresa">Empresa</option>
                    </select>
                </div>

                <div class="rus-campo">
                    <label class="rus-label" for="rus-status">Status</label>
                    <select id="rus-status" class="rus-select">
                        <option value="Todos">Todos</option>
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                    </select>
                </div>

                <div class="rus-campo">
                    <label class="rus-label" for="rus-perfil">Perfil</label>
                    <select id="rus-perfil" class="rus-select">
                        <option value="Todos">Todos</option>
                        <option value="Recrutador">Recrutador</option>
                        <option value="Candidato">Candidato</option>
                        <option value="Empresa">Empresa</option>
                    </select>
                </div>

                <div class="rus-campo">
                    <label class="rus-label" for="rus-plano">Plano (apenas empresas)</label>
                    <select id="rus-plano" class="rus-select">
                        <option value="Todos">Todos</option>
                        <option value="Gratuito">Gratuito</option>
                        <option value="Profissional">Profissional</option>
                        <option value="Empresarial">Empresarial</option>
                    </select>
                </div>

                <div class="rus-campo">
                    <label class="rus-label" for="rus-loc">Localização</label>
                    <select id="rus-loc" class="rus-select">
                        <option value="Todas">Todas</option>
                        <option value="São Paulo">São Paulo</option>
                        <option value="Rio de Janeiro">Rio de Janeiro</option>
                        <option value="Minas Gerais">Minas Gerais</option>
                    </select>
                </div>

                <div class="rus-campo">
                    <label class="rus-label" for="rus-busca-lat">Buscar por nome, e-mail ou empresa</label>
                    <input type="text" id="rus-busca-lat" class="rus-input" placeholder="Digite nome, e-mail ou empresa..." />
                </div>

                <button type="button" id="rus-gerar" class="rus-btn-gerar">Gerar relatório</button>
                <button type="button" id="rus-limpar" class="rus-btn-limpar">↻ Limpar filtros</button>
            </aside>

            <section class="rus-resultados-card">
                <div class="rus-resultados-topo">
                    <div class="rus-resultados-titulo" id="rus-contador-topo">
                        Resultado do relatório <span>(120 usuários encontrados)</span>
                    </div>
                    <div class="rus-acoes-topo">
                        <input type="text" id="rus-busca-tab" class="rus-busca-tabela" placeholder="Buscar usuário, e-mail ou empresa..." />
                        <button type="button" id="rus-exportar" class="rus-btn-exportar">↓ Exportar</button>
                    </div>
                </div>

                <div class="rus-tabela-wrap">
                    <table class="rus-tabela">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Tipo</th>
                                <th>Empresa</th>
                                <th>Plano</th>
                                <th>Status</th>
                                <th>Data de cadastro</th>
                                <th>Último acesso</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody id="rus-corpo"></tbody>
                    </table>
                </div>

                <div class="rus-rodape" id="rus-rodape"></div>
            </section>
        </div>
    `;

    function obterFiltrados() {
        return USUARIOS_RELATORIO.filter((u) => {
            const bLat = filtros.buscaLat.trim().toLowerCase();
            const bTab = filtros.buscaTab.trim().toLowerCase();
            const matchLat = !bLat || u.nome.toLowerCase().includes(bLat) || u.email.toLowerCase().includes(bLat) || u.empresa.toLowerCase().includes(bLat);
            const matchTab = !bTab || u.nome.toLowerCase().includes(bTab) || u.email.toLowerCase().includes(bTab) || u.empresa.toLowerCase().includes(bTab);
            const matchTipo = filtros.tipo === 'Todos' || u.tipo === filtros.tipo;
            const matchStatus = filtros.status === 'Todos' || u.status === filtros.status;
            const matchPerfil = filtros.perfil === 'Todos' || u.tipo === filtros.perfil;
            const matchPlano = filtros.plano === 'Todos' || u.plano === filtros.plano;
            return matchLat && matchTab && matchTipo && matchStatus && matchPerfil && matchPlano;
        });
    }

    function renderizar() {
        const lista = obterFiltrados();
        const totalLabel = lista.length === USUARIOS_RELATORIO.length ? 120 : lista.length;

        pagina.querySelector('#rus-contador-topo').innerHTML = `
            Resultado do relatório <span>(${totalLabel} usuários encontrados)</span>
        `;

        pagina.querySelector('#rus-corpo').innerHTML = lista.length
            ? lista
                  .map(
                      (u) => `
                <tr>
                    <td>
                        <div class="rus-user-cell">
                            <span class="rus-avatar" style="background:${u.cor};color:${u.textoCor};">${escapar(u.iniciais)}</span>
                            <strong style="color:#0f172a;font-weight:600;">${escapar(u.nome)}</strong>
                        </div>
                    </td>
                    <td style="color:#64748b;">${escapar(u.email)}</td>
                    <td>${pillTipo(u.tipo)}</td>
                    <td>${escapar(u.empresa)}</td>
                    <td>${pillPlano(u.plano)}</td>
                    <td><span class="${u.status === 'Ativo' ? 'rus-status-ativo' : 'rus-status-inativo'}">${escapar(u.status)}</span></td>
                    <td>${escapar(u.cadastro)}</td>
                    <td>${escapar(u.acesso)}</td>
                    <td style="color:#64748b;cursor:pointer;">⋮</td>
                </tr>
            `
                  )
                  .join('')
            : `<tr><td colspan="9" style="text-align:center;padding:2rem;color:#64748b;">Nenhum usuário encontrado.</td></tr>`;

        pagina.querySelector('#rus-rodape').innerHTML = `
            <span>Total de registros: ${totalLabel}</span>
            <div class="rus-pag">
                <button type="button">&lt;</button>
                <button type="button" class="ativa">1</button>
                <button type="button">2</button>
                <button type="button">3</button>
                <span>...</span>
                <button type="button">12</button>
                <button type="button">&gt;</button>
            </div>
        `;
    }

    pagina.querySelector('#rus-gerar').addEventListener('click', () => {
        filtros = {
            ...filtros,
            tipo: pagina.querySelector('#rus-tipo').value,
            status: pagina.querySelector('#rus-status').value,
            perfil: pagina.querySelector('#rus-perfil').value,
            plano: pagina.querySelector('#rus-plano').value,
            localizacao: pagina.querySelector('#rus-loc').value,
            buscaLat: pagina.querySelector('#rus-busca-lat').value
        };
        renderizar();
    });

    pagina.querySelector('#rus-limpar').addEventListener('click', () => {
        pagina.querySelector('#rus-tipo').value = 'Todos';
        pagina.querySelector('#rus-status').value = 'Todos';
        pagina.querySelector('#rus-perfil').value = 'Todos';
        pagina.querySelector('#rus-plano').value = 'Todos';
        pagina.querySelector('#rus-loc').value = 'Todas';
        pagina.querySelector('#rus-busca-lat').value = '';
        pagina.querySelector('#rus-busca-tab').value = '';
        filtros = { tipo: 'Todos', status: 'Todos', perfil: 'Todos', plano: 'Todos', localizacao: 'Todas', buscaLat: '', buscaTab: '' };
        renderizar();
    });

    pagina.querySelector('#rus-busca-tab').addEventListener('input', (e) => {
        filtros.buscaTab = e.target.value;
        renderizar();
    });

    pagina.querySelector('#rus-exportar').addEventListener('click', () => {
        const linhas = obterFiltrados().map(
            (u) => `${u.nome};${u.email};${u.tipo};${u.empresa};${u.plano};${u.status};${u.cadastro};${u.acesso}`
        );
        const csv = 'Nome;Email;Tipo;Empresa;Plano;Status;Cadastro;UltimoAcesso\n' + linhas.join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'relatorio-usuarios.csv';
        link.click();
        URL.revokeObjectURL(url);
    });

    renderizar();
    return pagina;
}