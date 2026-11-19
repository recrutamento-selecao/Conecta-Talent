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

const inteiro = (valor) =>
    typeof valor === 'number' ? valor.toLocaleString('pt-BR') : String(valor ?? '');

/**
 * @param {Object} opcoes
 * @param {Object} [opcoes.plano]
 * @param {string} [opcoes.plano.nome]
 * @param {number|string} [opcoes.plano.precoMensal] número (149.9) ou texto já formatado
 * @param {number|string} [opcoes.plano.precoAnual]
 * @param {number|string} [opcoes.plano.recrutadores]
 * @param {number|string} [opcoes.plano.vagas]
 * @param {number|string} [opcoes.plano.candidatos]
 * @param {string} [opcoes.plano.status] padrão 'Ativo'
 * @param {() => void} [opcoes.aoIrParaPlanos] ação do botão "Ir para Gerenciar Planos"
 * @param {() => void} [opcoes.aoFechar] X e clique no fundo
 */
export function renderModalPlanoCriado({ plano = {}, aoIrParaPlanos, aoFechar } = {}) {
    const { nome, precoMensal, precoAnual, recrutadores, vagas, candidatos, status = 'Ativo' } = plano;

    const ativo = String(status).toLowerCase() === 'ativo';
    const badgeStatus = `
        <span style="display: inline-block; padding: 0.2rem 0.75rem; border-radius: 999px; font-size: 0.7rem; font-weight: 600; background-color: ${ativo ? '#d1fae5' : '#e2e8f0'}; color: ${ativo ? '#15803d' : '#475569'};">
            ${escapar(status)}
        </span>
    `;

    const linha = (rotulo, valorHTML) => `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; font-size: 0.75rem;">
            <span style="color: #64748b;">${rotulo}</span>
            <strong style="color: #0f172a; font-weight: 700; text-align: right;">${valorHTML}</strong>
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
                <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700; color: #0f172a;">Plano criado com sucesso!</h2>
                <p style="margin: 0; font-size: 0.85rem; color: #64748b; line-height: 1.5; max-width: 22rem;">
                    O novo plano foi criado e já está disponível para contratação pelas empresas da plataforma.
                </p>
            </div>

            <!-- Resumo do plano -->
            <div style="width: 100%; box-sizing: border-box; border: 1px solid #dbe7fb; border-radius: 10px; background-color: #f8faff; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.65rem; margin-top: 0.5rem;">
                <strong style="font-size: 0.8rem; color: #0f172a; margin-bottom: 0.25rem;">Resumo do plano</strong>
                ${linha('Nome', escapar(nome))}
                ${linha('Preço mensal', `R$ ${escapar(moeda(precoMensal))} /mês`)}
                ${linha('Preço anual', `R$ ${escapar(moeda(precoAnual))} /ano`)}
                ${linha('Recrutadores', escapar(inteiro(recrutadores)))}
                ${linha('Vagas', escapar(inteiro(vagas)))}
                ${linha('Candidatos', escapar(inteiro(candidatos)))}
                ${linha('Status', badgeStatus)}
            </div>

            <!-- Aviso -->
            <div style="width: 100%; box-sizing: border-box; border: 1px solid #dbeafe; border-radius: 8px; background-color: #eff6ff; padding: 0.75rem 1rem; font-size: 0.72rem; color: #475569; line-height: 1.45;">
                O plano já pode ser selecionado pelas empresas durante a contratação ou alteração de assinatura.
            </div>

            <!-- Ação -->
            <button type="button" id="btnIrParaPlanos" style="height: 40px; padding: 0 1.75rem; margin-top: 0.25rem; background-color: #1a3bc2; border: 1px solid #1a3bc2; border-radius: 8px; color: #ffffff; font-family: inherit; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s;">
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

    const btnIr = modal.querySelector('#btnIrParaPlanos');
    btnIr.addEventListener('mouseenter', () => btnIr.style.backgroundColor = '#152f9c');
    btnIr.addEventListener('mouseleave', () => btnIr.style.backgroundColor = '#1a3bc2');
    btnIr.addEventListener('click', () => {
        modal.remove();
        if (aoIrParaPlanos) aoIrParaPlanos();
        else fecharPadrao();
    });

    return modal;
}

export function abrirModalPlanoCriado(opcoes = {}) {
    const modal = renderModalPlanoCriado(opcoes);
    document.body.appendChild(modal);
}