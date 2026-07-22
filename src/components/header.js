export function criarHeader() {

    const header = document.createElement('header');
    header.classList.add('header');

    const logo = document.createElement('h1');
    logo.textContent = "Conecta Talent";
    logo.classList.add('logo');

    const navegacao = document.createElement('nav');
    navegacao.classList.add('navegacao');

    const menu = [
        {
            nome: "Sobre nós",
            pagina: "sobre-nos.html"
        },
        {
            nome: "Recursos",
            pagina: "recursos.html"
        },
        {
            nome: "Planos",
            pagina: "planos.html"
        },
        {
            nome: "Suporte",
            pagina: "suporte.html"
        }
    ];

    menu.forEach((itemMenu) => {
        const btnMenu = document.createElement('button');

        btnMenu.textContent = itemMenu.nome;
        btnMenu.classList.add("btn-menu");

        btnMenu.addEventListener("click", () => {
            window.location.href = itemMenu.pagina;
        });

        navegacao.appendChild(btnMenu);
    });

    const acesso = document.createElement('div');
    acesso.classList.add('acesso');

    const btnEntrar = document.createElement('button');
    btnEntrar.classList.add('btn-entrar');
    btnEntrar.textContent = "Entrar";

    const btnCadastrar = document.createElement('button');
    btnCadastrar.classList.add('btn-cadastrar');
    btnCadastrar.textContent = "Cadastrar-se";

    acesso.appendChild(btnEntrar);
    acesso.appendChild(btnCadastrar);

    header.appendChild(logo);
    header.appendChild(navegacao);
    header.appendChild(acesso);

    return header;
}