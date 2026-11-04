import { renderHome } from './pages/home.js';
import { renderPlanos } from './pages/planos.js';
import { renderRecursos } from './pages/recursos.js';
import { renderSobreNos } from './pages/sobre-nos.js';
import { renderSuporte } from './pages/suporte.js';
import { renderTipoCadastro } from './pages/tipo-cadastro.js';

const app = document.getElementById('app');

function navegar() {
    const hash = window.location.hash;
    app.innerHTML = '';

    switch (hash) {
        case '#sobre-nos':
            app.appendChild(renderSobreNos());
            break;
        case '#recursos':
            app.appendChild(renderRecursos());
            break;
        case '#planos':
            app.appendChild(renderPlanos());
            break;
        case '#suporte':
            app.appendChild(renderSuporte());
            break;
        case '#tipo-cadastro':
        app.appendChild(renderTipoCadastro());
        break;
        case '#home':
        case '':
        default:
            app.appendChild(renderHome());
            break;
    }

    window.scrollTo(0, 0);
}

window.addEventListener('hashchange', navegar);
window.addEventListener('load', navegar);