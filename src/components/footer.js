export function criarFooter() {
    
const rodape = document.createElement('footer');
rodape.classList.add('footer');

const rodapeContainer = document.createElement('div');
rodapeContainer.classList.add("footer-container");

//coluna footer 1
const colunaLogo = document.createElement('div');
colunaLogo.classList.add('footer-coluna');

const logoContainer = document.createElement('div');
logoContainer.classList.add("logo-container");

const logoFooter = document.createElement('img');
logoFooter.classList.add('logo-footer');

logoFooter.src = "assets/icons/logo-footer.svg";
logoFooter.alt = "Logo Conecta Talent";
const descricaoFooter = document.createElement("p");
descricaoFooter.classList.add("descricao-footer");
descricaoFooter.textContent ="Conectando talentos às melhores oportunidades.";

//coluna footer 2 
const colunaEmpresa = document.createElement('div');
colunaEmpresa.classList.add('footer-coluna');

const tituloEmpresaFooter = document.createElement('h3');
tituloEmpresaFooter.classList.add('titulo-footer');
tituloEmpresaFooter.textContent = "Empresa";


function criarItemFooter(icone, texto, href) {

    const item = document.createElement('div');
    item.classList.add('item-footer');

    const img = document.createElement('img');
    img.classList.add('icone-footer');
    img.src = icone;
    img.alt = texto;

    const link = document.createElement('a');
    link.classList.add('link-footer');
    link.href = href;
    link.textContent = texto;

    item.appendChild(img);
    item.appendChild(link);

    return item;
}

colunaEmpresa.appendChild(tituloEmpresaFooter);

const linksEmpresa = [
    "Sobre nós",
    "Recursos",
    "Planos",
    "Suporte"
];

linksEmpresa.forEach((texto) => {

    colunaEmpresa.appendChild(
        criarItemFooter(
            "assets/icons/chevron-right-branco.svg",
            texto,
            "#"
        )
    );

});

// coluna footer 3

const colunaContato = document.createElement('div');
colunaContato.classList.add('footer-coluna');

const tituloContatoFooter = document.createElement('h3');
tituloContatoFooter.classList.add('titulo-footer');
tituloContatoFooter.textContent = "Contato";

colunaContato.appendChild(tituloContatoFooter);

const contatos = [
    {
        icone: "assets/icons/mail-branco.svg",
        texto: "contato@conectatalent.com",
        href: "mailto:contato@conectatalent.com"
    },
    {
        icone: "assets/icons/phone-branco.svg",
        texto: "(15) 99999-9999",
        href: "tel:+5515999999999"
    }
];

contatos.forEach((item) => {

    colunaContato.appendChild(
        criarItemFooter(
            item.icone,
            item.texto,
            item.href
        )
    );

});

const colunaRedes = document.createElement('div');
colunaRedes.classList.add('footer-coluna');

const tituloRedesFooter = document.createElement('h3');
tituloRedesFooter.classList.add('titulo-footer');
tituloRedesFooter.textContent = "Redes Sociais";

colunaRedes.appendChild(tituloRedesFooter);

const redesSociais = [
    {
        icone: "assets/icons/instagram.svg",
        texto: "Conecta Talent",
        href: "https://www.instagram.com/"
    }
];

redesSociais.forEach((item) => {

    colunaRedes.appendChild(
        criarItemFooter(
            item.icone,
            item.texto,
            item.href
        )
    );

});

const footerBottom = document.createElement('div');
footerBottom.classList.add('footer-bottom');

const copyright = document.createElement('p');
copyright.classList.add('copyright');
copyright.textContent = "© 2026 Conecta Talent. Todos os direitos reservados.";

logoContainer.appendChild(logoFooter);

colunaLogo.appendChild(logoContainer);
colunaLogo.appendChild(descricaoFooter);

rodapeContainer.appendChild(colunaLogo);
rodapeContainer.appendChild(colunaEmpresa);
rodapeContainer.appendChild(colunaContato);
rodapeContainer.appendChild(colunaRedes);

rodape.appendChild(rodapeContainer);
rodape.appendChild(footerBottom);
footerBottom.appendChild(copyright);

return rodape;

}