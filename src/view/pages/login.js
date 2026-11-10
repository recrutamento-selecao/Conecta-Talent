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

    const form = formContainer.querySelector("form");
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


export default renderLoginPage;