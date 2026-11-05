function criarItemSidebar(icone, texto, href, alt, possuiSubmenu) {
    const itemSidebar = document.createElement('div');
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

    if (possuiSubmenu) {
        const iconeSetaDireita = document.createElement('img');
        iconeSetaDireita.classList.add('seta-direita-menu');
        iconeSetaDireita.src = "assets/icons/arrow-right-branco.svg";
        iconeSetaDireita.alt = "Seta Direita";

        itemSidebar.appendChild(iconeSetaDireita);
    }


    return itemSidebar;

}

function criarSubmenu(opcoes) {
    const submenu = document.createElement('div');
    submenu.classList.add('submenu');

    for (const opcao of opcoes) { //para cada opcao que existir dentro do array opcoes, execute. 
        const itemSubmenu = document.createElement('a');
        itemSubmenu.classList.add('item-submenu');

        itemSubmenu.textContent = opcao.texto;
        itemSubmenu.href = opcao.href;


        submenu.appendChild(itemSubmenu);
    }

    return submenu;
}

export function criarSidebar(tipoUsuario, nomeUsuario) { //disponibilizando a função para que outros arquivos possam usar.
    const campoLogo = document.createElement('div');
    campoLogo.classList.add("campo-logo");

    const cabecalhoSidebar = document.createElement("div");
    cabecalhoSidebar.classList.add("cabecalho-sidebar");

    const botaoMenu = document.createElement('button');
    botaoMenu.classList.add('btn-menu');

   

    const iconeMenu = document.createElement('img');
    iconeMenu.classList.add('icone-menu');
    iconeMenu.src = "assets/icons/menu-branco.svg";
    iconeMenu.alt = "Ícone menu"

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

    switch (tipoUsuario) {
        case "administrador": {

            const dashboard = criarItemSidebar(
                "assets/icons/home.svg",
                "Dashboard",
                "",
                "ícone Dashboard",
                false
            )

            menuSidebar.appendChild(dashboard);

            const usuariosSistema = criarItemSidebar(
                "assets/icons/users-branco.svg",
                "Usuários",
                "",
                "ícone Usuários",
                true
            )

            const submenuUsuarios = criarSubmenu([
                {
                    texto: "Gerenciar usuários",
                    href: "#"
                }

            ]);

            const containerUsuarios = document.createElement("div");
            containerUsuarios.classList.add("container-submenu");

            containerUsuarios.appendChild(usuariosSistema);
            containerUsuarios.appendChild(submenuUsuarios);

            const setaUsuarios = usuariosSistema.querySelector(".seta-direita-menu");

            usuariosSistema.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuUsuarios.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaUsuarios.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerUsuarios);

            const planosSistema = criarItemSidebar(
                "assets/icons/box-branco.svg",
                "Planos",
                "",
                "ícone Planos",
                true
            )

            const submenuPlanoSistema = criarSubmenu([
                {
                    texto: "Gerenciar planos",
                    href: "#"
                }
            ]);

            const containerPlanos = document.createElement("div");
            containerPlanos.classList.add("container-submenu");

            containerPlanos.appendChild(planosSistema);
            containerPlanos.appendChild(submenuPlanoSistema);

            const setaPlanoSistema = planosSistema.querySelector(".seta-direita-menu");

            planosSistema.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuPlanoSistema.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaPlanoSistema.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerPlanos);

            const assinaturaSistema = criarItemSidebar(
                "assets/icons/license-branco.svg",
                "Assinaturas",
                "",
                "ícone Assinatura",
                true
            )

            const submenuAssinatura = criarSubmenu([
                {
                    texto: "Gerenciar assinaturas",
                    href: "#"
                },
                {
                    texto: "Pagamentos",
                    href: "#"
                },

            ]);

            const containerAssinatura = document.createElement("div");
            containerAssinatura.classList.add("container-submenu");

            containerAssinatura.appendChild(assinaturaSistema);
            containerAssinatura.appendChild(submenuAssinatura);

            const setaAssinatura = assinaturaSistema.querySelector(".seta-direita-menu");

            assinaturaSistema.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuAssinatura.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaAssinatura.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerAssinatura);



            const relatorioSistema = criarItemSidebar(
                "assets/icons/file-analytics-branco.svg",
                "Relatórios",
                "",
                "ícone Relatório",
                true
            )

            const submenuRelatorioSistema = criarSubmenu([
                {
                    texto: "Relatorio de usuários",
                    href: "#"
                },
                {
                    texto: "Relatório de assinaturas",
                    href: "#"
                }

            ]);

            const containerRelatorioSistema = document.createElement("div");
            containerRelatorioSistema.classList.add("container-submenu");

            containerRelatorioSistema.appendChild(relatorioSistema);
            containerRelatorioSistema.appendChild(submenuRelatorioSistema);

            const setaRelatoriosSistema = assinaturaSistema.querySelector(".seta-direita-menu");

            relatorioSistema.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuRelatorioSistema.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaRelatoriosSistema.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerRelatorioSistema);


            const configuracaoSistema = criarItemSidebar(
                "assets/icons/settings-branco.svg",
                "Configuração",
                "",
                "ícone Configuração",
                true
            )

            const submenuConfiguracaoSistema = criarSubmenu([
                {
                    texto: "Relatorio de usuários",
                    href: "#"
                },
                {
                    texto: "Relatório de assinaturas",
                    href: "#"
                }

            ]);

            const containerConfiguracaoSistema = document.createElement("div");
            containerConfiguracaoSistema.classList.add("container-submenu");

            containerConfiguracaoSistema.appendChild(configuracaoSistema);
            containerConfiguracaoSistema.appendChild(submenuConfiguracaoSistema);

            const setaConfiguracaoSistema = configuracaoSistema.querySelector(".seta-direita-menu");

            configuracaoSistema.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuConfiguracaoSistema.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaConfiguracaoSistema.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerConfiguracaoSistema);

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

            const usuariosEmpresa = criarItemSidebar(
                "assets/icons/users-branco.svg",
                "Recrutadores",
                "dashboard-administrador.html",
                "ícone Recrutadores",
                true
            )

            const submenuUsuarioEmpresa = criarSubmenu([
                {
                    texto: "Gerenciar recrutadores",
                    href: "#"
                }

            ]);

            const containerUsuarioEmpresa = document.createElement("div");
            containerUsuarioEmpresa.classList.add("container-submenu");

            containerUsuarioEmpresa.appendChild(usuariosEmpresa);
            containerUsuarioEmpresa.appendChild(submenuUsuarioEmpresa);

            const setaUsuarioEmpresa = usuariosEmpresa.querySelector(".seta-direita-menu");

            usuariosEmpresa.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuUsuarioEmpresa.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaUsuarioEmpresa.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerUsuarioEmpresa);


            const gestaoVagas = criarItemSidebar(
                "assets/icons/clipboard-text-branco.svg",
                "Gestão de vagas",
                "",
                "ícone Planos",
                true
            )

            const submenuGestaoVagas = criarSubmenu([
                {
                    texto: "Gerenciar vagas",
                    href: "#"
                },
                {
                    texto: "Vagas ativas",
                    href: "#"
                },
                {
                    texto: "Vagas encerradas",
                    href: "#"
                }
            ]);

            const containerGestaoVagas = document.createElement("div");
            containerGestaoVagas.classList.add("container-submenu");

            containerGestaoVagas.appendChild(gestaoVagas);
            containerGestaoVagas.appendChild(submenuGestaoVagas);

            const setaGestaoVagas = gestaoVagas.querySelector(".seta-direita-menu");

            gestaoVagas.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuGestaoVagas.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaGestaoVagas.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerGestaoVagas);


            const assinaturaSistema = criarItemSidebar(
                "assets/icons/license-branco.svg",
                "Assinaturas",
                "",
                "ícone Assinatura",
                true
            )

            const submenuAssinaturaSistema = criarSubmenu([
                {
                    texto: "Meu plano",
                    href: "#"
                },
                {
                    texto: "Pagamentos",
                    href: "#"
                },
                {
                    texto: "Histórico",
                    href: "#"
                }
            ]);

            const containerAssinaturaSistema = document.createElement("div");
            containerAssinaturaSistema.classList.add("container-submenu");

            containerAssinaturaSistema.appendChild(assinaturaSistema);
            containerAssinaturaSistema.appendChild(submenuAssinaturaSistema);

            const setaAssinaturaSistema = assinaturaSistema.querySelector(".seta-direita-menu");

            assinaturaSistema.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuAssinaturaSistema.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaAssinaturaSistema.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerAssinaturaSistema);


            const relatorioEmpresa = criarItemSidebar(
                "assets/icons/file-analytics-branco.svg",
                "Relatórios",
                "",
                "ícone Relatório",
                true
            )

            const submenuRelatorioEmpresa = criarSubmenu([
                {
                    texto: "Relatório de vagas",
                    href: "#"
                },
                {
                    texto: "Relatório de recrutadores",
                    href: "#"
                },
                {
                    texto: "Relatório de contratações",
                    href: "#"
                }
            ]);

            const containerRelatorioEmpresa = document.createElement("div");
            containerRelatorioEmpresa.classList.add("container-submenu");

            containerRelatorioEmpresa.appendChild(relatorioEmpresa);
            containerRelatorioEmpresa.appendChild(submenuRelatorioEmpresa);

            const setaRelatorioEmpresa = relatorioEmpresa.querySelector(".seta-direita-menu");

            relatorioEmpresa.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuRelatorioEmpresa.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaRelatorioEmpresa.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerRelatorioEmpresa);

            const configuracaoSistemaEmpresa = criarItemSidebar(
                "assets/icons/settings-branco.svg",
                "Configuração",
                "",
                "ícone Configuração",
                true
            )

            const submenuConfiguracaoEmpresa = criarSubmenu([
                {
                    texto: "Dados da empresa",
                    href: "#"
                },
                {
                    texto: "Preferências",
                    href: "#"
                },
                {
                    texto: "Segurança",
                    href: "#"
                }
            ]);

            const containerConfiguracaoSistemaEmpresa = document.createElement("div");
            containerConfiguracaoSistemaEmpresa.classList.add("container-submenu");

            containerConfiguracaoSistemaEmpresa.appendChild(relatorioEmpresa);
            containerConfiguracaoSistemaEmpresa.appendChild(submenuRelatorioEmpresa);

            const setaConfiguracaoEmpresa = configuracaoSistemaEmpresa.querySelector(".seta-direita-menu");

            configuracaoSistemaEmpresa.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuConfiguracaoEmpresa.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaConfiguracaoEmpresa.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerConfiguracaoSistemaEmpresa);

            break;
        }

        case "recrutador": {

            const dashboard = criarItemSidebar(
                "assets/icons/home.svg",
                "Dashboard",
                "",
                "ícone Dashboard",
                false
            )

            menuSidebar.appendChild(dashboard);

            const criacaoVagas = criarItemSidebar(
                "assets/icons/briefcase-branco.svg",
                "Vagas",
                "",
                "ícone Vagas",
                true
            )

            const submenuVagas = criarSubmenu([
                {
                    texto: "Criar Vaga",
                    href: "#"
                },
                {
                    texto: "Minhas Vagas",
                    href: "#"
                },
                {
                    texto: "Vagas Ativas",
                    href: "#"
                },
                {
                    texto: "Vagas Encerradas",
                    href: "#"
                }
            ]);

            const containerVagas = document.createElement("div");
            containerVagas.classList.add("container-submenu");

            containerVagas.appendChild(criacaoVagas);
            containerVagas.appendChild(submenuVagas);

            const seta = criacaoVagas.querySelector(".seta-direita-menu");

            criacaoVagas.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuVagas.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                seta.classList.toggle("ativa")
            });


            menuSidebar.appendChild(containerVagas);


            const processosSeletivos = criarItemSidebar(
                "assets/icons/clipboard-text-branco.svg",
                "Processos seletivos",
                "",
                "ícone Vagas",
                true
            )

            const submenuProcessoSeletivo = criarSubmenu([
                {
                    texto: "Criar Processo Seletivo",
                    href: "#"
                },
                {
                    texto: "Meus Processos",
                    href: "#"
                },
                {
                    texto: "Processos Ativos",
                    href: "#"
                },
                {
                    texto: "Processos encerrados",
                    href: "#"
                }
            ]);

            const containerProcessosSeletivos = document.createElement("div");
            containerProcessosSeletivos.classList.add("container-submenu");

            containerProcessosSeletivos.appendChild(processosSeletivos);
            containerProcessosSeletivos.appendChild(submenuProcessoSeletivo);

            const setaProcessoSeletivo = processosSeletivos.querySelector(".seta-direita-menu");

            processosSeletivos.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuProcessoSeletivo.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaProcessoSeletivo.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerProcessosSeletivos);

            const bancoTalentos = criarItemSidebar(
                "assets/icons/users-branco.svg",
                "Banco de talentos",
                "",
                "ícone Banco de Talentos",
                true
            )

            const submenuBancoTalentos = criarSubmenu([
                {
                    texto: "Buscar Candidatos",
                    href: "#"
                },
                {
                    texto: "Favoritos",
                    href: "#"
                },
                {
                    texto: "Candidatos Salvos",
                    href: "#"
                },
                {
                    texto: "Convites enviados",
                    href: "#"
                }
            ]);

            const containerBancoTalentos = document.createElement("div");
            containerBancoTalentos.classList.add("container-submenu");

            containerBancoTalentos.appendChild(bancoTalentos);
            containerBancoTalentos.appendChild(submenuBancoTalentos);

            const setaBancoTalentos = bancoTalentos.querySelector(".seta-direita-menu");

            bancoTalentos.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuBancoTalentos.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaBancoTalentos.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerBancoTalentos);


            const candidaturas = criarItemSidebar(
                "assets/icons/file-description-branco.svg",
                "Candidaturas",
                "",
                "ícone Planos",
                true
            )

            const submenuCandidaturas = criarSubmenu([
                {
                    texto: "Recebidas",
                    href: "#"
                },
                {
                    texto: "Em Triagem",
                    href: "#"
                },
                {
                    texto: "Em processo",
                    href: "#"
                },
                {
                    texto: "Finalizadas",
                    href: "#"
                }
            ]);

            const containerCandidaturas = document.createElement("div");
            containerCandidaturas.classList.add("container-submenu");

            containerCandidaturas.appendChild(candidaturas);
            containerCandidaturas.appendChild(submenuCandidaturas);

            const setaCandidaturas = candidaturas.querySelector(".seta-direita-menu");

            candidaturas.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuCandidaturas.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaCandidaturas.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerCandidaturas);


            const agenda = criarItemSidebar(
                "assets/icons/calendar-week-branco.svg",
                "Agenda",
                "dashboard-administrador.html",
                "ícone Agenda",
                true
            )

            const submenuAgenda = criarSubmenu([
                {
                    texto: "Calendário",
                    href: "#"
                },
                {
                    texto: "Entrevistas",
                    href: "#"
                },
                {
                    texto: "Reuniões",
                    href: "#"
                },
                {
                    texto: "Eventos",
                    href: "#"
                }
            ]);

            const containerAgenda = document.createElement("div");
            containerAgenda.classList.add("container-submenu");

            containerAgenda.appendChild(agenda);
            containerAgenda.appendChild(submenuAgenda);

            const setaAgenda = agenda.querySelector(".seta-direita-menu");

            agenda.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuAgenda.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaAgenda.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerAgenda);


            const relatorioSistema = criarItemSidebar(
                "assets/icons/file-analytics-branco.svg",
                "Relatórios",
                "",
                "ícone Relatório",
                true
            )

            const submenuRelatorio = criarSubmenu([
                {
                    texto: "Relatório de Vagas",
                    href: "#"
                },
                {
                    texto: "Relatório de Processos Seletivos",
                    href: "#"
                },
                {
                    texto: "Relatório de Candidaturas",
                    href: "#"
                }
            ]);

            const containerRelatorio = document.createElement("div");
            containerRelatorio.classList.add("container-submenu");

            containerRelatorio.appendChild(relatorioSistema);
            containerRelatorio.appendChild(submenuRelatorio);

            const setaRelatorio = relatorioSistema.querySelector(".seta-direita-menu");

            relatorioSistema.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuRelatorio.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaRelatorio.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerRelatorio);


            const perfil = criarItemSidebar(
                "assets/icons/settings-branco.svg",
                "Perfil",
                "",
                "ícone Perfil",
                true
            )

            const submenuPerfil = criarSubmenu([
                {
                    texto: "Meus Dados",
                    href: "#"
                },
                {
                    texto: "Alterar Senha",
                    href: "#"
                },
                {
                    texto: "Preferências",
                    href: "#"
                },
                {
                    texto: "Notificações",
                    href: "#"
                }
            ]);

            const containerPerfil = document.createElement("div");
            containerPerfil.classList.add("container-submenu");

            containerPerfil.appendChild(perfil);
            containerPerfil.appendChild(submenuPerfil);

            const setaPerfil = perfil.querySelector(".seta-direita-menu");

            perfil.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuPerfil.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaPerfil.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerPerfil);

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
                "ícone Vagas",
                true
            )

            const submenuProcurarVagas = criarSubmenu([
                {
                    texto: "Buscar vagas",
                    href: "#"
                },
                {
                    texto: "Vagas favoritas",
                    href: "#"
                }
            ]);

            const containerProcurarVagas = document.createElement("div");
            containerProcurarVagas.classList.add("container-submenu");

            containerProcurarVagas.appendChild(procurarVagas);
            containerProcurarVagas.appendChild(submenuProcurarVagas);

            const setaProcurarVagas = procurarVagas.querySelector(".seta-direita-menu");

            procurarVagas.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuProcurarVagas.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaProcurarVagas.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerProcurarVagas);


            const minhasCandidaturas = criarItemSidebar(
                "assets/icons/clipboard-text-branco.svg",
                "Candidaturas",
                "",
                "ícone Vagas",
                true
            )


            const submenuMinhasCandidaturas = criarSubmenu([
                {
                    texto: "Minhas candidaturas",
                    href: "#"
                }
            ]);

            const containerMinhasCandidaturas = document.createElement("div");
            containerMinhasCandidaturas.classList.add("container-submenu");

            containerMinhasCandidaturas.appendChild(minhasCandidaturas);
            containerMinhasCandidaturas.appendChild(submenuMinhasCandidaturas);

            const setaMinhasCandidaturas = minhasCandidaturas.querySelector(".seta-direita-menu");

            minhasCandidaturas.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuMinhasCandidaturas.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaMinhasCandidaturas.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerMinhasCandidaturas);


            const curriculo = criarItemSidebar(
                "assets/icons/file-description-branco.svg",
                "Currículo",
                "dashboard-administrador.html",
                "ícone Curriculo",
                true
            )


            const submenuCurriculo = criarSubmenu([
                {
                    texto: "Meu currículo",
                    href: "#"
                }
            ]);

            const containerCurriculo = document.createElement("div");
            containerCurriculo.classList.add("container-submenu");

            containerCurriculo.appendChild(curriculo);
            containerCurriculo.appendChild(submenuCurriculo);

            const setaCurriculo = curriculo.querySelector(".seta-direita-menu");

            curriculo.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuCurriculo.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaCurriculo.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerCurriculo);

            const agenda = criarItemSidebar(
                "assets/icons/calendar-week-branco.svg",
                "Agenda",
                "dashboard-administrador.html",
                "ícone Agenda",
                true
            )


            const submenuAgendaCandidato = criarSubmenu([
                {
                    texto: "Entrevistas",
                    href: "#"
                },
                {
                    texto: "Calendário",
                    href: "#"
                }

            ]);

            const containerAgendaCandidato = document.createElement("div");
            containerAgendaCandidato.classList.add("container-submenu");

            containerAgendaCandidato.appendChild(agenda);
            containerAgendaCandidato.appendChild(submenuAgendaCandidato);

            const setaAgendaCandidato = agenda.querySelector(".seta-direita-menu");

            agenda.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuAgendaCandidato.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaAgendaCandidato.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerAgendaCandidato);


            const perfil = criarItemSidebar(
                "assets/icons/settings-branco.svg",
                "Perfil",
                "dashboard-administrador.html",
                "ícone Perfil",
                true
            )

            const submenuPerfilCandidato = criarSubmenu([
                {
                    texto: "Meus Dados",
                    href: "#"
                },
                {
                    texto: "Alterar senha",
                    href: "#"
                },
                {
                    texto: "Preferências",
                    href: "#"
                }

            ]);

            const containerPerfilCandidato = document.createElement("div");
            containerPerfilCandidato.classList.add("container-submenu");

            containerPerfilCandidato.appendChild(perfil);
            containerPerfilCandidato.appendChild(submenuPerfilCandidato);

            const setaPerfilCandidato = perfil.querySelector(".seta-direita-menu");

            perfil.addEventListener("click", (event) => {
                event.preventDefault(); //faz com que o javascript controlar o que acontece.

                submenuPerfilCandidato.classList.toggle("ativo"); //se a classe já existir, ele remove, se existir aparece.
                setaPerfilCandidato.classList.toggle("ativa")
            });

            menuSidebar.appendChild(containerPerfilCandidato);

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
    funcaoUsuario.textContent = tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1);

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

     botaoMenu.addEventListener("click", () => {
        sidebar.classList.toggle("fechada");
    });

    botaoMenu.appendChild(iconeMenu);

    cabecalhoSidebar.appendChild(botaoMenu);
    cabecalhoSidebar.appendChild(campoLogo);
    sidebar.appendChild(cabecalhoSidebar);
    sidebar.appendChild(menuSidebar);
    sidebar.appendChild(rodapeSidebar);

    campoSair.appendChild(iconeSair);
    campoSair.appendChild(textoSair);

    return sidebar;

}

