import { criarModal } from '../components/modal.js';

const ICONE_INFO = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="11" x2="12" y2="17"></line>
        <line x1="12" y1="7.5" x2="12" y2="8"></line>
    </svg>
`;

const AZUL = '#1a3bc2';
const AZUL_HOVER = '#152f9c';

const BASE_BTN = 'height: 40px; padding: 0 1.5rem; border-radius: 8px; font-family: inherit; font-size: 0.8rem; font-weight: 600; cursor: pointer; box-sizing: border-box; transition: background-color 0.2s;';

// Evita injetar HTML vindo de dados do usuário
function escapar(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML;
}

/**
 * @param {Object} opcoes
 * @param {{nome: string, cargo?: string, vaga?: string}} [opcoes.candidato]
 * @param {{nome: string, status?: string}} [opcoes.etapaAtual] ex.: { nome: 'Triagem', status: 'Em andamento' }
 * @param {Array<{valor: string, nome: string, descricao?: string}>} [opcoes.etapas] etapas disponíveis para mover
 * @param {string} [opcoes.etapaSelecionada] valor da etapa pré-selecionada (padrão: a primeira)
 * @param {(dados: {etapa: string}) => (void|Promise<void>)} [opcoes.aoConfirmar]
 * @param {() => void} [opcoes.aoCancelar]
 */
export function renderModalMoverCandidato({
    candidato = {},
    etapaAtual = {},
    etapas = [],
    etapaSelecionada,
    aoConfirmar,
    aoCancelar
} = {}) {
    const selecionada = etapaSelecionada ?? etapas[0]?.valor;

    const detalheCandidato = [
        candidato.cargo,
        candidato.vaga ? `Vaga: ${candidato.vaga}` : ''
    ].filter(Boolean).join(' · ');

    const opcoesHTML = etapas.map((etapa, i) => {
        const marcada = etapa.valor === selecionada;
        return `
            <label data-opcao-etapa style="display: flex; align-items: flex-start; gap: 0.75rem; box-sizing: border-box; padding: 0.8rem 1rem; border: 1.5px solid ${marcada ? AZUL : '#e2e8f0'}; border-radius: 8px; background-color: ${marcada ? '#f5f8ff' : '#ffffff'}; cursor: pointer; transition: all 0.15s;">
                <input type="radio" name="etapaDestino" value="${escapar(etapa.valor)}" id="radioEtapaDestino${i}" ${marcada ? 'checked' : ''} style="width: 16px; height: 16px; margin: 2px 0 0 0; accent-color: ${AZUL}; cursor: pointer; flex-shrink: 0;">
                <span style="display: flex; flex-direction: column; gap: 0.15rem;">
                    <strong style="font-size: 0.8rem; color: #0f172a;">${escapar(etapa.nome)}</strong>
                    ${etapa.descricao ? `<span style="font-size: 0.68rem; color: #64748b;">${escapar(etapa.descricao)}</span>` : ''}
                </span>
            </label>
        `;
    }).join('');

    const conteudoHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem; font-family: 'Inter', sans-serif;">
            <!-- Cabeçalho -->
            <div style="display: flex; flex-direction: column; gap: 0.4rem; padding-right: 2rem;">
                <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700; color: #0f172a;">Mover candidato de etapa</h2>
                <p style="margin: 0; font-size: 0.78rem; color: #64748b;">Selecione a próxima etapa do processo seletivo para este candidato.</p>
            </div>

            <!-- Candidato -->
            <div style="display: flex; flex-direction: column; gap: 0.2rem; box-sizing: border-box; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc; padding: 0.85rem 1rem;">
                <strong style="font-size: 0.85rem; color: #0f172a;">${escapar(candidato.nome)}</strong>
                <span style="font-size: 0.7rem; color: #64748b;">${escapar(detalheCandidato)}</span>
            </div>

            <!-- Etapa atual -->
            <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                <span style="font-size: 0.75rem; font-weight: 700; color: #0f172a;">Etapa atual</span>
                <div style="display: flex; justify-content: space-between; align-items: center; box-sizing: border-box; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc; padding: 0.7rem 1rem; font-size: 0.78rem;">
                    <span style="color: #64748b;">${escapar(etapaAtual.nome)}</span>
                    <strong style="color: #b45309; font-size: 0.7rem;">${escapar(etapaAtual.status)}</strong>
                </div>
            </div>

            <!-- Mover para -->
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <span style="font-size: 0.75rem; font-weight: 700; color: #0f172a;">Mover para <span style="color: #dc2626;">*</span></span>
                ${opcoesHTML}
            </div>

            <!-- Aviso -->
            <div style="display: flex; align-items: center; gap: 0.5rem; box-sizing: border-box; border: 1px solid #dbeafe; border-radius: 8px; background-color: #eff6ff; padding: 0.7rem 1rem; font-size: 0.7rem; color: #475569; line-height: 1.4;">
                <span style="color: ${AZUL}; display: flex; flex-shrink: 0;">${ICONE_INFO}</span>
                <span><strong style="color: #0f172a;">Atenção:</strong> ao mover o candidato, a etapa atual será encerrada e o candidato passará a acompanhar a nova etapa do processo.</span>
            </div>

            <!-- Ações -->
            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                <button type="button" id="btnCancelarMoverCandidato" style="${BASE_BTN} background-color: #ffffff; border: 1.5px solid ${AZUL}; color: ${AZUL};">
                    Cancelar
                </button>
                <button type="button" id="btnConfirmarMoverCandidato" ${selecionada === undefined ? 'disabled' : ''} style="${BASE_BTN} background-color: ${AZUL}; border: 1.5px solid ${AZUL}; color: #ffffff;">
                    Mover candidato
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

    const btnConfirmar = modal.querySelector('#btnConfirmarMoverCandidato');
    const btnCancelar = modal.querySelector('#btnCancelarMoverCandidato');
    const radios = modal.querySelectorAll('input[name="etapaDestino"]');

    // Destaca o card da opção marcada
    const atualizarSelecao = () => {
        modal.querySelectorAll('[data-opcao-etapa]').forEach((card) => {
            const marcada = card.querySelector('input').checked;
            card.style.borderColor = marcada ? AZUL : '#e2e8f0';
            card.style.backgroundColor = marcada ? '#f5f8ff' : '#ffffff';
        });
    };
    radios.forEach((radio) => radio.addEventListener('change', atualizarSelecao));

    btnConfirmar.addEventListener('mouseenter', () => { if (!btnConfirmar.disabled) btnConfirmar.style.backgroundColor = AZUL_HOVER; });
    btnConfirmar.addEventListener('mouseleave', () => { if (!btnConfirmar.disabled) btnConfirmar.style.backgroundColor = AZUL; });
    btnCancelar.addEventListener('mouseenter', () => btnCancelar.style.backgroundColor = '#eff3ff');
    btnCancelar.addEventListener('mouseleave', () => btnCancelar.style.backgroundColor = '#ffffff');

    btnCancelar.addEventListener('click', () => {
        modal.remove();
        fecharPadrao();
    });

    btnConfirmar.addEventListener('click', async () => {
        const marcado = modal.querySelector('input[name="etapaDestino"]:checked');
        if (!marcado) return;

        btnConfirmar.disabled = true;
        btnConfirmar.textContent = 'Movendo...';

        if (aoConfirmar) {
            await aoConfirmar({ etapa: marcado.value });
        }

        modal.remove();
    });

    return modal;
}

export function abrirModalMoverCandidato(opcoes = {}) {
    const modal = renderModalMoverCandidato({
        ...opcoes,
        aoCancelar: () => {
            if (opcoes.aoCancelar) opcoes.aoCancelar();
        }
    });
    document.body.appendChild(modal);
}