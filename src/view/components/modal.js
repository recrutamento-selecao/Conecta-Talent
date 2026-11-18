export function criarModal({ titulo, subtitulo, conteudoHTML, aoFechar }) {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.innerHTML = `
        <div class="modal-conteudo">
            <button type="button" class="modal-fechar" id="btnFecharModal">&times;</button>
            
            ${titulo || subtitulo ? `
                <div class="modal-header-texto">
                    ${titulo ? `<h2>${titulo}</h2>` : ''}
                    ${subtitulo ? `<p>${subtitulo}</p>` : ''}
                </div>
            ` : ''}

            <div class="modal-corpo-dinamico"></div>
        </div>
    `;

    const containerCorpo = overlay.querySelector(".modal-corpo-dinamico");
    if (typeof conteudoHTML === "string") {
        containerCorpo.innerHTML = conteudoHTML;
    } else if (conteudoHTML instanceof HTMLElement) {
        containerCorpo.appendChild(conteudoHTML);
    }

    const fechar = () => {
        overlay.remove();
        if (aoFechar) aoFechar();
    };

    overlay.querySelector("#btnFecharModal").addEventListener("click", fechar);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) fechar();
    });

    return overlay;
}