
function criarItemSidebar(icone, texto, href, alt, possuiSubmenu = false) {
    const itemSidebar = document.createElement('div');
    itemSidebar.classList.add('item-sidebar');

    const iconeSidebar = document.createElement('img');
    iconeSidebar.classList.add('icone-sidebar');
    iconeSidebar.src = icone;
    iconeSidebar.alt = alt;

    const linkSidebar = document.createElement('a');
    linkSidebar.classList.add('link-sidebar');
    linkSidebar.href = href;
    linkSidebar.textContent = texto;

    itemSidebar.append(iconeSidebar, linkSidebar);

    if (possuiSubmenu) {
        const iconeSetaDireita = document.createElement('img');
        iconeSetaDireita.classList.add('seta-direita-menu');
        iconeSetaDireita.src = 'assets/icons/arrow-right-branco.svg';
        iconeSetaDireita.alt = 'Seta Direita';

        itemSidebar.appendChild(iconeSetaDireita);
    }

    return itemSidebar;
}

function criarSubmenu(opcoes) {
    const submenu = document.createElement('div');
    submenu.classList.add('submenu');

    for (const opcao of opcoes) {
        const itemSubmenu = document.createElement('a');
        itemSubmenu.classList.add('item-submenu');
        itemSubmenu.textContent = opcao.texto;
        itemSubmenu.href = opcao.href;

        submenu.appendChild(itemSubmenu);
    }

    return submenu;
}

function criarGrupoMenu(icone, texto, alt, opcoes) {
    const container = document.createElement('div');
    container.classList.add('container-submenu');

    const item = criarItemSidebar(
        icone,
        texto,
        '#',
        alt,
        true
    );

    const submenu = criarSubmenu(opcoes);
    const seta = item.querySelector('.seta-direita-menu');

    item.addEventListener('click', (event) => {
        event.preventDefault();

        submenu.classList.toggle('ativo');
        seta.classList.toggle('ativa');
    });

    container.append(item, submenu);

    return container;
}

function criarDashboard(href) {
    return criarItemSidebar(
        'assets/icons/home.svg',
        'Dashboard',
        href,
        'Ícone Dashboard',
        false
    );
}

export function criarSidebar(tipoUsuario, nomeUsuario) {
    const sidebar = document.createElement('aside');
    sidebar.classList.add('sidebar');

    const cabecalhoSidebar = document.createElement('div');
    cabecalhoSidebar.classList.add('cabecalho-sidebar');

    const botaoMenu = document.createElement('button');
    botaoMenu.type = 'button';
    botaoMenu.classList.add('btn-menu');

    const iconeMenu = document.createElement('img');
    iconeMenu.classList.add('icone-menu');
    iconeMenu.src = 'assets/icons/menu-branco.svg';
    iconeMenu.alt = 'Ícone menu';

    botaoMenu.appendChild(iconeMenu);

    botaoMenu.addEventListener('click', () => {
        sidebar.classList.toggle('fechada');
    });

    const campoLogo = document.createElement('div');
    campoLogo.classList.add('campo-logo');

    const imgLogo = document.createElement('img');
    imgLogo.classList.add('img-logo');
    imgLogo.src = 'assets/images/icone-logo.png';
    imgLogo.alt = 'Logo Conecta Talent';

    const textoLogo = document.createElement('div');
    textoLogo.classList.add('campo-texto');

    const primeiroNomeLogo = document.createElement('h1');
    primeiroNomeLogo.classList.add('primeiro-nome-logo');
    primeiroNomeLogo.textContent = 'Conecta';

    const segundoNomeLogo = document.createElement('p');
    segundoNomeLogo.classList.add('segundo-nome-logo');
    segundoNomeLogo.textContent = 'Talent';

    textoLogo.append(primeiroNomeLogo, segundoNomeLogo);
    campoLogo.append(imgLogo, textoLogo);

    cabecalhoSidebar.append(botaoMenu, campoLogo);

    const menuSidebar = document.createElement('nav');
    menuSidebar.classList.add('menu-sidebar');

    switch (tipoUsuario) {
        case 'administrador': {
            menuSidebar.appendChild(criarDashboard('#/dashboard-administrador'));

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/users-branco.svg',
                    'Usuários',
                    'Ícone Usuários',
                    [
                        { texto: 'Gerenciar usuários', href: '#/usuarios' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/box-branco.svg',
                    'Planos',
                    'Ícone Planos',
                    [
                        { texto: 'Gerenciar planos', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/license-branco.svg',
                    'Assinaturas',
                    'Ícone Assinaturas',
                    [
                        { texto: 'Gerenciar assinaturas', href: '#' },
                        { texto: 'Pagamentos', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/file-analytics-branco.svg',
                    'Relatórios',
                    'Ícone Relatórios',
                    [
                        { texto: 'Relatório de usuários', href: '#' },
                        { texto: 'Relatório de assinaturas', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/settings-branco.svg',
                    'Configuração',
                    'Ícone Configuração',
                    [
                        { texto: 'Preferências', href: '#' },
                        { texto: 'Segurança', href: '#' }
                    ]
                )
            );

            break;
        }

        case 'empresa': {
            menuSidebar.appendChild(criarDashboard('#/dashboard-empresa'));

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/users-branco.svg',
                    'Recrutadores',
                    'Ícone Recrutadores',
                    [
                        { texto: 'Gerenciar recrutadores', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/clipboard-text-branco.svg',
                    'Gestão de vagas',
                    'Ícone Gestão de vagas',
                    [
                        { texto: 'Gerenciar vagas', href: '#' },
                        { texto: 'Vagas ativas', href: '#' },
                        { texto: 'Vagas encerradas', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/license-branco.svg',
                    'Assinaturas',
                    'Ícone Assinaturas',
                    [
                        { texto: 'Meu plano', href: '#' },
                        { texto: 'Pagamentos', href: '#' },
                        { texto: 'Histórico', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/file-analytics-branco.svg',
                    'Relatórios',
                    'Ícone Relatórios',
                    [
                        { texto: 'Relatório de vagas', href: '#' },
                        { texto: 'Relatório de recrutadores', href: '#' },
                        { texto: 'Relatório de contratações', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/settings-branco.svg',
                    'Configuração',
                    'Ícone Configuração',
                    [
                        { texto: 'Dados da empresa', href: '#' },
                        { texto: 'Preferências', href: '#' },
                        { texto: 'Segurança', href: '#' }
                    ]
                )
            );

            break;
        }

        case 'recrutador': {
            menuSidebar.appendChild(criarDashboard('#/dashboard-recrutador'));

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/briefcase-branco.svg',
                    'Vagas',
                    'Ícone Vagas',
                    [
                        { texto: 'Criar vaga', href: '#' },
                        { texto: 'Minhas vagas', href: '#' },
                        { texto: 'Vagas ativas', href: '#' },
                        { texto: 'Vagas encerradas', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/clipboard-text-branco.svg',
                    'Processos seletivos',
                    'Ícone Processos seletivos',
                    [
                        { texto: 'Criar processo seletivo', href: '#' },
                        { texto: 'Meus processos', href: '#' },
                        { texto: 'Processos ativos', href: '#' },
                        { texto: 'Processos encerrados', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/users-branco.svg',
                    'Banco de talentos',
                    'Ícone Banco de Talentos',
                    [
                        { texto: 'Buscar candidatos', href: '#' },
                        { texto: 'Favoritos', href: '#' },
                        { texto: 'Candidatos salvos', href: '#' },
                        { texto: 'Convites enviados', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/file-description-branco.svg',
                    'Candidaturas',
                    'Ícone Candidaturas',
                    [
                        { texto: 'Recebidas', href: '#' },
                        { texto: 'Em triagem', href: '#' },
                        { texto: 'Em processo', href: '#' },
                        { texto: 'Finalizadas', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/calendar-week-branco.svg',
                    'Agenda',
                    'Ícone Agenda',
                    [
                        { texto: 'Calendário', href: '#' },
                        { texto: 'Entrevistas', href: '#' },
                        { texto: 'Reuniões', href: '#' },
                        { texto: 'Eventos', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/file-analytics-branco.svg',
                    'Relatórios',
                    'Ícone Relatórios',
                    [
                        { texto: 'Relatório de vagas', href: '#' },
                        { texto: 'Relatório de processos seletivos', href: '#' },
                        { texto: 'Relatório de candidaturas', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/settings-branco.svg',
                    'Perfil',
                    'Ícone Perfil',
                    [
                        { texto: 'Meus dados', href: '#' },
                        { texto: 'Alterar senha', href: '#' },
                        { texto: 'Preferências', href: '#' },
                        { texto: 'Notificações', href: '#' }
                    ]
                )
            );

            break;
        }

        case 'candidato': {
            menuSidebar.appendChild(criarDashboard('#/dashboard-candidato'));

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/search-branco.svg',
                    'Vagas',
                    'Ícone Vagas',
                    [
                        { texto: 'Buscar vagas', href: '#' },
                        { texto: 'Vagas favoritas', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/clipboard-text-branco.svg',
                    'Candidaturas',
                    'Ícone Candidaturas',
                    [
                        { texto: 'Minhas candidaturas', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/file-description-branco.svg',
                    'Currículo',
                    'Ícone Currículo',
                    [
                        { texto: 'Meu currículo', href: '#/cadastro' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/calendar-week-branco.svg',
                    'Agenda',
                    'Ícone Agenda',
                    [
                        { texto: 'Entrevistas', href: '#' },
                        { texto: 'Calendário', href: '#' }
                    ]
                )
            );

            menuSidebar.appendChild(
                criarGrupoMenu(
                    'assets/icons/settings-branco.svg',
                    'Perfil',
                    'Ícone Perfil',
                    [
                        { texto: 'Meus dados', href: '#' },
                        { texto: 'Alterar senha', href: '#' },
                        { texto: 'Preferências', href: '#' }
                    ]
                )
            );

            break;
        }

        default: {
            console.error(`Tipo de usuário inválido: ${tipoUsuario}`);
            break;
        }
    }

    const rodapeSidebar = document.createElement('div');
    rodapeSidebar.classList.add('rodape-sidebar');

    const linhaSidebar = document.createElement('hr');
    linhaSidebar.classList.add('linha-sidebar');

    const campoPerfilLogado = document.createElement('div');
    campoPerfilLogado.classList.add('campo-perfil-logado');

    const iconePerfil = document.createElement('img');
    iconePerfil.classList.add('icone-perfil');
    iconePerfil.src = 'assets/icons/user-circle.svg';
    iconePerfil.alt = 'Perfil do usuário';

    const informacoesUsuario = document.createElement('div');
    informacoesUsuario.classList.add('campo-informacoes-usuario');

    const usuario = document.createElement('p');
    usuario.classList.add('nome-usuario');
    usuario.textContent = nomeUsuario;

    const funcaoUsuario = document.createElement('p');
    funcaoUsuario.classList.add('funcao-usuario');
    funcaoUsuario.textContent =
        tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1);

    informacoesUsuario.append(usuario, funcaoUsuario);
    campoPerfilLogado.append(iconePerfil, informacoesUsuario);

    const campoSair = document.createElement('div');
    campoSair.classList.add('campo-sair');

    const iconeSair = document.createElement('img');
    iconeSair.classList.add('icone-sair');
    iconeSair.src = 'assets/icons/logout.svg';
    iconeSair.alt = 'Sair';

    const textoSair = document.createElement('p');
    textoSair.classList.add('texto-sair');
    textoSair.textContent = 'Sair';

    campoSair.append(iconeSair, textoSair);

    rodapeSidebar.append(
        linhaSidebar,
        campoPerfilLogado,
        campoSair
    );

    sidebar.append(
        cabecalhoSidebar,
        menuSidebar,
        rodapeSidebar
    );

    return sidebar;
}
