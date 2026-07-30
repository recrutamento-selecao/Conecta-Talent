import { criartabela } from '../components/table.js';

const cabecalho = [
    'Vagas',
    'Candidatos',
    'Processos',
    'Conversão'
];

const linhas = [
    ['Analista de marketing', '48', '70%', '15,6%'],
    ['Analista de RH', '36', '12,4%', '12,4%'],
    ['Desenvolvedor Front-end', '29', '50%', '10,3%'],
];

const app = document.getElementById('app');

const tabela = criartabela(cabecalho, linhas);

app.appendChild(tabela);