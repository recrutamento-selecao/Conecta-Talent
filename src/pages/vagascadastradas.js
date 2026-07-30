import { criartabela } from '../components/table.js';

const cabecalho = [
    'Cargo',
    'Área',
    'Status',
    'Candidatos',
    'Etapa Atual',
    'Ações'
];

const linhas = [
    ['Analista de marketing', 'Marketing', 'Ativa', '48', 'Triagem', ':'],
    ['Desenvolvedor Front-end', 'Tecnologia', 'Ativa', '36', 'Entrevista', ':'],
    ['Analista de RH', 'Recursos Humanos', 'Pausado', '15', 'Avaliação', ':'],
    ['Designer UI/UX', 'Design', 'Rascunho', '0', '...', ':']
];

const app = document.getElementById('app');

const tabela = criartabela(cabecalho, linhas);

app.appendChild(tabela);