import { criarSidebar } from '../components/sidebar.js';
import { criarFormularioDinamico } from '../components/form.js';
import { criarStepper, ETAPAS_CADASTRO } from '../components/stepper.js';

const LISTA_IDIOMAS = [
    'Português',
    'Inglês',
    'Espanhol',
    'Francês',
    'Alemão',
    'Italiano',
    'Japonês',
    'Mandarim',
    'Coreano',
    'Russo',
    'Árabe',
    'Holandês',
    'Sueco',
    'Norueguês',
    'Dinamarquês',
    'Polonês',
    'Turco',
    'Grego',
    'Hebraico',
    'Hindi',
    'Bengali',
    'Tailandês',
    'Vietnamita',
    'Indonésio',
    'Malaio',
    'Húngaro',
    'Tcheco',
    'Romeno',
    'Finlandês',
    'Ucraniano',
    'Libras'
];

export function renderMeusDados() {
    try {
        if (!window.perfilCandidatoState) {
            window.perfilCandidatoState = {
                etapaAtual: 1,
                dadosPessoais: {
                    nome: '', nascimento: '', genero: '', estadoCivil: '',
                    cpf: '', rg: '', email: '', celular: '', telefone: '',
                    linkedin: '', portfolio: '', fotoUrl: '',
                    cep: '', logradouro: '', numero: '', complemento: '',
                    bairro: '', cidade: '', estado: ''
                },
                formacoes: [],
                experiencias: [],
                cursos: [],
                idiomas: [],
                habilidades: [],
                diversidade: {
                    raca: '',
                    genero: '',
                    pcd: '',
                    faixaEtaria: '',
                    orientacao: '',
                    pronomes: '',
                    acessibilidade: ''
                }
            };
        }

        const state = window.perfilCandidatoState;
        if (!state.diversidade) {
            state.diversidade = {
                raca: '',
                genero: '',
                pcd: '',
                faixaEtaria: '',
                orientacao: '',
                pronomes: '',
                acessibilidade: ''
            };
        }

        const containerPagina = document.createElement('div');
        containerPagina.className = 'pagina-layout-dashboard';

        const sidebar = criarSidebar('candidato', state.dadosPessoais.nome || 'Candidato');
        containerPagina.appendChild(sidebar);

        const conteudoPrincipal = document.createElement('main');
        conteudoPrincipal.className = 'conteudo-principal';

        const mascaras = {
            cpf: (v) => v.replace(/\D/g, '').slice(0, 11)
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
            rg: (v) => v.replace(/\D/g, '').slice(0, 9)
                .replace(/(\d{2})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1})$/, '$1-$2'),
            cep: (v) => v.replace(/\D/g, '').slice(0, 8)
                .replace(/(\d{5})(\d)/, '$1-$2'),
            celular: (v) => v.replace(/\D/g, '').slice(0, 11)
                .replace(/^(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d{4})$/, '$1-$2'),
            telefone: (v) => v.replace(/\D/g, '').slice(0, 10)
                .replace(/^(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d{4})$/, '$1-$2'),
            data: (v) => v.replace(/\D/g, '').slice(0, 8)
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\d{2})(\d)/, '$1/$2')
        };

        function abrirSeletorCalendario(inputData) {
            if (!inputData || inputData.disabled) return;

            document.querySelectorAll('.picker-ancorado-campo').forEach(el => el.remove());

            const grupo = inputData.closest('.grupo-campo') || inputData.parentElement;
            const rect = (inputData.closest('.input-wrapper') || inputData).getBoundingClientRect();

            const picker = document.createElement('input');
            picker.type = 'date';
            picker.className = 'input-data-oculto picker-ancorado-campo';
            picker.style.position = 'fixed';
            picker.style.top = `${Math.round(rect.bottom + 4)}px`;
            picker.style.left = `${Math.round(rect.left)}px`;
            picker.style.width = `${Math.max(Math.round(rect.width), 170)}px`;
            picker.style.height = '32px';
            picker.style.opacity = '0';
            picker.style.pointerEvents = 'none';
            picker.style.zIndex = '9999';

            const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(inputData.value.trim());
            if (match) {
                const [, dia, mes, ano] = match;
                picker.value = `${ano}-${mes}-${dia}`;
            }

            if (grupo) {
                grupo.style.position = 'relative';
            }
            document.body.appendChild(picker);

            const limparPicker = () => {
                if (picker.parentNode) picker.remove();
            };

            picker.addEventListener('change', (ev) => {
                if (ev.target.value) {
                    const [ano, mes, dia] = ev.target.value.split('-');
                    inputData.value = `${dia}/${mes}/${ano}`;
                    inputData.dispatchEvent(new Event('input', { bubbles: true }));
                    inputData.dispatchEvent(new Event('change', { bubbles: true }));
                }
                limparPicker();
            });

            picker.addEventListener('blur', limparPicker);

            try {
                if (typeof picker.showPicker === 'function') {
                    picker.showPicker();
                } else {
                    picker.style.opacity = '1';
                    picker.style.pointerEvents = 'auto';
                    picker.focus();
                    picker.click();
                }
            } catch (_) {
                limparPicker();
            }
        }

        function configurarCamposData(formEl) {
            const idsDatas = [
                'input-nascimento', 'f-inicio', 'f-fim',
                'exp-inicio', 'exp-fim', 'c-inicio', 'c-fim'
            ];

            idsDatas.forEach(id => {
                const grupo = formEl.querySelector(`#${id}`)?.closest('.grupo-campo');
                if (!grupo) return;

                const todosInputs = grupo.querySelectorAll('input');
                todosInputs.forEach((inp, idx) => {
                    if (idx > 0) inp.remove();
                });

                const inputData = grupo.querySelector('input');
                if (!inputData) return;

                inputData.type = 'text';
                inputData.placeholder = 'dd/mm/aaaa';
                inputData.maxLength = 10;
                inputData.inputMode = 'numeric';
                if (id === 'input-nascimento') {
                    inputData.autocomplete = 'bday';
                }

                if (/^\d{4}-\d{2}-\d{2}$/.test(inputData.value)) {
                    const [a, m, d] = inputData.value.split('-');
                    inputData.value = `${d}/${m}/${a}`;
                }

                inputData.addEventListener('input', (e) => {
                    e.target.value = mascaras.data(e.target.value);
                });

                inputData.addEventListener('keydown', (e) => {
                    if ((e.altKey && e.key === 'ArrowDown') || e.key === 'F4') {
                        e.preventDefault();
                        abrirSeletorCalendario(inputData);
                    }
                });

                const wrapper = inputData.closest('.input-wrapper');
                if (wrapper) {
                    const iconesDir = wrapper.querySelectorAll('.icone-dir');
                    iconesDir.forEach((ic, idx) => {
                        if (idx > 0) ic.remove();
                    });

                    const iconeDir = wrapper.querySelector('.icone-dir');
                    if (iconeDir) {
                        iconeDir.classList.add('icone-calendario-clicavel');
                        iconeDir.setAttribute('role', 'button');
                        iconeDir.setAttribute('tabindex', '-1');
                        iconeDir.title = 'Selecionar no calendário';
                        iconeDir.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            abrirSeletorCalendario(inputData);
                        });
                    }
                }
            });
        }

        function montarSecaoDiversidade(formEl) {
            if (!formEl || formEl.querySelector('#container-diversidade-campos')) return;

            const div = state.diversidade;
            const check = (campo, valor) => div[campo] === valor ? 'checked' : '';

            const renderOpcoes = (nomeRadio, campoEstado, opcoes, colunaExtra = '') => opcoes.map(op => {
                const marcado = div[campoEstado] === op;
                return `
                    <label class="div-pill-opcao ${marcado ? 'selecionada' : ''} ${colunaExtra}">
                        <input type="radio" name="${nomeRadio}" value="${op}" ${check(campoEstado, op)}>
                        <span>${op}</span>
                    </label>
                `;
            }).join('');

            const containerDiv = document.createElement('div');
            containerDiv.id = 'container-diversidade-campos';
            containerDiv.className = 'div-secao-container';
            containerDiv.innerHTML = `
                <style>
                    .div-secao-container {
                        display: flex;
                        flex-direction: column;
                        gap: 18px;
                        margin-top: 8px;
                        margin-bottom: 24px;
                    }
                    .div-aviso-sigilo {
                        background: #f8fafc;
                        border: 1px solid #e2e8f0;
                        border-left: 4px solid #1d4ed8;
                        border-radius: 10px;
                        padding: 12px 16px;
                        font-size: 13.5px;
                        color: #475569;
                        line-height: 1.45;
                    }
                    .div-grid-3 {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                        gap: 16px;
                    }
                    .div-grid-2 {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
                        gap: 16px;
                    }
                    .div-card {
                        background: #ffffff;
                        border: 1px solid #e2e8f0;
                        border-radius: 14px;
                        padding: 18px;
                        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
                        display: flex;
                        flex-direction: column;
                        gap: 14px;
                    }
                    .div-card-titulo {
                        font-size: 14px;
                        font-weight: 600;
                        color: #0f172a;
                        line-height: 1.4;
                    }
                    .div-opcoes-grid {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        gap: 10px;
                    }
                    .div-opcoes-wrap {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                    }
                    .div-pill-opcao {
                        position: relative;
                        display: inline-flex;
                        align-items: center;
                        gap: 9px;
                        padding: 10px 13px;
                        border: 1px solid #cbd5e1;
                        border-radius: 10px;
                        background: #ffffff;
                        color: #334155;
                        font-size: 13px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.16s ease;
                        user-select: none;
                        min-height: 42px;
                    }
                    .div-pill-opcao.full-span {
                        grid-column: 1 / -1;
                    }
                    .div-pill-opcao:hover {
                        border-color: #93c5fd;
                        background: #f8fafc;
                    }
                    .div-pill-opcao.selecionada {
                        border-color: #1d4ed8;
                        background: #eff6ff;
                        color: #1e3a8a;
                        font-weight: 600;
                        box-shadow: 0 0 0 1px rgba(29, 78, 216, 0.15);
                    }
                    .div-pill-opcao input[type="radio"] {
                        accent-color: #1d4ed8;
                        width: 15px;
                        height: 15px;
                        margin: 0;
                        flex-shrink: 0;
                        cursor: pointer;
                    }
                    .div-pill-opcao span {
                        line-height: 1.25;
                    }
                    .div-input-acessibilidade {
                        width: 100%;
                        padding: 11px 14px;
                        border: 1px solid #cbd5e1;
                        border-radius: 10px;
                        font-size: 13.5px;
                        color: #0f172a;
                        background: #ffffff;
                        outline: none;
                        transition: border-color 0.16s ease, box-shadow 0.16s ease;
                        box-sizing: border-box;
                    }
                    .div-input-acessibilidade:focus {
                        border-color: #1d4ed8;
                        box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.12);
                    }
                </style>

                <div class="div-aviso-sigilo">
                    <strong>Inclusão e confidencialidade:</strong> estas informações ajudam a promover processos seletivos mais justos e acessíveis. Você pode escolher <em>“Prefiro não informar”</em> em qualquer pergunta.
                </div>

                <div class="div-grid-3">
                    <div class="div-card">
                        <div class="div-card-titulo">1. Como você se declara? (Raça / Cor)</div>
                        <div class="div-opcoes-grid">
                            ${renderOpcoes('div-raca', 'raca', ['Branca', 'Preta', 'Parda', 'Amarela', 'Indígena', 'Prefiro não informar'])}
                        </div>
                    </div>

                    <div class="div-card">
                        <div class="div-card-titulo">2. Qual é a sua identidade de gênero?</div>
                        <div class="div-opcoes-grid">
                            ${renderOpcoes('div-genero', 'genero', ['Mulher cis', 'Homem cis', 'Mulher trans', 'Homem trans', 'Não binário', 'Prefiro não informar'])}
                        </div>
                    </div>

                    <div class="div-card">
                        <div class="div-card-titulo">3. Você é uma pessoa com deficiência (PCD)?</div>
                        <div class="div-opcoes-wrap">
                            ${renderOpcoes('div-pcd', 'pcd', ['Sim', 'Não', 'Prefiro não informar'])}
                        </div>
                    </div>
                </div>

                <div class="div-grid-2">
                    <div class="div-card">
                        <div class="div-card-titulo">4. Qual é a sua faixa etária?</div>
                        <div class="div-opcoes-wrap">
                            ${renderOpcoes('div-idade', 'faixaEtaria', ['Menos de 18 anos', '18 a 24 anos', '25 a 34 anos', '35 a 44 anos', '45 a 54 anos', '55 anos ou mais'])}
                        </div>
                    </div>

                    <div class="div-card">
                        <div class="div-card-titulo">5. Qual é a sua orientação sexual?</div>
                        <div class="div-opcoes-wrap">
                            ${renderOpcoes('div-orientacao', 'orientacao', ['Heterossexual', 'Homossexual', 'Bissexual', 'Assexual', 'Outro', 'Prefiro não informar'])}
                        </div>
                    </div>
                </div>

                <div class="div-grid-2">
                    <div class="div-card">
                        <div class="div-card-titulo">6. Quais pronomes você prefere?</div>
                        <div class="div-opcoes-wrap">
                            ${renderOpcoes('div-pronomes', 'pronomes', ['Ela / Dela', 'Ele / Dele', 'Elu / Delu', 'Qualquer pronome', 'Prefiro não informar'])}
                        </div>
                    </div>

                    <div class="div-card">
                        <div class="div-card-titulo">7. Precisa de alguma adaptação ou recurso de acessibilidade? (Opcional)</div>
                        <input
                            type="text"
                            id="div-acessibilidade"
                            class="div-input-acessibilidade"
                            placeholder="Ex: intérprete de Libras, leitor de tela, ergonomia específica..."
                            value="${div.acessibilidade || ''}"
                        >
                    </div>
                </div>
            `;

            const rodapePrincipal = formEl.querySelector('.acoes-formulario');
            const secaoBloco = formEl.querySelector('.secao-form-bloco');

            if (secaoBloco) {
                secaoBloco.appendChild(containerDiv);
            } else if (rodapePrincipal) {
                formEl.insertBefore(containerDiv, rodapePrincipal);
            } else {
                formEl.appendChild(containerDiv);
            }

            containerDiv.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', () => {
                    const mesmoGrupo = containerDiv.querySelectorAll(`input[name="${radio.name}"]`);
                    mesmoGrupo.forEach(item => {
                        const pill = item.closest('.div-pill-opcao');
                        if (pill) {
                            pill.classList.toggle('selecionada', item.checked);
                        }
                    });
                    salvarDadosDaEtapaAtual(formEl);
                });
            });

            const inputAcess = containerDiv.querySelector('#div-acessibilidade');
            if (inputAcess) {
                inputAcess.addEventListener('input', () => salvarDadosDaEtapaAtual(formEl));
            }
        }

        function validarCamposObrigatorios(formEl, idsObrigatorios, mensagemErro) {
            let valido = true;

            idsObrigatorios.forEach(id => {
                const el = formEl.querySelector(`#${id}`);
                const grupo = el ? el.closest('.grupo-campo') : null;
                if (grupo) grupo.classList.remove('erro-campo');

                if (el && !el.value.trim()) {
                    valido = false;
                    if (grupo) grupo.classList.add('erro-campo');
                }
            });

            if (!valido) {
                exibirErro(mensagemErro);
            } else if (alertaErroEl) {
                alertaErroEl.style.display = 'none';
            }

            return valido;
        }

        function configurarLimpezaErroAoDigitar(formEl, idsCampos) {
            idsCampos.forEach(id => {
                const el = formEl.querySelector(`#${id}`);
                if (!el) return;

                const limpar = () => {
                    const grupo = el.closest('.grupo-campo');
                    if (grupo && el.value.trim()) {
                        grupo.classList.remove('erro-campo');
                    }
                };

                el.addEventListener('input', limpar);
                el.addEventListener('change', limpar);
            });
        }

        function configurarEstadoAtualOuCursando(formEl, { checkboxId, inputFimId, placeholderAtivo, textoAtual, selectSituacaoId, valorSituacaoAtual }) {
            const checkbox = formEl.querySelector(`#${checkboxId}`);
            const inputFim = formEl.querySelector(`#${inputFimId}`);
            const selectSituacao = selectSituacaoId ? formEl.querySelector(`#${selectSituacaoId}`) : null;

            if (!checkbox || !inputFim) return;

            const atualizar = () => {
                const ativo = checkbox.checked;
                const grupoFim = inputFim.closest('.grupo-campo');
                const wrapperFim = inputFim.closest('.input-wrapper');
                const iconeFim = wrapperFim ? wrapperFim.querySelector('.icone-dir') : null;

                inputFim.disabled = ativo;

                if (ativo) {
                    inputFim.value = '';
                    inputFim.placeholder = textoAtual;
                    if (grupoFim) grupoFim.classList.remove('erro-campo');
                    if (iconeFim) iconeFim.classList.add('icone-desabilitado');
                    if (selectSituacao && valorSituacaoAtual && (!selectSituacao.value || selectSituacao.value === 'Concluído')) {
                        selectSituacao.value = valorSituacaoAtual;
                        const grupoSit = selectSituacao.closest('.grupo-campo');
                        if (grupoSit) grupoSit.classList.remove('erro-campo');
                    }
                } else {
                    inputFim.placeholder = placeholderAtivo;
                    if (iconeFim) iconeFim.classList.remove('icone-desabilitado');
                }
            };

            checkbox.addEventListener('change', atualizar);
            atualizar();
        }

        function adicionarFormacaoDoFormulario(formEl) {
            const obrigatoriosFormacao = [
                'f-instituicao',
                'f-curso',
                'f-grau',
                'f-situacao',
                'f-inicio'
            ];

            if (!validarCamposObrigatorios(
                formEl,
                obrigatoriosFormacao,
                'Existem campos obrigatórios não preenchidos. Verifique os itens destacados em vermelho.'
            )) {
                return;
            }

            const instEl = formEl.querySelector('#f-instituicao');
            const cursoEl = formEl.querySelector('#f-curso');
            const grauEl = formEl.querySelector('#f-grau');
            const sitEl = formEl.querySelector('#f-situacao');
            const iniEl = formEl.querySelector('#f-inicio');
            const fimEl = formEl.querySelector('#f-fim');
            const cursandoEl = formEl.querySelector('#f-cursando');
            const obsEl = formEl.querySelector('#f-obs');

            const inst = instEl ? instEl.value.trim() : '';
            const curso = cursoEl ? cursoEl.value.trim() : '';
            const grau = grauEl ? grauEl.value.trim() : '';
            const sit = sitEl ? sitEl.value : '';
            const ini = iniEl ? iniEl.value.trim() : '';
            const fim = fimEl ? fimEl.value.trim() : '';
            const cursando = cursandoEl ? cursandoEl.checked : false;
            const obs = obsEl ? obsEl.value.trim() : '';

            state.formacoes.push({
                titulo: `${curso}${grau ? ` (${grau})` : ''}`,
                subtitulo: `${inst} • ${sit}${obs ? ` — ${obs}` : ''}`,
                periodo: `${ini} - ${cursando ? 'Cursando atualmente' : (fim || 'Não informada')}`
            });

            if (instEl) instEl.value = '';
            if (cursoEl) cursoEl.value = '';
            if (grauEl) grauEl.value = '';
            if (sitEl) sitEl.value = '';
            if (iniEl) iniEl.value = '';
            if (fimEl) fimEl.value = '';
            if (cursandoEl) cursandoEl.checked = false;
            if (obsEl) obsEl.value = '';

            renderizarTelaAtual();
        }

        function adicionarExperienciaDoFormulario(formEl) {
            const obrigatoriosExp = [
                'exp-cargo',
                'exp-empresa',
                'exp-contrato',
                'exp-inicio'
            ];

            if (!validarCamposObrigatorios(
                formEl,
                obrigatoriosExp,
                'Preencha os campos da experiência antes de adicionar ou deixe-os em branco se for seu primeiro emprego.'
            )) {
                return;
            }

            const cargoEl = formEl.querySelector('#exp-cargo');
            const empresaEl = formEl.querySelector('#exp-empresa');
            const locEl = formEl.querySelector('#exp-localizacao');
            const contratoEl = formEl.querySelector('#exp-contrato');
            const iniEl = formEl.querySelector('#exp-inicio');
            const fimEl = formEl.querySelector('#exp-fim');
            const atualEl = formEl.querySelector('#exp-atual');
            const obsEl = formEl.querySelector('#exp-obs');

            const cargo = cargoEl ? cargoEl.value.trim() : '';
            const empresa = empresaEl ? empresaEl.value.trim() : '';
            const loc = locEl ? locEl.value.trim() : '';
            const contrato = contratoEl ? contratoEl.value : '';
            const ini = iniEl ? iniEl.value.trim() : '';
            const fim = fimEl ? fimEl.value.trim() : '';
            const atual = atualEl ? atualEl.checked : false;
            const obs = obsEl ? obsEl.value.trim() : '';

            state.experiencias.push({
                titulo: `${cargo}${contrato ? ` (${contrato})` : ''}`,
                subtitulo: `${empresa}${loc ? ` • ${loc}` : ''}${obs ? ` — ${obs}` : ''}`,
                periodo: `${ini} - ${atual ? 'Trabalho atual' : (fim || 'Não informada')}`
            });

            if (cargoEl) cargoEl.value = '';
            if (empresaEl) empresaEl.value = '';
            if (locEl) locEl.value = '';
            if (contratoEl) contratoEl.value = '';
            if (iniEl) iniEl.value = '';
            if (fimEl) fimEl.value = '';
            if (atualEl) atualEl.checked = false;
            if (obsEl) obsEl.value = '';

            renderizarTelaAtual();
        }

        function adicionarCursoDoFormulario(formEl) {
            const obrigatoriosCurso = [
                'c-nome',
                'c-instituicao',
                'c-tipo',
                'c-inicio'
            ];

            if (!validarCamposObrigatorios(
                formEl,
                obrigatoriosCurso,
                'Preencha os campos do curso/certificado antes de adicionar ou deixe-os em branco.'
            )) {
                return;
            }

            const nomeEl = formEl.querySelector('#c-nome');
            const instEl = formEl.querySelector('#c-instituicao');
            const tipoEl = formEl.querySelector('#c-tipo');
            const iniEl = formEl.querySelector('#c-inicio');
            const fimEl = formEl.querySelector('#c-fim');
            const cursandoEl = formEl.querySelector('#c-cursando');
            const obsEl = formEl.querySelector('#c-obs');

            const nome = nomeEl ? nomeEl.value.trim() : '';
            const inst = instEl ? instEl.value.trim() : '';
            const tipo = tipoEl ? tipoEl.value : '';
            const ini = iniEl ? iniEl.value.trim() : '';
            const fim = fimEl ? fimEl.value.trim() : '';
            const cursando = cursandoEl ? cursandoEl.checked : false;
            const obs = obsEl ? obsEl.value.trim() : '';

            state.cursos.push({
                titulo: `${nome}${tipo ? ` (${tipo})` : ''}`,
                subtitulo: `${inst}${obs ? ` — ${obs}` : ''}`,
                periodo: `${ini} - ${cursando ? 'Cursando atualmente' : (fim || 'Não informada')}`
            });

            if (nomeEl) nomeEl.value = '';
            if (instEl) instEl.value = '';
            if (tipoEl) tipoEl.value = '';
            if (iniEl) iniEl.value = '';
            if (fimEl) fimEl.value = '';
            if (cursandoEl) cursandoEl.checked = false;
            if (obsEl) obsEl.value = '';

            renderizarTelaAtual();
        }

        const obterBandeiraIdioma = (nomeIdioma) => {
            const norm = nomeIdioma.toLowerCase().trim();
            let codigoPais = '';

            if (norm.includes('português') || norm.includes('portugues')) codigoPais = 'br';
            else if (norm.includes('inglês') || norm.includes('ingles') || norm.includes('english')) codigoPais = 'us';
            else if (norm.includes('espanhol') || norm.includes('spanish')) codigoPais = 'es';
            else if (norm.includes('francês') || norm.includes('frances') || norm.includes('french')) codigoPais = 'fr';
            else if (norm.includes('alemão') || norm.includes('alemao') || norm.includes('german')) codigoPais = 'de';
            else if (norm.includes('italiano') || norm.includes('italian')) codigoPais = 'it';
            else if (norm.includes('japonês') || norm.includes('japones') || norm.includes('japanese')) codigoPais = 'jp';
            else if (norm.includes('mandarim') || norm.includes('chinês') || norm.includes('chines')) codigoPais = 'cn';
            else if (norm.includes('coreano') || norm.includes('korean')) codigoPais = 'kr';
            else if (norm.includes('russo') || norm.includes('russian')) codigoPais = 'ru';
            else if (norm.includes('árabe') || norm.includes('arabe') || norm.includes('arabic')) codigoPais = 'sa';
            else if (norm.includes('holandês') || norm.includes('holandes') || norm.includes('dutch')) codigoPais = 'nl';
            else if (norm.includes('sueco') || norm.includes('swedish')) codigoPais = 'se';
            else if (norm.includes('norueguês') || norm.includes('noruegues')) codigoPais = 'no';
            else if (norm.includes('dinamarquês') || norm.includes('dinamarques')) codigoPais = 'dk';
            else if (norm.includes('polonês') || norm.includes('polones')) codigoPais = 'pl';
            else if (norm.includes('turco') || norm.includes('turkish')) codigoPais = 'tr';
            else if (norm.includes('grego') || norm.includes('greek')) codigoPais = 'gr';
            else if (norm.includes('hebraico') || norm.includes('hebrew')) codigoPais = 'il';
            else if (norm.includes('hindi')) codigoPais = 'in';
            else if (norm.includes('bengali')) codigoPais = 'bd';
            else if (norm.includes('tailandês') || norm.includes('tailandes')) codigoPais = 'th';
            else if (norm.includes('vietnamita')) codigoPais = 'vn';
            else if (norm.includes('indonésio') || norm.includes('indonesio')) codigoPais = 'id';
            else if (norm.includes('malaio')) codigoPais = 'my';
            else if (norm.includes('húngaro') || norm.includes('hungaro')) codigoPais = 'hu';
            else if (norm.includes('tcheco')) codigoPais = 'cz';
            else if (norm.includes('romeno')) codigoPais = 'ro';
            else if (norm.includes('finlandês') || norm.includes('finlandes')) codigoPais = 'fi';
            else if (norm.includes('ucraniano')) codigoPais = 'ua';

            if (codigoPais) {
                return `<img src="https://flagcdn.com/w80/${codigoPais}.png" alt="${nomeIdioma}" class="bandeira-idioma-img">`;
            }

            return `<span class="bandeira-idioma-fallback">🌐</span>`;
        };

        function adicionarIdiomaDoFormulario(formEl) {
            if (!validarCamposObrigatorios(
                formEl,
                ['i-idioma', 'i-nivel'],
                'Selecione o idioma e o nível de proficiência antes de adicionar.'
            )) {
                return;
            }

            const idiomaEl = formEl.querySelector('#i-idioma');
            const nivelEl = formEl.querySelector('#i-nivel');
            const idioma = idiomaEl ? idiomaEl.value.trim() : '';
            const nivel = nivelEl ? nivelEl.value : '';

            const bandeiraImg = obterBandeiraIdioma(idioma);
            state.idiomas.push({
                titulo: `<div class="item-idioma-conteudo">${bandeiraImg}<span>${idioma}</span></div>`,
                subtitulo: `Nível: ${nivel}`
            });

            if (idiomaEl) idiomaEl.value = '';
            if (nivelEl) nivelEl.value = '';

            renderizarTelaAtual();
        }

        function adicionarHabilidadeDoFormulario(formEl) {
            if (!validarCamposObrigatorios(
                formEl,
                ['h-habilidade'],
                'Digite uma habilidade antes de adicionar.'
            )) {
                return;
            }

            const habEl = formEl.querySelector('#h-habilidade');
            const hab = habEl ? habEl.value.trim() : '';

            state.habilidades.push({
                titulo: hab
            });

            if (habEl) habEl.value = '';

            renderizarTelaAtual();
        }

        function montarControlesListaDinamica(formEl, {
            idPrefix,
            textoBotaoAdicionar,
            tituloLista,
            textoVazio,
            itens,
            camposLimpar,
            checkboxAtualId,
            onAdicionar,
            onRemover
        }) {
            const secaoAlvo = formEl.querySelector('.secao-form-bloco') || formEl;
            const rodapePrincipal = formEl.querySelector('.acoes-formulario');

            const jaTemBotaoAdicionar = Array.from(formEl.querySelectorAll('button')).some(
                btn => btn.textContent && btn.textContent.toLowerCase().includes(textoBotaoAdicionar.toLowerCase())
            );

            if (!jaTemBotaoAdicionar) {
                const barraAcoes = document.createElement('div');
                barraAcoes.className = 'acoes-formacao-lista';

                const btnAdd = document.createElement('button');
                btnAdd.type = 'button';
                btnAdd.id = `btn-adicionar-${idPrefix}`;
                btnAdd.className = 'btn-adicionar-item';
                btnAdd.textContent = `+ ${textoBotaoAdicionar}`;
                btnAdd.addEventListener('click', () => onAdicionar(formEl));

                const btnLimpar = document.createElement('button');
                btnLimpar.type = 'button';
                btnLimpar.id = `btn-limpar-${idPrefix}`;
                btnLimpar.className = 'btn-limpar-campos';
                btnLimpar.textContent = 'Limpar campos';
                btnLimpar.addEventListener('click', () => {
                    camposLimpar.forEach(id => {
                        const el = formEl.querySelector(`#${id}`);
                        if (el) el.value = '';
                        const grupo = el ? el.closest('.grupo-campo') : null;
                        if (grupo) grupo.classList.remove('erro-campo');
                    });
                    if (checkboxAtualId) {
                        const chk = formEl.querySelector(`#${checkboxAtualId}`);
                        if (chk) {
                            chk.checked = false;
                            chk.dispatchEvent(new Event('change'));
                        }
                    }
                    if (alertaErroEl) alertaErroEl.style.display = 'none';
                });

                barraAcoes.appendChild(btnAdd);
                barraAcoes.appendChild(btnLimpar);

                if (rodapePrincipal) {
                    formEl.insertBefore(barraAcoes, rodapePrincipal);
                } else {
                    secaoAlvo.appendChild(barraAcoes);
                }
            }

            const listaId = `lista-itens-${idPrefix}`;
            if (!formEl.querySelector(`#${listaId}`)) {
                const containerLista = document.createElement('div');
                containerLista.id = listaId;
                containerLista.className = 'lista-itens-dinamica';

                const tituloEl = document.createElement('h4');
                tituloEl.className = 'lista-itens-titulo';
                tituloEl.textContent = `${tituloLista} (${itens.length})`;
                containerLista.appendChild(tituloEl);

                if (itens.length === 0) {
                    const vazio = document.createElement('p');
                    vazio.className = 'lista-itens-vazio';
                    vazio.textContent = textoVazio;
                    containerLista.appendChild(vazio);
                } else {
                    itens.forEach((item, idx) => {
                        const card = document.createElement('div');
                        card.className = 'card-item-adicionado';

                        const info = document.createElement('div');
                        info.innerHTML = `
                            <div class="item-adicionado-titulo">${item.titulo}</div>
                            ${item.subtitulo ? `<div class="item-adicionado-subtitulo">${item.subtitulo}</div>` : ''}
                            ${item.periodo ? `<div class="item-adicionado-periodo">${item.periodo}</div>` : ''}
                        `;

                        const btnRemover = document.createElement('button');
                        btnRemover.type = 'button';
                        btnRemover.className = 'btn-remover-item';
                        btnRemover.textContent = 'Remover';
                        btnRemover.addEventListener('click', () => onRemover(idx));

                        card.appendChild(info);
                        card.appendChild(btnRemover);
                        containerLista.appendChild(card);
                    });
                }

                if (rodapePrincipal) {
                    formEl.insertBefore(containerLista, rodapePrincipal);
                } else {
                    secaoAlvo.appendChild(containerLista);
                }
            }
        }

        function aplicarMascarasNaTela(formEl) {
            const mapa = [
                { id: 'input-cpf', fn: mascaras.cpf },
                { id: 'input-rg', fn: mascaras.rg },
                { id: 'input-cep', fn: mascaras.cep },
                { id: 'input-celular', fn: mascaras.celular },
                { id: 'input-telefone', fn: mascaras.telefone }
            ];
            mapa.forEach(({ id, fn }) => {
                const el = formEl.querySelector(`#${id}`);
                if (el) {
                    el.addEventListener('input', (e) => {
                        e.target.value = fn(e.target.value);
                    });
                }
            });
            configurarCamposData(formEl);
        }

        function configurarViaCep(formEl) {
            const inputCep = formEl.querySelector('#input-cep');
            if (!inputCep) return;

            inputCep.addEventListener('input', async (e) => {
                const cepLimpo = e.target.value.replace(/\D/g, '');
                if (cepLimpo.length === 8) {
                    const inputLog = formEl.querySelector('#input-logradouro');
                    const inputNum = formEl.querySelector('#input-numero');
                    const selBairro = formEl.querySelector('#select-bairro');
                    const selCidade = formEl.querySelector('#select-cidade');
                    const selEstado = formEl.querySelector('#select-estado');

                    if (inputLog) inputLog.value = 'Buscando endereço...';

                    try {
                        const resp = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
                        const dados = await resp.json();

                        if (!dados.erro) {
                            if (inputLog) inputLog.value = dados.logradouro || '';
                            if (dados.bairro && selBairro) {
                                selBairro.innerHTML = `<option value="${dados.bairro}" selected>${dados.bairro}</option>`;
                            }
                            if (dados.localidade && selCidade) {
                                selCidade.innerHTML = `<option value="${dados.localidade}" selected>${dados.localidade}</option>`;
                            }
                            if (dados.uf && selEstado) {
                                selEstado.value = dados.uf;
                            }
                            if (inputNum) inputNum.focus();
                        } else {
                            if (inputLog) inputLog.value = '';
                            exibirErro('CEP não encontrado.');
                        }
                    } catch (err) {
                        if (inputLog) inputLog.value = '';
                        exibirErro('Erro ao consultar o CEP. Verifique sua conexão.');
                    }
                }
            });
        }

        function salvarDadosDaEtapaAtual(formEl) {
            if (!formEl) return;
            const val = (id) => {
                const el = formEl.querySelector(`#${id}`);
                return el ? el.value.trim() : '';
            };

            if (state.etapaAtual === 1) {
                state.dadosPessoais.nome = val('input-nome');
                state.dadosPessoais.nascimento = val('input-nascimento');
                state.dadosPessoais.genero = val('select-genero');
                state.dadosPessoais.estadoCivil = val('select-estado-civil');
                state.dadosPessoais.cpf = val('input-cpf');
                state.dadosPessoais.rg = val('input-rg');
                state.dadosPessoais.email = val('input-email');
                state.dadosPessoais.celular = val('input-celular');
                state.dadosPessoais.telefone = val('input-telefone');
                state.dadosPessoais.linkedin = val('input-linkedin');
                state.dadosPessoais.portfolio = val('input-portfolio');
                state.dadosPessoais.cep = val('input-cep');
                state.dadosPessoais.logradouro = val('input-logradouro');
                state.dadosPessoais.numero = val('input-numero');
                state.dadosPessoais.complemento = val('input-complemento');
                state.dadosPessoais.bairro = val('select-bairro');
                state.dadosPessoais.cidade = val('select-cidade');
                state.dadosPessoais.estado = val('select-estado');
            } else if (state.etapaAtual === 7) {
                const raca = formEl.querySelector('input[name="div-raca"]:checked');
                const genero = formEl.querySelector('input[name="div-genero"]:checked');
                const pcd = formEl.querySelector('input[name="div-pcd"]:checked');
                const idade = formEl.querySelector('input[name="div-idade"]:checked');
                const orientacao = formEl.querySelector('input[name="div-orientacao"]:checked');
                const pronomes = formEl.querySelector('input[name="div-pronomes"]:checked');
                const acessibilidade = formEl.querySelector('#div-acessibilidade');

                if (raca) state.diversidade.raca = raca.value;
                if (genero) state.diversidade.genero = genero.value;
                if (pcd) state.diversidade.pcd = pcd.value;
                if (idade) state.diversidade.faixaEtaria = idade.value;
                if (orientacao) state.diversidade.orientacao = orientacao.value;
                if (pronomes) state.diversidade.pronomes = pronomes.value;
                if (acessibilidade) state.diversidade.acessibilidade = acessibilidade.value.trim();
            }
        }

        const iconeCalendario = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
        const iconeLinkedin = `<svg width="15" height="15" viewBox="0 0 24 24" fill="#0a66c2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`;
        const iconeLink = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

        function obterConfigFormularioPorEtapa(etapaId) {
            if (etapaId === 1) {
                const dp = state.dadosPessoais;
                return {
                    mostrarBotaoVoltar: false,
                    textoContinuar: 'Continuar',
                    secoes: [
                        {
                            titulo: 'Dados pessoais',
                            icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
                            comFoto: true,
                            fotoUrl: dp.fotoUrl,
                            onFotoChange: (url) => { state.dadosPessoais.fotoUrl = url; },
                            linhas: [
                                [
                                    { id: 'input-nome', label: 'Nome completo', placeholder: 'Digite seu nome completo', valor: dp.nome, obrigatorio: true },
                                    { id: 'input-nascimento', label: 'Data de nascimento', placeholder: 'dd/mm/aaaa', valor: dp.nascimento, maxLength: 10, obrigatorio: true, iconeDireita: iconeCalendario },
                                    { id: 'select-genero', label: 'Gênero', tipo: 'select', valor: dp.genero, opcoes: ['Feminino', 'Masculino', 'Não binário', 'Prefiro não informar'], obrigatorio: true }
                                ],
                                [
                                    { id: 'select-estado-civil', label: 'Estado civil', tipo: 'select', valor: dp.estadoCivil, opcoes: ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'], obrigatorio: true },
                                    { id: 'input-cpf', label: 'CPF', placeholder: '000.000.000-00', valor: dp.cpf, maxLength: 14, obrigatorio: true },
                                    { id: 'input-rg', label: 'RG', placeholder: '00.000.000-0', valor: dp.rg, maxLength: 12, obrigatorio: true }
                                ],
                                [
                                    { id: 'input-email', label: 'E-mail', tipo: 'email', placeholder: 'seuemail@example.com', valor: dp.email, obrigatorio: true },
                                    { id: 'input-celular', label: 'Celular', placeholder: '(00) 00000-0000', valor: dp.celular, maxLength: 15, obrigatorio: true },
                                    { id: 'input-telefone', label: 'Telefone (opcional)', placeholder: '(00) 0000-0000', valor: dp.telefone, maxLength: 14 }
                                ],
                                [
                                    { id: 'input-linkedin', label: 'LinkedIn (opcional)', placeholder: 'https://www.linkedin.com/in/seu-perfil', valor: dp.linkedin, iconeEsquerda: iconeLinkedin },
                                    { id: 'input-portfolio', label: 'Portfólio (opcional)', placeholder: 'https://seuportfolio.com', valor: dp.portfolio, iconeEsquerda: iconeLink }
                                ]
                            ]
                        },
                        {
                            titulo: 'Endereço',
                            icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
                            linhas: [
                                [
                                    { id: 'input-cep', label: 'CEP', placeholder: '00000-000', valor: dp.cep, maxLength: 9, obrigatorio: true },
                                    { id: 'input-logradouro', label: 'Logradouro', placeholder: 'Rua, Avenida, etc.', valor: dp.logradouro, obrigatorio: true },
                                    { id: 'input-numero', label: 'Número', placeholder: 'Nº', valor: dp.numero, obrigatorio: true },
                                    { id: 'input-complemento', label: 'Complemento', placeholder: 'Apto, Bloco, Sala, etc.', valor: dp.complemento }
                                ],
                                [
                                    { id: 'select-bairro', label: 'Bairro', tipo: 'select', placeholder: 'Selecione o bairro...', valor: dp.bairro, opcoes: dp.bairro ? [dp.bairro, 'Centro', 'Campolim', 'Jardim Europa'] : ['Centro', 'Campolim', 'Jardim Europa'], obrigatorio: true },
                                    { id: 'select-cidade', label: 'Cidade', tipo: 'select', placeholder: 'Selecione a cidade...', valor: dp.cidade, opcoes: dp.cidade ? [dp.cidade, 'Sorocaba', 'Votorantim', 'São Paulo'] : ['Sorocaba', 'Votorantim', 'São Paulo'], obrigatorio: true },
                                    { id: 'select-estado', label: 'Estado', tipo: 'select', placeholder: 'Selecione', valor: dp.estado, opcoes: ['SP', 'RJ', 'MG', 'PR', 'SC', 'RS', 'BA', 'PE', 'CE', 'DF'], obrigatorio: true }
                                ]
                            ]
                        }
                    ]
                };
            }

            if (etapaId === 2) {
                return {
                    mostrarBotaoVoltar: true,
                    textoContinuar: 'Continuar',
                    secoes: [
                        {
                            titulo: 'Formação Acadêmica',
                            icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
                            linhas: [
                                [
                                    { id: 'f-instituicao', label: 'Instituição de ensino', placeholder: 'Nome da instituição...', obrigatorio: true },
                                    { id: 'f-curso', label: 'Curso', placeholder: 'Nome do curso...', obrigatorio: true }
                                ],
                                [
                                    { id: 'f-grau', label: 'Grau acadêmico', placeholder: 'Ex: Bacharelado, Técnico...', obrigatorio: true },
                                    { id: 'f-situacao', label: 'Situação', tipo: 'select', opcoes: ['Concluído', 'Cursando', 'Trancado'], obrigatorio: true },
                                    { id: 'f-inicio', label: 'Data de início', placeholder: 'dd/mm/aaaa', maxLength: 10, obrigatorio: true, iconeDireita: iconeCalendario },
                                    { id: 'f-fim', label: 'Data de conclusão', placeholder: 'dd/mm/aaaa', maxLength: 10, iconeDireita: iconeCalendario }
                                ],
                                [
                                    { id: 'f-cursando', label: 'Cursando atualmente', tipo: 'checkbox' }
                                ],
                                [
                                    { id: 'f-obs', label: 'Descrição / Observação', tipo: 'textarea', placeholder: 'Escreva aqui a descrição ou observação...' }
                                ]
                            ],
                            botaoAdicionar: {
                                texto: 'Adicionar formação',
                                onClick: (formEl) => adicionarFormacaoDoFormulario(formEl)
                            },
                            listaItens: {
                                titulo: 'Suas Formações',
                                textoVazio: 'Nenhuma formação cadastrada.',
                                itens: state.formacoes,
                                onRemover: (idx) => {
                                    state.formacoes.splice(idx, 1);
                                    renderizarTelaAtual();
                                }
                            }
                        }
                    ]
                };
            }

            if (etapaId === 3) {
                return {
                    mostrarBotaoVoltar: true,
                    textoContinuar: 'Continuar',
                    secoes: [
                        {
                            titulo: 'Experiência profissional (opcional)',
                            icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
                            linhas: [
                                [
                                    { id: 'exp-cargo', label: 'Cargo', placeholder: 'Nome do cargo...' },
                                    { id: 'exp-empresa', label: 'Empresa', placeholder: 'Nome da empresa...' }
                                ],
                                [
                                    { id: 'exp-contrato', label: 'Tipo de contrato', tipo: 'select', opcoes: ['CLT', 'PJ', 'Estágio', 'Temporário'] },
                                    { id: 'exp-inicio', label: 'Data de início', placeholder: 'dd/mm/aaaa', maxLength: 10, iconeDireita: iconeCalendario },
                                    { id: 'exp-fim', label: 'Data de conclusão', placeholder: 'dd/mm/aaaa', maxLength: 10, iconeDireita: iconeCalendario }
                                ],
                                [
                                    { id: 'exp-atual', label: 'Trabalho atual', tipo: 'checkbox' }
                                ],
                                [
                                    { id: 'exp-obs', label: 'Descrição / Observação', tipo: 'textarea', placeholder: 'Descreva suas responsabilidades e conquistas...' }
                                ]
                            ],
                            botaoAdicionar: {
                                texto: 'Adicionar Experiência',
                                onClick: (formEl) => adicionarExperienciaDoFormulario(formEl)
                            },
                            listaItens: {
                                titulo: 'Suas Experiências',
                                textoVazio: 'Nenhuma experiência cadastrada. Se for seu primeiro emprego, você pode avançar sem preencher.',
                                itens: state.experiencias,
                                onRemover: (idx) => {
                                    state.experiencias.splice(idx, 1);
                                    renderizarTelaAtual();
                                }
                            }
                        }
                    ]
                };
            }

            if (etapaId === 4) {
                return {
                    mostrarBotaoVoltar: true,
                    textoContinuar: 'Continuar',
                    secoes: [
                        {
                            titulo: 'Cursos e Certificados (opcional)',
                            icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
                            linhas: [
                                [
                                    { id: 'c-nome', label: 'Nome do curso/certificação', placeholder: 'Nome do curso/certificado...' },
                                    { id: 'c-instituicao', label: 'Instituição', placeholder: 'Nome da instituição...' }
                                ],
                                [
                                    { id: 'c-tipo', label: 'Tipo', tipo: 'select', opcoes: ['Curso', 'Certificado', 'Workshop', 'Bootcamp'] },
                                    { id: 'c-inicio', label: 'Data de início', placeholder: 'dd/mm/aaaa', maxLength: 10, iconeDireita: iconeCalendario },
                                    { id: 'c-fim', label: 'Data de conclusão', placeholder: 'dd/mm/aaaa', maxLength: 10, iconeDireita: iconeCalendario }
                                ],
                                [
                                    { id: 'c-cursando', label: 'Cursando atualmente', tipo: 'checkbox' }
                                ],
                                [
                                    { id: 'c-obs', label: 'Descrição / Observação', tipo: 'textarea', placeholder: 'Escreva aqui a descrição ou observação...' }
                                ]
                            ],
                            botaoAdicionar: {
                                texto: 'Adicionar Curso/Certificação',
                                onClick: (formEl) => adicionarCursoDoFormulario(formEl)
                            },
                            listaItens: {
                                titulo: 'Seus cursos e certificados',
                                textoVazio: 'Nenhum curso cadastrado.',
                                itens: state.cursos,
                                onRemover: (idx) => {
                                    state.cursos.splice(idx, 1);
                                    renderizarTelaAtual();
                                }
                            }
                        }
                    ]
                };
            }

            if (etapaId === 5) {
                return {
                    mostrarBotaoVoltar: true,
                    textoContinuar: 'Continuar',
                    secoes: [
                        {
                            titulo: 'Idiomas',
                            icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
                            linhas: [
                                [
                                    {
                                        id: 'i-idioma',
                                        label: 'Idioma',
                                        tipo: 'select',
                                        placeholder: 'Selecione o idioma...',
                                        opcoes: LISTA_IDIOMAS,
                                        obrigatorio: true
                                    },
                                    {
                                        id: 'i-nivel',
                                        label: 'Nível de proficiência',
                                        tipo: 'select',
                                        placeholder: 'Selecione o nível...',
                                        opcoes: ['Básico', 'Intermediário', 'Avançado', 'Fluente', 'Nativo'],
                                        obrigatorio: true
                                    }
                                ]
                            ],
                            botaoAdicionar: {
                                texto: 'Adicionar idioma',
                                onClick: (formEl) => adicionarIdiomaDoFormulario(formEl)
                            },
                            listaItens: {
                                titulo: 'Seus idiomas',
                                textoVazio: 'Nenhum idioma cadastrado.',
                                itens: state.idiomas,
                                onRemover: (idx) => {
                                    state.idiomas.splice(idx, 1);
                                    renderizarTelaAtual();
                                }
                            }
                        }
                    ]
                };
            }

            if (etapaId === 6) {
                return {
                    mostrarBotaoVoltar: true,
                    textoContinuar: 'Continuar',
                    secoes: [
                        {
                            titulo: 'Habilidades (opcional)',
                            icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>`,
                            linhas: [
                                [
                                    {
                                        id: 'h-habilidade',
                                        label: 'Habilidade',
                                        placeholder: 'Ex: Excel, Comunicação, Trabalho em equipe, Organização...'
                                    }
                                ]
                            ],
                            botaoAdicionar: {
                                texto: 'Adicionar habilidade',
                                onClick: (formEl) => adicionarHabilidadeDoFormulario(formEl)
                            },
                            listaItens: {
                                titulo: 'Suas habilidades',
                                textoVazio: 'Nenhuma habilidade cadastrada.',
                                itens: state.habilidades,
                                onRemover: (idx) => {
                                    state.habilidades.splice(idx, 1);
                                    renderizarTelaAtual();
                                }
                            }
                        }
                    ]
                };
            }

            if (etapaId === 7) {
                return {
                    mostrarBotaoVoltar: true,
                    textoContinuar: 'Finalizar cadastro',
                    secoes: [
                        {
                            titulo: 'Diversidade',
                            icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
                            linhas: []
                        }
                    ]
                };
            }

            return null;
        }

        let alertaErroEl = null;
        let formularioAtualEl = null;

        function exibirErro(mensagem) {
            if (!alertaErroEl) return;
            const span = alertaErroEl.querySelector('#texto-alerta-erro');
            if (span) span.textContent = mensagem;
            alertaErroEl.style.display = 'flex';
            alertaErroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function renderizarTelaAtual() {
            conteudoPrincipal.innerHTML = '';

            if (state.etapaAtual > 7) {
                conteudoPrincipal.innerHTML = `
                    <div class="card-sucesso-container">
                        <div class="sucesso-cabecalho">
                            <div class="sucesso-icone-check">✓</div>
                            <h2 class="sucesso-titulo">Cadastro concluído!</h2>
                            <p class="sucesso-subtitulo">Suas informações foram salvas com sucesso. Agora seu perfil está pronto para ser encontrado pelos recrutadores.</p>
                        </div>

                        <div class="sucesso-banner-status">
                            Perfil atualizado com sucesso. Você pode alterar suas informações a qualquer momento.
                        </div>

                        <div class="secao-resumo-perfil">
                            <h3 class="resumo-titulo">Resumo do seu perfil</h3>
                            <div class="grid-opcoes-perfil">
                                <div class="card-opcao-item">
                                    <span class="card-opcao-check">✓</span>
                                    <div>
                                        <h4 class="card-opcao-titulo">Dados pessoais</h4>
                                        <p class="card-opcao-desc">Informações básicas e contato</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item">
                                    <span class="card-opcao-check">✓</span>
                                    <div>
                                        <h4 class="card-opcao-titulo">Formação acadêmica</h4>
                                        <p class="card-opcao-desc">${state.formacoes.length} formação(ões) cadastrada(s)</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item">
                                    <span class="card-opcao-check">✓</span>
                                    <div>
                                        <h4 class="card-opcao-titulo">Experiência profissional</h4>
                                        <p class="card-opcao-desc">${state.experiencias.length} experiência(s) cadastrada(s)</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item">
                                    <span class="card-opcao-check">✓</span>
                                    <div>
                                        <h4 class="card-opcao-titulo">Cursos e certificados</h4>
                                        <p class="card-opcao-desc">${state.cursos.length} curso(s) cadastrado(s)</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item">
                                    <span class="card-opcao-check">✓</span>
                                    <div>
                                        <h4 class="card-opcao-titulo">Idiomas</h4>
                                        <p class="card-opcao-desc">${state.idiomas.length} idioma(s) cadastrado(s)</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item">
                                    <span class="card-opcao-check">✓</span>
                                    <div>
                                        <h4 class="card-opcao-titulo">Habilidades</h4>
                                        <p class="card-opcao-desc">${state.habilidades.length} habilidade(s) cadastrada(s)</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item">
                                    <span class="card-opcao-check">✓</span>
                                    <div>
                                        <h4 class="card-opcao-titulo">Diversidade</h4>
                                        <p class="card-opcao-desc">Informações de diversidade e inclusão</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item">
                                    <span class="card-opcao-check">✓</span>
                                    <div>
                                        <h4 class="card-opcao-titulo">Perfil completo</h4>
                                        <p class="card-opcao-desc">100% das etapas preenchidas</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sucesso-dica-box">
                            <strong>Dica:</strong> Mantenha seu perfil sempre atualizado para aumentar a relevância das oportunidades recomendadas para você.
                        </div>

                        <div class="sucesso-acoes">
                            <button type="button" id="btn-editar-dados" class="btn-resumo-secundario">
                                Editar meus dados
                            </button>
                            <button type="button" id="btn-voltar-dashboard" class="btn-resumo-primario">
                                Voltar ao início
                            </button>
                        </div>
                    </div>
                `;

                const btnEditar = conteudoPrincipal.querySelector('#btn-editar-dados');
                if (btnEditar) {
                    btnEditar.addEventListener('click', () => {
                        state.etapaAtual = 1;
                        renderizarTelaAtual();
                    });
                }

                const btnDashboard = conteudoPrincipal.querySelector('#btn-voltar-dashboard');
                if (btnDashboard) {
                    btnDashboard.addEventListener('click', () => {
                        window.location.hash = '#dashboard-candidato';
                    });
                }

                return;
            }

            const h1 = document.createElement('h1');
            h1.className = 'titulo-pagina';
            h1.textContent = 'Meus dados';
            conteudoPrincipal.appendChild(h1);

            const pSub = document.createElement('p');
            pSub.className = 'subtitulo-pagina';
            pSub.textContent = 'Gerencie suas informações pessoais e profissionais.';
            conteudoPrincipal.appendChild(pSub);

            const stepperElement = criarStepper({
                etapaAtual: state.etapaAtual,
                onChange: (idDestino) => {
                    salvarDadosDaEtapaAtual(formularioAtualEl);
                    state.etapaAtual = idDestino;
                    renderizarTelaAtual();
                }
            });
            conteudoPrincipal.appendChild(stepperElement);

            const configForm = obterConfigFormularioPorEtapa(state.etapaAtual);
            formularioAtualEl = criarFormularioDinamico(configForm);
            formularioAtualEl.dataset.etapa = String(state.etapaAtual);

            alertaErroEl = document.createElement('div');
            alertaErroEl.className = 'alerta-erro-formulario';
            alertaErroEl.style.display = 'none';
            alertaErroEl.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="13"></line>
                    <line x1="12" y1="16" x2="12" y2="16.01"></line>
                </svg>
                <span id="texto-alerta-erro"></span>
            `;
            formularioAtualEl.insertBefore(alertaErroEl, formularioAtualEl.firstChild);

            aplicarMascarasNaTela(formularioAtualEl);

            if (state.etapaAtual === 1) {
                configurarViaCep(formularioAtualEl);
                configurarLimpezaErroAoDigitar(formularioAtualEl, [
                    'input-nome', 'input-nascimento', 'select-genero',
                    'select-estado-civil', 'input-cpf', 'input-rg',
                    'input-email', 'input-celular', 'input-cep',
                    'input-logradouro', 'input-numero', 'select-bairro',
                    'select-cidade', 'select-estado'
                ]);
            } else if (state.etapaAtual === 2) {
                configurarEstadoAtualOuCursando(formularioAtualEl, {
                    checkboxId: 'f-cursando',
                    inputFimId: 'f-fim',
                    placeholderAtivo: 'dd/mm/aaaa',
                    textoAtual: 'Cursando atualmente',
                    selectSituacaoId: 'f-situacao',
                    valorSituacaoAtual: 'Cursando'
                });
                configurarLimpezaErroAoDigitar(formularioAtualEl, [
                    'f-instituicao', 'f-curso', 'f-grau', 'f-situacao', 'f-inicio'
                ]);
                montarControlesListaDinamica(formularioAtualEl, {
                    idPrefix: 'formacao',
                    textoBotaoAdicionar: 'Adicionar formação',
                    tituloLista: 'Suas Formações',
                    textoVazio: 'Nenhuma formação cadastrada.',
                    itens: state.formacoes,
                    camposLimpar: ['f-instituicao', 'f-curso', 'f-grau', 'f-situacao', 'f-inicio', 'f-fim', 'f-obs'],
                    checkboxAtualId: 'f-cursando',
                    onAdicionar: adicionarFormacaoDoFormulario,
                    onRemover: (idx) => {
                        state.formacoes.splice(idx, 1);
                        renderizarTelaAtual();
                    }
                });
            } else if (state.etapaAtual === 3) {
                configurarEstadoAtualOuCursando(formularioAtualEl, {
                    checkboxId: 'exp-atual',
                    inputFimId: 'exp-fim',
                    placeholderAtivo: 'dd/mm/aaaa',
                    textoAtual: 'Trabalho atual'
                });
                configurarLimpezaErroAoDigitar(formularioAtualEl, [
                    'exp-cargo', 'exp-empresa', 'exp-contrato', 'exp-inicio'
                ]);
                montarControlesListaDinamica(formularioAtualEl, {
                    idPrefix: 'experiencia',
                    textoBotaoAdicionar: 'Adicionar experiência',
                    tituloLista: 'Suas Experiências',
                    textoVazio: 'Nenhuma experiência cadastrada. Se for seu primeiro emprego, você pode avançar sem preencher.',
                    itens: state.experiencias,
                    camposLimpar: ['exp-cargo', 'exp-empresa', 'exp-contrato', 'exp-inicio', 'exp-fim', 'exp-obs'],
                    checkboxAtualId: 'exp-atual',
                    onAdicionar: adicionarExperienciaDoFormulario,
                    onRemover: (idx) => {
                        state.experiencias.splice(idx, 1);
                        renderizarTelaAtual();
                    }
                });
            } else if (state.etapaAtual === 4) {
                configurarEstadoAtualOuCursando(formularioAtualEl, {
                    checkboxId: 'c-cursando',
                    inputFimId: 'c-fim',
                    placeholderAtivo: 'dd/mm/aaaa',
                    textoAtual: 'Cursando atualmente'
                });
                configurarLimpezaErroAoDigitar(formularioAtualEl, [
                    'c-nome', 'c-instituicao', 'c-tipo', 'c-inicio'
                ]);
                montarControlesListaDinamica(formularioAtualEl, {
                    idPrefix: 'curso',
                    textoBotaoAdicionar: 'Adicionar curso',
                    tituloLista: 'Seus Cursos e Certificados',
                    textoVazio: 'Nenhum curso cadastrado.',
                    itens: state.cursos,
                    camposLimpar: ['c-nome', 'c-instituicao', 'c-tipo', 'c-inicio', 'c-fim', 'c-obs'],
                    checkboxAtualId: 'c-cursando',
                    onAdicionar: adicionarCursoDoFormulario,
                    onRemover: (idx) => {
                        state.cursos.splice(idx, 1);
                        renderizarTelaAtual();
                    }
                });
            } else if (state.etapaAtual === 5) {
                configurarLimpezaErroAoDigitar(formularioAtualEl, ['i-idioma', 'i-nivel']);
                montarControlesListaDinamica(formularioAtualEl, {
                    idPrefix: 'idioma',
                    textoBotaoAdicionar: 'Adicionar idioma',
                    tituloLista: 'Seus idiomas',
                    textoVazio: 'Nenhum idioma cadastrado.',
                    itens: state.idiomas,
                    camposLimpar: ['i-idioma', 'i-nivel'],
                    onAdicionar: adicionarIdiomaDoFormulario,
                    onRemover: (idx) => {
                        state.idiomas.splice(idx, 1);
                        renderizarTelaAtual();
                    }
                });
            } else if (state.etapaAtual === 6) {
                configurarLimpezaErroAoDigitar(formularioAtualEl, ['h-habilidade']);
                const inputHab = formularioAtualEl.querySelector('#h-habilidade');
                if (inputHab) {
                    inputHab.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            adicionarHabilidadeDoFormulario(formularioAtualEl);
                        }
                    });
                }
                montarControlesListaDinamica(formularioAtualEl, {
                    idPrefix: 'habilidade',
                    textoBotaoAdicionar: 'Adicionar habilidade',
                    tituloLista: 'Suas habilidades',
                    textoVazio: 'Nenhuma habilidade cadastrada.',
                    itens: state.habilidades,
                    camposLimpar: ['h-habilidade'],
                    onAdicionar: adicionarHabilidadeDoFormulario,
                    onRemover: (idx) => {
                        state.habilidades.splice(idx, 1);
                        renderizarTelaAtual();
                    }
                });
            } else if (state.etapaAtual === 7) {
                montarSecaoDiversidade(formularioAtualEl);
            }

            const btnContinuar = formularioAtualEl.querySelector('#btn-continuar');
            if (btnContinuar) {
                btnContinuar.addEventListener('click', () => {
                    salvarDadosDaEtapaAtual(formularioAtualEl);

                    if (state.etapaAtual === 1) {
                        const idsObrigatorios = [
                            'input-nome', 'input-nascimento', 'select-genero',
                            'select-estado-civil', 'input-cpf', 'input-rg',
                            'input-email', 'input-celular', 'input-cep',
                            'input-logradouro', 'input-numero', 'select-bairro',
                            'select-cidade', 'select-estado'
                        ];
                        if (!validarCamposObrigatorios(
                            formularioAtualEl,
                            idsObrigatorios,
                            'Existem campos obrigatórios não preenchidos. Verifique os itens destacados em vermelho.'
                        )) {
                            return;
                        }
                    } else if (state.etapaAtual === 2) {
                        const idsObrigatoriosFormacao = ['f-instituicao', 'f-curso', 'f-grau', 'f-situacao', 'f-inicio'];
                        const camposPreenchidos = idsObrigatoriosFormacao.some(id => {
                            const el = formularioAtualEl.querySelector(`#${id}`);
                            return el && el.value.trim();
                        });

                        if (camposPreenchidos || state.formacoes.length === 0) {
                            if (!validarCamposObrigatorios(
                                formularioAtualEl,
                                idsObrigatoriosFormacao,
                                'Existem campos obrigatórios não preenchidos. Verifique os itens destacados em vermelho.'
                            )) {
                                return;
                            }
                        }
                    } else if (state.etapaAtual === 3) {
                        const idsExp = ['exp-cargo', 'exp-empresa', 'exp-contrato', 'exp-inicio'];
                        const algumPreenchido = idsExp.some(id => {
                            const el = formularioAtualEl.querySelector(`#${id}`);
                            return el && el.value.trim();
                        });

                        if (algumPreenchido) {
                            if (!validarCamposObrigatorios(
                                formularioAtualEl,
                                idsExp,
                                'Complete os campos da experiência ou clique em "Limpar campos" para avançar sem experiência.'
                            )) {
                                return;
                            }
                        }
                    } else if (state.etapaAtual === 4) {
                        const idsCurso = ['c-nome', 'c-instituicao', 'c-tipo', 'c-inicio'];
                        const algumPreenchido = idsCurso.some(id => {
                            const el = formularioAtualEl.querySelector(`#${id}`);
                            return el && el.value.trim();
                        });

                        if (algumPreenchido) {
                            if (!validarCamposObrigatorios(
                                formularioAtualEl,
                                idsCurso,
                                'Complete os campos do curso ou clique em "Limpar campos" para avançar sem curso.'
                            )) {
                                return;
                            }
                        }
                    } else if (state.etapaAtual === 5) {
                        const idiomaVal = formularioAtualEl.querySelector('#i-idioma')?.value.trim();
                        const nivelVal = formularioAtualEl.querySelector('#i-nivel')?.value.trim();
                        if ((idiomaVal || nivelVal) || state.idiomas.length === 0) {
                            if (!validarCamposObrigatorios(
                                formularioAtualEl,
                                ['i-idioma', 'i-nivel'],
                                'Adicione ao menos um idioma ou preencha os campos antes de continuar.'
                            )) {
                                return;
                            }
                        }
                    } else if (state.etapaAtual === 6) {
                        const habVal = formularioAtualEl.querySelector('#h-habilidade')?.value.trim();
                        if (habVal) {
                            exibirErro('Clique em "+ Adicionar habilidade" para incluir a habilidade digitada ou limpe o campo para continuar.');
                            return;
                        }
                    }

                    state.etapaAtual++;
                    renderizarTelaAtual();
                });
            }

            const btnVoltar = formularioAtualEl.querySelector('#btn-voltar');
            if (btnVoltar) {
                btnVoltar.addEventListener('click', () => {
                    salvarDadosDaEtapaAtual(formularioAtualEl);
                    if (state.etapaAtual > 1) {
                        state.etapaAtual--;
                        renderizarTelaAtual();
                    }
                });
            }

            const btnCancelar = formularioAtualEl.querySelector('#btn-cancelar');
            if (btnCancelar) {
                btnCancelar.addEventListener('click', () => {
                    window.location.hash = '#dashboard-candidato';
                });
            }

            conteudoPrincipal.appendChild(formularioAtualEl);
        }

        renderizarTelaAtual();
        containerPagina.appendChild(conteudoPrincipal);
        return containerPagina;

    } catch (err) {
        console.error('Erro crítico ao renderizar Meus Dados:', err);
        const erroDiv = document.createElement('div');
        erroDiv.className = 'erro-critico-container';
        erroDiv.innerHTML = `<h3>Erro ao carregar a página:</h3><pre>${err.message}</pre>`;
        return erroDiv;
    }
}