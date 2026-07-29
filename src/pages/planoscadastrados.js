import { criartabela } from '../components/table.js';

const cabecalho = [
    'Planos Cadastrados'
];

const linhas = [
    ['PLANO', 'EMPRESAS', 'VALOR', 'AÇÕES'],
    ['Básico', '45', 'R$325,00', 'Icones'],
    ['Pro', '62', '22', 'R$450,00', 'Icones'],
    ['Premium', '21', '14', 'R$865,00', 'Icones']
];

criartabela(cabecalho, linhas);