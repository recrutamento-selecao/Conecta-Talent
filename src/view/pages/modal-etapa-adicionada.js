import { criarModal } from '../components/modal.js';

const ICONE_CHECK = `
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <circle cx="17" cy="17" r="17" fill="#16a34a"></circle>
        <path d="M10 17.5l4.8 4.8L24.5 12" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
`;

const ICONE_ETAPA = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3"></rect>
        <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor"></rect>
    </svg>
`;

const AZUL = '#1a3bc2';
const AZUL_HOVER = '#152f9c';

const BASE_BTN = 'height: 40px; padding: 0 1.25rem; border-radius: 8px; font-family: inherit; font-size: 0.8rem; font-weight: 600; cursor: pointer; box-sizing: border-box; transition: background-color 0.2s;';

// Evita injetar HTML vindo de dados do usuário
function escapar(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML;
}

// Números ganham a unidade; textos passam como vieram
const duracaoTexto = (v) => (typeof v === 'number' ? `${v} minutos` : String(v ?? ''));
const notaTexto = (v) => (typeof v === 'number' ? `${v}%` : String(v ?? ''));

/**
 * @param {Object} opcoes
 * @param {Object} [opcoes.etapa]
 * @param {string} [opcoes.etapa.nome] ex.: 'Teste técnico'
 * @param {string} [opcoes.etapa.tipo] ex.: 'Teste' (também aparece no badge)
 * @param {number|string} [opcoes.etapa.perguntas]
 * @param {number|string} [opcoes.etapa.duracao] número = minutos
 * @param {number|string} [opcoes.etapa.notaMinima] número = porcentagem
 * @param {() => void} [opcoes.aoAdicionarOutra]
 * @param {() => void} [opcoes.aoVoltar] "Voltar para o processo seletivo"
 * @param {() => void} [opcoes.aoFechar] X e clique no fundo
 */
export function renderModalEtapaAdicionada({ etapa = {}, aoAdicionarOutra, aoVoltar, aoFechar } = {}) {
    const { nome, tipo, perguntas, duracao, notaMinima } = etapa;

    const campo = (rotulo, valor) => `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; font-size: 0.72rem;">
            <span style="color: #64748b;">${rotulo}</span>
            <strong style="color: #0f172a; font-weight: 700; text-align: right;">${escapar(valor) || '—'}</strong>
        </div>
    `;

    const conteudoHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; font-family: 'Inter', sans-serif;">
            <!-- Ícone de sucesso -->
            <div style="width: 84px; height: 84px; border-radius: 50%; background-color: #d1fae5; display: flex; justify-content: center; align-items: center; margin-top: 0.5rem;">
                ${ICONE_CHECK}
            </div>

            <!-- Textos -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; text-align: center;">
                <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700; color: #0f172a;">Etapa adicionada com sucesso!</h2>
                <p style="margin: 0; font-size: 0.85rem; color: #64748b; line-height: 1.5;">
                    A etapa <strong style="color: #0f172a;">“${escapar(nome)}”</strong> foi adicionada ao processo seletivo.
                </p>
            </div>

            <!-- Resumo da etapa -->
            <div style="width: 100%; box-sizing: border-box; border: 1px solid #dbe7fb; border-radius: 10px; background-color: #f5f9ff; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.9rem; margin-top: 0.5rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 32px; height: 32px; border-radius: 8px; background-color: #dbeafe; color: ${AZUL}; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                            ${ICONE_ETAPA}
                        </div>
                        <strong style="font-size: 0.9rem; color: #0f172a;">${escapar(nome)}</strong>
                    </div>
                    <span style="display: inline-block; padding: 0.2rem 0.7rem; border-radius: 999px; background-color: #fef3c7; color: #b45309; font-size: 0.68rem; font-weight: 600;">${escapar(tipo)}</span>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem 2.5rem;">
                    ${campo('Tipo', tipo)}
                    ${campo('Perguntas', String(perguntas ?? ''))}
                    ${campo('Duração', duracaoTexto(duracao))}
                    ${campo('Nota mínima', notaTexto(notaMinima))}
                </div>
            </div>

            <!-- Ações -->
            <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.25rem;">
                <button type="button" id="btnAdicionarOutraEtapa" style="${BASE_BTN} background-color: #ffffff; border: 1.5px solid ${AZUL}; color: ${AZUL};">
                    Adicionar outra etapa
                </button>
                <button type="button" id="btnVoltarProcessoSeletivo" style="${BASE_BTN} background-color: ${AZUL}; border: 1.5px solid ${AZUL}; color: #ffffff;">
                    Voltar para o processo seletivo
                </button>
            </div>
        </div>
    `;

    const fecharPadrao = () => {
        if (aoFechar) aoFechar();
        else window.location.hash = '#home';
    };

    const modal = criarModal({
        conteudoHTML,
        aoFechar: fecharPadrao
    });

    const caixa = modal.querySelector('.modal-conteudo');
    caixa.classList.add('modal-compacto');
    caixa.style.maxWidth = '560px'; // só neste modal

    const btnOutra = modal.querySelector('#btnAdicionarOutraEtapa');
    const btnVoltar = modal.querySelector('#btnVoltarProcessoSeletivo');

    btnOutra.addEventListener('mouseenter', () => btnOutra.style.backgroundColor = '#eff3ff');
    btnOutra.addEventListener('mouseleave', () => btnOutra.style.backgroundColor = '#ffffff');
    btnVoltar.addEventListener('mouseenter', () => btnVoltar.style.backgroundColor = AZUL_HOVER);
    btnVoltar.addEventListener('mouseleave', () => btnVoltar.style.backgroundColor = AZUL);

    btnOutra.addEventListener('click', () => {
        modal.remove();
        if (aoAdicionarOutra) aoAdicionarOutra();
        else fecharPadrao();
    });

    btnVoltar.addEventListener('click', () => {
        modal.remove();
        if (aoVoltar) aoVoltar();
        else fecharPadrao();
    });

    return modal;
}

export function abrirModalEtapaAdicionada(opcoes = {}) {
    const modal = renderModalEtapaAdicionada(opcoes);
    document.body.appendChild(modal);
}