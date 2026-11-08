import { criarRoteador } from './utils/router.js';
import { criarSidebar } from './components/sidebar.js';
import { renderDashboardCandidato } from './pages/dashboard-candidato.js';
import { renderDashboardAdministrador } from './pages/dashboard-administrador.js';
import { renderDashboardEmpresa } from './pages/dashboard-empresa.js';
import { renderDashboardRecrutador } from './pages/dashboard-recrutador.js';
import { renderUsuarios } from './pages/usuarios.js';
import { renderDadosPessoais } from './pages/dados-pessoais.js';
import { USUARIO_SIMULADO, USUARIOS } from './utils/fixtures.js';

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

// Páginas que não são dashboards, mas pertencem a um perfil.
const PERFIL_POR_ROTA = {
    '/usuarios': 'administrador',
    '/cadastro': 'candidato'
};

function tipoDaRota() {
    const hash = window.location.hash;
    const dashboard = hash.match(
        /^#\/dashboard-(administrador|empresa|recrutador|candidato)/
    );
    if (dashboard) return dashboard[1];
    return PERFIL_POR_ROTA[hash.slice(1)] ?? null;
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
criarRoteador({
    container: conteudo,
    rotaPadrao: '/dashboard-candidato',
    rotas: {
        '/dashboard-administrador': renderDashboardAdministrador,
        '/usuarios': () => renderUsuarios(USUARIOS),
        '/cadastro': () => renderDadosPessoais(),
        '/dashboard-empresa': renderDashboardEmpresa,
        '/dashboard-recrutador': renderDashboardRecrutador,
        '/dashboard-candidato': renderDashboardCandidato
    }
});