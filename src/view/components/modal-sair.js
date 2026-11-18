export function criarModalSair(onConfirmar) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    overlay.innerHTML = `
        <div class="modal-card">
            <div class="modal-icone-wrapper">
                <svg class="modal-icone" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
            </div>
            <h3>Deseja realmente sair de sua conta?</h3>
            <div class="modal-botoes">
                <button class="btn-cancelar-modal">Cancelar</button>
                <button class="btn-confirmar-sair">Sair</button>
            </div>
        </div>
    `;

    // Eventos para fechar ou confirmar
    const btnCancelar = overlay.querySelector(".btn-cancelar-modal");
    const btnSair = overlay.querySelector(".btn-confirmar-sair");

    btnCancelar.addEventListener("click", () => {
        overlay.remove();
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove(); // Fecha se clicar fora do card
    });

    btnSair.addEventListener("click", () => {
        if (onConfirmar) onConfirmar();
        overlay.remove();
    });

    return overlay;
}