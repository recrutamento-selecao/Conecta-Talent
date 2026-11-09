export function criarFiltrosVagas(categoriasFiltros = [], funcaoFiltrar) {
    const container = document.createElement("aside");
    container.classList.add("card-filtros");
 
    let htmlContent = `
        <div class="filtros-header">
            <h3>Filtros</h3>
            <button type="button" class="btn-limpar-filtros" id="btnLimparFiltros">Limpar tudo</button>
        </div>
    `;
 
    categoriasFiltros.forEach((categoria, index) => {
        htmlContent += `
            <div class="grupo-filtro">
                <h4>${categoria.titulo}</h4>
                ${categoria.opcoes.map(opcao => `
                    <label class="item-checkbox">
                        <input type="checkbox"
                               name="${categoria.chave}"
                               value="${opcao.valor}"
                               ${opcao.selecionado ? 'checked' : ''}>
                        <span>${opcao.rotulo}</span>
                    </label>
                `).join('')}
            </div>
        `;
 
        if (index < categoriasFiltros.length - 1) {
            htmlContent += `<div class="divisor-filtro"></div>`;
        }
    });
 
    container.innerHTML = htmlContent;
 
    const emitirFiltros = () => {
        const estadoFiltros = {};
 
        categoriasFiltros.forEach(cat => {
            const selecionados = Array.from(
                container.querySelectorAll(`input[name="${cat.chave}"]:checked`)
            ).map(el => el.value);
 
            estadoFiltros[cat.chave] = selecionados;
        });
 
        if (funcaoFiltrar) {
            funcaoFiltrar(estadoFiltros);
        }
    };
 
    container.addEventListener("change", (e) => {
        if (e.target.tagName === "INPUT") {
            emitirFiltros();
        }
    });
 
    const btnLimpar = container.querySelector("#btnLimparFiltros");
    btnLimpar.addEventListener("click", () => {
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(chk => chk.checked = false);
        emitirFiltros();
    });
 
    return container;
}