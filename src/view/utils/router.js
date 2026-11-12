import renderCadastroPage from '../pages/cadastro.js';
import renderLoginPage from '../pages/login.js';
import { renderHome } from '../pages/home.js';

function trocarEstiloPagina(nomePagina) {
    const estiloAnterior = document.getElementById('estilo-Dinamico-pagina');
    if (estiloAnterior) {
        estiloAnterior.remove();
    }

    let caminhoCss = null;
    if (nomePagina === 'login') {
        caminhoCss = './css/login.css';
    } else if (nomePagina === 'cadastro') {
        caminhoCss = '../css/cadastro.css';
    }

    if (caminhoCss) {
        const link = document.createElement('link');
        link.id = 'estilo-Dinamico-pagina';
        link.rel = 'stylesheet';
        link.href = caminhoCss;
        document.head.appendChild(link);
    }
}

function navegar() {
    const app = document.getElementById('app');
    if (!app) return;

    const hash = window.location.hash || '#home';
    app.innerHTML = '';

    let conteudo = null;

    switch (hash) {
        case '#login':
            trocarEstiloPagina('login');
            conteudo = renderLoginPage();
            break;

        case '#tipo-cadastro':
        case '#cadastro':
            trocarEstiloPagina('cadastro');
            conteudo = renderCadastroPage();
            break;

        case '#home':
        default:
            trocarEstiloPagina('home');
            conteudo = renderHome();
            break;
    }

    if (conteudo) {
        // Se a página retornou o próprio app por engano, criamos um container novo para salvar a pátria
        if (conteudo === app) {
            const wrapperSeguro = document.createElement('div');
            wrapperSeguro.innerHTML = `<p style="color: red; padding: 20px;">Erro: A função da página retornou o elemento #app diretamente.</p>`;
            app.appendChild(wrapperSeguro);
            return;
        }

        if (conteudo instanceof Node) {
            app.appendChild(conteudo);
        } else if (typeof conteudo === 'string') {
            app.innerHTML = conteudo;
        }
    }
}

export function iniciarRouter() {
    if (!window.__routerInitialized) {
        window.__routerInitialized = true;
        window.addEventListener('hashchange', navegar);
        window.addEventListener('load', navegar);
    }

    navegar();
}