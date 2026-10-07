import { criartabela } from '../components/table.js';

// Dados fake no formato que virá do backend.
// Futuramente:
// const resposta = await fetch('/api/entrevistas/proximas');
// const entrevistas = await resposta.json();
const entrevistas = [
    { id: 1, candidato: 'Ana Carolina Silva', vaga: 'Desenvolvedora Full Stack', dataHora: '2026-09-25T14:00:00', status: 'Agendada' },
    { id: 2, candidato: 'Ricardo Mendes',     vaga: 'Designer UX/UI',           dataHora: '2026-09-26T10:30:00', status: 'Confirmada' }
];

const coresStatus = {
    Agendada: 'amarelo',
    Confirmada: 'verde'
};

function criarCandidato(nome, item) {
    const div = document.createElement('div');
    div.className = 'celula-dupla';

    const strong = document.createElement('strong');
    strong.textContent = nome;

    const small = document.createElement('small');
    small.textContent = item.vaga;

    div.append(strong, small);
    return div;
}

function formatarDataHora(valor) {
    const data = new Date(valor);
    const dia = data.toLocaleDateString('pt-BR');
    const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${dia} ${hora}`;
}

function criarDataStatus(dataHora, item) {
    const div = document.createElement('div');
    div.className = 'data-status';

    const data = document.createElement('span');
    data.textContent = formatarDataHora(dataHora);

    const pill = document.createElement('span');
    pill.className = `status-pill ${coresStatus[item.status] || 'cinza'}`;
    pill.textContent = item.status;

    div.append(data, pill);
    return div;
}

const colunas = [
    { chave: 'candidato', titulo: 'CANDIDATO', render: criarCandidato },
    { chave: 'dataHora',  titulo: 'DATA',      render: criarDataStatus, alinhamento: 'direita' }
];

criartabela(colunas, entrevistas, {
    container: 'app-entrevistas',
    titulo: 'Próximas Entrevistas',
    cabecalho: false,
    acoes: false
});