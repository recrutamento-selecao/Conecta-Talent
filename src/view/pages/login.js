import createForm from "../components/form.js";

function renderLoginPage() {
    const container = document.createElement("div");
    container.id = "login-container";

    const layout = document.createElement("div");
    layout.className = "login-layout";

    const painelEsquerdo = document.createElement("div");
    painelEsquerdo.className = "painel-esquerdo";

    const imagemPainel = document.createElement("img");
    imagemPainel.src = "/assets/images/banner-login.png";
    imagemPainel.alt = "ConectaTalent - Talentos e oportunidades";

    painelEsquerdo.appendChild(imagemPainel);

    const painelDireito = document.createElement("div");
    painelDireito.className = "painel-direito";

    const btnVoltar = document.createElement("a");
    btnVoltar.href = "#home";
    btnVoltar.className = "btn-voltar";
    btnVoltar.innerHTML = "← Voltar";
    btnVoltar.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.hash = "#home";
    });

    const titulo = document.createElement("h2");
    titulo.className = "titulo-login";
    titulo.textContent = "Acesse sua conta";

    const formContainer = createForm({
        campos: [
            {
                nome: "email",
                label: "E-mail",
                tipo: "email",
                placeholder: ""
            },
            {
                nome: "senha",
                label: "Senha",
                tipo: "password",
                placeholder: ""
            }
        ],
        botoes: [
            {
                texto: "Entrar",
                tipo: "submit",
                className: "botao-enviar"
            }
        ]
    });

    const form = formContainer.querySelector("form");
    form.className = "login-form";

    const selecaoPerfil = document.createElement("div");
    selecaoPerfil.className = "selecao-perfil";

    const btnCandidato = document.createElement("button");
    btnCandidato.type = "button";
    btnCandidato.className = "perfil ativo";
    btnCandidato.textContent = "Candidato";

    const btnEmpresa = document.createElement("button");
    btnEmpresa.type = "button";
    btnEmpresa.className = "perfil";
    btnEmpresa.textContent = "Empresa";

    let perfilSelecionado = localStorage.getItem("perfilSelecionado") || "candidato";

    if (perfilSelecionado === "empresa") {
        btnEmpresa.classList.add("ativo");
        btnCandidato.classList.remove("ativo");
    }

    btnCandidato.addEventListener("click", () => {
        perfilSelecionado = "candidato";
        localStorage.setItem("perfilSelecionado", perfilSelecionado);
        btnCandidato.classList.add("ativo");
        btnEmpresa.classList.remove("ativo");
    });

    btnEmpresa.addEventListener("click", () => {
        perfilSelecionado = "empresa";
        localStorage.setItem("perfilSelecionado", perfilSelecionado);
        btnEmpresa.classList.add("ativo");
        btnCandidato.classList.remove("ativo");
    });

    selecaoPerfil.append(btnCandidato, btnEmpresa);
    form.prepend(selecaoPerfil);

    const linkSenha = document.createElement("a");
    linkSenha.href = "#";
    linkSenha.className = "esqueceu-senha";
    linkSenha.textContent = "Esqueci minha senha";

    const botaoEntrar = form.querySelector('button[type="submit"]');
    form.insertBefore(linkSenha, botaoEntrar);

    const divisor = document.createElement("div");
    divisor.className = "divisor-login";
    divisor.innerHTML = "<span></span><p>Ou continue com</p><span></span>";

    const botoesSociais = document.createElement("div");
    botoesSociais.className = "botoes-sociais";

    const btnGoogle = document.createElement("button");
    btnGoogle.type = "button";
    btnGoogle.className = "botao-social";
    btnGoogle.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Entrar com Google
    `;

    const btnMicrosoft = document.createElement("button");
    btnMicrosoft.type = "button";
    btnMicrosoft.className = "botao-social";
    btnMicrosoft.innerHTML = `
        <svg viewBox="0 0 21 21" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
            <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
            <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
        </svg>
        Entrar com Microsoft
    `;

    async function iniciarLoginSocial(provider) {
        localStorage.setItem("perfilSelecionado", perfilSelecionado);
        const destinoPosLogin = perfilSelecionado === "empresa"
            ? `${window.location.origin}/#dashboard-empresa`
            : `${window.location.origin}/#dashboard-candidato`;

        try {
            const response = await fetch("/autenticacao/oauth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    provider,
                    redirectTo: destinoPosLogin
                })
            });

            const dados = await response.json();

            if (response.ok && dados.url) {
                window.location.href = dados.url;
            } else {
                alert(dados.erro || "Não foi possível iniciar o login social.");
            }
        } catch (erro) {
            alert("Erro ao conectar com o servidor!");
        }
    }

    btnGoogle.addEventListener("click", () => iniciarLoginSocial("google"));
    btnMicrosoft.addEventListener("click", () => iniciarLoginSocial("microsoft"));

    botoesSociais.append(btnGoogle, btnMicrosoft);

    const linkCadastro = document.createElement("p");
    linkCadastro.className = "link-cadastro-texto";
    linkCadastro.innerHTML = 'Não possui uma conta? <a href="#tipo-cadastro" class="linkNav">Cadastrar-se</a>';

    linkCadastro.querySelector("a").addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.setItem("perfilSelecionado", perfilSelecionado);
        window.location.hash = perfilSelecionado === "empresa" ? "#cadastro-empresa" : "#tipo-cadastro";
    });

    const inputEmail = form.querySelector('input[type="email"]');
    const inputSenha = form.querySelector('input[type="password"]');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();

        try {
            const response = await fetch("/autenticacao/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    senha,
                    perfil: perfilSelecionado
                })
            });

            const dados = await response.json();

            if (response.ok) {
                const token = dados.token || dados.session?.access_token;
                if (token) {
                    localStorage.setItem("token", token);
                }

                localStorage.setItem(
                    "usuarioLogado",
                    JSON.stringify(dados.user || dados.usuario || { email, perfil: perfilSelecionado })
                );

                alert("Login realizado com sucesso!");
                window.location.hash = perfilSelecionado === "empresa" ? "#dashboard-empresa" : "#dashboard-candidato";
            } else {
                alert(dados.erro || dados.error || "Não foi possível realizar o login.");
            }
        } catch (erro) {
            console.log("Erro inesperado!", erro);
            alert("Erro ao conectar com o servidor!");
        }
    });

    painelDireito.append(
        btnVoltar,
        titulo,
        formContainer,
        divisor,
        botoesSociais,
        linkCadastro
    );

    layout.append(painelEsquerdo, painelDireito);
    container.appendChild(layout);

    return container;
}

export default renderLoginPage;