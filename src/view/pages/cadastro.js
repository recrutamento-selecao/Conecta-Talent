const renderCadastroPage = () => {
    const container = document.createElement("div");
    container.className = "cadastro-container";

    const form = document.createElement("form");
    form.className = "cadastro-form";

    const titulo = document.createElement("h2");
    titulo.textContent = "Criar conta";

    const labelNome = document.createElement("label");
    labelNome.textContent = "Nome";

    const inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.name = "nome";
    inputNome.placeholder = "Digite seu nome";
    inputNome.required = true;

    const labelEmail = document.createElement("label");
    labelEmail.textContent = "E-mail";

    const inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.name = "email";
    inputEmail.placeholder = "Digite seu e-mail";
    inputEmail.required = true;

    const labelSenha = document.createElement("label");
    labelSenha.textContent = "Senha";

    const inputSenha = document.createElement("input");
    inputSenha.type = "password";
    inputSenha.name = "senha";
    inputSenha.placeholder = "Digite sua senha";
    inputSenha.required = true;

    const labelConfirmarSenha = document.createElement("label");
    labelConfirmarSenha.textContent = "Confirme sua senha";

    const inputConfirmarSenha = document.createElement("input");
    inputConfirmarSenha.type = "password";
    inputConfirmarSenha.name = "confirmar-senha";
    inputConfirmarSenha.placeholder = "Confirme sua senha";
    inputConfirmarSenha.required = true;

    const button = document.createElement("button");
    button.type = "submit";
    button.className = "btn-submit";
    button.textContent = "Cadastrar";

    const linkNav = document.createElement("a");
    linkNav.href = "#login";
    linkNav.className = "linkNav";
    linkNav.textContent = "Já possui uma conta? Faça login!";

    linkNav.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.hash = "#login";
    });

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
                window.location.hash = "#login";
            } else {
                alert(dados.erro || "Erro ao realizar cadastro!");
            }

        } catch (erro) {
            console.error(erro);
            alert("Erro ao conectar com o servidor!");
        }
    });

    form.appendChild(titulo);
    form.appendChild(labelNome);
    form.appendChild(inputNome);
    form.appendChild(labelEmail);
    form.appendChild(inputEmail);
    form.appendChild(labelSenha);
    form.appendChild(inputSenha);
    form.appendChild(labelConfirmarSenha);
    form.appendChild(inputConfirmarSenha);
    form.appendChild(button);
    form.appendChild(linkNav);

    container.appendChild(form);

    return container;
};

export default renderCadastroPage;