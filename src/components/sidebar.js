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

export function criarSidebar(){ //disponibilizando a função para que outros arquivos possam usar.
    const campoLogo = document.createElement('div');
    campoLogo.classList.add("campo-logo");
    const imgLogo = document.createElement('img');
    imgLogo.classList.add("img-logo");
    imgLogo.src = "assets/images/logo-conecta-talent.svg"


    const sidebar = document.createElement('aside');
    sidebar.classList.add('sidebar');

    const menuSidebar = document.createElement('nav');
    menuSidebar.classList.add('menu-sidebar');

    const dashboard = criarItemSidebar(
    "assets/icons/home.svg",
    "Dashboard",
    "dashboard-administrador.html",
    "ícone Dashboard"
    )

    const usuariosSistema = criarItemSidebar(
    "assets/icons/users-branco.svg",
    "Usuários",
    "dashboard-administrador.html",
    "ícone Usuários"
    )

    const planosSistema = criarItemSidebar(
    "assets/icons/box-branco.svg",
    "Planos",
    "dashboard-administrador.html",
    "ícone Planos"
    )

    const assinaturaSistema = criarItemSidebar(
    "assets/icons/license-branco.svg",
    "Assinaturas",
    "dashboard-administrador.html",
    "ícone Assinatura"
    )

    
    const relatorioSistema = criarItemSidebar(
    "assets/icons/file-analytics-branco.svg",
    "Relatórios",
    "dashboard-administrador.html",
    "ícone Relatório"
    )

    const configuracaoSistema = criarItemSidebar(
    "assets/icons/settings-branco.svg",
    "Configuração",
    "dashboard-administrador.html",
    "ícone Configuração"
    )

    sidebar.appendChild(campoLogo);
    campoLogo.appendChild(imgLogo);
    sidebar.appendChild(menuSidebar);
    menuSidebar.appendChild(dashboard);
    menuSidebar.appendChild(usuariosSistema);
    menuSidebar.appendChild(planosSistema); 
    menuSidebar.appendChild(assinaturaSistema);
    menuSidebar.appendChild(relatorioSistema);
    menuSidebar.appendChild(configuracaoSistema);
   
    return sidebar;

}

