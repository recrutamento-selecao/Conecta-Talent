export function criarCardVaga(dados) {
    const cardVaga = document.createElement('div');
    cardVaga.classList.add('card-vaga');

    const tituloVaga = document.createElement('h3');
    tituloVaga.classList.add('titulo-vaga');
    tituloVaga.textContent = dados.titulo;

    const empresaVaga = document.createElement('p');
    empresaVaga.classList.add('empresa-vaga');
    empresaVaga.textContent = dados.empresa;

    const infoVaga = document.createElement('div');
    infoVaga.classList.add('info-vaga');

    const itemLocalizacao = document.createElement('div');
    itemLocalizacao.classList.add('item-info');

    const iconeLocalizacao = document.createElement('img');
    iconeLocalizacao.classList.add('icone-info');
    iconeLocalizacao.src = '../assets/icons/map-pin.svg';
    iconeLocalizacao.alt = 'Ícone de localização';

    const textoLocalizacao = document.createElement('span');
    textoLocalizacao.classList.add('texto-info');
    textoLocalizacao.textContent = dados.localizacao;

    const itemModalidade = document.createElement('div');
    itemModalidade.classList.add('item-info');

    const iconeModalidade = document.createElement('img');
    iconeModalidade.classList.add('icone-info');
    iconeModalidade.src = '../assets/icons/building.svg';
    iconeModalidade.alt = 'Ícone de modalidade';

    const textoModalidade = document.createElement('span');
    textoModalidade.classList.add('texto-info');
    textoModalidade.textContent = dados.modalidade;

    const itemRegime = document.createElement('div');
    itemRegime.classList.add('item-info');

    const iconeRegime = document.createElement('img');
    iconeRegime.classList.add('icone-info');
    iconeRegime.src = '../assets/icons/briefcase.svg';
    iconeRegime.alt = 'Ícone de regime';

    const textoRegime = document.createElement('span');
    textoRegime.classList.add('texto-info');
    textoRegime.textContent = dados.regime;

    const publicacaoVaga = document.createElement('div');
    publicacaoVaga.classList.add('publicacao-vaga');

    const iconePublicacao = document.createElement('img');
    iconePublicacao.classList.add('icone-info');
    iconePublicacao.src = '../assets/icons/calendar.svg';
    iconePublicacao.alt = 'Ícone de calendário';

    const dataPublicacao = document.createElement('span');
    dataPublicacao.classList.add('data-publicacao');
    dataPublicacao.textContent = dados.dataPublicacao;

    const btnVerDetalhes = document.createElement('button');
    btnVerDetalhes.classList.add('btn-ver-detalhes');
    btnVerDetalhes.textContent = 'Ver detalhes';

    itemLocalizacao.appendChild(iconeLocalizacao);
    itemLocalizacao.appendChild(textoLocalizacao);

    itemModalidade.appendChild(iconeModalidade);
    itemModalidade.appendChild(textoModalidade);

    itemRegime.appendChild(iconeRegime);
    itemRegime.appendChild(textoRegime);

    infoVaga.appendChild(itemLocalizacao);
    infoVaga.appendChild(itemModalidade);
    infoVaga.appendChild(itemRegime);

    publicacaoVaga.appendChild(iconePublicacao);
    publicacaoVaga.appendChild(dataPublicacao);
    
    cardVaga.appendChild(tituloVaga);
    cardVaga.appendChild(empresaVaga);
    cardVaga.appendChild(infoVaga);
    cardVaga.appendChild(publicacaoVaga);
    cardVaga.appendChild(btnVerDetalhes);

    return cardVaga;
}