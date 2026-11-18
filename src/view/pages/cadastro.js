const renderCadastroPage = (navegarParaLogin) => {
    const container = document.createElement("div");
    container.className = "cadastro-container";

    const painelEsquerdo = document.createElement("div");
    painelEsquerdo.className = "cadastro-banner";

    const imagem = document.createElement("img");
    imagem.src = "/view/assets/images/banner-cadastro.png";
    imagem.alt = "ConectaTalent - Sua carreira começa aqui";

    painelEsquerdo.appendChild(imagem);

    const painelDireito = document.createElement("div");
    painelDireito.className = "cadastro-painel";

    const navegacao = document.createElement("div");
    navegacao.className = "cadastro-navegacao";

    const voltar = document.createElement("a");
    voltar.href = "#";
    voltar.textContent = "← Voltar";
    voltar.addEventListener("click", (event) => {
        event.preventDefault();
        navegarParaLogin();
    });

    const entrar = document.createElement("div");
    entrar.className = "cadastro-entrar";
    entrar.textContent = "Já tem uma conta? ";

    const linkNav = document.createElement("a");
    linkNav.href = "#";
    linkNav.className = "linkNav";
    linkNav.textContent = "Já possui uma conta? Faça login!";

    linkNav.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.hash = "#login";
    });

    entrar.appendChild(linkEntrar);
    navegacao.append(voltar, entrar);

    const card = document.createElement("div");
    card.className = "cadastro-card";

    const titulo = document.createElement("h1");
    titulo.textContent = "Cadastro de candidato";

    const descricao = document.createElement("p");
    descricao.className = "cadastro-descricao";
    descricao.textContent = "É rápido e fácil. Em poucos passos você já estará pronto para encontrar grandes oportunidades.";

    const stepper = document.createElement("div");
    stepper.className = "cadastro-stepper";

    const numeroEtapa = document.createElement("div");
    numeroEtapa.className = "stepper-numero";
    numeroEtapa.textContent = "1";

    const nomeEtapa = document.createElement("span");
    nomeEtapa.textContent = "Dados pessoais";

    stepper.append(numeroEtapa, nomeEtapa);

    const formContainer = createForm({
        campos: [
            {
                nome: "nome",
                label: "Nome completo",
                tipo: "text",
                placeholder: "Digite seu nome completo"
            },
            {
                nome: "email",
                label: "E-mail",
                tipo: "email",
                placeholder: "Digite seu e-mail"
            },
            {
                nome: "cpf",
                label: "CPF",
                tipo: "text",
                placeholder: "000.000.000-00"
            },
            {
                nome: "telefone",
                label: "Telefone",
                tipo: "tel",
                placeholder: "(00) 00000-0000"
            },
            {
                nome: "senha",
                label: "Senha",
                tipo: "password",
                placeholder: "Digite sua senha"
            },
            {
                nome: "confirmar-senha",
                label: "Confirmar senha",
                tipo: "password",
                placeholder: "Confirme sua senha"
            }
        ],
        botoes: [
            {
                texto: "Finalizar cadastro",
                tipo: "submit",
                className: "btn-submit"
            }
        ]
    });

    const form = formContainer.querySelector("form");
    form.className = "cadastro-form";

    const termos = document.createElement("div");
    termos.className = "cadastro-termos";

    const checkboxTermos = document.createElement("input");
    checkboxTermos.type = "checkbox";
    checkboxTermos.name = "termos";
    checkboxTermos.required = true;

    const textoTermos = document.createElement("label");
    textoTermos.append("Li e concordo com os ");

    const linkTermos = document.createElement("a");
    linkTermos.href = "#";
    linkTermos.textContent = "Termos de uso";

    const textoE = document.createTextNode(" e a ");

    const linkPrivacidade = document.createElement("a");
    linkPrivacidade.href = "#";
    linkPrivacidade.textContent = "Política de privacidade";

    textoTermos.append(linkTermos, textoE, linkPrivacidade);
    termos.append(checkboxTermos, textoTermos);

    const botaoSubmit = form.querySelector(".btn-submit");

    if (botaoSubmit) {
        const areaBotao = botaoSubmit.closest(".botoes") || botaoSubmit;
        areaBotao.before(termos);
    } else {
        form.appendChild(termos);
    }

    const inputNome = form.querySelector('[name="nome"]');
    const inputEmail = form.querySelector('[name="email"]');
    const inputCpf = form.querySelector('[name="cpf"]');
    const inputTelefone = form.querySelector('[name="telefone"]');
    const inputSenha = form.querySelector('[name="senha"]');
    const inputConfirmarSenha = form.querySelector('[name="confirmar-senha"]');

    [
        inputNome,
        inputEmail,
        inputCpf,
        inputTelefone,
        inputSenha,
        inputConfirmarSenha
    ].forEach((input) => {
        if (input) {
            input.required = true;
        }
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = inputNome.value.trim();
        const email = inputEmail.value.trim();
        const cpf = inputCpf.value.trim();
        const telefone = inputTelefone.value.trim();
        const senha = inputSenha.value;
        const confirmarSenha = inputConfirmarSenha.value;

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        if (!checkboxTermos.checked) {
            alert("Você precisa aceitar os termos para continuar.");
            return;
        }

        try {
            const resultado = await fetch("/autenticacao/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    cpf,
                    telefone
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

    card.append(titulo, descricao, stepper, formContainer);
    painelDireito.append(navegacao, card);
    container.append(painelEsquerdo, painelDireito);

    return container;
};

export default renderCadastroPage;
