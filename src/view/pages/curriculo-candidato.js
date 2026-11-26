import { criarSidebar } from "../components/sidebar.js";

const LIMITE_CURRICULOS = 3;
const TAMANHO_MAX_MB = 5;
const FORMATOS_ACEITOS = [".pdf", ".doc", ".docx"];

const curriculosEmMemoria = [
    {
        id: "curr-1",
        tipo: "Administrativo",
        titulo: "Currículo Administrativo e Operações",
        nomeArquivo: "Joao_Oliveira_Administrativo.pdf",
        tamanhoFormatado: "420 KB",
        atualizadoEm: "10/11/2026",
        padrao: true
    }
];

export function obterCurriculosCandidato() {
    return curriculosEmMemoria.map((item) => ({ ...item }));
}

export function obterCurriculoPadraoCandidato() {
    return (
        curriculosEmMemoria.find((item) => item.padrao) ||
        curriculosEmMemoria[0] ||
        null
    );
}

function escaparHtml(texto = "") {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function formatarTamanho(bytes = 0) {
    if (!bytes || bytes <= 0) return "250 KB";
    const kb = bytes / 1024;
    if (kb < 1024) return `${Math.round(kb)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
}

function obterDataHoje() {
    return new Date().toLocaleDateString("pt-BR");
}

export function renderCurriculoCandidato(usuarioLogado = "João Oliveira") {
    const container = document.createElement("div");
    container.className = "pagina-layout-dashboard cv-layout";

    const sidebar = criarSidebar("candidato", usuarioLogado);
    container.appendChild(sidebar);

    const main = document.createElement("main");
    main.className = "conteudo-principal cv-main";
    container.appendChild(main);

    let tipoCurriculo = "Tecnologia / TI";
    let tituloCurriculo = "";
    let arquivoSelecionado = null;
    let definirComoPadrao = false;
    let feedback = null;

    function validarUpload() {
        if (curriculosEmMemoria.length >= LIMITE_CURRICULOS) {
            return `Você já cadastrou o limite máximo de ${LIMITE_CURRICULOS} currículos. Remova um para enviar outro.`;
        }

        if (!tipoCurriculo.trim()) {
            return "Selecione o tipo ou área do currículo.";
        }

        if (!tituloCurriculo.trim()) {
            return "Informe um título para identificar esse currículo.";
        }

        if (!arquivoSelecionado) {
            return "Selecione um arquivo de currículo (PDF, DOC ou DOCX).";
        }

        const nomeLower = arquivoSelecionado.name.toLowerCase();
        const formatoValido = FORMATOS_ACEITOS.some((ext) => nomeLower.endsWith(ext));
        if (!formatoValido) {
            return "Formato inválido. Envie apenas arquivos PDF, DOC ou DOCX.";
        }

        const limiteBytes = TAMANHO_MAX_MB * 1024 * 1024;
        if (arquivoSelecionado.size > limiteBytes) {
            return `O arquivo excede o tamanho máximo de ${TAMANHO_MAX_MB} MB.`;
        }

        return null;
    }

    function renderizar() {
        const atingiuLimite = curriculosEmMemoria.length >= LIMITE_CURRICULOS;

        main.innerHTML = `
            <header class="cv-header">
                <h1 class="cv-titulo">Currículo</h1>
                <p class="cv-subtitulo">
                    Cadastre até ${LIMITE_CURRICULOS} versões de currículo por área de atuação. Em cada vaga, você envia 1 currículo escolhido.
                </p>
            </header>

            ${
                feedback
                    ? `<div class="cv-feedback cv-feedback--${feedback.tipo}" role="status">${escaparHtml(feedback.texto)}</div>`
                    : ""
            }

            <div class="cv-regra-box">
                <strong>Como funciona:</strong> Você pode manter até <strong>${LIMITE_CURRICULOS} currículos diferentes</strong> (por exemplo, um para <em>Administrativo</em> e outro para <em>Tecnologia / TI</em>). Na hora de se candidatar a uma vaga, você seleciona <strong>apenas 1 currículo</strong> compatível com aquela oportunidade.
            </div>

            <section class="cv-card" aria-labelledby="titulo-curriculos-cadastrados">
                <div class="cv-card-topo">
                    <div>
                        <h2 id="titulo-curriculos-cadastrados" class="cv-card-titulo">Meus currículos cadastrados</h2>
                        <p class="cv-card-desc">Escolha qual currículo deve ficar marcado como padrão para suas candidaturas.</p>
                    </div>
                    <span class="cv-contador-badge">${curriculosEmMemoria.length} de ${LIMITE_CURRICULOS} currículos</span>
                </div>

                <div class="cv-lista">
                    ${curriculosEmMemoria
                        .map(
                            (curr) => `
                        <article class="cv-item ${curr.padrao ? "is-padrao" : ""}">
                            <div>
                                <div class="cv-item-topo">
                                    <span class="cv-tipo-tag">${escaparHtml(curr.tipo)}</span>
                                    ${curr.padrao ? `<span class="cv-padrao-tag">Padrão</span>` : ""}
                                </div>
                                <h3 class="cv-item-nome">${escaparHtml(curr.titulo)}</h3>
                                <p class="cv-item-arquivo">📄 ${escaparHtml(curr.nomeArquivo)}</p>
                                <p class="cv-item-meta">${escaparHtml(curr.tamanhoFormatado)} • Atualizado em ${escaparHtml(curr.atualizadoEm)}</p>
                            </div>

                            <div class="cv-item-acoes">
                                ${
                                    !curr.padrao
                                        ? `<button type="button" class="cv-btn-light-sm" data-acao="padrao" data-id="${escaparHtml(curr.id)}">Tornar padrão</button>`
                                        : ""
                                }
                                <button type="button" class="cv-btn-danger-sm" data-acao="remover" data-id="${escaparHtml(curr.id)}">Remover</button>
                            </div>
                        </article>
                    `
                        )
                        .join("")}
                </div>
            </section>

            <section class="cv-card" aria-labelledby="titulo-novo-curriculo">
                <div class="cv-card-topo">
                    <div>
                        <h2 id="titulo-novo-curriculo" class="cv-card-titulo">Adicionar novo currículo</h2>
                        <p class="cv-card-desc">
                            ${
                                atingiuLimite
                                    ? "Limite de 3 currículos atingido. Remova um currículo existente para adicionar outro."
                                    : "Envie um arquivo em PDF, DOC ou DOCX (até 5 MB)."
                            }
                        </p>
                    </div>
                </div>

                <form id="form-curriculo-candidato" novalidate>
                    <div class="cv-form-grid">
                        <div class="cv-field">
                            <label for="cv-tipo" class="cv-label">
                                Tipo / área do currículo <span class="cv-required">*</span>
                            </label>
                            <select id="cv-tipo" name="tipo" class="cv-select" ${atingiuLimite ? "disabled" : ""}>
                                <option value="Tecnologia / TI" ${tipoCurriculo === "Tecnologia / TI" ? "selected" : ""}>Tecnologia / TI</option>
                                <option value="Administrativo" ${tipoCurriculo === "Administrativo" ? "selected" : ""}>Administrativo</option>
                                <option value="Dados e BI" ${tipoCurriculo === "Dados e BI" ? "selected" : ""}>Dados e BI</option>
                                <option value="Atendimento e Comercial" ${tipoCurriculo === "Atendimento e Comercial" ? "selected" : ""}>Atendimento e Comercial</option>
                                <option value="Outro" ${tipoCurriculo === "Outro" ? "selected" : ""}>Outro</option>
                            </select>
                        </div>

                        <div class="cv-field">
                            <label for="cv-titulo" class="cv-label">
                                Título de identificação <span class="cv-required">*</span>
                            </label>
                            <input
                                id="cv-titulo"
                                name="titulo"
                                type="text"
                                class="cv-input"
                                placeholder="Ex.: Currículo Focado em TI / Suporte"
                                value="${escaparHtml(tituloCurriculo)}"
                                ${atingiuLimite ? "disabled" : ""}
                            />
                        </div>

                        <div class="cv-field cv-field--full">
                            <label for="cv-arquivo" class="cv-label">
                                Arquivo do currículo (PDF, DOC, DOCX) <span class="cv-required">*</span>
                            </label>
                            <input
                                id="cv-arquivo"
                                name="arquivo"
                                type="file"
                                class="cv-file-input"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                ${atingiuLimite ? "disabled" : ""}
                            />
                        </div>
                    </div>

                    <label class="cv-check-linha">
                        <input
                            type="checkbox"
                            id="cv-marcar-padrao"
                            ${definirComoPadrao || curriculosEmMemoria.length === 0 ? "checked" : ""}
                            ${atingiuLimite ? "disabled" : ""}
                        />
                        Definir este currículo como padrão para candidaturas
                    </label>

                    <div class="cv-divider"></div>

                    <div class="cv-actions">
                        <button type="button" id="cv-btn-limpar" class="cv-btn-secondary">
                            Limpar campos
                        </button>
                        <button type="submit" id="cv-btn-salvar" class="cv-btn-primary" ${atingiuLimite ? "disabled" : ""}>
                            Salvar currículo
                        </button>
                    </div>
                </form>
            </section>
        `;

        const form = main.querySelector("#form-curriculo-candidato");

        main.querySelector("#cv-tipo")?.addEventListener("change", (e) => {
            tipoCurriculo = e.target.value;
        });

        main.querySelector("#cv-titulo")?.addEventListener("input", (e) => {
            tituloCurriculo = e.target.value;
        });

        main.querySelector("#cv-arquivo")?.addEventListener("change", (e) => {
            arquivoSelecionado = e.target.files?.[0] || null;
        });

        main.querySelector("#cv-marcar-padrao")?.addEventListener("change", (e) => {
            definirComoPadrao = e.target.checked;
        });

        main.querySelector("#cv-btn-limpar")?.addEventListener("click", () => {
            tituloCurriculo = "";
            arquivoSelecionado = null;
            definirComoPadrao = false;
            feedback = null;
            renderizar();
        });

        main.querySelectorAll('[data-acao="padrao"]').forEach((btn) => {
            btn.addEventListener("click", () => {
                const idAlvo = btn.dataset.id;
                curriculosEmMemoria.forEach((item) => {
                    item.padrao = item.id === idAlvo;
                });
                feedback = {
                    tipo: "sucesso",
                    texto: "Currículo padrão atualizado para suas próximas candidaturas."
                };
                renderizar();
            });
        });

        main.querySelectorAll('[data-acao="remover"]').forEach((btn) => {
            btn.addEventListener("click", () => {
                const idAlvo = btn.dataset.id;
                const indice = curriculosEmMemoria.findIndex((item) => item.id === idAlvo);
                if (indice === -1) return;

                const eraPadrao = curriculosEmMemoria[indice].padrao;
                curriculosEmMemoria.splice(indice, 1);

                if (eraPadrao && curriculosEmMemoria.length > 0) {
                    curriculosEmMemoria[0].padrao = true;
                }

                feedback = {
                    tipo: "sucesso",
                    texto: "Currículo removido da sua lista."
                };
                renderizar();
            });
        });

        form?.addEventListener("submit", (e) => {
            e.preventDefault();
            const erro = validarUpload();
            if (erro) {
                feedback = { tipo: "erro", texto: erro };
                renderizar();
                return;
            }

            const tornarPadrao =
                definirComoPadrao || curriculosEmMemoria.length === 0;

            if (tornarPadrao) {
                curriculosEmMemoria.forEach((item) => {
                    item.padrao = false;
                });
            }

            curriculosEmMemoria.push({
                id: `curr-${Date.now()}`,
                tipo: tipoCurriculo,
                titulo: tituloCurriculo.trim(),
                nomeArquivo: arquivoSelecionado.name,
                tamanhoFormatado: formatarTamanho(arquivoSelecionado.size),
                atualizadoEm: obterDataHoje(),
                padrao: tornarPadrao
            });

            tituloCurriculo = "";
            arquivoSelecionado = null;
            definirComoPadrao = false;
            feedback = {
                tipo: "sucesso",
                texto: "Currículo salvo com sucesso."
            };
            renderizar();
        });
    }

    renderizar();
    return container;
}