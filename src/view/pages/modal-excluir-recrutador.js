import { criarModal } from '../components/modal.js';

const ICONE_LIXEIRA = (tamanho) => `
    <svg width="${tamanho}" height="${tamanho}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 7h16"></path>
        <path d="M9 7V4.5h6V7"></path>
        <path d="M6 7l1 13h10l1-13"></path>
    </svg>
`;

const BASE_BTN = 'flex: 1; height: 36px; border-radius: 6px; font-family: inherit; font-size: 1rem; font-weight: 500; cursor: pointer; box-sizing: border-box; display: flex; justify-content: center; align-items: center; gap: 0.5rem; transition: background-color 0.2s;';

export function renderModalExcluirRecrutador({ aoConfirmar, aoCancelar } = {}) {
    const conteudoHTML = `
        <div style="display: flex; flex-direction: column; gap: 2rem; font-family: 'Inter', sans-serif;">
            <!-- Cabeçalho: ícone + título -->
            <div style="display: flex; align-items: center; gap: 1.5rem;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #fde8e8; color: #e05555; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                    ${ICONE_LIXEIRA(18)}
                </div>
                <h2 style="margin: 0; padding-right: 1.5rem; font-size: 1.2rem; font-weight: 700; color: #1b1f4b; line-height: 1.35;">
                    Tem certeza que deseja excluir este recrutador?
                </h2>
            </div>

            <!-- Botões alinhados ao início do título -->
            <div style="display: flex; gap: 3rem; padding-left: 4rem; width: 100%; box-sizing: border-box;">
                <button type="button" id="btnCancelarExclusaoRecrutador" style="${BASE_BTN} background-color: #ffffff; border: 1px solid #6b7280; color: #6b7280;">
                    Cancelar
                </button>
                <button type="button" id="btnConfirmarExclusaoRecrutador" style="${BASE_BTN} background-color: #e05555; border: 1px solid #e05555; color: #ffffff;">
                    ${ICONE_LIXEIRA(16)}
                    Excluir
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
    caixa.style.maxWidth = '560px'; // só neste modal

    const btnConfirmar = modal.querySelector('#btnConfirmarExclusaoRecrutador');
    const btnCancelar = modal.querySelector('#btnCancelarExclusaoRecrutador');

    btnConfirmar.addEventListener('mouseenter', () => btnConfirmar.style.backgroundColor = '#c94444');
    btnConfirmar.addEventListener('mouseleave', () => btnConfirmar.style.backgroundColor = '#e05555');
    btnCancelar.addEventListener('mouseenter', () => btnCancelar.style.backgroundColor = '#f8fafc');
    btnCancelar.addEventListener('mouseleave', () => btnCancelar.style.backgroundColor = '#ffffff');

    btnCancelar.addEventListener('click', () => {
        modal.remove();
        fecharPadrao();
    });

    btnConfirmar.addEventListener('click', async () => {
        btnConfirmar.disabled = true;
        btnConfirmar.textContent = 'Excluindo...';

        if (aoConfirmar) {
            await aoConfirmar();
        }

        modal.remove();
    });

    return modal;
}

export function abrirModalExcluirRecrutador(opcoes = {}) {
    const modal = renderModalExcluirRecrutador({
        ...opcoes,
        aoCancelar: () => {
            if (opcoes.aoCancelar) opcoes.aoCancelar();
        }
    });
    document.body.appendChild(modal);
}