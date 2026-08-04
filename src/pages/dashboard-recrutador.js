import { criarSidebar } from "../components/sidebar.js";
import { criarCardDashboard } from "../components/card-dashboard.js";
import { dashboardRecrutador } from "../../data/dashboard-recrutador.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("dashboard");

const areaCards = document.createElement("section");
areaCards.classList.add("area-cards");


const { usuario, cards } = dashboardRecrutador;


const cardsDashboard = [
    {
        titulo: "Minhas Vagas",
        valor: cards.minhasVagas,
        descricao: `${cards.novasVagas} novas atribuídas esta semana`,
        icone: "../assets/icons/briefcase.svg",
        descricaoImagem: "Ícone de vagas"
    },
    {
        titulo: "Candidatos em Triagem",
        valor: cards.candidatosTriagem,
        descricao: `${cards.aguardandoAnalise} aguardando análise`,
        icone: "../assets/icons/users-group.svg",
        descricaoImagem: "Ícone de candidatos em triagem"
    },
    {
        titulo: "Entrevistas Agendadas",
        valor: cards.entrevistasAgendadas,
        descricao: `${cards.entrevistasHoje} entrevistas hoje`,
        icone: "../assets/icons/calendar-event.svg",
        descricaoImagem: "Ícone de entrevistas"
    },
    {
        titulo: "Processos Concluídos",
        valor: cards.processosConcluidos,
        descricao: `${cards.processosFinalizados} finalizados este mês`,
        icone: "../assets/icons/circle-check.svg",
        descricaoImagem: "Ícone de processos concluídos"
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