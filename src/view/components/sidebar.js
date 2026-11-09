const MENUS_POR_PERFIL = {
    administrador: [
        { id: "dashboard", icone: "assets/icons/home.svg", texto: "Dashboard", href: "dashboard-administrador.html" },
        {
            id: "usuarios", icone: "assets/icons/users-branco.svg", texto: "Usuários",
            submenu: [
                { texto: "Gerenciar usuários", href: "gerenciar-usuarios.html" }
            ]
        },
        {
            id: "planos", icone: "assets/icons/box-branco.svg", texto: "Planos",
            submenu: [
                { texto: "Gerenciar planos", href: "gerenciar-planos.html" }
            ]
        },
        {
            id: "assinaturas", icone: "assets/icons/license-branco.svg", texto: "Assinaturas",
            submenu: [
                { texto: "Gerenciar assinaturas", href: "gerenciar-assinaturas.html" },
                { texto: "Pagamentos", href: "pagamentos-admin.html" }
            ]
        },
        {
            id: "relatorios", icone: "assets/icons/file-analytics-branco.svg", texto: "Relatórios",
            submenu: [
                { texto: "Relatório de usuários", href: "relatorio-usuarios.html" },
                { texto: "Relatório de assinaturas", href: "relatorio-assinaturas.html" }
            ]
        },
        {
            id: "configuracao", icone: "assets/icons/settings-branco.svg", texto: "Configurações",
            submenu: [
                { texto: "Geral", href: "configuracoes-geral.html" },
                { texto: "Segurança", href: "configuracoes-seguranca.html" }
            ]
        }
    ],
 
    empresa: [
        { id: "dashboard", icone: "assets/icons/home.svg", texto: "Dashboard", href: "dashboard-empresa.html" },
        {
            id: "recrutadores", icone: "assets/icons/users-branco.svg", texto: "Recrutadores",
            submenu: [
                { texto: "Gerenciar recrutadores", href: "gerenciar-recrutadores.html" }
            ]
        },
        {
            id: "vagas", icone: "assets/icons/clipboard-text-branco.svg", texto: "Gestão de vagas",
            submenu: [
                { texto: "Gerenciar vagas", href: "gerenciar-vagas.html" },
                { texto: "Vagas ativas", href: "vagas-ativas-empresa.html" },
                { texto: "Vagas encerradas", href: "vagas-encerradas-empresa.html" }
            ]
        },
        {
            id: "assinaturas", icone: "assets/icons/license-branco.svg", texto: "Assinaturas",
            submenu: [
                { texto: "Meu plano", href: "meu-plano.html" },
                { texto: "Pagamentos", href: "historico-pagamentos.html" }
            ]
        },
        {
            id: "relatorios", icone: "assets/icons/file-analytics-branco.svg", texto: "Relatórios",
            submenu: [
                { texto: "Relatório de vagas", href: "relatorio-vagas-empresa.html" },
                { texto: "Relatório de contratações", href: "relatorio-contratacoes.html" }
            ]
        },
        {
            id: "configuracao", icone: "assets/icons/settings-branco.svg", texto: "Configuração",
            submenu: [
                { texto: "Dados da empresa", href: "dados-empresa.html" },
                { texto: "Segurança", href: "seguranca-empresa.html" }
            ]
        }
    ],
 
    recrutador: [
        { id: "dashboard", icone: "assets/icons/home.svg", texto: "Dashboard", href: "dashboard-recrutador.html" },
        {
            id: "vagas", icone: "assets/icons/briefcase-branco.svg", texto: "Vagas",
            submenu: [
                { texto: "Criar Vaga", href: "criar-vaga.html" },
                { texto: "Minhas Vagas", href: "minhas-vagas.html" },
                { texto: "Vagas Ativas", href: "vagas-ativas.html" },
                { texto: "Vagas Encerradas", href: "vagas-encerradas.html" }
            ]
        },
        {
            id: "processos", icone: "assets/icons/clipboard-text-branco.svg", texto: "Processos Seletivos",
            submenu: [
                { texto: "Criar Processo", href: "criar-processo.html" },
                { texto: "Meus Processos", href: "meus-processos.html" }
            ]
        },
        {
            id: "talentos", icone: "assets/icons/users-branco.svg", texto: "Banco de Talentos",
            submenu: [
                { texto: "Buscar Candidatos", href: "buscar-candidatos.html" },
                { texto: "Favoritos", href: "candidatos-favoritos.html" }
            ]
        },
        {
            id: "candidaturas", icone: "assets/icons/file-description-branco.svg", texto: "Candidaturas",
            submenu: [
                { texto: "Recebidas", href: "candidaturas-recebidas.html" },
                { texto: "Em Triagem", href: "candidaturas-triagem.html" }
            ]
        },
        {
            id: "agenda", icone: "assets/icons/calendar-week-branco.svg", texto: "Agenda",
            submenu: [
                { texto: "Calendário", href: "agenda-calendario.html" },
                { texto: "Entrevistas", href: "agenda-entrevistas.html" }
            ]
        },
        {
            id: "perfil", icone: "assets/icons/settings-branco.svg", texto: "Perfil",
            submenu: [
                { texto: "Meus Dados", href: "meus-dados-recrutador.html" },
                { texto: "Alterar Senha", href: "alterar-senha-recrutador.html" }
            ]
        }
    ],
 
    candidato: [
        { id: "dashboard", icone: "assets/icons/home.svg", texto: "Dashboard", href: "dashboard-candidato.html" },
        {
            id: "vagas", icone: "assets/icons/search-branco.svg", texto: "Vagas",
            submenu: [
                { texto: "Buscar vagas", href: "buscar-vagas.html" },
                { texto: "Vagas favoritas", href: "vagas-favoritas.html" }
            ]
        },
        {
            id: "candidaturas", icone: "assets/icons/clipboard-text-branco.svg", texto: "Candidaturas",
            submenu: [
                { texto: "Minhas candidaturas", href: "minhas-candidaturas.html" }
            ]
        },
        {
            id: "curriculo", icone: "assets/icons/file-description-branco.svg", texto: "Currículo",
            submenu: [
                { texto: "Meu currículo", href: "meu-curriculo.html" }
            ]
        },
        {
            id: "agenda", icone: "assets/icons/calendar-week-branco.svg", texto: "Agenda",
            submenu: [
                { texto: "Entrevistas", href: "entrevistas-candidato.html" },
                { texto: "Calendário", href: "calendario-candidato.html" }
            ]
        },
        {
            id: "perfil", icone: "assets/icons/settings-branco.svg", texto: "Perfil",
            submenu: [
                { texto: "Meus Dados", href: "meus-dados-candidato.html" },
                { texto: "Alterar Senha", href: "alterar-senha-candidato.html" }
            ]
        }
    ]
};
 
function criarItemSidebar(item) {
    const paginaAtual = window.location.pathname.split("/").pop();
 
    const container = document.createElement("div");
    container.classList.add("container-menu-item");
 
    const itemSidebar = document.createElement("a");
    itemSidebar.classList.add("item-sidebar");
    itemSidebar.href = item.submenu ? "#" : item.href;
 
    if (!item.submenu && item.href === paginaAtual) {
        itemSidebar.classList.add("ativo");
    }
 
    const icone = document.createElement("img");
    icone.classList.add("icone-sidebar");
    icone.src = item.icone;
    icone.alt = `Ícone ${item.texto}`;
 
    const spanTexto = document.createElement("span");
    spanTexto.classList.add("link-sidebar");
    spanTexto.textContent = item.texto;
 
    itemSidebar.appendChild(icone);
    itemSidebar.appendChild(spanTexto);
 
    if (item.submenu && item.submenu.length > 0) {
        const seta = document.createElement("img");
        seta.classList.add("seta-direita-menu");
        seta.src = "assets/icons/arrow-right-branco.svg";
        seta.alt = "Seta";
        itemSidebar.appendChild(seta);
 
        const submenu = document.createElement("div");
        submenu.classList.add("submenu");
 
        let submenuContemPaginaAtual = false;
 
        item.submenu.forEach((sub) => {
            const linkSub = document.createElement("a");
            linkSub.classList.add("item-submenu");
            linkSub.href = sub.href;
            linkSub.textContent = sub.texto;
 
            if (sub.href === paginaAtual) {
                linkSub.classList.add("ativo");
                submenuContemPaginaAtual = true;
            }
 
            submenu.appendChild(linkSub);
        });
 
        if (submenuContemPaginaAtual) {
            submenu.classList.add("ativo");
            seta.classList.add("ativa");
            itemSidebar.classList.add("ativo");
        }
 
        itemSidebar.addEventListener("click", (e) => {
            e.preventDefault();
            const estaAtivo = submenu.classList.contains("ativo");
 
            // Fecha outros submenus
            document.querySelectorAll(".submenu.ativo").forEach((s) => {
                if (s !== submenu) {
                    s.classList.remove("ativo");
                    s.parentElement.querySelector(".seta-direita-menu")?.classList.remove("ativa");
                }
            });
 
            submenu.classList.toggle("ativo", !estaAtivo);
            seta.classList.toggle("ativa", !estaAtivo);
        });
 
        container.appendChild(itemSidebar);
        container.appendChild(submenu);
    } else {
        container.appendChild(itemSidebar);
    }
 
    return container;
}
 
export function criarSidebar(tipoUsuario, nomeUsuario) {
    const sidebar = document.createElement("aside");
    sidebar.classList.add("sidebar");
 
    const cabecalhoSidebar = document.createElement("div");
    cabecalhoSidebar.classList.add("cabecalho-sidebar");
 
    const campoLogo = document.createElement("div");
    campoLogo.classList.add("campo-logo");
 
    const imgLogo = document.createElement("img");
    imgLogo.classList.add("img-logo");
    imgLogo.src = "assets/images/icone-logo.png";
 
    const textoLogo = document.createElement("div");
    textoLogo.classList.add("campo-texto");
 
    const primeiroNomeLogo = document.createElement("h1");
    primeiroNomeLogo.classList.add("primeiro-nome-logo");
    primeiroNomeLogo.textContent = "Conecta";
 
    const segundoNomeLogo = document.createElement("span");
    segundoNomeLogo.classList.add("segundo-nome-logo");
    segundoNomeLogo.textContent = "Talent";
 
    textoLogo.appendChild(primeiroNomeLogo);
    textoLogo.appendChild(segundoNomeLogo);
    campoLogo.appendChild(imgLogo);
    campoLogo.appendChild(textoLogo);
 
    const botaoMenu = document.createElement("button");
    botaoMenu.classList.add("btn-menu");
    botaoMenu.title = "Recolher Menu";
 
    const iconeMenu = document.createElement("img");
    iconeMenu.classList.add("icone-menu");
    iconeMenu.src = "assets/icons/menu-branco.svg";
    iconeMenu.alt = "Ícone menu";
    botaoMenu.appendChild(iconeMenu);
 
    cabecalhoSidebar.appendChild(campoLogo);
    cabecalhoSidebar.appendChild(botaoMenu);
 
    // Wrapper com scroll dedicado para os itens do menu
    const wrapperScroll = document.createElement("div");
    wrapperScroll.classList.add("conteudo-menu-scroll");
 
    const navMenu = document.createElement("nav");
    navMenu.classList.add("menu-sidebar");
 
    const itensMenu = MENUS_POR_PERFIL[tipoUsuario] || MENUS_POR_PERFIL["candidato"];
    itensMenu.forEach((item) => {
        navMenu.appendChild(criarItemSidebar(item));
    });
 
    wrapperScroll.appendChild(navMenu);
 
    const rodapeSidebar = document.createElement("div");
    rodapeSidebar.classList.add("rodape-sidebar");
 
    const campoPerfilLogado = document.createElement("div");
    campoPerfilLogado.classList.add("campo-perfil-logado");
 
    const iconePerfil = document.createElement("img");
    iconePerfil.classList.add("icone-perfil");
    iconePerfil.src = "assets/icons/user-circle-branco.svg";
    iconePerfil.alt = "Foto Perfil";
 
    const informacoesUsuario = document.createElement("div");
    informacoesUsuario.classList.add("campo-informacoes-usuario");
 
    const usuario = document.createElement("p");
    usuario.classList.add("nome-usuario");
    usuario.textContent = nomeUsuario;
 
    const funcaoUsuario = document.createElement("span");
    funcaoUsuario.classList.add("funcao-usuario");
    funcaoUsuario.textContent = tipoUsuario;
 
    informacoesUsuario.appendChild(usuario);
    informacoesUsuario.appendChild(funcaoUsuario);
 
    campoPerfilLogado.appendChild(iconePerfil);
    campoPerfilLogado.appendChild(informacoesUsuario);
 
    const campoSair = document.createElement("a");
    campoSair.classList.add("campo-sair");
    campoSair.href = "login.html";
 
    const iconeSair = document.createElement("img");
    iconeSair.classList.add("icone-sair");
    iconeSair.src = "assets/icons/logout.svg";
 
    const textoSair = document.createElement("span");
    textoSair.classList.add("texto-sair");
    textoSair.textContent = "Sair";
 
    campoSair.appendChild(iconeSair);
    campoSair.appendChild(textoSair);
 
    rodapeSidebar.appendChild(campoPerfilLogado);
    rodapeSidebar.appendChild(campoSair);
 
    botaoMenu.addEventListener("click", () => {
        sidebar.classList.toggle("fechada");
    });
 
    sidebar.appendChild(cabecalhoSidebar);
    sidebar.appendChild(wrapperScroll);
    sidebar.appendChild(rodapeSidebar);
 
    return sidebar;
}