
import { criarRoteador } from './utils/router.js';
import { criarSidebar } from './components/sidebar.js';

import { renderTeste } from './pages/teste.js';
import { renderDashboardCandidato } from './pages/dashboard-candidato.js';
import { renderDashboardAdministrador } from './pages/dashboard-administrador.js';
import { renderUsuarios } from './pages/usuarios.js';
import { renderDadosPessoais } from './pages/dados-pessoais.js';

import { USUARIO_SIMULADO, USUARIOS } from './utils/fixtures.js';

// Entrada única da SPA.
const app = document.getElementById('app');

// Conteúdo principal.
const conteudo = document.createElement('main');
conteudo.id = 'conteudo';

app.replaceChildren(conteudo);

// Sidebar comum.
let sidebar = null;
let tipoAtual = null;

function tipoDaRota() {
    const achado = window.location.hash.match(
        /^#\/dashboard-(administrador|empresa|recrutador|candidato)/
    );

    return achado ? achado[1] : null;
}

function atualizarSidebar() {
    const tipo = tipoDaRota() ?? tipoAtual ?? 'candidato';

    if (tipo === tipoAtual) return;

    const nova = criarSidebar(tipo, USUARIO_SIMULADO.nome);

    if (sidebar) {
        if (sidebar.classList.contains('fechada')) {
            nova.classList.add('fechada');
        }

        sidebar.replaceWith(nova);
    } else {
        app.prepend(nova);
    }

    sidebar = nova;
    tipoAtual = tipo;
}

atualizarSidebar();
window.addEventListener('hashchange', atualizarSidebar);

// Páginas provisórias.
function renderEmConstrucao(titulo) {
    return () => {
        const pagina = document.createElement('section');
        const h1 = document.createElement('h1');

        h1.textContent = titulo;
        pagina.appendChild(h1);

        return pagina;
    };
}

// Rotas da aplicação.
criarRoteador({
    container: conteudo,
    rotaPadrao: '/teste',

    rotas: {
        '/teste': renderTeste,
        '/dashboard-administrador': renderDashboardAdministrador,
        '/dashboard-candidato': renderDashboardCandidato,
        '/dashboard-empresa': renderEmConstrucao('Dashboard da empresa'),
        '/dashboard-recrutador': renderEmConstrucao('Dashboard do recrutador'),
        '/usuarios': () => renderUsuarios(USUARIOS),
        '/cadastro': renderDadosPessoais
    }
});
