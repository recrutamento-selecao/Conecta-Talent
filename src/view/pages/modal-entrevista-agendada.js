import { criarModal } from '../components/modal.js';

const AZUL = '#1a3bc2';
const AZUL_HOVER = '#152f9c';

const NOMES_MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const NOMES_DIAS = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

const svg = (conteudo, tamanho = 16) => `
    <svg width="${tamanho}" height="${tamanho}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${conteudo}</svg>
`;

const ICONE_CHECK = `
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
    </svg>
`;
const ICONE_VAGA = svg('<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>', 14);
const ICONE_DATA = svg('<rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path>', 18);
const ICONE_RELOGIO = svg('<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>', 18);
const ICONE_TIPO = svg('<rect x="3" y="6" width="13" height="12" rx="2"></rect><path d="M16 10l5-3v10l-5-3z"></path>', 18);
const ICONE_PESSOAS = svg('<circle cx="9" cy="8" r="3.5"></circle><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"></path><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2.2.7 3.5 2.6 3.5 5.5"></path>', 18);
const ICONE_NOTA = svg('<rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M8 9h8M8 13h8M8 17h5"></path>', 18);
const ICONE_EMAIL = svg('<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 7l9 6 9-6"></path>', 18);
const ICONE_INFO = svg('<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="11" x2="12" y2="17"></line><line x1="12" y1="7.5" x2="12" y2="8"></line>', 13);

// Confete decorativo: posição, tamanho, cor e rotação
const CONFETES = [
    { esquerda: '13%', topo: '34px', cor: '#1a3bc2', rot: 20 },
    { esquerda: '21%', topo: '62px', cor: '#16a34a', rot: -30 },
    { esquerda: '10%', topo: '110px', cor: '#f5b301', rot: 35 },
    { esquerda: '86%', topo: '44px', cor: '#f5b301', rot: -15 },
    { esquerda: '80%', topo: '74px', cor: '#1a3bc2', rot: 15 },
    { esquerda: '90%', topo: '118px', cor: '#16a34a', rot: -25 }
];

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

const doisDigitos = (n) => String(n).padStart(2, '0');

// Aceita Date ou texto 'YYYY-MM-DD' (formato devolvido pelo modal de agendamento)
function paraData(valor) {
    if (valor instanceof Date) return valor;
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(valor ?? ''));
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
}

function somarMinutos(horario, minutos) {
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(horario ?? ''));
    if (!m) return '';
    const total = (Number(m[1]) * 60 + Number(m[2]) + minutos) % (24 * 60);
    return `${doisDigitos(Math.floor(total / 60))}:${doisDigitos(total % 60)}`;
}

function textoDuracao(minutos) {
    if (!minutos) return '';
    const horas = Math.floor(minutos / 60);
    const resto = minutos % 60;
    const partes = [];
    if (horas) partes.push(`${horas} ${horas === 1 ? 'hora' : 'horas'}`);
    if (resto) partes.push(`${resto} minutos`);
    return partes.join(' e ');
}

// Só links http(s) viram âncora, para não aceitar "javascript:" e similares
const linkSeguro = (url) => (/^https?:\/\/\S+$/i.test(String(url ?? '').trim()) ? url.trim() : '');

/**
 * @param {Object} opcoes
 * @param {{nome: string, cargo?: string}} [opcoes.candidato]
 * @param {{titulo: string, empresa?: string}} [opcoes.vaga]
 * @param {Date|string} [opcoes.data] Date ou 'YYYY-MM-DD'
 * @param {string} [opcoes.horario] início, 'HH:MM'
 * @param {number} [opcoes.duracao] em minutos
 * @param {'online'|'presencial'} [opcoes.tipo]
 * @param {string} [opcoes.link] só para entrevista online
 * @param {Array<{nome: string}|string>} [opcoes.entrevistadores]
 * @param {string} [opcoes.observacoes]
 * @param {() => void} [opcoes.aoFechar] botão Fechar, X e clique no fundo
 */
export function renderModalEntrevistaAgendada({
    candidato = {},
    vaga = {},
    data,
    horario = '',
    duracao = 0,
    tipo = 'online',
    link = '',
    entrevistadores = [],
    observacoes = '',
    aoFechar
} = {}) {
    const dataObj = paraData(data);
    const dataTexto = dataObj ? `${dataObj.getDate()} de ${NOMES_MESES[dataObj.getMonth()]} de ${dataObj.getFullYear()}` : '—';
    const diaSemana = dataObj ? NOMES_DIAS[dataObj.getDay()] : '';

    const fim = somarMinutos(horario, duracao);
    const horarioTexto = horario ? (fim ? `${horario} às ${fim}` : horario) : '—';

    const online = tipo === 'online';
    const urlSegura = online ? linkSeguro(link) : '';
    const tipoHTML = `
        <strong style="font-size: 0.8rem; color: #0f172a;">${online ? 'Online' : 'Presencial'}</strong>
        ${urlSegura ? `<a href="${escapar(urlSegura)}" target="_blank" rel="noopener noreferrer" style="font-size: 0.72rem; color: ${AZUL}; text-decoration: underline; word-break: break-all;">${escapar(urlSegura)}</a>` : ''}
    `;

    const chipsHTML = entrevistadores.map((pessoa) => {
        const nome = typeof pessoa === 'string' ? pessoa : pessoa.nome;
        return `
            <span style="display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.3rem 0.65rem; border-radius: 999px; background-color: #eef4ff; font-size: 0.7rem; color: #0f172a;">
                <span style="width: 22px; height: 22px; border-radius: 50%; background-color: #dbeafe; color: ${AZUL}; font-size: 0.55rem; font-weight: 700; display: flex; justify-content: center; align-items: center;">${escapar(iniciais(nome))}</span>
                ${escapar(nome)}
            </span>
        `;
    }).join('');

    const textoNotificacao = urlSegura
        ? `${escapar(candidato.nome)} recebeu um e-mail com a data, horário, tipo de entrevista e link de acesso.`
        : `${escapar(candidato.nome)} recebeu um e-mail com a data, horário e tipo de entrevista.`;
    const textoDetalheEmail = urlSegura
        ? 'Com os detalhes da entrevista e o link de acesso.'
        : 'Com os detalhes da entrevista.';

    const bloco = (icone, rotulo, corpoHTML) => `
        <div style="display: flex; align-items: flex-start; gap: 0.85rem;">
            <div style="color: ${AZUL}; width: 22px; display: flex; justify-content: center; padding-top: 0.1rem; flex-shrink: 0;">${icone}</div>
            <div style="display: flex; flex-direction: column; gap: 0.3rem; min-width: 0;">
                <span style="font-size: 0.65rem; color: #64748b;">${rotulo}</span>
                ${corpoHTML}
            </div>
        </div>
    `;

    const conteudoHTML = `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 1rem; font-family: 'Inter', sans-serif;">
            <!-- Confete decorativo -->
            <div aria-hidden="true" style="position: absolute; top: 0; left: 0; right: 0; height: 140px; pointer-events: none;">
                ${CONFETES.map((c) => `<span style="position: absolute; left: ${c.esquerda}; top: ${c.topo}; width: 9px; height: 16px; border-radius: 2px; background-color: ${c.cor}; transform: rotate(${c.rot}deg);"></span>`).join('')}
            </div>

            <!-- Ícone de sucesso -->
            <div style="width: 92px; height: 92px; border-radius: 50%; background-color: #dcfce7; display: flex; justify-content: center; align-items: center;">
                ${ICONE_CHECK}
            </div>

            <!-- Textos -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.4rem; text-align: center;">
                <h2 style="margin: 0; font-size: 1.5rem; font-weight: 700; color: #0f172a;">Entrevista agendada com sucesso!</h2>
                <p style="margin: 0; font-size: 0.8rem; color: #64748b;">A entrevista foi agendada e o candidato foi notificado por e-mail.</p>
            </div>

            <!-- Candidato e vaga -->
            <div style="width: 100%; box-sizing: border-box; display: grid; grid-template-columns: 1fr 1fr; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #f5f7fb; padding: 1rem 1.25rem; margin-top: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.85rem; padding-right: 1rem; border-right: 1px solid #dbe2ee;">
                    <div style="width: 44px; height: 44px; border-radius: 50%; background-color: #dbeafe; color: ${AZUL}; font-size: 0.9rem; font-weight: 700; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                        ${escapar(iniciais(candidato.nome))}
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.15rem;">
                        <strong style="font-size: 0.85rem; color: #0f172a;">${escapar(candidato.nome)}</strong>
                        <span style="font-size: 0.65rem; color: #64748b;">${escapar(candidato.cargo)}</span>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.2rem; padding-left: 1.25rem; justify-content: center;">
                    <span style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.78rem; font-weight: 700; color: #0f172a;">${ICONE_VAGA} Vaga</span>
                    <strong style="font-size: 0.78rem; color: #0f172a;">${escapar(vaga.titulo)}</strong>
                    <span style="font-size: 0.65rem; color: #64748b;">${escapar(vaga.empresa)}</span>
                </div>
            </div>

            <!-- Detalhes -->
            <div style="width: 100%; box-sizing: border-box; display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem 1.5rem; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #f5f7fb; padding: 1.25rem;">
                ${bloco(ICONE_DATA, 'Data', `
                    <strong style="font-size: 0.8rem; color: #0f172a;">${escapar(dataTexto)}</strong>
                    <span style="font-size: 0.68rem; color: #64748b;">${escapar(diaSemana)}</span>
                `)}
                ${bloco(ICONE_RELOGIO, 'Horário', `
                    <strong style="font-size: 0.8rem; color: #0f172a;">${escapar(horarioTexto)}</strong>
                    <span style="font-size: 0.68rem; color: #64748b;">${escapar(textoDuracao(duracao))}</span>
                `)}
                ${bloco(ICONE_TIPO, 'Tipo de entrevista', tipoHTML)}
                ${bloco(ICONE_PESSOAS, 'Entrevistadores', `<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${chipsHTML || '<strong style="font-size: 0.8rem; color: #0f172a;">—</strong>'}</div>`)}
                ${bloco(ICONE_NOTA, 'Observações', `<strong style="font-size: 0.8rem; color: #0f172a; line-height: 1.4;">${escapar(observacoes) || '—'}</strong>`)}
                ${bloco(ICONE_EMAIL, 'Notificação', `
                    <strong style="font-size: 0.8rem; color: #0f172a;">E-mail enviado ao candidato</strong>
                    <span style="font-size: 0.68rem; color: #64748b;">${textoDetalheEmail}</span>
                `)}
            </div>

            <!-- Aviso -->
            <div style="width: 100%; box-sizing: border-box; border: 1px solid #dbeafe; border-radius: 8px; background-color: #eff6ff; padding: 0.75rem 1rem; font-size: 0.68rem; color: #475569; line-height: 1.45;">
                <strong style="display: flex; align-items: center; gap: 0.35rem; color: #0f172a; margin-bottom: 0.15rem;"><span style="color: ${AZUL}; display: flex;">${ICONE_INFO}</span> Candidato notificado</strong>
                ${textoNotificacao}
            </div>

            <!-- Ação -->
            <button type="button" id="btnFecharEntrevistaAgendada" style="height: 40px; padding: 0 2.25rem; margin-top: 0.25rem; background-color: ${AZUL}; border: 1.5px solid ${AZUL}; border-radius: 8px; color: #ffffff; font-family: inherit; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s;">
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
    caixa.style.maxWidth = '680px'; // só neste modal
    caixa.style.maxHeight = '92vh';
    caixa.style.overflowY = 'auto';

    const btnFechar = modal.querySelector('#btnFecharEntrevistaAgendada');
    btnFechar.addEventListener('mouseenter', () => btnFechar.style.backgroundColor = AZUL_HOVER);
    btnFechar.addEventListener('mouseleave', () => btnFechar.style.backgroundColor = AZUL);
    btnFechar.addEventListener('click', () => {
        modal.remove();
        fecharPadrao();
    });

    return modal;
}

export function abrirModalEntrevistaAgendada(opcoes = {}) {
    const modal = renderModalEntrevistaAgendada(opcoes);
    document.body.appendChild(modal);
}