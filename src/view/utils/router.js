import { renderHome } from '../pages/home.js';
import { renderPlanos } from '../pages/planos.js';
import { renderRecursos } from '../pages/recursos.js';
import { renderSobreNos } from '../pages/sobre-nos.js';
import { renderSuporte } from '../pages/suporte.js';
import { renderTipoCadastro } from '../pages/tipo-cadastro.js';
import { renderVerificacao } from '../pages/autenticacao2FA.js';
import { renderMFAConfig } from '../pages/mfaConfig.js';
import { renderDashboardCandidato } from '../pages/dashboard-candidato.js';
import { renderDashboardEmpresa } from '../pages/dashboard-empresa.js';
import { renderDashboardRecrutador } from '../pages/dashboard-recrutador.js';
import { renderDashboardAdministrador } from '../pages/dashboard-administrador.js';
import { renderCandidatoVagas } from '../pages/candidato-vagas.js';
import { renderMeusDados } from '../pages/meus-dados.js';
import { renderMinhasVagas } from '../pages/gerenciar-vagas.js';
import { renderGerenciarRecrutadores } from '../pages/gerenciar-recrutadores.js';
import { renderGerenciarCandidaturas } from '../pages/gerenciar-candidaturas.js';
import { renderVagasInicio } from '../pages/vagas-inicio.js';
import { abrirModalCandidatar } from '../pages/modal-candidatar-se.js';
import { renderGerenciarUsuarios } from '../pages/gerenciar-usuarios.js';
import { criarSidebar } from '../components/sidebar.js'; 

function garantirCssModal() {
    if (!document.getElementById('estilo-modal-global')) {
        const linkModal = document.createElement('link');
        linkModal.id = 'estilo-modal-global';
        linkModal.rel = 'stylesheet';
        linkModal.href = './view/css/modal.css';
        document.head.appendChild(linkModal);
    }
}

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
    } else if (nomePagina === 'meus-dados') {
        caminhoCss = './view/css/meus-dados.css';
    } else if (nomePagina === 'minhas-vagas') {
        caminhoCss = './view/css/minhas-vagas.css';
    } else if (nomePagina === 'gerenciar-recrutadores') {
        caminhoCss = './view/css/gerenciar-recrutador.css';
    } else if (nomePagina === 'gerenciar-candidaturas') {
        caminhoCss = './view/css/gerenciar-candidaturas.css';
    } else if (nomePagina === 'vagas-inicio') {
        caminhoCss = './view/css/vagas-inicio.css';
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
    garantirCssModal();

    document.addEventListener('click', (e) => {
        const btnCandidatar = e.target.closest('.btn-candidatar');
    
        if (btnCandidatar && window.location.hash === '#vagas-inicio') {
            e.preventDefault();
            e.stopPropagation();
            abrirModalCandidatar();
        }
    });

    function navegar() {
        const hash = window.location.hash;
        app.innerHTML = '';

        switch (hash) {
            case '#sobre-nos':
            case '#sobre':
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
            case '#login':
                // Caso já tenha a função renderLogin(), importe-a no topo e descomente abaixo:
                trocarEstiloPagina('login');
                // app.appendChild(renderLogin());
                break;
            case '#candidato-vagas':
                trocarEstiloPagina('candidato-vagas');
                app.appendChild(renderCandidatoVagas());
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
           case '#dashboard-administrador': {
          trocarEstiloPagina('dashboard');
            const layout = document.createElement('div');
           layout.className = 'pagina-layout-dashboard';
           layout.append(criarSidebar('administrador', 'Pedro Vitara'));

           const main = document.createElement('main');
           main.className = 'conteudo-principal';
           main.append(renderDashboardAdministrador());

           layout.append(main);
           app.append(layout);
           break;
}
            case '#verificacao':
            case '#2fa':
                trocarEstiloPagina('verificacao');
                app.appendChild(renderVerificacao());
                break;
            case '#mfa-config':
            case '#mfa':
                trocarEstiloPagina('mfa-config');
                app.appendChild(renderMFAConfig());
                break;
            case '#meus-dados':
            case '#meus-dados-candidato':
                trocarEstiloPagina('meus-dados');
                app.appendChild(renderMeusDados());
                break;
            case '#gerenciar-vagas':
                trocarEstiloPagina('gerenciar-vagas');
                app.appendChild(renderMinhasVagas());
                break;
            case '#gerenciar-recrutadores':
                trocarEstiloPagina('gerenciar-recrutadores');
                app.appendChild(renderGerenciarRecrutadores());
                break;
            case '#gerenciar-candidaturas':
                trocarEstiloPagina('gerenciar-candidaturas');
                app.appendChild(renderGerenciarCandidaturas());
                break;
            case '#vagas-inicio':
                trocarEstiloPagina('vagas-inicio');
                app.appendChild(renderVagasInicio());
                break;
               case '#/usuarios':
            case '#usuarios': {
               trocarEstiloPagina('dashboard');
               const layout = document.createElement('div');
               layout.className = 'pagina-layout-dashboard';
               layout.append(criarSidebar('administrador', 'Pedro Vitara'));

               const main = document.createElement('main');
               main.className = 'conteudo-principal';
               main.append(renderGerenciarUsuarios());

              layout.append(main);
              app.append(layout);
    break;
            }
            case '#home':
            case '':
            default:
            case '#home':
                trocarEstiloPagina('home');
                app.appendChild(renderHome());
                break;
        }

        window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', navegar);
    window.addEventListener('load', navegar);
}