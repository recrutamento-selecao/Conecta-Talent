import { criartabela } from '../components/table.js';

const cabecalho = [
    'EMPRESA',
    'RECRUTADORES',
    'VAGAS',
    'CANDIDATOS',
    'PLANO',
    'AÇÕES'
];

const linhas = [
    ['Empresa 1', '14', '35', '245', 'PRO', 'icones'],
    ['Empresa 2', '22', '22', '364', 'BÁSICO', 'icones'],
    ['Empresa 3', '18', '14', '134', 'PRO', 'icones'],
    ['Empresa 4', '11', '26', '246', 'PREMIUM', 'icones']
];

const app = document.getElementById('app-empresas');

const tabela = criartabela(cabecalho, linhas);

app.appendChild(tabela);