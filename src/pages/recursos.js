import { criarHeader } from "../components/header.js";
import { criarFooter } from "../components/footer.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("recursos");

const sectionApresentacao = document.createElement("section");
sectionApresentacao.classList.add("apresentacao-recursos");

const tituloRecursos = document.createElement("h2");
tituloRecursos.classList.add("titulo-recursos");
tituloRecursos.textContent = "RECURSOS";

const tituloPrincipal = document.createElement("h1");
tituloPrincipal.classList.add("titulo-principal-recursos");
tituloPrincipal.textContent = "Tudo o que você precisa para simplificar o recrutamento";

const descricaoRecursos = document.createElement("p");
descricaoRecursos.classList.add("descricao-recursos");
descricaoRecursos.textContent = "Ferramentas para tornar cada etapa do processo seletivo mais organizada e eficiente.";

const areaRecursos = document.createElement("section");
areaRecursos.classList.add("area-recursos");

const recursos = [
    {
        icone: "../assets/icons/briefcase.svg",
        titulo: "Gestão de Vagas",
        descricao: "Crie, edite e acompanhe as vagas disponíveis de forma simples e organizada."
    },
    {
        icone: "../assets/icons/users-group.svg",
        titulo: "Banco de Talentos",
        descricao: "Encontre e organize profissionais cadastrados para futuras oportunidades."
    },
    {
        icone: "../assets/icons/file-description.svg",
        titulo: "Gestão de Candidaturas",
        descricao: "Acompanhe os candidatos durante as diferentes etapas do processo seletivo."
    },
    {
        icone: "../assets/icons/calendar-event.svg",
        titulo: "Agenda de Entrevistas",
        descricao: "Organize e acompanhe as entrevistas agendadas durante os processos seletivos."
    },
    {
        icone: "../assets/icons/user-circle.svg",
        titulo: "Currículo e Perfil",
        descricao: "Permita que candidatos mantenham suas informações profissionais e currículo atualizados."
    },
    {
        icone: "../assets/icons/chart-bar.svg",
        titulo: "Dashboards e Indicadores",
        descricao: "Visualize informações importantes sobre vagas, candidatos e processos seletivos."
    }
];

recursos.forEach((recurso) => {
    const cardRecurso = document.createElement("div");
    cardRecurso.classList.add("card-recurso");

    const iconeRecurso = document.createElement("img");
    iconeRecurso.classList.add("icone-recurso");
    iconeRecurso.src = recurso.icone;
    iconeRecurso.alt = `Ícone de ${recurso.titulo}`;

    const tituloCard = document.createElement("h3");
    tituloCard.classList.add("titulo-card-recurso");
    tituloCard.textContent = recurso.titulo;

    const descricaoCard = document.createElement("p");
    descricaoCard.classList.add("descricao-card-recurso");
    descricaoCard.textContent = recurso.descricao;

    cardRecurso.appendChild(iconeRecurso);
    cardRecurso.appendChild(tituloCard);
    cardRecurso.appendChild(descricaoCard);

    areaRecursos.appendChild(cardRecurso);
});

app.appendChild(criarHeader());

app.appendChild(main);

main.appendChild(sectionApresentacao);
sectionApresentacao.appendChild(tituloRecursos);
sectionApresentacao.appendChild(tituloPrincipal);
sectionApresentacao.appendChild(descricaoRecursos);

main.appendChild(areaRecursos);

app.appendChild(criarFooter());