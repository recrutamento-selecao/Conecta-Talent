import { criarHeader } from "../components/header.js";
import { criarFooter } from "../components/footer.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("sobre-nos");

const sectionApresentacao = document.createElement("section");
sectionApresentacao.classList.add("apresentacao-sobre");

const tituloSobre = document.createElement("h2");
tituloSobre.classList.add("titulo-sobre");
tituloSobre.textContent = "SOBRE NÓS";

const tituloPrincipal = document.createElement("h1");
tituloPrincipal.classList.add("titulo-principal-sobre");
tituloPrincipal.textContent = "Conectando talentos às melhores oportunidades";

const descricaoSobre = document.createElement("p");
descricaoSobre.classList.add("descricao-sobre");
descricaoSobre.textContent = "A Conecta Talent nasceu para tornar o recrutamento mais simples, acessível e eficiente, aproximando profissionais em busca de oportunidades e empresas em busca dos melhores talentos.";

const sectionHistoria = document.createElement("section");
sectionHistoria.classList.add("historia");

const containerImagem = document.createElement("div");
containerImagem.classList.add("historia-imagem");

const imagemHistoria = document.createElement("img");
imagemHistoria.classList.add("imagem-historia");
imagemHistoria.src = "../assets/images/historia.png";
imagemHistoria.alt = "Profissionais conectados por meio da tecnologia";

const containerTexto = document.createElement("div");
containerTexto.classList.add("historia-conteudo");

const subtituloHistoria = document.createElement("span");
subtituloHistoria.classList.add("subtitulo-historia");
subtituloHistoria.textContent = "NOSSA HISTÓRIA";

const tituloHistoria = document.createElement("h2");
tituloHistoria.classList.add("titulo-historia");
tituloHistoria.textContent = "Tecnologia que aproxima pessoas e oportunidades";

const descricaoHistoria = document.createElement("p");
descricaoHistoria.classList.add("descricao-historia");
descricaoHistoria.textContent = "A Conecta Talent surgiu com o propósito de facilitar a conexão entre empresas e profissionais, tornando os processos de recrutamento e seleção mais organizados, acessíveis e eficientes.";

const sectionProposito = document.createElement("section");
sectionProposito.classList.add("proposito");

const tituloProposito = document.createElement("h2");
tituloProposito.classList.add("titulo-proposito");
tituloProposito.textContent = "O que nos guia";

const descricaoProposito = document.createElement("p");
descricaoProposito.classList.add("descricao-proposito");
descricaoProposito.textContent = "Conheça os princípios que orientam a Conecta Talent.";

const areaProposito = document.createElement("div");
areaProposito.classList.add("area-proposito");

const propositos = [
    {
        icone: "../assets/icons/target-arrow.svg",
        titulo: "Missão",
        descricao: "Conectar talentos e empresas por meio de uma experiência de recrutamento simples, eficiente e acessível."
    },
    {
        icone: "../assets/icons/binoculars.svg",
        titulo: "Visão",
        descricao: "Ser uma plataforma de referência em recrutamento e seleção, aproximando pessoas das oportunidades certas."
    },
    {
        icone: "../assets/icons/heart-handshake.svg",
        titulo: "Valores",
        descricao: "Valorizamos transparência, inovação, respeito às pessoas e simplicidade em cada etapa do processo."
    }
];

propositos.forEach((proposito) => {
    const cardProposito = document.createElement("div");
    cardProposito.classList.add('card-proposito');

    const iconeProposito = document.createElement("img");
    iconeProposito.classList.add('icone-proposito');
    iconeProposito.src = proposito.icone;

    const tituloCard = document.createElement("h3");
    tituloCard.classList.add("titulo-card-proposito");
    tituloCard.textContent = proposito.titulo;

    const descricaoCard = document.createElement("p");
    descricaoCard.classList.add("descricao-card-proposito");
    descricaoCard.textContent = proposito.descricao;

    cardProposito.appendChild(iconeProposito);
    cardProposito.appendChild(tituloCard);
    cardProposito.appendChild(descricaoCard);
    areaProposito.appendChild(cardProposito);
});

app.appendChild(criarHeader());
app.appendChild(main);
main.appendChild(sectionApresentacao);
sectionApresentacao.appendChild(tituloSobre);
sectionApresentacao.appendChild(tituloPrincipal);
sectionApresentacao.appendChild(descricaoSobre);
main.appendChild(sectionHistoria);
sectionHistoria.appendChild(containerImagem);
containerImagem.appendChild(imagemHistoria);
sectionHistoria.appendChild(containerTexto);
containerTexto.appendChild(subtituloHistoria);
containerTexto.appendChild(tituloHistoria);
containerTexto.appendChild(descricaoHistoria);
main.appendChild(sectionProposito);
sectionProposito.appendChild(tituloProposito);
sectionProposito.appendChild(descricaoProposito);
sectionProposito.appendChild(areaProposito);

app.appendChild(criarFooter());