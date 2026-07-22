import { criarHeader } from "../components/header.js";
import { criarFooter } from "../components/footer.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("planos");

const sectionApresentacao = document.createElement("section");
sectionApresentacao.classList.add("apresentacao-planos");

const tituloPlanos = document.createElement("h2");
tituloPlanos.classList.add("titulo-planos");
tituloPlanos.textContent = "PLANOS";

const tituloPrincipal = document.createElement("h1");
tituloPrincipal.classList.add("titulo-principal-planos");
tituloPrincipal.textContent = "Escolha o plano ideal para sua empresa";

const descricaoPlanos = document.createElement("p");
descricaoPlanos.classList.add("descricao-planos");
descricaoPlanos.textContent = "Encontre a solução que melhor se adapta às necessidades do seu recrutamento.";

const sectionPlanos = document.createElement("section");
sectionPlanos.classList.add("area-planos");

const planos = [
    {
        nome: "Gratuito",
        preco: "R$ 0",
        periodo: "/mês",
        descricao: "Para empresas que estão começando.",
        recursos: [
            "1 vaga ativa",
            "Até 20 candidatos",
            "Gerenciamento de candidaturas"
        ],
        botao: "Começar grátis"
    },
    {
        nome: "Profissional",
        preco: "R$ 99",
        periodo: "/mês",
        descricao: "Para empresas que recrutam com frequência.",
        recursos: [
            "Até 10 vagas ativas",
            "Candidatos ilimitados",
            "Gerenciamento de candidaturas",
            "Relatórios de recrutamento"
        ],
        botao: "Assinar plano"
    },
    {
        nome: "Premium",
        preco: "R$ 199",
        periodo: "/mês",
        descricao: "Para empresas com maior volume de contratações.",
        recursos: [
            "Vagas ilimitadas",
            "Candidatos ilimitados",
            "Gerenciamento de candidaturas",
            "Relatórios avançados",
            "Suporte prioritário"
        ],
        botao: "Assinar plano"
    }
];

planos.forEach((plano) => {
    const cardPlano = document.createElement("div");
    cardPlano.classList.add("card-plano");

    const nomePlano = document.createElement("h3");
    nomePlano.classList.add("nome-plano");
    nomePlano.textContent = plano.nome;

    const precoPlano = document.createElement("p");
    precoPlano.classList.add("preco-plano");
    precoPlano.textContent = plano.preco;

    const periodoPlano = document.createElement("p");
    periodoPlano.classList.add("periodo-plano");
    periodoPlano.textContent = plano.periodo;

    const descricaoPlano = document.createElement("p");
    descricaoPlano.classList.add("descricao-plano");
    descricaoPlano.textContent = plano.descricao;

    const listaRecursos = document.createElement("ul");
    listaRecursos.classList.add("lista-recursos");

    plano.recursos.forEach((recurso) => {
        const itemRecurso = document.createElement("li");
        itemRecurso.classList.add("item-recurso");
        itemRecurso.textContent = recurso;

        listaRecursos.appendChild(itemRecurso);
    });

    const btnAssinar = document.createElement("button");
    btnAssinar.classList.add("botao-assinar");
    btnAssinar.textContent = plano.botao;

    cardPlano.appendChild(nomePlano);
    cardPlano.appendChild(precoPlano);
    cardPlano.appendChild(periodoPlano);
    cardPlano.appendChild(descricaoPlano);
    cardPlano.appendChild(listaRecursos);
    cardPlano.appendChild(btnAssinar);

    sectionPlanos.appendChild(cardPlano);
});

app.appendChild(criarHeader());

app.appendChild(main);

main.appendChild(sectionApresentacao);

sectionApresentacao.appendChild(tituloPlanos);
sectionApresentacao.appendChild(tituloPrincipal);
sectionApresentacao.appendChild(descricaoPlanos);

main.appendChild(sectionPlanos);

app.appendChild(criarFooter());