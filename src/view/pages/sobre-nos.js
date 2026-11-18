import { criarHeader } from "../components/header.js";
import { criarFooter } from "../components/footer.js";

export function renderSobreNos() {
    // 1. Contentor principal da página SPA
    const container = document.createElement("div");
    container.classList.add("page-sobre");

    // 2. Elemento principal da página
    const main = document.createElement("main");
    main.classList.add("sobre-nos");

    // --- SECÇÃO APRESENTAÇÃO (TOPO CENTRALIZADO) ---
    const sectionApresentacao = document.createElement("section");
    sectionApresentacao.classList.add("apresentacao-sobre", "cabecalho-secao-centro");

    const tituloSobre = document.createElement("span");
    tituloSobre.classList.add("tag-secao", "tag-sobre");
    tituloSobre.textContent = "SOBRE NÓS";

    const tituloPrincipal = document.createElement("h1");
    tituloPrincipal.classList.add("titulo-principal-sobre", "titulo-secao");
    tituloPrincipal.textContent = "Conectando talentos às melhores oportunidades";

    const descricaoSobre = document.createElement("p");
    descricaoSobre.classList.add("descricao-sobre", "subtitulo-secao");
    descricaoSobre.textContent = "A Conecta Talent nasceu para tornar o recrutamento mais simples, acessível e eficiente, aproximando profissionais em busca de oportunidades e empresas em busca dos melhores talentos.";

    sectionApresentacao.appendChild(tituloSobre);
    sectionApresentacao.appendChild(tituloPrincipal);
    sectionApresentacao.appendChild(descricaoSobre);

    // --- SECÇÃO HISTÓRIA (IMAGEM + TEXTO LADO A LADO) ---
    const sectionHistoria = document.createElement("section");
    sectionHistoria.classList.add("historia");

    // Container da Imagem à Esquerda
    const containerImagem = document.createElement("div");
    containerImagem.classList.add("sobre-imagem-container", "historia-imagem");

    const imagemHistoria = document.createElement("img");
    imagemHistoria.classList.add("imagem-historia");
    imagemHistoria.src = "../assets/images/historia.png";
    imagemHistoria.alt = "Profissionais conectados por meio da tecnologia";

    containerImagem.appendChild(imagemHistoria);

    // Container do Texto à Direita
    const containerTexto = document.createElement("div");
    containerTexto.classList.add("historia-conteudo");

    const subtituloHistoria = document.createElement("span");
    subtituloHistoria.classList.add("subtitulo-historia", "tag-sobre");
    subtituloHistoria.textContent = "NOSSA HISTÓRIA";

    const tituloHistoria = document.createElement("h2");
    tituloHistoria.classList.add("titulo-historia");
    tituloHistoria.textContent = "Tecnologia que aproxima pessoas e oportunidades";

    const descricaoHistoria = document.createElement("p");
    descricaoHistoria.classList.add("descricao-historia");
    descricaoHistoria.textContent = "A Conecta Talent surgiu com o propósito de facilitar a conexão entre empresas e profissionais, tornando os processos de recrutamento e seleção mais organizados, acessíveis e eficientes.";

    containerTexto.appendChild(subtituloHistoria);
    containerTexto.appendChild(tituloHistoria);
    containerTexto.appendChild(descricaoHistoria);

    sectionHistoria.appendChild(containerImagem);
    sectionHistoria.appendChild(containerTexto);

    // --- SECÇÃO PROPÓSITO / VALORES ---
    const sectionProposito = document.createElement("section");
    sectionProposito.classList.add("proposito");

    const cabecalhoProposito = document.createElement("div");
    cabecalhoProposito.classList.add("cabecalho-secao-centro");

    const tituloProposito = document.createElement("h2");
    tituloProposito.classList.add("titulo-secao");
    tituloProposito.textContent = "O que nos guia";

    const descricaoProposito = document.createElement("p");
    descricaoProposito.classList.add("subtitulo-secao");
    descricaoProposito.textContent = "Conheça os princípios que orientam a Conecta Talent.";

    cabecalhoProposito.appendChild(tituloProposito);
    cabecalhoProposito.appendChild(descricaoProposito);

    const areaProposito = document.createElement("div");
    areaProposito.classList.add("area-proposito", "sobre-cards");

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
        cardProposito.classList.add("card-proposito", "card-sobre");

        const iconeProposito = document.createElement("img");
        iconeProposito.classList.add("icone-proposito", "icone-card-sobre");
        iconeProposito.src = proposito.icone;
        iconeProposito.alt = proposito.titulo;

        const tituloCard = document.createElement("h3");
        tituloCard.classList.add("titulo-card-proposito", "titulo-card-sobre");
        tituloCard.textContent = proposito.titulo;

        const descricaoCard = document.createElement("p");
        descricaoCard.classList.add("descricao-card-proposito", "descricao-card-sobre");
        descricaoCard.textContent = proposito.descricao;

        cardProposito.appendChild(iconeProposito);
        cardProposito.appendChild(tituloCard);
        cardProposito.appendChild(descricaoCard);
        areaProposito.appendChild(cardProposito);
    });

    sectionProposito.appendChild(cabecalhoProposito);
    sectionProposito.appendChild(areaProposito);

    // --- MONTAGEM DA ESTRUTURA ---
    main.appendChild(sectionApresentacao);
    main.appendChild(sectionHistoria);
    main.appendChild(sectionProposito);

    container.appendChild(criarHeader());
    container.appendChild(main);
    container.appendChild(criarFooter());

    return container;
}