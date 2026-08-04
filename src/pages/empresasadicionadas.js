import { criartabela } from '../components/table.js';

const cabecalho = [
    'EMPRESA',
    'RECRUTADORES',
    'VAGAS',
    'CANDIDATOS',
    'PLANO',
    'AÇÕES'
];

// Simula a resposta de uma API. Quando o backend existir, troque o
// conteúdo desta função pelo fetch real (ver comentário em carregarEmpresas).
// O formato de cada objeto abaixo já é o formato esperado da API,
// então basta o backend devolver JSON nesse mesmo shape.
function fetchEmpresasFake() {
    const dadosFalsos = [
        { id: 1, empresa: 'Empresa 1', recrutadores: 14, vagas: 35, candidatos: 245, plano: 'PRO' },
        { id: 2, empresa: 'Empresa 2', recrutadores: 22, vagas: 22, candidatos: 364, plano: 'BÁSICO' },
        { id: 3, empresa: 'Empresa 3', recrutadores: 18, vagas: 14, candidatos: 134, plano: 'PRO' },
        { id: 4, empresa: 'Empresa 4', recrutadores: 11, vagas: 26, candidatos: 246, plano: 'PREMIUM' }
    ];

    // Simula o tempo de resposta de uma API real
    return new Promise(resolve => {
        setTimeout(() => resolve(dadosFalsos), 500);
    });
}

// Monta as linhas da tabela a partir da lista de empresas (objetos),
// não importa se ela veio da função fake ou de um fetch real —
// contanto que cada item siga o mesmo shape usado acima.
function montarLinhas(empresas) {
    return empresas.map(e => [
        e.empresa,
        String(e.recrutadores),
        String(e.vagas),
        String(e.candidatos),
        e.plano,
        'icones'
    ]);
}

async function carregarEmpresas(app) {
    try {
        // Quando o backend existir, substitua a linha abaixo por:
        // const resposta = await fetch('https://sua-api.com/empresas');
        // if (!resposta.ok) throw new Error('Falha ao buscar empresas');
        // const empresas = await resposta.json();
        const empresas = await fetchEmpresasFake();

        const linhas = montarLinhas(empresas);
        const tabela = criartabela(cabecalho, linhas);
        app.appendChild(tabela);
    } catch (erro) {
        // Tratamento básico de erro, já preparado para quando o fetch
        // real entrar em ação (rede fora do ar, backend indisponível, etc.)
        console.error('Erro ao carregar empresas:', erro);
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Não foi possível carregar as empresas.';
        app.appendChild(mensagem);
    }
}

const app = document.getElementById('app-empresas');

carregarEmpresas(app);