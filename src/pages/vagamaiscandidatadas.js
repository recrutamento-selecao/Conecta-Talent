import { criartabela } from '../components/table.js';

const cabecalho = [
    'Vagas',
    'Candidatos',
    'Processos',
    'Conversão'
];

// Simula a resposta de uma API. Quando o backend existir, troque o
// conteúdo desta função pelo fetch real (ver comentário em carregarResumoVagas).
// O formato de cada objeto abaixo já é o formato esperado da API,
// então basta o backend devolver JSON nesse mesmo shape.
function fetchResumoVagasFake() {
    const dadosFalsos = [
        { id: 1, vaga: 'Analista de marketing', candidatos: 48, processos: '70%', conversao: '15,6%' },
        { id: 2, vaga: 'Analista de RH', candidatos: 36, processos: '12,4%', conversao: '12,4%' },
        { id: 3, vaga: 'Desenvolvedor Front-end', candidatos: 29, processos: '50%', conversao: '10,3%' }
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
        v.vaga,
        String(v.candidatos),
        v.processos,
        v.conversao
    ]);
}

async function carregarResumoVagas(app) {
    try {
        // Quando o backend existir, substitua a linha abaixo por:
        // const resposta = await fetch('https://sua-api.com/vagas/resumo');
        // if (!resposta.ok) throw new Error('Falha ao buscar resumo de vagas');
        // const vagas = await resposta.json();
        const vagas = await fetchResumoVagasFake();

        const linhas = montarLinhas(vagas);
        const tabela = criartabela(cabecalho, linhas);
        app.appendChild(tabela);
    } catch (erro) {
        // Tratamento básico de erro, já preparado para quando o fetch
        // real entrar em ação (rede fora do ar, backend indisponível, etc.)
        console.error('Erro ao carregar resumo de vagas:', erro);
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Não foi possível carregar o resumo de vagas.';
        app.appendChild(mensagem);
    }
}

const app = document.getElementById('app');

carregarResumoVagas(app);