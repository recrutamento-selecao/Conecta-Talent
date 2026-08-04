import { criarSidebar } from "../components/sidebar.js";
import { criarCardDashboard } from "../components/card-dashboard.js";
import { dashboardEmpresa } from "../../data/dashboard-empresa.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("dashboard");

const areaCards = document.createElement("section");
areaCards.classList.add("area-cards");


const { usuario, cards } = dashboardEmpresa;


const cardsDashboard = [
    {
        titulo: "Vagas Ativas",
        valor: cards.vagasAtivas,
        descricao: `+${cards.novasVagas} publicadas esta semana`,
        icone: "../assets/icons/briefcase.svg",
        descricaoImagem: "Ícone de vagas ativas"
    },
    {
        titulo: "Candidaturas",
        valor: cards.candidaturas,
        descricao: `+${cards.novasCandidaturas} novas candidaturas`,
        icone: "../assets/icons/file-description.svg",
        descricaoImagem: "Ícone de candidaturas"
    },
    {
        titulo: "Entrevistas",
        valor: cards.entrevistas,
        descricao: `${cards.entrevistasHoje} agendadas para hoje`,
        icone: "../assets/icons/calendar-event.svg",
        descricaoImagem: "Ícone de entrevistas"
    },
    {
        titulo: "Contratações",
        valor: cards.contratacoes,
        descricao: `+${cards.novasContratacoes} neste mês`,
        icone: "../assets/icons/user-check.svg",
        descricaoImagem: "Ícone de contratações"
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