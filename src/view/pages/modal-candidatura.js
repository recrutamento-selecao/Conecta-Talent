import {
    obterCurriculosCandidato,
    obterCurriculoPadraoCandidato
} from "./curriculo-candidato.js";

// Dados completos do candidato em memória (alinhados com Meus Dados)
let dadosCandidatoEmMemoria = {
    nome: "João Oliveira",
    email: "joao.oliveira@email.com",
    telefone: "(15) 99876-5432",
    cpf: "",
    dataNascimento: "",
    cep: "",
    cidade: "Sorocaba, SP",
    endereco: "",
    cargoInteresse: "",
    pretensaoSalarial: "",
    disponibilidade: "",
    linkedin: "",
    escolaridade: "",
    formacaoAcademica: "",
    cursosCertificacoes: "",
    idiomas: "",
    habilidades: "",
    diversidade: "",
    resumo: ""
};

// Candidaturas enviadas na sessão
const candidaturasEmMemoria = [];

// Contexto temporário caso o candidato precise ir para #meus-dados antes de concluir
let candidaturaPendenteContexto = null;

export function obterDadosCandidato() {
    return { ...dadosCandidatoEmMemoria };
}

export function salvarDadosCandidato(novosDados = {}) {
    dadosCandidatoEmMemoria = {
        ...dadosCandidatoEmMemoria,
        ...novosDados
    };
    return obterDadosCandidato();
}

export function obterCandidaturasEnviadas() {
    return candidaturasEmMemoria.map((item) => ({ ...item }));
}

export function obterCandidaturaPendente() {
    return candidaturaPendenteContexto ? { ...candidaturaPendenteContexto } : null;
}

export function limparCandidaturaPendente() {
    candidaturaPendenteContexto = null;
}

export function dadosCandidatoEstaoPreenchidos(dados = dadosCandidatoEmMemoria) {
    return Boolean(
        dados?.nome?.trim() &&
        dados?.email?.trim() &&
        dados?.telefone?.trim()
    );
}

function escaparHtml(texto = "") {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function garantirEstiloModalCandidatura() {
    if (!document.getElementById("estilo-modal-candidatura")) {
        const link = document.createElement("link");
        link.id = "estilo-modal-candidatura";
        link.rel = "stylesheet";
        link.href = "./view/css/modal-candidatura.css";
        document.head.appendChild(link);
    }
}

/**
 * Abre o modal de candidatura para uma vaga.
 * @param {Object} vaga - { id, titulo, empresa, localidade, modelo, salario }
 * @param {Function} onSucesso - callback opcional após candidatar-se
 */
export function abrirModalCandidatura(vaga = {}, onSucesso = null) {
    garantirEstiloModalCandidatura();

    const anterior = document.getElementById("modal-candidatura-backdrop");
    if (anterior) anterior.remove();

    const vagaAtual = {
        id: vaga.id ?? "vaga-atual",
        titulo: vaga.titulo || "Vaga disponível",
        empresa: vaga.empresa || "Conecta Talent",
        localidade: vaga.localidade || "Sorocaba, SP",
        modelo: vaga.modelo || "Híbrido",
        salario: vaga.salario || ""
    };

    const perfilPreenchido = dadosCandidatoEstaoPreenchidos();
    const curriculos = obterCurriculosCandidato();
    const padrao = obterCurriculoPadraoCandidato();

    let curriculoSelecionadoId = padrao ? padrao.id : (curriculos[0]?.id || "");

    const base = obterDadosCandidato();
    let nome = base.nome || "";
    let email = base.email || "";
    let telefone = base.telefone || "";
    let cpf = base.cpf || "";
    let dataNascimento = base.dataNascimento || "";
    let cep = base.cep || "";
    let cidade = base.cidade || "";
    let endereco = base.endereco || "";
    let cargoInteresse = base.cargoInteresse || "";
    let pretensaoSalarial = base.pretensaoSalarial || "";
    let disponibilidade = base.disponibilidade || "";
    let linkedin = base.linkedin || "";
    let escolaridade = base.escolaridade || "";
    let formacaoAcademica = base.formacaoAcademica || "";
    let cursosCertificacoes = base.cursosCertificacoes || "";
    let idiomas = base.idiomas || "";
    let habilidades = base.habilidades || "";
    let diversidade = base.diversidade || "";
    let resumoManual = base.resumo || "";

    let mensagem = "";
    let erroMsg = "";
    let enviadaComSucesso = false;

    const backdrop = document.createElement("div");
    backdrop.id = "modal-candidatura-backdrop";
    backdrop.className = "mc-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.setAttribute("aria-labelledby", "mc-titulo-modal");

    function fecharModal() {
        backdrop.remove();
    }

    function irParaMeusDados(exigidoPorSubmissao = false) {
        candidaturaPendenteContexto = {
            vaga: vagaAtual,
            curriculoSelecionadoId,
            mensagem,
            exigidoPorSubmissao,
            criadoEm: new Date().toISOString()
        };
        fecharModal();
        window.location.hash = "#meus-dados";
    }

    function validarCandidatura() {
        if (!perfilPreenchido) {
            return "Complete seus dados em Meus Dados antes de enviar a candidatura.";
        }

        if (!nome.trim() || !email.trim() || !telefone.trim()) {
            return "Preencha nome completo, e-mail e telefone para enviar a candidatura.";
        }

        return "";
    }

    function montarHtmlChecklist(curriculoAtualObj) {
        return `
            <h3 class="mc-box-titulo">Checklist antes de enviar</h3>
            <p class="mc-vaga-info"><strong>Vaga:</strong> ${escaparHtml(vagaAtual.titulo)} (${escaparHtml(vagaAtual.empresa)})</p>
            ${
                curriculoAtualObj
                    ? `<p class="mc-vaga-info"><strong>Currículo anexado:</strong> ${escaparHtml(curriculoAtualObj.titulo)} (${escaparHtml(curriculoAtualObj.nomeArquivo)})</p>`
                    : ""
            }
            <p class="mc-vaga-info">
                <strong>Contato:</strong> ${escaparHtml(nome || "Sem nome")} • ${escaparHtml(email || "Sem e-mail")} • ${escaparHtml(telefone || "Sem telefone")}
            </p>
            <p class="mc-vaga-info">
                <strong>Localização / Perfil:</strong> ${escaparHtml(cidade || "Sem cidade")}${cargoInteresse ? ` • ${escaparHtml(cargoInteresse)}` : ""}${pretensaoSalarial ? ` • Pretensão: ${escaparHtml(pretensaoSalarial)}` : ""}
            </p>
            <p class="mc-vaga-info">
                <strong>Formação e Idiomas:</strong> ${escaparHtml(escolaridade || "Escolaridade não informada")}${formacaoAcademica ? ` • ${escaparHtml(formacaoAcademica)}` : ""}${idiomas ? ` • Idiomas: ${escaparHtml(idiomas)}` : ""}
            </p>
            <p class="mc-vaga-info">
                <strong>Habilidades / Cursos / Diversidade:</strong> ${escaparHtml(habilidades || "Habilidades não informadas")}${cursosCertificacoes ? ` • Cursos: ${escaparHtml(cursosCertificacoes)}` : ""}${diversidade ? ` • Diversidade: ${escaparHtml(diversidade)}` : ""}
            </p>
        `;
    }

    function atualizarChecklistSemPerderFoco() {
        const boxChecklist = backdrop.querySelector("#mc-checklist-box");
        if (!boxChecklist) return;
        const curriculoAtualObj =
            curriculos.find((item) => item.id === curriculoSelecionadoId) || null;
        boxChecklist.innerHTML = montarHtmlChecklist(curriculoAtualObj);
    }

    function renderizar() {
        const metaVaga = [vagaAtual.empresa, vagaAtual.localidade, vagaAtual.modelo, vagaAtual.salario]
            .filter(Boolean)
            .join(" • ");

        const curriculoAtualObj =
            curriculos.find((item) => item.id === curriculoSelecionadoId) || null;

        backdrop.innerHTML = `
            <div class="mc-dialog" onclick="event.stopPropagation()">
                <header class="mc-header">
                    <div>
                        <h2 id="mc-titulo-modal" class="mc-titulo">Candidatar-se à vaga</h2>
                        <p class="mc-vaga-info">
                            <strong>${escaparHtml(vagaAtual.titulo)}</strong>${metaVaga ? ` — ${escaparHtml(metaVaga)}` : ""}
                        </p>
                    </div>
                    <button type="button" id="mc-btn-fechar" class="mc-fechar" aria-label="Fechar modal">✕</button>
                </header>

                ${
                    !perfilPreenchido
                        ? `
                    <div class="mc-alerta-perfil">
                        <strong>Seus dados de perfil ainda não estão completos.</strong>
                        Carregamos o que existe em <em>Meus Dados</em>, mas ao submeter você será direcionado para preencher e salvar seu perfil antes de concluir.
                        <button type="button" id="mc-ir-meus-dados-topo" class="mc-link-inline">Ir para Meus Dados agora</button>
                    </div>
                `
                        : ""
                }

                ${
                    erroMsg
                        ? `<div class="mc-erro" role="alert">${escaparHtml(erroMsg)}</div>`
                        : ""
                }

                ${
                    enviadaComSucesso
                        ? `
                    <div class="mc-sucesso" role="status">
                        Candidatura enviada para <strong>${escaparHtml(vagaAtual.titulo)}</strong>!
                    </div>
                    <div class="mc-box">
                        <h3 class="mc-box-titulo">Resumo do que foi enviado</h3>
                        ${
                            curriculoAtualObj
                                ? `<p class="mc-vaga-info"><strong>Currículo:</strong> ${escaparHtml(curriculoAtualObj.titulo)} (${escaparHtml(curriculoAtualObj.nomeArquivo)})</p>`
                                : ""
                        }
                        <p class="mc-vaga-info"><strong>Nome:</strong> ${escaparHtml(nome || "-")}</p>
                        <p class="mc-vaga-info"><strong>E-mail:</strong> ${escaparHtml(email || "-")}</p>
                        <p class="mc-vaga-info"><strong>Telefone:</strong> ${escaparHtml(telefone || "-")}</p>
                        <p class="mc-vaga-info"><strong>CPF:</strong> ${escaparHtml(cpf || "-")}</p>
                        <p class="mc-vaga-info"><strong>Data de nascimento:</strong> ${escaparHtml(dataNascimento || "-")}</p>
                        <p class="mc-vaga-info"><strong>CEP:</strong> ${escaparHtml(cep || "-")}</p>
                        <p class="mc-vaga-info"><strong>Cidade / Estado:</strong> ${escaparHtml(cidade || "-")}</p>
                        <p class="mc-vaga-info"><strong>Endereço:</strong> ${escaparHtml(endereco || "-")}</p>
                        <p class="mc-vaga-info"><strong>Cargo de interesse:</strong> ${escaparHtml(cargoInteresse || "-")}</p>
                        <p class="mc-vaga-info"><strong>Pretensão salarial:</strong> ${escaparHtml(pretensaoSalarial || "-")}</p>
                        <p class="mc-vaga-info"><strong>Disponibilidade:</strong> ${escaparHtml(disponibilidade || "-")}</p>
                        <p class="mc-vaga-info"><strong>LinkedIn / Portfólio:</strong> ${escaparHtml(linkedin || "-")}</p>
                        <p class="mc-vaga-info"><strong>Escolaridade:</strong> ${escaparHtml(escolaridade || "-")}</p>
                        <p class="mc-vaga-info"><strong>Formação acadêmica:</strong> ${escaparHtml(formacaoAcademica || "-")}</p>
                        <p class="mc-vaga-info"><strong>Cursos / Certificações:</strong> ${escaparHtml(cursosCertificacoes || "-")}</p>
                        <p class="mc-vaga-info"><strong>Idiomas:</strong> ${escaparHtml(idiomas || "-")}</p>
                        <p class="mc-vaga-info"><strong>Habilidades:</strong> ${escaparHtml(habilidades || "-")}</p>
                        <p class="mc-vaga-info"><strong>Diversidade:</strong> ${escaparHtml(diversidade || "-")}</p>
                        ${resumoManual ? `<p class="mc-vaga-info"><strong>Resumo:</strong> ${escaparHtml(resumoManual)}</p>` : ""}
                        ${mensagem ? `<p class="mc-vaga-info"><strong>Mensagem:</strong> ${escaparHtml(mensagem)}</p>` : ""}
                    </div>
                    <div class="mc-footer">
                        <button type="button" id="mc-btn-concluir" class="mc-btn-primario">Concluir</button>
                    </div>
                `
                        : `
                    <form id="mc-form-candidatura" novalidate>
                        ${
                            curriculos.length
                                ? `
                            <div class="mc-box">
                                <h3 class="mc-box-titulo">Currículo cadastrado (opcional)</h3>
                                ${curriculos
                                    .map(
                                        (cv) => `
                                    <label class="mc-cv-opcao ${cv.id === curriculoSelecionadoId ? "is-selecionado" : ""}">
                                        <input
                                            type="radio"
                                            name="mcCurriculo"
                                            value="${escaparHtml(cv.id)}"
                                            ${cv.id === curriculoSelecionadoId ? "checked" : ""}
                                        />
                                        <span>
                                            <span class="mc-cv-nome">
                                                ${escaparHtml(cv.titulo)} (${escaparHtml(cv.tipo)})
                                                ${cv.padrao ? " • <em>Padrão</em>" : ""}
                                            </span>
                                            <span class="mc-cv-meta">${escaparHtml(cv.nomeArquivo)} • ${escaparHtml(cv.tamanhoFormatado)}</span>
                                        </span>
                                    </label>
                                `
                                    )
                                    .join("")}
                            </div>
                        `
                                : ""
                        }

                        <div class="mc-box">
                            <h3 class="mc-box-titulo">
                                Conferência e preenchimento dos seus dados (Meus Dados)
                            </h3>

                            <div class="mc-grid">
                                <div class="mc-field">
                                    <label for="mc-nome" class="mc-label">Nome completo *</label>
                                    <input id="mc-nome" name="nome" type="text" class="mc-input" value="${escaparHtml(nome)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-email" class="mc-label">E-mail *</label>
                                    <input id="mc-email" name="email" type="email" class="mc-input" value="${escaparHtml(email)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-telefone" class="mc-label">Telefone *</label>
                                    <input id="mc-telefone" name="telefone" type="text" class="mc-input" value="${escaparHtml(telefone)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-cpf" class="mc-label">CPF</label>
                                    <input id="mc-cpf" name="cpf" type="text" class="mc-input" placeholder="000.000.000-00" value="${escaparHtml(cpf)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-data-nascimento" class="mc-label">Data de nascimento</label>
                                    <input id="mc-data-nascimento" name="dataNascimento" type="date" class="mc-input" value="${escaparHtml(dataNascimento)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-cep" class="mc-label">CEP</label>
                                    <input id="mc-cep" name="cep" type="text" class="mc-input" placeholder="00000-000" value="${escaparHtml(cep)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-cidade" class="mc-label">Cidade / Estado</label>
                                    <input id="mc-cidade" name="cidade" type="text" class="mc-input" value="${escaparHtml(cidade)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-endereco" class="mc-label">Endereço / Bairro</label>
                                    <input id="mc-endereco" name="endereco" type="text" class="mc-input" placeholder="Rua, número, bairro" value="${escaparHtml(endereco)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-cargo-interesse" class="mc-label">Cargo / Área de interesse</label>
                                    <input id="mc-cargo-interesse" name="cargoInteresse" type="text" class="mc-input" placeholder="Ex.: Analista de Dados" value="${escaparHtml(cargoInteresse)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-pretensao-salarial" class="mc-label">Pretensão salarial</label>
                                    <input id="mc-pretensao-salarial" name="pretensaoSalarial" type="text" class="mc-input" placeholder="Ex.: R$ 4.000" value="${escaparHtml(pretensaoSalarial)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-disponibilidade" class="mc-label">Disponibilidade</label>
                                    <input id="mc-disponibilidade" name="disponibilidade" type="text" class="mc-input" placeholder="Ex.: Imediata" value="${escaparHtml(disponibilidade)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-linkedin" class="mc-label">LinkedIn / Portfólio</label>
                                    <input id="mc-linkedin" name="linkedin" type="url" class="mc-input" placeholder="https://..." value="${escaparHtml(linkedin)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-escolaridade" class="mc-label">Escolaridade</label>
                                    <input id="mc-escolaridade" name="escolaridade" type="text" class="mc-input" placeholder="Ex.: Superior completo" value="${escaparHtml(escolaridade)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-formacao-academica" class="mc-label">Formação acadêmica</label>
                                    <input id="mc-formacao-academica" name="formacaoAcademica" type="text" class="mc-input" placeholder="Ex.: Análise e Desenvolvimento de Sistemas" value="${escaparHtml(formacaoAcademica)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-idiomas" class="mc-label">Idiomas</label>
                                    <input id="mc-idiomas" name="idiomas" type="text" class="mc-input" placeholder="Ex.: Inglês intermediário, Espanhol básico" value="${escaparHtml(idiomas)}" />
                                </div>
                                <div class="mc-field">
                                    <label for="mc-diversidade" class="mc-label">Diversidade</label>
                                    <input id="mc-diversidade" name="diversidade" type="text" class="mc-input" placeholder="Ex.: Mulher, PCD, Prefiro não informar..." value="${escaparHtml(diversidade)}" />
                                </div>
                            </div>

                            <div class="mc-field">
                                <label for="mc-cursos-certificacoes" class="mc-label">Cursos / Certificações</label>
                                <textarea
                                    id="mc-cursos-certificacoes"
                                    name="cursosCertificacoes"
                                    class="mc-textarea"
                                    placeholder="Liste cursos, certificações ou formações complementares..."
                                >${escaparHtml(cursosCertificacoes)}</textarea>
                            </div>

                            <div class="mc-field">
                                <label for="mc-habilidades" class="mc-label">Habilidades</label>
                                <textarea
                                    id="mc-habilidades"
                                    name="habilidades"
                                    class="mc-textarea"
                                    placeholder="Ex.: Power BI, SQL, Excel, Python, comunicação, organização..."
                                >${escaparHtml(habilidades)}</textarea>
                            </div>

                            <div class="mc-field">
                                <label for="mc-resumo" class="mc-label">Resumo profissional / experiência para a vaga</label>
                                <textarea
                                    id="mc-resumo"
                                    name="resumo"
                                    class="mc-textarea"
                                    placeholder="Destaque suas principais experiências relacionadas à vaga..."
                                >${escaparHtml(resumoManual)}</textarea>
                            </div>
                        </div>

                        <div class="mc-field">
                            <label for="mc-mensagem" class="mc-label">Mensagem para o recrutador (opcional)</label>
                            <textarea
                                id="mc-mensagem"
                                name="mensagem"
                                class="mc-textarea"
                                placeholder="Ex.: Tenho disponibilidade imediata e experiência alinhada aos requisitos..."
                            >${escaparHtml(mensagem)}</textarea>
                        </div>

                        <div id="mc-checklist-box" class="mc-box">
                            ${montarHtmlChecklist(curriculoAtualObj)}
                        </div>

                        <div class="mc-footer">
                            <button type="button" id="mc-btn-cancelar" class="mc-btn-secundario">Cancelar</button>
                            <button type="submit" id="mc-btn-enviar" class="mc-btn-primario">
                                ${perfilPreenchido ? "Enviar candidatura" : "Completar Meus Dados e enviar"}
                            </button>
                        </div>
                    </form>
                `
                }
            </div>
        `;

        backdrop.querySelector("#mc-btn-fechar")?.addEventListener("click", fecharModal);
        backdrop.querySelector("#mc-btn-cancelar")?.addEventListener("click", fecharModal);
        backdrop.querySelector("#mc-btn-concluir")?.addEventListener("click", fecharModal);

        backdrop.querySelector("#mc-ir-meus-dados-topo")?.addEventListener("click", () => {
            irParaMeusDados(false);
        });

        backdrop.querySelectorAll('input[name="mcCurriculo"]').forEach((radio) => {
            radio.addEventListener("change", (e) => {
                curriculoSelecionadoId = e.target.value;
                erroMsg = "";
                renderizar();
            });
        });

        const ligacoesCampos = [
            ["#mc-nome", (v) => { nome = v; }],
            ["#mc-email", (v) => { email = v; }],
            ["#mc-telefone", (v) => { telefone = v; }],
            ["#mc-cpf", (v) => { cpf = v; }],
            ["#mc-data-nascimento", (v) => { dataNascimento = v; }],
            ["#mc-cep", (v) => { cep = v; }],
            ["#mc-cidade", (v) => { cidade = v; }],
            ["#mc-endereco", (v) => { endereco = v; }],
            ["#mc-cargo-interesse", (v) => { cargoInteresse = v; }],
            ["#mc-pretensao-salarial", (v) => { pretensaoSalarial = v; }],
            ["#mc-disponibilidade", (v) => { disponibilidade = v; }],
            ["#mc-linkedin", (v) => { linkedin = v; }],
            ["#mc-escolaridade", (v) => { escolaridade = v; }],
            ["#mc-formacao-academica", (v) => { formacaoAcademica = v; }],
            ["#mc-cursos-certificacoes", (v) => { cursosCertificacoes = v; }],
            ["#mc-idiomas", (v) => { idiomas = v; }],
            ["#mc-habilidades", (v) => { habilidades = v; }],
            ["#mc-diversidade", (v) => { diversidade = v; }],
            ["#mc-resumo", (v) => { resumoManual = v; }],
            ["#mc-mensagem", (v) => { mensagem = v; }]
        ];

        ligacoesCampos.forEach(([seletor, atualizarValor]) => {
            const el = backdrop.querySelector(seletor);
            el?.addEventListener("input", (e) => {
                atualizarValor(e.target.value);
                atualizarChecklistSemPerderFoco();
            });
        });

        backdrop.querySelector("#mc-form-candidatura")?.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!perfilPreenchido) {
                irParaMeusDados(true);
                return;
            }

            const erro = validarCandidatura();
            if (erro) {
                erroMsg = erro;
                renderizar();
                return;
            }

            const curriculoEscolhido =
                curriculos.find((item) => item.id === curriculoSelecionadoId) || null;

            const dadosAtualizados = {
                nome: nome.trim(),
                email: email.trim(),
                telefone: telefone.trim(),
                cpf: cpf.trim(),
                dataNascimento: dataNascimento.trim(),
                cep: cep.trim(),
                cidade: cidade.trim(),
                endereco: endereco.trim(),
                cargoInteresse: cargoInteresse.trim(),
                pretensaoSalarial: pretensaoSalarial.trim(),
                disponibilidade: disponibilidade.trim(),
                linkedin: linkedin.trim(),
                escolaridade: escolaridade.trim(),
                formacaoAcademica: formacaoAcademica.trim(),
                cursosCertificacoes: cursosCertificacoes.trim(),
                idiomas: idiomas.trim(),
                habilidades: habilidades.trim(),
                diversidade: diversidade.trim(),
                resumo: resumoManual.trim()
            };

            salvarDadosCandidato(dadosAtualizados);

            candidaturasEmMemoria.push({
                id: `cand-${Date.now()}`,
                vaga: vagaAtual,
                modo: "manual",
                curriculo: curriculoEscolhido,
                dadosCandidato: { ...dadosAtualizados },
                mensagem: mensagem.trim(),
                enviadaEm: new Date().toLocaleDateString("pt-BR")
            });

            enviadaComSucesso = true;
            erroMsg = "";
            renderizar();

            if (typeof onSucesso === "function") {
                onSucesso(candidaturasEmMemoria[candidaturasEmMemoria.length - 1]);
            }
        });
    }

    backdrop.addEventListener("click", fecharModal);
    renderizar();
    document.body.appendChild(backdrop);
}