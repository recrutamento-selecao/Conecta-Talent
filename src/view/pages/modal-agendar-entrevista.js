import { criarModal } from '../components/modal.js';

const AZUL = '#1a3bc2';
const AZUL_HOVER = '#152f9c';
const VERMELHO = '#dc2626';
const BORDA = '#cbd5e1';

const NOMES_MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// Padrões editáveis: podem ser substituídos pelos parâmetros `horarios` e `duracoes`
const HORARIOS_PADRAO = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
const DURACOES_PADRAO = [30, 45, 60, 90];

const LIMITE_OBSERVACOES = 500;

const svg = (conteudo, tamanho = 16) => `
    <svg width="${tamanho}" height="${tamanho}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${conteudo}</svg>
`;

const ICONE_VAGA = svg('<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>', 14);
const ICONE_VIDEO = svg('<rect x="3" y="6" width="13" height="12" rx="2"></rect><path d="M16 10l5-3v10l-5-3z"></path>', 14);
const ICONE_LOCAL = svg('<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"></path><circle cx="12" cy="9" r="2.5"></circle>', 14);
const ICONE_CALENDARIO = svg('<rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path>', 14);
const ICONE_RELOGIO = svg('<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>', 14);
const ICONE_LINK = svg('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"></path><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"></path>', 14);
const ICONE_INFO = svg('<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="11" x2="12" y2="17"></line><line x1="12" y1="7.5" x2="12" y2="8"></line>', 13);
const ICONE_SETA_BAIXO = svg('<path d="M6 9l6 6 6-6"></path>', 14);
const ICONE_ANTERIOR = svg('<path d="M15 6l-6 6 6 6"></path>', 18);
const ICONE_PROXIMO = svg('<path d="M9 6l6 6-6 6"></path>', 18);

const ROTULO = 'font-size: 0.75rem; font-weight: 700; color: #0f172a;';
const CAMPO = `width: 100%; box-sizing: border-box; height: 40px; padding: 0 0.75rem; border: 1px solid ${BORDA}; border-radius: 8px; background-color: #ffffff; font-family: inherit; font-size: 0.78rem; color: #0f172a; outline: none;`;
const BASE_BTN = 'height: 40px; padding: 0 1.5rem; border-radius: 8px; font-family: inherit; font-size: 0.8rem; font-weight: 600; cursor: pointer; box-sizing: border-box; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: background-color 0.2s;';

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

const semHora = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const mesmaData = (a, b) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const doisDigitos = (n) => String(n).padStart(2, '0');
const formatarBR = (d) => `${doisDigitos(d.getDate())}/${doisDigitos(d.getMonth() + 1)}/${d.getFullYear()}`;
const formatarISO = (d) => `${d.getFullYear()}-${doisDigitos(d.getMonth() + 1)}-${doisDigitos(d.getDate())}`;

/**
 * @param {Object} opcoes
 * @param {{nome: string, cargo?: string, local?: string, modalidade?: string, email?: string, telefone?: string}} [opcoes.candidato]
 * @param {{titulo: string, empresa?: string}} [opcoes.vaga]
 * @param {Array<{id: string|number, nome: string}>} [opcoes.entrevistadores] pessoas que podem ser escolhidas
 * @param {Array<string|number>} [opcoes.entrevistadoresSelecionados] ids já selecionados
 * @param {string[]} [opcoes.horarios] horários disponíveis (HH:MM)
 * @param {number[]} [opcoes.duracoes] durações em minutos
 * @param {Date} [opcoes.dataInicial] data pré-selecionada
 * @param {Date} [opcoes.dataMinima] datas anteriores ficam bloqueadas (padrão: hoje)
 * @param {string} [opcoes.horarioInicial]
 * @param {number} [opcoes.duracaoInicial] padrão 60
 * @param {'online'|'presencial'} [opcoes.tipoInicial]
 * @param {string} [opcoes.linkInicial]
 * @param {(dados: {tipo: string, entrevistadores: string[], data: string, horario: string, duracao: number, link: string, observacoes: string}) => (void|Promise<void>)} [opcoes.aoConfirmar]
 * @param {() => void} [opcoes.aoCancelar]
 */
export function renderModalAgendarEntrevista({
    candidato = {},
    vaga = {},
    entrevistadores = [],
    entrevistadoresSelecionados = [],
    horarios = HORARIOS_PADRAO,
    duracoes = DURACOES_PADRAO,
    dataInicial,
    dataMinima,
    horarioInicial = '',
    duracaoInicial = 60,
    tipoInicial = 'online',
    linkInicial = '',
    aoConfirmar,
    aoCancelar
} = {}) {
    const minima = semHora(dataMinima ?? new Date());

    const estado = {
        tipo: tipoInicial,
        selecionados: entrevistadoresSelecionados.map(String),
        data: dataInicial ? semHora(dataInicial) : null,
        mesVisivel: dataInicial ? new Date(dataInicial.getFullYear(), dataInicial.getMonth(), 1) : new Date(minima.getFullYear(), minima.getMonth(), 1),
        horario: horarios.includes(horarioInicial) ? horarioInicial : ''
    };

    const contato = [candidato.local, candidato.modalidade, candidato.email, candidato.telefone].filter(Boolean).join(' | ');

    const opcoesDuracao = duracoes
        .map((min) => `<option value="${min}" ${min === duracaoInicial ? 'selected' : ''}>${min} minutos</option>`)
        .join('');

    const cardTipo = (valor, icone, titulo, descricao) => `
        <label data-card-tipo="${valor}" style="display: flex; align-items: flex-start; gap: 0.75rem; box-sizing: border-box; padding: 0.85rem 1rem; border: 1.5px solid ${BORDA}; border-radius: 8px; background-color: #ffffff; cursor: pointer; transition: all 0.15s;">
            <input type="radio" name="tipoEntrevista" value="${valor}" style="width: 16px; height: 16px; margin: 2px 0 0 0; accent-color: ${AZUL}; cursor: pointer; flex-shrink: 0;">
            <span style="display: flex; flex-direction: column; gap: 0.2rem;">
                <strong style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: #0f172a;">${icone} ${titulo}</strong>
                <span style="font-size: 0.65rem; color: #64748b;">${descricao}</span>
            </span>
        </label>
    `;

    const conteudoHTML = `
        <style>
            .ag-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 2rem; align-items: start; }
            .ag-dia:not(:disabled):hover { background-color: #eff3ff; }
            .ag-horario:hover { border-color: ${AZUL}; }
            @media (max-width: 760px) { .ag-grid { grid-template-columns: 1fr; } }
        </style>
        <div style="display: flex; flex-direction: column; gap: 1.1rem; font-family: 'Inter', sans-serif;">
            <!-- Cabeçalho -->
            <div style="display: flex; flex-direction: column; gap: 0.4rem; padding-right: 2.5rem;">
                <h2 style="margin: 0; font-size: 1.5rem; font-weight: 700; color: #0f172a;">Agendar entrevista</h2>
                <p style="margin: 0; font-size: 0.8rem; color: #64748b;">Defina a data, horário e detalhes da entrevista com o candidato.</p>
            </div>

            <!-- Candidato e vaga -->
            <div style="display: grid; grid-template-columns: 1.4fr 1fr; box-sizing: border-box; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #f5f7fb; padding: 1rem 1.25rem;">
                <div style="display: flex; align-items: center; gap: 0.85rem; padding-right: 1rem; border-right: 1px solid #dbe2ee;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #dbeafe; color: ${AZUL}; font-size: 0.85rem; font-weight: 700; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                        ${escapar(iniciais(candidato.nome))}
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.15rem; min-width: 0;">
                        <strong style="font-size: 0.85rem; color: #0f172a;">${escapar(candidato.nome)}</strong>
                        <span style="font-size: 0.65rem; color: #64748b;">${escapar(candidato.cargo)}</span>
                        <span style="font-size: 0.62rem; color: #64748b;">${escapar(contato)}</span>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.2rem; padding-left: 1.25rem; justify-content: center;">
                    <span style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.78rem; font-weight: 700; color: #0f172a;">${ICONE_VAGA} Vaga</span>
                    <strong style="font-size: 0.78rem; color: #0f172a;">${escapar(vaga.titulo)}</strong>
                    <span style="font-size: 0.65rem; color: #64748b;">${escapar(vaga.empresa)}</span>
                </div>
            </div>

            <div class="ag-grid">
                <!-- Coluna esquerda -->
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                        <span style="${ROTULO}">Tipo de entrevista <span style="color: ${VERMELHO};">*</span></span>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                            ${cardTipo('online', ICONE_VIDEO, 'Online', 'Link de videoconferência')}
                            ${cardTipo('presencial', ICONE_LOCAL, 'Presencial', 'Na empresa')}
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.4rem; position: relative;">
                        <span style="${ROTULO}">Entrevistadores <span style="color: ${VERMELHO};">*</span></span>
                        <div id="agEntrevistadores" tabindex="0" style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; box-sizing: border-box; min-height: 44px; padding: 0.4rem 0.6rem; border: 1px solid ${BORDA}; border-radius: 8px; background-color: #ffffff; cursor: pointer;">
                            <div id="agChips" style="display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center;"></div>
                            <span style="color: #64748b; display: flex; flex-shrink: 0;">${ICONE_SETA_BAIXO}</span>
                        </div>
                        <div id="agDropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px; z-index: 20; max-height: 180px; overflow-y: auto; box-sizing: border-box; border: 1px solid ${BORDA}; border-radius: 8px; background-color: #ffffff; box-shadow: 0 8px 16px rgba(15, 23, 42, 0.1);"></div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                        <span style="${ROTULO}">Data e horário <span style="color: ${VERMELHO};">*</span></span>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                            <div style="position: relative;">
                                <span style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #64748b; display: flex;">${ICONE_CALENDARIO}</span>
                                <input type="text" id="agCampoData" readonly placeholder="dd/mm/aaaa" style="${CAMPO} padding-left: 2.1rem; cursor: default;">
                            </div>
                            <div style="position: relative;">
                                <span style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #64748b; display: flex; pointer-events: none;">${ICONE_RELOGIO}</span>
                                <select id="agSelectHorario" style="${CAMPO} padding-left: 2.1rem; cursor: pointer;">
                                    <option value="">Selecione</option>
                                    ${horarios.map((h) => `<option value="${escapar(h)}">${escapar(h)}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                        <span style="${ROTULO}">Duração</span>
                        <div style="position: relative; width: 50%; min-width: 11rem;">
                            <span style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #64748b; display: flex; pointer-events: none;">${ICONE_RELOGIO}</span>
                            <select id="agSelectDuracao" style="${CAMPO} padding-left: 2.1rem; cursor: pointer;">${opcoesDuracao}</select>
                        </div>
                    </div>

                    <div id="agBlocoLink" style="display: flex; flex-direction: column; gap: 0.4rem;">
                        <span style="${ROTULO}">Link da videoconferência <span style="color: ${VERMELHO};">*</span></span>
                        <div style="position: relative;">
                            <span style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #64748b; display: flex;">${ICONE_LINK}</span>
                            <input type="text" id="agLink" value="${escapar(linkInicial)}" placeholder="https://meet.google.com/..." autocomplete="off" style="${CAMPO} padding-left: 2.1rem; height: 44px;">
                        </div>
                        <span style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.62rem; color: #475569;">${ICONE_INFO} O link será enviado automaticamente para o candidato por e-mail.</span>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                        <span style="${ROTULO}">Observações <span style="font-weight: 400; color: #64748b;">(opcional)</span></span>
                        <textarea id="agObservacoes" maxlength="${LIMITE_OBSERVACOES}" rows="4" placeholder="Adicione informações sobre a entrevista, como pauta, participantes, instruções, etc." style="${CAMPO} height: auto; min-height: 90px; padding: 0.65rem 0.75rem; resize: vertical;"></textarea>
                        <span id="agContador" style="align-self: flex-end; font-size: 0.62rem; color: #64748b;">0/${LIMITE_OBSERVACOES}</span>
                    </div>
                </div>

                <!-- Coluna direita -->
                <div style="display: flex; flex-direction: column; gap: 0.9rem;">
                    <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                        <span style="${ROTULO}">Selecionar data</span>
                        <div id="agCalendario" style="box-sizing: border-box; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #ffffff; padding: 0.9rem 1rem;">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.6rem;">
                                <button type="button" id="agMesAnterior" aria-label="Mês anterior" style="border: none; background: none; color: ${AZUL}; cursor: pointer; display: flex; padding: 0.2rem;">${ICONE_ANTERIOR}</button>
                                <strong id="agTituloMes" style="font-size: 0.85rem; color: #0f172a;"></strong>
                                <button type="button" id="agMesProximo" aria-label="Próximo mês" style="border: none; background: none; color: ${AZUL}; cursor: pointer; display: flex; padding: 0.2rem;">${ICONE_PROXIMO}</button>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 0.6rem; color: #64748b; margin-bottom: 0.3rem;">
                                ${DIAS_SEMANA.map((d) => `<span>${d}</span>`).join('')}
                            </div>
                            <div id="agDias" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem;"></div>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                        <span style="${ROTULO}">Horários disponíveis</span>
                        <div id="agHorarios" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;"></div>
                    </div>

                    <div style="box-sizing: border-box; border: 1px solid #dbeafe; border-radius: 8px; background-color: #eff6ff; padding: 0.75rem 1rem; font-size: 0.68rem; color: #475569; line-height: 1.45;">
                        <strong style="display: flex; align-items: center; gap: 0.35rem; color: #0f172a;"><span style="color: ${AZUL}; display: flex;">${ICONE_INFO}</span> O candidato será notificado por e-mail</strong>
                        com os detalhes da entrevista e o link de acesso.
                    </div>
                </div>
            </div>

            <!-- Ações -->
            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                <button type="button" id="btnCancelarAgendamento" style="${BASE_BTN} background-color: #ffffff; border: 1.5px solid ${AZUL}; color: ${AZUL};">
                    Cancelar
                </button>
                <button type="button" id="btnConfirmarAgendamento" style="${BASE_BTN} background-color: ${AZUL}; border: 1.5px solid ${AZUL}; color: #ffffff;">
                    ${ICONE_CALENDARIO} Agendar entrevista
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
    caixa.style.maxWidth = '960px'; // só neste modal
    caixa.style.maxHeight = '92vh';
    caixa.style.overflowY = 'auto';

    const $ = (seletor) => modal.querySelector(seletor);
    const caixaEntrevistadores = $('#agEntrevistadores');
    const chipsEl = $('#agChips');
    const dropdownEl = $('#agDropdown');
    const campoData = $('#agCampoData');
    const selectHorario = $('#agSelectHorario');
    const selectDuracao = $('#agSelectDuracao');
    const blocoLink = $('#agBlocoLink');
    const campoLink = $('#agLink');
    const campoObs = $('#agObservacoes');
    const contador = $('#agContador');
    const tituloMes = $('#agTituloMes');
    const diasEl = $('#agDias');
    const horariosEl = $('#agHorarios');
    const btnConfirmar = $('#btnConfirmarAgendamento');
    const btnCancelar = $('#btnCancelarAgendamento');

    const marcarErro = (el, erro) => { el.style.borderColor = erro ? VERMELHO : BORDA; };

    // ---------- Tipo de entrevista ----------
    function atualizarTipo() {
        modal.querySelectorAll('[data-card-tipo]').forEach((card) => {
            const ativo = card.dataset.cardTipo === estado.tipo;
            card.querySelector('input').checked = ativo;
            card.style.borderColor = ativo ? AZUL : BORDA;
            card.style.backgroundColor = ativo ? '#f5f8ff' : '#ffffff';
        });
        blocoLink.style.display = estado.tipo === 'online' ? 'flex' : 'none';
    }
    modal.querySelectorAll('input[name="tipoEntrevista"]').forEach((radio) => {
        radio.addEventListener('change', () => {
            estado.tipo = radio.value;
            atualizarTipo();
        });
    });

    // ---------- Entrevistadores ----------
    const pessoaPorId = (id) => entrevistadores.find((p) => String(p.id) === String(id));

    function renderChips() {
        chipsEl.innerHTML = '';
        if (estado.selecionados.length === 0) {
            const vazio = document.createElement('span');
            vazio.textContent = 'Selecione os entrevistadores';
            vazio.style.cssText = 'font-size: 0.75rem; color: #94a3b8; padding: 0.25rem 0.2rem;';
            chipsEl.appendChild(vazio);
            return;
        }
        estado.selecionados.forEach((id) => {
            const pessoa = pessoaPorId(id);
            if (!pessoa) return;
            const chip = document.createElement('span');
            chip.style.cssText = 'display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.25rem 0.5rem; border-radius: 8px; background-color: #eef4ff; font-size: 0.7rem; color: #0f172a;';
            chip.innerHTML = `
                <span style="width: 20px; height: 20px; border-radius: 50%; background-color: #dbeafe; color: ${AZUL}; font-size: 0.55rem; font-weight: 700; display: flex; justify-content: center; align-items: center;">${escapar(iniciais(pessoa.nome))}</span>
                <span>${escapar(pessoa.nome)}</span>
            `;
            const remover = document.createElement('button');
            remover.type = 'button';
            remover.textContent = '×';
            remover.setAttribute('aria-label', `Remover ${pessoa.nome}`);
            remover.style.cssText = 'border: none; background: none; color: #64748b; font-size: 0.9rem; line-height: 1; cursor: pointer; padding: 0;';
            remover.addEventListener('click', (e) => {
                e.stopPropagation();
                estado.selecionados = estado.selecionados.filter((x) => x !== String(id));
                renderChips();
                renderDropdown();
            });
            chip.appendChild(remover);
            chipsEl.appendChild(chip);
        });
    }

    function renderDropdown() {
        dropdownEl.innerHTML = '';
        const disponiveis = entrevistadores.filter((p) => !estado.selecionados.includes(String(p.id)));
        if (disponiveis.length === 0) {
            const vazio = document.createElement('div');
            vazio.textContent = 'Nenhum entrevistador disponível';
            vazio.style.cssText = 'padding: 0.7rem 0.9rem; font-size: 0.72rem; color: #94a3b8;';
            dropdownEl.appendChild(vazio);
            return;
        }
        disponiveis.forEach((pessoa) => {
            const item = document.createElement('button');
            item.type = 'button';
            item.textContent = pessoa.nome;
            item.style.cssText = 'display: block; width: 100%; text-align: left; border: none; background: none; padding: 0.6rem 0.9rem; font-family: inherit; font-size: 0.75rem; color: #0f172a; cursor: pointer;';
            item.addEventListener('mouseenter', () => item.style.backgroundColor = '#f1f5f9');
            item.addEventListener('mouseleave', () => item.style.backgroundColor = 'transparent');
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                estado.selecionados.push(String(pessoa.id));
                marcarErro(caixaEntrevistadores, false);
                renderChips();
                renderDropdown();
            });
            dropdownEl.appendChild(item);
        });
    }

    const alternarDropdown = (aberto) => {
        dropdownEl.style.display = aberto ? 'block' : 'none';
    };
    caixaEntrevistadores.addEventListener('click', () => {
        renderDropdown();
        alternarDropdown(dropdownEl.style.display === 'none');
    });
    // Fecha ao clicar fora
    modal.addEventListener('click', (e) => {
        if (!caixaEntrevistadores.contains(e.target) && !dropdownEl.contains(e.target)) alternarDropdown(false);
    });

    // ---------- Calendário ----------
    function renderCalendario() {
        const ano = estado.mesVisivel.getFullYear();
        const mes = estado.mesVisivel.getMonth();
        tituloMes.textContent = `${NOMES_MESES[mes]} de ${ano}`;

        const primeiro = new Date(ano, mes, 1);
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();
        const totalCelulas = Math.ceil((primeiro.getDay() + diasNoMes) / 7) * 7;
        const inicio = new Date(ano, mes, 1 - primeiro.getDay());

        diasEl.innerHTML = '';
        for (let i = 0; i < totalCelulas; i++) {
            const dia = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate() + i);
            const doMes = dia.getMonth() === mes;
            const selecionado = mesmaData(dia, estado.data);
            const bloqueado = dia < minima;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'ag-dia';
            btn.textContent = dia.getDate();
            btn.disabled = bloqueado;
            btn.style.cssText = `height: 36px; border: none; border-radius: 999px; font-family: inherit; font-size: 0.72rem; cursor: ${bloqueado ? 'not-allowed' : 'pointer'}; background-color: ${selecionado ? AZUL : 'transparent'}; color: ${selecionado ? '#ffffff' : bloqueado ? '#cbd5e1' : doMes ? '#1e293b' : '#94a3b8'}; font-weight: ${selecionado ? '700' : '400'};`;
            btn.addEventListener('click', () => {
                estado.data = dia;
                estado.mesVisivel = new Date(dia.getFullYear(), dia.getMonth(), 1);
                campoData.value = formatarBR(dia);
                marcarErro(campoData, false);
                renderCalendario();
            });
            diasEl.appendChild(btn);
        }
    }

    $('#agMesAnterior').addEventListener('click', () => {
        estado.mesVisivel = new Date(estado.mesVisivel.getFullYear(), estado.mesVisivel.getMonth() - 1, 1);
        renderCalendario();
    });
    $('#agMesProximo').addEventListener('click', () => {
        estado.mesVisivel = new Date(estado.mesVisivel.getFullYear(), estado.mesVisivel.getMonth() + 1, 1);
        renderCalendario();
    });

    // ---------- Horários ----------
    function renderHorarios() {
        horariosEl.innerHTML = '';
        horarios.forEach((h) => {
            const ativo = h === estado.horario;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'ag-horario';
            btn.textContent = h;
            btn.style.cssText = `height: 36px; border: 1px solid ${ativo ? AZUL : BORDA}; border-radius: 6px; font-family: inherit; font-size: 0.72rem; cursor: pointer; background-color: ${ativo ? AZUL : '#ffffff'}; color: ${ativo ? '#ffffff' : '#334155'}; font-weight: ${ativo ? '700' : '400'};`;
            btn.addEventListener('click', () => {
                estado.horario = h;
                selectHorario.value = h;
                marcarErro(selectHorario, false);
                renderHorarios();
            });
            horariosEl.appendChild(btn);
        });
    }

    selectHorario.addEventListener('change', () => {
        estado.horario = selectHorario.value;
        marcarErro(selectHorario, false);
        renderHorarios();
    });

    // ---------- Demais campos ----------
    campoObs.addEventListener('input', () => {
        contador.textContent = `${campoObs.value.length}/${LIMITE_OBSERVACOES}`;
    });
    campoLink.addEventListener('input', () => marcarErro(campoLink, false));

    // ---------- Validação e ações ----------
    function validar() {
        let ok = true;

        const semEntrevistador = estado.selecionados.length === 0;
        marcarErro(caixaEntrevistadores, semEntrevistador);
        if (semEntrevistador) ok = false;

        marcarErro(campoData, !estado.data);
        if (!estado.data) ok = false;

        marcarErro(selectHorario, !estado.horario);
        if (!estado.horario) ok = false;

        if (estado.tipo === 'online') {
            const linkValido = /^https?:\/\/\S+$/i.test(campoLink.value.trim());
            marcarErro(campoLink, !linkValido);
            if (!linkValido) ok = false;
        }

        return ok;
    }

    btnConfirmar.addEventListener('mouseenter', () => { if (!btnConfirmar.disabled) btnConfirmar.style.backgroundColor = AZUL_HOVER; });
    btnConfirmar.addEventListener('mouseleave', () => { if (!btnConfirmar.disabled) btnConfirmar.style.backgroundColor = AZUL; });
    btnCancelar.addEventListener('mouseenter', () => btnCancelar.style.backgroundColor = '#eff3ff');
    btnCancelar.addEventListener('mouseleave', () => btnCancelar.style.backgroundColor = '#ffffff');

    btnCancelar.addEventListener('click', () => {
        modal.remove();
        fecharPadrao();
    });

    btnConfirmar.addEventListener('click', async () => {
        if (!validar()) return;

        const dados = {
            tipo: estado.tipo,
            entrevistadores: [...estado.selecionados],
            data: formatarISO(estado.data),
            horario: estado.horario,
            duracao: Number(selectDuracao.value),
            link: estado.tipo === 'online' ? campoLink.value.trim() : '',
            observacoes: campoObs.value.trim()
        };

        btnConfirmar.disabled = true;
        btnConfirmar.textContent = 'Agendando...';

        if (aoConfirmar) {
            await aoConfirmar(dados);
        }

        modal.remove();
    });

    // ---------- Estado inicial ----------
    if (estado.data) campoData.value = formatarBR(estado.data);
    selectHorario.value = estado.horario;
    atualizarTipo();
    renderChips();
    renderCalendario();
    renderHorarios();

    return modal;
}

export function abrirModalAgendarEntrevista(opcoes = {}) {
    const modal = renderModalAgendarEntrevista({
        ...opcoes,
        aoCancelar: () => {
            if (opcoes.aoCancelar) opcoes.aoCancelar();
        }
    });
    document.body.appendChild(modal);
}