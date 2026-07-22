import { criarHeader } from "../components/header.js";
import { criarFooter } from "../components/footer.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("suporte");

const sectionApresentacao = document.createElement("section");
sectionApresentacao.classList.add("apresentacao-suporte");

const tituloSuporte = document.createElement("h2");
tituloSuporte.classList.add("titulo-suporte");
tituloSuporte.textContent = "SUPORTE";

const tituloPrincipal = document.createElement("h1");
tituloPrincipal.classList.add("titulo-principal-suporte");
tituloPrincipal.textContent = "Como podemos ajudar?";

const descricaoSuporte = document.createElement("p");
descricaoSuporte.classList.add("descricao-suporte");
descricaoSuporte.textContent = "Precisa de ajuda ou tem alguma dúvida? Nossa equipe está pronta para ajudar você.";

app.appendChild(criarHeader());

app.appendChild(main);

main.appendChild(sectionApresentacao);
sectionApresentacao.appendChild(tituloSuporte);
sectionApresentacao.appendChild(tituloPrincipal);
sectionApresentacao.appendChild(descricaoSuporte);

app.appendChild(criarFooter());