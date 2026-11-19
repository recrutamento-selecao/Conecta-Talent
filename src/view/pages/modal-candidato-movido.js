import { criarModal } from '../components/modal.js';

const AZUL = '#1a3bc2';
const AZUL_HOVER = '#152f9c';

const ICONE_CHECK = `
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
    </svg>
`;

const svg = (conteudo, tamanho = 16) => `
    <svg width="${tamanho}" height="${tamanho}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${conteudo}</svg>
`;

const ICONE_VAGA = svg('<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>', 14);
const ICONE_DATA = svg('<rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path>');
const ICONE_USUARIO = svg('<circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"></path>');
const ICONE_NOTA = svg('<rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M8 9h8M8 13h8M8 17h5"></path>');
const ICONE_SETA = svg('<path d="M4 12h16"></path><path d="M14 6l6 6-6 6"></path>', 22);

const BASE_BTN = 'height: 40px; padding: 0 1.75rem; border-radius: 8px; font-family: inherit; font-size: 0.8rem; font-weight: 600; cursor: pointer; box-sizing: border-box; transition: background-color 0.2s;';

// Evita injetar HTML vindo de dados do usuário
function escapar(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML;
}

function iniciais(nome = '') {
    const partes = nome.trim().split(/\s+/).filter(Boolean);
    if (partes.length === 0) return '';
    const primeira = partes[0][0];
    const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
    return (primeira + ultima).toUpperCase();
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
 * @param {{nome: string, cargo?: string}} [opcoes.candidato]
 * @param {{titulo: string, empresa?: string}} [opcoes.vaga]
 * @param {string} [opcoes.etapaAnterior] ex.: 'Triagem'
 * @param {string} [opcoes.etapaNova] ex.: 'Teste técnico'
 * @param {string} [opcoes.dataMovimentacao] já formatada; se omitida, usa a data/hora atual
 * @param {{nome: string, cargo?: string}} [opcoes.movidoPor] ex.: { nome: 'Juliana Martins', cargo: 'Recrutadora' }
 * @param {string} [opcoes.observacao]
 * @param {() => void} [opcoes.aoVerCandidatura]
 * @param {() => void} [opcoes.aoFechar] botão Fechar, X e clique no fundo
 */
export function renderModalCandidatoMovido({
    candidato = {},
    vaga = {},
    etapaAnterior = '',
    etapaNova = '',
    dataMovimentacao,
    movidoPor = {},
    observacao = '',
    aoVerCandidatura,
    aoFechar
} = {}) {
    const detalhe = (icone, rotulo, valorHTML) => `
        <div style="display: flex; align-items: flex-start; gap: 0.85rem;">
            <div style="color: ${AZUL}; width: 20px; display: flex; justify-content: center; padding-top: 0.15rem; flex-shrink: 0;">${icone}</div>
            <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                <span style="font-size: 0.65rem; color: #64748b;">${rotulo}</span>
                ${valorHTML}
            </div>
        </div>
    `;

    const movidoPorHTML = movidoPor.nome
        ? `<strong style="font-size: 0.75rem; color: #0f172a;">${escapar(movidoPor.nome)}</strong>
           ${movidoPor.cargo ? `<span style="font-size: 0.68rem; color: #64748b;">(${escapar(movidoPor.cargo)})</span>` : ''}`
        : `<strong style="font-size: 0.75rem; color: #0f172a;">—</strong>`;

    const conteudoHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; font-family: 'Inter', sans-serif;">
            <!-- Ícone de sucesso -->
            <div style="width: 84px; height: 84px; border-radius: 50%; background-color: #dcfce7; display: flex; justify-content: center; align-items: center; margin-top: 0.25rem;">
                ${ICONE_CHECK}
            </div>

            <!-- Textos -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.4rem; text-align: center;">
                <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700; color: #0f172a;">Candidato movido com sucesso!</h2>
                <p style="margin: 0; font-size: 0.78rem; color: #64748b;">A etapa da candidatura foi atualizada com sucesso.</p>
            </div>

            <!-- Candidato e vaga -->
            <div style="width: 100%; box-sizing: border-box; display: grid; grid-template-columns: 1fr 1fr; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #f5f7fb; padding: 1rem 1.25rem; margin-top: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; padding-right: 1rem; border-right: 1px solid #dbe2ee;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #dbeafe; color: ${AZUL}; font-size: 0.85rem; font-weight: 700; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                        ${escapar(iniciais(candidato.nome))}
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.15rem;">
                        <strong style="font-size: 0.8rem; color: #0f172a;">${escapar(candidato.nome)}</strong>
                        <span style="font-size: 0.65rem; color: #64748b;">${escapar(candidato.cargo)}</span>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.2rem; padding-left: 1.25rem; justify-content: center;">
                    <span style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; font-weight: 700; color: #0f172a;">${ICONE_VAGA} Vaga</span>
                    <strong style="font-size: 0.78rem; color: #0f172a;">${escapar(vaga.titulo)}</strong>
                    <span style="font-size: 0.65rem; color: #64748b;">${escapar(vaga.empresa)}</span>
                </div>
            </div>

            <!-- Etapas -->
            <div style="width: 100%; display: flex; align-items: center; gap: 0.75rem;">
                <div style="flex: 1; box-sizing: border-box; border: 1px solid #bfd3f7; border-radius: 8px; background-color: #eef4ff; padding: 0.8rem 1rem; display: flex; flex-direction: column; gap: 0.3rem;">
                    <span style="font-size: 0.62rem; color: #64748b;">Etapa anterior</span>
                    <strong style="font-size: 0.85rem; color: #0f172a;">${escapar(etapaAnterior)}</strong>
                </div>
                <div style="color: #0f172a; display: flex; flex-shrink: 0;">${ICONE_SETA}</div>
                <div style="flex: 1; box-sizing: border-box; border: 1px solid #a7e3bd; border-radius: 8px; background-color: #e8f8ee; padding: 0.8rem 1rem; display: flex; flex-direction: column; gap: 0.3rem;">
                    <span style="font-size: 0.62rem; color: #64748b;">Nova etapa</span>
                    <strong style="font-size: 0.85rem; color: #0f172a;">${escapar(etapaNova)}</strong>
                </div>
            </div>

            <!-- Detalhes -->
            <div style="width: 100%; box-sizing: border-box; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #f5f7fb; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 1rem;">
                ${detalhe(ICONE_DATA, 'Data da movimentação', `<strong style="font-size: 0.75rem; color: #0f172a;">${escapar(dataMovimentacao || formatarDataHora())}</strong>`)}
                ${detalhe(ICONE_USUARIO, 'Movido por', movidoPorHTML)}
                ${detalhe(ICONE_NOTA, 'Observação', `<strong style="font-size: 0.75rem; color: #0f172a;">${escapar(observacao) || '—'}</strong>`)}
            </div>

            <!-- Ações -->
            <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.25rem;">
                <button type="button" id="btnFecharCandidatoMovido" style="${BASE_BTN} background-color: #ffffff; border: 1.5px solid ${AZUL}; color: ${AZUL};">
                    Fechar
                </button>
                <button type="button" id="btnVerCandidatura" style="${BASE_BTN} background-color: ${AZUL}; border: 1.5px solid ${AZUL}; color: #ffffff;">
                    Ver candidatura →
                </button>
            </div>
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
    caixa.style.maxWidth = '600px'; // só neste modal

    const btnFechar = modal.querySelector('#btnFecharCandidatoMovido');
    const btnVer = modal.querySelector('#btnVerCandidatura');

    btnFechar.addEventListener('mouseenter', () => btnFechar.style.backgroundColor = '#eff3ff');
    btnFechar.addEventListener('mouseleave', () => btnFechar.style.backgroundColor = '#ffffff');
    btnVer.addEventListener('mouseenter', () => btnVer.style.backgroundColor = AZUL_HOVER);
    btnVer.addEventListener('mouseleave', () => btnVer.style.backgroundColor = AZUL);

    btnFechar.addEventListener('click', () => {
        modal.remove();
        fecharPadrao();
    });

    btnVer.addEventListener('click', () => {
        modal.remove();
        if (aoVerCandidatura) aoVerCandidatura();
        else fecharPadrao();
    });

    return modal;
}

export function abrirModalCandidatoMovido(opcoes = {}) {
    const modal = renderModalCandidatoMovido(opcoes);
    document.body.appendChild(modal);
}