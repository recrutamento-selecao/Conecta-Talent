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
import { renderMeusDados as renderMeusDadosRecrutador } from '../pages/meus-dados-recrutador.js';
import { renderMeusDadosEmpresa } from '../pages/meus-dados-empresa.js';
import { renderAlterarSenhaEmpresa } from '../pages/alterar-senha-empresa.js';
import { renderMinhasVagas } from '../pages/gerenciar-vagas.js';
import { renderMinhasVagasRecrutador } from '../pages/minhas-vagas-recrutador.js';
import { renderGerenciarRecrutadores } from '../pages/gerenciar-recrutadores.js';
import { renderGerenciarCandidaturas } from '../pages/gerenciar-candidaturas.js';
import { renderVagasInicio } from '../pages/vagas-inicio.js';
import { renderCadastrarRecrutador } from '../pages/cadastrar-recrutador.js';
import { renderCriarVaga } from '../pages/criar-vagas.js';
import { renderMinhaAssinatura } from '../pages/minhas-assinaturas.js';
import { renderAlterarPlanos } from '../pages/alterar-planos.js';
import { renderMeusPlanosEmpresa } from '../pages/meus-planos-empresa.js';
import { renderBancoTalentos } from '../pages/banco-talentos.js';
import { renderCandidatosFavoritados } from '../pages/candidatos-favoritados.js';
import { renderCandidaturasRecebidasEmpresa } from '../pages/candidaturas-recebidas-empresa.js';

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
    } else if (nomePagina === 'meus-dados' || nomePagina === 'meus-dados-recrutador') {
        caminhoCss = './view/css/meus-dados.css';
    } else if (nomePagina === 'dados-empresa') {
        caminhoCss = './view/css/meus-dados-empresa.css';
    } else if (nomePagina === 'alterar-senha-empresa') {
        caminhoCss = './view/css/alterar-senha-empresa.css';
    } else if (nomePagina === 'minhas-vagas') {
        caminhoCss = './view/css/minhas-vagas.css';
    } else if (nomePagina === 'minhas-vagas-recrutador') {
        caminhoCss = './view/css/banco-talentos.css';
    } else if (nomePagina === 'gerenciar-recrutadores' || nomePagina === 'cadastrar-recrutador') {
        caminhoCss = './view/css/gerenciar-recrutador.css';
    } else if (nomePagina === 'gerenciar-candidaturas') {
        caminhoCss = './view/css/gerenciar-candidaturas.css';
    } else if (nomePagina === 'vagas-inicio') {
        caminhoCss = './view/css/vagas-inicio.css';
    } else if (nomePagina === 'criar-vaga') {
        caminhoCss = './view/css/criar-vaga.css';
    } else if (nomePagina === 'minha-assinatura') {
        caminhoCss = './view/css/minha-assinatura.css';
    } else if (nomePagina === 'meus-planos-empresa') {
        caminhoCss = './view/css/meus-planos-empresa.css';
    } else if (nomePagina === 'alterar-planos') {
        caminhoCss = './view/css/alterar-planos.css';
    } else if (nomePagina === 'banco-talentos') {
        caminhoCss = './view/css/banco-talentos.css';
    } else if (nomePagina === 'candidatos-favoritados') {
        caminhoCss = './view/css/candidatos-favoritados.css';
    } else if (nomePagina === 'candidaturas-recebidas-empresa') {
        caminhoCss = './view/css/banco-talentos.css';
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
                trocarEstiloPagina('login');
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
            case '#dashboard-administrador':
                trocarEstiloPagina('dashboard-administrador');
                app.appendChild(renderDashboardAdministrador());
                break;
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
            case '#meus-dados-recrutador':
                trocarEstiloPagina('meus-dados-recrutador');
                app.appendChild(renderMeusDadosRecrutador('Thaeny Soares'));
                break;
            case '#dados-empresa':
            case '#meus-dados-empresa':
                trocarEstiloPagina('dados-empresa');
                app.appendChild(renderMeusDadosEmpresa('Empresa'));
                break;
            case '#alterar-senha-empresa':
            case '#seguranca-empresa':
                trocarEstiloPagina('alterar-senha-empresa');
                app.appendChild(renderAlterarSenhaEmpresa('Twelse LTDA'));
                break;
            case '#gerenciar-vagas':
                trocarEstiloPagina('gerenciar-vagas');
                app.appendChild(renderMinhasVagas());
                break;
            case '#minhas-vagas-recrutador':
                trocarEstiloPagina('minhas-vagas-recrutador');
                app.appendChild(renderMinhasVagasRecrutador('Thaeny Soares'));
                break;
            case '#gerenciar-recrutadores':
                trocarEstiloPagina('gerenciar-recrutadores');
                app.appendChild(renderGerenciarRecrutadores());
                break;
            case '#cadastrar-recrutador':
                trocarEstiloPagina('cadastrar-recrutador');
                app.appendChild(renderCadastrarRecrutador());
                break;
            case '#gerenciar-candidaturas':
                trocarEstiloPagina('gerenciar-candidaturas');
                app.appendChild(renderGerenciarCandidaturas());
                break;
            case '#vagas-inicio':
                trocarEstiloPagina('vagas-inicio');
                app.appendChild(renderVagasInicio());
                break;
            case '#criar-vaga':
                trocarEstiloPagina('criar-vaga');
                app.appendChild(renderCriarVaga());
                break;
            case '#meu-plano':
                trocarEstiloPagina('minha-assinatura');
                app.appendChild(renderMinhaAssinatura('empresa'));
                break;
            case '#candidaturas-recebidas-empresa':
            case '#candidaturas-recebidas':
                trocarEstiloPagina('candidaturas-recebidas-empresa');
                app.appendChild(renderCandidaturasRecebidasEmpresa('Thaeny Soares'));
                break;
            case '#meus-planos-empresa':
                trocarEstiloPagina('meus-planos-empresa');
                app.appendChild(renderMeusPlanosEmpresa());
                break;
            case '#alterar-planos':
                trocarEstiloPagina('alterar-planos');
                app.appendChild(renderAlterarPlanos('empresa'));
                break;
            case '#buscar-candidatos':
            case '#banco-talentos':
                trocarEstiloPagina('banco-talentos');
                app.appendChild(renderBancoTalentos());
                break;
            case '#candidatos-favoritos':
                trocarEstiloPagina('candidatos-favoritados');
                app.appendChild(renderCandidatosFavoritados());
                break;
            case '#home':
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