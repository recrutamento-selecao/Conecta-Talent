// Etapas padrão do cadastro de candidato (valor padrão; o cadastro pode passar as suas).
export const ETAPAS_CADASTRO = [
    { id: 1, titulo: "Dados pessoais" },
    { id: 2, titulo: "Formação acadêmica" },
    { id: 3, titulo: "Experiência profissional" },
    { id: 4, titulo: "Cursos / Certificados" },
    { id: 5, titulo: "Idiomas" },
    { id: 6, titulo: "Habilidades" },
    { id: 7, titulo: "Diversidade" }
];

/**
 * Cria o elemento do Stepper. Não guarda estado: quem chama passa a
 * configuração e recria o stepper (replaceWith) quando a etapa muda.
 *
 * Aceita um número (compatível com o uso antigo: criarStepper(3)) ou um objeto:
 *
 * @param {Object|number} [config]
 * @param {{id:number, titulo:string}[]} [config.etapas]     padrão: ETAPAS_CADASTRO
 * @param {number}   [config.etapaAtual]                     id da etapa ativa (padrão 1)
 * @param {number[]} [config.concluidas]                     ids concluídos (padrão: etapas antes da atual)
 * @param {(id:number) => void} [config.onChange]            se informado, etapas concluídas ficam clicáveis
 * @returns {HTMLElement}
 */
export function criarStepper(config = {}) {
    if (typeof config === 'number') config = { etapaAtual: config };

    const { etapas = ETAPAS_CADASTRO, etapaAtual = 1, concluidas, onChange } = config;

    const feitas = new Set(
        concluidas ?? etapas.filter(etapa => etapa.id < etapaAtual).map(etapa => etapa.id)
    );

    const container = document.createElement('div');
    container.classList.add('stepper-container');

    // Linha horizontal de fundo que conecta todos os círculos
    const linhaConectora = document.createElement('div');
    linhaConectora.classList.add('stepper-linha-bg');
    container.appendChild(linhaConectora);

    etapas.forEach(etapa => {
        const estado = etapa.id === etapaAtual ? 'ativo'
            : feitas.has(etapa.id) ? 'concluido'
            : 'pendente';

        // Só etapas concluídas navegam, e só quando há callback.
        const clicavel = typeof onChange === 'function' && estado === 'concluido';

        const item = document.createElement(clicavel ? 'button' : 'div');
        item.classList.add('stepper-item', estado);

        if (clicavel) {
            item.type = 'button';
            item.classList.add('clicavel');
            item.addEventListener('click', () => onChange(etapa.id));
        }

        if (estado === 'ativo') item.setAttribute('aria-current', 'step');

        const circulo = document.createElement('div');
        circulo.classList.add('stepper-circulo');
        circulo.textContent = etapa.id;

        const rotulo = document.createElement('span');
        rotulo.classList.add('stepper-titulo');
        rotulo.textContent = etapa.titulo;

        item.append(circulo, rotulo);
        container.appendChild(item);
    });

    return container;
}