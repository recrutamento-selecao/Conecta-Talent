import { criarSidebar } from '../components/sidebar.js';
import { criarTabela } from '../components/table.js';

export function renderAlterarPlanos() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const planoAtualId = 'gratuito';
    let planoSelecionadoId = 'empresarial';

    const planos = [
        {
            id: 'gratuito',
            nome: 'Gratuito',
            preco: 'R$ 0,00',
            periodo: '/mês',
            descricao: 'Ideal para conhecer a plataforma.',
            recursos: [
                'Até 1 recrutador',
                'Até 3 vagas ativas',
                'Banco de talentos com até 100 candidatos',
                'Suporte via e-mail'
            ]
        },
        {
            id: 'profissional',
            nome: 'Profissional',
            destaque: 'Mais escolhido',
            preco: 'R$ 145,00',
            periodo: '/mês',
            descricao: 'Para empresas em crescimento.',
            recursos: [
                'Até 5 recrutadores',
                'Até 15 vagas ativas',
                'Banco de talentos com até 500 candidatos',
                'Relatórios avançados',
                'Suporte prioritário'
            ]
        },
        {
            id: 'empresarial',
            nome: 'Empresarial/Educacional',
            preco: 'R$ 349,00',
            periodo: '/mês',
            descricao: 'Para empresas com maior volume de contratações.',
            recursos: [
                'Recrutadores ilimitados',
                'Vagas ilimitadas',
                'Banco de talentos ilimitado',
                'Relatórios avançados',
                'Suporte dedicado',
                'Integrações e personalizações'
            ]
        }
    ];

    const wrapper = document.createElement('div');
    wrapper.className = 'pagina-alterar-planos-wrapper';

    wrapper.appendChild(criarSidebar('Empresa', 'Twelse LTDA'));

    const main = document.createElement('main');
    main.className = 'conteudo-principal';

    main.innerHTML = `
      

        <header class="cabecalho-pagina-padrao">
            <h1 class="titulo-pagina">Alterar planos</h1>
            <p class="subtitulo-pagina">Escolha o plano ideal. Você pode alterar sua assinatura a qualquer momento.</p>
        </header>

        <div class="banner-info-plano-atual">
            <span class="icone-info">i</span>
            <div>
                <strong>Seu plano atual é Gratuito</strong>
                <p>Faça um upgrade para acessar mais recursos, aumentar os limites da sua empresa e potencializar seu processo de recrutamento.</p>
            </div>
        </div>

        <div class="layout-alterar-planos-grid">
            <!-- Coluna Esquerda: 3 Cards + Tabela Comparativa -->
            <div class="coluna-esquerda-planos">
                <section class="area-planos-interna" id="lista-cards-planos"></section>
                <div id="container-tabela-comparacao"></div>
            </div>

            <!-- Coluna Direita: Resumo da mudança + Ajuda -->
            <aside class="coluna-direita-mudanca">
                <section class="card-resumo-mudanca">
                    <h2 class="titulo-card-resumo">Resumo da mudança</h2>

                    <div class="bloco-plano-resumo">
                        <small>Plano atual</small>
                        <strong>Gratuito</strong>
                        <span>R$ 0,00 /mês</span>
                    </div>

                    <div class="bloco-plano-novo" id="resumo-plano-novo">
                        <small>Novo plano</small>
                        <strong>Empresarial/Educacional</strong>
                        <span>R$ 349,00 /mês</span>
                    </div>

                    <div class="detalhe-cobranca-resumo">
                        <small>Próxima cobrança</small>
                        <span>05 de outubro de 2026</span>
                    </div>

                    <div class="detalhe-cobranca-resumo">
                        <small>Valor da próxima cobrança</small>
                        <span id="resumo-valor-cobranca">R$ 349,00 /mês</span>
                    </div>

                    <button type="button" class="btn-primario-azul btn-full" id="btn-confirmar-alteracoes">Confirmar alterações</button>
                </section>

                <section class="card-ajuda-lateral">
                    <strong>Precisa de ajuda?</strong>
                    <p>Nossa equipe está pronta para ajudar a escolher o melhor plano para sua empresa.</p>
                    <button type="button" class="btn-secundario-outline" id="btn-suporte-planos">Falar com suporte</button>
                </section>
            </aside>
        </div>
    `;

    wrapper.appendChild(main);
    app.appendChild(wrapper);

    const areaPlanos = document.getElementById('lista-cards-planos');
    const resumoNovo = document.getElementById('resumo-plano-novo');
    const resumoValor = document.getElementById('resumo-valor-cobranca');

    function atualizarResumo(plano) {
        resumoNovo.innerHTML = `
            <small>Novo plano</small>
            <strong>${plano.nome}</strong>
            <span>${plano.preco} ${plano.periodo}</span>
        `;
        resumoValor.textContent = `${plano.preco} ${plano.periodo}`;
    }

    function renderizarCards() {
        areaPlanos.innerHTML = '';
        planos.forEach((plano) => {
            const ehAtual = plano.id === planoAtualId;
            const ehSelecionado = plano.id === planoSelecionadoId;

            const card = document.createElement('div');
            card.className = `card-plano-interno ${plano.destaque ? 'card-destaque' : ''} ${ehSelecionado ? 'card-selecionado' : ''}`;

            if (plano.destaque) {
                const badge = document.createElement('span');
                badge.className = 'badge-mais-escolhido';
                badge.textContent = plano.destaque;
                card.appendChild(badge);
            }

            const titulo = document.createElement('h3');
            titulo.className = 'nome-plano-interno';
            titulo.textContent = plano.nome;

            const desc = document.createElement('p');
            desc.className = 'descricao-plano-interno';
            desc.textContent = plano.descricao;

            const linhaPreco = document.createElement('div');
            linhaPreco.className = 'linha-preco-interno';

            const precoSpan = document.createElement('span');
            precoSpan.className = 'preco-plano-interno';
            precoSpan.textContent = plano.preco;

            const periodoSpan = document.createElement('span');
            periodoSpan.className = 'periodo-plano-interno';
            periodoSpan.textContent = plano.periodo;

            linhaPreco.append(precoSpan, periodoSpan);

            const ul = document.createElement('ul');
            ul.className = 'lista-recursos-interna';
            plano.recursos.forEach((recurso) => {
                const li = document.createElement('li');
                li.textContent = recurso;
                ul.appendChild(li);
            });

            const btn = document.createElement('button');
            btn.type = 'button';
            if (ehAtual) {
                btn.className = 'btn-plano-atual-disabled';
                btn.textContent = 'Plano atual';
                btn.disabled = true;
            } else {
                btn.className = ehSelecionado ? 'btn-primario-azul btn-full' : 'btn-secundario-outline btn-full';
                btn.textContent = 'Selecionar plano';
                btn.addEventListener('click', () => {
                    planoSelecionadoId = plano.id;
                    atualizarResumo(plano);
                    renderizarCards();
                });
            }

            card.append(titulo, desc, linhaPreco, ul, btn);
            areaPlanos.appendChild(card);
        });
    }

    renderizarCards();

    // Tabela "Compare os planos" reutilizando table.js
    const comparacao = [
        { id: 1, recurso: 'Recrutadores', gratuito: '1', profissional: '5', empresarial: 'Ilimitados' },
        { id: 2, recurso: 'Vagas ativas', gratuito: '3', profissional: '15', empresarial: 'Ilimitadas' },
        { id: 3, recurso: 'Banco de talentos', gratuito: '100', profissional: '500', empresarial: 'Ilimitado' },
        { id: 4, recurso: 'Relatórios avançados', gratuito: '—', profissional: '✓', empresarial: '✓' },
        { id: 5, recurso: 'Suporte prioritário', gratuito: '—', profissional: '✓', empresarial: '✓' },
        { id: 6, recurso: 'Integrações e personalizações', gratuito: '—', profissional: '—', empresarial: '✓' }
    ];

    const renderCheckOuTraco = (valor) => {
        const span = document.createElement('span');
        span.textContent = valor;
        if (valor === '✓') span.className = 'check-comparacao-verde';
        return span;
    };

    criarTabela(
        [
            { chave: 'recurso', titulo: 'Recursos' },
            { chave: 'gratuito', titulo: 'Gratuito', alinhamento: 'centro', render: renderCheckOuTraco },
            { chave: 'profissional', titulo: 'Profissional', alinhamento: 'centro', render: renderCheckOuTraco },
            { chave: 'empresarial', titulo: 'Empresarial/Educacional', alinhamento: 'centro', render: renderCheckOuTraco }
        ],
        comparacao,
        {
            container: 'container-tabela-comparacao',
            titulo: 'Compare os planos',
            subtitulo: 'Veja em detalhes o que cada plano oferece.',
            variante: 'limpa',
            acoes: false
        }
    );
}