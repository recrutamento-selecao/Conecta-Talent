import { criarTabela, criarBotaoMenu, ICONES } from '../components/table.js';

const coresTipo = {
    Empresa: 'azul',
    Recrutador: 'roxo',
    Candidato: 'laranja'
};

const coresStatus = {
    Ativo: 'verde',
    'Em análise': 'amarelo',
    Inativo: 'vermelho',
    Bloqueado: 'vermelho'
};

function iniciais(nome) {
    return nome
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(parte => parte[0])
        .join('')
        .toUpperCase();
}

function criarUsuario(nome, usuario) {
    const div = document.createElement('div');
    div.className = 'item-com-avatar';

    const avatar = document.createElement('span');
    avatar.className = 'avatar redondo';
    if (usuario.tipo === 'Empresa') {
        avatar.innerHTML = ICONES.empresa;
    } else {
        avatar.textContent = iniciais(nome);
    }

    const texto = document.createElement('div');
    texto.className = 'celula-dupla';

    const strong = document.createElement('strong');
    strong.textContent = nome;

    const small = document.createElement('small');
    small.textContent = usuario.email;

    texto.append(strong, small);
    div.append(avatar, texto);
    return div;
}

function criarPill(cores) {
    return valor => {
        const span = document.createElement('span');
        span.className = `status-pill ${cores[valor] || 'cinza'}`;
        span.textContent = valor;
        return span;
    };
}

// Data sem horário (AAAA-MM-DD): formata na mão para o fuso não mudar o dia.
function formatarData(valor) {
    const [ano, mes, dia] = String(valor).split('T')[0].split('-');
    return `${dia}/${mes}/${ano}`;
}

function criarUltimoAcesso(valor) {
    if (!valor) return '—';

    const data = new Date(valor);
    const div = document.createElement('div');
    div.className = 'data-hora';

    const dia = document.createElement('span');
    dia.textContent = data.toLocaleDateString('pt-BR');

    const hora = document.createElement('span');
    hora.textContent = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    div.append(dia, hora);
    return div;
}

function criarMenu(_, usuario) {
    return criarBotaoMenu(() => console.log('Ações do usuário', usuario));
}

const colunas = [
    { chave: 'nome',         titulo: 'Usuário',          render: criarUsuario, ordenavel: true },
    { chave: 'tipo',         titulo: 'Tipo',             render: criarPill(coresTipo) },
    { chave: 'empresa',      titulo: 'Empresa',          render: empresa => empresa || '—' },
    { chave: 'status',       titulo: 'Status',           render: criarPill(coresStatus) },
    { chave: 'dataCadastro', titulo: 'Data de cadastro', render: formatarData, ordenavel: true },
    { chave: 'ultimoAcesso', titulo: 'Último acesso',    render: criarUltimoAcesso },
    { chave: 'acoes',        titulo: 'Ações',            render: criarMenu, alinhamento: 'direita' }
];

export function renderUsuarios(usuarios = []) {
    const bloco = document.createElement('div');

    criarTabela(colunas, usuarios, {
        container: bloco,
        variante: 'plana',
        selecionavel: true,
        acoes: false,
        aoSelecionar: selecionados => console.log('Selecionados', selecionados)
    });

    return bloco;
}