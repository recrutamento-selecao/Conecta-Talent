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
    imgLogo.src = "assets/images/icone-logo.png"
    const textoLogo = document.createElement('div');
    textoLogo.classList.add('campo-texto');
    const primeiroNomeLogo = document.createElement('h1');
    primeiroNomeLogo.classList.add('primeiro-nome-logo');
    primeiroNomeLogo.textContent = "Conecta"
    const segundoNomeLogo = document.createElement('p');
    segundoNomeLogo.classList.add('segundo-nome-logo');
    segundoNomeLogo.textContent = "Talent"

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

    const linhaSidebar = document.createElement('hr');
    linhaSidebar.classList.add('linha-sidebar')

    sidebar.appendChild(campoLogo);
    campoLogo.appendChild(imgLogo);
    campoLogo.appendChild(textoLogo);
    textoLogo.appendChild(primeiroNomeLogo);
    textoLogo.appendChild(segundoNomeLogo);
    sidebar.appendChild(menuSidebar);
    menuSidebar.appendChild(dashboard);
    menuSidebar.appendChild(usuariosSistema);
    menuSidebar.appendChild(planosSistema); 
    menuSidebar.appendChild(assinaturaSistema);
    menuSidebar.appendChild(relatorioSistema);
    menuSidebar.appendChild(configuracaoSistema);

    menuSidebar.appendChild(linhaSidebar);
   
    return sidebar;

}

