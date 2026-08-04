import { criarSidebar } from "../components/sidebar.js";
import { criarCardDashboard } from "../components/card-dashboard.js";
import { dashboardCandidato } from "../../data/dashboard-candidato.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("dashboard");

const areaCards = document.createElement("section");
areaCards.classList.add("area-cards");


const { usuario, cards } = dashboardCandidato;


const cardsDashboard = [
    {
        titulo: "Candidaturas",
        valor: cards.candidaturas,
        descricao: `${cards.novasCandidaturas} novas esta semana`,
        icone: "../assets/icons/file-description.svg",
        descricaoImagem: "Ícone de candidaturas"
    },
    {
        titulo: "Em Análise",
        valor: cards.emAnalise,
        descricao: cards.aguardandoRetorno,
        icone: "../assets/icons/search.svg",
        descricaoImagem: "Ícone de candidaturas em análise"
    },
    {
        titulo: "Entrevistas",
        valor: cards.entrevistas,
        descricao: cards.proximaEntrevista,
        icone: "../assets/icons/calendar-event.svg",
        descricaoImagem: "Ícone de entrevistas"
    },
    {
        titulo: "Perfil",
        valor: cards.perfilCompleto,
        descricao: cards.statusPerfil,
        icone: "../assets/icons/user-circle.svg",
        descricaoImagem: "Ícone do perfil"
    }
];


app.appendChild(
    criarSidebar(
        usuario.perfil,
        usuario.nome
    )
);


app.appendChild(main);
main.appendChild(areaCards);


cardsDashboard.forEach(card => {
    areaCards.appendChild(criarCardDashboard(card));
});