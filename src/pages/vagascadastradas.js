import { criartabela } from '../components/table.js';

function criarStatus(texto, classe) {
    const span = document.createElement('span');
    span.className = classe;
    span.textContent = texto;
    return span;
}

const cabecalho = [
    'Cargo',
    'Área',
    'Status',
    'Candidatos',
    'Etapa Atual',
    'Ações'
];

// Mapeia o status (texto vindo da API) para a classe CSS correspondente.
// Se o backend já mandar a classe pronta, essa função deixa de ser necessária.
const CLASSES_STATUS = {
    'Ativa': 'status-ativa',
    'Pausado': 'status-pausado',
    'Rascunho': 'status-rascunho'
};

// Simula a resposta de uma API. Quando o backend existir, troque o
// conteúdo desta função pelo fetch real (ver comentário em carregarVagas).
// O formato de cada objeto abaixo já é o formato esperado da API,
// então basta o backend devolver JSON nesse mesmo shape.
function fetchVagasFake() {
    const dadosFalsos = [
        { id: 1, cargo: 'Analista de marketing', area: 'Marketing', status: 'Ativa', candidatos: 48, etapaAtual: 'Triagem' },
        { id: 2, cargo: 'Desenvolvedor Front-end', area: 'Tecnologia', status: 'Ativa', candidatos: 36, etapaAtual: 'Entrevista' },
        { id: 3, cargo: 'Analista de RH', area: 'Recursos Humanos', status: 'Pausado', candidatos: 15, etapaAtual: 'Avaliação' },
        { id: 4, cargo: 'Designer UI/UX', area: 'Design', status: 'Rascunho', candidatos: 0, etapaAtual: '...' }
    ];

    // Simula o tempo de resposta de uma API real
    return new Promise(resolve => {
        setTimeout(() => resolve(dadosFalsos), 500);
    });
}

// Monta as linhas da tabela a partir da lista de vagas (objetos),
// não importa se ela veio da função fake ou de um fetch real —
// contanto que cada item siga o mesmo shape usado acima.
function montarLinhas(vagas) {
    return vagas.map(v => [
        v.cargo,
        v.area,
        criarStatus(v.status, CLASSES_STATUS[v.status] ?? 'status-rascunho'),
        String(v.candidatos),
        v.etapaAtual,
        '⋮'
    ]);
}

async function carregarVagas(app) {
    try {
        // Quando o backend existir, substitua a linha abaixo por:
        // const resposta = await fetch('https://sua-api.com/vagas');
        // if (!resposta.ok) throw new Error('Falha ao buscar vagas');
        // const vagas = await resposta.json();
        const vagas = await fetchVagasFake();

        const linhas = montarLinhas(vagas);
        const tabela = criartabela(cabecalho, linhas);
        app.appendChild(tabela);
    } catch (erro) {
        // Tratamento básico de erro, já preparado para quando o fetch
        // real entrar em ação (rede fora do ar, backend indisponível, etc.)
        console.error('Erro ao carregar vagas:', erro);
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Não foi possível carregar as vagas.';
        app.appendChild(mensagem);
    }
}

const app = document.getElementById('app');

carregarVagas(app);