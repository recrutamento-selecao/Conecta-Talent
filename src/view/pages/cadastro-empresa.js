import criarStepper from "../components/stepper.js";
import createForm from "../components/form.js";

function renderCadastroEmpresaPage() {
    const container = document.createElement("div");
    container.className = "cadastro-container";

    const layout = document.createElement("div");
    layout.className = "cadastro-layout";

    const painelEsquerdo = document.createElement("div");
    painelEsquerdo.className = "painel-esquerdo";

    const imagemPainel = document.createElement("img");
    imagemPainel.src = "/assets/images/banner-cadastro-empresa.png";
    imagemPainel.alt = "ConectaTalent - Cadastro de Empresa";

    painelEsquerdo.appendChild(imagemPainel);

    const painelDireito = document.createElement("div");
    painelDireito.className = "painel-direito";

    const btnVoltar = document.createElement("a");
    btnVoltar.href = "#login";
    btnVoltar.className = "btn-voltar";
    btnVoltar.textContent = "← Voltar";
    btnVoltar.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.hash = "#login";
    });

    const titulo = document.createElement("h2");
    titulo.className = "titulo-cadastro";
    titulo.textContent = "Crie sua conta empresarial";

    const stepper = criarStepper({
        etapas: ["Dados pessoais", "Informações complementares"],
        etapaAtual: 0
    });

    const dadosEmpresa = {
        nomeEmpresa: "",
        email: "",
        cnpj: "",
        telefone: "",
        senha: "",
        confirmarSenha: "",
        nomeFantasia: "",
        porte: "",
        tipo: "",
        endereco: "",
        cep: "",
        estado: "",
        cidade: ""
    };

    const formEtapa1Container = createForm({
        campos: [
            { nome: "nomeEmpresa", label: "Nome da empresa", tipo: "text", placeholder: "" },
            { nome: "email", label: "E-mail corporativo", tipo: "email", placeholder: "" },
            { nome: "cnpj", label: "CNPJ", tipo: "text", placeholder: "" },
            { nome: "telefone", label: "Telefone", tipo: "tel", placeholder: "" },
            { nome: "senha", label: "Senha", tipo: "password", placeholder: "" },
            { nome: "confirmarSenha", label: "Confirmar senha", tipo: "password", placeholder: "" }
        ],
        botoes: [
            {
                texto: "Continuar",
                tipo: "submit",
                className: "botao-enviar"
            }
        ]
    });

    const formEtapa1 = formEtapa1Container.querySelector("form");
    formEtapa1.className = "cadastro-form grade-dois-campos";

    const formEtapa2Container = createForm({
        campos: [
            { nome: "nomeFantasia", label: "Nome fantasia", tipo: "text", placeholder: "" },
            { nome: "porte", label: "Porte da empresa", tipo: "text", placeholder: "" },
            { nome: "tipo", label: "Tipo de empresa", tipo: "text", placeholder: "" },
            { nome: "endereco", label: "Endereço", tipo: "text", placeholder: "" },
            { nome: "cep", label: "CEP", tipo: "text", placeholder: "" },
            { nome: "estado", label: "Estado", tipo: "text", placeholder: "" },
            { nome: "cidade", label: "Cidade", tipo: "text", placeholder: "" }
        ],
        botoes: [
            {
                texto: "Voltar etapa",
                tipo: "button",
                className: "botao-secundario"
            },
            {
                texto: "Finalizar cadastro",
                tipo: "submit",
                className: "botao-enviar"
            }
        ]
    });

    const formEtapa2 = formEtapa2Container.querySelector("form");
    formEtapa2.className = "cadastro-form grade-dois-campos";
    formEtapa2Container.style.display = "none";

    // Preenche inputs se já houver valor salvo no estado
    Object.keys(dadosEmpresa).forEach((campo) => {
        const input = formEtapa1.querySelector(`[name="${campo}"]`) || formEtapa2.querySelector(`[name="${campo}"]`);
        if (input && dadosEmpresa[campo]) {
            input.value = dadosEmpresa[campo];
        }
    });

    formEtapa1.addEventListener("submit", (event) => {
        event.preventDefault();

        const nomeEmpresa = formEtapa1.querySelector('[name="nomeEmpresa"]').value.trim();
        const email = formEtapa1.querySelector('[name="email"]').value.trim();
        const cnpj = formEtapa1.querySelector('[name="cnpj"]').value.trim();
        const telefone = formEtapa1.querySelector('[name="telefone"]').value.trim();
        const senha = formEtapa1.querySelector('[name="senha"]').value.trim();
        const confirmarSenha = formEtapa1.querySelector('[name="confirmarSenha"]').value.trim();

        if (!nomeEmpresa || !email || !cnpj || !telefone || !senha || !confirmarSenha) {
            alert("Preencha todos os campos da primeira etapa.");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        dadosEmpresa.nomeEmpresa = nomeEmpresa;
        dadosEmpresa.email = email;
        dadosEmpresa.cnpj = cnpj;
        dadosEmpresa.telefone = telefone;
        dadosEmpresa.senha = senha;
        dadosEmpresa.confirmarSenha = confirmarSenha;

        formEtapa1Container.style.display = "none";
        formEtapa2Container.style.display = "block";
        stepper.definirEtapa?.(1);
    });

    const btnVoltarEtapa = formEtapa2.querySelector('button[type="button"]');
    btnVoltarEtapa?.addEventListener("click", () => {
        dadosEmpresa.nomeFantasia = formEtapa2.querySelector('[name="nomeFantasia"]').value.trim();
        dadosEmpresa.porte = formEtapa2.querySelector('[name="porte"]').value.trim();
        dadosEmpresa.tipo = formEtapa2.querySelector('[name="tipo"]').value.trim();
        dadosEmpresa.endereco = formEtapa2.querySelector('[name="endereco"]').value.trim();
        dadosEmpresa.cep = formEtapa2.querySelector('[name="cep"]').value.trim();
        dadosEmpresa.estado = formEtapa2.querySelector('[name="estado"]').value.trim();
        dadosEmpresa.cidade = formEtapa2.querySelector('[name="cidade"]').value.trim();

        formEtapa2Container.style.display = "none";
        formEtapa1Container.style.display = "block";
        stepper.definirEtapa?.(0);
    });

    formEtapa2.addEventListener("submit", async (event) => {
        event.preventDefault();

        dadosEmpresa.nomeFantasia = formEtapa2.querySelector('[name="nomeFantasia"]').value.trim();
        dadosEmpresa.porte = formEtapa2.querySelector('[name="porte"]').value.trim();
        dadosEmpresa.tipo = formEtapa2.querySelector('[name="tipo"]').value.trim();
        dadosEmpresa.endereco = formEtapa2.querySelector('[name="endereco"]').value.trim();
        dadosEmpresa.cep = formEtapa2.querySelector('[name="cep"]').value.trim();
        dadosEmpresa.estado = formEtapa2.querySelector('[name="estado"]').value.trim();
        dadosEmpresa.cidade = formEtapa2.querySelector('[name="cidade"]').value.trim();

        try {
            const response = await fetch("/autenticacao/cadastro/empresa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosEmpresa)
            });

            const dados = await response.json();

            if (!response.ok) {
                alert(dados.erro || dados.error || "Não foi possível concluir o cadastro da empresa.");
                return;
            }

            const tokenRecebido = dados.token || dados.session?.access_token;
            if (tokenRecebido) {
                localStorage.setItem("token", tokenRecebido);
            }

            const tokenAtivo = localStorage.getItem("token");
            if (tokenAtivo) {
                await fetch("/autenticacao/cadastro/empresa/dados", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenAtivo}`
                    },
                    body: JSON.stringify({
                        nomeFantasia: dadosEmpresa.nomeFantasia,
                        porte: dadosEmpresa.porte,
                        tipo: dadosEmpresa.tipo,
                        endereco: dadosEmpresa.endereco,
                        cep: dadosEmpresa.cep,
                        estado: dadosEmpresa.estado,
                        cidade: dadosEmpresa.cidade
                    })
                });
            }

            localStorage.setItem("perfilSelecionado", "empresa");
            if (dados.user) {
                localStorage.setItem("usuarioLogado", JSON.stringify(dados.user));
            }

            alert(dados.mensagem || "Empresa cadastrada com sucesso!");
            window.location.hash = "#login";
        } catch (erro) {
            console.log("Erro ao cadastrar empresa:", erro);
            alert("Erro ao conectar com o servidor!");
        }
    });

    const linkLogin = document.createElement("p");
    linkLogin.className = "link-cadastro-texto";
    linkLogin.innerHTML = 'Já possui uma conta? <a href="#login" class="linkNav">Entrar</a>';
    linkLogin.querySelector("a").addEventListener("click", (event) => {
        event.preventDefault();
        window.location.hash = "#login";
    });

    painelDireito.append(
        btnVoltar,
        titulo,
        stepper.elemento || stepper,
        formEtapa1Container,
        formEtapa2Container,
        linkLogin
    );

    layout.append(painelEsquerdo, painelDireito);
    container.appendChild(layout);

    return container;
}

export default renderCadastroEmpresaPage;