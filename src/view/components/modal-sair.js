export function criarModalSair({ onConfirmarSaida, seletorBotaoSair } = {}) {
    if (document.getElementById("modal-sair-overlay")) return;

    let ultimoGatilhoClicado = null;

    const overlay = document.createElement("div");
    overlay.id = "modal-sair-overlay";
    overlay.className = "modal-overlay oculto";
    overlay.innerHTML = `
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-sair-titulo">
            <div class="modal-icone-wrapper">
                <svg class="modal-icone" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
            </div>
            <h3 id="modal-sair-titulo">Deseja realmente sair?</h3>
            <div class="modal-botoes">
                <button type="button" class="btn-cancelar-modal">Cancelar</button>
                <button type="button" class="btn-confirmar-sair">Sair</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const btnCancelar = overlay.querySelector(".btn-cancelar-modal");
    const btnConfirmar = overlay.querySelector(".btn-confirmar-sair");

    const fecharModal = () => {
        overlay.classList.add("oculto");
        if (ultimoGatilhoClicado && typeof ultimoGatilhoClicado.focus === "function") {
            ultimoGatilhoClicado.focus();
            ultimoGatilhoClicado = null;
        }
    };

    const abrirModal = (gatilho = null) => {
        ultimoGatilhoClicado = gatilho;
        overlay.classList.remove("oculto");
        btnCancelar.focus();
    };

    const encontrarGatilhoSair = (alvo) => {
        const seletorPadrao = seletorBotaoSair || ".btn-sair, [data-acao='sair'], .sidebar-sair, a[href='#sair'], button[data-sair]";
        const matchDireto = alvo.closest(seletorPadrao);
        if (matchDireto) return matchDireto;

        const candidato = alvo.closest("button, a");
        if (candidato && candidato.closest(".sidebar, aside, nav") && candidato.textContent.trim().toLowerCase() === "sair") {
            return candidato;
        }

        return null;
    };

    btnCancelar.addEventListener("click", fecharModal);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) fecharModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !overlay.classList.contains("oculto")) {
            fecharModal();
        }
    });

    btnConfirmar.addEventListener("click", () => {
        fecharModal();
        if (typeof onConfirmarSaida === "function") {
            onConfirmarSaida();
        } else {
            window.location.hash = "#home";
        }
    });

    document.addEventListener("click", (e) => {
        const gatilho = encontrarGatilhoSair(e.target);
        if (!gatilho) return;
        e.preventDefault();
        abrirModal(gatilho);
    });
}