import { criartabela, criarLinkAcao } from '../components/table.js';

// Dados fake no formato que virá do backend.
// Futuramente:
// const resposta = await fetch('/api/candidato/candidaturas');
// const candidaturas = await resposta.json();
const candidaturas = [
    { id: 1, vaga: 'Desenvolvedor Front-end', empresa: 'TechCorp Brasil', local: 'São Paulo - SP',       status: 'Em análise', dataCandidatura: '2026-09-15' },
    { id: 2, vaga: 'UX Designer',              empresa: 'Recruta+',        local: 'Rio de Janeiro - RJ',  status: 'Entrevista', dataCandidatura: '2026-09-12' },
    { id: 3, vaga: 'Analista de Dados',        empresa: 'StartUp Valley',  local: 'Florianópolis - SC',   status: 'Aprovado',   dataCandidatura: '2026-09-08' },
    { id: 4, vaga: 'Product Manager',          empresa: 'Global RH',       local: 'Belo Horizonte - MG',  status: 'Recusado',   dataCandidatura: '2026-09-05' },
    { id: 5, vaga: 'Dev Backend',              empresa: 'Educa Talentos',  local: 'Curitiba - PR',        status: 'Em análise', dataCandidatura: '2026-09-01' }
];

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
    { chave: 'vaga',           titulo: 'VAGA',   render: criarVaga },
    { chave: 'status',         titulo: 'STATUS', render: criarStatus, largura: '130px' },
    { chave: 'dataCandidatura', titulo: 'DATA',  render: formatarData, largura: '110px' }
];

criartabela(colunas, candidaturas, {
    titulo: 'Candidaturas Recentes',
    acaoTitulo: criarLinkAcao('Ver todas →'), // trocar o href pela rota real
    cabecalho: false,
    lista: false,
    acoes: false
});