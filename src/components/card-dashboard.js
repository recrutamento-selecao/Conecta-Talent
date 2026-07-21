export function criarCardDashboard(dados){
    const containerCard = document.createElement('div');
    containerCard.classList.add('container-card');
    const cabecalhoCard = document.createElement('div');
    cabecalhoCard.classList.add('cabecalho-card');
    const tituloCard = document.createElement('h3');
    tituloCard.classList.add('titulo-card');
    tituloCard.textContent = dados.titulo;
    const imgCard = document.createElement('img');
    imgCard.classList.add('img-card');
    imgCard.src = dados.icone;
    imgCard.alt = dados.descricaoImagem;
    const valorCard = document.createElement('p');
    valorCard.classList.add('valor-card');
    valorCard.textContent = dados.valor;
    const descricaoCard = document.createElement('p');
    descricaoCard.classList.add('descricao-card');
    descricaoCard.textContent = dados.descricao;

    containerCard.appendChild(cabecalhoCard);
    containerCard.appendChild(valorCard);
    containerCard.appendChild(descricaoCard);
    cabecalhoCard.appendChild(tituloCard);
    cabecalhoCard.appendChild(imgCard);

    return containerCard;
    
}