import { renderHome } from '../pages/home.js';
import { renderPlanos } from '../pages/planos.js';
import { renderRecursos } from '../pages/recursos.js';
import { renderSobreNos } from '../pages/sobre-nos.js';
import { renderSuporte } from '../pages/suporte.js';
import { renderCandidatoVagas } from '../pages/candidato-vagas.js';
import { renderLogin } from '../pages/login.js';
import { renderVagasInicio } from '../pages/vagas-inicio.js';
import { renderCadastroConcluido } from '../pages/cadastro-concluido.js';
import { renderRecrutadorCadastrado } from '../pages/recrutador-cadastrado.js';
import { renderPlanoAlterado } from '../pages/plano-alterado.js';
import renderCadastroPage from '../pages/cadastro.js';
import { renderCandidaturaEnviada } from '../pages/candidatura-enviada.js';
import { renderMinhasCandidaturas } from '../pages/minhas-candidaturas.js';
import { criarModalSair } from '../components/modal-sair.js';
import { renderMinhaAssinatura } from '../pages/minha-assinatura.js';
import { renderAlterarPlanos } from '../pages/alterar-planos.js';
import { renderRelatorioRecrutadores } from '../pages/relatorio-recrutadores.js';
import { renderConfiguracaoConta } from '../pages/configuracao-conta.js';

function trocarEstiloPagina(nomePagina) {
    const estiloAnterior = document.getElementById('estilo-Dinamico-pagina');
    if (estiloAnterior) {
        estiloAnterior.remove();
    }

    const estilosMap = {
        "configuracao-conta": './view/css/configuracao-conta.css',
        "relatorio-recrutadores": './view/css/relatorio-recrutadores.css',
        "alterar-planos": './view/css/alterar-planos.css',
        "minha-assinatura": './view/css/minha-assinatura.css',
        "minhas-candidaturas": './view/css/minhas-candidaturas.css',
        'cadastro': './view/css/cadastro.css',
        'recrutador-cadastrado': './view/css/recrutador-cadastrado.css',
        'plano-alterado': './view/css/plano-alterado.css',
        'cadastro-concluido': './view/css/cadastro-concluido.css',
        'login': './view/css/login.css',
        'candidato-vagas': './view/css/candidato-vagas.css',
        'candidatura-enviada': './view/css/candidatura-enviada.css',
        'vagas-inicio': './view/css/vagas-inicio.css',
        'home': './view/css/home.css',
        'sobre-nos': './view/css/sobre-nos.css',
        'recursos': './view/css/recursos.css',
        'planos': './view/css/planos.css',
        'suporte': './view/css/suporte.css'
    };

    const caminhoCss = estilosMap[nomePagina];

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

    criarModalSair({
        onConfirmarSaida: () => {
            window.location.hash = '#home';
        }
    });

    function navegar() {
        const hash = window.location.hash;
        app.innerHTML = '';

        switch (hash) {
            case '#configuracao-conta':
                trocarEstiloPagina('configuracao-conta');
                app.appendChild(renderConfiguracaoConta());
                break;
            case '#relatorio-recrutadores':
                trocarEstiloPagina('relatorio-recrutadores');
                app.appendChild(renderRelatorioRecrutadores());
                break;
            case '#alterar-planos':
                trocarEstiloPagina('alterar-planos');
                app.appendChild(renderAlterarPlanos());
                break;
            case '#minha-assinatura':
                trocarEstiloPagina('minha-assinatura');
                app.appendChild(renderMinhaAssinatura());
                break;
            case '#minhas-candidaturas':
                trocarEstiloPagina('minhas-candidaturas');
                app.appendChild(renderMinhasCandidaturas());
                break;
            case '#cadastro':
                trocarEstiloPagina('cadastro');
                app.appendChild(renderCadastroPage());
                break;
            case '#plano-alterado':
                trocarEstiloPagina('plano-alterado');
                app.appendChild(renderPlanoAlterado());
                break;
            case '#login':
                trocarEstiloPagina('login');
                app.appendChild(renderLogin());
                break;
            case '#cadastro-concluido':
                trocarEstiloPagina('cadastro-concluido');
                app.appendChild(renderCadastroConcluido());
                break;
            case '#recrutador-cadastrado':
                trocarEstiloPagina('recrutador-cadastrado');
                app.appendChild(renderRecrutadorCadastrado());
                break;
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
            case '#candidato-vagas':
                trocarEstiloPagina('candidato-vagas');
                app.appendChild(renderCandidatoVagas());
                break;
            case '#vagas-inicio':
                trocarEstiloPagina('vagas-inicio');
                app.appendChild(renderVagasInicio());
                break;
            case '#candidatura-enviada':
                trocarEstiloPagina('candidatura-enviada');
                app.appendChild(renderCandidaturaEnviada());
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