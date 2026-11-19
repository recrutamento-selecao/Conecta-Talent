import { criarModal } from '../components/modal.js';

const ICONE_ALERTA = `
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="7" x2="12" y2="13"></line>
        <line x1="12" y1="16.5" x2="12" y2="17"></line>
    </svg>
`;

const ICONE_LIXEIRA = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 7h16"></path>
        <path d="M9 7V4.5h6V7"></path>
        <path d="M6 7l1 13h10l1-13"></path>
    </svg>
`;

const PALAVRA_CONFIRMACAO = 'EXCLUIR';

const BASE_BTN = 'height: 40px; padding: 0 1.25rem; border-radius: 8px; font-family: inherit; font-size: 0.875rem; font-weight: 600; box-sizing: border-box; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: background-color 0.2s;';
const BASE_CAMPO = 'width: 100%; box-sizing: border-box; height: 40px; padding: 0 0.75rem; border: 1px solid #cbd5e1; border-radius: 8px; background-color: #ffffff; font-family: inherit; font-size: 0.85rem; color: #0f172a;';

/**
 * @param {Object} opcoes
 * @param {string[]} [opcoes.motivos] lista de motivos do select
 * @param {(dados: {motivo: string}) => (void|Promise<void>)} [opcoes.aoConfirmar]
 * @param {() => void} [opcoes.aoCancelar]
 */
export function renderModalExcluirUsuario({ motivos = [], aoConfirmar, aoCancelar } = {}) {
    const conteudoHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem; font-family: 'Inter', sans-serif;">
            <!-- Cabeçalho -->
            <div style="display: flex; flex-direction: column; gap: 0.5rem; padding-right: 2rem;">
                <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700; color: #0f172a;">Excluir usuário</h2>
                <p style="margin: 0; font-size: 0.95rem; color: #334155;">Tem certeza que deseja excluir este usuário?</p>
                <p style="margin: 0; font-size: 0.8rem; color: #64748b; line-height: 1.45;">
                    Esta ação é permanente e não poderá ser desfeita. A conta será removida da plataforma conforme as regras de retenção de dados do sistema.
                </p>
            </div>

            <!-- Aviso -->
            <div class="modal-box-aviso-perigo" style="display: flex; align-items: flex-start; gap: 0.85rem;">
                <div style="color: #dc2626; flex-shrink: 0; display: flex;">${ICONE_ALERTA}</div>
                <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <strong style="color: #dc2626;">Atenção: esta ação é permanente</strong>
                    <span>A exclusão poderá remover ou desvincular os dados relacionados à conta, incluindo acesso à plataforma, informações do perfil e histórico associado ao usuário.</span>
                </div>
            </div>

            <!-- Motivo -->
            <div class="modal-campo-confirmacao">
                <label for="selectMotivoExclusaoUsuario" style="font-weight: 700; color: #0f172a;">Motivo da exclusão <span style="color: #dc2626;">*</span></label>
                <select id="selectMotivoExclusaoUsuario" style="${BASE_CAMPO} color: #64748b; cursor: pointer; outline: none;">
                    <option value="">Selecione um motivo</option>
                </select>
            </div>

            <!-- Confirmação digitada -->
            <div class="modal-campo-confirmacao">
                <label for="inputConfirmacaoExclusaoUsuario" style="font-weight: 700; color: #0f172a;">Confirmação <span style="color: #dc2626;">*</span></label>
                <input type="text" id="inputConfirmacaoExclusaoUsuario" placeholder="Digite ${PALAVRA_CONFIRMACAO} para confirmar" autocomplete="off" style="width: 100%; box-sizing: border-box; height: 40px; font-family: inherit;">
            </div>

            <!-- Ciência -->
            <label style="display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.8rem; color: #475569; line-height: 1.4; cursor: pointer; padding-left: 0.25rem;">
                <input type="checkbox" id="chkCienteExclusaoUsuario" style="width: 16px; height: 16px; margin: 2px 0 0 0; accent-color: #dc2626; cursor: pointer; flex-shrink: 0;">
                <span>Estou ciente de que a exclusão da conta é uma ação permanente e desejo prosseguir.</span>
            </label>

            <!-- Ações -->
            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.25rem;">
                <button type="button" id="btnCancelarExclusaoUsuario" style="${BASE_BTN} background-color: #ffffff; border: 1px solid #cbd5e1; color: #334155; cursor: pointer;">
                    Cancelar
                </button>
                <button type="button" id="btnConfirmarExclusaoUsuario" disabled style="${BASE_BTN} background-color: #f4a3a1; border: 1px solid #f4a3a1; color: #ffffff; cursor: not-allowed;">
                    ${ICONE_LIXEIRA}
                    Excluir usuário
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
    caixa.style.maxWidth = '600px'; // só neste modal

    const selectMotivo = modal.querySelector('#selectMotivoExclusaoUsuario');
    const inputConfirmacao = modal.querySelector('#inputConfirmacaoExclusaoUsuario');
    const chkCiente = modal.querySelector('#chkCienteExclusaoUsuario');
    const btnConfirmar = modal.querySelector('#btnConfirmarExclusaoUsuario');
    const btnCancelar = modal.querySelector('#btnCancelarExclusaoUsuario');

    motivos.forEach((motivo) => {
        const opcao = document.createElement('option');
        opcao.value = motivo;
        opcao.textContent = motivo;
        selectMotivo.appendChild(opcao);
    });

    // O botão só habilita com motivo escolhido, palavra digitada e checkbox marcado
    const atualizarBotao = () => {
        const pronto =
            selectMotivo.value !== '' &&
            inputConfirmacao.value.trim() === PALAVRA_CONFIRMACAO &&
            chkCiente.checked;

        btnConfirmar.disabled = !pronto;
        btnConfirmar.style.backgroundColor = pronto ? '#e53935' : '#f4a3a1';
        btnConfirmar.style.borderColor = pronto ? '#e53935' : '#f4a3a1';
        btnConfirmar.style.cursor = pronto ? 'pointer' : 'not-allowed';
    };

    selectMotivo.addEventListener('change', () => {
        selectMotivo.style.color = selectMotivo.value ? '#0f172a' : '#64748b';
        atualizarBotao();
    });
    inputConfirmacao.addEventListener('input', atualizarBotao);
    chkCiente.addEventListener('change', atualizarBotao);

    btnConfirmar.addEventListener('mouseenter', () => { if (!btnConfirmar.disabled) btnConfirmar.style.backgroundColor = '#c62828'; });
    btnConfirmar.addEventListener('mouseleave', () => { if (!btnConfirmar.disabled) btnConfirmar.style.backgroundColor = '#e53935'; });
    btnCancelar.addEventListener('mouseenter', () => btnCancelar.style.backgroundColor = '#f8fafc');
    btnCancelar.addEventListener('mouseleave', () => btnCancelar.style.backgroundColor = '#ffffff');

    btnCancelar.addEventListener('click', () => {
        modal.remove();
        fecharPadrao();
    });

    btnConfirmar.addEventListener('click', async () => {
        if (btnConfirmar.disabled) return;

        btnConfirmar.disabled = true;
        btnConfirmar.textContent = 'Excluindo...';

        if (aoConfirmar) {
            await aoConfirmar({ motivo: selectMotivo.value });
        }

        modal.remove();
    });

    return modal;
}

export function abrirModalExcluirUsuario(opcoes = {}) {
    const modal = renderModalExcluirUsuario({
        ...opcoes,
        aoCancelar: () => {
            if (opcoes.aoCancelar) opcoes.aoCancelar();
        }
    });
    document.body.appendChild(modal);
}   