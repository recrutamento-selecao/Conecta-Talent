import { criarModal } from '../components/modal.js';

const ICONE_COROA = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M2 5l4.5 6L12 4l5.5 7L22 5l-2 13H4L2 5z"></path>
        <path d="M5 21h14"></path>
    </svg>
`;

const ICONE_ALERTA = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="7" x2="12" y2="13"></line>
        <line x1="12" y1="16.5" x2="12" y2="17"></line>
    </svg>
`;

const ICONE_SETA = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a3bc2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14"></path>
        <path d="M13 6l6 6-6 6"></path>
    </svg>
`;

const ICONE_CHECK = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
    </svg>
`;

const BASE_BTN = 'height: 40px; padding: 0 1.25rem; border-radius: 8px; font-family: inherit; font-size: 0.875rem; font-weight: 600; box-sizing: border-box; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: background-color 0.2s;';

const AZUL = '#1a3bc2';
const AZUL_HOVER = '#152f9c';
const AZUL_DESABILITADO = '#9fb0ea';

// Evita injetar HTML vindo de dados do usuário
function escapar(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML;
}

// Valores numéricos são formatados conforme o tipo; textos passam como vieram
function formatar(valor, formato) {
    if (typeof valor !== 'number') return String(valor ?? '');
    if (formato === 'moeda') {
        return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return valor.toLocaleString('pt-BR');
}

/**
 * @param {Object} opcoes
 * @param {string} [opcoes.nomePlano] ex.: 'Profissional'
 * @param {Array<{rotulo: string, de: number|string, para: number|string, formato?: 'moeda'|'numero'}>} [opcoes.alteracoes]
 * @param {() => (void|Promise<void>)} [opcoes.aoConfirmar]
 * @param {() => void} [opcoes.aoCancelar]
 */
export function renderModalConfirmarAlteracoes({ nomePlano = '', alteracoes = [], aoConfirmar, aoCancelar } = {}) {
    const linhasHTML = alteracoes.map((alt) => `
        <div style="display: grid; grid-template-columns: 1.4fr 1fr 1fr; align-items: center; padding: 0.85rem 1rem; border-top: 1px solid #e2e8f0; font-size: 0.75rem;">
            <span style="color: #64748b;">${escapar(alt.rotulo)}</span>
            <span style="color: #64748b;">${escapar(formatar(alt.de, alt.formato))}</span>
            <span style="display: flex; align-items: center; gap: 0.6rem; color: #0f172a; font-weight: 700;">
                ${ICONE_SETA}
                ${escapar(formatar(alt.para, alt.formato))}
            </span>
        </div>
    `).join('');

    const conteudoHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem; font-family: 'Inter', sans-serif;">
            <!-- Cabeçalho -->
            <div style="display: flex; flex-direction: column; gap: 0.6rem; padding-right: 2rem;">
                <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700; color: #0f172a;">Confirmar alterações</h2>
                <p style="margin: 0; font-size: 0.85rem; color: #475569;">
                    Tem certeza que deseja salvar as alterações realizadas no plano <strong style="color: #0f172a;">${escapar(nomePlano)}</strong>?
                </p>
            </div>

            <!-- Plano -->
            <div style="display: flex; align-items: center; gap: 0.85rem; box-sizing: border-box; border: 1px solid #dbe7fb; border-radius: 10px; background-color: #f5f9ff; padding: 0.9rem 1rem;">
                <div style="width: 40px; height: 40px; border-radius: 10px; background-color: #dbeafe; color: ${AZUL}; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                    ${ICONE_COROA}
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.15rem;">
                    <strong style="font-size: 0.9rem; color: #0f172a;">Plano ${escapar(nomePlano)}</strong>
                    <span style="font-size: 0.72rem; color: #64748b;">Confira abaixo as alterações antes de confirmar.</span>
                </div>
            </div>

            <!-- Alterações -->
            <div style="border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
                <div style="padding: 0.75rem 1rem; background-color: #f8fafc; font-size: 0.78rem; font-weight: 700; color: #1e293b;">
                    Alterações realizadas
                </div>
                ${linhasHTML}
            </div>

            <!-- Atenção -->
            <div style="display: flex; align-items: center; gap: 0.85rem; box-sizing: border-box; border: 1px solid #fde68a; border-radius: 10px; background-color: #fffbeb; padding: 0.85rem 1rem; font-size: 0.75rem; line-height: 1.45; color: #92400e;">
                <div style="color: #d97706; flex-shrink: 0; display: flex;">${ICONE_ALERTA}</div>
                <span><strong>Atenção:</strong> as alterações de preço poderão afetar novas assinaturas. Assinaturas existentes seguirão as regras de cobrança definidas pela plataforma.</span>
            </div>

            <!-- Ciência -->
            <label style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.78rem; color: #475569; cursor: pointer; padding-left: 0.25rem;">
                <input type="checkbox" id="chkCienteAlteracoesPlano" style="width: 16px; height: 16px; margin: 0; accent-color: ${AZUL}; cursor: pointer; flex-shrink: 0;">
                <span>Estou ciente das alterações e desejo atualizar este plano.</span>
            </label>

            <!-- Ações -->
            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.25rem;">
                <button type="button" id="btnCancelarAlteracoesPlano" style="${BASE_BTN} min-width: 110px; background-color: #ffffff; border: 1px solid #cbd5e1; color: #334155; cursor: pointer;">
                    Cancelar
                </button>
                <button type="button" id="btnConfirmarAlteracoesPlano" disabled style="${BASE_BTN} background-color: ${AZUL_DESABILITADO}; border: 1px solid ${AZUL_DESABILITADO}; color: #ffffff; cursor: not-allowed;">
                    ${ICONE_CHECK}
                    Confirmar alterações
                </button>
            </div>
        </div>
    `;

    const fecharPadrao = () => {
        if (aoCancelar) aoCancelar();
        else window.location.hash = '#home';
    };

    const modal = criarModal({
        conteudoHTML,
        aoFechar: fecharPadrao
    });

    const caixa = modal.querySelector('.modal-conteudo');
    caixa.classList.add('modal-compacto');
    caixa.style.maxWidth = '640px'; // só neste modal

    const chkCiente = modal.querySelector('#chkCienteAlteracoesPlano');
    const btnConfirmar = modal.querySelector('#btnConfirmarAlteracoesPlano');
    const btnCancelar = modal.querySelector('#btnCancelarAlteracoesPlano');

    // O botão só habilita depois de marcar a ciência
    chkCiente.addEventListener('change', () => {
        const pronto = chkCiente.checked;
        btnConfirmar.disabled = !pronto;
        btnConfirmar.style.backgroundColor = pronto ? AZUL : AZUL_DESABILITADO;
        btnConfirmar.style.borderColor = pronto ? AZUL : AZUL_DESABILITADO;
        btnConfirmar.style.cursor = pronto ? 'pointer' : 'not-allowed';
    });

    btnConfirmar.addEventListener('mouseenter', () => { if (!btnConfirmar.disabled) btnConfirmar.style.backgroundColor = AZUL_HOVER; });
    btnConfirmar.addEventListener('mouseleave', () => { if (!btnConfirmar.disabled) btnConfirmar.style.backgroundColor = AZUL; });
    btnCancelar.addEventListener('mouseenter', () => btnCancelar.style.backgroundColor = '#f8fafc');
    btnCancelar.addEventListener('mouseleave', () => btnCancelar.style.backgroundColor = '#ffffff');

    btnCancelar.addEventListener('click', () => {
        modal.remove();
        fecharPadrao();
    });

    btnConfirmar.addEventListener('click', async () => {
        if (btnConfirmar.disabled) return;

        btnConfirmar.disabled = true;
        btnConfirmar.textContent = 'Salvando...';

        if (aoConfirmar) {
            await aoConfirmar();
        }

        modal.remove();
    });

    return modal;
}

export function abrirModalConfirmarAlteracoes(opcoes = {}) {
    const modal = renderModalConfirmarAlteracoes({
        ...opcoes,
        aoCancelar: () => {
            if (opcoes.aoCancelar) opcoes.aoCancelar();
        }
    });
    document.body.appendChild(modal);
}