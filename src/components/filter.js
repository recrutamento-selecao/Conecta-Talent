export function criarFiltros() {

    const container = document.createElement("div");
    container.classList.add("filtros");

   
    const selectLocalizacao = document.createElement("select");
    selectLocalizacao.classList.add("select-filtro");

    selectLocalizacao.innerHTML = `
        <option selected>Localização</option>
        <option>Sorocaba</option>
        <option>São Paulo</option>
        <option>Campinas</option>
        <option>Remoto</option>
    `;

    
    const selectModalidade = document.createElement("select");
    selectModalidade.classList.add("select-filtro");

    selectModalidade.innerHTML = `
        <option selected>Modalidade</option>
        <option>Presencial</option>
        <option>Híbrido</option>
        <option>Remoto</option>
    `;


    const selectRegime = document.createElement("select");
    selectRegime.classList.add("select-filtro");

    selectRegime.innerHTML = `
        <option selected>Regime</option>
        <option>CLT</option>
        <option>PJ</option>
        <option>Estágio</option>
        <option>Temporário</option>
    `;

  
    const selectArea = document.createElement("select");
    selectArea.classList.add("select-filtro");

    selectArea.innerHTML = `
        <option selected>Área</option>
        <option>Tecnologia</option>
        <option>Marketing</option>
        <option>Financeiro</option>
        <option>Recursos Humanos</option>
    `;

    const btnLimpar = document.createElement("button");
    btnLimpar.classList.add("btn-limpar");
    btnLimpar.textContent = "Limpar filtros";

   r
    container.append(
        selectLocalizacao,
        selectModalidade,
        selectRegime,
        selectArea,
        btnLimpar
    );

    return container;
}
