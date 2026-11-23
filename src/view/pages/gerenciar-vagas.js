import { criarSidebar } from '../components/sidebar.js';
import { criarCard } from '../components/card.js';
import { criarTabela } from '../components/table.js';

export function renderMinhasVagas(perfil = 'empresa') {
    const tipoPerfil = perfil === 'recrutador' ? 'recrutador' : 'empresa';
    const ehRecrutador = tipoPerfil === 'recrutador';

    const containerPagina = document.createElement('div');
    containerPagina.className = 'pagina-layout-dashboard';

    const sidebar = criarSidebar(tipoPerfil, 'Thaeny Soares');
    containerPagina.appendChild(sidebar);

    const conteudoPrincipal = document.createElement('main');
    conteudoPrincipal.className = 'conteudo-principal';

    const subtituloPagina = ehRecrutador
        ? 'Crie, gerencie suas vagas e acompanhe o andamento dos processos seletivos.'
        : 'Acompanhe e gerencie as vagas e os processos seletivos da sua empresa.';

    const botaoCriarVagaHtml = ehRecrutador
        ? `<button type="button" class="btn-criar-vaga" id="btn-criar-vaga">+ Criar vaga</button>`
        : '';

    conteudoPrincipal.innerHTML = `
        <div class="cabecalho-pagina-flex">
            <div>
                <h1 class="titulo-pagina">Gerenciar vagas</h1>
                <p class="subtitulo-pagina">${subtituloPagina}</p>
            </div>
            ${botaoCriarVagaHtml}
        </div>

        <!-- Cards de Estatísticas -->
        <div class="cards-estatisticas-grid" id="container-cards-estatisticas"></div>

        <!-- Barra de Filtros e Pesquisa (Linha Única) -->
        <div class="barra-filtros-vagas">
            <div class="input-busca-vaga">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" id="input-busca" placeholder="Buscar por vaga, área ou cidade..." />
            </div>
            <div class="filtros-selecao-grupo">
                <select class="select-filtro" id="filtro-status" aria-label="Filtrar por status">
                    <option value="">Status: Todos</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Pausada">Pausada</option>
                    <option value="Concluída">Concluída</option>
                </select>
                <select class="select-filtro" id="filtro-area" aria-label="Filtrar por área">
                    <option value="">Área: Todas</option>
                    <option value="Dados">Dados</option>
                    <option value="TI">TI</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="Design">Design</option>
                </select>
                <select class="select-filtro" id="filtro-contrato" aria-label="Filtrar por contrato">
                    <option value="">Contrato: Todos</option>
                    <option value="CLT">CLT</option>
                    <option value="PJ">PJ</option>
                </select>
                <select class="select-filtro" id="filtro-localizacao" aria-label="Filtrar por localização">
                    <option value="">Local: Todos</option>
                    <option value="Sorocaba - SP">Sorocaba - SP</option>
                    <option value="São Paulo - SP">São Paulo - SP</option>
                </select>
                <button type="button" class="btn-limpar-filtros" id="btn-limpar" title="Limpar filtros">↺ Limpar</button>
            </div>
        </div>

        <!-- Layout Principal: Tabela à Esquerda + Painel de Detalhes à Direita -->
        <div class="layout-conteudo-vagas">
            <!-- Tabela de Vagas -->
            <div id="container-tabela-vagas"></div>

            <!-- Painel Lateral de Detalhes da Vaga Selecionada -->
            <div class="painel-detalhes-vaga" id="painel-detalhes" style="display: none;">
                <div class="painel-detalhes-topo">
                    <div class="painel-titulo-empresa">
                        <div class="icone-vaga-mini" id="painel-icone">📊</div>
                        <div>
                            <h3 id="painel-titulo">Selecione uma vaga</h3>
                            <span id="painel-empresa">-</span>
                        </div>
                    </div>
                    <div class="painel-topo-acoes">
                        <span class="badge-status" id="painel-status-badge"></span>
                        <button type="button" class="btn-fechar-painel" id="btn-fechar-painel" title="Fechar detalhes">✕</button>
                    </div>
                </div>

                <div class="painel-abas" id="painel-abas-container">
                    <button type="button" class="aba-item ativo" data-aba="informacoes">Informações</button>
                    <button type="button" class="aba-item" data-aba="processo">Processo seletivo</button>
                    <button type="button" class="aba-item" data-aba="testes">Testes</button>
                    <button type="button" class="aba-item" data-aba="candidaturas">Candidaturas</button>
                </div>

                <!-- Conteúdo Dinâmico das Abas -->
                <div class="painel-conteudo-secao" id="painel-conteudo-corpo"></div>
            </div>
        </div>
    `;

    // Menu flutuante único reutilizável para os 3 pontos de Ações
    const menuFlutuante = document.createElement('div');
    menuFlutuante.className = 'menu-acoes-flutuante';
    menuFlutuante.style.display = 'none';
    containerPagina.appendChild(menuFlutuante);

    setTimeout(() => {
        // Base de Dados de Vagas
        let dadosVagasOriginais = [
            {
                id: 1,
                vaga: 'Analista de Dados',
                contrato: 'CLT',
                iconeEmoji: '📊',
                corIcone: 'azul',
                area: 'Dados',
                localizacao: 'Sorocaba - SP',
                modalidade: 'Híbrido',
                candidatos: 48,
                processo: '4 etapas',
                status: 'Em andamento',
                statusClasse: 'em-andamento',
                empresa: 'Tech Soluções',
                descricao: 'Buscamos um Analista de Dados para atuar na análise, construção de dashboards e apoio à tomada de decisão.',
                etapas: [
                    { nome: 'Inscrição', status: 'concluida' },
                    { nome: 'Triagem', status: 'concluida' },
                    { nome: 'Teste técnico', status: 'ativo' },
                    { nome: 'Entrevista', status: '' }
                ],
                testes: [
                    { titulo: 'Case de SQL e Power BI', prazo: '48 horas', status: 'Enviado (32 concluídos)' },
                    { titulo: 'Teste Lógico Comportamental', prazo: '24 horas', status: 'Pendente' }
                ],
                candidatosLista: [
                    { nome: 'Ana Paula Silva', match: '94%', etapa: 'Teste técnico' },
                    { nome: 'Carlos Eduardo', match: '88%', etapa: 'Teste técnico' },
                    { nome: 'Mariana Costa', match: '82%', etapa: 'Triagem' }
                ]
            },
            {
                id: 2,
                vaga: 'Desenvolvedor Front-end',
                contrato: 'CLT',
                iconeEmoji: '💻',
                corIcone: 'laranja',
                area: 'TI',
                localizacao: 'São Paulo - SP',
                modalidade: 'Remoto',
                candidatos: 35,
                processo: '5 etapas',
                status: 'Em andamento',
                statusClasse: 'em-andamento',
                empresa: 'Inova Web',
                descricao: 'Desenvolvimento de interfaces modernas, responsivas e de alta performance utilizando frameworks atuais.',
                etapas: [
                    { nome: 'Inscrição', status: 'concluida' },
                    { nome: 'Triagem', status: 'ativo' },
                    { nome: 'Code Challenge', status: '' },
                    { nome: 'Entrevista Tech', status: '' },
                    { nome: 'Final', status: '' }
                ],
                testes: [
                    { titulo: 'Desafio Prático React/JS', prazo: '3 dias', status: 'Ativo' }
                ],
                candidatosLista: [
                    { nome: 'Lucas Gabriel', match: '96%', etapa: 'Triagem' },
                    { nome: 'Beatriz Lima', match: '90%', etapa: 'Triagem' }
                ]
            },
            {
                id: 3,
                vaga: 'Analista de RH',
                contrato: 'CLT',
                iconeEmoji: '👥',
                corIcone: 'rosa',
                area: 'Recursos Humanos',
                localizacao: 'Sorocaba - SP',
                modalidade: 'Presencial',
                candidatos: 27,
                processo: '3 etapas',
                status: 'Pausada',
                statusClasse: 'pausada',
                empresa: 'Tech Soluções',
                descricao: 'Condução de processos de recrutamento e seleção, alinhamento de perfil com gestores e onboarding.',
                etapas: [
                    { nome: 'Inscrição', status: 'concluida' },
                    { nome: 'Entrevista RH', status: 'ativo' },
                    { nome: 'Diretoria', status: '' }
                ],
                testes: [
                    { titulo: 'Redação e Case de Recrutamento', prazo: '24 horas', status: 'Concluído' }
                ],
                candidatosLista: [
                    { nome: 'Juliana Mendes', match: '92%', etapa: 'Entrevista RH' }
                ]
            },
            {
                id: 4,
                vaga: 'Designer UI/UX',
                contrato: 'PJ',
                iconeEmoji: '🎨',
                corIcone: 'roxo',
                area: 'Design',
                localizacao: 'São Paulo - SP',
                modalidade: 'Híbrido',
                candidatos: 61,
                processo: '4 etapas',
                status: 'Concluída',
                statusClasse: 'concluida',
                empresa: 'Design Studio',
                descricao: 'Criação de fluxos de usuário, wireframes, protótipos de alta fidelidade e testes de usabilidade.',
                etapas: [
                    { nome: 'Inscrição', status: 'concluida' },
                    { nome: 'Portfólio', status: 'concluida' },
                    { nome: 'Case UX', status: 'concluida' },
                    { nome: 'Contratação', status: 'concluida' }
                ],
                testes: [
                    { titulo: 'Avaliação de Portfólio Figma', prazo: 'Encerrado', status: 'Finalizado' }
                ],
                candidatosLista: [
                    { nome: 'Gabriel Souza', match: '98%', etapa: 'Contratado' }
                ]
            }
        ];

        let tabelaInstancia = null;
        let vagaSelecionada = null;
        let abaAtiva = 'informacoes';

        const gridCards = conteudoPrincipal.querySelector('#container-cards-estatisticas');
        const containerTabela = conteudoPrincipal.querySelector('#container-tabela-vagas');
        const painelDetalhes = conteudoPrincipal.querySelector('#painel-detalhes');
        const layoutGrid = conteudoPrincipal.querySelector('.layout-conteudo-vagas');
        const corpoPainel = conteudoPrincipal.querySelector('#painel-conteudo-corpo');

        // Botão + Criar vaga (disponível apenas para recrutador)
        const btnCriarVaga = conteudoPrincipal.querySelector('#btn-criar-vaga');
        if (btnCriarVaga && ehRecrutador) {
            btnCriarVaga.addEventListener('click', () => {
                window.location.hash = '#criar-vaga';
            });
        }

        // Atualiza os 4 cards superiores dinamicamente
        function atualizarCards() {
            if (!gridCards) return;
            gridCards.innerHTML = '';

            const total = dadosVagasOriginais.length;
            const emAndamento = dadosVagasOriginais.filter(v => v.status === 'Em andamento').length;
            const pausadas = dadosVagasOriginais.filter(v => v.status === 'Pausada').length;
            const concluidas = dadosVagasOriginais.filter(v => v.status === 'Concluída').length;

            gridCards.appendChild(criarCard({ label: 'VAGAS TOTAIS', valor: String(total), subtituloDestaque: '+3 novas', subtituloTexto: 'esta semana' }));
            gridCards.appendChild(criarCard({ label: 'EM ANDAMENTO', valor: String(emAndamento), subtituloDestaque: 'Ativas', subtituloTexto: 'no processo' }));
            gridCards.appendChild(criarCard({ label: 'PAUSADAS', valor: String(pausadas), subtituloDestaque: 'Atenção', subtituloTexto: 'necessária' }));
            gridCards.appendChild(criarCard({ label: 'CONCLUÍDAS', valor: String(concluidas), subtituloDestaque: 'Finalizadas', subtituloTexto: 'este mês' }));
        }

        atualizarCards();

        // Fechar menu flutuante de 3 pontos
        function fecharMenuAcoes() {
            menuFlutuante.style.display = 'none';
        }

        document.addEventListener('click', (e) => {
            if (!menuFlutuante.contains(e.target) && !e.target.closest('.btn-acoes-linha')) {
                fecharMenuAcoes();
            }
        });

        // Ações de gestão da vaga
        function alternarPausaVaga(item) {
            if (item.status === 'Pausada') {
                item.status = 'Em andamento';
                item.statusClasse = 'em-andamento';
            } else {
                item.status = 'Pausada';
                item.statusClasse = 'pausada';
            }
            atualizarCards();
            aplicarFiltros();
            if (vagaSelecionada && vagaSelecionada.id === item.id) {
                abrirPainel(item);
            }
        }

        function duplicarVaga(item) {
            const novoId = dadosVagasOriginais.length > 0 ? Math.max(...dadosVagasOriginais.map(v => v.id)) + 1 : 1;
            const copia = {
                ...item,
                id: novoId,
                vaga: `${item.vaga} (Cópia)`,
                candidatos: 0,
                status: 'Em andamento',
                statusClasse: 'em-andamento',
                etapas: item.etapas.map(e => ({ ...e })),
                testes: item.testes.map(t => ({ ...t })),
                candidatosLista: []
            };
            dadosVagasOriginais.unshift(copia);
            atualizarCards();
            aplicarFiltros();
        }

        function excluirVaga(item) {
            if (!confirm(`Tem certeza que deseja excluir a vaga "${item.vaga}"?`)) return;
            dadosVagasOriginais = dadosVagasOriginais.filter(v => v.id !== item.id);
            if (vagaSelecionada && vagaSelecionada.id === item.id) {
                atualizarLayoutPainel(false);
            }
            atualizarCards();
            aplicarFiltros();
        }

        function editarVaga(item) {
            const novoTitulo = prompt('Editar título da vaga:', item.vaga);
            if (novoTitulo && novoTitulo.trim()) {
                item.vaga = novoTitulo.trim();
                aplicarFiltros();
                if (vagaSelecionada && vagaSelecionada.id === item.id) {
                    abrirPainel(item);
                }
            }
        }

        // Abre o menu dropdown posicionado junto ao botão de 3 pontos clicado
        function abrirMenuAcoes(botaoElemento, item) {
            const rect = botaoElemento.getBoundingClientRect();
            const isPausada = item.status === 'Pausada';

            menuFlutuante.innerHTML = `
                <button type="button" class="menu-acao-item" data-acao="detalhes">
                    <span>👁️</span> Ver detalhes
                </button>
                <button type="button" class="menu-acao-item" data-acao="editar">
                    <span>✏️</span> Editar vaga
                </button>
                <button type="button" class="menu-acao-item" data-acao="duplicar">
                    <span>📋</span> Duplicar vaga
                </button>
                <button type="button" class="menu-acao-item" data-acao="pausar">
                    <span>${isPausada ? '▶️' : '⏸️'}</span> ${isPausada ? 'Reativar vaga' : 'Pausar vaga'}
                </button>
                <div class="menu-acao-divisor"></div>
                <button type="button" class="menu-acao-item perigo" data-acao="excluir">
                    <span>🗑️</span> Remover vaga
                </button>
            `;

            menuFlutuante.style.display = 'flex';
            const larguraMenu = 175;
            const leftPos = Math.min(rect.right - larguraMenu + window.scrollX, window.innerWidth - larguraMenu - 16);
            menuFlutuante.style.top = `${rect.bottom + window.scrollY + 4}px`;
            menuFlutuante.style.left = `${Math.max(16, leftPos)}px`;

            menuFlutuante.querySelector('[data-acao="detalhes"]').onclick = () => {
                fecharMenuAcoes();
                abrirPainel(item);
            };
            menuFlutuante.querySelector('[data-acao="editar"]').onclick = () => {
                fecharMenuAcoes();
                editarVaga(item);
            };
            menuFlutuante.querySelector('[data-acao="duplicar"]').onclick = () => {
                fecharMenuAcoes();
                duplicarVaga(item);
            };
            menuFlutuante.querySelector('[data-acao="pausar"]').onclick = () => {
                fecharMenuAcoes();
                alternarPausaVaga(item);
            };
            menuFlutuante.querySelector('[data-acao="excluir"]').onclick = () => {
                fecharMenuAcoes();
                excluirVaga(item);
            };
        }

        // Renderiza o conteúdo da aba selecionada no painel lateral
        function renderizarConteudoAba() {
            if (!vagaSelecionada) return;
            const isPausada = vagaSelecionada.status === 'Pausada';

            if (abaAtiva === 'informacoes') {
                corpoPainel.innerHTML = `
                    <h4>Dados da vaga</h4>
                    <div class="grid-detalhes-duplo">
                        <div><span>Área</span><strong>${vagaSelecionada.area}</strong></div>
                        <div><span>Localização</span><strong>${vagaSelecionada.localizacao}</strong></div>
                        <div><span>Modalidade</span><strong>${vagaSelecionada.modalidade}</strong></div>
                        <div><span>Tipo de contrato</span><strong>${vagaSelecionada.contrato}</strong></div>
                        <div><span>Quantidade de vagas</span><strong>2</strong></div>
                        <div><span>Data de criação</span><strong>10/09/2026</strong></div>
                    </div>
                    <div class="detalhes-linha-simples">
                        <span>Última atualização</span><strong>25/09/2026</strong>
                    </div>

                    <h4 class="mt-4">Descrição</h4>
                    <p class="descricao-vaga-texto">
                        ${vagaSelecionada.descricao}
                    </p>

                    <h4 class="mt-4">Processo seletivo</h4>
                    <div class="etapas-processo-mini">
                        ${vagaSelecionada.etapas.map((etapa, idx) => `
                            <div class="etapa-mini ${etapa.status}"><span>${idx + 1}</span><small>${etapa.nome}</small></div>
                            ${idx < vagaSelecionada.etapas.length - 1 ? `<div class="linha-etapa ${etapa.status === 'concluida' ? 'concluida' : ''}"></div>` : ''}
                        `).join('')}
                    </div>

                    <h4 class="mt-4">Ações</h4>
                    <div class="acoes-painel-grid">
                        <button type="button" class="btn-acao-secundaria" id="painel-btn-editar">Editar vaga</button>
                        <button type="button" class="btn-acao-secundaria" id="painel-btn-duplicar">Duplicar vaga</button>
                        <button type="button" class="btn-acao-principal" id="painel-btn-candidaturas">Candidaturas</button>
                    </div>
                    <button type="button" class="btn-acao-alerta w-100 mt-2" id="painel-btn-pausar">
                        ${isPausada ? 'Reativar vaga' : 'Pausar vaga'}
                    </button>
                `;

                corpoPainel.querySelector('#painel-btn-editar').onclick = () => editarVaga(vagaSelecionada);
                corpoPainel.querySelector('#painel-btn-duplicar').onclick = () => duplicarVaga(vagaSelecionada);
                corpoPainel.querySelector('#painel-btn-pausar').onclick = () => alternarPausaVaga(vagaSelecionada);
                corpoPainel.querySelector('#painel-btn-candidaturas').onclick = () => {
                    conteudoPrincipal.querySelectorAll('.aba-item').forEach(b => b.classList.remove('ativo'));
                    conteudoPrincipal.querySelector('[data-aba="candidaturas"]').classList.add('ativo');
                    abaAtiva = 'candidaturas';
                    renderizarConteudoAba();
                };

            } else if (abaAtiva === 'processo') {
                corpoPainel.innerHTML = `
                    <h4>Etapas do Processo Seletivo</h4>
                    <p class="subtitulo-painel">Acompanhe o fluxo configurado para esta vaga:</p>
                    <div class="lista-cards-painel">
                        ${vagaSelecionada.etapas.map((etapa, idx) => `
                            <div class="item-card-painel">
                                <div class="item-card-esquerda">
                                    <span class="numero-etapa-painel">${idx + 1}</span>
                                    <strong>${etapa.nome}</strong>
                                </div>
                                <span class="badge-status ${etapa.status === 'concluida' ? 'concluida' : etapa.status === 'ativo' ? 'em-andamento' : ''}">${etapa.status ? etapa.status : 'Pendente'}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else if (abaAtiva === 'testes') {
                corpoPainel.innerHTML = `
                    <h4>Testes Técnicos e Questionários</h4>
                    <p class="subtitulo-painel">Testes aplicados aos candidatos desta vaga:</p>
                    <div class="lista-cards-painel">
                        ${vagaSelecionada.testes.map(teste => `
                            <div class="item-card-painel coluna">
                                <div class="item-card-topo">
                                    <strong>${teste.titulo}</strong>
                                    <span class="texto-secundario-mini">Prazo: ${teste.prazo}</span>
                                </div>
                                <div class="item-card-rodape">
                                    <span class="badge-status em-andamento">${teste.status}</span>
                                    <button type="button" class="btn-acao-secundaria btn-mini">Ver relatórios</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else if (abaAtiva === 'candidaturas') {
                corpoPainel.innerHTML = `
                    <h4>Candidatos em Destaque (${vagaSelecionada.candidatos} total)</h4>
                    <p class="subtitulo-painel">Principais perfis alinhados à vaga:</p>
                    <div class="lista-cards-painel">
                        ${vagaSelecionada.candidatosLista.length > 0 ? vagaSelecionada.candidatosLista.map(cand => `
                            <div class="item-card-painel">
                                <div>
                                    <strong class="nome-candidato-painel">${cand.nome}</strong>
                                    <small class="texto-secundario-mini">Etapa atual: ${cand.etapa}</small>
                                </div>
                                <span class="badge-match">Match ${cand.match}</span>
                            </div>
                        `).join('') : '<p class="texto-secundario-mini">Nenhum candidato inscrito ainda.</p>'}
                    </div>
                `;
            }
        }

        conteudoPrincipal.querySelectorAll('.aba-item').forEach(botaoAba => {
            botaoAba.addEventListener('click', (e) => {
                conteudoPrincipal.querySelectorAll('.aba-item').forEach(b => b.classList.remove('ativo'));
                e.currentTarget.classList.add('ativo');
                abaAtiva = e.currentTarget.getAttribute('data-aba');
                renderizarConteudoAba();
            });
        });

        function atualizarLayoutPainel(aberto) {
            if (aberto) {
                painelDetalhes.style.display = 'block';
                layoutGrid.classList.add('painel-ativo');
            } else {
                painelDetalhes.style.display = 'none';
                layoutGrid.classList.remove('painel-ativo');
                vagaSelecionada = null;
                containerTabela.querySelectorAll('tbody tr').forEach(tr => tr.classList.remove('linha-selecionada'));
            }
        }

        function abrirPainel(item, linhaElemento) {
            vagaSelecionada = item;
            atualizarLayoutPainel(true);

            containerTabela.querySelectorAll('tbody tr').forEach(tr => tr.classList.remove('linha-selecionada'));
            if (linhaElemento) {
                linhaElemento.classList.add('linha-selecionada');
            }

            conteudoPrincipal.querySelector('#painel-icone').textContent = item.iconeEmoji;
            conteudoPrincipal.querySelector('#painel-icone').className = `icone-vaga-mini ${item.corIcone}`;
            conteudoPrincipal.querySelector('#painel-titulo').textContent = item.vaga;
            conteudoPrincipal.querySelector('#painel-empresa').textContent = item.empresa;

            const badge = conteudoPrincipal.querySelector('#painel-status-badge');
            badge.className = `badge-status ${item.statusClasse}`;
            badge.textContent = item.status;

            conteudoPrincipal.querySelectorAll('.aba-item').forEach(b => b.classList.remove('ativo'));
            conteudoPrincipal.querySelector('[data-aba="informacoes"]').classList.add('ativo');
            abaAtiva = 'informacoes';

            renderizarConteudoAba();
        }

        function vincularEventosLinhas(listaAtual) {
            const linhasTabela = containerTabela.querySelectorAll('tbody tr');
            linhasTabela.forEach((tr, index) => {
                const item = listaAtual[index];
                if (!item) return;

                tr.style.cursor = 'pointer';
                if (vagaSelecionada && item.id === vagaSelecionada.id) {
                    tr.classList.add('linha-selecionada');
                }

                tr.addEventListener('click', (e) => {
                    if (e.target.type === 'checkbox' || e.target.closest('.btn-acoes-linha')) return;
                    abrirPainel(item, tr);
                });
            });
        }

        conteudoPrincipal.querySelector('#btn-fechar-painel').addEventListener('click', () => {
            atualizarLayoutPainel(false);
        });

        // Colunas da tabela com botão de 3 pontos na coluna Ações
        const colunasVagas = [
            {
                chave: 'vaga',
                titulo: 'Vaga',
                ordenavel: true,
                render: (valor, item) => {
                    const div = document.createElement('div');
                    div.className = 'celula-vaga-info';
                    div.innerHTML = `
                        <div class="icone-vaga-mini ${item.corIcone}">${item.iconeEmoji}</div>
                        <div>
                            <strong>${item.vaga}</strong>
                            <span>${item.contrato}</span>
                        </div>
                    `;
                    return div;
                }
            },
            { chave: 'area', titulo: 'Área', ordenavel: true },
            {
                chave: 'localizacao',
                titulo: 'Localização',
                render: (valor, item) => {
                    const div = document.createElement('div');
                    div.innerHTML = `${item.localizacao}<br/><small>${item.modalidade}</small>`;
                    return div;
                }
            },
            { chave: 'candidatos', titulo: 'Candidatos', alinhamento: 'centro', ordenavel: true },
            { chave: 'processo', titulo: 'Processo' },
            {
                chave: 'status',
                titulo: 'Status',
                render: (valor, item) => {
                    const span = document.createElement('span');
                    span.className = `badge-status ${item.statusClasse}`;
                    span.textContent = item.status;
                    return span;
                }
            },
            {
                chave: 'acoesMenu',
                titulo: 'Ações',
                alinhamento: 'centro',
                render: (valor, item) => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'btn-acoes-linha';
                    btn.title = 'Ações da vaga';
                    btn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                    `;
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        abrirMenuAcoes(btn, item);
                    });
                    return btn;
                }
            }
        ];

        // Renderizar Tabela inicial
        if (containerTabela) {
            tabelaInstancia = criarTabela(colunasVagas, dadosVagasOriginais, {
                container: containerTabela,
                selecionavel: true,
                acoes: false,
                rodape: {
                    esquerda: `Mostrando ${dadosVagasOriginais.length} registros`,
                    direita: `
                        <div class="paginacao-botoes">
                            <button type="button">&lt;</button>
                            <button type="button" class="ativo">1</button>
                            <button type="button">&gt;</button>
                        </div>
                    `
                }
            });

            vincularEventosLinhas(dadosVagasOriginais);
        }

        // Lógica de Filtragem Dinâmica
        const inputBusca = conteudoPrincipal.querySelector('#input-busca');
        const selectStatus = conteudoPrincipal.querySelector('#filtro-status');
        const selectArea = conteudoPrincipal.querySelector('#filtro-area');
        const selectContrato = conteudoPrincipal.querySelector('#filtro-contrato');
        const selectLocalizacao = conteudoPrincipal.querySelector('#filtro-localizacao');
        const btnLimpar = conteudoPrincipal.querySelector('#btn-limpar');

        function aplicarFiltros() {
            const termoBusca = inputBusca.value.toLowerCase().trim();
            const statusVal = selectStatus.value;
            const areaVal = selectArea.value;
            const contratoVal = selectContrato.value;
            const localVal = selectLocalizacao.value;

            const dadosFiltrados = dadosVagasOriginais.filter(item => {
                const matchBusca = !termoBusca ||
                    item.vaga.toLowerCase().includes(termoBusca) ||
                    item.area.toLowerCase().includes(termoBusca) ||
                    item.localizacao.toLowerCase().includes(termoBusca);

                const matchStatus = !statusVal || item.status === statusVal;
                const matchArea = !areaVal || item.area === areaVal;
                const matchContrato = !contratoVal || item.contrato === contratoVal;
                const matchLocal = !localVal || item.localizacao === localVal;

                return matchBusca && matchStatus && matchArea && matchContrato && matchLocal;
            });

            if (tabelaInstancia) {
                tabelaInstancia.atualizar(dadosFiltrados);
                vincularEventosLinhas(dadosFiltrados);
            }
        }

        inputBusca.addEventListener('input', aplicarFiltros);
        selectStatus.addEventListener('change', aplicarFiltros);
        selectArea.addEventListener('change', aplicarFiltros);
        selectContrato.addEventListener('change', aplicarFiltros);
        selectLocalizacao.addEventListener('change', aplicarFiltros);

        btnLimpar.addEventListener('click', () => {
            inputBusca.value = '';
            selectStatus.value = '';
            selectArea.value = '';
            selectContrato.value = '';
            selectLocalizacao.value = '';
            aplicarFiltros();
        });

    }, 0);

    containerPagina.appendChild(conteudoPrincipal);

    return containerPagina;
}