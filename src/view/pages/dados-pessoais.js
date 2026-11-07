import { criarStepper, ETAPAS_CADASTRO } from '../components/stepper.js';
import { ETAPAS, criarEstadoInicial } from './cadastro-etapas.js';

function criarBotao(texto, classe, aoClicar) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = `btn-form ${classe}`;
    botao.textContent = texto;
    botao.addEventListener('click', aoClicar);
    return botao;
}

/**
 * Cadastro do candidato em 7 etapas, na mesma página.
 * O estado vive num único objeto: cada campo grava nele a cada digitação,
 * então avançar e voltar nunca perde dados. O resultado final é um objeto
 * serializável (JSON).
 *
 * @param {Object} [config]
 * @param {Object} [config.estadoInicial]
 * @param {(resultado: Object) => void} [config.aoConcluir]
 * @returns {HTMLElement}
 */
export function renderDadosPessoais({ estadoInicial, aoConcluir } = {}) {
    const estado = estadoInicial ?? criarEstadoInicial();
    let indice = 0;

    const pagina = document.createElement('section');
    pagina.className = 'cadastro';

    function irPara(novoIndice) {
        indice = novoIndice;
        desenhar();
    }

    function mostrarResumo(resultado) {
        const stepper = criarStepper({
            etapas: ETAPAS_CADASTRO,
            etapaAtual: 0,
            concluidas: ETAPAS.map(etapa => etapa.id)
        });

        const titulo = document.createElement('h2');
        titulo.textContent = 'Cadastro concluído';

        const descricao = document.createElement('p');
        descricao.className = 'cadastro-etapa-descricao';
        descricao.textContent = 'Objeto final do cadastro (serializável):';

        const json = document.createElement('pre');
        json.className = 'cadastro-resumo';
        json.textContent = JSON.stringify(resultado, null, 2);

        const acoes = document.createElement('div');
        acoes.className = 'cadastro-acoes';
        acoes.appendChild(criarBotao('Editar dados', 'btn-form--secundario', () => irPara(0)));

        const cartao = document.createElement('div');
        cartao.className = 'cadastro-card';
        cartao.append(titulo, descricao, json, acoes);

        pagina.replaceChildren(stepper, cartao);
    }

    function concluir() {
        // Cópia profunda via JSON: garante que o resultado é serializável.
        const resultado = JSON.parse(JSON.stringify(estado));
        mostrarResumo(resultado);
        if (aoConcluir) aoConcluir(resultado);
    }

    function desenhar() {
        const etapa = ETAPAS[indice];
        const ultima = indice === ETAPAS.length - 1;

        const stepper = criarStepper({
            etapas: ETAPAS_CADASTRO,
            etapaAtual: etapa.id,
            onChange: id => irPara(ETAPAS.findIndex(item => item.id === id))
        });

        const voltar = criarBotao('Voltar', 'btn-form--secundario', () => irPara(indice - 1));
        voltar.disabled = indice === 0;

        const avancar = criarBotao(ultima ? 'Concluir' : 'Avançar', 'btn-form--primario', () => {
            if (ultima) concluir();
            else irPara(indice + 1);
        });

        const acoes = document.createElement('div');
        acoes.className = 'cadastro-acoes';
        acoes.append(voltar, avancar);

        const cartao = document.createElement('div');
        cartao.className = 'cadastro-card';
        cartao.append(etapa.render(estado), acoes);

        pagina.replaceChildren(stepper, cartao);
    }

    desenhar();
    return pagina;
}