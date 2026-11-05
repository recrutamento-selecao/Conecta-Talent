import { criartabela, criarBotaoMenu, ICONES } from '../components/table.js';

// Dados fake no formato que virá do backend.
// Futuramente:
// const resposta = await fetch('/api/usuarios');
// const usuarios = await resposta.json();
const usuarios = [
    { id: 1,  nome: 'BlueCore Sistemas',  email: 'contato@bluecore.com',          tipo: 'Empresa',    empresa: null,                 status: 'Ativo',      dataCadastro: '2026-09-20', ultimoAcesso: '2026-09-20T10:24:00' },
    { id: 2,  nome: 'Ana Souza',          email: 'ana.souza@bluecore.com',        tipo: 'Recrutador', empresa: 'BlueCore Sistemas',  status: 'Ativo',      dataCadastro: '2026-09-21', ultimoAcesso: '2026-09-22T14:18:00' },
    { id: 3,  nome: 'João Silva',         email: 'joao.silva@email.com',          tipo: 'Candidato',  empresa: null,                 status: 'Ativo',      dataCadastro: '2026-09-22', ultimoAcesso: '2026-09-22T09:15:00' },
    { id: 4,  nome: 'TechSol Tecnologia', email: 'contato@techsol.com',           tipo: 'Empresa',    empresa: null,                 status: 'Em análise', dataCadastro: '2026-09-18', ultimoAcesso: null },
    { id: 5,  nome: 'Marina Costa',       email: 'marina.costa@techsol.com',      tipo: 'Recrutador', empresa: 'TechSol Tecnologia', status: 'Ativo',      dataCadastro: '2026-09-18', ultimoAcesso: '2026-09-21T16:40:00' },
    { id: 6,  nome: 'Pedro Ramos',        email: 'pedro.ramos@email.com',         tipo: 'Candidato',  empresa: null,                 status: 'Inativo',    dataCadastro: '2026-09-15', ultimoAcesso: '2026-09-10T11:23:00' },
    { id: 7,  nome: 'Innovare RH',        email: 'contato@innovare.com',          tipo: 'Empresa',    empresa: null,                 status: 'Ativo',      dataCadastro: '2026-09-14', ultimoAcesso: '2026-09-22T08:50:00' },
    { id: 8,  nome: 'Luciana Mendes',     email: 'luciana.mendes@innovare.com',   tipo: 'Recrutador', empresa: 'Innovare RH',        status: 'Ativo',      dataCadastro: '2026-09-14', ultimoAcesso: '2026-09-22T13:27:00' },
    { id: 9,  nome: 'Carlos Pereira',     email: 'carlos.pereira@email.com',      tipo: 'Candidato',  empresa: null,                 status: 'Ativo',      dataCadastro: '2026-09-12', ultimoAcesso: '2026-09-21T17:05:00' },
    { id: 10, nome: 'EducaMais',          email: 'contato@educamais.com',         tipo: 'Empresa',    empresa: null,                 status: 'Bloqueado',  dataCadastro: '2026-09-10', ultimoAcesso: null }
];

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

criartabela(colunas, usuarios, {
    variante: 'plana',
    selecionavel: true,
    acoes: false,
    aoSelecionar: selecionados => console.log('Selecionados', selecionados)
});