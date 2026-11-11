export function criarBarraBusca(funcaoBuscar) {
    const form = document.createElement("form");
    form.classList.add("barra-busca-container");
 
    form.innerHTML = `
        <div class="campo-busca">
            <svg class="icone-busca" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                <rect x="2" y="6" width="20" height="14" rx="2"></rect>
            </svg>
            <div class="inputs-wrapper">
                <label>Cargo, palavra-chave ou empresa</label>
                <input type="text" id="inputCargo" placeholder="Ex: Analista de Dados" value="Analista de Dados">
            </div>
        </div>
 
        <div class="campo-busca">
            <svg class="icone-busca" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div class="inputs-wrapper">
                <label>Cidade, estado, remoto.</label>
                <input type="text" id="inputLocal" placeholder="Ex: Sorocaba - SP" value="Sorocaba - SP">
            </div>
        </div>
 
        <button type="submit" class="btn-buscar-vagas">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Buscar vagas</span>
        </button>
    `;
 
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
       
        const cargo = form.querySelector("#inputCargo").value;
        const local = form.querySelector("#inputLocal").value;
 
        if (funcaoBuscar) {
            funcaoBuscar(cargo, local);
        }
    });
 
    return form;
}