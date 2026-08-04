import { criarSidebar } from "../components/sidebar.js";
import { criarCardIndicador } from "../components/card-indicador.js";
import { listarVagas } from "../../data/listar-vagas.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("listar-vagas");


const { usuario, pagina, indicadores } = listarVagas;


const cabecalhoPagina = document.createElement("div");
cabecalhoPagina.classList.add("cabecalho-pagina");

const infoCabecalho = document.createElement("div");
infoCabecalho.classList.add("info-cabecalho");

const tituloPagina = document.createElement("h1");
tituloPagina.classList.add("titulo-pagina");
tituloPagina.textContent = pagina.titulo;

const descricaoPagina = document.createElement("p");
descricaoPagina.classList.add("descricao-pagina");
descricaoPagina.textContent = pagina.descricao;

const btnCriarVaga = document.createElement("button");
btnCriarVaga.classList.add("btn-criar-vaga");

const iconeAdicionar = document.createElement("span");
iconeAdicionar.classList.add("icone-adicionar");
iconeAdicionar.textContent = "+";

const textoBotao = document.createElement("span");
textoBotao.textContent = pagina.textoBotao;


const containerIndicadores = document.createElement("div");
containerIndicadores.classList.add("container-indicadores");

const vagasAtivas = {
    titulo: "Vagas ativas",
    valor: indicadores.vagasAtivas.valor,
    icone: "../assets/icons/briefcase.svg",
    descricaoImagem: "Ícone de vagas ativas",
    variacao: indicadores.vagasAtivas.variacao
};

const vagasTriagem = {
    titulo: "Em triagem",
    valor: indicadores.vagasTriagem.valor,
    icone: "../assets/icons/users-group.svg",
    descricaoImagem: "Ícone de vagas em triagem",
    variacao: indicadores.vagasTriagem.variacao
};

const contratacoes = {
    titulo: "Contratações",
    valor: indicadores.contratacoes.valor,
    icone: "../assets/icons/user-check.svg",
    descricaoImagem: "Ícone de contratações",
    variacao: indicadores.contratacoes.variacao
};


const cardVagasAtivas = criarCardIndicador(vagasAtivas);
const cardVagasTriagem = criarCardIndicador(vagasTriagem);
const cardContratacoes = criarCardIndicador(contratacoes);


app.appendChild(
    criarSidebar(
        usuario.perfil,
        usuario.nome
    )
);


app.appendChild(main);

main.appendChild(cabecalhoPagina);

cabecalhoPagina.appendChild(infoCabecalho);
infoCabecalho.appendChild(tituloPagina);
infoCabecalho.appendChild(descricaoPagina);

cabecalhoPagina.appendChild(btnCriarVaga);
btnCriarVaga.appendChild(iconeAdicionar);
btnCriarVaga.appendChild(textoBotao);

main.appendChild(containerIndicadores);

containerIndicadores.appendChild(cardVagasAtivas);
containerIndicadores.appendChild(cardVagasTriagem);
containerIndicadores.appendChild(cardContratacoes);