import { renderHome } from '../pages/home.js';
import { renderSobreNos } from '../pages/sobre-nos.js';
import { renderRecursos } from '../pages/recursos.js';
import { renderPlanos } from '../pages/planos.js';
import { renderSuporte } from '../pages/suporte.js';
import renderLoginPage from '../pages/login.js';
import renderCadastroPage from '../pages/cadastro.js';
import renderCadastroEmpresaPage from '../pages/cadastro-empresa.js';

function trocarEstiloPagina(nomePagina) {
    const estiloAnterior = document.getElementById('estilo-Dinamico-pagina');
    if (estiloAnterior) {
        estiloAnterior.remove();
    }

    let caminhoCss = null;
    if (nomePagina === 'dashboard-empresa') {
        caminhoCss = './view/css/dashboard-empresa.css';
    } else if (nomePagina === 'dashboard-candidato') {
        caminhoCss = './view/css/dashboard-candidato.css';
    } else if (nomePagina === 'dashboard-recrutador') {
        caminhoCss = './view/css/dashboard-recrutador.css';
    } else if (nomePagina === 'dashboard-administrador') {
        caminhoCss = './view/css/dashboard-administrador.css';
    } else if (nomePagina === 'autenticacao2FA' || nomePagina === 'verificacao') {
        caminhoCss = './view/css/autenticacao2FA.css';
    } else if (nomePagina === 'mfa-config') {
        caminhoCss = './view/css/mfaConfig.css';
    } else if (nomePagina === 'cadastro') {
        caminhoCss = './view/css/cadastro.css';
    } else if (nomePagina === 'login') {
        caminhoCss = './view/css/login.css';
    } else if (nomePagina === 'candidato-vagas') {
        caminhoCss = './view/css/candidato-vagas.css';
    }

    if (caminhoCss) {
        const link = document.createElement('link');
        link.id = 'estilo-Dinamico-pagina';
        link.rel = 'stylesheet';
        link.href = caminhoCss;
        document.head.appendChild(link);
    }
}

export function iniciarRouter() {
    const app = document.getElementById('app');

    function navegar() {
        const hash = window.location.hash;
        app.innerHTML = '';

        switch (hash) {
            case '#sobre-nos':
                trocarEstiloPagina('sobre-nos');
                app.appendChild(renderSobreNos());
                break;
            case '#recursos':
                trocarEstiloPagina('recursos');
                app.appendChild(renderRecursos());
                break;
            case '#planos':
                trocarEstiloPagina('planos');
                app.appendChild(renderPlanos());
                break;
            case '#suporte':
                trocarEstiloPagina('suporte');
                app.appendChild(renderSuporte());
                break;
            case '#login':
                trocarEstiloPagina('login');
                app.appendChild(renderLoginPage());
                break;
            case '#cadastro-empresa':
                trocarEstiloPagina('cadastro');
                app.appendChild(renderCadastroEmpresaPage());
                break;
            case '#tipo-cadastro':
            case '#cadastro':
            case '#cadastro-candidato':
                trocarEstiloPagina('cadastro');
                if (localStorage.getItem('perfilSelecionado') === 'empresa') {
                    app.appendChild(renderCadastroEmpresaPage());
                } else {
                    app.appendChild(renderCadastroPage(() => {
                        window.location.hash = '#login';
                    }));
                }
                break;
            case '#home':
            case '':
            default:
                trocarEstiloPagina('home');
                app.appendChild(renderHome());
                break;
        }

        window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', navegar);
    window.addEventListener('load', navegar);
}