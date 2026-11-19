import { criarModal } from '../components/modal.js';

const ICONE_ALERTA = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="7" x2="12" y2="13"></line>
        <line x1="12" y1="16.5" x2="12" y2="17"></line>
    </svg>
`;

const ICONE_BLOQUEIO = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle>
        <line x1="5.6" y1="5.6" x2="18.4" y2="18.4"></line>
    </svg>
`;

const BASE_BTN = 'height: 40px; padding: 0 1.25rem; border-radius: 8px; font-family: inherit; font-size: 0.875rem; font-weight: 600; cursor: pointer; box-sizing: border-box; display: flex; align-items: center; gap: 0.5rem; transition: background-color 0.2s;';
const BASE_CAMPO = 'width: 100%; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 8px; background-color: #ffffff; font-family: inherit; font-size: 0.85rem; color: #0f172a; outline: none;';

/**
 * @param {Object} opcoes
 * @param {string[]} [opcoes.motivos] lista de motivos do select (ex.: ['Violação dos termos', ...])
 * @param {(dados: {motivo: string, observacoes: string}) => (void|Promise<void>)} [opcoes.aoConfirmar]
 * @param {() => void} [opcoes.aoCancelar]
 */
export function renderModalBloquearUsuario({ motivos = [], aoConfirmar, aoCancelar } = {}) {
    const conteudoHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem; font-family: 'Inter', sans-serif;">
            <!-- Cabeçalho -->
            <div style="display: flex; flex-direction: column; gap: 0.5rem; padding-right: 2rem;">
                <h2 style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #0f172a;">Bloquear usuário</h2>
                <p style="margin: 0; font-size: 0.9rem; color: #334155;">Tem certeza que deseja bloquear este usuário?</p>
                <p style="margin: 0; font-size: 0.8rem; color: #64748b; line-height: 1.45;">
                    O usuário não poderá mais acessar a plataforma, mas seus dados serão mantidos no sistema. Você poderá desbloqueá-lo a qualquer momento.
                </p>
            </div>

            <!-- Aviso -->
            <div class="modal-box-aviso-perigo">
                <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: #dc2626;">
                    ${ICONE_ALERTA}
                    <span>O que acontece ao bloquear esta conta?</span>
                </div>
                <ul>
                    <li>O usuário será desconectado imediatamente.</li>
                    <li>Não poderá acessar a plataforma.</li>
                    <li>Todos os recursos ficarão indisponíveis para ele.</li>
                    <li>Os dados e histórico serão mantidos no sistema.</li>
                </ul>
            </div>

            <!-- Motivo -->
            <div class="modal-campo-confirmacao">
                <label for="selectMotivoBloqueio">Motivo do bloqueio <span style="color: #dc2626;">*</span></label>
                <select id="selectMotivoBloqueio" style="${BASE_CAMPO} height: 40px; padding: 0 0.75rem; color: #64748b; cursor: pointer;">
                    <option value="">Selecione um motivo</option>
                </select>
            </div>

            <!-- Observações -->
            <div class="modal-campo-confirmacao">
                <label for="txtObservacoesBloqueio">Observações <span style="color: #94a3b8; font-weight: 400;">(opcional)</span></label>
                <textarea id="txtObservacoesBloqueio" rows="3" placeholder="Digite uma observação..." style="${BASE_CAMPO} padding: 0.65rem 0.75rem; resize: vertical; min-height: 80px;"></textarea>
            </div>

            <!-- Ações -->
            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.25rem;">
                <button type="button" id="btnCancelarBloqueio" style="${BASE_BTN} background-color: #ffffff; border: 1px solid #cbd5e1; color: #334155;">
                    Cancelar
                </button>
                <button type="button" id="btnConfirmarBloqueio" style="${BASE_BTN} background-color: #e53935; border: 1px solid #e53935; color: #ffffff;">
                    ${ICONE_BLOQUEIO}
                    Bloquear usuário
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

    const selectMotivo = modal.querySelector('#selectMotivoBloqueio');
    const txtObservacoes = modal.querySelector('#txtObservacoesBloqueio');
    const btnConfirmar = modal.querySelector('#btnConfirmarBloqueio');
    const btnCancelar = modal.querySelector('#btnCancelarBloqueio');

    motivos.forEach((motivo) => {
        const opcao = document.createElement('option');
        opcao.value = motivo;
        opcao.textContent = motivo;
        selectMotivo.appendChild(opcao);
    });

    selectMotivo.addEventListener('change', () => {
        selectMotivo.style.borderColor = '#cbd5e1';
        selectMotivo.style.color = selectMotivo.value ? '#0f172a' : '#64748b';
    });

    btnConfirmar.addEventListener('mouseenter', () => { if (!btnConfirmar.disabled) btnConfirmar.style.backgroundColor = '#c62828'; });
    btnConfirmar.addEventListener('mouseleave', () => { if (!btnConfirmar.disabled) btnConfirmar.style.backgroundColor = '#e53935'; });
    btnCancelar.addEventListener('mouseenter', () => btnCancelar.style.backgroundColor = '#f8fafc');
    btnCancelar.addEventListener('mouseleave', () => btnCancelar.style.backgroundColor = '#ffffff');

    btnCancelar.addEventListener('click', () => {
        modal.remove();
        fecharPadrao();
    });

    btnConfirmar.addEventListener('click', async () => {
        // Motivo é obrigatório
        if (!selectMotivo.value) {
            selectMotivo.style.borderColor = '#dc2626';
            selectMotivo.focus();
            return;
        }

        btnConfirmar.disabled = true;
        btnConfirmar.textContent = 'Bloqueando...';

        if (aoConfirmar) {
            await aoConfirmar({
                motivo: selectMotivo.value,
                observacoes: txtObservacoes.value.trim()
            });
        }

        modal.remove();
    });

    return modal;
}

export function abrirModalBloquearUsuario(opcoes = {}) {
    const modal = renderModalBloquearUsuario({
        ...opcoes,
        aoCancelar: () => {
            if (opcoes.aoCancelar) opcoes.aoCancelar();
        }
    });
    document.body.appendChild(modal);
}