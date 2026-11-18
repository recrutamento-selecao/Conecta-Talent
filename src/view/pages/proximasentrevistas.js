import { criarTabela } from '../components/table.js';

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

export function renderProximasEntrevistas(entrevistas = []) {
    const bloco = document.createElement('div');

    criarTabela(colunas, entrevistas, {
        container: bloco,
        titulo: 'Próximas Entrevistas',
        cabecalho: false,
        acoes: false
    });

    return bloco;
}