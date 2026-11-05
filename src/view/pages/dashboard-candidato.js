import { criarSidebar } from '../components/sidebar.js';

const DADOS_CANDIDATO = {
    usuario: { nome: "João Oliveira", perfil: "candidato" },
    kpis: [
        { 
            titulo: "Candidaturas", 
            valor: "12", 
            destaque: "+3 novas", 
            subtexto: "esta semana"
        },
        { 
            titulo: "Entrevistas Agendadas", 
            valor: "2", 
            destaque: "1 para amanhã", 
            subtexto: "fique atento"
        },
        { 
            titulo: "Em Andamento", 
            valor: "10", 
            destaque: "Aguardando", 
            subtexto: "retorno empresa"
        },
        { 
            titulo: "Vagas Salvas", 
            valor: "8", 
            destaque: "Prontas", 
            subtexto: "para candidatura"
        }
    ],
    candidaturasRecentes: [
        { cargo: "Desenvolvedor Front-end", empresa: "TechCorp Brasil", local: "São Paulo - SP", status: "Em análise", classeStatus: "em-analise", data: "15/09/2026" },
        { cargo: "UX Designer", empresa: "Recruta+", local: "Rio de Janeiro - RJ", status: "Entrevista", classeStatus: "entrevista", data: "12/09/2026" },
        { cargo: "Analista de Dados", empresa: "StartUp Valley", local: "Florianópolis - SC", status: "Aprovado", classeStatus: "aprovado", data: "08/09/2026" },
        { cargo: "Product Manager", empresa: "Global RH", local: "Belo Horizonte - MG", status: "Recusado", classeStatus: "recusado", data: "05/09/2026" },
        { cargo: "Dev Backend", empresa: "Educa Talentos", local: "Curitiba - PR", status: "Em análise", classeStatus: "em-analise", data: "01/09/2026" }
    ],
    vagasRecomendadas: [
        { logo: null, cargo: "Desenvolvedor Full Stack", empresa: "TechCorp Brasil", local: "São Paulo - SP" },
        { logo: null, cargo: "Designer de Produto", empresa: "Recruta+", local: "Rio de Janeiro - RJ" },
        { logo: null, cargo: "Engenheiro de Dados", empresa: "StartUp Valley", local: "Florianópolis - SC" },
        { logo: null, cargo: "Gerente de Projetos", empresa: "Global RH", local: "Belo Horizonte - MG" },
        { logo: null, cargo: "Analista de Marketing", empresa: "Educa Talentos", local: "Curitiba - PR" }
    ]
};

function obterInicialEmpresa(nomeEmpresa) {
    if (!nomeEmpresa) return "?";
    const primeiroNome = nomeEmpresa.trim().split(" ")[0];
    return primeiroNome.charAt(0).toUpperCase();
}

function criarHeaderSaudacao(nome) {
    const header = document.createElement("header");
    header.classList.add("header-saudacao");

    const titulo = document.createElement("h1");
    titulo.textContent = `Bem-vindo, ${nome}!`;

    const sub = document.createElement("p");
    sub.textContent = "Acompanhe suas candidaturas e descubra novas oportunidades.";

    header.appendChild(titulo);
    header.appendChild(sub);

    return header;
}

function criarBannerBoasVindas() {
    const banner = document.createElement("section");
    banner.classList.add("banner-boas-vindas");

    banner.innerHTML = `
        <img class="banner-imagem" src="assets/images/banner-candidato.png" alt="Banner Candidato">
        <div class="banner-conteudo">
            <h2>Dê o próximo passo na sua carreira</h2>
            <p>Complete seu perfil, candidate-se às vagas e acompanhe suas oportunidades.</p>
            <button class="btn-primario">Editar meu perfil</button>
        </div>
    `;

    return banner;
}

function criarGridKPIs(kpis) {
    const section = document.createElement("section");
    section.classList.add("kpi-grid");

    kpis.forEach(kpi => {
        const card = document.createElement("div");
        card.classList.add("kpi-card");

        card.innerHTML = `
            <span class="kpi-titulo">${kpi.titulo}</span>
            <div class="kpi-valor">${kpi.valor}</div>
            <div class="kpi-status positivo">
                <span>${kpi.destaque}</span>
                <small>${kpi.subtexto}</small>
            </div>
        `;

        section.appendChild(card);
    });

    return section;
}

function criarGridInferior(candidaturas, vagas) {
    const section = document.createElement("section");
    section.classList.add("grid-dashboard-candidato");

    const cardCandidaturas = document.createElement("div");
    cardCandidaturas.classList.add("tabela-card");

    const headerCand = document.createElement("div");
    headerCand.classList.add("card-painel-header");
    headerCand.innerHTML = `
        <h3>Candidaturas Recentes</h3>
        <a href="#" class="link-ver-todas">Ver todas →</a>
    `;

    const tabela = document.createElement("table");
    tabela.classList.add("tabela-empresas");

    tabela.innerHTML = `
        <thead>
            <tr>
                <th>VAGA / EMPRESA</th>
                <th>STATUS</th>
                <th>DATA</th>
            </tr>
        </thead>
        <tbody>
            ${candidaturas.map(item => `
                <tr>
                    <td>
                        <div class="vaga-detalhes">
                            <strong>${item.cargo}</strong>
                            <small>${item.empresa} • ${item.local}</small>
                        </div>
                    </td>
                    <td>
                        <span class="badge ${item.classeStatus}">${item.status}</span>
                    </td>
                    <td class="coluna-data">${item.data}</td>
                </tr>
            `).join('')}
        </tbody>
    `;

    cardCandidaturas.appendChild(headerCand);
    cardCandidaturas.appendChild(tabela);

    const cardVagas = document.createElement("div");
    cardVagas.classList.add("tabela-card");

    const headerVagas = document.createElement("div");
    headerVagas.classList.add("card-painel-header");
    headerVagas.innerHTML = `
        <h3>Vagas Recomendadas</h3>
        <a href="#" class="link-ver-todas">Ver todas →</a>
    `;

    const listaVagas = document.createElement("div");
    listaVagas.classList.add("lista-vagas-recomendadas");

    vagas.forEach(vaga => {
        const itemVaga = document.createElement("div");
        itemVaga.classList.add("item-vaga-candidato");

        const inicial = obterInicialEmpresa(vaga.empresa);

        const avatarHTML = vaga.logo 
            ? `<img class="vaga-avatar-img" src="${vaga.logo}" alt="Logo ${vaga.empresa}">`
            : `<div class="vaga-avatar-admin">${inicial}</div>`;

        itemVaga.innerHTML = `
            ${avatarHTML}
            <div class="vaga-info-admin">
                <strong>${vaga.cargo}</strong>
                <small>${vaga.empresa} • ${vaga.local}</small>
            </div>
            <button class="btn-acao-salvar" title="Salvar vaga" aria-label="Salvar vaga">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
            </button>
        `;

        const btnSalvar = itemVaga.querySelector(".btn-acao-salvar");
        btnSalvar.addEventListener("click", (e) => {
            e.stopPropagation();
            btnSalvar.classList.toggle("salvo");
        });

        listaVagas.appendChild(itemVaga);
    });

    cardVagas.appendChild(headerVagas);
    cardVagas.appendChild(listaVagas);

    section.appendChild(cardCandidaturas);
    section.appendChild(cardVagas);

    return section;
}

// Exporta a função que o router.js espera encontrar
export function renderDashboardCandidato() {
    const container = document.createElement('div');
    container.classList.add('page-dashboard-candidato');

    // Cria a sidebar do candidato
    const sidebar = criarSidebar(DADOS_CANDIDATO.usuario.perfil, DADOS_CANDIDATO.usuario.nome);
    container.appendChild(sidebar);

    // Cria a área de conteúdo principal
    const main = document.createElement("main");
    main.classList.add("conteudo-principal");

    main.appendChild(criarHeaderSaudacao(DADOS_CANDIDATO.usuario.nome));
    main.appendChild(criarBannerBoasVindas());
    main.appendChild(criarGridKPIs(DADOS_CANDIDATO.kpis));
    main.appendChild(criarGridInferior(DADOS_CANDIDATO.candidaturasRecentes, DADOS_CANDIDATO.vagasRecomendadas));

    container.appendChild(main);

    return container;
}