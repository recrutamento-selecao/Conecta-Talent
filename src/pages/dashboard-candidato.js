import { criarSidebar } from "../components/sidebar.js";
import { criarCardDashboard } from "../components/card-dashboard.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("dashboard");

const areaCards = document.createElement("section");
areaCards.classList.add("area-cards");

const cards = [
    {
        titulo: "Candidaturas",
        valor: "12",
        descricao: "3 novas esta semana",
        icone: "../assets/icons/file-description.svg",
        descricaoImagem: "Ícone de candidaturas"
    },
    {
        titulo: "Em Análise",
        valor: "5",
        descricao: "Aguardando retorno das empresas",
        icone: "../assets/icons/search.svg",
        descricaoImagem: "Ícone de candidaturas em análise"
    },
    {
        titulo: "Entrevistas",
        valor: "2",
        descricao: "1 agendada para amanhã",
        icone: "../assets/icons/calendar-event.svg",
        descricaoImagem: "Ícone de entrevistas"
    },
    {
        titulo: "Perfil",
        valor: "95%",
        descricao: "Perfil quase completo",
        icone: "../assets/icons/user-circle.svg",
        descricaoImagem: "Ícone do perfil"
    }
];

app.appendChild(criarSidebar("candidato", "João Silva"));
app.appendChild(main);
main.appendChild(areaCards);

cards.forEach(card => {
    areaCards.appendChild(criarCardDashboard(card));
});
