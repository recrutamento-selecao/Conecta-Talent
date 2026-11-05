import { criarTabela, criarLinkAcao, ICONES } from '../components/table.js';

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

export function renderVagasRecomendadas(vagas = []) {
    const bloco = document.createElement('div');

    criarTabela(colunas, vagas, {
        container: bloco,
        titulo: 'Vagas recomendadas para você',
        acaoTitulo: criarLinkAcao('Ver todas →'), // trocar o href pela rota real
        cabecalho: false,
        lista: false,
        zebra: true,
        acoes: false
    });

    return bloco;
}