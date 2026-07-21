import { criarSidebar } from "../components/sidebar.js";
import { criarCardDashboard } from "../components/card-dashboard.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("dashboard");

const areaCards = document.createElement("section");
areaCards.classList.add("area-cards");

const cards = [
    {
        titulo: "Receita Mensal",
        valor: "R$ 18.730,00",
        descricao: "+12% em relação ao mês anterior",
        icone: "../assets/icons/businessplan.svg",
        descricaoImagem: "Ícone de receita mensal"
    },
    {
        titulo: "Usuários",
        valor: "1.258",
        descricao: "+47 novos usuários esta semana",
        icone: "../assets/icons/users.svg",
        descricaoImagem: "Ícone de usuários"
    },
    {
        titulo: "Empresas Ativas",
        valor: "96",
        descricao: "+5 novas empresas este mês",
        icone: "../assets/icons/building-skyscraper.svg",
        descricaoImagem: "Ícone de empresas"
    },
    {
        titulo: "Assinaturas Ativas",
        valor: "342",
        descricao: "15 novos planos este mês",
        icone: "../assets/icons/credit-card.svg",
        descricaoImagem: "Ícone de assinaturas"
    }
];


app.appendChild(criarSidebar("administrador", "Pedro Vitara"));
app.appendChild(main);
main.appendChild(areaCards);

cards.forEach(card => {
    areaCards.appendChild(criarCardDashboard(card));
});

