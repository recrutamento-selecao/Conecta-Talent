const SVG_RENDER = 'http://www.w3.org/2000/svg'
// cria elemento SVG a partir dos dados disponibilizados pelo Iconify.

const renderIcons = (data, icon) =>{
    const svg = document.createElementNS(
        SVG_RENDER, 
        'svg'
    );

    const width = icon.width || 16;
    const height = icon.height || 16;

    svg.setAttribute(
        'viewBox',
        `0 0 ${width} ${height}`
    );

    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = icon.body
    data.replaceChildren(svg);
    
}

// cria campo de senha com botão de visibilidade
    const criarInputSenha = (input, icons) =>{
    const divSenha = document.createElement('div');
    divSenha.className = 'divSenha';

    //botão para mostrar ou ocultar a senha
    const btnVisilidade = document.createElement('button');
    btnVisilidade.type = 'button';
    btnVisilidade.className = 'btnVisibilidade';
    btnVisilidade.setAttribute('aria-label', 'senha visível');
    btnVisilidade.setAttribute('aria-pressed', 'false');

    renderIcons(btnVisilidade, icons.invisibleIcon);

    //evento clique

    btnVisilidade.addEventListener('click', () => {
        const inputEstaVisivel = input.type === 'text';

        input.type = inputEstaVisivel ? 'password' : 'text';

        btnVisilidade.setAttribute(
            'aria-label',
            inputEstaVisivel ? 'senha visível' : 'senha oculta'
        );

        btnVisilidade.setAttribute('aria-pressed', String(!inputEstaVisivel));

        renderIcons(
            btnVisilidade,
            inputEstaVisivel ? icons.invisibleIcon : icons.visibleIcon
        );
    });

    divSenha.append(input, btnVisilidade);

    return divSenha;
}


export default criarInputSenha;