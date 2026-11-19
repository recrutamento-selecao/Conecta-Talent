import { criarSidebar } from '../components/sidebar.js';
import { criarBarraProgresso } from '../components/barra-progresso.js';

const USUARIO_LOGADO = { nome: "João Oliveira", perfil: "candidato" };

const CANDIDATURAS_MOCK = [
    {
        id: "cand-1",
        vaga: "Analista de Dados Júnior",
        empresa: "BlueCore Sistemas",
        inicial: "B",
        localizacao: "Sorocaba, SP",
        modelo: "Híbrido",
        contrato: "CLT",
        faixaSalarial: "R$ 4.500 - R$ 5.500",
        status: "Em análise",
        categoria: "andamento",
        etapaAtual: "Triagem",
        percentual: 40,
        dataEnvio: "24/09/2026",
        descricaoProximaEtapa: "Seu currículo está sendo analisado pela empresa.",
        avisoProximaEtapa: "Você será notificado caso avance no processo."
    }
];

export function renderMinhasCandidaturas() {
    const containerPrincipal = document.createElement("div");
    containerPrincipal.className = "pagina-minhas-candidaturas-wrapper";

    // 1. Sidebar
    const sidebar = criarSidebar(USUARIO_LOGADO.perfil, USUARIO_LOGADO.nome);
    containerPrincipal.appendChild(sidebar);

    // 2. Conteúdo Principal
    const main = document.createElement("main");
    main.classList.add("conteudo-principal");

    // Cabeçalho livre no topo, no mesmo padrão de plano-alterado
    const cabecalhoPagina = document.createElement("div");
    cabecalhoPagina.classList.add("cabecalho-pagina-padrao");
    cabecalhoPagina.innerHTML = `
        <h1 class="titulo-pagina">Minhas candidaturas</h1>
        <p class="subtitulo-pagina">Acompanhe o andamento das suas candidaturas e processos seletivos.</p>
    `;
    main.appendChild(cabecalhoPagina);

    const containerConteudo = document.createElement("div");
    containerConteudo.classList.add("container-conteudo-pagina");

    // Abas de filtro
    const barraAbas = document.createElement("div");
    barraAbas.className = "barra-abas-candidaturas";
    barraAbas.innerHTML = `
        <button type="button" class="aba-candidatura ativa" data-filtro="todas">Todas (${CANDIDATURAS_MOCK.length})</button>
        <button type="button" class="aba-candidatura" data-filtro="andamento">Em andamento (${CANDIDATURAS_MOCK.filter(c => c.categoria === "andamento").length})</button>
        <button type="button" class="aba-candidatura" data-filtro="entrevistas">Entrevistas (0)</button>
        <button type="button" class="aba-candidatura" data-filtro="finalizadas">Finalizadas (0)</button>
    `;
    containerConteudo.appendChild(barraAbas);

    // Barra de contagem e ordenação
    const barraFiltros = document.createElement("div");
    barraFiltros.className = "barra-contagem-filtros";
    barraFiltros.innerHTML = `
        <span class="contagem-resultados"><strong>${CANDIDATURAS_MOCK.length} candidatura</strong> encontrada</span>
        <div class="controles-ordenacao">
            <select class="select-filtro" aria-label="Filtrar por status">
                <option value="todos">Todos os status</option>
                <option value="em-analise">Em análise</option>
            </select>
            <select class="select-filtro" aria-label="Ordenar candidaturas">
                <option value="recente">Mais recente</option>
                <option value="antiga">Mais antiga</option>
            </select>
        </div>
    `;
    containerConteudo.appendChild(barraFiltros);

    // Grid principal (Lista de candidaturas à esquerda + Resumo e Próxima etapa à direita)
    const layoutGrid = document.createElement("div");
    layoutGrid.className = "layout-minhas-candidaturas-grid";

    const colunaLista = document.createElement("div");
    colunaLista.className = "coluna-lista-candidaturas";

    CANDIDATURAS_MOCK.forEach((item) => {
        const cardCandidatura = document.createElement("article");
        cardCandidatura.className = "card-candidatura-item";

        cardCandidatura.innerHTML = `
            <div class="card-candidatura-topo">
                <div class="card-candidatura-info-principal">
                    <div class="icone-empresa-quadrado">${item.inicial}</div>
                    <div>
                        <h2 class="titulo-vaga-card">${item.vaga}</h2>
                        <p class="nome-empresa-card">${item.empresa}</p>
                        <div class="meta-vaga-card">
                            <span>${item.localizacao}</span> •
                            <span>${item.modelo}</span> •
                            <span>${item.contrato}</span> •
                            <span>${item.faixaSalarial}</span>
                        </div>
                    </div>
                </div>
                <span class="badge-status-candidatura">${item.status}</span>
            </div>
        `;

        // Chamada da função do componente de barra de progresso
        const barraProgresso = criarBarraProgresso({
            etapaAtual: item.etapaAtual,
            percentual: item.percentual
        });
        cardCandidatura.appendChild(barraProgresso);

        const rodapeCard = document.createElement("div");
        rodapeCard.className = "card-candidatura-rodape";
        rodapeCard.innerHTML = `
            <span class="data-envio-candidatura">Candidatura enviada em ${item.dataEnvio}</span>
            <button type="button" class="btn-ver-candidatura" data-id="${item.id}">Ver candidatura</button>
        `;
        cardCandidatura.appendChild(rodapeCard);

        colunaLista.appendChild(cardCandidatura);
    });

    layoutGrid.appendChild(colunaLista);

    // Coluna lateral direita: Resumo da candidatura + Próxima etapa
    const colunaLateral = document.createElement("aside");
    colunaLateral.className = "coluna-lateral-candidaturas";
    colunaLateral.innerHTML = `
        <div class="card-lateral-resumo">
            <h3>Resumo da candidatura</h3>
            <div class="grid-metricas-candidatura">
                <div class="metrica-box">
                    <strong class="metrica-numero">${CANDIDATURAS_MOCK.length}</strong>
                    <span class="metrica-rotulo">Total</span>
                </div>
                <div class="metrica-box">
                    <strong class="metrica-numero">1</strong>
                    <span class="metrica-rotulo">Em andamento</span>
                </div>
                <div class="metrica-box">
                    <strong class="metrica-numero">0</strong>
                    <span class="metrica-rotulo">Entrevistas</span>
                </div>
                <div class="metrica-box">
                    <strong class="metrica-numero">0</strong>
                    <span class="metrica-rotulo">Finalizadas</span>
                </div>
            </div>
        </div>

        <div class="card-lateral-proxima-etapa">
            <h3>Próxima etapa</h3>
            <ul class="lista-etapas-lateral">
                <li>
                    <span class="ponto-etapa ativo"></span>
                    <div>
                        <strong>${CANDIDATURAS_MOCK[0].etapaAtual}</strong>
                        <p>${CANDIDATURAS_MOCK[0].descricaoProximaEtapa}</p>
                    </div>
                </li>
                <li>
                    <span class="ponto-etapa"></span>
                    <div>
                        <strong>Próxima etapa</strong>
                        <p>${CANDIDATURAS_MOCK[0].avisoProximaEtapa}</p>
                    </div>
                </li>
            </ul>
        </div>
    `;

    layoutGrid.appendChild(colunaLateral);
    containerConteudo.appendChild(layoutGrid);

    // Botão Voltar no rodapé
    const rodapePagina = document.createElement("div");
    rodapePagina.className = "rodape-acoes-pagina";
    containerConteudo.appendChild(rodapePagina);

    main.appendChild(containerConteudo);
    containerPrincipal.appendChild(main);

    return containerPrincipal;
}