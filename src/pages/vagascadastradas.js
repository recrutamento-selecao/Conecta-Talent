import { criartabela, ICONES } from '../components/table.js';

// Dados fake no formato que virá do backend.
// Futuramente:
// const resposta = await fetch('/api/empresa/vagas');
// const dados = await resposta.json();
const dados = {
    total: 18,
    ativas: 2,
    itens: [
        { id: 1, cargo: 'Analista de Marketing',      area: 'Marketing',         status: 'Ativa',    candidatos: 48, etapaAtual: 'Triagem' },
        { id: 2, cargo: 'Desenvolvedor Front-end',    area: 'Tecnologia',        status: 'Ativa',    candidatos: 36, etapaAtual: 'Entrevista' },
        { id: 3, cargo: 'Analista de RH',             area: 'Recursos Humanos',  status: 'Pausada',  candidatos: 15, etapaAtual: 'Avaliação' },
        { id: 4, cargo: 'Designer UI/UX',             area: 'Design',            status: 'Rascunho', candidatos: 0,  etapaAtual: null }
    ]
};

const coresStatus = {
    Ativa: 'verde',
    Pausada: 'amarelo',
    Rascunho: 'cinza'
};

const coresEtapa = {
    Triagem: 'azul',
    Entrevista: 'indigo',
    'Avaliação': 'laranja'
};

function criarCargo(cargo) {
    const strong = document.createElement('strong');
    strong.className = 'texto-forte';
    strong.textContent = cargo;
    return strong;
}

function criarStatus(status) {
    const span = document.createElement('span');
    span.className = `status-pill ${coresStatus[status] || 'cinza'}`;
    span.textContent = status;
    return span;
}

function criarEtapa(etapa) {
    const span = document.createElement('span');
    if (!etapa) {
        span.className = 'etapa vazia';
        span.textContent = '—';
    } else {
        span.className = `etapa ${coresEtapa[etapa] || ''}`.trim();
        span.textContent = etapa;
    }
    return span;
}

function criarMenu(_, vaga) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'btn-menu';
    botao.title = 'Ações';
    botao.setAttribute('aria-label', 'Ações');
    botao.innerHTML = ICONES.menu;
    botao.addEventListener('click', () => console.log('Ações da vaga', vaga));
    return botao;
}

function criarLinkVerTodas() {
    const link = document.createElement('a');
    link.className = 'link-acao';
    link.href = '#'; // trocar pela rota da lista completa de vagas
    link.textContent = 'Ver todas as vagas →';
    return link;
}

function criarIndicadorAtivas(quantidade) {
    const span = document.createElement('span');
    span.className = 'indicador-ativo';
    span.textContent = `${quantidade} ${quantidade === 1 ? 'Vaga ativa' : 'Vagas ativas'} no momento`;
    return span;
}

const colunas = [
    { chave: 'cargo',      titulo: 'CARGO',        render: criarCargo },
    { chave: 'area',       titulo: 'ÁREA' },
    { chave: 'status',     titulo: 'STATUS',       render: criarStatus },
    { chave: 'candidatos', titulo: 'CANDIDATOS',   alinhamento: 'centro' },
    { chave: 'etapaAtual', titulo: 'ETAPA ATUAL',  render: criarEtapa },
    { chave: 'acoes',      titulo: 'AÇÕES',        render: criarMenu, alinhamento: 'direita' }
];

criartabela(colunas, dados.itens, {
    titulo: 'Vagas Cadastradas',
    subtitulo: 'Gerenciamento dos processos seletivos abertos',
    acaoTitulo: criarLinkVerTodas(),
    variante: 'limpa',
    acoes: false,
    rodape: {
        esquerda: `Exibindo ${dados.itens.length} de ${dados.total} vagas cadastradas`,
        direita: criarIndicadorAtivas(dados.ativas)
    }
});