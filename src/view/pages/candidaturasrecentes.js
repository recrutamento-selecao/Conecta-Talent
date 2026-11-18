import { criarTabela, criarLinkAcao } from '../components/table.js';

const coresStatus = {
    'Em análise': 'verde',
    Entrevista: 'azul',
    Aprovado: 'roxo',
    Recusado: 'vermelho'
};

function criarVaga(vaga, candidatura) {
    const div = document.createElement('div');
    div.className = 'celula-dupla';

    const strong = document.createElement('strong');
    strong.textContent = vaga;

    const small = document.createElement('small');
    small.textContent = `${candidatura.empresa}, ${candidatura.local}`;

    div.append(strong, small);
    return div;
}

function criarStatus(status) {
    const span = document.createElement('span');
    span.className = `status-pill ${coresStatus[status] || 'cinza'}`;
    span.textContent = status;
    return span;
}

// Data sem horário (AAAA-MM-DD): formata na mão para o fuso não mudar o dia.
function formatarData(valor) {
    const [ano, mes, dia] = String(valor).split('T')[0].split('-');
    return `${dia}/${mes}/${ano}`;
}

const colunas = [
    { chave: 'vaga',            titulo: 'VAGA',   render: criarVaga },
    { chave: 'status',          titulo: 'STATUS', render: criarStatus, largura: '130px' },
    { chave: 'dataCandidatura', titulo: 'DATA',   render: formatarData, largura: '110px' }
];

export function renderCandidaturasRecentes(candidaturas = []) {
    const bloco = document.createElement('div');

    criarTabela(colunas, candidaturas, {
        container: bloco,
        titulo: 'Candidaturas Recentes',
        acaoTitulo: criarLinkAcao('Ver todas →'), // trocar o href pela rota real
        cabecalho: false,
        lista: false,
        acoes: false
    });

    return bloco;
}