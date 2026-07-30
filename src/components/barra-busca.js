export function criarBarraBusca() {
    const barraBusca = document.createElement('div');
    barraBusca.classList.add('barra-busca');

    const campoBusca = document.createElement('div');
    campoBusca.classList.add('campo-busca');

    const inputBusca = document.createElement('input');
    inputBusca.type = 'search';
    inputBusca.placeholder = 'Busque por uma vaga';
    inputBusca.classList.add('input-busca');

    const botaoBuscar = document.createElement('button');
    botaoBuscar.classList.add('btn-buscar');
    botaoBuscar.textContent = 'Buscar';

    campoBusca.appendChild(inputBusca);
    campoBusca.appendChild(botaoBuscar);

    barraBusca.appendChild(campoBusca);

    return barraBusca;


}