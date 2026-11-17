export function criarHeader() {
    const header = document.createElement('header');
    header.classList.add('header');

    const logo = document.createElement('a');
    logo.classList.add('logo-container');
    logo.href = '#home';

    logo.innerHTML = `
        <img 
            src="/assets/images/logo.png" 
            alt="Conecta Talent Logo" 
            class="logo-img"
        >
    `;

    const navegacao = document.createElement('nav');
    navegacao.classList.add('navegacao');

    const menuItens = [
        { nome: "Sobre nós", pagina: "#sobre-nos" },
        { nome: "Recursos", pagina: "#recursos" },
        { nome: "Planos", pagina: "#planos" },
        { nome: "Suporte", pagina: "#suporte" }
    ];

    menuItens.forEach(item => {
        const linkMenu = document.createElement('a');
        linkMenu.textContent = item.nome;
        linkMenu.href = item.pagina;
        linkMenu.classList.add('link-menu');

        navegacao.appendChild(linkMenu);
    });

    const acesso = document.createElement('div');
    acesso.classList.add('acesso');

    const btnEntrar = document.createElement('button');
    btnEntrar.classList.add('btn-entrar');
    btnEntrar.textContent = "Entrar";

    const btnCadastrar = document.createElement('button');
    btnCadastrar.classList.add('btn-cadastrar');
    btnCadastrar.textContent = "Cadastrar-se";

    // --- Redirecionamento correto para a rota da SPA via Hash ---
    btnCadastrar.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '#tipo-cadastro';
    });

    acesso.appendChild(btnEntrar);
    acesso.appendChild(btnCadastrar);

    header.appendChild(logo);
    header.appendChild(navegacao);
    header.appendChild(acesso);

    return header;
}