import { criarModal } from '../components/modal.js';

const ICONE_CHECK = `
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
    </svg>
`;

// Evita injetar HTML vindo de dados do usuário
function escapar(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML;
}

const moeda = (valor) =>
    typeof valor === 'number'
        ? valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : String(valor ?? '');

// Números viram "Até 1.000"; textos passam como vieram
const limite = (valor) =>
    typeof valor === 'number' ? `Até ${valor.toLocaleString('pt-BR')}` : String(valor ?? '');

/**
 * @param {Object} opcoes
 * @param {Object} [opcoes.plano]
 * @param {string} [opcoes.plano.nome]
 * @param {number|string} [opcoes.plano.precoMensal] número (179.9) ou texto já formatado
 * @param {number|string} [opcoes.plano.precoAnual]
 * @param {number|string} [opcoes.plano.recrutadores]
 * @param {number|string} [opcoes.plano.vagas]
 * @param {number|string} [opcoes.plano.candidatos]
 * @param {string} [opcoes.plano.status] padrão 'Ativo'
 * @param {() => void} [opcoes.aoIrParaPlanos] ação do botão "Ir para Gerenciar Planos"
 * @param {() => void} [opcoes.aoFechar] X e clique no fundo
 */
export function renderModalPlanoAtualizado({ plano = {}, aoIrParaPlanos, aoFechar } = {}) {
    const { nome, precoMensal, precoAnual, recrutadores, vagas, candidatos, status = 'Ativo' } = plano;

    const ativo = String(status).toLowerCase() === 'ativo';
    const badgeStatus = `
        <span style="display: inline-block; padding: 0.2rem 0.65rem; border-radius: 999px; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; background-color: ${ativo ? '#dcfce7' : '#e2e8f0'}; color: ${ativo ? '#15803d' : '#475569'}; border: 1px solid ${ativo ? '#86efac' : '#cbd5e1'};">
            ${escapar(status)}
        </span>
    `;

    const campo = (rotulo, valor) => `
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <span style="font-size: 0.68rem; color: #64748b;">${rotulo}</span>
            <strong style="font-size: 0.8rem; color: #0f172a; font-weight: 700;">${valor}</strong>
        </div>
    `;

    const conteudoHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; font-family: 'Inter', sans-serif;">
            <!-- Ícone de sucesso -->
            <div style="width: 84px; height: 84px; border-radius: 50%; background-color: #dcfce7; display: flex; justify-content: center; align-items: center; margin-top: 0.5rem;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background-color: #bbf7d0; display: flex; justify-content: center; align-items: center;">
                    ${ICONE_CHECK}
                </div>
            </div>

            <!-- Textos -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; text-align: center;">
                <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700; color: #0f172a;">Plano atualizado com sucesso!</h2>
                <p style="margin: 0; font-size: 0.85rem; color: #64748b; line-height: 1.5;">
                    As alterações do plano <strong style="color: #0f172a;">${escapar(nome)}</strong> foram salvas e já estão disponíveis na plataforma.
                </p>
            </div>

            <!-- Plano -->
            <div style="width: 100%; box-sizing: border-box; border: 1px solid #dbe7fb; border-radius: 10px; background-color: #f8faff; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                    <strong style="font-size: 0.95rem; color: #0f172a;">Plano ${escapar(nome)}</strong>
                    ${badgeStatus}
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem 1.5rem;">
                    ${campo('Preço mensal', `R$ ${escapar(moeda(precoMensal))} / mês`)}
                    ${campo('Preço anual', `R$ ${escapar(moeda(precoAnual))} / ano`)}
                    ${campo('Recrutadores', escapar(limite(recrutadores)))}
                    ${campo('Vagas', escapar(limite(vagas)))}
                    ${campo('Candidatos', escapar(limite(candidatos)))}
                    ${campo('Status', escapar(status))}
                </div>
            </div>

            <!-- Aviso -->
            <div style="width: 100%; box-sizing: border-box; border: 1px solid #dbeafe; border-radius: 8px; background-color: #eff6ff; padding: 0.75rem 1rem; font-size: 0.72rem; color: #475569; line-height: 1.45;">
                As novas condições já estão disponíveis para novas assinaturas. Assinaturas existentes seguem as regras aplicáveis ao contrato vigente.
            </div>

            <!-- Ação -->
            <button type="button" id="btnIrParaPlanosAtualizado" style="height: 40px; padding: 0 1.75rem; margin-top: 0.25rem; background-color: #1a3bc2; border: 1px solid #1a3bc2; border-radius: 8px; color: #ffffff; font-family: inherit; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s;">
                Ir para Gerenciar Planos
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

    const btnIr = modal.querySelector('#btnIrParaPlanosAtualizado');
    btnIr.addEventListener('mouseenter', () => btnIr.style.backgroundColor = '#152f9c');
    btnIr.addEventListener('mouseleave', () => btnIr.style.backgroundColor = '#1a3bc2');
    btnIr.addEventListener('click', () => {
        modal.remove();
        if (aoIrParaPlanos) aoIrParaPlanos();
        else fecharPadrao();
    });

    return modal;
}

export function abrirModalPlanoAtualizado(opcoes = {}) {
    const modal = renderModalPlanoAtualizado(opcoes);
    document.body.appendChild(modal);
}