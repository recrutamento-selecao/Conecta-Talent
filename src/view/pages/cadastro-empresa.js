import { criarStepper } from "../components/stepper.js";
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

    const topo = document.createElement("div");
    topo.className = "topo-cadastro";

    const btnVoltar = document.createElement("a");
    btnVoltar.href = "#login";
    btnVoltar.className = "btn-voltar";
    btnVoltar.textContent = "← Voltar";
    btnVoltar.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.hash = "#login";
    });

    const linkLogin = document.createElement("p");
    linkLogin.className = "link-cadastro-texto";
    linkLogin.innerHTML = 'Já tem uma conta? <a href="#login" class="linkNav">Entrar</a>';
    linkLogin.querySelector("a").addEventListener("click", (event) => {
        event.preventDefault();
        window.location.hash = "#login";
    });

    topo.append(btnVoltar, linkLogin);

    const card = document.createElement("div");
    card.className = "cadastro-card";

    const titulo = document.createElement("h2");
    titulo.className = "titulo-cadastro";
    titulo.textContent = "Cadastro de empresa";

    const descricao = document.createElement("p");
    descricao.className = "descricao-cadastro";
    descricao.textContent = "Preencha as informações abaixo para criar sua conta e começar a contratar os melhores talentos.";

    const etapasEmpresa = [
        { id: 1, titulo: "Dados pessoais" },
        { id: 2, titulo: "Informações complementares" }
    ];

    let stepper = criarStepper({
        etapas: etapasEmpresa,
        etapaAtual: 1
    });

    const secaoSubtitulo = document.createElement("div");
    secaoSubtitulo.className = "secao-subtitulo";
    secaoSubtitulo.innerHTML = `
        <div class="secao-icone">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#203fbd" stroke-width="1.8">
                <path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/>
            </svg>
        </div>
        <div>
            <h3>Dados da empresa</h3>
            <p>Informe os dados principais da sua empresa.</p>
        </div>
    `;

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
            { nome: "nomeEmpresa", label: "Nome da empresa *", tipo: "text", placeholder: "" },
            { nome: "email", label: "E-mail corporativo *", tipo: "email", placeholder: "" },
            { nome: "cnpj", label: "CNPJ *", tipo: "text", placeholder: "" },
            { nome: "telefone", label: "Telefone *", tipo: "tel", placeholder: "" },
            { nome: "senha", label: "Senha *", tipo: "password", placeholder: "" },
            { nome: "confirmarSenha", label: "Confirmar senha *", tipo: "password", placeholder: "" }
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
            { nome: "nomeFantasia", label: "Nome fantasia *", tipo: "text", placeholder: "" },
            { nome: "porte", label: "Porte empresa *", tipo: "text", placeholder: "" },
            { nome: "tipo", label: "Tipo empresa *", tipo: "text", placeholder: "" },
            { nome: "endereco", label: "Endereço *", tipo: "text", placeholder: "" },
            { nome: "cep", label: "CEP *", tipo: "text", placeholder: "" },
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

    const termosLabel = document.createElement("label");
    termosLabel.className = "termos-cadastro";
    termosLabel.innerHTML = `
        <input type="checkbox" required>
        <span>Li e concordo com os <a href="#">Termos de uso</a> e a <a href="#">Política de privacidade</a> do Conecta Talent</span>
    `;
    const primeiroBotaoEtapa2 = formEtapa2.querySelector("button");
    formEtapa2.insertBefore(termosLabel, primeiroBotaoEtapa2);

    Object.keys(dadosEmpresa).forEach((campo) => {
        const input = formEtapa1.querySelector(`[name="${campo}"]`) || formEtapa2.querySelector(`[name="${campo}"]`);
        if (input && dadosEmpresa[campo]) {
            input.value = dadosEmpresa[campo];
        }
    });

    function atualizarStepper(novaEtapa) {
        const novoStepper = criarStepper({
            etapas: etapasEmpresa,
            etapaAtual: novaEtapa
        });
        stepper.replaceWith(novoStepper);
        stepper = novoStepper;
    }

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
        atualizarStepper(2);
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
        atualizarStepper(1);
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

    card.append(
        titulo,
        descricao,
        stepper,
        secaoSubtitulo,
        formEtapa1Container,
        formEtapa2Container
    );

    painelDireito.append(topo, card);
    layout.append(painelEsquerdo, painelDireito);
    container.appendChild(layout);

    return container;
}

export default renderCadastroEmpresaPage;