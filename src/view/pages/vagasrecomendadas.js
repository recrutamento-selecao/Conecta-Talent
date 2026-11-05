import { criartabela, criarLinkAcao, ICONES } from '../components/table.js';

// Dados fake no formato que virá do backend.
// Futuramente:
// const resposta = await fetch('/api/candidato/vagas-recomendadas');
// const vagas = await resposta.json();
const vagas = [
    { id: 1, titulo: 'Desenvolvedor Full Stack', empresa: 'TechCorp Brasil', local: 'São Paulo - SP',      sigla: 'TC', salva: false },
    { id: 2, titulo: 'Designer de Produto',      empresa: 'Recruta+',        local: 'Rio de Janeiro - RJ', sigla: 'R+', salva: false },
    { id: 3, titulo: 'Engenheiro de Dados',      empresa: 'StartUp Valley',  local: 'Florianópolis - SC',  sigla: 'SV', salva: false },
    { id: 4, titulo: 'Gerente de Projetos',      empresa: 'Global RH',       local: 'Belo Horizonte - MG', sigla: 'GR', salva: false },
    { id: 5, titulo: 'Analista de Marketing',    empresa: 'Educa Talentos',  local: 'Curitiba - PR',       sigla: 'ET', salva: false }
];

const coresAvatar = ['verde', 'azul', 'lavanda', 'rosa', 'amarelo'];

function criarVaga(titulo, vaga) {
    const div = document.createElement('div');
    div.className = 'item-com-avatar';

    const avatar = document.createElement('span');
    avatar.className = `avatar ${coresAvatar[(vaga.id - 1) % coresAvatar.length]}`;
    avatar.textContent = vaga.sigla;

    const texto = document.createElement('div');
    texto.className = 'celula-dupla';

    const strong = document.createElement('strong');
    strong.textContent = titulo;

    const small = document.createElement('small');
    small.textContent = `${vaga.empresa}, ${vaga.local}`;

    texto.append(strong, small);
    div.append(avatar, texto);
    return div;
}

function criarBotaoSalvar(salva, vaga) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = salva ? 'btn-salvar salva' : 'btn-salvar';
    botao.title = 'Salvar vaga';
    botao.setAttribute('aria-label', 'Salvar vaga');
    botao.innerHTML = ICONES.favorito;
    botao.addEventListener('click', () => {
        vaga.salva = !vaga.salva;
        botao.classList.toggle('salva', vaga.salva);
        console.log(vaga.salva ? 'Vaga salva' : 'Vaga removida dos salvos', vaga); // futuramente: chamar a API
    });
    return botao;
}

const colunas = [
    { chave: 'titulo', titulo: 'VAGA',   render: criarVaga },
    { chave: 'salva',  titulo: 'SALVAR', render: criarBotaoSalvar, alinhamento: 'direita', largura: '48px' }
];

criartabela(colunas, vagas, {
    container: 'app-recomendadas',
    titulo: 'Vagas recomendadas para você',
    acaoTitulo: criarLinkAcao('Ver todas →'), // trocar o href pela rota real
    cabecalho: false,
    lista: false,
    zebra: true,
    acoes: false
});