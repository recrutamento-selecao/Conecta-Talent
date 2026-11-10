
import createForm from "../components/form.js";

const renderCadastroPage = (navegarParaLogin) => {
    const container = document.createElement("div");
    container.className = "cadastro-container";

    const formContainer = createForm({
        campos: [
            {
                nome: "nome",
                label: "Nome",
                tipo: "text",
                placeholder: "Digite seu nome"
            },
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
            },
            {
                nome: "confirmar-senha",
                label: "Confirme sua senha",
                tipo: "password",
                placeholder: "Confirme sua senha"
            }
        ],
        botoes: [
            {
                texto: "Cadastrar",
                tipo: "submit",
                className: "btn-submit"
            }
        ]
    });

    const form = formContainer.querySelector("form");
    form.className = "cadastro-form";

    const titulo = document.createElement("h2");
    titulo.textContent = "Criar conta";

    form.prepend(titulo);

    const linkNav = document.createElement("a");
    linkNav.href = "#";
    linkNav.className = "linkNav";
    linkNav.textContent = "Já possui uma conta? Faça login!";

    linkNav.addEventListener("click", (event) => {
        event.preventDefault();
        navegarParaLogin();
    });

    const inputNome = form.querySelector('[name="nome"]');
    const inputEmail = form.querySelector('[name="email"]');
    const inputSenha = form.querySelector('[name="senha"]');
    const inputConfirmarSenha = form.querySelector('[name="confirmar-senha"]');

    form.appendChild(linkNav);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = inputNome.value.trim();
        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();
        const confirmarSenha = inputConfirmarSenha.value.trim();

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const resultado = await fetch("http://localhost:3000/autenticacao/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha
                })
            });

            const dados = await resultado.json();

            if (resultado.ok) {
                alert("Cadastro realizado com sucesso!");
                navegarParaLogin();
            } else {
                alert(dados.erro || "Erro ao realizar cadastro!");
            }

        } catch (erro) {
            console.error(erro);
            alert("Erro ao conectar com o servidor!");
        }
    });

    container.appendChild(formContainer);

    return container;
};

export default renderCadastroPage;
