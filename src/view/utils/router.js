import { renderHome } from '../pages/home.js';
import { renderPlanos } from '../pages/planos.js';
import { renderRecursos } from '../pages/recursos.js';
import { renderSobreNos } from '../pages/sobre-nos.js';
import { renderSuporte } from '../pages/suporte.js';
import { renderTipoCadastro } from '../pages/tipo-cadastro.js';  
// Certifique-se de importar o renderLogin se for usar a rota de login:
// import { renderLogin } from '../pages/login.js';  

function trocarEstiloPagina(nomePagina) {
    const estiloAnterior = document.getElementById('estilo-Dinamico-pagina');
    if (estiloAnterior) {
        estiloAnterior.remove();
    }
 
    const estilosMap = {
        'candidato-vagas': './view/css/candidato-vagas.css',
        'home': './view/css/home.css',
        'sobre-nos': './view/css/sobre-nos.css',
        'recursos': './view/css/recursos.css',
        'planos': './view/css/planos.css',
        'suporte': './view/css/suporte.css',
        'tipo-cadastro': './view/css/tipo-cadastro.css', // Adicionado o CSS correspondente
        'login': './view/css/login.css'                 // Adicionado caso precise
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
 
    function navegar() {
        const hash = window.location.hash;
        app.innerHTML = '';
 
        switch (hash) {
            case '#login':
                trocarEstiloPagina('login');
                // app.appendChild(renderLogin()); // Descomente quando importar a função de login
                break;
            case '#tipo-cadastro': // <-- ADICIONADO AQUI
                trocarEstiloPagina('tipo-cadastro');
                app.appendChild(renderTipoCadastro());
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