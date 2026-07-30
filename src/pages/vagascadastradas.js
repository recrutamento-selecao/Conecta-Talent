import { criartabela } from '../components/table.js';

function criarStatus(texto, classe) {
    const span = document.createElement('span');
    span.className = classe;
    span.textContent = texto;
    return span;
}

const cabecalho = [
    'Cargo',
    'Área',
    'Status',
    'Candidatos',
    'Etapa Atual',
    'Ações'
];

const linhas = [
    ['Analista de marketing', 'Marketing', criarStatus('Ativa', 'status-ativa'), '48', 'Triagem', '⋮'],
    ['Desenvolvedor Front-end', 'Tecnologia', criarStatus('Ativa', 'status-ativa'), '36', 'Entrevista', '⋮'],
    ['Analista de RH', 'Recursos Humanos', criarStatus('Pausado', 'status-pausado'), '15', 'Avaliação', '⋮'],
    ['Designer UI/UX', 'Design', criarStatus('Rascunho', 'status-rascunho'), '0', '...', '⋮'],
];

const app = document.getElementById('app');
const tabela = criartabela(cabecalho, linhas);
app.appendChild(tabela);