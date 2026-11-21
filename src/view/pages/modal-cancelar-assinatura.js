import { criarModal } from '../components/modal.js';

const AZUL = '#1a3bc2';
const VERMELHO = '#e53935';
const VERMELHO_HOVER = '#c62828';
const BORDA = '#cbd5e1';

// Motivos do print; podem ser trocados pelo parâmetro `motivos`
const MOTIVOS_PADRAO = [
    { valor: 'nao-utilizo', nome: 'Não estou utilizando a plataforma' },
    { valor: 'custo-alto', nome: 'O custo é muito alto' },
    { valor: 'outra-solucao', nome: 'Vou migrar para outra solução' },
    { valor: 'problemas-tecnicos', nome: 'Problemas técnicos' },
    { valor: 'outro', nome: 'Outro motivo' }
];

const ICONE_ALERTA = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="7" x2="12" y2="13"></line>
        <line x1="12" y1="16.5" x2="12" y2="17"></line>
    </svg>
`;

const BASE_BTN = 'height: 40px; padding: 0 1.5rem; border-radius: 8px; font-family: inherit; font-size: 0.8rem; font-weight: 600; cursor: pointer; box-sizing: border-box; transition: background-color 0.2s;';

// Evita injetar HTML vindo de dados do usuário
function escapar(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML;
}

/**
 * @param {Object} opcoes
 * @param {string} [opcoes.dataFimPeriodo] ex.: '05/10/2026' (fim do período já pago)
 * @param {string} [opcoes.planoDestino] plano para o qual a conta volta (padrão 'Gratuito')
 * @param {number} [opcoes.diasRetencao] dias de retenção dos dados (padrão 90)
 * @param {Array<{valor: string, nome: string}>} [opcoes.motivos]
 * @param {(dados: {motivo: string, feedback: string}) => (void|Promise<void>)} [opcoes.aoConfirmar]
 * @param {() => void} [opcoes.aoVoltar] botão Voltar, X e clique no fundo
 */
export function renderModalCancelarAssinatura({
    dataFimPeriodo = '',
    planoDestino = 'Gratuito',
    diasRetencao = 90,
    motivos = MOTIVOS_PADRAO,
    aoConfirmar,
    aoVoltar
} = {}) {
    const opcoesHTML = motivos.map((motivo, i) => `
        <label data-opcao-motivo style="display: flex; align-items: center; gap: 0.75rem; box-sizing: border-box; padding: 0.75rem 1rem; border: 1px solid #e2e8f0; border-radius: 6px; background-color: #ffffff; cursor: pointer; transition: all 0.15s;">
            <input type="radio" name="motivoCancelamento" value="${escapar(motivo.valor)}" id="radioMotivoCancelamento${i}" style="width: 16px; height: 16px; margin: 0; accent-color: ${AZUL}; cursor: pointer; flex-shrink: 0;">
            <span style="font-size: 0.78rem; color: #0f172a;">${escapar(motivo.nome)}</span>
        </label>
    `).join('');

    const conteudoHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem; font-family: 'Inter', sans-serif;">
            <!-- Cabeçalho -->
            <div style="display: flex; flex-direction: column; gap: 0.5rem; padding-right: 2rem;">
                <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700; color: #0f172a;">Cancelar assinatura</h2>
                <p style="margin: 0; font-size: 0.78rem; color: #64748b; line-height: 1.5;">
                    Lamentamos que você queira cancelar sua assinatura. Antes de confirmar, queremos entender o motivo e informar alguns detalhes importantes.
                </p>
            </div>

            <!-- Aviso -->
            <div class="modal-box-aviso-perigo">
                <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: #dc2626;">
                    ${ICONE_ALERTA}
                    <span>Ao cancelar sua assinatura:</span>
                </div>
                <ul>
                    <li>Seu plano permanecerá ativo até o final do período atual (${escapar(dataFimPeriodo)}).</li>
                    <li>Após essa data, sua conta será automaticamente alterada para o plano <strong>${escapar(planoDestino)}</strong>.</li>
                    <li>Recursos exclusivos do plano atual serão desativados.</li>
                    <li>Seus dados e histórico serão mantidos por ${escapar(String(diasRetencao))} dias.</li>
                </ul>
            </div>

            <!-- Motivo -->
            <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                <span id="rotuloMotivoCancelamento" style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">Qual o motivo do cancelamento?</span>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${opcoesHTML}
                </div>
            </div>

            <!-- Feedback -->
            <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                <label for="txtFeedbackCancelamento" style="font-size: 0.75rem; font-weight: 700; color: #0f172a;">
                    Conte-nos mais <span style="font-weight: 400; color: #94a3b8;">(opcional)</span>
                </label>
                <textarea id="txtFeedbackCancelamento" rows="3" placeholder="Digite seu feedback aqui..." style="width: 100%; box-sizing: border-box; min-height: 80px; padding: 0.65rem 0.75rem; border: 1px solid ${BORDA}; border-radius: 6px; background-color: #ffffff; font-family: inherit; font-size: 0.78rem; color: #0f172a; outline: none; resize: vertical;"></textarea>
            </div>

            <!-- Ações -->
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; margin-top: 0.25rem;">
                <button type="button" id="btnVoltarCancelamento" style="${BASE_BTN} background-color: #ffffff; border: 1px solid ${BORDA}; color: #334155;">
                    Voltar
                </button>
                <button type="button" id="btnConfirmarCancelamento" style="${BASE_BTN} background-color: ${VERMELHO}; border: 1px solid ${VERMELHO}; color: #ffffff;">
                    Confirmar cancelamento
                </button>
            </div>
        </div>
    `;

    const fecharPadrao = () => {
        if (aoVoltar) aoVoltar();
        else window.location.hash = '#home';
    };

    const modal = criarModal({
        conteudoHTML,
        aoFechar: fecharPadrao
    });

    const caixa = modal.querySelector('.modal-conteudo');
    caixa.classList.add('modal-compacto');
    caixa.style.maxWidth = '620px'; // só neste modal
    caixa.style.maxHeight = '92vh';
    caixa.style.overflowY = 'auto';

    const rotuloMotivo = modal.querySelector('#rotuloMotivoCancelamento');
    const txtFeedback = modal.querySelector('#txtFeedbackCancelamento');
    const btnConfirmar = modal.querySelector('#btnConfirmarCancelamento');
    const btnVoltar = modal.querySelector('#btnVoltarCancelamento');
    const radios = modal.querySelectorAll('input[name="motivoCancelamento"]');

    // Destaca a opção marcada
    const atualizarSelecao = () => {
        modal.querySelectorAll('[data-opcao-motivo]').forEach((card) => {
            const marcada = card.querySelector('input').checked;
            card.style.borderColor = marcada ? AZUL : '#e2e8f0';
            card.style.backgroundColor = marcada ? '#eff4ff' : '#ffffff';
        });
        rotuloMotivo.style.color = '#0f172a';
    };
    radios.forEach((radio) => radio.addEventListener('change', atualizarSelecao));

    btnConfirmar.addEventListener('mouseenter', () => { if (!btnConfirmar.disabled) btnConfirmar.style.backgroundColor = VERMELHO_HOVER; });
    btnConfirmar.addEventListener('mouseleave', () => { if (!btnConfirmar.disabled) btnConfirmar.style.backgroundColor = VERMELHO; });
    btnVoltar.addEventListener('mouseenter', () => btnVoltar.style.backgroundColor = '#f8fafc');
    btnVoltar.addEventListener('mouseleave', () => btnVoltar.style.backgroundColor = '#ffffff');

    btnVoltar.addEventListener('click', () => {
        modal.remove();
        fecharPadrao();
    });

    btnConfirmar.addEventListener('click', async () => {
        const marcado = modal.querySelector('input[name="motivoCancelamento"]:checked');

        // O motivo é obrigatório
        if (!marcado) {
            rotuloMotivo.style.color = '#dc2626';
            rotuloMotivo.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            return;
        }

        btnConfirmar.disabled = true;
        btnConfirmar.textContent = 'Cancelando...';

        if (aoConfirmar) {
            await aoConfirmar({
                motivo: marcado.value,
                feedback: txtFeedback.value.trim()
            });
        }

        modal.remove();
    });

    return modal;
}

export function abrirModalCancelarAssinatura(opcoes = {}) {
    const modal = renderModalCancelarAssinatura({
        ...opcoes,
        aoVoltar: () => {
            if (opcoes.aoVoltar) opcoes.aoVoltar();
        }
    });
    document.body.appendChild(modal);
}