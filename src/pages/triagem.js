import { criartabela } from '../components/table.js';

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

const linhas = [
    ['Juliana Carvalho\njuliana.carvalho@email.com\n(11)98765-5698', '16/05/2025\nHá 2 dias', '3 anos\nRecursos humanos', criarStatus('Em triagem')],
    ['Pedro Henrique Silva\npedro.hsilva@email.com\n(11)98765-5698', '11/04/2025\nHá 2 dias', '4 anos\nMarketing', criarStatus('Em triagem')],
    ['Amanda Lima\namandalima@email.com\n(11)98765-5698', '05/06/2025\nHá 2 dias', '2 anos\nDesign gráfico', criarStatus('Em triagem')],
    ['Jurandir Gomes\njurandir.gomes@email.com\n(11)98765-5698', '01/03/2025\nHá 2 dias', '5 anos\nGestão de empresa', criarStatus('Em triagem')],
    ['Vitor Preste\nvitor.preste@email.com\n(11)98765-5698', '17/05/2025\nHá 2 dias', '7 anos\nMarketing', criarStatus('Em triagem')]
];

const app = document.getElementById('app');
const tabela = criartabela(cabecalho, linhas);
app.appendChild(tabela);