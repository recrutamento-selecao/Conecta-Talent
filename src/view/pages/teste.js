import { criarTabela } from '../components/table.js';
import { criarStepper } from '../components/stepper.js';

// Página provisória para testar os componentes. Apagar quando os dashboards entrarem.

function criarBotao(texto) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.textContent = texto;
    return botao;
}

// Simula o fluxo do cadastro: avançar, voltar e clicar numa etapa concluída.
function criarTesteStepper() {
    const area = document.createElement('div');
    const barra = document.createElement('div');
    const status = document.createElement('p');
    const voltar = criarBotao('Voltar');
    const avancar = criarBotao('Avançar');

    let etapaAtual = 1;
    const concluidas = new Set();
    let stepper = null;

    function desenhar() {
        const novo = criarStepper({
            etapaAtual,
            concluidas: [...concluidas],
            onChange: id => {
                etapaAtual = id;
                desenhar();
            }
        });

        if (stepper) stepper.replaceWith(novo);
        else area.prepend(novo);
        stepper = novo;

        status.textContent =
            `Etapa atual: ${etapaAtual} | concluídas: ${[...concluidas].join(', ') || 'nenhuma'}`;
        voltar.disabled = etapaAtual === 1;
        avancar.disabled = etapaAtual === 7;
    }

    avancar.addEventListener('click', () => {
        concluidas.add(etapaAtual);
        etapaAtual++;
        desenhar();
    });

    voltar.addEventListener('click', () => {
        etapaAtual--;
        desenhar();
    });

    barra.append(voltar, avancar);
    area.append(barra, status);
    desenhar();
    return area;
}

export function renderTeste() {
    const pagina = document.createElement('section');

    const areaTabelaA = document.createElement('div');
    const areaTabelaB = document.createElement('div');
    pagina.append(criarTesteStepper(), areaTabelaA, areaTabelaB);

    const colunas = [
        { chave: 'nome', titulo: 'Nome', ordenavel: true },
        { chave: 'perfil', titulo: 'Perfil' }
    ];
    const dados = [
        { id: 1, nome: 'Ana', perfil: 'Candidato' },
        { id: 2, nome: 'Bruno', perfil: 'Recrutador' },
        { id: 3, nome: 'Carla', perfil: 'Empresa' }
    ];

    criarTabela(colunas, dados, {
        container: areaTabelaA,
        titulo: 'Usuários',
        selecionavel: true,
        zebra: true
    });

    criarTabela(colunas, dados.slice(0, 2), {
        container: areaTabelaB,
        titulo: 'Últimos cadastros',
        variante: 'limpa',
        acoes: false
    });

    return pagina;
}