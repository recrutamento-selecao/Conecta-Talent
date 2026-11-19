import { criarSidebar } from '../components/sidebar.js';
import { criarFormularioDinamico } from '../components/form.js';
import { criarStepper, ETAPAS_CADASTRO } from '../components/stepper.js';


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
                    raca: '', genero: '', pcd: '', faixaEtaria: '', orientacao: ''
                }
            };
        }

        const state = window.perfilCandidatoState;

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

        function configurarCamposData(formEl) {
            const idsDatas = [
                'input-nascimento', 'f-inicio', 'f-fim',
                'exp-inicio', 'exp-fim', 'c-inicio', 'c-fim'
            ];

            idsDatas.forEach(id => {
                const inputTexto = formEl.querySelector(`#${id}`);
                if (!inputTexto) return;

                inputTexto.addEventListener('input', (e) => {
                    e.target.value = mascaras.data(e.target.value);
                });

                const wrapper = inputTexto.closest('.input-wrapper');
                if (wrapper) {
                    const inputDateOculto = document.createElement('input');
                    inputDateOculto.type = 'date';
                    inputDateOculto.style.position = 'absolute';
                    inputDateOculto.style.opacity = '0';
                    inputDateOculto.style.pointerEvents = 'none';
                    inputDateOculto.style.width = '0';
                    inputDateOculto.style.height = '0';
                    wrapper.appendChild(inputDateOculto);

                    inputDateOculto.addEventListener('change', (e) => {
                        if (e.target.value) {
                            const [ano, mes, dia] = e.target.value.split('-');
                            inputTexto.value = `${dia}/${mes}/${ano}`;
                            inputTexto.dispatchEvent(new Event('input'));
                        }
                    });

                    const iconeDir = wrapper.querySelector('.icone-dir');
                    if (iconeDir) {
                        iconeDir.style.pointerEvents = 'auto';
                        iconeDir.style.cursor = 'pointer';
                        iconeDir.addEventListener('click', () => {
                            if (typeof inputDateOculto.showPicker === 'function') {
                                inputDateOculto.showPicker();
                            } else {
                                inputDateOculto.click();
                            }
                        });
                    }
                }
            });
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

                if (raca) state.diversidade.raca = raca.value;
                if (genero) state.diversidade.genero = genero.value;
                if (pcd) state.diversidade.pcd = pcd.value;
                if (idade) state.diversidade.faixaEtaria = idade.value;
                if (orientacao) state.diversidade.orientacao = orientacao.value;
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
                                onClick: (formEl) => {
                                    const inst = formEl.querySelector('#f-instituicao').value.trim();
                                    const curso = formEl.querySelector('#f-curso').value.trim();
                                    const sit = formEl.querySelector('#f-situacao').value;
                                    const ini = formEl.querySelector('#f-inicio').value.trim();
                                    const fim = formEl.querySelector('#f-fim').value.trim();
                                    const cursando = formEl.querySelector('#f-cursando').checked;
                                    if (!inst || !curso || !sit || !ini) {
                                        exibirErro('Preencha os campos obrigatórios da formação.');
                                        return;
                                    }
                                    state.formacoes.push({
                                        titulo: curso,
                                        subtitulo: `${inst} • ${sit}`,
                                        periodo: `${ini} - ${cursando ? 'Cursando' : (fim || 'Atual')}`
                                    });
                                    renderizarTelaAtual();
                                }
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
                            titulo: 'Experiência profissional',
                            icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
                            linhas: [
                                [
                                    { id: 'exp-cargo', label: 'Cargo', placeholder: 'Nome do cargo...', obrigatorio: true },
                                    { id: 'exp-empresa', label: 'Empresa', placeholder: 'Nome da empresa...', obrigatorio: true }
                                ],
                                [
                                    { id: 'exp-localizacao', label: 'Localização', tipo: 'select', opcoes: ['São Paulo - SP | Híbrido', 'Sorocaba - SP | Presencial', 'Remoto'], obrigatorio: true },
                                    { id: 'exp-contrato', label: 'Tipo de contrato', tipo: 'select', opcoes: ['CLT', 'PJ', 'Estágio', 'Temporário'], obrigatorio: true },
                                    { id: 'exp-inicio', label: 'Data de início', placeholder: 'dd/mm/aaaa', maxLength: 10, obrigatorio: true, iconeDireita: iconeCalendario },
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
                                onClick: (formEl) => {
                                    const cargo = formEl.querySelector('#exp-cargo').value.trim();
                                    const empresa = formEl.querySelector('#exp-empresa').value.trim();
                                    const loc = formEl.querySelector('#exp-localizacao').value;
                                    const ini = formEl.querySelector('#exp-inicio').value.trim();
                                    const fim = formEl.querySelector('#exp-fim').value.trim();
                                    const atual = formEl.querySelector('#exp-atual').checked;
                                    if (!cargo || !empresa || !ini) {
                                        exibirErro('Preencha os campos obrigatórios da experiência.');
                                        return;
                                    }
                                    state.experiencias.push({
                                        titulo: cargo,
                                        subtitulo: `${empresa}${loc ? ' • ' + loc : ''}`,
                                        periodo: `${ini} - ${atual ? 'Atual' : (fim || 'Concluído')}`
                                    });
                                    renderizarTelaAtual();
                                }
                            },
                            listaItens: {
                                titulo: 'Suas Experiências',
                                textoVazio: 'Nenhuma experiência cadastrada.',
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
                            titulo: 'Cursos e Certificados',
                            icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
                            linhas: [
                                [
                                    { id: 'c-nome', label: 'Nome do curso/certificação', placeholder: 'Nome do curso/certificado...', obrigatorio: true },
                                    { id: 'c-instituicao', label: 'Instituição', placeholder: 'Nome da instituição...', obrigatorio: true }
                                ],
                                [
                                    { id: 'c-tipo', label: 'Tipo', tipo: 'select', opcoes: ['Curso', 'Certificado', 'Workshop', 'Bootcamp'], obrigatorio: true },
                                    { id: 'c-inicio', label: 'Data de início', placeholder: 'dd/mm/aaaa', maxLength: 10, obrigatorio: true, iconeDireita: iconeCalendario },
                                    { id: 'c-fim', label: 'Data de conclusão', placeholder: 'dd/mm/aaaa', maxLength: 10, iconeDireita: iconeCalendario },
                                    { id: 'c-cursando', label: 'Cursando', tipo: 'checkbox' }
                                ],
                                [
                                    { id: 'c-obs', label: 'Descrição / Observação', tipo: 'textarea', placeholder: 'Escreva aqui a descrição ou observação...' }
                                ]
                            ],
                            botaoAdicionar: {
                                texto: 'Adicionar Curso/Certificação',
                                onClick: (formEl) => {
                                    const nome = formEl.querySelector('#c-nome').value.trim();
                                    const inst = formEl.querySelector('#c-instituicao').value.trim();
                                    const ini = formEl.querySelector('#c-inicio').value.trim();
                                    const fim = formEl.querySelector('#c-fim').value.trim();
                                    const cursando = formEl.querySelector('#c-cursando').checked;
                                    if (!nome || !inst || !ini) {
                                        exibirErro('Preencha os campos obrigatórios do curso.');
                                        return;
                                    }
                                    state.cursos.push({
                                        titulo: nome,
                                        subtitulo: inst,
                                        periodo: `${ini} - ${cursando ? 'Cursando' : (fim || 'Concluído')}`
                                    });
                                    renderizarTelaAtual();
                                }
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
                const obterBandeiraIdioma = (nomeIdioma) => {
                    const norm = nomeIdioma.toLowerCase().trim();
                    let codigoPais = '';

                    if (norm.includes('inglês') || norm.includes('ingles') || norm.includes('english')) codigoPais = 'us';
                    else if (norm.includes('espanhol') || norm.includes('spanish')) codigoPais = 'es';
                    else if (norm.includes('francês') || norm.includes('frances') || norm.includes('french')) codigoPais = 'fr';
                    else if (norm.includes('alemão') || norm.includes('alemao') || norm.includes('german')) codigoPais = 'de';
                    else if (norm.includes('italiano') || norm.includes('italian')) codigoPais = 'it';
                    else if (norm.includes('japonês') || norm.includes('japones') || norm.includes('japanese')) codigoPais = 'jp';
                    else if (norm.includes('mandarim') || norm.includes('chinês') || norm.includes('chines')) codigoPais = 'cn';
                    else if (norm.includes('português') || norm.includes('portugues')) codigoPais = 'br';

                    if (codigoPais) {
                        return `<img src="https://flagcdn.com/w80/${codigoPais}.png" alt="${nomeIdioma}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid #e2e8f0; flex-shrink: 0;">`;
                    }

                    return `<span style="width: 28px; height: 28px; border-radius: 50%; background: #f1f5f9; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0;">🌐</span>`;
                };

                return {
                    mostrarBotaoVoltar: true,
                    textoContinuar: 'Continuar',
                    secoes: [
                        {
                            titulo: 'Idiomas',
                            icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
                            linhas: [
                                [
                                    { id: 'i-idioma', label: 'Idioma', placeholder: 'Ex: Inglês, Espanhol...', obrigatorio: true },
                                    { id: 'i-nivel', label: 'Nível de proficiência', tipo: 'select', opcoes: ['Básico', 'Intermediário', 'Avançado', 'Fluente', 'Nativo'], obrigatorio: true }
                                ]
                            ],
                            botaoAdicionar: {
                                texto: 'Adicionar Idioma',
                                onClick: (formEl) => {
                                    const idioma = formEl.querySelector('#i-idioma').value.trim();
                                    const nivel = formEl.querySelector('#i-nivel').value;
                                    if (!idioma || !nivel) {
                                        exibirErro('Preencha o idioma e o nível.');
                                        return;
                                    }
                                    const bandeiraImg = obterBandeiraIdioma(idioma);
                                    state.idiomas.push({
                                        titulo: `<div style="display: flex; align-items: center; gap: 12px;">${bandeiraImg}<span>${idioma}</span></div>`,
                                        subtitulo: nivel
                                    });
                                    renderizarTelaAtual();
                                }
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
                            titulo: 'Habilidades',
                            icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>`,
                            linhas: [
                                [
                                    { id: 'h-habilidade', label: 'Habilidade', placeholder: 'Ex: JavaScript, Comunicação, Trabalho em equipe...', obrigatorio: true }
                                ]
                            ],
                            botaoAdicionar: {
                                texto: 'Adicionar Habilidade',
                                onClick: (formEl) => {
                                    const hab = formEl.querySelector('#h-habilidade').value.trim();
                                    if (!hab) {
                                        exibirErro('Digite uma habilidade.');
                                        return;
                                    }
                                    state.habilidades.push({ titulo: hab });
                                    renderizarTelaAtual();
                                }
                            },
                            listaItens: {
                                titulo: 'Habilidades',
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
                const div = state.diversidade;
                const check = (campo, valor) => div[campo] === valor ? 'checked' : '';
                return {
                    mostrarBotaoVoltar: true,
                    textoContinuar: 'Finalizar cadastro',
                    secoes: [
                        {
                            titulo: 'Diversidade',
                            icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
                            htmlCustomizado: `
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px;">
                                    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
                                        <div style="font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 10px;">Como você se declara? (Raça, cor)</div>
                                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
                                            ${['Branca', 'Preta', 'Parda', 'Amarela', 'Indígena', 'Prefiro não informar'].map(op => `
                                                <label style="display:flex; align-items:center; gap:6px; border:1px solid #e2e8f0; padding:6px 8px; border-radius:6px; cursor:pointer;">
                                                    <input type="radio" name="div-raca" value="${op}" ${check('raca', op)}> ${op}
                                                </label>
                                            `).join('')}
                                        </div>
                                    </div>

                                    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
                                        <div style="font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 10px;">Qual é seu gênero?</div>
                                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
                                            ${['Feminino', 'Masculino', 'Não binário', 'Prefiro não informar'].map(op => `
                                                <label style="display:flex; align-items:center; gap:6px; border:1px solid #e2e8f0; padding:6px 8px; border-radius:6px; cursor:pointer;">
                                                    <input type="radio" name="div-genero" value="${op}" ${check('genero', op)}> ${op}
                                                </label>
                                            `).join('')}
                                        </div>
                                    </div>

                                    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
                                        <div style="font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 10px;">Você é uma pessoa com deficiência (PCD)?</div>
                                        <div style="display: flex; flex-wrap: wrap; gap: 8px; font-size: 12px;">
                                            ${['Sim', 'Não', 'Prefiro não informar'].map(op => `
                                                <label style="display:flex; align-items:center; gap:6px; border:1px solid #e2e8f0; padding:6px 10px; border-radius:6px; cursor:pointer;">
                                                    <input type="radio" name="div-pcd" value="${op}" ${check('pcd', op)}> ${op}
                                                </label>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>

                                <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 16px;">
                                    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
                                        <div style="font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 10px;">Qual é a sua faixa etária?</div>
                                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 12px;">
                                            ${['Menos de 18 anos', '18 a 24 anos', '25 a 34 anos', '35 a 44 anos', '45 a 54 anos', '55 anos ou mais'].map(op => `
                                                <label style="display:flex; align-items:center; gap:6px; border:1px solid #e2e8f0; padding:6px 8px; border-radius:6px; cursor:pointer;">
                                                    <input type="radio" name="div-idade" value="${op}" ${check('faixaEtaria', op)}> ${op}
                                                </label>
                                            `).join('')}
                                        </div>
                                    </div>

                                    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
                                        <div style="font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 10px;">Como você se declara em relação à orientação sexual?</div>
                                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 12px;">
                                            ${['Heterossexual', 'Homossexual', 'Bissexual', 'Outro', 'Prefiro não informar'].map(op => `
                                                <label style="display:flex; align-items:center; gap:6px; border:1px solid #e2e8f0; padding:6px 8px; border-radius:6px; cursor:pointer;">
                                                    <input type="radio" name="div-orientacao" value="${op}" ${check('orientacao', op)}> ${op}
                                                </label>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            `
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
                    <div class="card-sucesso-container" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; max-width: 900px; margin: 24px auto;">
                        <div style="text-align: center; margin-bottom: 24px;">
                            <div style="width: 48px; height: 48px; border-radius: 50%; background: #dcfce7; color: #16a34a; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; margin-bottom: 12px;">✓</div>
                            <h2 style="font-size: 24px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Cadastro concluído!</h2>
                            <p style="color: #475569; font-size: 14px; margin: 0;">Suas informações foram salvas com sucesso. Agora seu perfil está pronto para ser encontrado pelos recrutadores.</p>
                        </div>

                        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 24px;">
                            Perfil atualizado com sucesso. Você pode alterar suas informações a qualquer momento.
                        </div>

                        <div class="secao-resumo-perfil" style="margin-bottom: 24px;">
                            <h3 style="font-size: 16px; font-weight: 600; color: #1e293b; margin-bottom: 12px;">Resumo do seu perfil</h3>
                            <div class="grid-opcoes-perfil" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
                                <div class="card-opcao-item" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; display: flex; gap: 10px; align-items: flex-start;">
                                    <span style="color: #16a34a; font-weight: bold;">✓</span>
                                    <div>
                                        <h4 style="margin: 0 0 4px; font-size: 14px; color: #0f172a;">Dados pessoais</h4>
                                        <p style="margin: 0; font-size: 12px; color: #64748b;">Informações básicas e contato</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; display: flex; gap: 10px; align-items: flex-start;">
                                    <span style="color: #16a34a; font-weight: bold;">✓</span>
                                    <div>
                                        <h4 style="margin: 0 0 4px; font-size: 14px; color: #0f172a;">Formação acadêmica</h4>
                                        <p style="margin: 0; font-size: 12px; color: #64748b;">Graduação e cursos técnicos</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; display: flex; gap: 10px; align-items: flex-start;">
                                    <span style="color: #16a34a; font-weight: bold;">✓</span>
                                    <div>
                                        <h4 style="margin: 0 0 4px; font-size: 14px; color: #0f172a;">Experiência profissional</h4>
                                        <p style="margin: 0; font-size: 12px; color: #64748b;">Experiências cadastradas</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; display: flex; gap: 10px; align-items: flex-start;">
                                    <span style="color: #16a34a; font-weight: bold;">✓</span>
                                    <div>
                                        <h4 style="margin: 0 0 4px; font-size: 14px; color: #0f172a;">Cursos e certificados</h4>
                                        <p style="margin: 0; font-size: 12px; color: #64748b;">Certificações e cursos</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; display: flex; gap: 10px; align-items: flex-start;">
                                    <span style="color: #16a34a; font-weight: bold;">✓</span>
                                    <div>
                                        <h4 style="margin: 0 0 4px; font-size: 14px; color: #0f172a;">Idiomas</h4>
                                        <p style="margin: 0; font-size: 12px; color: #64748b;">Idiomas e níveis de proficiência</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; display: flex; gap: 10px; align-items: flex-start;">
                                    <span style="color: #16a34a; font-weight: bold;">✓</span>
                                    <div>
                                        <h4 style="margin: 0 0 4px; font-size: 14px; color: #0f172a;">Habilidades</h4>
                                        <p style="margin: 0; font-size: 12px; color: #64748b;">Competências técnicas e comportamentais</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; display: flex; gap: 10px; align-items: flex-start;">
                                    <span style="color: #16a34a; font-weight: bold;">✓</span>
                                    <div>
                                        <h4 style="margin: 0 0 4px; font-size: 14px; color: #0f172a;">Diversidade</h4>
                                        <p style="margin: 0; font-size: 12px; color: #64748b;">Informações de diversidade e inclusão</p>
                                    </div>
                                </div>
                                <div class="card-opcao-item" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; display: flex; gap: 10px; align-items: flex-start;">
                                    <span style="color: #16a34a; font-weight: bold;">✓</span>
                                    <div>
                                        <h4 style="margin: 0 0 4px; font-size: 14px; color: #0f172a;">Perfil completo</h4>
                                        <p style="margin: 0; font-size: 12px; color: #64748b;">100% das etapas preenchidas</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style="background: #f8fafc; border-left: 4px solid #2563eb; padding: 12px 16px; border-radius: 6px; font-size: 13px; color: #334155; margin-bottom: 24px;">
                            <strong>Dica:</strong> Mantenha seu perfil sempre atualizado para aumentar a relevância das oportunidades recomendadas para você.
                        </div>

                        <div style="display: flex; justify-content: flex-end; gap: 12px;">
                            <button type="button" id="btn-editar-dados" style="padding: 10px 18px; border-radius: 8px; border: 1px solid #cbd5e1; background: #ffffff; color: #334155; font-weight: 600; cursor: pointer;">
                                Editar meus dados
                            </button>
                            <button type="button" id="btn-voltar-dashboard" style="padding: 10px 18px; border-radius: 8px; border: none; background: #2563eb; color: #ffffff; font-weight: 600; cursor: pointer;">
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
            const etapaInfo = ETAPAS_CADASTRO.find(e => e.id === state.etapaAtual);
            const breadcrumb = document.createElement('div');
            breadcrumb.className = 'breadcrumb';
            breadcrumb.innerHTML = `Perfil &gt; <span>${etapaInfo ? etapaInfo.titulo : 'Conclusão'}</span>`;
            conteudoPrincipal.appendChild(breadcrumb);

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
                        let valido = true;
                        idsObrigatorios.forEach(id => {
                            const el = formularioAtualEl.querySelector(`#${id}`);
                            const grupo = el ? el.closest('.grupo-campo') : null;
                            if (grupo) grupo.classList.remove('erro-campo');
                            if (el && !el.value.trim()) {
                                valido = false;
                                if (grupo) grupo.classList.add('erro-campo');
                            }
                        });
                        if (!valido) {
                            exibirErro('Existem campos obrigatórios não preenchidos. Verifique os itens destacados em vermelho.');
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
        erroDiv.style.padding = '40px';
        erroDiv.style.color = 'red';
        erroDiv.innerHTML = `<h3>Erro ao carregar a página:</h3><pre>${err.message}</pre>`;
        return erroDiv;
    }
}