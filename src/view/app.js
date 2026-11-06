import { criarRoteador } from './utils/router.js';
import { criarSidebar } from './components/sidebar.js';
import { renderTeste } from './pages/teste.js';
import { renderDashboardCandidato } from './pages/dashboard-candidato.js';
import { USUARIO_SIMULADO } from './utils/fixtures.js';

// Entrada única da SPA: monta o layout (sidebar comum + conteúdo) e inicia o roteador.

const app = document.getElementById('app');

// O #app já é o container flex do layout (definido no CSS da sidebar):
// sidebar e <main> entram direto nele, lado a lado.
const conteudo = document.createElement('main');
conteudo.id = 'conteudo';

app.replaceChildren(conteudo);

// --- Sidebar comum -------------------------------------------------------
// Sem autenticação nesta sprint, o perfil do menu sai da rota (#/dashboard-<perfil>).
// Fora das rotas de dashboard, mantém o perfil anterior (ou candidato, na primeira vez).
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
        if (sidebar.classList.contains('fechada')) nova.classList.add('fechada');
        sidebar.replaceWith(nova);
    } else {
        app.prepend(nova);
    }

    sidebar = nova;
    tipoAtual = tipo;
}

atualizarSidebar();
window.addEventListener('hashchange', atualizarSidebar);

// --- Rotas ---------------------------------------------------------------
// Páginas provisórias até os dashboards serem convertidos (renderDashboard...).
function renderEmConstrucao(titulo) {
    return () => {
        const pagina = document.createElement('section');
        const h1 = document.createElement('h1');
        h1.textContent = titulo;
        pagina.appendChild(h1);
        return pagina;
    };
}

criarRoteador({
    container: conteudo,
    rotaPadrao: '/teste',
    rotas: {
        '/teste': renderTeste,
        '/dashboard-administrador': renderEmConstrucao('Dashboard do administrador'),
        '/dashboard-empresa': renderEmConstrucao('Dashboard da empresa'),
        '/dashboard-recrutador': renderEmConstrucao('Dashboard do recrutador'),
        '/dashboard-candidato': renderDashboardCandidato
        // '/cadastro': renderDadosPessoais,
    }
});