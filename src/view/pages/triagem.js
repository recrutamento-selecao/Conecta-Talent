
import { criarTabela } from '../components/table.js';

// Recebe os dados simulados da fixture.
// Futuramente, os dados virão da API.
export function renderTriagem(candidatos = []) {
    const bloco = document.createElement('section');
    bloco.className = 'bloco-triagem';

    const criarInformacao = (principal, secundaria) => {
        const div = document.createElement('div');

        const titulo = document.createElement('strong');
        titulo.textContent = principal;

        const detalhe = document.createElement('small');
        detalhe.textContent = secundaria;

        div.append(titulo, detalhe);

        return div;
    };

    const colunas = [
        {
            chave: 'nome',
            titulo: 'Candidato',
            render: (_, candidato) =>
                criarInformacao(
                    candidato.nome,
                    `${candidato.email} | ${candidato.telefone}`
                )
        },
        {
            chave: 'inscricao',
            titulo: 'Inscrição',
            render: (_, candidato) =>
                criarInformacao(
                    candidato.inscricao,
                    `Há ${candidato.diasAtras} dias`
                )
        },
        {
            chave: 'experiencia',
            titulo: 'Experiência',
            render: (_, candidato) =>
                criarInformacao(
                    candidato.experiencia,
                    candidato.area
                )
        },
        {
            chave: 'status',
            titulo: 'Status'
        }
    ];

    criarTabela(colunas, candidatos, {
        container: bloco,
        titulo: 'Candidatos em triagem',
        acoes: false
    });

    return bloco;
}
