import { criarSidebar } from "../components/sidebar.js";
import { criarCardIndicador } from "../components/card-indicador.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("triagem-candidatos");

const cabecalhoPagina = document.createElement('div');
cabecalhoPagina.classList.add('cabecalho-pagina');

const infoCabecalho = document.createElement('div');
infoCabecalho.classList.add('info-cabecalho');

const tituloPagina = document.createElement('h1');
tituloPagina.classList.add('titulo-pagina');
tituloPagina.textContent = 'Triagem de Candidatos';

const descricaoPagina = document.createElement('p');
descricaoPagina.classList.add('descricao-pagina');
descricaoPagina.textContent = 'Acompanhe os candidatos e gerencie o avanço em cada etapa do processo seletivo.';

const containerIndicadores = document.createElement('div');
containerIndicadores.classList.add('container-indicadores');

const candidatosInscritos = {
    titulo: 'Inscritos',
    valor: 32,
    icone: "../assets/icons/users.svg",
    descricaoImagem: 'Ícone de candidatos incritos'
};

const candidatosEmTriagem = {
    titulo: 'Em triagem',
    valor: 18,
    icone: "../assets/icons/clipboard-search.svg",
    descricaoImagem: 'Ícone de candidatos em triagem'
};

const candidatosAprovados = {
    titulo: 'Aprovados',
    valor: 7,
    icone: "../assets/icons/circle-check.svg",
    descricaoImagem: 'Ícone de candidatos aprovados'
};

const candidatosReprovados = {
    titulo: 'Reprovados',
    valor: 5,
    icone: "../assets/icons/user-x.svg",
    descricaoImagem: 'Ícone de candidatos reprovados'
};

const candidatosEntrevista = {
    titulo: 'Entrevista',
    valor: 4,
    icone: "../assets/icons/calendar-user.svg",
    descricaoImagem: 'Ícone de entrevistas'
};

const candidatosContratacoes = {
    titulo: 'Contratações',
    valor: 2,
    icone: "../assets/icons/briefcase.svg",
    descricaoImagem: 'Ícone de contratações'
};

const cardCandidatosInscritos = criarCardIndicador(candidatosInscritos);

const cardCandidatosEmTriagem = criarCardIndicador(candidatosEmTriagem);

const cardCandidatosAprovados = criarCardIndicador(candidatosAprovados);

const cardCandidatosReprovados = criarCardIndicador(candidatosReprovados);

const cardCandidatosEntrevista = criarCardIndicador(candidatosEntrevista);

const cardCandidatosContratacoes = criarCardIndicador(candidatosContratacoes);

app.appendChild(criarSidebar("recrutador", "Mariana Goulart"));
app.appendChild(main);

main.appendChild(cabecalhoPagina);

cabecalhoPagina.appendChild(infoCabecalho);

infoCabecalho.appendChild(tituloPagina);
infoCabecalho.appendChild(descricaoPagina);

main.appendChild(containerIndicadores);

containerIndicadores.appendChild(cardCandidatosInscritos);
containerIndicadores.appendChild(cardCandidatosEmTriagem);
containerIndicadores.appendChild(cardCandidatosAprovados);
containerIndicadores.appendChild(cardCandidatosReprovados);
containerIndicadores.appendChild(cardCandidatosEntrevista);
containerIndicadores.appendChild(cardCandidatosContratacoes);