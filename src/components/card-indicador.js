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

    const valorIndicador = document.createElement('p');
    valorIndicador.classList.add('valor-indicador');
    valorIndicador.textContent = dados.valor;

    cardIndicador.appendChild(tituloIndicador);
    cardIndicador.appendChild(conteudoIndicador);
    conteudoIndicador.appendChild(imgIndicador);
    conteudoIndicador.appendChild(valorIndicador);

    return cardIndicador;
}