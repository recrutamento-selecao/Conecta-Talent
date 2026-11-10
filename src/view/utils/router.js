import { renderHome } from '../pages/home.js';
import { renderPlanos } from '../pages/planos.js';
import { renderRecursos } from '../pages/recursos.js';
import { renderSobreNos } from '../pages/sobre-nos.js';
import { renderSuporte } from '../pages/suporte.js';
import { renderTipoCadastro } from '../pages/tipo-cadastro.js';
import { renderDashboardCandidato } from '../pages/dashboard-candidato.js';
import { renderDashboardEmpresa } from '../pages/dashboard-empresa.js';
import { renderDashboardRecrutador } from '../pages/dashboard-recrutador.js';
import { renderDashboardAdministrador } from '../pages/dashboard-administrador.js'; 
import { renderVerificacao } from '../pages/autenticacao2FA.js';

// Função auxiliar para carregar o CSS específico de cada página e remover os anteriores
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
    } else if (nomePagina === 'autenticacao2FA') {
        caminhoCss = './view/css/autenticacao2FA.css';
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
            case '#tipo-cadastro':
                trocarEstiloPagina('tipo-cadastro');
                app.appendChild(renderTipoCadastro());
                break;
            case '#dashboard-candidato':
                trocarEstiloPagina('dashboard-candidato');
                app.appendChild(renderDashboardCandidato());
                break;
            case '#dashboard-empresa':
                trocarEstiloPagina('dashboard-empresa');
                app.appendChild(renderDashboardEmpresa());
                break;
            case '#dashboard-recrutador':
                trocarEstiloPagina('dashboard-recrutador');
                app.appendChild(renderDashboardRecrutador());
                break;
            case '#dashboard-administrador': 
                trocarEstiloPagina('dashboard-administrador');
                app.appendChild(renderDashboardAdministrador());
                break;
            case '#verificacao':
            case '#2fa':
                trocarEstiloPagina('verificacao');
                app.appendChild(renderVerificacao());
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