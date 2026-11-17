
import createForm from "../components/form.js";
import renderCadastroPage from "./cadastro.js";

function renderLoginPage() {
    const container = document.getElementById("login-container");
    container.innerHTML = "";

    const layout = document.createElement("div");
    layout.className = "login-layout";

    const painelEsquerdo = document.createElement("div");
    painelEsquerdo.className = "painel-esquerdo";

    const imagemPainel = document.createElement("img");
    imagemPainel.src = "./assets/images/banner-login.png";
    imagemPainel.alt = "ConectaTalent - Talentos e oportunidades";

    painelEsquerdo.appendChild(imagemPainel);

    const painelDireito = document.createElement("div");
    painelDireito.className = "painel-direito";

    const titulo = document.createElement("h2");
    titulo.className = "titulo-login";
    titulo.textContent = "Acesse sua conta";

    const formContainer = createForm({
        campos: [
            {
                nome: "email",
                label: "E-mail",
                tipo: "email",
                placeholder: "Digite seu e-mail"
            },
            {
                nome: "senha",
                label: "Senha",
                tipo: "password",
                placeholder: "Digite sua senha"
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
    btnCandidato.textContent = "Candidato";
    btnCandidato.className = "perfil ativo";

    const btnEmpresa = document.createElement("button");
    btnEmpresa.type = "button";
    btnEmpresa.textContent = "Empresa";
    btnEmpresa.className = "perfil";

    btnCandidato.addEventListener("click", () => {
        btnCandidato.classList.add("ativo");
        btnEmpresa.classList.remove("ativo");
    });

    btnEmpresa.addEventListener("click", () => {
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
    btnGoogle.innerHTML = '<span class="google-icon">G</span> Entrar com Google';

    const btnMicrosoft = document.createElement("button");
    btnMicrosoft.type = "button";
    btnMicrosoft.className = "botao-social";
    btnMicrosoft.innerHTML = '<span class="microsoft-icon">▦</span> Entrar com Microsoft';

    botoesSociais.append(btnGoogle, btnMicrosoft);

    const linkCadastro = document.createElement("a");
    linkCadastro.href = "#";
    linkCadastro.className = "linkNav";
    linkCadastro.textContent = "Não possui uma conta? Cadastre-se";

    linkCadastro.addEventListener("click", (event) => {
        event.preventDefault();
        container.innerHTML = "";
        container.appendChild(
            renderCadastroPage(() => renderLoginPage())
        );
    });

    const inputEmail = form.querySelector('input[type="email"]');
    const inputSenha = form.querySelector('input[type="password"]');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();

        try {
            const response = await fetch("http://localhost:3000/autenticacao/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            });

            const dados = await response.json();

            if (response.ok) {
                alert("Login realizado com sucesso!");
            } else {
                alert(dados.erro || "Não foi possível realizar o login.");
            }

        } catch (erro) {
            console.log("Erro inesperado!", erro);
            alert("Erro ao conectar com o servidor!");
        }
    });

    painelDireito.append(
        titulo,
        formContainer,
        divisor,
        botoesSociais,
        linkCadastro
    );

    layout.append(painelEsquerdo, painelDireito);
    container.appendChild(layout);
}

export default renderLoginPage;
