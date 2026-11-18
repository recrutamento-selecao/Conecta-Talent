// Helpers de formulário da SPA. Cada campo lê e grava direto no objeto `dados`
// que recebe, então o estado do cadastro nunca depende do DOM.

let contador = 0;

function novoId() {
    contador += 1;
    return `campo-${contador}`;
}

export function criarCampo({ chave, rotulo, tipo = 'text', opcoes = [], placeholder = '', dados, aoMudar }) {
    const id = novoId();

    const campo = document.createElement('div');
    campo.className = 'form-campo';

    let controle;
    if (tipo === 'textarea') {
        controle = document.createElement('textarea');
        controle.rows = 4;
    } else if (tipo === 'select') {
        controle = document.createElement('select');
        controle.append(new Option('Selecione', ''), ...opcoes.map(opcao => new Option(opcao, opcao)));
    } else {
        controle = document.createElement('input');
        controle.type = tipo;
    }

    controle.id = id;
    controle.name = chave;
    if (placeholder) controle.placeholder = placeholder;

    if (tipo === 'checkbox') {
        controle.checked = Boolean(dados[chave]);
    } else {
        controle.value = dados[chave] ?? '';
    }

    const evento = tipo === 'select' || tipo === 'checkbox' ? 'change' : 'input';
    controle.addEventListener(evento, () => {
        dados[chave] = tipo === 'checkbox' ? controle.checked : controle.value;
        if (aoMudar) aoMudar(dados[chave]);
    });

    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = rotulo;

    if (tipo === 'checkbox') {
        campo.classList.add('form-campo--check');
        campo.append(controle, label);
    } else {
        campo.append(label, controle);
    }

    return campo;
}

export function criarGrade(campos, dados) {
    const grade = document.createElement('div');
    grade.className = 'form-grade';
    campos.forEach(config => grade.appendChild(criarCampo({ ...config, dados })));
    return grade;
}

export function criarListaRepetivel({ rotuloItem, rotuloAdicionar, campos, itens }) {
    const secao = document.createElement('div');
    secao.className = 'form-lista';

    const lista = document.createElement('div');
    lista.className = 'form-lista-itens';

    const adicionar = document.createElement('button');
    adicionar.type = 'button';
    adicionar.className = 'btn-form btn-form--secundario';
    adicionar.textContent = rotuloAdicionar;

    function itemVazio() {
        return Object.fromEntries(campos.map(campo => [campo.chave, '']));
    }

    function desenhar() {
        lista.replaceChildren();

        if (itens.length === 0) {
            const vazio = document.createElement('p');
            vazio.className = 'form-lista-vazia';
            vazio.textContent = 'Nenhum item adicionado.';
            lista.appendChild(vazio);
            return;
        }

        itens.forEach((item, indice) => {
            const cartao = document.createElement('div');
            cartao.className = 'form-lista-item';

            const cabecalho = document.createElement('div');
            cabecalho.className = 'form-lista-cabecalho';

            const titulo = document.createElement('strong');
            titulo.textContent = `${rotuloItem} ${indice + 1}`;

            const remover = document.createElement('button');
            remover.type = 'button';
            remover.className = 'btn-form btn-form--perigo';
            remover.textContent = 'Remover';
            remover.addEventListener('click', () => {
                itens.splice(indice, 1);
                desenhar();
            });

            cabecalho.append(titulo, remover);
            cartao.append(cabecalho, criarGrade(campos, item));
            lista.appendChild(cartao);
        });
    }

    adicionar.addEventListener('click', () => {
        itens.push(itemVazio());
        desenhar();
    });

    desenhar();
    secao.append(lista, adicionar);
    return secao;
}