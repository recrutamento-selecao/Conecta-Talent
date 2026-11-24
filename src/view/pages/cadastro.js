import { criarStepper } from "../components/stepper.js";

const renderCadastroPage = (navegarParaLogin) => {
    const irParaLogin = () => {
        if (typeof navegarParaLogin === "function") {
            navegarParaLogin();
        } else {
            window.location.hash = "#login";
        }
    };

    const container = document.createElement("div");
    container.className = "cadastro-container";

    const painelEsquerdo = document.createElement("div");
    painelEsquerdo.className = "cadastro-banner";

    const imagem = document.createElement("img");
    imagem.src = "/assets/images/banner-cadastro.png";
    imagem.alt = "ConectaTalent - Sua carreira começa aqui";
    painelEsquerdo.appendChild(imagem);

    const painelDireito = document.createElement("div");
    painelDireito.className = "cadastro-painel";

    const navegacao = document.createElement("div");
    navegacao.className = "cadastro-navegacao";

    const voltar = document.createElement("a");
    voltar.href = "#home";
    voltar.textContent = "← Voltar";
    voltar.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.hash = "#home";
    });

    const entrar = document.createElement("div");
    entrar.className = "cadastro-entrar";
    entrar.innerHTML = 'Já tem uma conta? <a href="#login" class="linkNav">Entrar</a>';
    entrar.querySelector("a").addEventListener("click", (event) => {
        event.preventDefault();
        irParaLogin();
    });

    navegacao.append(voltar, entrar);

    const card = document.createElement("div");
    card.className = "cadastro-card";

    const titulo = document.createElement("h1");
    titulo.textContent = "Cadastro de candidato";

    const descricao = document.createElement("p");
    descricao.className = "cadastro-descricao";
    descricao.textContent = "É rápido e fácil. Em poucos passos você já estará pronto para encontrar grandes oportunidades.";

    const stepperWrapper = document.createElement("div");
    stepperWrapper.className = "cadastro-stepper-wrapper";
    const stepper = criarStepper({
        etapas: [{ id: 1, titulo: "Dados pessoais" }],
        etapaAtual: 1
    });
    stepperWrapper.appendChild(stepper);

    const secaoHeader = document.createElement("div");
    secaoHeader.className = "secao-subtitulo-box";
    secaoHeader.innerHTML = `
        <div class="secao-icone-circulo">
            <img src="/assets/icons/people.svg" alt="" width="20" height="20">
        </div>
        <div>
            <h2>Dados pessoais</h2>
            <p>Informe seus dados básicos para criar sua conta.</p>
        </div>
    `;

    const form = document.createElement("form");
    form.innerHTML = `
        <div class="cadastro-grid">
            <div class="campo-bloco">
                <label>Nome completo <span class="asterisco">*</span></label>
                <div class="input-com-icone">
                    <span class="icone-prefixo"><img src="/assets/icons/person-cinza.svg" alt="" width="16"></span>
                    <input type="text" name="nome" required>
                </div>
            </div>
            <div class="campo-bloco">
                <label>E-mail <span class="asterisco">*</span></label>
                <div class="input-com-icone">
                    <span class="icone-prefixo"><img src="/assets/icons/envelope-cinza.svg" alt="" width="16"></span>
                    <input type="email" name="email" required>
                </div>
            </div>
            <div class="campo-bloco">
                <label>CPF <span class="asterisco">*</span></label>
                <div class="input-com-icone">
                    <span class="icone-prefixo"><img src="/assets/icons/file-earmark-text-cinza.svg" alt="" width="16"></span>
                    <input type="text" name="cpf" required>
                </div>
            </div>
            <div class="campo-bloco">
                <label>Telefone <span class="asterisco">*</span></label>
                <div class="input-com-icone">
                    <span class="icone-prefixo"><img src="/assets/icons/telephone-cinza.svg" alt="" width="16"></span>
                    <input type="tel" name="telefone" required>
                </div>
            </div>
            <div class="campo-bloco">
                <label>Senha <span class="asterisco">*</span></label>
                <div class="input-com-icone">
                    <span class="icone-prefixo"><img src="/assets/icons/lock-cinza.svg" alt="" width="16"></span>
                    <input type="password" name="senha" required>
                    <button type="button" class="btn-olho-senha" data-alvo="senha">
                        <img src="/assets/icons/eye-slash.svg" alt="" width="16">
                    </button>
                </div>
            </div>
            <div class="campo-bloco">
                <label>Confirmar senha <span class="asterisco">*</span></label>
                <div class="input-com-icone">
                    <span class="icone-prefixo"><img src="/assets/icons/lock-cinza.svg" alt="" width="16"></span>
                    <input type="password" name="confirmarSenha" required>
                    <button type="button" class="btn-olho-senha" data-alvo="confirmarSenha">
                        <img src="/assets/icons/eye-slash.svg" alt="" width="16">
                    </button>
                </div>
            </div>
        </div>

        <label class="cadastro-termos">
            <input type="checkbox" name="termos" required>
            <span>Li e concordo com os <a href="#">Termos de uso</a> e a <a href="#">Política de privacidade</a> do Conecta Talent</span>
        </label>

        <div class="cadastro-rodape-botoes">
            <button type="submit" class="btn-primario-cadastro">Finalizar cadastro</button>
        </div>
    `;

    form.querySelectorAll(".btn-olho-senha").forEach((btn) => {
        btn.addEventListener("click", () => {
            const input = form.querySelector(`input[name="${btn.dataset.alvo}"]`);
            const icone = btn.querySelector("img");
            if (input.type === "password") {
                input.type = "text";
                icone.src = "/assets/icons/eye.svg";
            } else {
                input.type = "password";
                icone.src = "/assets/icons/eye-slash.svg";
            }
        });
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const dados = Object.fromEntries(new FormData(form).entries());

        if (dados.senha !== dados.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const resultado = await fetch("/autenticacao/cadastro/candidato", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            const resposta = await resultado.json();

            if (resultado.ok) {
                alert("Cadastro realizado com sucesso!");
                irParaLogin();
            } else {
                alert(resposta.erro || "Erro ao realizar cadastro!");
            }
        } catch (erro) {
            alert("Erro ao conectar com o servidor!");
        }
    });

    card.append(titulo, descricao, stepperWrapper, secaoHeader, form);
    painelDireito.append(navegacao, card);
    container.append(painelEsquerdo, painelDireito);

    return container;
};

export default renderCadastroPage;