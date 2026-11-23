import { criarSidebar } from '../components/sidebar.js';
import { criarTabela } from '../components/table.js';

export function renderMinhaAssinatura() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'pagina-minha-assinatura-wrapper';

    // 1. Sidebar (Empresa)
    const sidebar = criarSidebar('Empresa', 'Twelse LTDA');
    wrapper.appendChild(sidebar);

    // 2. Conteúdo Principal
    const main = document.createElement('main');
    main.className = 'conteudo-principal';

    main.innerHTML = `
       
        <header class="cabecalho-pagina-padrao">
            <h1 class="titulo-pagina">Minha assinatura</h1>
            <p class="subtitulo-pagina">Visualize os detalhes do seu plano e gerencie sua assinatura</p>
        </header>

        <div class="layout-minha-assinatura-grid">
            <!-- Coluna Esquerda -->
            <div class="coluna-esquerda-assinatura">
                <!-- Card Plano Atual -->
                <section class="card-assinatura">
                    <h2 class="titulo-card-assinatura">Plano atual</h2>
                    <div class="box-plano-atual">
                        <div>
                            <strong class="nome-plano">Gratuito</strong>
                            <p class="desc-plano">Ideal para conhecer a plataforma.</p>
                            <div class="valor-plano">R$ 0,00 <span>/mês</span></div>
                        </div>
                        <div class="status-renovacao">
                            <span class="badge-ativa">Ativa</span>
                            <small>Próxima renovação:</small>
                            <strong>—</strong>
                        </div>
                    </div>
                    <button type="button" class="btn-primario-azul" id="btn-alterar-plano">Alterar plano</button>
                </section>

                <!-- Card Forma de Pagamento -->
                <section class="card-assinatura card-pagamento-linha">
                    <div class="info-cartao">
                        <div class="bandeira-mastercard">
                            <span class="circulo-vermelho"></span>
                            <span class="circulo-amarelo"></span>
                        </div>
                        <div>
                            <strong class="numero-cartao">•••• •••• •••• 1234</strong>
                            <span class="titular-cartao">TWELSE LTDA</span>
                            <small class="validade-cartao">Válido até 08/2029</small>
                        </div>
                    </div>
                    <button type="button" class="btn-secundario-outline" id="btn-alterar-pagamento">Alterar forma de pagamento</button>
                </section>

                <!-- Container onde o componente criarTabela vai renderizar o Histórico de cobranças -->
                <div id="container-tabela-cobrancas"></div>

                <!-- Banner Ajuda -->
                <section class="banner-ajuda-assinatura">
                    <div>
                        <strong>Precisa de ajuda?</strong>
                        <p>Nossa equipe está pronta para ajudar com sua assinatura, pagamentos ou faturas.</p>
                    </div>
                    <button type="button" class="btn-secundario-outline" id="btn-suporte-assinatura">Falar com suporte</button>
                </section>
            </div>

            <!-- Coluna Direita (Resumo da assinatura) -->
            <aside class="coluna-direita-resumo">
                <section class="card-assinatura">
                    <h2 class="titulo-card-assinatura">Resumo da assinatura</h2>

                    <div class="bloco-resumo-cinza">
                        <small>Plano atual</small>
                        <strong>Gratuito</strong>
                        <span>R$ 0,00 /mês</span>
                    </div>

                    <div class="item-resumo-lista">
                        <small>Status</small>
                        <span class="badge-assinatura-ativa"><span class="ponto-verde"></span> Assinatura ativa</span>
                    </div>

                    <div class="item-resumo-lista">
                        <small>Próxima renovação</small>
                        <span>Sem cobrança</span>
                    </div>

                    <div class="item-resumo-lista">
                        <small>Forma de pagamento</small>
                        <span>•••• 1234</span>
                    </div>

                    <div class="bloco-resumo-azul">
                        <small>Plano recomendado</small>
                        <strong>Profissional</strong>
                        <span>R$ 149,00 /mês</span>
                    </div>

                    <button type="button" class="btn-primario-azul btn-full" id="btn-ver-planos">Ver planos disponíveis</button>

                    <div class="alerta-cancelamento-box">
                        <strong>⚠ Cancelar assinatura</strong>
                        <p>Ao cancelar, sua assinatura permanecerá ativa até o final do período contratado.</p>
                    </div>

                    <button type="button" class="btn-cancelar-outline btn-full" id="btn-cancelar-assinatura">Cancelar assinatura</button>
                </section>
            </aside>
        </div>
    `;

    wrapper.appendChild(main);
    app.appendChild(wrapper);

    // 3. Instanciando o componente table.js para o Histórico de cobranças
    const cobrancas = [
        { id: 1, data: '05/09/2026', descricao: 'Plano Profissional Mensal', valor: 'R$ 199,00', status: 'Pago', faturaUrl: '#' },
        { id: 2, data: '05/08/2026', descricao: 'Plano Profissional Mensal', valor: 'R$ 199,00', status: 'Pago', faturaUrl: '#' },
        { id: 3, data: '05/07/2026', descricao: 'Plano Profissional Mensal', valor: 'R$ 199,00', status: 'Pago', faturaUrl: '#' },
        { id: 4, data: '05/06/2026', descricao: 'Plano Profissional Mensal', valor: 'R$ 199,00', status: 'Pago', faturaUrl: '#' },
        { id: 5, data: '05/05/2026', descricao: 'Plano Profissional Mensal', valor: 'R$ 199,00', status: 'Pago', faturaUrl: '#' }
    ];

    criarTabela(
        [
            { chave: 'data', titulo: 'Data' },
            { chave: 'descricao', titulo: 'Descrição' },
            { chave: 'valor', titulo: 'Valor' },
            {
                chave: 'status',
                titulo: 'Status',
                render: (valor) => {
                    const badge = document.createElement('span');
                    badge.className = 'badge-status-pago';
                    badge.textContent = valor;
                    return badge;
                }
            },
            {
                chave: 'faturaUrl',
                titulo: 'Fatura',
                render: (url, item) => {
                    const link = document.createElement('a');
                    link.href = url;
                    link.className = 'link-baixar-fatura';
                    link.textContent = '↓ Baixar';
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        console.log('Baixando fatura:', item.data);
                    });
                    return link;
                }
            }
        ],
        cobrancas,
        {
            container: 'container-tabela-cobrancas',
            titulo: 'Histórico de cobranças',
            variante: 'limpa', // Cabeçalho cinza sem borda interna, igual ao print
            acoes: false       // Desativa a coluna padrão de editar/excluir
        }
    );
}