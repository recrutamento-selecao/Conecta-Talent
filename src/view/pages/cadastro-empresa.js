import { criarStepper } from "../components/stepper.js";

const ETAPAS_EMPRESA = [
    { id: 1, titulo: "Dados pessoais" },
    { id: 2, titulo: "Informações complementares" }
];

const renderCadastroEmpresaPage = () => {
    let etapaAtual = 1;

    const estadoEmpresa = {
        dadosIniciais: {
            nomeEmpresa: "",
            email: "",
            cnpj: "",
            telefone: "",
            senha: "",
            confirmarSenha: ""
        },
        complementares: {
            nomeFantasia: "",
            porte: "",
            tipo: "",
            endereco: "",
            cep: "",
            estado: "",
            cidade: ""
        }
    };

    const container = document.createElement("div");
    container.className = "cadastro-container";

    const painelEsquerdo = document.createElement("div");
    painelEsquerdo.className = "cadastro-banner";

    const imagem = document.createElement("img");
    imagem.src = "/assets/images/banner-cadastro-empresa.png";
    imagem.alt = "ConectaTalent - Encontre os talentos certos para sua empresa";
    imagem.onerror = () => {
        imagem.src = "/assets/images/banner-cadastro.png";
    };
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
        if (etapaAtual === 2) {
            etapaAtual = 1;
            renderizarEtapa();
        } else {
            window.location.hash = "#home";
        }
    });

    const entrar = document.createElement("div");
    entrar.className = "cadastro-entrar";
    entrar.innerHTML = 'Já tem uma conta? <a href="#login" class="linkNav">Entrar</a>';
    entrar.querySelector("a").addEventListener("click", (event) => {
        event.preventDefault();
        window.location.hash = "#login";
    });

    navegacao.append(voltar, entrar);

    const card = document.createElement("div");
    card.className = "cadastro-card";

    function renderizarEtapa() {
        card.innerHTML = "";

        const titulo = document.createElement("h1");
        titulo.textContent = "Cadastro de empresa";

        const descricao = document.createElement("p");
        descricao.className = "cadastro-descricao";
        descricao.textContent = "Preencha as informações abaixo para criar sua conta e começar a contratar os melhores talentos.";

        const stepperWrapper = document.createElement("div");
        stepperWrapper.className = "cadastro-stepper-wrapper";
        const stepper = criarStepper({
            etapas: ETAPAS_EMPRESA,
            etapaAtual: etapaAtual,
            onChange: (novaEtapa) => {
                etapaAtual = novaEtapa;
                renderizarEtapa();
            }
        });
        stepperWrapper.appendChild(stepper);

        const secaoHeader = document.createElement("div");
        secaoHeader.className = "secao-subtitulo-box";
        secaoHeader.innerHTML = `
            <div class="secao-icone-circulo">
                <img src="/assets/icons/building.svg" alt="" width="20" height="20">
            </div>
            <div>
                <h2>Dados da empresa</h2>
                <p>Informe os dados principais da sua empresa.</p>
            </div>
        `;

        card.append(titulo, descricao, stepperWrapper, secaoHeader);

        if (etapaAtual === 1) {
            const form1 = document.createElement("form");
            form1.innerHTML = `
                <div class="cadastro-grid">
                    <div class="campo-bloco">
                        <label>Nome da empresa <span class="asterisco">*</span></label>
                        <div class="input-com-icone">
                            <span class="icone-prefixo"><img src="/assets/icons/person-cinza.svg" alt="" width="16"></span>
                            <input type="text" name="nomeEmpresa" value="${estadoEmpresa.dadosIniciais.nomeEmpresa}" required>
                        </div>
                    </div>
                    <div class="campo-bloco">
                        <label>E-mail corporativo <span class="asterisco">*</span></label>
                        <div class="input-com-icone">
                            <span class="icone-prefixo"><img src="/assets/icons/envelope-cinza.svg" alt="" width="16"></span>
                            <input type="email" name="email" value="${estadoEmpresa.dadosIniciais.email}" required>
                        </div>
                    </div>
                    <div class="campo-bloco">
                        <label>CNPJ <span class="asterisco">*</span></label>
                        <div class="input-com-icone">
                            <span class="icone-prefixo"><img src="/assets/icons/file-earmark-text-cinza.svg" alt="" width="16"></span>
                            <input type="text" name="cnpj" value="${estadoEmpresa.dadosIniciais.cnpj}" required>
                        </div>
                    </div>
                    <div class="campo-bloco">
                        <label>Telefone <span class="asterisco">*</span></label>
                        <div class="input-com-icone">
                            <span class="icone-prefixo"><img src="/assets/icons/telephone-cinza.svg" alt="" width="16"></span>
                            <input type="tel" name="telefone" value="${estadoEmpresa.dadosIniciais.telefone}" required>
                        </div>
                    </div>
                    <div class="campo-bloco">
                        <label>Senha <span class="asterisco">*</span></label>
                        <div class="input-com-icone">
                            <span class="icone-prefixo"><img src="/assets/icons/lock-cinza.svg" alt="" width="16"></span>
                            <input type="password" name="senha" value="${estadoEmpresa.dadosIniciais.senha}" required>
                            <button type="button" class="btn-olho-senha" data-alvo="senha">
                                <img src="/assets/icons/eye-slash.svg" alt="" width="16">
                            </button>
                        </div>
                    </div>
                    <div class="campo-bloco">
                        <label>Confirmar senha <span class="asterisco">*</span></label>
                        <div class="input-com-icone">
                            <span class="icone-prefixo"><img src="/assets/icons/lock-cinza.svg" alt="" width="16"></span>
                            <input type="password" name="confirmarSenha" value="${estadoEmpresa.dadosIniciais.confirmarSenha}" required>
                            <button type="button" class="btn-olho-senha" data-alvo="confirmarSenha">
                                <img src="/assets/icons/eye-slash.svg" alt="" width="16">
                            </button>
                        </div>
                    </div>
                </div>

                <div class="cadastro-rodape-botoes">
                    <button type="submit" class="btn-primario-cadastro">Continuar</button>
                </div>
            `;

            form1.querySelectorAll(".btn-olho-senha").forEach((btn) => {
                btn.addEventListener("click", () => {
                    const input = form1.querySelector(`input[name="${btn.dataset.alvo}"]`);
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

            form1.addEventListener("submit", (event) => {
                event.preventDefault();
                const dados = Object.fromEntries(new FormData(form1).entries());

                if (dados.senha !== dados.confirmarSenha) {
                    alert("As senhas não coincidem!");
                    return;
                }

                estadoEmpresa.dadosIniciais = dados;
                etapaAtual = 2;
                renderizarEtapa();
            });

            card.appendChild(form1);
        } else {
            const form2 = document.createElement("form");
            form2.innerHTML = `
                <div class="cadastro-grid">
                    <div class="campo-bloco">
                        <label>Nome fantasia <span class="asterisco">*</span></label>
                        <div class="input-com-icone">
                            <span class="icone-prefixo"><img src="/assets/icons/buildings-cinza.svg" alt="" width="16"></span>
                            <input type="text" name="nomeFantasia" value="${estadoEmpresa.complementares.nomeFantasia}" required>
                        </div>
                    </div>
                    <div class="campo-bloco">
                        <label>Porte empresa <span class="asterisco">*</span></label>
                        <div class="input-com-icone">
                            <span class="icone-prefixo"><img src="/assets/icons/buildings-cinza.svg" alt="" width="16"></span>
                            <select name="porte" required>
                                <option value="">Selecione</option>
                                <option value="MEI" ${estadoEmpresa.complementares.porte === "MEI" ? "selected" : ""}>MEI</option>
                                <option value="Pequena" ${estadoEmpresa.complementares.porte === "Pequena" ? "selected" : ""}>Pequena</option>
                                <option value="Média" ${estadoEmpresa.complementares.porte === "Média" ? "selected" : ""}>Média</option>
                                <option value="Grande" ${estadoEmpresa.complementares.porte === "Grande" ? "selected" : ""}>Grande</option>
                            </select>
                        </div>
                    </div>
                    <div class="campo-bloco linha-inteira">
                        <label>Tipo empresa <span class="asterisco">*</span></label>
                        <div class="input-com-icone">
                            <span class="icone-prefixo"><img src="/assets/icons/buildings-cinza.svg" alt="" width="16"></span>
                            <select name="tipo" required>
                                <option value="">Selecione</option>
                                <option value="Privada" ${estadoEmpresa.complementares.tipo === "Privada" ? "selected" : ""}>Privada</option>
                                <option value="Pública" ${estadoEmpresa.complementares.tipo === "Pública" ? "selected" : ""}>Pública</option>
                                <option value="ONG" ${estadoEmpresa.complementares.tipo === "ONG" ? "selected" : ""}>ONG</option>
                            </select>
                        </div>
                    </div>
                    <div class="campo-bloco">
                        <label>Endereço <span class="asterisco">*</span></label>
                        <div class="input-com-icone">
                            <span class="icone-prefixo"><img src="/assets/icons/geo-alt-cinza.svg" alt="" width="16"></span>
                            <input type="text" name="endereco" value="${estadoEmpresa.complementares.endereco}" required>
                        </div>
                    </div>
                    <div class="campo-bloco">
                        <label>CEP <span class="asterisco">*</span></label>
                        <div class="input-com-icone">
                            <span class="icone-prefixo"><img src="/assets/icons/mailbox-cinza.svg" alt="" width="16"></span>
                            <input type="text" name="cep" value="${estadoEmpresa.complementares.cep}" required>
                        </div>
                    </div>
                    <div class="campo-bloco">
                        <label>Estado <span class="asterisco">*</span></label>
                        <div class="input-com-icone">
                            <span class="icone-prefixo"><img src="/assets/icons/geo-alt-cinza.svg" alt="" width="16"></span>
                            <input type="text" name="estado" value="${estadoEmpresa.complementares.estado}" required>
                        </div>
                    </div>
                    <div class="campo-bloco">
                        <label>Cidade <span class="asterisco">*</span></label>
                        <div class="input-com-icone">
                            <span class="icone-prefixo"><img src="/assets/icons/geo-alt-cinza.svg" alt="" width="16"></span>
                            <input type="text" name="cidade" value="${estadoEmpresa.complementares.cidade}" required>
                        </div>
                    </div>
                </div>

                <label class="cadastro-termos">
                    <input type="checkbox" name="termos" required>
                    <span>Li e concordo com os <a href="#">Termos de uso</a> e a <a href="#">Política de privacidade</a> do Conecta Talent</span>
                </label>

                <div class="cadastro-rodape-botoes entre-extremos">
                    <button type="button" id="btn-voltar-etapa1" class="btn-secundario-cadastro">Voltar</button>
                    <button type="submit" class="btn-primario-cadastro">Finalizar cadastro</button>
                </div>
            `;

            form2.querySelector("#btn-voltar-etapa1").addEventListener("click", () => {
                estadoEmpresa.complementares = Object.fromEntries(new FormData(form2).entries());
                etapaAtual = 1;
                renderizarEtapa();
            });

            form2.addEventListener("submit", async (event) => {
                event.preventDefault();
                estadoEmpresa.complementares = Object.fromEntries(new FormData(form2).entries());

                const payloadCompleto = {
                    ...estadoEmpresa.dadosIniciais,
                    ...estadoEmpresa.complementares
                };

                try {
                    const resultado = await fetch("/autenticacao/cadastro/empresa", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payloadCompleto)
                    });

                    const resposta = await resultado.json();

                    if (resultado.ok) {
                        alert("Cadastro da empresa realizado com sucesso!");
                        window.location.hash = "#login";
                    } else {
                        alert(resposta.erro || "Erro ao cadastrar empresa!");
                    }
                } catch (erro) {
                    alert("Erro ao conectar com o servidor!");
                }
            });

            card.appendChild(form2);
        }
    }

    renderizarEtapa();

    painelDireito.append(navegacao, card);
    container.append(painelEsquerdo, painelDireito);

    return container;
};

export default renderCadastroEmpresaPage;