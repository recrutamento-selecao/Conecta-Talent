import { criarSidebar } from '../components/sidebar.js';

const DADOS_RECRUTADOR = {
    usuario: { nome: "João", perfil: "recrutador" },
    kpis: [
        { 
            titulo: "Vagas Ativas", 
            valor: "18", 
            destaque: "↑ 38,5%", 
            subtexto: "vs. mês anterior",
            tipo: "positivo"
        },
        { 
            titulo: "Candidatos no Processo", 
            valor: "152", 
            destaque: "↑ 32,4%", 
            subtexto: "vs. mês anterior",
            tipo: "positivo"
        },
        { 
            titulo: "Contratações", 
            valor: "5", 
            destaque: "↑ 66,7%", 
            subtexto: "vs. mês anterior",
            tipo: "positivo"
        },
        { 
            titulo: "Tempo de Contratação", 
            valor: "22 dias", 
            destaque: "↓ 8,3%", 
            subtexto: "vs. mês anterior",
            tipo: "positivo" // Redução no tempo de contratação costuma ser positiva
        }
    ],
    vagasMaisCandidatadas: [
        { cargo: "Desenvolvedor Full Stack", candidatos: 45, emProcesso: 12, conversao: "26,7%" },
        { cargo: "Designer UX/UI", candidatos: 38, emProcesso: 8, conversao: "21,1%" },
        { cargo: "Analista de Dados", candidatos: 32, emProcesso: 6, conversao: "18,8%" },
        { cargo: "Product Manager", candidatos: 28, emProcesso: 5, conversao: "17,9%" },
        { cargo: "Engenheiro DevOps", candidatos: 22, emProcesso: 4, conversao: "18,2%" }
    ],
    proximasEntrevistas: [
        { candidato: "Ana Carolina Silva", cargo: "Desenvolvedora Full Stack", dataHora: "25/09/2026 14:00", status: "Agendada", classeStatus: "agendada" },
        { candidato: "Ricardo Mendes", cargo: "Designer UX/UI", dataHora: "26/09/2026 10:30", status: "Confirmada", classeStatus: "confirmada" }
    ]
};

function criarHeaderSaudacao(nome) {
    const header = document.createElement("header");
    header.classList.add("header-saudacao");

    const titulo = document.createElement("h1");
    titulo.textContent = `Olá, ${nome}!`;

    const sub = document.createElement("p");
    sub.textContent = "Bem-vindo ao painel de recrutador do Conecta Talent";

    header.appendChild(titulo);
    header.appendChild(sub);

    return header;
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
            <div class="kpi-status ${kpi.tipo}">
                <span>${kpi.destaque}</span>
                <small>${kpi.subtexto}</small>
            </div>
        `;

        section.appendChild(card);
    });

    return section;
}

function criarSecaoIntermedia() {
    const section = document.createElement("section");
    section.classList.add("grid-secao-intermedia");

    const cardEtapas = document.createElement("div");
    cardEtapas.classList.add("tabela-card", "card-etapas");
    
    cardEtapas.innerHTML = `
        <div class="card-painel-header">
            <h3>Candidatos por Etapa</h3>
            <span class="badge-total">152 Total</span>
        </div>
        <div class="lista-progresso-etapas">
            <div class="item-etapa">
                <div class="etapa-info">
                    <span class="etapa-nome">Inscrição</span>
                    <strong class="etapa-porcentagem">51%</strong>
                </div>
                <div class="barra-fundo">
                    <div class="barra-preenchimento azul" style="width: 51%;"></div>
                </div>
            </div>

            <div class="item-etapa">
                <div class="etapa-info">
                    <span class="etapa-nome">Triagem</span>
                    <strong class="etapa-porcentagem">34%</strong>
                </div>
                <div class="barra-fundo">
                    <div class="barra-preenchimento laranja" style="width: 34%;"></div>
                </div>
            </div>

            <div class="item-etapa">
                <div class="etapa-info">
                    <span class="etapa-nome">Entrevista</span>
                    <strong class="etapa-porcentagem">13%</strong>
                </div>
                <div class="barra-fundo">
                    <div class="barra-preenchimento verde" style="width: 13%;"></div>
                </div>
            </div>

            <div class="item-etapa">
                <div class="etapa-info">
                    <span class="etapa-nome">Avaliação</span>
                    <strong class="etapa-porcentagem">1%</strong>
                </div>
                <div class="barra-fundo">
                    <div class="barra-preenchimento roxo" style="width: 1%;"></div>
                </div>
            </div>
        </div>
    `;

    const containerAcoes = document.createElement("div");
    containerAcoes.classList.add("grid-acoes-rapidas");

    const cardCriar = document.createElement("div");
    cardCriar.classList.add("tabela-card", "card-acao-rapida");
    cardCriar.innerHTML = `
        <div class="icone-acao-wrapper azul">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        </div>
        <h3>Criar Nova Vaga</h3>
        <p>Publique uma nova oportunidade e comece a receber candidatos qualificados.</p>
        <button class="btn-acao-primario">Criar Vaga</button>
    `;

    const cardGerenciar = document.createElement("div");
    cardGerenciar.classList.add("tabela-card", "card-acao-rapida");
    cardGerenciar.innerHTML = `
        <div class="icone-acao-wrapper verde">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
        </div>
        <h3>Gerenciar Vagas</h3>
        <p>Visualize, edite e acompanhe o status das suas vagas publicadas.</p>
        <button class="btn-acao-secundario">Ver Vagas</button>
    `;

    containerAcoes.appendChild(cardCriar);
    containerAcoes.appendChild(cardGerenciar);

    section.appendChild(cardEtapas);
    section.appendChild(containerAcoes);

    return section;
}

function criarGridInferior(vagas, entrevistas) {
    const section = document.createElement("section");
    section.classList.add("grid-dashboard-recrutador");

    const cardVagas = document.createElement("div");
    cardVagas.classList.add("tabela-card");

    const headerVagas = document.createElement("div");
    headerVagas.classList.add("card-painel-header");
    headerVagas.innerHTML = `<h3>Vagas mais Candidatadas</h3>`;

    const tabela = document.createElement("table");
    tabela.classList.add("tabela-empresas");
    tabela.innerHTML = `
        <thead>
            <tr>
                <th>VAGA</th>
                <th>CANDIDATOS</th>
                <th>EM PROCESSO</th>
                <th>TAXA DE CONVERSÃO</th>
            </tr>
        </thead>
        <tbody>
            ${vagas.map(item => `
                <tr>
                    <td><strong>${item.cargo}</strong></td>
                    <td>${item.candidatos}</td>
                    <td>${item.emProcesso}</td>
                    <td><strong>${item.conversao}</strong></td>
                </tr>
            `).join('')}
        </tbody>
    `;

    cardVagas.appendChild(headerVagas);
    cardVagas.appendChild(tabela);

    const cardEntrevistas = document.createElement("div");
    cardEntrevistas.classList.add("tabela-card");

    const headerEntrevistas = document.createElement("div");
    headerEntrevistas.classList.add("card-painel-header");
    headerEntrevistas.innerHTML = `<h3>Próximas Entrevistas</h3>`;

    const listaEntrevistas = document.createElement("div");
    listaEntrevistas.classList.add("lista-entrevistas");

    entrevistas.forEach(item => {
        const itemEntrevista = document.createElement("div");
        itemEntrevista.classList.add("item-entrevista");

        itemEntrevista.innerHTML = `
            <div class="entrevista-info">
                <strong>${item.candidato}</strong>
                <small>${item.cargo}</small>
            </div>
            <div class="entrevista-detalhes">
                <span class="data-hora">${item.dataHora}</span>
                <span class="badge ${item.classeStatus}">${item.status}</span>
            </div>
        `;
        listaEntrevistas.appendChild(itemEntrevista);
    });

    cardEntrevistas.appendChild(headerEntrevistas);
    cardEntrevistas.appendChild(listaEntrevistas);

    section.appendChild(cardVagas);
    section.appendChild(cardEntrevistas);

    return section;
}


document.addEventListener('DOMContentLoaded', () => {

    const sidebar = criarSidebar(DADOS_RECRUTADOR.usuario.perfil, DADOS_RECRUTADOR.usuario.nome);
    document.body.appendChild(sidebar);

    const main = document.createElement("main");
    main.classList.add("conteudo-principal");

    main.appendChild(criarHeaderSaudacao(DADOS_RECRUTADOR.usuario.nome));
    main.appendChild(criarGridKPIs(DADOS_RECRUTADOR.kpis));
    main.appendChild(criarSecaoIntermedia());
    main.appendChild(criarGridInferior(DADOS_RECRUTADOR.vagasMaisCandidatadas, DADOS_RECRUTADOR.proximasEntrevistas));

    document.body.appendChild(main);
});