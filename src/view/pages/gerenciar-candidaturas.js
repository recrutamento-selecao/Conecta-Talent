import { criarSidebar } from '../components/sidebar.js';
import { criarTabela } from '../components/table.js';

export function renderGerenciarCandidaturas() {
    const containerPagina = document.createElement('div');
    containerPagina.className = 'pagina-layout-dashboard';

    const sidebar = criarSidebar('empresa', 'Thaeny Soares');
    containerPagina.appendChild(sidebar);

    const conteudoPrincipal = document.createElement('main');
    conteudoPrincipal.className = 'conteudo-principal';

    conteudoPrincipal.innerHTML = `
        <div class="cabecalho-pagina-flex">
            <div>
                <h1 class="titulo-pagina">Candidaturas</h1>
                <p class="subtitulo-pagina">Acompanhe e gerencie todas as candidaturas recebidas nas suas vagas.</p>
            </div>
        </div>

        <!-- Barra de Filtros Completa -->
        <div class="barra-filtros-candidaturas">
            <div class="grupo-filtro-item">
                <label>Vaga</label>
                <select class="select-filtro" id="filtro-vaga">
                    <option value="">Todas</option>
                    <option value="Analista de Dados Jr.">Analista de Dados Jr.</option>
                    <option value="Desenvolvedor Frontend">Desenvolvedor Frontend</option>
                    <option value="Designer de Produto">Designer de Produto</option>
                    <option value="Analista de Suporte">Analista de Suporte</option>
                    <option value="Analista de RH">Analista de RH</option>
                </select>
            </div>
            <div class="grupo-filtro-item">
                <label>Status</label>
                <select class="select-filtro" id="filtro-status">
                    <option value="">Todos</option>
                    <option value="Nova">Nova</option>
                    <option value="Em análise">Em análise</option>
                    <option value="Entrevista">Entrevista</option>
                    <option value="Teste técnico">Teste técnico</option>
                    <option value="Aprovada">Aprovada</option>
                    <option value="Reprovada">Reprovada</option>
                </select>
            </div>
            <div class="grupo-filtro-item">
                <label>Cargo de interesse</label>
                <select class="select-filtro" id="filtro-cargo">
                    <option value="">Todos</option>
                    <option value="Analista de Dados">Analista de Dados</option>
                    <option value="Desenvolvedor Full Stack">Desenvolvedor Full Stack</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                </select>
            </div>
            <div class="grupo-filtro-item">
                <label>Localização</label>
                <select class="select-filtro" id="filtro-localizacao">
                    <option value="">Todas</option>
                    <option value="São Paulo - SP">São Paulo - SP</option>
                    <option value="Sorocaba - SP">Sorocaba - SP</option>
                </select>
            </div>
            <div class="grupo-filtro-item">
                <label>Período</label>
                <select class="select-filtro" id="filtro-periodo">
                    <option value="">Todos</option>
                    <option value="setembro">Setembro 2026</option>
                </select>
            </div>
            <div class="acoes-filtro-botoes">
                <button type="button" class="btn-filtrar" id="btn-filtrar">Filtrar</button>
                <button type="button" class="btn-limpar-filtros" id="btn-limpar">↺ Limpar filtros</button>
            </div>
        </div>

        <!-- Layout Principal: Tabela à Esquerda + Painel Lateral à Direita -->
        <div class="layout-conteudo-candidaturas" id="layout-grid-candidaturas">
            
            <!-- Tabela de Candidaturas -->
            <div id="container-tabela-candidaturas"></div>

            <!-- Painel Lateral de Detalhes da Candidatura -->
            <div class="painel-detalhes-candidatura" id="painel-detalhes" style="display: none;">
                <div class="painel-topo-perfil">
                    <div class="painel-info-principal">
                        <h3 id="detalhe-nome">Ana Clara Silva</h3>
                        <span id="detalhe-cargo-sub">Analista de Dados</span>
                        <div class="detalhes-sub-infos" id="detalhe-local-email">
                            São Paulo - SP &bull; Híbrido &bull; ana.clara@email.com &bull; (11) 91234-5678
                        </div>
                    </div>
                    <button class="btn-fechar-painel" id="btn-fechar-painel" title="Fechar">✕</button>
                </div>

                <div class="painel-acoes-topo">
                    <button type="button" class="btn-acao-azul">Agendar entrevista</button>
                    <button type="button" class="btn-acao-branco">Mover de etapa</button>
                </div>

                <!-- Abas do Painel -->
                <div class="painel-abas-candidato">
                    <button class="aba-candidato-item ativo" data-aba="resumo">Resumo</button>
                    <button class="aba-candidato-item" data-aba="curriculo">Currículo</button>
                    <button class="aba-candidato-item" data-aba="etapas">Etapas</button>
                    <button class="aba-candidato-item" data-aba="historico">Histórico</button>
                </div>

                <!-- Conteúdo Dinâmico das Abas -->
                <div class="painel-corpo-conteudo" id="painel-corpo-conteudo">
                    <!-- Conteúdo injetado via JS -->
                </div>
            </div>

        </div>
    `;

    setTimeout(() => {
        // Base de dados de candidaturas
        const dadosCandidaturasOriginais = [
            { id: 1, nome: 'Ana Clara Silva', iniciais: 'AC', subCargo: 'Analista de Dados', vaga: 'Analista de Dados Jr.', empresa: 'Tech Soluções', data: '12/09/2026', status: 'Nova', statusClasse: 'badge-nova', local: 'São Paulo - SP', modalidade: 'Híbrido', email: 'ana.clara@email.com', telefone: '(11) 91234-5678', resumo: 'Profissional com experiência em análise de dados, criação de dashboards e acompanhamento de indicadores. Possui conhecimentos em Power BI, SQL, Python e Excel.', habilidades: ['SQL', 'Power BI', 'Python', 'Excel', 'Análise de Dados'], experiencia: '3 anos', formacao: 'Superior' },
            { id: 2, nome: 'Bruno Almeida', iniciais: 'BA', subCargo: 'Desenvolvedor Full Stack', vaga: 'Desenvolvedor Frontend', empresa: 'Tech Soluções', data: '10/09/2026', status: 'Em análise', statusClasse: 'badge-analise', local: 'Sorocaba - SP', modalidade: 'Remoto', email: 'bruno.almeida@email.com', telefone: '(15) 98877-6655', resumo: 'Desenvolvedor web full stack com foco em interfaces limpas, componentização em React e APIs Node.js.', habilidades: ['React', 'Node.js', 'JavaScript', 'CSS'], experiencia: '4 anos', formacao: 'Superior Completo' },
            { id: 3, nome: 'Carla Mendes', iniciais: 'CM', subCargo: 'UI/UX Designer', vaga: 'Designer de Produto', empresa: 'Tech Soluções', data: '05/09/2026', status: 'Entrevista', statusClasse: 'badge-entrevista', local: 'São Paulo - SP', modalidade: 'Híbrido', email: 'carla.mendes@email.com', telefone: '(11) 97766-5544', resumo: 'Especialista em design de experiência do usuário, wireframing de alta fidelidade e testes com utilizadores no Figma.', habilidades: ['Figma', 'UI/UX', 'Prototipagem', 'Design System'], experiencia: '5 anos', formacao: 'Pós-graduação' },
            { id: 4, nome: 'Diego Souza', iniciais: 'DS', subCargo: 'Suporte Técnico', vaga: 'Analista de Suporte', empresa: 'Tech Soluções', data: '08/09/2026', status: 'Teste técnico', statusClasse: 'badge-teste', local: 'Sorocaba - SP', modalidade: 'Presencial', email: 'diego.souza@email.com', telefone: '(15) 96655-4433', resumo: 'Forte atuação em atendimento ao cliente, resolução de incidentes em infraestrutura de redes e suporte a sistemas.', habilidades: ['Redes', 'Suporte N2', 'Windows Server', 'ITIL'], experiencia: '2 anos', formacao: 'Tecnólogo' },
            { id: 5, nome: 'Fernanda Lima', iniciais: 'FL', subCargo: 'Analista de RH', vaga: 'Analista de RH', empresa: 'Tech Soluções', data: '06/09/2026', status: 'Em análise', statusClasse: 'badge-analise', local: 'Sorocaba - SP', modalidade: 'Presencial', email: 'fernanda.lima@email.com', telefone: '(15) 95544-3322', resumo: 'Recrutamento e seleção end-to-end, aplicação de dinâmicas, alinhamento de perfil com gestores e onboarding.', habilidades: ['Recrutamento', 'Hunting', 'People Analytics', 'Clima'], experiencia: '3 anos', formacao: 'Psicologia' },
            { id: 6, nome: 'Gabriel Rocha', iniciais: 'GR', subCargo: 'Desenvolvedor Frontend', vaga: 'Desenvolvedor Frontend', empresa: 'Tech Soluções', data: '07/09/2026', status: 'Aprovada', statusClasse: 'badge-aprovada', local: 'São Paulo - SP', modalidade: 'Remoto', email: 'gabriel.rocha@email.com', telefone: '(11) 94433-2211', resumo: 'Desenvolvedor frontend apaixonado por performance web, acessibilidade e design systems modernos.', habilidades: ['Vue.js', 'JavaScript', 'HTML5', 'Sass'], experiencia: '3 anos', formacao: 'Ciência da Computação' },
            { id: 7, nome: 'Juliana Martins', iniciais: 'JM', subCargo: 'Analista de Marketing', vaga: 'Analista de Marketing', empresa: 'Tech Soluções', data: '07/09/2026', status: 'Reprovada', statusClasse: 'badge-reprovada', local: 'Sorocaba - SP', modalidade: 'Híbrido', email: 'juliana.martins@email.com', telefone: '(15) 93322-1100', resumo: 'Gestão de campanhas tráfego pago, SEO, produção de conteúdo e análise de métricas no Google Analytics.', habilidades: ['Google Ads', 'SEO', 'Meta Ads', 'Analytics'], experiencia: '2 anos', formacao: 'Marketing' },
            { id: 8, nome: 'Lucas Pereira', iniciais: 'LP', subCargo: 'Analista de Sistemas', vaga: 'Analista de Sistemas', empresa: 'Tech Soluções', data: '06/09/2026', status: 'Em análise', statusClasse: 'badge-analise', local: 'São Paulo - SP', modalidade: 'Remoto', email: 'lucas.pereira@email.com', telefone: '(11) 92211-0099', resumo: 'Mapeamento de processos, levantamento de requisitos com clientes e modelagem de banco de dados relacional.', SQL: true, habilidades: ['SQL Server', 'UML', 'Modelagem', 'Scrum'], experiencia: '5 anos', formacao: 'Sistemas de Informação' }
        ];

        let tabelaInstancia = null;
        let candidaturaSelecionada = null;
        let abaAtiva = 'resumo';

        const containerTabela = conteudoPrincipal.querySelector('#container-tabela-candidaturas');
        const painelDetalhes = conteudoPrincipal.querySelector('#painel-detalhes');
        const layoutGrid = conteudoPrincipal.querySelector('#layout-grid-candidaturas');
        const corpoPainel = conteudoPrincipal.querySelector('#painel-corpo-conteudo');

        function atualizarLayoutPainel(aberto) {
            if (aberto) {
                painelDetalhes.style.display = 'block';
                layoutGrid.classList.add('painel-ativo');
            } else {
                painelDetalhes.style.display = 'none';
                layoutGrid.classList.remove('painel-ativo');
                candidaturaSelecionada = null;
                containerTabela.querySelectorAll('tbody tr').forEach(tr => tr.classList.remove('linha-selecionada'));
            }
        }

        function renderizarConteudoAba() {
            if (!candidaturaSelecionada) return;

            if (abaAtiva === 'resumo') {
                corpoPainel.innerHTML = `
                    <div class="secao-painel-bloco">
                        <h4>Sobre mim</h4>
                        <p class="texto-descricao-painel">${candidaturaSelecionada.resumo}</p>
                    </div>

                    <div class="secao-painel-bloco mt-4">
                        <h4>Vaga</h4>
                        <div class="bloco-card-info-pequeno">
                            <div>
                                <strong style="display:block; color:#0f172a; font-size:13px;">${candidaturaSelecionada.vaga}</strong>
                                <small style="color:#64748b;">${candidaturaSelecionada.empresa}</small>
                            </div>
                            <span class="badge-status ${candidaturaSelecionada.statusClasse}">${candidaturaSelecionada.status}</span>
                        </div>
                    </div>

                    <div class="secao-painel-bloco mt-4">
                        <h4>Etapa atual</h4>
                        <div class="bloco-card-info-pequeno" style="flex-direction: column; align-items: flex-start; gap: 4px;">
                            <strong style="color:#0f172a; font-size:13px;">Triagem</strong>
                            <small style="color:#64748b;">Próxima etapa: Teste técnico</small>
                        </div>
                    </div>

                    <div class="secao-painel-bloco mt-4">
                        <h4>Habilidades</h4>
                        <div class="tags-habilidades-grid">
                            ${candidaturaSelecionada.habilidades.map(h => `<span class="tag-habilidade">${h}</span>`).join('')}
                        </div>
                    </div>

                    <div class="grid-experiencia-formacao mt-4">
                        <div class="caixa-pequena-info">
                            <span>Experiência</span>
                            <strong>${candidaturaSelecionada.experiencia}</strong>
                        </div>
                        <div class="caixa-pequena-info">
                            <span>Formação</span>
                            <strong>${candidaturaSelecionada.formacao}</strong>
                        </div>
                    </div>

                    <div class="secao-painel-bloco mt-4">
                        <h4>Histórico da candidatura</h4>
                        <div class="linha-tempo-historico">
                            <div class="item-historico-ponto">
                                <span class="ponto-azul"></span>
                                <div>
                                    <strong>Candidatura recebida</strong>
                                    <small>${candidaturaSelecionada.data} às 10:14</small>
                                </div>
                            </div>
                            <div class="item-historico-ponto">
                                <span class="ponto-azul"></span>
                                <div>
                                    <strong>Triagem iniciada</strong>
                                    <small>${candidaturaSelecionada.data} às 14:10</small>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (abaAtiva === 'curriculo') {
                corpoPainel.innerHTML = `
                    <div style="text-align: center; padding: 24px 0;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        <h4 style="margin: 12px 0 4px 0; font-size: 14px; color: #0f172a;">Currículo_${candidaturaSelecionada.nome.replace(/\s+/g, '_')}.pdf</h4>
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 16px;">Enviado em ${candidaturaSelecionada.data}</p>
                        <button type="button" class="btn-acao-azul" style="width: auto; padding: 8px 16px;">Baixar PDF do Currículo</button>
                    </div>
                `;
            } else if (abaAtiva === 'etapas') {
                corpoPainel.innerHTML = `
                    <h4 style="margin-bottom: 12px;">Fluxo do Processo Seletivo</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <div style="padding: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-size: 12px; color: #166534;">
                            <strong>1. Inscrição</strong> - Concluída
                        </div>
                        <div style="padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 12px; color: #1e40af;">
                            <strong>2. Triagem</strong> - Em andamento (Etapa atual)
                        </div>
                        <div style="padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; color: #64748b;">
                            <strong>3. Teste técnico</strong> - Pendente
                        </div>
                        <div style="padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; color: #64748b;">
                            <strong>4. Entrevista</strong> - Pendente
                        </div>
                    </div>
                `;
            } else if (abaAtiva === 'historico') {
                corpoPainel.innerHTML = `
                    <h4 style="margin-bottom: 12px;">Registo de Atividades</h4>
                    <div class="linha-tempo-historico">
                        <div class="item-historico-ponto">
                            <span class="ponto-azul"></span>
                            <div>
                                <strong>Perfil visualizado pelo recrutador</strong>
                                <small>Hoje às 11:20</small>
                            </div>
                        </div>
                        <div class="item-historico-ponto">
                            <span class="ponto-azul"></span>
                            <div>
                                <strong>Triagem iniciada</strong>
                                <small>${candidaturaSelecionada.data} às 14:10</small>
                            </div>
                        </div>
                        <div class="item-historico-ponto">
                            <span class="ponto-azul"></span>
                            <div>
                                <strong>Candidatura submetida com sucesso</strong>
                                <small>${candidaturaSelecionada.data} às 10:14</small>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        conteudoPrincipal.querySelectorAll('.aba-candidato-item').forEach(abaBtn => {
            abaBtn.addEventListener('click', (e) => {
                conteudoPrincipal.querySelectorAll('.aba-candidato-item').forEach(b => b.classList.remove('ativo'));
                e.currentTarget.classList.add('ativo');
                abaAtiva = e.currentTarget.getAttribute('data-aba');
                renderizarConteudoAba();
            });
        });

        function abrirPainel(item, linhaElemento) {
            candidaturaSelecionada = item;
            atualizarLayoutPainel(true);

            containerTabela.querySelectorAll('tbody tr').forEach(tr => tr.classList.remove('linha-selecionada'));
            if (linhaElemento) linhaElemento.classList.add('linha-selecionada');

            conteudoPrincipal.querySelector('#detalhe-nome').textContent = item.nome;
            conteudoPrincipal.querySelector('#detalhe-cargo-sub').textContent = item.subCargo;
            conteudoPrincipal.querySelector('#detalhe-local-email').innerHTML = `${item.local} &bull; ${item.modalidade} &bull; ${item.email} &bull; ${item.telefone}`;

            conteudoPrincipal.querySelectorAll('.aba-candidato-item').forEach(b => b.classList.remove('ativo'));
            conteudoPrincipal.querySelector('[data-aba="resumo"]').classList.add('ativo');
            abaAtiva = 'resumo';

            renderizarConteudoAba();
        }

        conteudoPrincipal.querySelector('#btn-fechar-painel').addEventListener('click', () => {
            atualizarLayoutPainel(false);
        });

        // Configuração das Colunas da Tabela
        const colunasCandidaturas = [
            {
                chave: 'nome',
                titulo: 'Candidato',
                ordenavel: true,
                render: (valor, item) => {
                    const div = document.createElement('div');
                    div.className = 'celula-perfil-candidato';
                    div.innerHTML = `
                        <div class="avatar-iniciais-cand">${item.iniciais}</div>
                        <div>
                            <strong>${item.nome}</strong>
                            <span>${item.subCargo}</span>
                        </div>
                    `;
                    return div;
                }
            },
            {
                chave: 'vaga',
                titulo: 'Vaga',
                ordenavel: true,
                render: (valor, item) => {
                    const div = document.createElement('div');
                    div.innerHTML = `<strong>${item.vaga}</strong><br/><small style="color:#64748b;">${item.empresa}</small>`;
                    return div;
                }
            },
            { chave: 'data', titulo: 'Data da candidatura', ordenavel: true },
            {
                chave: 'status',
                titulo: 'Status',
                alinhamento: 'centro',
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
                    btn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                    `;
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const tr = btn.closest('tr');
                        abrirPainel(item, tr);
                    });
                    return btn;
                }
            }
        ];

        function vincularEventosLinhas(listaAtual) {
            const linhas = containerTabela.querySelectorAll('tbody tr');
            linhas.forEach((tr, index) => {
                const item = listaAtual[index];
                if (!item) return;

                tr.style.cursor = 'pointer';
                if (candidaturaSelecionada && item.id === candidaturaSelecionada.id) {
                    tr.classList.add('linha-selecionada');
                }

                tr.addEventListener('click', (e) => {
                    if (e.target.type === 'checkbox' || e.target.closest('.btn-acoes-linha')) return;
                    abrirPainel(item, tr);
                });
            });
        }

        let dadosAtuais = [...dadosCandidaturasOriginais];

        if (containerTabela) {
            tabelaInstancia = criarTabela(colunasCandidaturas, dadosAtuais, {
                container: containerTabela,
                selecionavel: true,
                acoes: false,
                rodape: {
                    esquerda: `Mostrando 1 a ${dadosAtuais.length} de ${dadosCandidaturasOriginais.length} candidaturas`,
                    direita: `
                        <div class="paginacao-container">
                            <button class="pag-btn">&lt;</button>
                            <button class="pag-btn ativo">1</button>
                            <button class="pag-btn">2</button>
                            <button class="pag-btn">3</button>
                            <button class="pag-btn">&gt;</button>
                        </div>
                    `
                }
            });

            vincularEventosLinhas(dadosAtuais);
        }

        // Filtros dinâmicos
        const selectVaga = conteudoPrincipal.querySelector('#filtro-vaga');
        const selectStatus = conteudoPrincipal.querySelector('#filtro-status');
        const selectCargo = conteudoPrincipal.querySelector('#filtro-cargo');
        const selectLocal = conteudoPrincipal.querySelector('#filtro-localizacao');
        const btnFiltrar = conteudoPrincipal.querySelector('#btn-filtrar');
        const btnLimpar = conteudoPrincipal.querySelector('#btn-limpar');

        function aplicarFiltros() {
            const vagaVal = selectVaga.value;
            const statusVal = selectStatus.value;
            const cargoVal = selectCargo.value;
            const localVal = selectLocal.value;

            dadosAtuais = dadosCandidaturasOriginais.filter(item => {
                const matchVaga = !vagaVal || item.vaga === vagaVal;
                const matchStatus = !statusVal || item.status === statusVal;
                const matchCargo = !cargoVal || item.subCargo === cargoVal;
                const matchLocal = !localVal || item.local === localVal;

                return matchVaga && matchStatus && matchCargo && matchLocal;
            });

            if (tabelaInstancia) {
                tabelaInstancia.atualizar(dadosAtuais);
                vincularEventosLinhas(dadosAtuais);
            }
        }

        if (btnFiltrar) btnFiltrar.addEventListener('click', aplicarFiltros);

        if (btnLimpar) {
            btnLimpar.addEventListener('click', () => {
                selectVaga.value = '';
                selectStatus.value = '';
                selectCargo.value = '';
                selectLocal.value = '';
                aplicarFiltros();
            });
        }

    }, 0);

    containerPagina.appendChild(conteudoPrincipal);
    return containerPagina;
}