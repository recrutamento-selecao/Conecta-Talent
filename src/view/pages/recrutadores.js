import { criarTabela, ICONES } from '../components/table.js';

const coresStatus = {
    Ativo: 'verde',
    Pendente: 'cinza',
    Inativo: 'cinza'
};

function normalizarRecrutador(item, nomeEmpresaFallback = '') {
    const statusDerivado =
        item.status ?? (item.email_confirmado === false ? 'Pendente' : 'Ativo');

    return {
        ...item,
        id: item.id_recrutador ?? item.id,
        nome: item.nome ?? 'Nome não informado',
        cargo: item.cargo ?? '',
        empresa: item.empresa ?? nomeEmpresaFallback,
        email: item.email ?? '',
        status: statusDerivado
    };
}

function criarRecrutador(nome, recrutador) {
    const div = document.createElement('div');
    div.className = 'celula-dupla';

    const linha = document.createElement('div');
    linha.className = 'linha-nome';

    const strong = document.createElement('strong');
    strong.textContent = nome;

    const detalheTag = recrutador.cargo || recrutador.empresa;
    linha.append(strong);

    if (detalheTag) {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = detalheTag;
        linha.append(tag);
    }

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

export async function buscarRecrutadoresPorEmpresa(idEmpresa) {
    const resposta = await fetch(`/recrutadores/empresa/${encodeURIComponent(idEmpresa)}`);

    if (resposta.status === 404) {
        return [];
    }

    const dadosResposta = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dadosResposta?.erro || 'Erro ao carregar recrutadores.');
    }

    return Array.isArray(dadosResposta) ? dadosResposta : [];
}

export async function cadastrarRecrutadorApi(payload) {
    const resposta = await fetch('/recrutadores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const dadosResposta = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dadosResposta?.erro || 'Erro ao cadastrar recrutador.');
    }

    return dadosResposta;
}

export async function atualizarRecrutadorApi(idRecrutador, payload) {
    const resposta = await fetch(`/recrutadores/${encodeURIComponent(idRecrutador)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const dadosResposta = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dadosResposta?.erro || 'Erro ao atualizar recrutador.');
    }

    return dadosResposta;
}

const colunas = [
    { chave: 'nome', titulo: 'RECRUTADOR', render: criarRecrutador },
    { chave: 'status', titulo: 'STATUS', render: criarStatus }
];

export function renderRecrutadores(opcoesOuLista = {}) {
    const bloco = document.createElement('section');
    const conteudoTabela = document.createElement('div');
    bloco.append(conteudoTabela);

    const isArrayDireto = Array.isArray(opcoesOuLista);
    const idEmpresa = !isArrayDireto ? opcoesOuLista.idEmpresa : null;
    const nomeEmpresa = !isArrayDireto ? (opcoesOuLista.nomeEmpresa ?? '') : '';
    const aoAdicionar = !isArrayDireto ? opcoesOuLista.aoAdicionar : null;
    const aoEditarCallback = !isArrayDireto ? opcoesOuLista.aoEditar : null;
    const aoExcluirCallback = !isArrayDireto ? opcoesOuLista.aoExcluir : null;

    let listaAtual = isArrayDireto
        ? opcoesOuLista.map((item) => normalizarRecrutador(item, nomeEmpresa))
        : (opcoesOuLista.recrutadores ?? []).map((item) => normalizarRecrutador(item, nomeEmpresa));

    function criarBotaoAdicionar() {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'btn-pill';
        botao.innerHTML = `${ICONES.usuarioMais}<span>Adicionar+</span>`;

        botao.addEventListener('click', () => {
            if (typeof aoAdicionar === 'function') {
                aoAdicionar({
                    idEmpresa,
                    recarregar: carregarDados
                });
            } else {
                console.log('Adicionar recrutador', { idEmpresa });
            }
        });

        return botao;
    }

    function pintarTabela(itens) {
        conteudoTabela.innerHTML = '';

        const totalAtivos = itens.filter((item) => item.status === 'Ativo').length;

        criarTabela(colunas, itens, {
            container: conteudoTabela,
            titulo: 'Recrutadores',
            subtitulo: 'Equipe responsável pelas seleções',
            acaoTitulo: criarBotaoAdicionar(),
            variante: 'limpa',
            cabecalho: false,
            rodape: {
                esquerda: `Total de recrutadores: ${totalAtivos} ativos`
            },
            aoEditar: (recrutador) => {
                if (typeof aoEditarCallback === 'function') {
                    aoEditarCallback(recrutador, {
                        recarregar: carregarDados,
                        atualizar: (payload) => atualizarRecrutadorApi(recrutador.id, payload)
                    });
                } else {
                    console.log('Editar', recrutador);
                }
            },
            aoExcluir: (recrutador) => {
                if (typeof aoExcluirCallback === 'function') {
                    aoExcluirCallback(recrutador, { recarregar: carregarDados });
                } else {
                    console.log('Excluir', recrutador);
                }
            }
        });
    }

    function pintarMensagem(mensagem) {
        conteudoTabela.innerHTML = '';
        const aviso = document.createElement('p');
        aviso.className = 'aviso-lista';
        aviso.textContent = mensagem;
        conteudoTabela.append(aviso);
    }

    async function carregarDados() {
        if (!idEmpresa) {
            pintarTabela(listaAtual);
            return;
        }

        pintarMensagem('Carregando recrutadores...');

        try {
            const dadosApi = await buscarRecrutadoresPorEmpresa(idEmpresa);
            listaAtual = dadosApi.map((item) => normalizarRecrutador(item, nomeEmpresa));
            pintarTabela(listaAtual);
        } catch (erro) {
            pintarMensagem(erro.message || 'Não foi possível carregar os recrutadores.');
        }
    }

    carregarDados();

    return bloco;
}