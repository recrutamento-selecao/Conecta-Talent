const USUARIOS_PADRAO = [
    { id: 1,  nome: 'BlueCore Sistemas',  email: 'contato@bluecore.com',          tipo: 'Empresa',    empresa: null,                 status: 'Ativo',      dataCadastro: '2026-09-20', ultimoAcesso: '2026-09-20T10:24:00' },
    { id: 2,  nome: 'Ana Souza',          email: 'ana.souza@bluecore.com',        tipo: 'Recrutador', empresa: 'BlueCore Sistemas',  status: 'Ativo',      dataCadastro: '2026-09-21', ultimoAcesso: '2026-09-22T14:18:00' },
    { id: 3,  nome: 'João Silva',         email: 'joao.silva@email.com',          tipo: 'Candidato',  empresa: null,                 status: 'Ativo',      dataCadastro: '2026-09-22', ultimoAcesso: '2026-09-22T09:15:00' },
    { id: 4,  nome: 'TechSol Tecnologia', email: 'contato@techsol.com',           tipo: 'Empresa',    empresa: null,                 status: 'Em análise', dataCadastro: '2026-09-18', ultimoAcesso: null },
    { id: 5,  nome: 'Marina Costa',       email: 'marina.costa@techsol.com',      tipo: 'Recrutador', empresa: 'TechSol Tecnologia', status: 'Ativo',      dataCadastro: '2026-09-18', ultimoAcesso: '2026-09-21T16:40:00' },
    { id: 6,  nome: 'Pedro Ramos',        email: 'pedro.ramos@email.com',         tipo: 'Candidato',  empresa: null,                 status: 'Inativo',    dataCadastro: '2026-09-15', ultimoAcesso: '2026-09-10T11:23:00' },
    { id: 7,  nome: 'Innovare RH',        email: 'contato@innovare.com',          tipo: 'Empresa',    empresa: null,                 status: 'Ativo',      dataCadastro: '2026-09-14', ultimoAcesso: '2026-09-22T08:50:00' },
    { id: 8,  nome: 'Luciana Mendes',     email: 'luciana.mendes@innovare.com',   tipo: 'Recrutador', empresa: 'Innovare RH',        status: 'Ativo',      dataCadastro: '2026-09-14', ultimoAcesso: '2026-09-22T13:27:00' },
    { id: 9,  nome: 'Carlos Pereira',     email: 'carlos.pereira@email.com',      tipo: 'Candidato',  empresa: null,                 status: 'Ativo',      dataCadastro: '2026-09-12', ultimoAcesso: '2026-09-21T17:05:00' },
    { id: 10, nome: 'EducaMais',          email: 'contato@educamais.com',         tipo: 'Empresa',    empresa: null,                 status: 'Bloqueado',  dataCadastro: '2026-09-10', ultimoAcesso: null }
];

const MOTIVOS_BLOQUEIO = [
    'Violação dos termos de uso',
    'Atividade suspeita',
    'Dados inconsistentes',
    'Inadimplência',
    'Outro'
];

const MOTIVOS_EXCLUSAO = [
    'Solicitação do usuário',
    'Violação dos termos de uso',
    'Conta duplicada',
    'Encerramento de atividade',
    'Outro'
];

function obterIniciais(nome = '') {
    return nome
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((parte) => parte[0].toUpperCase())
        .join('');
}

function formatarData(dataIso) {
    if (!dataIso) return '—';
    const data = new Date(dataIso.includes('T') ? dataIso : `${dataIso}T00:00:00`);
    if (Number.isNaN(data.getTime())) return dataIso;
    return data.toLocaleDateString('pt-BR');
}

function formatarDataHora(dataIso) {
    if (!dataIso) return '—';
    const data = new Date(dataIso);
    if (Number.isNaN(data.getTime())) return dataIso;
    const dia = data.toLocaleDateString('pt-BR');
    const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${dia} às ${hora}`;
}

function escaparHtml(texto = '') {
    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function classeBadgeTipo(tipo) {
    const mapa = {
        Empresa: 'empresarial',
        Recrutador: 'educacional',
        Candidato: 'profissional',
        Adm: 'cinza'
    };
    return mapa[tipo] || 'cinza';
}

function classeBadgeStatus(status) {
    const mapa = {
        Ativo: 'ativa',
        Bloqueado: 'bloqueado',
        Inativo: 'inativo',
        'Em análise': 'analise'
    };
    return mapa[status] || 'cinza';
}

export function renderGerenciarUsuarios() {
    const pagina = document.createElement('section');
    pagina.className = 'pagina-gerenciar-usuarios';

    let listaUsuarios = USUARIOS_PADRAO.map((u) => ({ ...u }));
    let usuarioSelecionadoId = listaUsuarios[0]?.id ?? null;
    let abaDetalheAtiva = 'informacoes';
    let paginaAtual = 1;
    const itensPorPagina = 10;

    let filtros = {
        busca: '',
        tipo: 'Todos',
        status: 'Todos',
        empresa: 'Todas',
        data: ''
    };

    pagina.innerHTML = `
        <style>
            gu-alerta-vermelho {
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
                background: #fef2f2;
                border: 1px solid #fecaca;
                border-radius: 12px;
                padding: 0.95rem 1rem;
                margin-bottom: 1.15rem;
                text-align: left;
            }
            .gu-alerta-icone {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 1.75px solid #dc2626;
                color: #dc2626;
                font-weight: 700;
                font-size: 0.85rem;
                line-height: 1;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                margin-top: 0.1rem;
            }
            .gu-alerta-titulo {
                margin: 0 0 0.35rem;
                font-size: 0.84rem;
                font-weight: 700;
                color: #b91c1c;
            }
            .gu-alerta-texto {
                margin: 0;
                font-size: 0.8rem;
                line-height: 1.48;
                color: #991b1b;
                font-weight: 500;
            }
            .gu-alerta-lista {
                margin: 0;
                padding: 0;
                list-style: none;
                font-size: 0.8rem;
                line-height: 1.48;
                color: #991b1b;
                font-weight: 500;
            }
            .gu-breadcrumb { font-size: 0.85rem; color: #64748b; margin-bottom: 0.35rem; }
            .gu-header h1 { margin: 0 0 0.25rem; font-size: 1.75rem; color: #0f172a; }
            .gu-header p { margin: 0 0 1.5rem; color: #64748b; font-size: 0.92rem; }
            .gu-resumo-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.25rem; }
            .gu-resumo-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.35rem; }
            .gu-resumo-topo { display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.82rem; font-weight: 500; }
            .gu-resumo-valor { font-size: 1.45rem; font-weight: 700; color: #0f172a; }
            .gu-resumo-delta { font-size: 0.75rem; color: #16a34a; font-weight: 600; }
            .gu-filtros-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem 1.25rem; display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; margin-bottom: 1.25rem; }
            .gu-input-busca { flex: 1 1 220px; padding: 0.55rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.875rem; color: #0f172a; }
            .gu-select, .gu-input-data { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; background: #fff; color: #334155; }
            .gu-btn-limpar { background: transparent; border: none; color: #2563eb; font-weight: 600; font-size: 0.85rem; cursor: pointer; padding: 0.4rem 0.6rem; }
            .gu-conteudo-grid { display: grid; grid-template-columns: minmax(0, 1.85fr) minmax(300px, 1fr); gap: 1.25rem; align-items: start; }
            .gu-tabela-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
            .gu-tabela-wrap { overflow-x: auto; }
            .gu-tabela { width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left; }
            .gu-tabela th { background: #f8fafc; color: #64748b; font-size: 0.75rem; font-weight: 600; padding: 0.75rem 0.9rem; border-bottom: 1px solid #e2e8f0; }
            .gu-tabela td { padding: 0.75rem 0.9rem; border-bottom: 1px solid #f1f5f9; color: #334155; vertical-align: middle; }
            .gu-linha-usuario { cursor: pointer; transition: background-color 0.15s ease; }
            .gu-linha-usuario:hover { background: #f8fafc; }
            .gu-linha-selecionada { background: #eff6ff !important; }
            .gu-usuario-cell { display: flex; align-items: center; gap: 0.65rem; }
            .gu-avatar { width: 32px; height: 32px; border-radius: 50%; background: #e0e7ff; color: #1d4ed8; font-weight: 700; font-size: 0.75rem; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
            .gu-usuario-nome { font-weight: 600; color: #0f172a; display: block; }
            .gu-usuario-email { font-size: 0.75rem; color: #64748b; display: block; }
            .gu-pill { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 0.73rem; font-weight: 600; }
            .gu-pill.empresarial { background: #dbeafe; color: #1d4ed8; }
            .gu-pill.educacional { background: #f3e8ff; color: #7e22ce; }
            .gu-pill.profissional { background: #fef3c7; color: #b45309; }
            .gu-pill.cinza { background: #f1f5f9; color: #475569; }
            .gu-pill.ativa { background: #dcfce7; color: #15803d; }
            .gu-pill.bloqueado { background: #fee2e2; color: #b91c1c; }
            .gu-pill.inativo { background: #f1f5f9; color: #475569; }
            .gu-pill.analise { background: #fef9c3; color: #a16207; }
            .gu-rodape-tabela { display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 1rem; font-size: 0.8rem; color: #64748b; flex-wrap: wrap; gap: 0.5rem; }
            .gu-paginacao { display: flex; gap: 0.35rem; align-items: center; }
            .gu-btn-pag { border: 1px solid #cbd5e1; background: #fff; color: #334155; border-radius: 6px; padding: 0.3rem 0.6rem; font-size: 0.8rem; cursor: pointer; }
            .gu-btn-pag.ativa { background: #2563eb; color: #fff; border-color: #2563eb; font-weight: 600; }
            .gu-btn-pag:disabled { opacity: 0.45; cursor: not-allowed; }
            .gu-detalhes-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; }
            .gu-detalhes-topo { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
            .gu-detalhes-topo h2 { margin: 0; font-size: 1rem; color: #0f172a; }
            .gu-btn-fechar-detalhe { background: transparent; border: none; font-size: 1.1rem; color: #64748b; cursor: pointer; }
            .gu-perfil-destaque { display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.85rem; border-bottom: 1px solid #e2e8f0; margin-bottom: 0.85rem; gap: 0.5rem; }
            .gu-abas { display: flex; gap: 1.25rem; border-bottom: 1px solid #e2e8f0; margin-bottom: 1rem; }
            .gu-aba-btn { background: transparent; border: none; padding: 0.5rem 0; font-size: 0.85rem; font-weight: 600; color: #64748b; cursor: pointer; border-bottom: 2px solid transparent; }
            .gu-aba-btn.ativa { color: #2563eb; border-bottom-color: #2563eb; }
            .gu-box-info { border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.9rem; margin-bottom: 0.9rem; }
            .gu-box-info h3 { margin: 0 0 0.65rem; font-size: 0.85rem; color: #0f172a; }
            .gu-linha-dado { display: flex; justify-content: space-between; gap: 0.75rem; font-size: 0.8rem; padding: 0.3rem 0; }
            .gu-linha-dado span:first-child { color: #64748b; }
            .gu-linha-dado span:last-child { color: #0f172a; font-weight: 500; text-align: right; }
            .gu-acoes-detalhe { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-top: 1rem; }
            .gu-btn-bloquear { padding: 0.6rem 0.75rem; border-radius: 8px; border: 1px solid #fca5a5; background: #fff; color: #dc2626; font-weight: 600; font-size: 0.82rem; cursor: pointer; }
            .gu-btn-excluir { padding: 0.6rem 0.75rem; border-radius: 8px; border: 1px solid #f87171; background: #fff5f5; color: #b91c1c; font-weight: 600; font-size: 0.82rem; cursor: pointer; }
            .gu-modal-backdrop { position: fixed !important; inset: 0 !important; background: rgba(15, 23, 42, 0.5) !important; display: flex !important; align-items: center !important; justify-content: center !important; padding: 1rem !important; z-index: 999999 !important; }
            .gu-modal-box { position: relative !important; background: #fff !important; border-radius: 16px !important; max-width: 500px !important; width: 100% !important; padding: 1.75rem 1.85rem !important; box-shadow: 0 24px 48px rgba(15, 23, 42, 0.25) !important; z-index: 1000000 !important; }
            .gu-modal-close { position: absolute; top: 1.1rem; right: 1.15rem; background: transparent; border: none; color: #64748b; font-size: 1.2rem; line-height: 1; cursor: pointer; padding: 0.25rem; border-radius: 6px; }
            .gu-modal-close:hover { background: #f1f5f9; color: #0f172a; }
            .gu-sucesso-topo { display: flex; flex-direction: column; align-items: center; text-align: center; }
            .gu-sucesso-icone-wrap { width: 68px; height: 68px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
            .gu-sucesso-icone-wrap.bloqueio { background: #dcfce7; }
            .gu-sucesso-icone-wrap.exclusao { background: #fee2e2; }
            .gu-sucesso-titulo { margin: 0 0 0.45rem; font-size: 1.35rem; font-weight: 700; color: #0f172a; }
            .gu-sucesso-subtitulo { margin: 0 0 1.25rem; font-size: 0.875rem; line-height: 1.45; color: #64748b; max-width: 390px; }
            .gu-sucesso-card { width: 100%; box-sizing: border-box; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem 1.15rem; margin-bottom: 1.4rem; text-align: left; }
            .gu-sucesso-card-topo { display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; padding-bottom: 0.8rem; margin-bottom: 0.8rem; border-bottom: 1px solid #e2e8f0; }
            .gu-sucesso-entidade { display: flex; align-items: center; gap: 0.75rem; }
            .gu-sucesso-avatar { width: 38px; height: 38px; border-radius: 10px; background: #e0e7ff; color: #1d4ed8; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
            .gu-sucesso-nome { font-size: 0.92rem; font-weight: 700; color: #0f172a; display: block; }
            .gu-sucesso-tipo { font-size: 0.78rem; color: #64748b; display: block; margin-top: 0.1rem; }
            .gu-sucesso-transicao { display: flex; align-items: center; gap: 0.4rem; flex-shrink: 0; font-size: 0.75rem; color: #64748b; }
            .gu-sucesso-detalhes { display: flex; flex-direction: column; gap: 0.55rem; font-size: 0.82rem; }
            .gu-sucesso-linha { display: grid; grid-template-columns: 120px 1fr; gap: 0.75rem; align-items: start; }
            .gu-sucesso-rotulo { color: #64748b; }
            .gu-sucesso-valor { color: #0f172a; font-weight: 600; line-height: 1.4; white-space: pre-line; }
            .gu-sucesso-acoes { display: flex; justify-content: center; }
            .gu-btn-fechar-modal { min-width: 128px; padding: 0.65rem 1.5rem; border-radius: 8px; border: none; background: #1d4ed8; color: #fff; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: background-color 0.15s ease; }
            .gu-btn-fechar-modal:hover { background: #1e40af; }
            @media (max-width: 1100px) {
                .gu-resumo-grid { grid-template-columns: repeat(2, 1fr); }
                .gu-conteudo-grid { grid-template-columns: 1fr; }
            }
            @media (max-width: 640px) {
                .gu-resumo-grid { grid-template-columns: 1fr; }
                .gu-sucesso-linha { grid-template-columns: 1fr; gap: 0.15rem; }
            }
        </style>

        <header class="gu-header">
            <div class="gu-breadcrumb">Usuários &gt; Gerenciar usuários</div>
            <h1>Gerenciar usuários</h1>
            <p>Visualize, pesquise e gerencie todos os usuários da plataforma.</p>
        </header>

        <section class="gu-resumo-grid" id="gu-resumo-grid"></section>

        <section class="gu-filtros-card">
            <input type="text" id="gu-busca" class="gu-input-busca" placeholder="Buscar por nome, e-mail ou empresa..." />
            <select id="gu-filtro-tipo" class="gu-select">
                <option value="Todos">Tipo: Todo</option>
                <option value="Empresa">Empresa</option>
                <option value="Recrutador">Recrutador</option>
                <option value="Candidato">Candidato</option>
                <option value="Adm">Adm</option>
            </select>
            <select id="gu-filtro-status" class="gu-select">
                <option value="Todos">Status: Todos</option>
                <option value="Ativo">Ativo</option>
                <option value="Bloqueado">Bloqueado</option>
                <option value="Inativo">Inativo</option>
                <option value="Em análise">Em análise</option>
            </select>
            <select id="gu-filtro-empresa" class="gu-select">
                <option value="Todas">Empresa: Todas</option>
                <option value="BlueCore Sistemas">BlueCore Sistemas</option>
                <option value="TechSol Tecnologia">TechSol Tecnologia</option>
                <option value="Innovare RH">Innovare RH</option>
            </select>
            <input type="date" id="gu-filtro-data" class="gu-input-data" title="Filtrar por data de cadastro" />
            <button type="button" id="gu-limpar-filtros" class="gu-btn-limpar">↻ Limpar filtros</button>
        </section>

        <section class="gu-conteudo-grid">
            <div class="gu-tabela-card">
                <div class="gu-tabela-wrap">
                    <table class="gu-tabela">
                        <thead>
                            <tr>
                                <th style="width: 34px;"><input type="checkbox" id="gu-selecionar-todos" /></th>
                                <th>Usuário ↕</th>
                                <th>Tipo</th>
                                <th>Empresa</th>
                                <th>Status</th>
                                <th>Data de cadastro ↕</th>
                                <th>Último acesso ↕</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody id="gu-corpo-tabela"></tbody>
                    </table>
                </div>
                <div class="gu-rodape-tabela" id="gu-rodape-tabela"></div>
            </div>

            <aside class="gu-detalhes-card" id="gu-painel-detalhes"></aside>
        </section>
    `;

    function montarModal(conteudoEl, aoFechar) {
        document.querySelectorAll('.gu-modal-backdrop').forEach((el) => el.remove());

        const backdrop = document.createElement('div');
        backdrop.className = 'gu-modal-backdrop';

        const box = document.createElement('div');
        box.className = 'gu-modal-box';

        const btnTopo = document.createElement('button');
        btnTopo.type = 'button';
        btnTopo.className = 'gu-modal-close';
        btnTopo.setAttribute('aria-label', 'Fechar modal');
        btnTopo.textContent = '✕';

        const fechar = () => {
            backdrop.remove();
            if (typeof aoFechar === 'function') aoFechar();
        };

        btnTopo.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            fechar();
        });

        box.append(btnTopo, conteudoEl);
        backdrop.append(box);
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) fechar();
        });

        document.body.append(backdrop);
        return fechar;
    }

   function abrirModalBloqueio(usuario) {
        let fechar = () => {};
        const aoCancelar = () => fechar();
        const wrap = document.createElement('div');
        wrap.innerHTML = `
            <h3 style="margin:0 0 0.35rem;color:#0f172a;font-size:1.35rem;font-weight:700;">Bloquear usuário</h3>
            <p style="margin:0 0 0.25rem;font-size:0.88rem;font-weight:600;color:#334155;">Tem certeza que deseja bloquear este usuário?</p>
            <p style="margin:0 0 1.1rem;font-size:0.84rem;line-height:1.45;color:#64748b;">O usuário não poderá mais acessar a plataforma, mas seus dados serão mantidos no sistema. Você poderá desbloqueá-lo a qualquer momento.</p>

            <div class="gu-alerta-vermelho">
                <span class="gu-alerta-icone" aria-hidden="true">!</span>
                <div>
                    <div class="gu-alerta-titulo">O que acontece ao bloquear esta conta?</div>
                    <ul class="gu-alerta-lista">
                        <li>• O usuário será desconectado imediatamente.</li>
                        <li>• Não poderá acessar a plataforma.</li>
                        <li>• Todos os recursos ficarão indisponíveis para ele.</li>
                        <li>• Os dados e histórico serão mantidos no sistema.</li>
                    </ul>
                </div>
            </div>

            <label for="fb-motivo" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:0.35rem;color:#0f172a;">Motivo do bloqueio <span style="color:#dc2626;">*</span></label>
            <select id="fb-motivo" style="width:100%;padding:0.6rem 0.7rem;margin-bottom:0.9rem;border:1px solid #cbd5e1;border-radius:8px;font-size:0.85rem;background:#fff;color:#334155;">
                <option value="" selected disabled>Selecione um motivo</option>
                ${MOTIVOS_BLOQUEIO.map((m) => `<option value="${escaparHtml(m)}">${escaparHtml(m)}</option>`).join('')}
            </select>

            <label for="fb-obs" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:0.35rem;color:#0f172a;">Observações <span style="font-weight:400;color:#64748b;">(opcional)</span></label>
            <textarea id="fb-obs" rows="3" placeholder="Digite uma observação..." style="width:100%;box-sizing:border-box;padding:0.6rem 0.7rem;margin-bottom:1.2rem;border:1px solid #cbd5e1;border-radius:8px;font-size:0.85rem;font-family:inherit;color:#0f172a;"></textarea>

            <div style="display:flex;justify-content:flex-end;gap:0.65rem;">
                <button type="button" id="fb-cancelar" style="padding:0.58rem 1.15rem;border-radius:8px;border:1px solid #cbd5e1;background:#fff;color:#334155;font-weight:600;font-size:0.85rem;cursor:pointer;">Cancelar</button>
                <button type="button" id="fb-confirmar" style="padding:0.58rem 1.15rem;border-radius:8px;border:none;background:#dc2626;color:#fff;font-weight:600;font-size:0.85rem;cursor:pointer;">🔒 Bloquear usuário</button>
            </div>
        `;
        fechar = montarModal(wrap, aoCancelar);
        wrap.querySelector('#fb-cancelar').addEventListener('click', aoCancelar);
        wrap.querySelector('#fb-confirmar').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const motivo = wrap.querySelector('#fb-motivo').value;
            if (!motivo) {
                alert('Selecione um motivo do bloqueio para prosseguir.');
                return;
            }
            const statusAnterior = usuario.status;
            const observacoes = wrap.querySelector('#fb-obs').value.trim() || 'Usuário realizou cadastro com informações inconsistentes.';
            const dataBloqueio = formatarDataHora(new Date().toISOString());

            usuario.status = 'Bloqueado';
            usuario.historico = usuario.historico || [];
            usuario.historico.unshift({
                data: dataBloqueio,
                acao: `Bloqueado — ${motivo}`
            });
            renderizarTudo();
            abrirModalBloqueioSucesso(usuario, {
                statusAnterior,
                dataBloqueio,
                motivo,
                observacoes
            });
        });
    }
    function abrirModalBloqueioSucesso(usuario, dadosBloqueio = {}) {
        let fechar = () => {};
        const aoFechar = () => fechar();
        const wrap = document.createElement('div');
        wrap.className = 'gu-sucesso-topo';

        const statusAntes = dadosBloqueio.statusAnterior || 'Ativo';
        const dataBloqueio = dadosBloqueio.dataBloqueio || '20/09/2026 às 14:32';
        const motivo = dadosBloqueio.motivo || 'Violação dos termos de uso';
        const observacoes = dadosBloqueio.observacoes || 'Usuário realizou cadastro com informações inconsistentes.';

        wrap.innerHTML = `
            <div class="gu-sucesso-icone-wrap bloqueio" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <circle cx="18" cy="15" r="4" fill="#dcfce7" stroke="#15803d"></circle>
                    <path d="m16.5 15 1 1 2-2"></path>
                </svg>
            </div>
            <h3 class="gu-sucesso-titulo">Usuário bloqueado com sucesso!</h3>
            <p class="gu-sucesso-subtitulo">O usuário não poderá mais acessar a plataforma. Você pode desbloqueá-lo a qualquer momento.</p>

            <div class="gu-sucesso-card">
                <div class="gu-sucesso-card-topo">
                    <div class="gu-sucesso-entidade">
                        <span class="gu-sucesso-avatar">${escaparHtml(obterIniciais(usuario.nome))}</span>
                        <div>
                            <span class="gu-sucesso-nome">${escaparHtml(usuario.nome)}</span>
                            <span class="gu-sucesso-tipo">${escaparHtml(usuario.tipo)}</span>
                        </div>
                    </div>
                    <div class="gu-sucesso-transicao">
                        <span class="gu-pill ${classeBadgeStatus(statusAntes)}">${escaparHtml(statusAntes)}</span>
                        <span>→</span>
                        <span class="gu-pill bloqueado">Bloqueado</span>
                    </div>
                </div>

                <div class="gu-sucesso-detalhes">
                    <div class="gu-sucesso-linha">
                        <span class="gu-sucesso-rotulo">Data do bloqueio</span>
                        <span class="gu-sucesso-valor">${escaparHtml(dataBloqueio)}</span>
                    </div>
                    <div class="gu-sucesso-linha">
                        <span class="gu-sucesso-rotulo">Motivo</span>
                        <span class="gu-sucesso-valor">${escaparHtml(motivo)}</span>
                    </div>
                    <div class="gu-sucesso-linha">
                        <span class="gu-sucesso-rotulo">Observações</span>
                        <span class="gu-sucesso-valor">${escaparHtml(observacoes)}</span>
                    </div>
                </div>
            </div>

            <div class="gu-sucesso-acoes">
                <button type="button" id="fbs-fechar" class="gu-btn-fechar-modal">Fechar</button>
            </div>
        `;

        fechar = montarModal(wrap, aoFechar);
        wrap.querySelector('#fbs-fechar').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            aoFechar();
        });
    }

   function abrirModalExclusao(usuario) {
        let fechar = () => {};
        const aoCancelar = () => fechar();
        const wrap = document.createElement('div');
        wrap.innerHTML = `
            <h3 style="margin:0 0 0.35rem;color:#0f172a;font-size:1.35rem;font-weight:700;">Excluir usuário</h3>
            <p style="margin:0 0 0.25rem;font-size:0.88rem;font-weight:600;color:#334155;">Tem certeza que deseja excluir este usuário?</p>
            <p style="margin:0 0 1.1rem;font-size:0.84rem;line-height:1.45;color:#64748b;">Esta ação é permanente e não poderá ser desfeita. A conta será removida da plataforma conforme as regras de retenção de dados do sistema.</p>

            <div class="gu-alerta-vermelho">
                <span class="gu-alerta-icone" aria-hidden="true">!</span>
                <div>
                    <div class="gu-alerta-titulo">Atenção: esta ação é permanente</div>
                    <p class="gu-alerta-texto">A exclusão poderá remover ou desvincular os dados relacionados à conta, incluindo acesso à plataforma, informações do perfil e histórico associado ao usuário.</p>
                </div>
            </div>

            <label for="fe-motivo" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:0.35rem;color:#0f172a;">Motivo da exclusão <span style="color:#dc2626;">*</span></label>
            <select id="fe-motivo" style="width:100%;padding:0.6rem 0.7rem;margin-bottom:0.9rem;border:1px solid #cbd5e1;border-radius:8px;font-size:0.85rem;background:#fff;color:#334155;">
                <option value="" selected disabled>Selecione um motivo</option>
                ${MOTIVOS_EXCLUSAO.map((m) => `<option value="${escaparHtml(m)}">${escaparHtml(m)}</option>`).join('')}
            </select>

            <label for="fe-texto" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:0.35rem;color:#0f172a;">Confirmação <span style="color:#dc2626;">*</span></label>
            <input type="text" id="fe-texto" placeholder="Digite EXCLUIR para confirmar" style="width:100%;box-sizing:border-box;padding:0.6rem 0.7rem;margin-bottom:0.85rem;border:1px solid #cbd5e1;border-radius:8px;font-size:0.85rem;color:#0f172a;" />

            <label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.82rem;color:#334155;margin-bottom:1.25rem;cursor:pointer;">
                <input type="checkbox" id="fe-check" style="margin-top:0.15rem;" />
                <span>Estou ciente de que a exclusão da conta é uma ação permanente e desejo prosseguir.</span>
            </label>

            <div style="display:flex;justify-content:flex-end;gap:0.65rem;">
                <button type="button" id="fe-cancelar" style="padding:0.58rem 1.15rem;border-radius:8px;border:1px solid #cbd5e1;background:#fff;color:#334155;font-weight:600;font-size:0.85rem;cursor:pointer;">Cancelar</button>
                <button type="button" id="fe-confirmar" style="padding:0.58rem 1.15rem;border-radius:8px;border:none;background:#dc2626;color:#fff;font-weight:600;font-size:0.85rem;cursor:pointer;">🗑️ Excluir usuário</button>
            </div>
        `;
        fechar = montarModal(wrap, aoCancelar);
        wrap.querySelector('#fe-cancelar').addEventListener('click', aoCancelar);
        wrap.querySelector('#fe-confirmar').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const motivo = wrap.querySelector('#fe-motivo').value;
            const digitado = wrap.querySelector('#fe-texto').value.trim();
            const marcado = wrap.querySelector('#fe-check').checked;
            if (!motivo || digitado !== 'EXCLUIR' || !marcado) {
                alert('Selecione um motivo, digite EXCLUIR e marque a caixa de confirmação para prosseguir.');
                return;
            }
            const dataExclusao = formatarDataHora(new Date().toISOString());

            const removido = { ...usuario };
            listaUsuarios = listaUsuarios.filter((u) => u.id !== usuario.id);
            if (usuarioSelecionadoId === usuario.id) {
                usuarioSelecionadoId = listaUsuarios[0]?.id ?? null;
            }
            renderizarTudo();
            abrirModalExclusaoSucesso(removido, {
                dataExclusao,
                motivo,
                observacoes: `Exclusão solicitada (${motivo.toLowerCase()}).\nTodos os dados foram removidos do sistema.`
            });
        });
    }
    function abrirModalExclusaoSucesso(usuario, dadosExclusao = {}) {
        let fechar = () => {};
        const aoFechar = () => fechar();
        const wrap = document.createElement('div');
        wrap.className = 'gu-sucesso-topo';

        const dataExclusao = dadosExclusao.dataExclusao || '20/09/2026 às 14:45';
        const motivo = dadosExclusao.motivo || 'Solicitação do usuário';
        const observacoes = dadosExclusao.observacoes || 'Exclusão solicitada pela empresa.\nTodos os dados foram removidos do sistema.';

        wrap.innerHTML = `
            <div class="gu-sucesso-icone-wrap exclusao" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <h3 class="gu-sucesso-titulo">Usuário excluído com sucesso!</h3>
            <p class="gu-sucesso-subtitulo">A conta do usuário foi removida permanentemente da plataforma. Essa ação não pode ser desfeita.</p>

            <div class="gu-sucesso-card">
                <div class="gu-sucesso-card-topo">
                    <div class="gu-sucesso-entidade">
                        <span class="gu-sucesso-avatar">${escaparHtml(obterIniciais(usuario.nome))}</span>
                        <div>
                            <span class="gu-sucesso-nome">${escaparHtml(usuario.nome)}</span>
                            <span class="gu-sucesso-tipo">${escaparHtml(usuario.tipo)}</span>
                        </div>
                    </div>
                </div>

                <div class="gu-sucesso-detalhes">
                    <div class="gu-sucesso-linha">
                        <span class="gu-sucesso-rotulo">Data da exclusão</span>
                        <span class="gu-sucesso-valor">${escaparHtml(dataExclusao)}</span>
                    </div>
                    <div class="gu-sucesso-linha">
                        <span class="gu-sucesso-rotulo">Motivo</span>
                        <span class="gu-sucesso-valor">${escaparHtml(motivo)}</span>
                    </div>
                    <div class="gu-sucesso-linha">
                        <span class="gu-sucesso-rotulo">Observações</span>
                        <span class="gu-sucesso-valor">${escaparHtml(observacoes)}</span>
                    </div>
                </div>
            </div>

            <div class="gu-sucesso-acoes">
                <button type="button" id="fes-fechar" class="gu-btn-fechar-modal">Fechar</button>
            </div>
        `;

        fechar = montarModal(wrap, aoFechar);
        wrap.querySelector('#fes-fechar').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            aoFechar();
        });
    }

    function obterFiltrados() {
        return listaUsuarios.filter((u) => {
            const termo = filtros.busca.trim().toLowerCase();
            const matchBusca =
                !termo ||
                u.nome.toLowerCase().includes(termo) ||
                u.email.toLowerCase().includes(termo) ||
                (u.empresa && u.empresa.toLowerCase().includes(termo));
            const matchTipo = filtros.tipo === 'Todos' || u.tipo === filtros.tipo;
            const matchStatus = filtros.status === 'Todos' || u.status === filtros.status;
            const matchEmpresa = filtros.empresa === 'Todas' || u.empresa === filtros.empresa;
            const matchData = !filtros.data || u.dataCadastro === filtros.data;
            return matchBusca && matchTipo && matchStatus && matchEmpresa && matchData;
        });
    }

    function renderizarResumo() {
        const grid = pagina.querySelector('#gu-resumo-grid');
        const totalEmpresas = listaUsuarios.filter((u) => u.tipo === 'Empresa').length;
        const totalRecrutadores = listaUsuarios.filter((u) => u.tipo === 'Recrutador').length;
        const totalCandidatos = listaUsuarios.filter((u) => u.tipo === 'Candidato').length;

        const cards = [
            { titulo: 'Total de usuários', valor: '4.512', delta: '↑ 14% nos últimos 30 dias' },
            { titulo: 'Empresas', valor: String(127 + totalEmpresas), delta: '↑ 12% nos últimos 30 dias' },
            { titulo: 'Recrutadores', valor: String(539 + totalRecrutadores), delta: '↑ 8% nos últimos 30 dias' },
            { titulo: 'Candidatos', valor: String(3840 + totalCandidatos), delta: '↑ 15% nos últimos 30 dias' }
        ];

        grid.innerHTML = cards
            .map(
                (c) => `
                <article class="gu-resumo-card">
                    <div class="gu-resumo-topo"><span>${c.titulo}</span></div>
                    <strong class="gu-resumo-valor">${c.valor}</strong>
                    <span class="gu-resumo-delta">${c.delta}</span>
                </article>
            `
            )
            .join('');
    }

    function renderizarTabela() {
        const tbody = pagina.querySelector('#gu-corpo-tabela');
        const rodape = pagina.querySelector('#gu-rodape-tabela');
        const filtrados = obterFiltrados();
        const totalPaginas = Math.max(1, Math.ceil(filtrados.length / itensPorPagina));
        if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

        const inicio = (paginaAtual - 1) * itensPorPagina;
        const itensPagina = filtrados.slice(inicio, inicio + itensPorPagina);

        if (itensPagina.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:2rem;color:#64748b;">Nenhum usuário encontrado com os filtros aplicados.</td></tr>`;
        } else {
            tbody.innerHTML = itensPagina
                .map((u) => {
                    const selecionada = u.id === usuarioSelecionadoId ? 'gu-linha-selecionada' : '';
                    return `
                        <tr class="gu-linha-usuario ${selecionada}" data-id="${u.id}">
                            <td onclick="event.stopPropagation()"><input type="checkbox" class="gu-check-linha" data-id="${u.id}" /></td>
                            <td>
                                <div class="gu-usuario-cell">
                                    <span class="gu-avatar">${escaparHtml(obterIniciais(u.nome))}</span>
                                    <div>
                                        <span class="gu-usuario-nome">${escaparHtml(u.nome)}</span>
                                        <span class="gu-usuario-email">${escaparHtml(u.email)}</span>
                                    </div>
                                </div>
                            </td>
                            <td><span class="gu-pill ${classeBadgeTipo(u.tipo)}">${escaparHtml(u.tipo)}</span></td>
                            <td>${escaparHtml(u.empresa || '—')}</td>
                            <td><span class="gu-pill ${classeBadgeStatus(u.status)}">${escaparHtml(u.status)}</span></td>
                            <td>${formatarData(u.dataCadastro)}</td>
                            <td>${formatarDataHora(u.ultimoAcesso)}</td>
                            <td onclick="event.stopPropagation()">
                                <button type="button" class="gu-btn-acao-linha" data-acao="bloquear" data-id="${u.id}" title="Bloquear" style="background:none;border:none;cursor:pointer;">🚫</button>
                                <button type="button" class="gu-btn-acao-linha" data-acao="excluir" data-id="${u.id}" title="Excluir" style="background:none;border:none;cursor:pointer;">🗑️</button>
                            </td>
                        </tr>
                    `;
                })
                .join('');
        }

        const exibindoInicio = filtrados.length === 0 ? 0 : inicio + 1;
        const exibindoFim = inicio + itensPagina.length;
        rodape.innerHTML = `
            <span>Mostrando ${exibindoInicio} a ${exibindoFim} de ${filtrados.length} usuários filtrados (${listaUsuarios.length} carregados)</span>
            <div class="gu-paginacao">
                <button type="button" class="gu-btn-pag" id="gu-pag-prev" ${paginaAtual <= 1 ? 'disabled' : ''}>&lt;</button>
                <button type="button" class="gu-btn-pag ativa">${paginaAtual}</button>
                <button type="button" class="gu-btn-pag" id="gu-pag-next" ${paginaAtual >= totalPaginas ? 'disabled' : ''}>&gt;</button>
            </div>
        `;

        tbody.querySelectorAll('.gu-linha-usuario').forEach((tr) => {
            tr.addEventListener('click', () => {
                usuarioSelecionadoId = Number(tr.dataset.id);
                renderizarTabela();
                renderizarDetalhes();
            });
        });

        tbody.querySelectorAll('.gu-btn-acao-linha').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const alvo = listaUsuarios.find((item) => item.id === Number(btn.dataset.id));
                if (!alvo) return;
                usuarioSelecionadoId = alvo.id;
                renderizarTabela();
                renderizarDetalhes();
                if (btn.dataset.acao === 'bloquear') abrirModalBloqueio(alvo);
                if (btn.dataset.acao === 'excluir') abrirModalExclusao(alvo);
            });
        });

        rodape.querySelector('#gu-pag-prev')?.addEventListener('click', () => {
            if (paginaAtual > 1) {
                paginaAtual -= 1;
                renderizarTabela();
            }
        });
        rodape.querySelector('#gu-pag-next')?.addEventListener('click', () => {
            if (paginaAtual < totalPaginas) {
                paginaAtual += 1;
                renderizarTabela();
            }
        });
    }

    function renderizarDetalhes() {
        const painel = pagina.querySelector('#gu-painel-detalhes');
        const usuario = listaUsuarios.find((u) => u.id === usuarioSelecionadoId);

        if (!usuario) {
            painel.innerHTML = `
                <div class="gu-detalhes-topo"><h2>Detalhes do usuário</h2></div>
                <p style="font-size:0.85rem;color:#64748b;">Selecione um usuário na tabela para visualizar os detalhes.</p>
            `;
            return;
        }

        const historicoPadrao = usuario.historico && usuario.historico.length
            ? usuario.historico
            : [
                { data: formatarDataHora(usuario.ultimoAcesso || `${usuario.dataCadastro}T09:00:00`), acao: 'Acesso à plataforma registrado' },
                { data: formatarData(usuario.dataCadastro), acao: `Conta criada (${usuario.tipo})` }
            ];

        painel.innerHTML = `
            <div class="gu-detalhes-topo">
                <h2>Detalhes do usuário</h2>
                <button type="button" class="gu-btn-fechar-detalhe" id="gu-fechar-detalhe" title="Limpar seleção">✕</button>
            </div>

            <div class="gu-perfil-destaque">
                <div class="gu-usuario-cell">
                    <span class="gu-avatar">${escaparHtml(obterIniciais(usuario.nome))}</span>
                    <div>
                        <span class="gu-usuario-nome">${escaparHtml(usuario.nome)}</span>
                        <span class="gu-pill ${classeBadgeTipo(usuario.tipo)}">${escaparHtml(usuario.tipo)}</span>
                    </div>
                </div>
                <span class="gu-pill ${classeBadgeStatus(usuario.status)}">${escaparHtml(usuario.status)}</span>
            </div>

            <div class="gu-abas">
                <button type="button" class="gu-aba-btn ${abaDetalheAtiva === 'informacoes' ? 'ativa' : ''}" data-aba="informacoes">Informações</button>
                <button type="button" class="gu-aba-btn ${abaDetalheAtiva === 'historico' ? 'ativa' : ''}" data-aba="historico">Histórico</button>
            </div>

            ${
                abaDetalheAtiva === 'informacoes'
                    ? `
                        <div class="gu-box-info">
                            <h3>Dados cadastrais</h3>
                            <div class="gu-linha-dado"><span>Nome</span><span>${escaparHtml(usuario.nome)}</span></div>
                            <div class="gu-linha-dado"><span>E-mail</span><span>${escaparHtml(usuario.email)}</span></div>
                            <div class="gu-linha-dado"><span>Empresa vinculada</span><span>${escaparHtml(usuario.empresa || '—')}</span></div>
                            <div class="gu-linha-dado"><span>Status</span><span><span class="gu-pill ${classeBadgeStatus(usuario.status)}">${escaparHtml(usuario.status)}</span></span></div>
                            <div class="gu-linha-dado"><span>Data de cadastro</span><span>${formatarData(usuario.dataCadastro)}</span></div>
                            <div class="gu-linha-dado"><span>Último acesso</span><span>${formatarDataHora(usuario.ultimoAcesso)}</span></div>
                        </div>

                        <div class="gu-box-info">
                            <h3>Plano e assinatura</h3>
                            <div class="gu-linha-dado"><span>Plano atual</span><span>${usuario.tipo === 'Empresa' ? 'Empresarial/Educacional' : 'Padrão'}</span></div>
                            <div class="gu-linha-dado"><span>Status da assinatura</span><span><span class="gu-pill ativa">Ativo</span></span></div>
                            <div class="gu-linha-dado"><span>Próxima cobrança</span><span>05/10/2026</span></div>
                        </div>
                    `
                    : `
                        <div class="gu-box-info">
                            <h3>Histórico de atividades</h3>
                            ${historicoPadrao
                                .map(
                                    (item) => `
                                    <div class="gu-linha-dado">
                                        <span>${escaparHtml(item.data)}</span>
                                        <span>${escaparHtml(item.acao)}</span>
                                    </div>
                                `
                                )
                                .join('')}
                        </div>
                    `
            }

            <div class="gu-acoes-detalhe">
                <button type="button" class="gu-btn-bloquear" id="gu-btn-bloquear-detalhe">🚫 Bloquear usuário</button>
                <button type="button" class="gu-btn-excluir" id="gu-btn-excluir-detalhe">🗑️ Excluir conta</button>
            </div>
        `;

        painel.querySelector('#gu-fechar-detalhe')?.addEventListener('click', () => {
            usuarioSelecionadoId = null;
            renderizarTabela();
            renderizarDetalhes();
        });

        painel.querySelectorAll('.gu-aba-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                abaDetalheAtiva = btn.dataset.aba;
                renderizarDetalhes();
            });
        });

        painel.querySelector('#gu-btn-bloquear-detalhe')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            abrirModalBloqueio(usuario);
        });

        painel.querySelector('#gu-btn-excluir-detalhe')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            abrirModalExclusao(usuario);
        });
    }

    function renderizarTudo() {
        renderizarResumo();
        renderizarTabela();
        renderizarDetalhes();
    }

    pagina.querySelector('#gu-busca').addEventListener('input', (e) => {
        filtros.busca = e.target.value;
        paginaAtual = 1;
        renderizarTabela();
    });

    pagina.querySelector('#gu-filtro-tipo').addEventListener('change', (e) => {
        filtros.tipo = e.target.value;
        paginaAtual = 1;
        renderizarTabela();
    });

    pagina.querySelector('#gu-filtro-status').addEventListener('change', (e) => {
        filtros.status = e.target.value;
        paginaAtual = 1;
        renderizarTabela();
    });

    pagina.querySelector('#gu-filtro-empresa').addEventListener('change', (e) => {
        filtros.empresa = e.target.value;
        paginaAtual = 1;
        renderizarTabela();
    });

    pagina.querySelector('#gu-filtro-data').addEventListener('change', (e) => {
        filtros.data = e.target.value;
        paginaAtual = 1;
        renderizarTabela();
    });

    pagina.querySelector('#gu-limpar-filtros').addEventListener('click', () => {
        filtros = { busca: '', tipo: 'Todos', status: 'Todos', empresa: 'Todas', data: '' };
        pagina.querySelector('#gu-busca').value = '';
        pagina.querySelector('#gu-filtro-tipo').value = 'Todos';
        pagina.querySelector('#gu-filtro-status').value = 'Todos';
        pagina.querySelector('#gu-filtro-empresa').value = 'Todas';
        pagina.querySelector('#gu-filtro-data').value = '';
        paginaAtual = 1;
        renderizarTabela();
    });

    renderizarTudo();
    return pagina;
}