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
import { renderVagasFavoritasCandidato } from '../pages/vagas-favoritas-candidato.js';
import { renderCurriculoCandidato } from '../pages/curriculo-candidato.js';
import { abrirModalCandidatura } from '../pages/modal-candidatura.js';
import { renderMeusDados } from '../pages/meus-dados-candidato.js';
import { renderMeusDados as renderMeusDadosRecrutador } from '../pages/meus-dados-recrutador.js';
import { renderMeusDadosEmpresa } from '../pages/meus-dados-empresa.js';
import { renderAlterarSenhaEmpresa } from '../pages/alterar-senha-empresa.js';
import { renderAlterarSenhaCandidato } from '../pages/alterar-senha-candidato.js';
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
import { renderCandidaturasRecebidasRecrutador } from '../pages/candidaturas-recebidas-recrutador.js';

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

    const mapaEstilos = {
        'dashboard-empresa': './view/css/dashboard-empresa.css',
        'dashboard-candidato': './view/css/dashboard-candidato.css',
        'dashboard-recrutador': './view/css/dashboard-recrutador.css',
        'dashboard-administrador': './view/css/dashboard-administrador.css',
        'autenticacao2FA': './view/css/autenticacao2FA.css',
        'verificacao': './view/css/autenticacao2FA.css',
        'mfa-config': './view/css/mfaConfig.css',
        'cadastro': './view/css/cadastro.css',
        'login': './view/css/login.css',
        'candidato-vagas': './view/css/candidato-vagas.css',
        'vagas-favoritas-candidato': './view/css/vagas-favoritas-candidato.css',
        'curriculo-candidato': './view/css/curriculo-candidato.css',
        'meus-dados': './view/css/meus-dados.css',
        'meus-dados-recrutador': './view/css/meus-dados.css',
        'dados-empresa': './view/css/meus-dados-empresa.css',
        'alterar-senha-empresa': './view/css/alterar-senha-empresa.css',
        'alterar-senha-candidato': './view/css/alterar-senha-empresa.css',
        'minhas-vagas': './view/css/minhas-vagas.css',
        'minhas-vagas-recrutador': './view/css/banco-talentos.css',
        'gerenciar-recrutadores': './view/css/gerenciar-recrutador.css',
        'cadastrar-recrutador': './view/css/gerenciar-recrutador.css',
        'gerenciar-candidaturas': './view/css/gerenciar-candidaturas.css',
        'vagas-inicio': './view/css/vagas-inicio.css',
        'criar-vaga': './view/css/criar-vaga.css',
        'minha-assinatura': './view/css/minha-assinatura.css',
        'meus-planos-empresa': './view/css/meus-planos-empresa.css',
        'alterar-planos': './view/css/alterar-planos.css',
        'banco-talentos': './view/css/banco-talentos.css',
        'candidatos-favoritados': './view/css/candidatos-favoritados.css',
        'candidaturas-recebidas-empresa': './view/css/banco-talentos.css',
        'candidaturas-recebidas-recrutador': './view/css/candidaturas-recebidas-recrutador.css',
        'sobre-nos': './view/css/sobre-nos.css',
        'recursos': './view/css/recursos.css',
        'planos': './view/css/planos.css',
        'suporte': './view/css/suporte.css',
        'tipo-cadastro': './view/css/tipo-cadastro.css',
        'home': './view/css/home.css'
    };

    const caminhoCss = mapaEstilos[nomePagina];
    if (caminhoCss) {
        const link = document.createElement('link');
        link.id = 'estilo-Dinamico-pagina';
        link.rel = 'stylesheet';
        link.href = caminhoCss;
        document.head.appendChild(link);
    }
}

function extrairDadosVagaDoBotao(btn) {
    const card = btn.closest('.vaga-card, .card-vaga, article, .job-card, tr') || document;
    const titulo =
        btn.dataset.titulo ||
        card.querySelector('.vaga-titulo, .titulo-vaga, h3, h2')?.textContent?.trim() ||
        'Vaga disponível';
    const empresa =
        btn.dataset.empresa ||
        card.querySelector('.vaga-empresa, .empresa-nome, .empresa')?.textContent?.trim() ||
        'Conecta Talent';
    const localidade =
        btn.dataset.localidade ||
        card.querySelector('.vaga-localidade, .localidade')?.textContent?.trim() ||
        '';
    const modelo =
        btn.dataset.modelo ||
        card.querySelector('.vaga-modelo, .modelo-trabalho')?.textContent?.trim() ||
        '';
    const salario =
        btn.dataset.salario ||
        card.querySelector('.vaga-salario, .salario')?.textContent?.trim() ||
        '';

    return {
        id: btn.dataset.vagaId || btn.dataset.id || card.dataset.vagaId || card.dataset.id || titulo,
        titulo,
        empresa,
        localidade,
        modelo,
        salario
    };
}

function obterHashNormalizada() {
    const hash = window.location.hash || '#home';
    return hash.startsWith('#') ? hash : `#${hash}`;
}

export function iniciarRouter() {
    const app = document.getElementById('app');
    if (!app) {
        console.error('Elemento #app não encontrado no DOM.');
        return;
    }

    garantirCssModal();

    document.addEventListener('click', (e) => {
        const btnCandidatar = e.target.closest('.btn-candidatar');
        if (!btnCandidatar) return;

        const hash = obterHashNormalizada();
        if (
            hash === '#vagas-inicio' ||
            hash === '#candidato-vagas' ||
            hash === '#vagas-favoritas' ||
            hash === '#vagas-favoritas-candidato'
        ) {
            e.preventDefault();
            e.stopPropagation();
            const vaga = extrairDadosVagaDoBotao(btnCandidatar);
            abrirModalCandidatura(vaga);
        }
    });

    function navegar() {
        const hash = obterHashNormalizada();
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
            case '#vagas-favoritas':
            case '#vagas-favoritas-candidato':
                trocarEstiloPagina('vagas-favoritas-candidato');
                app.appendChild(renderVagasFavoritasCandidato());
                break;
            case '#curriculo':
            case '#curriculo-candidato':
                trocarEstiloPagina('curriculo-candidato');
                app.appendChild(renderCurriculoCandidato('João Oliveira'));
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
            case '#alterar-senha-candidato':
            case '#seguranca-candidato':
                trocarEstiloPagina('alterar-senha-candidato');
                app.appendChild(renderAlterarSenhaCandidato('João Oliveira'));
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
            case '#candidaturas-recebidas-recrutador':
            case '#recebidas-recrutador':
                trocarEstiloPagina('candidaturas-recebidas-recrutador');
                app.appendChild(renderCandidaturasRecebidasRecrutador('Thaeny Soares'));
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
