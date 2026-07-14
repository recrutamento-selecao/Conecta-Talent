function criarItemSidebar(icone, texto, href, alt, possuiSubmenu){
    const itemSidebar= document.createElement('div');
    itemSidebar.classList.add('item-sidebar');

    const iconeSidebar = document.createElement('img');
    iconeSidebar.classList.add('icone-sidebar');
    iconeSidebar.src = icone;
    iconeSidebar.alt = alt;

    const linkSidebar = document.createElement('a');
    linkSidebar.classList.add('link-sidebar')
    linkSidebar.href = href;
    linkSidebar.textContent = texto;

    itemSidebar.appendChild(iconeSidebar);
    itemSidebar.appendChild(linkSidebar);
    
    if(possuiSubmenu){
        const iconeSetaDireita = document.createElement('img');
        iconeSetaDireita.classList.add('seta-direita-menu');
        iconeSetaDireita.src = "assets/icons/arrow-right-branco.svg";
        iconeSetaDireita.alt = "Seta Direita";

        itemSidebar.appendChild(iconeSetaDireita);
    }
    

    return itemSidebar;
    
}

function criarSubmenu(opcoes){
    const submenu = document.createElement('div');
    submenu.classList.add('submenu');

    for(const opcao of opcoes){ //para cada opcao que existir dentro do array opcoes, execute. 
        const itemSubmenu = document.createElement('a');
        itemSubmenu.classList.add('item-submenu');

        itemSubmenu.textContent = opcao.texto;
        itemSubmenu.href = opcao.href;
        

        submenu.appendChild(itemSubmenu);
    }

    return submenu;
}

export function criarSidebar(tipoUsuario, nomeUsuario){ //disponibilizando a função para que outros arquivos possam usar.
    const campoLogo = document.createElement('div');
    campoLogo.classList.add("campo-logo");
    const imgLogo = document.createElement('img');
    imgLogo.classList.add("img-logo");
    imgLogo.src = "assets/images/icone-logo.png"
    const textoLogo = document.createElement('div');
    textoLogo.classList.add('campo-texto');
    const primeiroNomeLogo = document.createElement('h1');
    primeiroNomeLogo.classList.add('primeiro-nome-logo');
    primeiroNomeLogo.textContent = "Conecta"
    const segundoNomeLogo = document.createElement('p');
    segundoNomeLogo.classList.add('segundo-nome-logo');
    segundoNomeLogo.textContent = "Talent";
    const sidebar = document.createElement('aside');
    sidebar.classList.add('sidebar');
    const menuSidebar = document.createElement('nav');
    menuSidebar.classList.add('menu-sidebar');

    switch(tipoUsuario){
        case "administrador":{
            
            const dashboard = criarItemSidebar(
            "assets/icons/home.svg",
            "Dashboard",
            "dashboard-administrador.html",
            "ícone Dashboard", 
            false
            )
             
            menuSidebar.appendChild(dashboard);

            const usuariosSistema = criarItemSidebar(
            "assets/icons/users-branco.svg",
            "Usuários",
            "dashboard-administrador.html",
            "ícone Usuários", 
            true
            )

            menuSidebar.appendChild(usuariosSistema);

            const planosSistema = criarItemSidebar(
            "assets/icons/box-branco.svg",
            "Planos",
            "dashboard-administrador.html",
            "ícone Planos"
            )

            menuSidebar.appendChild(planosSistema); 

            const assinaturaSistema = criarItemSidebar(
            "assets/icons/license-branco.svg",
            "Assinaturas",
            "dashboard-administrador.html",
            "ícone Assinatura"
            )

            menuSidebar.appendChild(assinaturaSistema);

            
            const relatorioSistema = criarItemSidebar(
            "assets/icons/file-analytics-branco.svg",
            "Relatórios",
            "dashboard-administrador.html",
            "ícone Relatório"
            )

            menuSidebar.appendChild(relatorioSistema);

            const configuracaoSistema = criarItemSidebar(
            "assets/icons/settings-branco.svg",
            "Configuração",
            "dashboard-administrador.html",
            "ícone Configuração"
            )

            menuSidebar.appendChild(configuracaoSistema);
        
            break;
    }
            case "empresa": {

            const dashboard = criarItemSidebar(
            "assets/icons/home.svg",
            "Dashboard",
            "dashboard-administrador.html",
            "ícone Dashboard"
            )
             
            menuSidebar.appendChild(dashboard);

            const usuariosSistema = criarItemSidebar(
            "assets/icons/users-branco.svg",
            "Recrutadores",
            "dashboard-administrador.html",
            "ícone Recrutadores"
            )

            menuSidebar.appendChild(usuariosSistema);

            const gestaoVagas = criarItemSidebar(
            "assets/icons/clipboard-text-branco.svg",
            "Gestão de vagas",
            "dashboard-administrador.html",
            "ícone Planos"
            )

            menuSidebar.appendChild(gestaoVagas); 

            const assinaturaSistema = criarItemSidebar(
            "assets/icons/license-branco.svg",
            "Assinaturas",
            "dashboard-administrador.html",
            "ícone Assinatura"
            )

            menuSidebar.appendChild(assinaturaSistema);

            
            const relatorioSistema = criarItemSidebar(
            "assets/icons/file-analytics-branco.svg",
            "Relatórios",
            "dashboard-administrador.html",
            "ícone Relatório"
            )

            menuSidebar.appendChild(relatorioSistema);

            const configuracaoSistema = criarItemSidebar(
            "assets/icons/settings-branco.svg",
            "Configuração",
            "dashboard-administrador.html",
            "ícone Configuração"
            )

            menuSidebar.appendChild(configuracaoSistema);

            break;
        }

        case "recrutador": {

            const dashboard = criarItemSidebar(
            "assets/icons/home.svg",
            "Dashboard",
            "dashboard-administrador.html",
            "ícone Dashboard",
            false
            )
             
            menuSidebar.appendChild(dashboard);

            const criacaoVagas = criarItemSidebar(
            "assets/icons/briefcase-branco.svg",
            "Vagas",
            "dashboard-administrador.html",
            "ícone Vagas",
            true
            )

            const submenuVagas = criarSubmenu([
                {
                    texto: "Criar Vaga",
                    href:"#"
                },
                {
                    texto: "Minhas Vagas",
                    href:"#"
                },
                {
                    texto: "Vagas Ativas",
                    href:"#"
                },
                {
                    texto: "Vagas Encerradas",
                    href:"#"
                }
            ]);


            menuSidebar.appendChild(criacaoVagas);
            menuSidebar.appendChild(submenuVagas);

            const processosSeletivos = criarItemSidebar(
            "assets/icons/clipboard-text-branco.svg",
            "Processos seletivos",
            "dashboard-administrador.html",
            "ícone Vagas", 
            true
            )

            menuSidebar.appendChild(processosSeletivos);

            const bancoTalentos = criarItemSidebar(
            "assets/icons/users-branco.svg",
            "Banco de talentos",
            "dashboard-administrador.html",
            "ícone Banco de Talentos", 
            true
            )

            menuSidebar.appendChild(bancoTalentos);

            const candidaturas = criarItemSidebar(
            "assets/icons/file-description-branco.svg",
            "Candidaturas",
            "dashboard-administrador.html",
            "ícone Planos", 
            true
            )

            menuSidebar.appendChild(candidaturas); 

            const agenda = criarItemSidebar(
            "assets/icons/calendar-week-branco.svg",
            "Agenda",
            "dashboard-administrador.html",
            "ícone Agenda", 
            true
            )

            menuSidebar.appendChild(agenda); 

            const relatorioSistema = criarItemSidebar(
            "assets/icons/file-analytics-branco.svg",
            "Relatórios",
            "dashboard-administrador.html",
            "ícone Relatório",
            true
            )

            menuSidebar.appendChild(relatorioSistema);

            const perfil = criarItemSidebar(
            "assets/icons/settings-branco.svg",
            "Perfil",
            "dashboard-administrador.html",
            "ícone Perfil",
            true
            )

            menuSidebar.appendChild(perfil);

            break;
        }

        case "candidato": {

            const dashboard = criarItemSidebar(
            "assets/icons/home.svg",
            "Dashboard",
            "dashboard-administrador.html",
            "ícone Dashboard",
            false
            )
             
            menuSidebar.appendChild(dashboard);

            const procurarVagas = criarItemSidebar(
            "assets/icons/search-branco.svg",
            "Vagas",
            "dashboard-administrador.html",
            "ícone Vagas"
            )

            menuSidebar.appendChild(procurarVagas);

            const minhasCandidaturas = criarItemSidebar(
            "assets/icons/clipboard-text-branco.svg",
            "Minhas Candidaturas",
            "dashboard-administrador.html",
            "ícone Vagas"
            )

            menuSidebar.appendChild(minhasCandidaturas);

            const curriculo = criarItemSidebar(
            "assets/icons/file-description-branco.svg",
            "Currículo",
            "dashboard-administrador.html",
            "ícone Curriculo"
            )

            menuSidebar.appendChild(curriculo); 

            const agenda = criarItemSidebar(
            "assets/icons/calendar-week-branco.svg",
            "Agenda",
            "dashboard-administrador.html",
            "ícone Agenda"
            )

            menuSidebar.appendChild(agenda); 

            const perfil = criarItemSidebar(
            "assets/icons/settings-branco.svg",
            "Perfil",
            "dashboard-administrador.html",
            "ícone Perfil"
            )

            menuSidebar.appendChild(perfil);

            break;
        }


    }
    
    const linhaSidebar = document.createElement('hr');
    linhaSidebar.classList.add('linha-sidebar');

    const campoPerfilLogado = document.createElement('div');
    campoPerfilLogado.classList.add('campo-perfil-logado');

    const iconePerfil = document.createElement('img');
    iconePerfil.classList.add('icone-perfil');
    iconePerfil.src = "assets/icons/user-circle.svg";
    
    const rodapeSidebar = document.createElement('div');
    rodapeSidebar.classList.add('rodape-sidebar');

    const informacoesUsuario = document.createElement('div');
    informacoesUsuario.classList.add('campo-informacoes-usuario');

    const usuario = document.createElement('p')
    usuario.classList.add('nome-usuario');
    usuario.textContent = nomeUsuario;

    const funcaoUsuario = document.createElement('p');
    funcaoUsuario.classList.add('funcao-usuario');
    funcaoUsuario.textContent =  tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1);

    const campoSair = document.createElement('div');
    campoSair.classList.add('campo-sair');

    const iconeSair = document.createElement('img');
    iconeSair.classList.add('icone-sair');
    iconeSair.src = "assets/icons/logout.svg";

    const textoSair = document.createElement('p');
    textoSair.classList.add('texto-sair');
    textoSair.textContent = "Sair";

    
    campoLogo.appendChild(imgLogo);
    campoLogo.appendChild(textoLogo);
    textoLogo.appendChild(primeiroNomeLogo);
    textoLogo.appendChild(segundoNomeLogo);
    
   
    rodapeSidebar.appendChild(linhaSidebar);
    rodapeSidebar.appendChild(campoPerfilLogado);
    rodapeSidebar.appendChild(campoSair);
    campoPerfilLogado.appendChild(iconePerfil);
    campoPerfilLogado.appendChild(informacoesUsuario);
    informacoesUsuario.appendChild(usuario);
    informacoesUsuario.appendChild(funcaoUsuario);

    sidebar.appendChild(campoLogo);
    sidebar.appendChild(menuSidebar);
    sidebar.appendChild(rodapeSidebar);
  
    campoSair.appendChild(iconeSair);
    campoSair.appendChild(textoSair);
    
    return sidebar;

}

