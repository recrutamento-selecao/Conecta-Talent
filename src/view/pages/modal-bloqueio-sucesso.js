import { criarModal } from '../components/modal.js';

const ICONE_USUARIO_OK = `
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="22" cy="14" r="6.5" stroke="#16a34a" stroke-width="2.5"></circle>
        <path d="M9 36c0-6.5 5.8-11 13-11" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round"></path>
        <circle cx="33" cy="33" r="9" fill="#16a34a"></circle>
        <path d="M28.8 33.2l3 3 5-5.6" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
`;

const ICONE_EMPRESA = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2"></rect>
        <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01"></path>
    </svg>
`;

const ICONE_SETA = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14"></path>
        <path d="M13 6l6 6-6 6"></path>
    </svg>
`;

const BADGE = 'display: inline-block; padding: 0.2rem 0.75rem; border-radius: 999px; font-size: 0.7rem; font-weight: 600;';

// Evita injetar HTML vindo de dados do usuário (ex.: observações)
function escapar(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML;
}

function formatarDataHora(data = new Date()) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const min = String(data.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${data.getFullYear()} às ${hora}:${min}`;
}

/**
 * @param {Object} opcoes
 * @param {string} [opcoes.nome] nome do usuário bloqueado
 * @param {string} [opcoes.tipo] tipo do usuário (Empresa, Recrutador, Candidato)
 * @param {string} [opcoes.dataBloqueio] já formatada; se omitida, usa a data/hora atual
 * @param {string} [opcoes.motivo]
 * @param {string} [opcoes.observacoes]
 * @param {() => void} [opcoes.aoFechar]
 */
export function renderModalBloqueioSucesso({ nome = '', tipo = '', dataBloqueio, motivo = '', observacoes = '', aoFechar } = {}) {
    const linha = (rotulo, valor) => `
        <div style="display: grid; grid-template-columns: 8.5rem 1fr; gap: 0.75rem; font-size: 0.75rem;">
            <span style="color: #64748b;">${rotulo}</span>
            <strong style="color: #0f172a; font-weight: 600;">${escapar(valor) || '—'}</strong>
        </div>
    `;

    const conteudoHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; font-family: 'Inter', sans-serif;">
            <!-- Ícone de sucesso -->
            <div style="width: 84px; height: 84px; border-radius: 50%; background-color: #d1fae5; display: flex; justify-content: center; align-items: center; margin-top: 0.5rem;">
                ${ICONE_USUARIO_OK}
            </div>

            <!-- Textos -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; text-align: center;">
                <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700; color: #0f172a;">Usuário bloqueado com sucesso!</h2>
                <p style="margin: 0; font-size: 0.85rem; color: #64748b; line-height: 1.5;">
                    O usuário não poderá mais acessar a plataforma.<br>Você pode desbloqueá-lo a qualquer momento.
                </p>
            </div>

            <!-- Resumo -->
            <div style="width: 100%; box-sizing: border-box; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #f8fafc; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.5rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 32px; height: 32px; border-radius: 8px; background-color: #dbeafe; color: #3b5bdb; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                            ${ICONE_EMPRESA}
                        </div>
                        <div style="display: flex; flex-direction: column;">
                            <strong style="font-size: 0.85rem; color: #0f172a;">${escapar(nome)}</strong>
                            <span style="font-size: 0.7rem; color: #64748b;">${escapar(tipo)}</span>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="${BADGE} background-color: #d1fae5; color: #15803d;">Ativo</span>
                        ${ICONE_SETA}
                        <span style="${BADGE} background-color: #fee2e2; color: #dc2626;">Bloqueado</span>
                    </div>
                </div>

                <div style="border-top: 1px solid #e2e8f0;"></div>

                <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                    ${linha('Data do bloqueio', dataBloqueio || formatarDataHora())}
                    ${linha('Motivo', motivo)}
                    ${linha('Observações', observacoes)}
                </div>
            </div>

            <!-- Ação -->
            <button type="button" id="btnFecharBloqueioSucesso" style="height: 40px; padding: 0 2.75rem; margin-top: 0.25rem; background-color: #1a3bc2; border: 1px solid #1a3bc2; border-radius: 8px; color: #ffffff; font-family: inherit; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s;">
                Fechar
            </button>
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

    const btnFechar = modal.querySelector('#btnFecharBloqueioSucesso');
    btnFechar.addEventListener('mouseenter', () => btnFechar.style.backgroundColor = '#152f9c');
    btnFechar.addEventListener('mouseleave', () => btnFechar.style.backgroundColor = '#1a3bc2');
    btnFechar.addEventListener('click', () => {
        modal.remove();
        fecharPadrao();
    });

    return modal;
}

export function abrirModalBloqueioSucesso(opcoes = {}) {
    const modal = renderModalBloqueioSucesso(opcoes);
    document.body.appendChild(modal);
}