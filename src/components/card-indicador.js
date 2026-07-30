export function criarCardIndicador(dados) {
    const cardIndicador = document.createElement('div');
    cardIndicador.classList.add('card-indicador');

    const tituloIndicador = document.createElement('p');
    tituloIndicador.classList.add('titulo-indicador');
    tituloIndicador.textContent = dados.titulo;

    const conteudoIndicador = document.createElement('div');
    conteudoIndicador.classList.add('conteudo-indicador');

    const imgIndicador = document.createElement('img');
    imgIndicador.classList.add('img-indicador');
    imgIndicador.src = dados.icone;
    imgIndicador.alt = dados.descricaoImagem;

    const infoIndicador = document.createElement('div');
    infoIndicador.classList.add('info-indicador');

    const valorIndicador = document.createElement('p');
    valorIndicador.classList.add('valor-indicador');
    valorIndicador.textContent = dados.valor;

    const variacaoIndicador = document.createElement('p');
    variacaoIndicador.classList.add('variacao-indicador');
    variacaoIndicador.textContent = dados.variacao;

    cardIndicador.appendChild(tituloIndicador);
    cardIndicador.appendChild(conteudoIndicador);

    conteudoIndicador.appendChild(imgIndicador);
    conteudoIndicador.appendChild(infoIndicador);

    infoIndicador.appendChild(valorIndicador);

    if (dados.variacao) {
        infoIndicador.appendChild(variacaoIndicador);
    }

    return cardIndicador;
}