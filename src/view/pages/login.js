
import createForm from "../components/form.js";
import renderCadastroPage from "./cadastro.js";

function renderLoginPage() {
    const container = document.getElementById("login-container");

    container.innerHTML = "";

    const titulo = document.createElement("h2");
    titulo.innerText = "Acesse sua conta";
    titulo.className = "titulo-login";

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

    const linkCadastro = document.createElement("a");
    linkCadastro.href = "#";
    linkCadastro.className = "linkNav";
    linkCadastro.textContent = "Não possui uma conta? Cadastre-se!";

    linkCadastro.addEventListener("click", (event) => {
        event.preventDefault();

        container.innerHTML = "";
        container.appendChild(
            renderCadastroPage(() => renderLoginPage())
        );
    });

    container.appendChild(titulo);
    container.appendChild(formContainer);
    container.appendChild(linkCadastro);

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
        }
    });
}

export default renderLoginPage;
