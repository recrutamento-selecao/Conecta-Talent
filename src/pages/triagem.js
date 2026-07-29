import { criartabela } from '../components/table.js';

const cabecalho = [
    'Candidato', 'Inscrição', 'Experiência', 'Status'
];

const linhas = [
    ['Juliana Carvalho julianacarvalho@email.com (11)98765-5698', '16/05/2025 Há 2 dias', '3 anos Recursos humanos', 'Em triagem'],
];

criartabela(cabecalho, linhas);