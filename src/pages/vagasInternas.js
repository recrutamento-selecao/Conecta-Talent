import { criarSidebar } from "../components/sidebar.js";
import { criarBarraBusca } from "../components/barra-busca.js";
import { criarCardVaga } from "../components/card-vaga.js";
import { criarPaginacao } from "../components/paginacao.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("vagas-internas");

const tituloPagina = document.createElement("h1");
tituloPagina.textContent = "Encontre sua próxima vaga";

const descricaoPagina = document.createElement("p");
descricaoPagina.textContent =
    "Explore as oportunidades abertas e encontre a vaga que mais combina com o seu perfil.";

const barraBusca = criarBarraBusca();

const listaVagas = document.createElement("div");
listaVagas.classList.add("lista-vagas");

const vagas = [
    {
        titulo: "Assistente Administrativo",
        empresa: "Kezim",
        localizacao: "Sorocaba - SP",
        modalidade: "Híbrido",
        regime: "CLT",
        dataPublicacao: "Publicado há 2 dias"
    },
    {
        titulo: "Desenvolvedor Front-end",
        empresa: "Tech Solutions",
        localizacao: "São Paulo - SP",
        modalidade: "Remoto",
        regime: "PJ",
        dataPublicacao: "Publicado hoje"
    },
    {
        titulo: "Analista de Dados",
        empresa: "Data Corp",
        localizacao: "Campinas - SP",
        modalidade: "Presencial",
        regime: "CLT",
        dataPublicacao: "Publicado há 5 dias"
    }
    
];

let paginaAtual = 1;
const registrosPorPagina = 2; //só coloquei 2 para aparecer a paginação mas depois voltar para 6 regristros

function renderizarVagas() {

    listaVagas.innerHTML = "";

    const inicio = (paginaAtual - 1) * registrosPorPagina;
    const fim = inicio + registrosPorPagina;

    const vagasPagina = vagas.slice(inicio, fim);

    vagasPagina.forEach(vaga => {
        listaVagas.appendChild(criarCardVaga(vaga));
    });

}

function renderizarPaginacao() {

    const paginacaoExistente = main.querySelector(".paginacao");

    if (paginacaoExistente) {
        paginacaoExistente.remove();
    }

    const paginacao = criarPaginacao(
        vagas.length,
        registrosPorPagina,
        paginaAtual,
        (novaPagina) => {

            const totalPaginas = Math.ceil(vagas.length / registrosPorPagina);

            if (novaPagina < 1 || novaPagina > totalPaginas) {
                return;
            }

            paginaAtual = novaPagina;

            renderizarVagas();
            renderizarPaginacao();
        }
    );

    main.appendChild(paginacao);

}

app.appendChild(criarSidebar("candidato", "João Silva"));
app.appendChild(main);

main.appendChild(tituloPagina);
main.appendChild(descricaoPagina);
main.appendChild(barraBusca);
main.appendChild(listaVagas);

renderizarVagas();
renderizarPaginacao();