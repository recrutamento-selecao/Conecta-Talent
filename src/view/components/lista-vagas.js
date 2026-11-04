export function criarListaVagas(vagas = []) {
    const container = document.createElement("div");
    container.classList.add("container-lista-vagas");

    container.innerHTML = `
        <div class="lista-vagas-header">
            <span class="vagas-contador">${vagas.length} vagas encontradas</span>
            <div class="ordenar-wrapper">
                <label for="selectOrdenar">Ordenar por:</label>
                <select id="selectOrdenar" class="select-ordenar">
                    <option value="relevante">Mais relevante</option>
                    <option value="recentes">Mais recentes</option>
                </select>
            </div>
        </div>
        <div class="cards-wrapper"></div>
    `;

    const wrapper = container.querySelector(".cards-wrapper");

    if (vagas.length === 0) {
        wrapper.innerHTML = `<p class="sem-vagas">Nenhuma vaga encontrada com os filtros selecionados.</p>`;
        return container;
    }

    vagas.forEach((vaga) => {
        const card = document.createElement("div");
        card.classList.add("card-vaga");

        card.innerHTML = `
            <div class="card-vaga-logo">
                <img src="./assets/icons/company.svg" alt="Empresa" width="24" height="24" onerror="this.src='./assets/icons/briefcase.svg'">
            </div>
            
            <div class="card-vaga-conteudo">
                <div class="card-vaga-topo">
                    <div class="info-titulo">
                        <h3>${vaga.titulo}</h3>
                        ${vaga.empresa ? `<span class="empresa-nome">${vaga.empresa}</span>` : ''}
                    </div>
                </div>

                <div class="card-vaga-tags">
                    <span class="tag-item">
                        <img src="./assets/icons/map-pin.svg" alt="Local" class="icone-tag"> ${vaga.localizacao}
                    </span>
                    <span class="tag-item">
                        <img src="./assets/icons/briefcase.svg" alt="Modelo" class="icone-tag"> ${vaga.modelo}
                    </span>
                    <span class="tag-item">
                        <img src="./assets/icons/briefcase.svg" alt="Contrato" class="icone-tag"> ${vaga.contrato}
                    </span>
                    <span class="tag-item">
                        <img src="./assets/icons/cash-stack.svg" alt="Salário" class="icone-tag"> R$ ${vaga.salario}
                    </span>
                </div>
            </div>

            <div class="card-vaga-lado-direito">
                <div class="card-vaga-acoes-topo">
                    <span class="tempo-publicacao">Há ${vaga.dias} dias</span>
                    <button type="button" class="btn-favoritar" title="Salvar vaga">
                        <svg class="icone-bookmark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </button>
                </div>

                <div class="card-vaga-botoes">
                    <button type="button" class="btn-detalhes">Ver detalhes</button>
                    <button type="button" class="btn-candidatar">Candidatar-se</button>
                </div>
            </div>
        `;

        const btnFavoritar = card.querySelector(".btn-favoritar");
        btnFavoritar.addEventListener("click", () => {
            btnFavoritar.classList.toggle("salvo");
        });

        wrapper.appendChild(card);
    });

    return container;
}