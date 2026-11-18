import { criarSidebar } from '../components/sidebar.js';
import { criarCampo } from '../components/campos.js';

export function renderCadastrarRecrutador() {
    // Contentor principal da página com layout de dashboard (Sidebar + Conteúdo)
    const container = document.createElement('div');
    container.classList.add('page-cadastrar-recrutador', 'layout-dashboard-com-sidebar'); 
    
    const sidebar = criarSidebar('gerenciar-recrutadores'); 
    container.appendChild(sidebar);

    const conteudoPrincipal = document.createElement('div');
    conteudoPrincipal.className = 'conteudo-principal-dashboard';
    conteudoPrincipal.style.cssText = `
        flex: 1;
        padding: 2rem 2.5rem;
        box-sizing: border-box;
        overflow-y: auto;
    `;

    // Título Principal
    const headerTitulo = document.createElement('div');
    headerTitulo.className = 'header-titulo-pagina';
    headerTitulo.innerHTML = `
        <h1>Adicionar recrutador</h1>
        <p>Cadastre um novo recrutador e defina o acesso dele à plataforma.</p>
    `;
    conteudoPrincipal.appendChild(headerTitulo);

    // Formulário Principal
    const form = document.createElement('form');
    form.className = 'form-adicionar-recrutador';

    // ==========================================
    // BLOCO 1: Dados do recrutador
    // ==========================================
    const secaoDados = document.createElement('section');
    secaoDados.className = 'card-secao-formulario';
    secaoDados.innerHTML = `
        <div class="secao-titulo-wrapper">
            <span class="icone-secao">👤</span>
            <div>
                <h2>Dados do recrutador</h2>
                <p>Informe os dados básicos do profissional que terá acesso ao módulo de recrutamento.</p>
            </div>
        </div>
    `;

    const gridCampos = document.createElement('div');
    gridCampos.className = 'grid-campos-duplos';

    // Utilizando o componente criarCampo para os inputs
    const campoNome = criarCampo({
        rotulo: 'Nome completo',
        nome: 'nome',
        placeholder: 'Digite o nome completo',
        obrigatorio: true
    });

    const campoEmail = criarCampo({
        rotulo: 'E-mail',
        nome: 'email',
        tipo: 'email',
        placeholder: 'exemplo@empresa.com',
        obrigatorio: true
    });

    const campoCargo = criarCampo({
        rotulo: 'Cargo',
        nome: 'cargo',
        tipo: 'text', 
        placeholder: 'Digite o cargo (ex: Analista de RH)',
        obrigatorio: true
    });

    const campoStatus = criarCampo({
        rotulo: 'Status',
        nome: 'status',
        tipo: 'select',
        obrigatorio: true,
        valor: 'Ativo',
        opcoes: [
            { rotulo: 'Ativo', valor: 'Ativo' },
            { rotulo: 'Inativo', valor: 'Inativo' }
        ]
    });

    gridCampos.append(campoNome.grupo, campoEmail.grupo, campoCargo.grupo, campoStatus.grupo);
    secaoDados.appendChild(gridCampos);

    // Aviso informativo
    const aviso = document.createElement('div');
    aviso.className = 'aviso-alerta-caixa';
    aviso.innerHTML = `<strong>Importante:</strong> ao cadastrar o recrutador, um convite será enviado para o e-mail informado para que ele possa criar sua senha e acessar a plataforma.`;
    secaoDados.appendChild(aviso);

    form.appendChild(secaoDados);

    // ==========================================
    // BLOCO 2: Permissões de acesso
    // ==========================================
    const secaoPermissoes = document.createElement('section');
    secaoPermissoes.className = 'card-secao-formulario';
    secaoPermissoes.innerHTML = `
        <div class="secao-titulo-wrapper">
            <span class="icone-secao">🔒</span>
            <div>
                <h2>Permissões de acesso</h2>
                <p>Defina quais funcionalidades estarão disponíveis para este recrutador.</p>
            </div>
        </div>
    `;

    const permissoesGrid = document.createElement('div');
    permissoesGrid.className = 'grid-permissoes-checkbox';

    const listaPermissoes = [
        { id: 'perm-vagas', nome: 'gerenciar_vagas', titulo: 'Gerenciar vagas', desc: 'Permitir criar, editar, publicar e encerrar vagas.', marcado: true },
        { id: 'perm-candidatos', nome: 'gerenciar_candidatos', titulo: 'Gerenciar candidatos', desc: 'Permitir visualizar e acompanhar candidatos.', marcado: true },
        { id: 'perm-processos', nome: 'processos_seletivos', titulo: 'Processos seletivos', desc: 'Permitir movimentar candidatos entre etapas.', marcado: true },
        { id: 'perm-agenda', nome: 'agenda', titulo: 'Agenda', desc: 'Permitir criar e gerenciar entrevistas.', marcado: true },
        { id: 'perm-relatorios', nome: 'relatorios', titulo: 'Relatórios', desc: 'Permitir visualizar relatórios de recrutamento.', marcado: false },
        { id: 'perm-talentos', nome: 'banco_talentos', titulo: 'Banco de talentos', desc: 'Permitir acessar o banco de talentos da empresa.', marcado: false }
    ];

    listaPermissoes.forEach(p => {
        const labelCheck = document.createElement('label');
        labelCheck.className = 'checkbox-card-opcao';
        labelCheck.innerHTML = `
            <input type="checkbox" name="${p.nome}" ${p.marcado ? 'checked' : ''}>
            <div class="checkbox-info">
                <strong>${p.titulo}</strong>
                <span>${p.desc}</span>
            </div>
        `;
        permissoesGrid.appendChild(labelCheck);
    });

    secaoPermissoes.appendChild(permissoesGrid);
    form.appendChild(secaoPermissoes);

    // ==========================================
    // BOTÕES DE AÇÃO (Cancelar / Cadastrar)
    // ==========================================
    const footerAcoes = document.createElement('div');
    footerAcoes.className = 'form-footer-acoes';

    const btnCancelar = document.createElement('button');
    btnCancelar.type = 'button';
    btnCancelar.className = 'btn-secundario';
    btnCancelar.textContent = 'Cancelar';
    btnCancelar.addEventListener('click', () => {
        window.location.hash = '#gerenciar-recrutadores';
    });

    const btnCadastrar = document.createElement('button');
    btnCadastrar.type = 'submit';
    btnCadastrar.className = 'btn-primario';
    btnCadastrar.textContent = 'Cadastrar recrutador';

    footerAcoes.append(btnCancelar, btnCadastrar);
    form.appendChild(footerAcoes);

    // Evento de submissão do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const dadosRecrutador = Object.fromEntries(formData.entries());
        
        console.log("Dados do recrutador a salvar:", dadosRecrutador);
        alert("Recrutador cadastrado com sucesso!");
        window.location.hash = '#gerenciar-recrutadores';
    });

    conteudoPrincipal.appendChild(form);
    container.appendChild(conteudoPrincipal);

    return container;
}