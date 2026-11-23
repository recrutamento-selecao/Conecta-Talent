import { criarSidebar } from '../components/sidebar.js';
import { obterEstadoAssinatura, salvarEstadoAssinatura } from './assinatura-estado.js';

export function renderMinhaAssinatura(perfil = 'empresa') {
    const tipoPerfil = perfil === 'empresa' ? 'empresa' : 'empresa';
    let estadoAssinatura = obterEstadoAssinatura();

    const containerPagina = document.createElement('div');
    containerPagina.className = 'pagina-layout-dashboard';

    const sidebar = criarSidebar(tipoPerfil, 'Thaeny Soares');
    containerPagina.appendChild(sidebar);

    const conteudoPrincipal = document.createElement('main');
    conteudoPrincipal.className = 'conteudo-principal';

    conteudoPrincipal.innerHTML = `

        <div class="cabecalho-assinatura">
            <h1 class="titulo-pagina">Minha assinatura</h1>
            <p class="subtitulo-pagina">Visualize os detalhes do seu plano e gerencie sua assinatura</p>
        </div>

        <div class="grade-assinatura-principal">
            <!-- Coluna Esquerda -->
            <div class="coluna-assinatura-esquerda">
                <!-- Card Plano Atual -->
                <section class="card-assinatura" id="card-plano-atual">
                    <h2 class="titulo-secao-card">Plano atual</h2>

                    <div class="box-plano-destaque">
                        <div class="box-plano-topo">
                            <div>
                                <h3 class="nome-plano-atual" id="nome-plano-atual">${estadoAssinatura.planoAtualNome}</h3>
                                <p class="descricao-plano-atual" id="descricao-plano-atual">${estadoAssinatura.planoAtualDescricao}</p>
                            </div>
                            <span class="badge-plano-ativa" id="badge-status-plano">Ativa</span>
                        </div>

                        <div class="box-plano-rodape">
                            <div class="preco-plano-box">
                                <strong id="valor-plano-atual">${estadoAssinatura.planoAtualPreco}</strong>
                                <span>/mês</span>
                            </div>
                            <div class="proxima-renovacao-box">
                                <span>Próxima renovação:</span>
                                <strong id="proxima-renovacao-valor">${estadoAssinatura.proximaRenovacaoCard}</strong>
                            </div>
                        </div>
                    </div>

                    <button type="button" class="btn-primario-assinatura" id="btn-alterar-plano">Alterar plano</button>
                </section>

                <!-- Card Forma de Pagamento -->
                <section class="card-assinatura card-pagamento-flex">
                    <div class="info-cartao-pagamento">
                        <div class="bandeira-cartao" aria-hidden="true">
                            <span class="circulo-vermelho"></span>
                            <span class="circulo-amarelo"></span>
                        </div>
                        <div class="dados-cartao-texto">
                            <strong id="numero-cartao-mascarado">•••• •••• •••• ${estadoAssinatura.cartaoFinal}</strong>
                            <span id="titular-cartao">${estadoAssinatura.titular}</span>
                            <small id="validade-cartao">Válido até ${estadoAssinatura.validade}</small>
                        </div>
                    </div>

                    <button type="button" class="btn-outline-assinatura" id="btn-alterar-pagamento">Alterar forma de pagamento</button>
                </section>

                <!-- Card Histórico de Cobranças -->
                <section class="card-assinatura">
                    <h2 class="titulo-secao-card">Histórico de cobranças</h2>

                    <div class="tabela-cobrancas-wrapper">
                        <table class="tabela-cobrancas">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Descrição</th>
                                    <th>Valor</th>
                                    <th>Status</th>
                                    <th>Fatura</th>
                                </tr>
                            </thead>
                            <tbody id="corpo-historico-cobrancas"></tbody>
                        </table>
                    </div>
                </section>

                <!-- Banner Precisa de Ajuda -->
                <section class="banner-ajuda-assinatura">
                    <div>
                        <h3>Precisa de ajuda?</h3>
                        <p>Nossa equipe está pronta para ajudar com sua assinatura, pagamentos ou faturas.</p>
                    </div>
                    <button type="button" class="btn-outline-assinatura btn-suporte" id="btn-falar-suporte">
                        <span class="icone-chat" aria-hidden="true">💬</span>
                        Falar com suporte
                    </button>
                </section>
            </div>

            <!-- Coluna Direita: Resumo da Assinatura -->
            <aside class="coluna-assinatura-direita">
                <section class="card-assinatura resumo-assinatura-card">
                    <h2 class="titulo-secao-card">Resumo da assinatura</h2>

                    <div class="bloco-resumo-item">
                        <span class="label-resumo">Plano atual</span>
                        <div class="caixa-resumo-cinza">
                            <strong id="resumo-nome-plano">${estadoAssinatura.planoAtualNome}</strong>
                            <span id="resumo-preco-plano">${estadoAssinatura.planoAtualPrecoDetalhe}</span>
                        </div>
                    </div>

                    <div class="bloco-resumo-item">
                        <span class="label-resumo">Status</span>
                        <div>
                            <span class="badge-resumo-ativo" id="resumo-status-badge">
                                <span class="ponto-verde"></span>
                                Assinatura ativa
                            </span>
                        </div>
                    </div>

                    <div class="divisor-resumo"></div>

                    <div class="bloco-resumo-item">
                        <span class="label-resumo">Próxima renovação</span>
                        <strong class="valor-resumo-simples" id="resumo-proxima-renovacao">${estadoAssinatura.proximaRenovacaoResumo}</strong>
                    </div>

                    <div class="bloco-resumo-item">
                        <span class="label-resumo">Forma de pagamento</span>
                        <strong class="valor-resumo-simples" id="resumo-forma-pagamento">•••• ${estadoAssinatura.cartaoFinal}</strong>
                    </div>

                    <div class="divisor-resumo"></div>

                    <div class="bloco-resumo-item">
                        <span class="label-resumo">Plano recomendado</span>
                        <div class="caixa-resumo-azul">
                            <strong>Profissional</strong>
                            <span>R$ 145,00 /mês</span>
                        </div>
                    </div>

                    <button type="button" class="btn-primario-assinatura w-100" id="btn-ver-planos">Ver planos disponíveis</button>

                    <div class="caixa-alerta-cancelamento">
                        <strong class="titulo-alerta-cancelamento">▲ Cancelar assinatura</strong>
                        <p>Ao cancelar, sua assinatura permanecerá ativa até o final do período contratado.</p>
                    </div>

                    <button type="button" class="btn-cancelar-assinatura w-100" id="btn-cancelar-assinatura">Cancelar assinatura</button>
                </section>
            </aside>
        </div>
    `;

    setTimeout(() => {
        const historicoCobrancas = [
            { data: '05/09/2026', descricao: 'Plano Profissional Mensal', valor: 'R$ 199,90', status: 'Pago' },
            { data: '05/08/2026', descricao: 'Plano Profissional Mensal', valor: 'R$ 199,90', status: 'Pago' },
            { data: '05/07/2026', descricao: 'Plano Profissional Mensal', valor: 'R$ 199,90', status: 'Pago' },
            { data: '05/06/2026', descricao: 'Plano Profissional Mensal', valor: 'R$ 199,90', status: 'Pago' },
            { data: '05/05/2026', descricao: 'Plano Profissional Mensal', valor: 'R$ 199,90', status: 'Pago' }
        ];

        const corpoTabela = conteudoPrincipal.querySelector('#corpo-historico-cobrancas');
        if (corpoTabela) {
            corpoTabela.innerHTML = historicoCobrancas.map((item) => `
                <tr>
                    <td>${item.data}</td>
                    <td>${item.descricao}</td>
                    <td>${item.valor}</td>
                    <td><span class="badge-pago">${item.status}</span></td>
                    <td>
                        <button type="button" class="btn-baixar-fatura" data-fatura="${item.data}">
                            ↓ Baixar
                        </button>
                    </td>
                </tr>
            `).join('');

            corpoTabela.querySelectorAll('.btn-baixar-fatura').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const dataFatura = btn.getAttribute('data-fatura');
                    alert(`Download da fatura referente a ${dataFatura} iniciado.`);
                });
            });
        }

        function sincronizarTelaAssinatura() {
            estadoAssinatura = obterEstadoAssinatura();

            conteudoPrincipal.querySelector('#nome-plano-atual').textContent = estadoAssinatura.planoAtualNome;
            conteudoPrincipal.querySelector('#descricao-plano-atual').textContent = estadoAssinatura.planoAtualDescricao;
            conteudoPrincipal.querySelector('#valor-plano-atual').textContent = estadoAssinatura.planoAtualPreco;
            conteudoPrincipal.querySelector('#proxima-renovacao-valor').textContent = estadoAssinatura.proximaRenovacaoCard;

            const badgeCard = conteudoPrincipal.querySelector('#badge-status-plano');
            badgeCard.textContent = estadoAssinatura.cancelada ? 'Cancelamento agendado' : estadoAssinatura.status;

            conteudoPrincipal.querySelector('#numero-cartao-mascarado').textContent = `•••• •••• •••• ${estadoAssinatura.cartaoFinal}`;
            conteudoPrincipal.querySelector('#titular-cartao').textContent = estadoAssinatura.titular;
            conteudoPrincipal.querySelector('#validade-cartao').textContent = `Válido até ${estadoAssinatura.validade}`;

            conteudoPrincipal.querySelector('#resumo-nome-plano').textContent = estadoAssinatura.planoAtualNome;
            conteudoPrincipal.querySelector('#resumo-preco-plano').textContent = estadoAssinatura.planoAtualPrecoDetalhe;
            conteudoPrincipal.querySelector('#resumo-proxima-renovacao').textContent = estadoAssinatura.proximaRenovacaoResumo;
            conteudoPrincipal.querySelector('#resumo-forma-pagamento').textContent = `•••• ${estadoAssinatura.cartaoFinal}`;

            const badgeResumo = conteudoPrincipal.querySelector('#resumo-status-badge');
            badgeResumo.innerHTML = estadoAssinatura.cancelada
                ? `<span class="ponto-alerta"></span> Cancelamento agendado`
                : `<span class="ponto-verde"></span> Assinatura ativa`;
        }

        conteudoPrincipal.querySelector('#btn-alterar-plano')?.addEventListener('click', () => {
            window.location.hash = '#alterar-planos';
        });

        conteudoPrincipal.querySelector('#btn-ver-planos')?.addEventListener('click', () => {
            window.location.hash = '#alterar-planos';
        });

        conteudoPrincipal.querySelector('#btn-alterar-pagamento')?.addEventListener('click', () => {
            const novoFinal = prompt('Informe os 4 últimos dígitos do novo cartão:', estadoAssinatura.cartaoFinal);
            if (novoFinal && /^\d{4}$/.test(novoFinal.trim())) {
                salvarEstadoAssinatura({ cartaoFinal: novoFinal.trim() });
                sincronizarTelaAssinatura();
            }
        });

        conteudoPrincipal.querySelector('#btn-cancelar-assinatura')?.addEventListener('click', () => {
            if (!confirm('Deseja cancelar sua assinatura? Ela continuará ativa até o final do período contratado.')) return;
            salvarEstadoAssinatura({ cancelada: true });
            sincronizarTelaAssinatura();
        });

        conteudoPrincipal.querySelector('#btn-falar-suporte')?.addEventListener('click', () => {
            window.location.hash = '#suporte';
        });

        sincronizarTelaAssinatura();
    }, 0);

    containerPagina.appendChild(conteudoPrincipal);

    return containerPagina;
}