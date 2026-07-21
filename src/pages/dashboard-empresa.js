import { criarSidebar } from "../components/sidebar.js";
import { criarCardDashboard } from "../components/card-dashboard.js";

const app = document.getElementById('app');

const main = document.createElement("main");
main.classList.add("dashboard");

const areaCards = document.createElement("section");
areaCards.classList.add("area-cards");

const cards = [
    {
        titulo: "Vagas Ativas",
        valor: "18",
        descricao: "+2 publicadas esta semana",
        icone: "../assets/icons/briefcase.svg",
        descricaoImagem: "Ícone de vagas ativas"
    },
    {
        titulo: "Candidaturas",
        valor: "247",
        descricao: "+35 novas candidaturas",
        icone: "../assets/icons/file-description.svg",
        descricaoImagem: "Ícone de candidaturas"
    },
    {
        titulo: "Entrevistas",
        valor: "12",
        descricao: "5 agendadas para hoje",
        icone: "../assets/icons/calendar-event.svg",
        descricaoImagem: "Ícone de entrevistas"
    },
    {
        titulo: "Contratações",
        valor: "28",
        descricao: "+4 neste mês",
        icone: "../assets/icons/user-check.svg",
        descricaoImagem: "Ícone de contratações"
    }
];


app.appendChild(criarSidebar("empresa", "Kiron LTDA"));
app.appendChild(main);
main.appendChild(areaCards);

cards.forEach(card => {
    areaCards.appendChild(criarCardDashboard(card));
});