export function criarCard({ label, valor, subtituloDestaque = '', subtituloTexto = '' }) {
    const card = document.createElement('div');
    card.classList.add('card-estatistica');

    const info = document.createElement('div');
    info.classList.add('card-info');

    const spanLabel = document.createElement('span');
    spanLabel.classList.add('card-label');
    spanLabel.textContent = label;

    const spanValor = document.createElement('span');
    spanValor.classList.add('card-valor');
    spanValor.textContent = valor;

    info.appendChild(spanLabel);
    info.appendChild(spanValor);

    if (subtituloTexto || subtituloDestaque) {
        const divRodape = document.createElement('div');
        divRodape.classList.add('card-rodape-sub');

        if (subtituloDestaque) {
            const spanDestaque = document.createElement('span');
            spanDestaque.classList.add('card-sub-destaque');
            spanDestaque.textContent = subtituloDestaque;
            divRodape.appendChild(spanDestaque);
        }

        if (subtituloTexto) {
            const spanTexto = document.createElement('span');
            spanTexto.classList.add('card-sub-texto');
            spanTexto.textContent = ` ${subtituloTexto}`;
            divRodape.appendChild(spanTexto);
        }

        info.appendChild(divRodape);
    }

    card.appendChild(info);

    return card;
}