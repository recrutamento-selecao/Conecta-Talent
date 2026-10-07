import { criartabela } from '../components/table.js';

// Dados fake no formato que virá do backend.
// Futuramente:
// const resposta = await fetch('/api/vagas/mais-candidatadas');
// const vagas = await resposta.json();
const vagas = [
    { id: 1, vaga: 'Desenvolvedor Full Stack', candidatos: 45, emProcesso: 12, taxaConversao: 26.7 },
    { id: 2, vaga: 'Designer UX/UI',           candidatos: 38, emProcesso: 8,  taxaConversao: 21.1 },
    { id: 3, vaga: 'Analista de Dados',        candidatos: 32, emProcesso: 6,  taxaConversao: 18.8 },
    { id: 4, vaga: 'Product Manager',          candidatos: 28, emProcesso: 5,  taxaConversao: 17.9 },
    { id: 5, vaga: 'Engenheiro DevOps',        candidatos: 22, emProcesso: 4,  taxaConversao: 18.2 }
];

function formatarPorcentagem(valor) {
    return `${Number(valor).toLocaleString('pt-BR', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    })}%`;
}

const colunas = [
    { chave: 'vaga',          titulo: 'VAGA' },
    { chave: 'candidatos',    titulo: 'CANDIDATOS' },
    { chave: 'emProcesso',    titulo: 'EM PROCESSO' },
    { chave: 'taxaConversao', titulo: 'TAXA DE CONVERSÃO', render: formatarPorcentagem }
];

criartabela(colunas, vagas, {
    titulo: 'Vagas mais Candidatadas',
    acoes: false
});