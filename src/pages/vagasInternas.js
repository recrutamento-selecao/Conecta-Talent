import { criarSidebar } from "../components/sidebar.js";
import { criarBarraBusca } from "../components/barra-busca.js";
import { criarCardVaga } from "../components/card-vaga.js";
import { criarPaginacao } from "../components/paginacao.js";
import { vagasInternas } from "../../data/vagas-internas.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("vagas-internas");


const { usuario, pagina, vagas } = vagasInternas;


const tituloPagina = document.createElement("h1");
tituloPagina.textContent = pagina.titulo;

const descricaoPagina = document.createElement("p");
descricaoPagina.textContent = pagina.descricao;


const barraBusca = criarBarraBusca();


const listaVagas = document.createElement("div");
listaVagas.classList.add("lista-vagas");


let paginaAtual = 1;
const registrosPorPagina = 6;

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


app.appendChild(
    criarSidebar(
        usuario.perfil,
        usuario.nome
    )
);

app.appendChild(main);

main.appendChild(tituloPagina);
main.appendChild(descricaoPagina);
main.appendChild(barraBusca);
main.appendChild(listaVagas);


renderizarVagas();
renderizarPaginacao();