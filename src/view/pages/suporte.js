import { criarHeader } from '../components/header.js';
import { criarFooter } from '../components/footer.js';

export function renderSuporte() {

    const container = document.createElement('div');
    container.classList.add('page-suporte');

    const main = document.createElement('main');
    main.classList.add('main');

    // --- SECÇÃO CABEÇALHO / HERO ---
    const heroSuporte = document.createElement('section');
    heroSuporte.classList.add('hero-suporte');

    const cabecalhoHero = document.createElement('div');
    cabecalhoHero.classList.add('cabecalho-secao-centro');

    const tagHero = document.createElement('span');
    tagHero.classList.add('tag-secao');
    tagHero.textContent = 'CENTRAL DE AJUDA';

    const tituloHero = document.createElement('h1');
    tituloHero.classList.add('titulo-secao');
    tituloHero.textContent = 'Como podemos ajudar você hoje?';

    const subtituloHero = document.createElement('p');
    subtituloHero.classList.add('subtitulo-secao');
    subtituloHero.textContent = 'Preencha o formulário abaixo para entrar em contato com a nossa equipe de suporte.';

    cabecalhoHero.appendChild(tagHero);
    cabecalhoHero.appendChild(tituloHero);
    cabecalhoHero.appendChild(subtituloHero);
    heroSuporte.appendChild(cabecalhoHero);

    // --- SECÇÃO FORMULÁRIO DE SUPORTE ---
    const secaoFormulario = document.createElement('section');
    secaoFormulario.classList.add('como-funciona-secao');

    const form = document.createElement('form');
    form.classList.add('form-suporte');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso!');
        form.reset();
    });

    const inputNome = document.createElement('input');
    inputNome.type = 'text';
    inputNome.placeholder = 'Seu Nome Completo';
    inputNome.required = true;

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = 'Seu Email';
    inputEmail.required = true;

    const selectAssunto = document.createElement('select');
    selectAssunto.required = true;

    const opcoes = [
        { value: '', text: 'Selecione o Assunto' },
        { value: 'duvida', text: 'Dúvidas' },
        { value: 'tecnico', text: 'Problema Técnico' },
        { value: 'empresa', text: 'Suporte para Empresas' },
        { value: 'outro', text: 'Outro Assunto' }
    ];

    opcoes.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        selectAssunto.appendChild(option);
    });

    const textareaMensagem = document.createElement('textarea');
    textareaMensagem.placeholder = 'Descreva o seu problema ou dúvida...';
    textareaMensagem.rows = 5;
    textareaMensagem.required = true;

    const btnEnviar = document.createElement('button');
    btnEnviar.type = 'submit';
    btnEnviar.classList.add('btn-buscar-vagas');
    btnEnviar.textContent = 'Enviar Mensagem';

    form.appendChild(inputNome);
    form.appendChild(inputEmail);
    form.appendChild(selectAssunto);
    form.appendChild(textareaMensagem);
    form.appendChild(btnEnviar);

    secaoFormulario.appendChild(form);

    // --- MONTAGEM DA ESTRUTURA ---
    main.appendChild(heroSuporte);
    main.appendChild(secaoFormulario);

    container.appendChild(criarHeader());
    container.appendChild(main);
    container.appendChild(criarFooter());

    return container;
}