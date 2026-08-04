import { criarSidebar } from "../components/sidebar.js";
import { criarCardDashboard } from "../components/card-dashboard.js";
import { dashboardAdministrador } from "../../data/dashboard-administrador.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("dashboard");

const areaCards = document.createElement("section");
areaCards.classList.add("area-cards");

const { usuario, cards } = dashboardAdministrador;

const cardsDashboard = [
    {
        titulo: "Receita Mensal",
        valor: `R$ ${cards.receitaMensal.toLocaleString("pt-BR")},00`,
        descricao: `+${cards.crescimentoReceita}% em relação ao mês anterior`,
        icone: "../assets/icons/businessplan.svg",
        descricaoImagem: "Ícone de receita mensal"
    },
    {
        titulo: "Usuários",
        valor: cards.usuarios,
        descricao: `+${cards.novosUsuarios} novos usuários esta semana`,
        icone: "../assets/icons/users.svg",
        descricaoImagem: "Ícone de usuários"
    },
    {
        titulo: "Empresas Ativas",
        valor: cards.empresasAtivas,
        descricao: `+${cards.novasEmpresas} novas empresas este mês`,
        icone: "../assets/icons/building-skyscraper.svg",
        descricaoImagem: "Ícone de empresas"
    },
    {
        titulo: "Assinaturas Ativas",
        valor: cards.assinaturasAtivas,
        descricao: `${cards.novosPlanos} novos planos este mês`,
        icone: "../assets/icons/credit-card.svg",
        descricaoImagem: "Ícone de assinaturas"
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