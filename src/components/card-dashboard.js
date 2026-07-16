criarCardDashboard(dados){
    const containerCard = document.createElement('div');
    containerCard.classList.add('container-card');
    const cabecalhoCard = document.createElement('div');
    cabecalhoCard.classList.add('cabecalho-card');
    const tituloCard = document.createElement('h3');
    tituloCard.classList.add('titulo-card');
    const imgCard = document.createElement('img');
    imgCard.classList.add('img-card');
    const valorCard = document.createElement('p');
    valorCard.classList.add('valor-card');
    const descricaoCard = document.createElement('p');
    descricaoCard.classList.add('descricao-card');

    containerCard.appendChild(cabecalhoCard);
    containerCard.appendChild(valorCard);
    containerCard.appendChild(descricaoCard);
    cabecalhoCard.appendChild(tituloCard);
    cabecalhoCard.appendChild(imgCard);
    
}