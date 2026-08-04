import { criartabela } from '../components/table.js';

const cabecalho = [
    'PLANO',
    'EMPRESAS',
    'VALOR',
    'AÇÕES'
];

// Formata um número para o padrão monetário brasileiro (R$ 0,00).
// Se o backend já mandar o valor formatado como string, essa função deixa de ser necessária.
function formatarMoeda(valor) {
    return `R$${valor.toFixed(2).replace('.', ',')}`;
}

// Simula a resposta de uma API. Quando o backend existir, troque o
// conteúdo desta função pelo fetch real (ver comentário em carregarPlanos).
// O formato de cada objeto abaixo já é o formato esperado da API,
// então basta o backend devolver JSON nesse mesmo shape.
function fetchPlanosFake() {
    const dadosFalsos = [
        { id: 1, plano: 'Básico', empresas: 45, valor: 325.00 },
        { id: 2, plano: 'Pro', empresas: 62, valor: 450.00 },
        { id: 3, plano: 'Premium', empresas: 21, valor: 865.00 }
    ];

    // Simula o tempo de resposta de uma API real
    return new Promise(resolve => {
        setTimeout(() => resolve(dadosFalsos), 500);
    });
}

// Monta as linhas da tabela a partir da lista de planos (objetos),
// não importa se ela veio da função fake ou de um fetch real —
// contanto que cada item siga o mesmo shape usado acima.
function montarLinhas(planos) {
    return planos.map(p => [
        p.plano,
        String(p.empresas),
        formatarMoeda(p.valor),
        'Icones'
    ]);
}

async function carregarPlanos(app) {
    try {
        // Quando o backend existir, substitua a linha abaixo por:
        // const resposta = await fetch('https://sua-api.com/planos');
        // if (!resposta.ok) throw new Error('Falha ao buscar planos');
        // const planos = await resposta.json();
        const planos = await fetchPlanosFake();

        const linhas = montarLinhas(planos);
        const tabela = criartabela(cabecalho, linhas);
        app.appendChild(tabela);
    } catch (erro) {
        // Tratamento básico de erro, já preparado para quando o fetch
        // real entrar em ação (rede fora do ar, backend indisponível, etc.)
        console.error('Erro ao carregar planos:', erro);
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Não foi possível carregar os planos.';
        app.appendChild(mensagem);
    }
}

const app = document.getElementById('app-planos');

carregarPlanos(app);