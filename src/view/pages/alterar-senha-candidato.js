import { criarSidebar } from "../components/sidebar.js";

function escaparHtml(texto = "") {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function avaliarSenha(senha = "") {
  return {
    tamanhoMinimo: senha.length >= 8,
    maiuscula: /[A-Z]/.test(senha),
    minuscula: /[a-z]/.test(senha),
    numero: /\d/.test(senha),
    especial: /[@#$%]/.test(senha)
  };
}

export function renderAlterarSenhaCandidato(usuarioLogado = "João Oliveira") {
  const container = document.createElement("div");
  container.className = "pagina-layout-dashboard as-layout";

  const sidebar = criarSidebar("candidato", usuarioLogado);
  container.appendChild(sidebar);

  const main = document.createElement("main");
  main.className = "conteudo-principal as-main";
  container.appendChild(main);

  let novaSenha = "";
  let confirmarSenha = "";
  let mostrarNovaSenha = false;
  let mostrarConfirmarSenha = false;
  let feedback = null; // { tipo: "sucesso" | "erro", texto: string }

  function validarFormulario() {
    if (!novaSenha.trim() || !confirmarSenha.trim()) {
      return "Preencha a Nova senha e a confirmação da senha.";
    }

    const req = avaliarSenha(novaSenha);
    if (
      !req.tamanhoMinimo ||
      !req.maiuscula ||
      !req.minuscula ||
      !req.numero ||
      !req.especial
    ) {
      return "A nova senha não atende a todos os requisitos obrigatórios.";
    }

    if (novaSenha !== confirmarSenha) {
      return "A confirmação da senha não coincide com a nova senha.";
    }

    return null;
  }

  function renderizar() {
    const req = avaliarSenha(novaSenha);

    main.innerHTML = `
      <header class="as-page-header">
        <div>
          <h1 class="as-page-title">Alterar senha</h1>
          <p class="as-page-subtitle">Gerencie a senha de acesso da sua conta de candidato.</p>
        </div>
      </header>

      ${
        feedback
          ? `<div class="as-feedback as-feedback--${feedback.tipo}" role="status">${escaparHtml(feedback.texto)}</div>`
          : ""
      }

      <section class="as-card" aria-labelledby="titulo-card-senha-candidato">
        <div class="as-card-header">
          <h2 id="titulo-card-senha-candidato" class="as-card-title">
            <span class="as-card-icon" aria-hidden="true">🔒</span>
            Alterar senha
          </h2>
          <p class="as-card-desc">Atualize sua senha de acesso para manter sua conta segura.</p>
        </div>

        <form id="form-alterar-senha-candidato" class="as-form" novalidate>
          <div class="as-field">
            <label for="as-nova-senha" class="as-label">
              Nova senha <span class="as-required">*</span>
            </label>
            <div class="as-input-group">
              <input
                id="as-nova-senha"
                name="novaSenha"
                type="${mostrarNovaSenha ? "text" : "password"}"
                class="as-input"
                autocomplete="new-password"
                placeholder="Digite sua nova senha"
                value="${escaparHtml(novaSenha)}"
              />
              <button
                type="button"
                id="btn-toggle-nova-senha"
                class="as-toggle-btn"
                aria-pressed="${mostrarNovaSenha}"
              >
                ${mostrarNovaSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <div class="as-field">
            <label for="as-confirmar-senha" class="as-label">
              Confirmar nova senha <span class="as-required">*</span>
            </label>
            <div class="as-input-group">
              <input
                id="as-confirmar-senha"
                name="confirmarSenha"
                type="${mostrarConfirmarSenha ? "text" : "password"}"
                class="as-input"
                autocomplete="new-password"
                placeholder="Digite novamente a nova senha"
                value="${escaparHtml(confirmarSenha)}"
              />
              <button
                type="button"
                id="btn-toggle-confirmar-senha"
                class="as-toggle-btn"
                aria-pressed="${mostrarConfirmarSenha}"
              >
                ${mostrarConfirmarSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <div class="as-requisitos-box" aria-label="Requisitos para sua nova senha">
            <p class="as-requisitos-titulo">REQUISITOS PARA SUA NOVA SENHA:</p>
            <div class="as-requisitos-grid">
              <ul class="as-requisitos-lista">
                <li class="${req.tamanhoMinimo && novaSenha ? "is-ok" : ""}">Mínimo de 8 caracteres</li>
                <li class="${req.minuscula && novaSenha ? "is-ok" : ""}">Uma letra minúscula</li>
                <li class="${req.especial && novaSenha ? "is-ok" : ""}">Um caractere especial (@, #, $, %)</li>
              </ul>
              <ul class="as-requisitos-lista">
                <li class="${req.maiuscula && novaSenha ? "is-ok" : ""}">Uma letra maiúscula</li>
                <li class="${req.numero && novaSenha ? "is-ok" : ""}">Um número</li>
              </ul>
            </div>
          </div>

          <div class="as-divider"></div>

          <div class="as-actions">
            <button type="button" id="btn-cancelar-senha" class="as-btn-secondary">
              Cancelar
            </button>
            <button type="submit" id="btn-salvar-senha" class="as-btn-primary">
              Salvar nova senha
            </button>
          </div>
        </form>
      </section>
    `;

    const form = main.querySelector("#form-alterar-senha-candidato");

    form?.addEventListener("input", e => {
      const target = e.target;
      if (!target?.name) return;

      if (target.name === "novaSenha") {
        novaSenha = target.value;
      } else if (target.name === "confirmarSenha") {
        confirmarSenha = target.value;
      }

      const reqAtual = avaliarSenha(novaSenha);
      const itens = main.querySelectorAll(".as-requisitos-lista li");
      if (itens.length >= 5) {
        itens[0].classList.toggle("is-ok", Boolean(novaSenha && reqAtual.tamanhoMinimo));
        itens[1].classList.toggle("is-ok", Boolean(novaSenha && reqAtual.minuscula));
        itens[2].classList.toggle("is-ok", Boolean(novaSenha && reqAtual.especial));
        itens[3].classList.toggle("is-ok", Boolean(novaSenha && reqAtual.maiuscula));
        itens[4].classList.toggle("is-ok", Boolean(novaSenha && reqAtual.numero));
      }
    });

    main.querySelector("#btn-toggle-nova-senha")?.addEventListener("click", () => {
      mostrarNovaSenha = !mostrarNovaSenha;
      renderizar();
    });

    main.querySelector("#btn-toggle-confirmar-senha")?.addEventListener("click", () => {
      mostrarConfirmarSenha = !mostrarConfirmarSenha;
      renderizar();
    });

    main.querySelector("#btn-cancelar-senha")?.addEventListener("click", () => {
      novaSenha = "";
      confirmarSenha = "";
      mostrarNovaSenha = false;
      mostrarConfirmarSenha = false;
      feedback = null;
      renderizar();
    });

    form?.addEventListener("submit", e => {
      e.preventDefault();
      const erro = validarFormulario();
      if (erro) {
        feedback = { tipo: "erro", texto: erro };
        renderizar();
        return;
      }

      novaSenha = "";
      confirmarSenha = "";
      mostrarNovaSenha = false;
      mostrarConfirmarSenha = false;
      feedback = {
        tipo: "sucesso",
        texto: "Sua senha foi atualizada com sucesso."
      };
      renderizar();
    });
  }

  renderizar();
  return container;
}