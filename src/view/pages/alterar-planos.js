import { criarSidebar } from '../components/sidebar.js';
import { obterEstadoAssinatura, salvarEstadoAssinatura } from './assinatura-estado.js';

export function renderAlterarPlanos(perfil = 'empresa') {
    const tipoPerfil = perfil === 'empresa' ? 'empresa' : 'empresa';
    const estadoSalvo = obterEstadoAssinatura();

    const containerPagina = document.createElement('div');
    containerPagina.className = 'pagina-layout-dashboard';

    const sidebar = criarSidebar(tipoPerfil, 'Thaeny Soares');
    containerPagina.appendChild(sidebar);

    const conteudoPrincipal = document.createElement('main');
    conteudoPrincipal.className = 'conteudo-principal';

    const planos = [
        {
            id: 'gratuito',
            nome: 'Gratuito',
            descricao: 'Ideal para conhecer a plataforma.',
            preco: 'R$ 0,00',
            precoDetalhe: 'R$ 0,00 /mês',
            proximaRenovacaoCard: '—',
            proximaRenovacaoResumo: 'Sem cobrança',
            destaque: false,
            beneficios: [
                'Até 1 recrutador',
                'Até 3 vagas ativas',
                'Banco de talentos com até 100 candidatos',
                'Suporte via e-mail'
            ],
            comparacao: {
                recrutadores: '1',
                vagasAtivas: '3',
                bancoTalentos: '100',
                relatoriosAvancados: '—',
                suportePrioritario: '—',
                integracoes: '—'
            }
        },
        {
            id: 'profissional',
            nome: 'Profissional',
            descricao: 'Para empresas em crescimento.',
            preco: 'R$ 145,00',
            precoDetalhe: 'R$ 145,00 /mês',
            proximaRenovacaoCard: '23/12/2026',
            proximaRenovacaoResumo: '23 de dezembro de 2026',
            destaque: true,
            beneficios: [
                'Até 5 recrutadores',
                'Até 15 vagas ativas',
                'Banco de talentos com até 500 candidatos',
                'Relatórios avançados',
                'Suporte prioritário'
            ],
            comparacao: {
                recrutadores: '5',
                vagasAtivas: '15',
                bancoTalentos: '500',
                relatoriosAvancados: '✓',
                suportePrioritario: '✓',
                integracoes: '—'
            }
        },
        {
            id: 'empresarial-educacional',
            nome: 'Empresarial/Educacional',
            descricao: 'Para empresas com maior volume de contratações.',
            preco: 'R$ 349,00',
            precoDetalhe: 'R$ 349,00 /mês',
            proximaRenovacaoCard: '23/12/2026',
            proximaRenovacaoResumo: '23 de dezembro de 2026',
            destaque: false,
            beneficios: [
                'Recrutadores ilimitados',
                'Vagas ilimitadas',
                'Banco de talentos ilimitado',
                'Relatórios avançados',
                'Suporte dedicado',
                'Integrações e personalizações'
            ],
            comparacao: {
                recrutadores: 'Ilimitado',
                vagasAtivas: 'Ilimitado',
                bancoTalentos: 'Ilimitado',
                relatoriosAvancados: '✓',
                suportePrioritario: '✓',
                integracoes: '✓'
            }
        }
    ];

    conteudoPrincipal.innerHTML = `

        <div class="cabecalho-alterar-planos">
            <h1 class="titulo-pagina">Alterar planos</h1>
            <p class="subtitulo-pagina">Escolha o plano ideal. Você pode alterar sua assinatura a qualquer momento.</p>
        </div>

        <div class="grade-alterar-planos">
            <!-- Coluna Esquerda -->
            <div class="coluna-planos-esquerda">
                <!-- Banner Informativo do Plano Atual -->
                <div class="banner-plano-atual-info" id="banner-plano-atual">
                    <span class="icone-info-circulo" aria-hidden="true">i</span>
                    <div>
                        <strong id="texto-banner-plano">Seu plano atual é ${estadoSalvo.planoAtualNome}</strong>
                        <p>Faça um upgrade para acessar mais recursos, aumentar os limites da sua empresa e potencializar seu processo de recrutamento.</p>
                    </div>
                </div>

                <!-- Grid dos 3 Cartões de Planos -->
                <div class="grid-cartoes-planos" id="grid-cartoes-planos"></div>

                <!-- Tabela Comparativa -->
                <section class="card-comparar-planos">
                    <div class="cabecalho-comparacao">
                        <h2>Compare os planos</h2>
                        <p>Veja em detalhes o que cada plano oferece.</p>
                    </div>

                    <div class="tabela-comparacao-wrapper">
                        <table class="tabela-comparacao">
                            <thead>
                                <tr>
                                    <th>Recursos</th>
                                    <th>Gratuito</th>
                                    <th>Profissional</th>
                                    <th>Empresarial/Educacional</th>
                                </tr>
                            </thead>
                            <tbody id="corpo-tabela-comparacao"></tbody>
                        </table>
                    </div>
                </section>
            </div>

            <!-- Coluna Direita -->
            <aside class="coluna-planos-direita">
                <section class="card-resumo-mudanca">
                    <h2>Resumo da mudança</h2>

                    <div class="campo-resumo-mudanca">
                        <span class="label-mudanca">Plano atual</span>
                        <div class="box-mudanca-atual">
                            <strong id="resumo-mudanca-atual-nome">${estadoSalvo.planoAtualNome}</strong>
                            <span id="resumo-mudanca-atual-preco">${estadoSalvo.planoAtualPrecoDetalhe}</span>
                        </div>
                    </div>

                    <div class="campo-resumo-mudanca">
                        <span class="label-mudanca">Novo plano</span>
                        <div class="box-mudanca-novo" id="box-mudanca-novo">
                            <strong id="resumo-mudanca-novo-nome">${estadoSalvo.planoSelecionadoNome}</strong>
                            <span id="resumo-mudanca-novo-preco">${estadoSalvo.planoSelecionadoPrecoDetalhe}</span>
                        </div>
                    </div>

                    <div class="divisor-mudanca"></div>

                    <div class="linha-detalhe-cobranca">
                        <span class="icone-detalhe-cobranca" aria-hidden="true">📅</span>
                        <div>
                            <small>Próxima cobrança</small>
                            <strong id="data-proxima-cobranca">${estadoSalvo.dataProximaCobranca}</strong>
                        </div>
                    </div>

                    <div class="linha-detalhe-cobranca">
                        <span class="icone-detalhe-cobranca" aria-hidden="true">🧾</span>
                        <div>
                            <small>Valor da próxima cobrança</small>
                            <strong id="valor-proxima-cobranca">${estadoSalvo.planoSelecionadoPreco}/mês</strong>
                        </div>
                    </div>

                    <button type="button" class="btn-confirmar-alteracoes w-100" id="btn-confirmar-alteracoes">
                        Confirmar alterações
                    </button>
                </section>

                <!-- Card Precisa de Ajuda -->
                <section class="card-ajuda-lateral">
                    <h3>Precisa de ajuda?</h3>
                    <p>Nossa equipe está pronta para ajudar você a escolher o melhor plano para sua empresa.</p>
                    <button type="button" class="btn-suporte-lateral" id="btn-suporte-planos">
                        <span aria-hidden="true">💬</span>
                        Falar com suporte
                    </button>
                </section>
            </aside>
        </div>
    `;

    setTimeout(() => {
        let planoAtualId = estadoSalvo.planoAtualId;
        let planoSelecionadoId = estadoSalvo.planoSelecionadoId;

        const gridPlanos = conteudoPrincipal.querySelector('#grid-cartoes-planos');
        const corpoComparacao = conteudoPrincipal.querySelector('#corpo-tabela-comparacao');

        function renderizarComparacao() {
            if (!corpoComparacao) return;

            const linhas = [
                { recurso: 'Recrutadores', chave: 'recrutadores' },
                { recurso: 'Vagas ativas', chave: 'vagasAtivas' },
                { recurso: 'Banco de talentos', chave: 'bancoTalentos' },
                { recurso: 'Relatórios avançados', chave: 'relatoriosAvancados' },
                { recurso: 'Suporte prioritário', chave: 'suportePrioritario' },
                { recurso: 'Integrações e personalizações', chave: 'integracoes' }
            ];

            corpoComparacao.innerHTML = linhas.map((linha) => `
                <tr>
                    <td>${linha.recurso}</td>
                    ${planos.map((plano) => {
                        const valor = plano.comparacao[linha.chave];
                        const classeCheck = valor === '✓' ? 'check-verde' : valor === '—' ? 'traco-neutro' : 'valor-texto';
                        return `<td class="${classeCheck}">${valor}</td>`;
                    }).join('')}
                </tr>
            `).join('');
        }

        function atualizarResumoLateral() {
            const planoAtual = planos.find((p) => p.id === planoAtualId) || planos[0];
            const planoNovo = planos.find((p) => p.id === planoSelecionadoId) || planos[2];

            conteudoPrincipal.querySelector('#texto-banner-plano').textContent = `Seu plano atual é ${planoAtual.nome}`;
            conteudoPrincipal.querySelector('#resumo-mudanca-atual-nome').textContent = planoAtual.nome;
            conteudoPrincipal.querySelector('#resumo-mudanca-atual-preco').textContent = planoAtual.precoDetalhe;

            conteudoPrincipal.querySelector('#resumo-mudanca-novo-nome').textContent = planoNovo.nome;
            conteudoPrincipal.querySelector('#resumo-mudanca-novo-preco').textContent = planoNovo.precoDetalhe;
            conteudoPrincipal.querySelector('#valor-proxima-cobranca').textContent = `${planoNovo.preco}/mês`;

            const btnConfirmar = conteudoPrincipal.querySelector('#btn-confirmar-alteracoes');
            if (planoNovo.id === planoAtualId) {
                btnConfirmar.textContent = 'Plano já ativo';
                btnConfirmar.disabled = true;
            } else {
                btnConfirmar.textContent = 'Confirmar alterações';
                btnConfirmar.disabled = false;
            }
        }

        function selecionarPlano(idEscolhido) {
            if (!idEscolhido) return;
            planoSelecionadoId = idEscolhido;
            const planoEscolhido = planos.find((p) => p.id === idEscolhido);

            if (planoEscolhido) {
                salvarEstadoAssinatura({
                    planoSelecionadoId: planoEscolhido.id,
                    planoSelecionadoNome: planoEscolhido.nome,
                    planoSelecionadoPreco: planoEscolhido.preco,
                    planoSelecionadoPrecoDetalhe: planoEscolhido.precoDetalhe
                });
            }

            renderizarCartoesPlanos();
            atualizarResumoLateral();
        }

        function renderizarCartoesPlanos() {
            if (!gridPlanos) return;

            gridPlanos.innerHTML = planos.map((plano) => {
                const ehAtual = plano.id === planoAtualId;
                const ehSelecionado = plano.id === planoSelecionadoId;

                let textoBotao = 'Selecionar plano';
                let classeBotao = 'btn-plano-outline';

                if (ehSelecionado) {
                    textoBotao = 'Selecionado';
                    classeBotao = 'btn-plano-primario';
                } else if (ehAtual) {
                    textoBotao = 'Plano atual';
                    classeBotao = 'btn-plano-atual-desabilitado';
                }

                return `
                    <article class="cartao-plano-item ${ehSelecionado ? 'selecionado' : ''} ${plano.destaque ? 'com-selo' : ''}" data-plano-id="${plano.id}">
                        ${plano.destaque ? `<span class="selo-mais-escolhido">Mais escolhido</span>` : ''}

                        <div class="cartao-plano-topo">
                            <h3>${plano.nome}</h3>
                            <p>${plano.descricao}</p>
                            <div class="preco-cartao-plano">
                                <strong>${plano.preco}</strong>
                                <span>/mês</span>
                            </div>
                        </div>

                        <ul class="lista-beneficios-plano">
                            ${plano.beneficios.map((beneficio) => `
                                <li>
                                    <span class="check-icone" aria-hidden="true">✓</span>
                                    <span>${beneficio}</span>
                                </li>
                            `).join('')}
                        </ul>

                        <button
                            type="button"
                            class="btn-acao-plano ${classeBotao}"
                            data-acao-plano="${plano.id}"
                        >
                            ${textoBotao}
                        </button>
                    </article>
                `;
            }).join('');

            gridPlanos.querySelectorAll('[data-acao-plano]').forEach((botao) => {
                botao.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selecionarPlano(botao.getAttribute('data-acao-plano'));
                });
            });

            gridPlanos.querySelectorAll('.cartao-plano-item').forEach((cartao) => {
                cartao.addEventListener('click', () => {
                    selecionarPlano(cartao.getAttribute('data-plano-id'));
                });
            });
        }

        conteudoPrincipal.querySelector('#btn-confirmar-alteracoes')?.addEventListener('click', () => {
            if (planoSelecionadoId === planoAtualId) return;
            const planoEscolhido = planos.find((p) => p.id === planoSelecionadoId);
            if (!planoEscolhido) return;

            salvarEstadoAssinatura({
                planoAtualId: planoEscolhido.id,
                planoAtualNome: planoEscolhido.nome,
                planoAtualDescricao: planoEscolhido.descricao,
                planoAtualPreco: planoEscolhido.preco,
                planoAtualPrecoDetalhe: planoEscolhido.precoDetalhe,
                proximaRenovacaoCard: planoEscolhido.proximaRenovacaoCard,
                proximaRenovacaoResumo: planoEscolhido.proximaRenovacaoResumo,
                planoSelecionadoId: planoEscolhido.id,
                planoSelecionadoNome: planoEscolhido.nome,
                planoSelecionadoPreco: planoEscolhido.preco,
                planoSelecionadoPrecoDetalhe: planoEscolhido.precoDetalhe,
                cancelada: false
            });

            planoAtualId = planoEscolhido.id;
            renderizarCartoesPlanos();
            atualizarResumoLateral();
            alert(`Assinatura alterada para o plano ${planoEscolhido.nome}!`);
        });

        conteudoPrincipal.querySelector('#btn-suporte-planos')?.addEventListener('click', () => {
            window.location.hash = '#suporte';
        });

        renderizarCartoesPlanos();
        renderizarComparacao();
        atualizarResumoLateral();
    }, 0);

    containerPagina.appendChild(conteudoPrincipal);

    return containerPagina;
}