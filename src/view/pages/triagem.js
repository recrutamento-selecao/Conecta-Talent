import { criartabela } from '../components/table.js';
import { criarSidebar } from '../components/sidebar.js';

function criarStatus(texto) {
    const span = document.createElement('span');
    span.className = 'status-pill';
    span.textContent = texto;
    return span;
}

const cabecalho = [
    'Candidato',
    'Inscrição',
    'Experiência',
    'Status'
];

// ===== MUDANÇA 1 =====
// Antes: const linhas = [ ...array fixo... ]
// Agora: uma função que simula a resposta de uma API (troque por fetch de verdade quando o backend existir)
function fetchCandidatosFake() {
    const dadosFalsos = [
        { nome: 'Juliana Carvalho', email: 'juliana.carvalho@email.com', telefone: '(11)98765-5698', inscricao: '16/05/2025', diasAtras: 2, experiencia: '3 anos', area: 'Recursos humanos', status: 'Em triagem' },
        { nome: 'Pedro Henrique Silva', email: 'pedro.hsilva@email.com', telefone: '(11)98765-5698', inscricao: '11/04/2025', diasAtras: 2, experiencia: '4 anos', area: 'Marketing', status: 'Em triagem' },
        { nome: 'Amanda Lima', email: 'amandalima@email.com', telefone: '(11)98765-5698', inscricao: '05/06/2025', diasAtras: 2, experiencia: '2 anos', area: 'Design gráfico', status: 'Em triagem' },
        { nome: 'Jurandir Gomes', email: 'jurandir.gomes@email.com', telefone: '(11)98765-5698', inscricao: '01/03/2025', diasAtras: 2, experiencia: '5 anos', area: 'Gestão de empresa', status: 'Em triagem' },
        { nome: 'Vitor Preste', email: 'vitor.preste@email.com', telefone: '(11)98765-5698', inscricao: '17/05/2025', diasAtras: 2, experiencia: '7 anos', area: 'Marketing', status: 'Em triagem' }
    ];

    // Simula o "tempo de resposta" de uma API real
    return new Promise(resolve => {
        setTimeout(() => resolve(dadosFalsos), 500);
    });
}

// ===== MUDANÇA 2 =====
// Antes: o código rodava direto, sem função
// Agora: precisa ser async porque depende de "esperar" a resposta chegar
async function carregarCandidatos(app) {

    // ===== MUDANÇA 3 =====
    // Aqui é onde, no futuro, entra o fetch de verdade:
    // const resposta = await fetch('https://sua-api.com/candidatos');
    // const candidatos = await resposta.json();
    const candidatos = await fetchCandidatosFake();

    // ===== MUDANÇA 4 =====
    // Antes: array de arrays escrito à mão
    // Agora: monta o array de arrays a partir dos objetos que vieram da "API"
    const linhas = candidatos.map(c => [
        `${c.nome}\n${c.email}\n${c.telefone}`,
        `${c.inscricao}\nHá ${c.diasAtras} dias`,
        `${c.experiencia}\n${c.area}`,
        criarStatus(c.status)
    ]);

    // ===== O resto fica igual =====
    const tabela = criartabela(cabecalho, linhas);
    app.appendChild(tabela);
}

// ===== MUDANÇA 5 =====
// Inicializa a página: sidebar primeiro, depois carrega a tabela
function init() {
    const app = document.getElementById('app');

    const sidebar = criarSidebar('recrutador', 'Nome do Usuário'); // tipoUsuario e nomeUsuario reais
    app.appendChild(sidebar);

    carregarCandidatos(app);
}

init();