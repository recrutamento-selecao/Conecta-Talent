export function criarPaginacao(
    totalRegistros,
    registrosPorPagina,
    paginaAtual = 1,
    onChange
) {

    const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina);

    if (totalPaginas <= 1) {
        return document.createDocumentFragment();
    }

    const paginacao = document.createElement("div");
    paginacao.classList.add("paginacao");

    
    const btnAnterior = document.createElement("button");
    btnAnterior.classList.add("btn-pagina");
    btnAnterior.textContent = "←";
    btnAnterior.disabled = paginaAtual === 1;

    btnAnterior.addEventListener("click", () => {
        if (onChange && paginaAtual > 1) {
            onChange(paginaAtual - 1);
        }
    });

    paginacao.appendChild(btnAnterior);

    
    for (let i = 1; i <= totalPaginas; i++) {

        const btnPagina = document.createElement("button");
        btnPagina.classList.add("btn-pagina");
        btnPagina.textContent = i;

        if (i === paginaAtual) {
            btnPagina.classList.add("ativo");
        }

        btnPagina.addEventListener("click", () => {
            if (onChange) {
                onChange(i);
            }
        });

        paginacao.appendChild(btnPagina);
    }


    const btnProximo = document.createElement("button");
    btnProximo.classList.add("btn-pagina");
    btnProximo.textContent = "→";
    btnProximo.disabled = paginaAtual === totalPaginas;

    btnProximo.addEventListener("click", () => {
        if (onChange && paginaAtual < totalPaginas) {
            onChange(paginaAtual + 1);
        }
    });

    paginacao.appendChild(btnProximo);

    return paginacao;
}