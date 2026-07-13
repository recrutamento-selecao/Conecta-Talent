function criarItemSidebar(icone, texto, href, alt){
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

    return itemSidebar;
    
}

export function criarSidebar(tipoUsuario){ //disponibilizando a função para que outros arquivos possam usar.
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
        case "administrador":
            
            const dashboard = criarItemSidebar(
            "assets/icons/home.svg",
            "Dashboard",
            "dashboard-administrador.html",
            "ícone Dashboard"
            )
             
            menuSidebar.appendChild(dashboard);

            const usuariosSistema = criarItemSidebar(
            "assets/icons/users-branco.svg",
            "Usuários",
            "dashboard-administrador.html",
            "ícone Usuários"
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
    
    const linhaSidebar = document.createElement('hr');
    linhaSidebar.classList.add('linha-sidebar');

    const campoPerfilLogado = document.createElement('div');
    campoPerfilLogado.classList.add('campo-perfil-logado');

    const iconePerfil = document.createElement('img');
    iconePerfil.classList.add('icone-perfil');
    iconePerfil.src = "assets/icons/user-circle.svg";
    
    const informacoesUsuario = document.createElement('div');
    informacoesUsuario.classList.add('campo-informacoes-usuario');

    const nomeUsuario = document.createElement('p')
    nomeUsuario.classList.add('nome-usuario');
    nomeUsuario.textContent = "João Silva"

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

    sidebar.appendChild(campoLogo);
    campoLogo.appendChild(imgLogo);
    campoLogo.appendChild(textoLogo);
    textoLogo.appendChild(primeiroNomeLogo);
    textoLogo.appendChild(segundoNomeLogo);
    sidebar.appendChild(menuSidebar);
   
    menuSidebar.appendChild(linhaSidebar);
    menuSidebar.appendChild(campoPerfilLogado);
    campoPerfilLogado.appendChild(iconePerfil);
    campoPerfilLogado.appendChild(informacoesUsuario);
    informacoesUsuario.appendChild(nomeUsuario);
    informacoesUsuario.appendChild(funcaoUsuario);
    
    menuSidebar.appendChild(campoSair);
    campoSair.appendChild(iconeSair);
    campoSair.appendChild(textoSair);
    
    return sidebar;

}

