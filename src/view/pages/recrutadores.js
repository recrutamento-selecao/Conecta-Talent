import { criartabela, ICONES } from '../components/table.js';

// Dados fake no formato que virá do backend.
// Futuramente:
// const resposta = await fetch('/api/empresa/recrutadores');
// const dados = await resposta.json();
const dados = {
    ativos: 3,
    itens: [
        { id: 1, nome: 'Rafael Costa', empresa: 'Twelse LTDA', email: 'rafael@email.com',  status: 'Ativo' },
        { id: 2, nome: 'Beatriz Silva', empresa: 'Twelse LTDA', email: 'beatriz@email.com', status: 'Ativo' },
        { id: 3, nome: 'Lucas Mendes', empresa: 'Twelse LTDA', email: 'lucas@email.com',   status: 'Ativo' }
    ]
};

const coresStatus = {
    Ativo: 'verde',
    Inativo: 'cinza'
};

function criarRecrutador(nome, recrutador) {
    const div = document.createElement('div');
    div.className = 'celula-dupla';

    const linha = document.createElement('div');
    linha.className = 'linha-nome';

    const strong = document.createElement('strong');
    strong.textContent = nome;

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = recrutador.empresa;

    linha.append(strong, tag);

    const email = document.createElement('small');
    email.textContent = recrutador.email;

    div.append(linha, email);
    return div;
}

function criarStatus(status) {
    const span = document.createElement('span');
    span.className = `status-pill ${coresStatus[status] || 'cinza'}`;
    span.textContent = status;
    return span;
}

function criarBotaoAdicionar() {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'btn-pill';
    botao.innerHTML = `${ICONES.usuarioMais}<span>Adicionar+</span>`;
    botao.addEventListener('click', () => console.log('Adicionar recrutador'));
    return botao;
}

const colunas = [
    { chave: 'nome',   titulo: 'RECRUTADOR', render: criarRecrutador },
    { chave: 'status', titulo: 'STATUS',     render: criarStatus }
];

criartabela(colunas, dados.itens, {
    container: 'app-recrutadores',
    titulo: 'Recrutadores',
    subtitulo: 'Equipe responsável pelas seleções',
    acaoTitulo: criarBotaoAdicionar(),
    variante: 'limpa',
    cabecalho: false,
    rodape: {
        esquerda: `Total de recrutadores: ${dados.ativos} ativos`
    },
    aoEditar: recrutador => console.log('Editar', recrutador),
    aoExcluir: recrutador => console.log('Excluir', recrutador)
});