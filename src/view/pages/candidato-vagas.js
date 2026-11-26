import { criarSidebar } from '../components/sidebar.js';
import { criarBarraBusca } from '../components/barra-busca.js';
import { criarFiltrosVagas } from '../components/filtros-vaga.js';
import { criarListaVagas } from '../components/lista-vagas.js';

const USUARIO_LOGADO = { nome: "João Oliveira", perfil: "candidato" };
const idsVagasFavoritasEmMemoria = new Set();

export function obterIdsVagasFavoritadas() {
    return Array.from(idsVagasFavoritasEmMemoria);
}

export function isVagaFavoritada(vagaId) {
    return idsVagasFavoritasEmMemoria.has(Number(vagaId));
}

export function alternarFavoritoVaga(vagaId) {
    const idNum = Number(vagaId);
    if (!idNum) return false;

    const jaFavoritada = idsVagasFavoritasEmMemoria.has(idNum);
    if (jaFavoritada) {
        idsVagasFavoritasEmMemoria.delete(idNum);
    } else {
        idsVagasFavoritasEmMemoria.add(idNum);
    }

    const favoritadaAgora = !jaFavoritada;

    window.dispatchEvent(
        new CustomEvent('vagasFavoritasAlteradas', {
            detail: {
                vagaId: idNum,
                favoritada: favoritadaAgora,
                favoritos: obterIdsVagasFavoritadas()
            }
        })
    );

    return favoritadaAgora;
}

function irParaVagasFavoritas() {
    const rotaFavoritas = '#vagas-favoritas';

    if (window.location.hash !== rotaFavoritas) {
        window.location.hash = rotaFavoritas;
    }

    window.dispatchEvent(
        new CustomEvent('navegarRota', {
            detail: { rota: 'vagas-favoritas', hash: rotaFavoritas }
        })
    );
}

export const TODAS_AS_VAGAS = [
    { id: 1, titulo: "Analista de dados júnior", empresa: "Conecta Talent", area: "Dados", localizacao: "Sorocaba, SP", modelo: "Híbrido", contrato: "CLT", nivel: "Júnior", salario: "3.500", dias: 2 },
    { id: 2, titulo: "Analista de dados Pleno", empresa: "Conecta Talent", area: "Dados", localizacao: "São Paulo, SP", modelo: "Híbrido", contrato: "CLT", nivel: "Pleno", salario: "6.800", dias: 2 },
    { id: 3, titulo: "Analista de dados júnior", empresa: "BlueCore Sistemas", area: "Dados", localizacao: "Porto Feliz, SP", modelo: "Híbrido", contrato: "PJ", nivel: "Júnior", salario: "4.014", dias: 3 },
    { id: 4, titulo: "Desenvolvedor Frontend", empresa: "TechCorp", area: "Tecnologia", localizacao: "São Paulo, SP", modelo: "Remoto", contrato: "CLT", nivel: "Sênior", salario: "10.000", dias: 1 }
];

const FILTROS_DO_BANCO = [
    {
        chave: "localizacao",
        titulo: "Localização",
        opcoes: [
            { rotulo: "São Paulo, SP", valor: "São Paulo, SP", selecionado: true },
            { rotulo: "Sorocaba, SP", valor: "Sorocaba, SP", selecionado: true },
            { rotulo: "Porto Feliz, SP", valor: "Porto Feliz, SP", selecionado: true }
        ]
    },
    {
        chave: "modelo",
        titulo: "Modelo de trabalho",
        opcoes: [
            { rotulo: "Híbrido", valor: "Híbrido", selecionado: true },
            { rotulo: "Presencial", valor: "Presencial", selecionado: false },
            { rotulo: "Remoto", valor: "Remoto", selecionado: false }
        ]
    },
    {
        chave: "contrato",
        titulo: "Tipo de contrato",
        opcoes: [
            { rotulo: "CLT", valor: "CLT", selecionado: true },
            { rotulo: "PJ", valor: "PJ", selecionado: true }
        ]
    },
    {
        chave: "nivel",
        titulo: "Nível de experiência",
        opcoes: [
            { rotulo: "Júnior", valor: "Júnior", selecionado: true },
            { rotulo: "Pleno", valor: "Pleno", selecionado: true },
            { rotulo: "Sênior", valor: "Sênior", selecionado: false }
        ]
    }
];

function resolverIdVagaDoClique(evento, btnFav, vagasAtuais) {
    if (evento?.detail?.vagaId) {
        return Number(evento.detail.vagaId);
    }

    const cardVaga =
        btnFav.closest('[data-vaga-id], [data-id], [data-vaga], .card-vaga, .vaga-card, article, li') ||
        btnFav.parentElement;

    const idDireto = Number(
        btnFav.dataset.vagaId ||
        btnFav.dataset.id ||
        btnFav.dataset.vaga ||
        cardVaga?.dataset?.vagaId ||
        cardVaga?.dataset?.id ||
        cardVaga?.dataset?.vaga
    );
    if (idDireto) return idDireto;

    const textoCard = (cardVaga?.textContent || '').toLowerCase();
    if (textoCard) {
        const vagaPorTitulo = vagasAtuais.find((vaga) =>
            vaga.titulo && textoCard.includes(vaga.titulo.toLowerCase())
        );
        if (vagaPorTitulo) return Number(vagaPorTitulo.id);
    }

    const cards = Array.from(
        evento.currentTarget.querySelectorAll('[data-vaga-id], [data-id], .card-vaga, .vaga-card, article, li')
    );
    const indice = cardVaga ? cards.indexOf(cardVaga) : -1;
    if (indice >= 0 && vagasAtuais[indice]) {
        return Number(vagasAtuais[indice].id);
    }

    return 0;
}

export function renderCandidatoVagas() {
    let filtroTextoBusca = { cargo: "Analista de Dados", local: "Sorocaba - SP" };
    let filtrosCheckbox = {};
    let vagasFiltradasAtuais = [...TODAS_AS_VAGAS];

    const containerPrincipal = document.createElement("div");
    containerPrincipal.className = "pagina-candidato-vagas-wrapper";
    containerPrincipal.style.display = "flex";
    containerPrincipal.style.width = "100%";
    containerPrincipal.style.minHeight = "100vh";

    const sidebar = criarSidebar(USUARIO_LOGADO.perfil, USUARIO_LOGADO.nome);
    containerPrincipal.appendChild(sidebar);

    const main = document.createElement("main");
    main.classList.add("conteudo-principal");
    main.style.flex = "1";
    main.style.padding = "2rem";

    const cabecalho = document.createElement("header");
    cabecalho.className = "header-saudacao";
    cabecalho.style.marginBottom = "1.5rem";

    const titulo = document.createElement("h1");
    titulo.textContent = "Buscar Vagas";
    titulo.style.margin = "0";
    titulo.style.fontSize = "1.75rem";
    titulo.style.fontWeight = "700";
    titulo.style.color = "#0f172a";

    const subtitulo = document.createElement("p");
    subtitulo.textContent = "Encontre oportunidades abertas e filtre por localização, modelo, contrato e nível";
    subtitulo.style.margin = "0.25rem 0 0";
    subtitulo.style.fontSize = "0.925rem";
    subtitulo.style.color = "#64748b";

    cabecalho.appendChild(titulo);
    cabecalho.appendChild(subtitulo);
    main.appendChild(cabecalho);

    const layout = document.createElement("div");
    layout.style.display = "flex";
    layout.style.gap = "1.5rem";
    layout.style.alignItems = "flex-start";

    const containerListaVagasWrapper = document.createElement("div");
    containerListaVagasWrapper.style.flex = "1";

    const sincronizarVisualFavoritos = () => {
        containerListaVagasWrapper
            .querySelectorAll('[data-vaga-id], [data-id], .card-vaga, .vaga-card, article, li')
            .forEach((card, indice) => {
                const btnFav = card.querySelector('.btn-favoritar, .btn-favoritar-vaga, [data-acao="favoritar"]');
                if (!btnFav) return;

                let id = Number(
                    btnFav.dataset.vagaId ||
                    btnFav.dataset.id ||
                    card.dataset.vagaId ||
                    card.dataset.id
                );

                if (!id) {
                    const textoCard = (card.textContent || '').toLowerCase();
                    const encontrada = vagasFiltradasAtuais.find((v) =>
                        v.titulo && textoCard.includes(v.titulo.toLowerCase())
                    );
                    id = encontrada ? Number(encontrada.id) : Number(vagasFiltradasAtuais[indice]?.id || 0);
                }

                if (!id) return;

                const ativa = isVagaFavoritada(id);
                btnFav.classList.toggle('ativa', ativa);
                btnFav.classList.toggle('favoritada', ativa);
                btnFav.classList.toggle('salvo', ativa);
                btnFav.setAttribute('aria-pressed', String(ativa));
                btnFav.title = ativa ? 'Remover dos favoritos' : 'Favoritar vaga';
            });
    };

    const atualizarVagasExibidas = () => {
        vagasFiltradasAtuais = TODAS_AS_VAGAS.filter((vaga) => {
            const atendeCargo = !filtroTextoBusca.cargo ||
                vaga.titulo.toLowerCase().includes(filtroTextoBusca.cargo.toLowerCase()) ||
                (vaga.empresa || "").toLowerCase().includes(filtroTextoBusca.cargo.toLowerCase());

            const atendeLocalTexto = !filtroTextoBusca.local ||
                vaga.localizacao.toLowerCase().includes(filtroTextoBusca.local.split('-')[0].trim().toLowerCase());

            const atendeLocal = !filtrosCheckbox.localizacao || filtrosCheckbox.localizacao.length === 0 || filtrosCheckbox.localizacao.includes(vaga.localizacao);
            const atendeModelo = !filtrosCheckbox.modelo || filtrosCheckbox.modelo.length === 0 || filtrosCheckbox.modelo.includes(vaga.modelo);
            const atendeContrato = !filtrosCheckbox.contrato || filtrosCheckbox.contrato.length === 0 || filtrosCheckbox.contrato.includes(vaga.contrato);
            const atendeNivel = !filtrosCheckbox.nivel || filtrosCheckbox.nivel.length === 0 || filtrosCheckbox.nivel.includes(vaga.nivel);

            return atendeCargo && atendeLocalTexto && atendeLocal && atendeModelo && atendeContrato && atendeNivel;
        });

        containerListaVagasWrapper.innerHTML = "";
        containerListaVagasWrapper.appendChild(criarListaVagas(vagasFiltradasAtuais));
        sincronizarVisualFavoritos();
    };

    const lidarComFavorito = (evento) => {
        const btnFav = evento.target.closest('.btn-favoritar, .btn-favoritar-vaga, [data-acao="favoritar"]');
        if (!btnFav) return;

        evento.preventDefault();
        evento.stopPropagation();

        const vagaId = resolverIdVagaDoClique(evento, btnFav, vagasFiltradasAtuais);
        if (!vagaId) return;

        if (!isVagaFavoritada(vagaId)) {
            alternarFavoritoVaga(vagaId);
        }

        sincronizarVisualFavoritos();
        irParaVagasFavoritas();
    };

    containerListaVagasWrapper.addEventListener('favoritarVagaSolicitado', lidarComFavorito);
    containerListaVagasWrapper.addEventListener('click', lidarComFavorito);

    const onFavoritosAlterados = () => {
        sincronizarVisualFavoritos();
    };
    window.addEventListener('vagasFavoritasAlteradas', onFavoritosAlterados);

    const barraBuscaComponente = criarBarraBusca((cargo, local) => {
        filtroTextoBusca = { cargo, local };
        atualizarVagasExibidas();
    });
    main.appendChild(barraBuscaComponente);

    const filtrosComponente = criarFiltrosVagas(FILTROS_DO_BANCO, (filtrosAtivos) => {
        filtrosCheckbox = filtrosAtivos;
        atualizarVagasExibidas();
    });

    layout.appendChild(filtrosComponente);
    layout.appendChild(containerListaVagasWrapper);

    main.appendChild(layout);
    containerPrincipal.appendChild(main);

    setTimeout(() => {
        atualizarVagasExibidas();
    }, 0);

    return containerPrincipal;
}
