import { criartabela } from '../components/table.js';

const cabecalho = ['PLANO', 'EMPRESAS', 'VALOR', 'AÇÕES'];

const linhas = [
    ['Básico', '45', 'R$325,00', 'Icones'],
    ['Pro', '62', 'R$450,00', 'Icones'],
    ['Premium', '21', 'R$865,00', 'Icones']
];

const app = document.getElementById('app-planos');
criartabela(cabecalho, linhas, app);