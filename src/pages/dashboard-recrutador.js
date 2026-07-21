import { criarSidebar } from "../components/sidebar.js";
import { criarCardDashboard } from "../components/card-dashboard.js";

const app = document.getElementById('app');
const main = document.createElement("main");
main.classList.add("dashboard");

const areaCards = document.createElement("section");
areaCards.classList.add("area-cards");

const cards = [
    {
        titulo: "Minhas Vagas",
        valor: "8",
        descricao: "2 novas atribuídas esta semana",
        icone: "../assets/icons/briefcase.svg",
        descricaoImagem: "Ícone de vagas"
    },
    {
        titulo: "Candidatos em Triagem",
        valor: "46",
        descricao: "12 aguardando análise",
        icone: "../assets/icons/users-group.svg",
        descricaoImagem: "Ícone de candidatos em triagem"
    },
    {
        titulo: "Entrevistas Agendadas",
        valor: "9",
        descricao: "3 entrevistas hoje",
        icone: "../assets/icons/calendar-event.svg",
        descricaoImagem: "Ícone de entrevistas"
    },
    {
        titulo: "Processos Concluídos",
        valor: "15",
        descricao: "4 finalizados este mês",
        icone: "../assets/icons/circle-check.svg",
        descricaoImagem: "Ícone de processos concluídos"
    }
];

app.appendChild(criarSidebar("recrutador", "Mariana Goulart"));
app.appendChild(main);
main.appendChild(areaCards);

cards.forEach(card => {
    areaCards.appendChild(criarCardDashboard(card));
});