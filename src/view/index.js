import { criarTabela } from './components/table.js';
import { criarStepper } from './components/stepper.js';

// Entrada única da SPA: monta o layout e troca as telas pelo hash da URL.
//
// Contrato de renderização (proposta):
//   render(container) -> void | (() => void)
//   - desenha só dentro de `container` (nunca em document.body);
//   - pode devolver uma função de limpeza, chamada antes de trocar de tela.

const app = document.getElementById('app');

const conteudo = document.createElement('main');
conteudo.id = 'conteudo';

// Quando a sidebar comum for integrada, ela entra aqui, antes do <main>:
// app.replaceChildren(criarSidebar(...), conteudo);
app.replaceChildren(conteudo);

// Tela provisória só para validar tabela (2 instâncias) e stepper.
// Pode ser apagada quando os dashboards entrarem.
function renderTeste(container) {
    const areaStepper = document.createElement('div');
    const areaTabelaA = document.createElement('div');
    const areaTabelaB = document.createElement('div');
    container.append(areaStepper, areaTabelaA, areaTabelaB);

    areaStepper.appendChild(criarStepper({ etapaAtual: 3 }));

    const colunas = [
        { chave: 'nome', titulo: 'Nome', ordenavel: true },
        { chave: 'perfil', titulo: 'Perfil' }
    ];
    const dados = [
        { id: 1, nome: 'Ana', perfil: 'Candidato' },
        { id: 2, nome: 'Bruno', perfil: 'Recrutador' },
        { id: 3, nome: 'Carla', perfil: 'Empresa' }
    ];

    const tabelaA = criarTabela(colunas, dados, {
        container: areaTabelaA,
        titulo: 'Usuários',
        selecionavel: true,
        zebra: true
    });

    const tabelaB = criarTabela(colunas, dados.slice(0, 2), {
        container: areaTabelaB,
        titulo: 'Últimos cadastros',
        variante: 'limpa',
        acoes: false
    });

    return () => {
        tabelaA.destruir();
        tabelaB.destruir();
    };
}

// Rotas: '/caminho' -> função render. Os dashboards entram aqui.
const rotas = {
    '/teste': renderTeste
    // '/dashboard-administrador': renderDashboardAdministrador,
    // '/dashboard-candidato': renderDashboardCandidato,
    // '/dashboard-empresa': renderDashboardEmpresa,
    // '/dashboard-recrutador': renderDashboardRecrutador,
    // '/cadastro': renderDadosPessoais,
};
const ROTA_PADRAO = '/teste';

let limpar = null;

function navegar() {
    const caminho = location.hash.slice(1) || ROTA_PADRAO;
    const render = rotas[caminho] ?? rotas[ROTA_PADRAO];

    if (typeof limpar === 'function') limpar();
    conteudo.replaceChildren();
    limpar = render(conteudo) ?? null;
}

window.addEventListener('hashchange', navegar);
navegar();