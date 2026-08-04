import { criarSidebar } from "../components/sidebar.js";
import { criarCardIndicador } from "../components/card-indicador.js";
import { listarRecrutadores } from "../../data/listar-recrutadores.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("listar-recrutadores");


const { usuario, pagina, indicadores } = listarRecrutadores;


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

const btnCadastrarRecrutador = document.createElement("button");
btnCadastrarRecrutador.classList.add("btn-cadastrar-recrutador");

const iconeAdicionar = document.createElement("span");
iconeAdicionar.classList.add("icone-adicionar");
iconeAdicionar.textContent = "+";

const textoBotao = document.createElement("span");
textoBotao.textContent = pagina.textoBotao;


const containerIndicadores = document.createElement("div");
containerIndicadores.classList.add("container-indicadores");

const totalRecrutadores = {
    titulo: "Total de recrutadores",
    valor: indicadores.totalRecrutadores,
    icone: "../assets/icons/users.svg",
    descricaoImagem: "Ícone de recrutadores"
};

const recrutadoresAtivos = {
    titulo: "Ativos",
    valor: indicadores.recrutadoresAtivos,
    icone: "../assets/icons/circle-check.svg",
    descricaoImagem: "Ícone ativo"
};

const recrutadoresInativos = {
    titulo: "Inativos",
    valor: indicadores.recrutadoresInativos,
    icone: "../assets/icons/circle-x.svg",
    descricaoImagem: "Ícone inativo"
};

const recrutadoresAcessoTotal = {
    titulo: "Com acesso total",
    valor: indicadores.recrutadoresAcessoTotal,
    icone: "../assets/icons/shield-check.svg",
    descricaoImagem: "Ícone acesso total"
};


const cardTotalRecrutadores = criarCardIndicador(totalRecrutadores);
const cardRecrutadoresAtivos = criarCardIndicador(recrutadoresAtivos);
const cardRecrutadoresInativos = criarCardIndicador(recrutadoresInativos);
const cardRecrutadoresAcessoTotal = criarCardIndicador(recrutadoresAcessoTotal);


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

cabecalhoPagina.appendChild(btnCadastrarRecrutador);
btnCadastrarRecrutador.appendChild(iconeAdicionar);
btnCadastrarRecrutador.appendChild(textoBotao);

main.appendChild(containerIndicadores);

containerIndicadores.appendChild(cardTotalRecrutadores);
containerIndicadores.appendChild(cardRecrutadoresAtivos);
containerIndicadores.appendChild(cardRecrutadoresInativos);
containerIndicadores.appendChild(cardRecrutadoresAcessoTotal);