import { criarModal } from '../components/modal.js';

const ICONE_CHECK = `
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="14" fill="#dc2626"></circle>
        <path d="M8.5 14.2l3.8 3.8 7.2-8" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
`;

const ICONE_EMPRESA = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2"></rect>
        <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01"></path>
    </svg>
`;

// Evita injetar HTML vindo de dados do usuário; mantém quebras de linha
function escapar(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML.replace(/\n/g, '<br>');
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
 * @param {string} [opcoes.nome] nome do usuário excluído
 * @param {string} [opcoes.tipo] tipo do usuário (Empresa, Recrutador, Candidato)
 * @param {string} [opcoes.dataExclusao] já formatada; se omitida, usa a data/hora atual
 * @param {string} [opcoes.motivo]
 * @param {string} [opcoes.observacoes] aceita quebras de linha (\n)
 * @param {() => void} [opcoes.aoFechar]
 */
export function renderModalExclusaoSucesso({ nome = '', tipo = '', dataExclusao, motivo = '', observacoes = '', aoFechar } = {}) {
    const linha = (rotulo, valor) => `
        <div style="display: grid; grid-template-columns: 7.5rem 1fr; gap: 0.75rem; font-size: 0.75rem; line-height: 1.5;">
            <span style="color: #64748b;">${rotulo}</span>
            <strong style="color: #0f172a; font-weight: 600;">${escapar(valor) || '—'}</strong>
        </div>
    `;

    const conteudoHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; font-family: 'Inter', sans-serif;">
            <!-- Ícone de sucesso -->
            <div style="width: 84px; height: 84px; border-radius: 50%; background-color: #fecdd3; display: flex; justify-content: center; align-items: center; margin-top: 0.5rem;">
                ${ICONE_CHECK}
            </div>

            <!-- Textos -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; text-align: center;">
                <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700; color: #0f172a;">Usuário excluído com sucesso!</h2>
                <p style="margin: 0; font-size: 0.85rem; color: #64748b; line-height: 1.5;">
                    A conta do usuário foi removida permanentemente<br>da plataforma. Essa ação não pode ser desfeita.
                </p>
            </div>

            <!-- Resumo -->
            <div style="width: 100%; box-sizing: border-box; border: 1px solid #dbe7fb; border-radius: 10px; background-color: #f5f9ff; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #dbeafe; color: #3b5bdb; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                        ${ICONE_EMPRESA}
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <strong style="font-size: 0.85rem; color: #0f172a;">${escapar(nome)}</strong>
                        <span style="font-size: 0.7rem; color: #64748b;">${escapar(tipo)}</span>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.45rem; padding-left: 2.75rem;">
                    ${linha('Data da exclusão', dataExclusao || formatarDataHora())}
                    ${linha('Motivo', motivo)}
                    ${linha('Observações', observacoes)}
                </div>
            </div>

            <!-- Ação -->
            <button type="button" id="btnFecharExclusaoSucesso" style="height: 40px; padding: 0 2.75rem; margin-top: 0.25rem; background-color: #1a3bc2; border: 1px solid #1a3bc2; border-radius: 8px; color: #ffffff; font-family: inherit; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s;">
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

    const btnFechar = modal.querySelector('#btnFecharExclusaoSucesso');
    btnFechar.addEventListener('mouseenter', () => btnFechar.style.backgroundColor = '#152f9c');
    btnFechar.addEventListener('mouseleave', () => btnFechar.style.backgroundColor = '#1a3bc2');
    btnFechar.addEventListener('click', () => {
        modal.remove();
        fecharPadrao();
    });

    return modal;
}

export function abrirModalExclusaoSucesso(opcoes = {}) {
    const modal = renderModalExclusaoSucesso(opcoes);
    document.body.appendChild(modal);
}