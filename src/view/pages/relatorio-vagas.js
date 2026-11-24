import { criarSidebar } from '../components/sidebar.js';
import { criarTabela, criarBotaoMenu } from '../components/table.js';

export function renderRelatorioVagas() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'pagina-relatorio-vagas-wrapper';

    wrapper.appendChild(criarSidebar('Empresa', 'Twelse LTDA'));

    const main = document.createElement('main');
    main.className = 'conteudo-principal';

    main.innerHTML = `
        <header class="cabecalho-pagina-padrao">
            <h1 class="titulo-pagina">Relatórios de vagas</h1>
            <p class="subtitulo-pagina">Acompanhe o desempenho das vagas da sua empresa.</p>
        </header>

        <div class="layout-relatorio-vagas-grid">
            <!-- Coluna Esquerda: Filtros do relatório -->
            <aside class="card-filtro-relatorio">
                <div class="filtro-cabecalho">
                    <div class="filtro-topo-linha">
                        <h2>Filtros do relatório</h2>
                        <button type="button" class="btn-limpar-tudo-topo" id="btn-limpar-filtros-vagas">Limpar tudo</button>
                    </div>
                
                </div>

                <form id="form-filtro-vagas" class="form-filtro-relatorio">
                    <div class="campo-filtro">
                        <label>Período de criação</label>
                        <div class="linha-datas-filtro">
                            <input type="date" id="filtro-vaga-data-inicio" class="input-filtro" />
                            <span>até</span>
                            <input type="date" id="filtro-vaga-data-fim" class="input-filtro" />
                        </div>
                    </div>

                    <div class="campo-filtro">
                        <label for="filtro-status-vaga">Status da vaga</label>
                        <select id="filtro-status-vaga" class="select-filtro-relatorio">
                            <option value="">Todos</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Concluída">Concluída</option>
                            <option value="Pausada">Pausada</option>
                            <option value="Cancelada">Cancelada</option>
                        </select>
                    </div>

                    <div class="campo-filtro">
                        <label for="filtro-area-vaga">Área</label>
                        <select id="filtro-area-vaga" class="select-filtro-relatorio">
                            <option value="">Todas</option>
                            <option value="TI">TI</option>
                            <option value="Dados">Dados</option>
                            <option value="Recursos Humanos">Recursos Humanos</option>
                            <option value="Suporte">Suporte</option>
                            <option value="Design">Design</option>
                            <option value="Vendas">Vendas</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Administrativo">Administrativo</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="Comercial">Comercial</option>
                        </select>
                    </div>

                    <div class="campo-filtro">
                        <label for="filtro-recrutador-vaga">Recrutador</label>
                        <select id="filtro-recrutador-vaga" class="select-filtro-relatorio">
                            <option value="">Todos</option>
                            <option value="Juliana Martins">Juliana Martins</option>
                            <option value="Rafael Costa">Rafael Costa</option>
                            <option value="Larissa Souza">Larissa Souza</option>
                            <option value="Carlos Mendes">Carlos Mendes</option>
                            <option value="Fernanda Lima">Fernanda Lima</option>
                            <option value="Pedro Almeida">Pedro Almeida</option>
                            <option value="Camila Rocha">Camila Rocha</option>
                            <option value="Thiago Ferreira">Thiago Ferreira</option>
                            <option value="Aline Pereira">Aline Pereira</option>
                            <option value="Gabriel Silva">Gabriel Silva</option>
                        </select>
                    </div>

                    <div class="campo-filtro">
                        <label for="filtro-tipo-vaga">Tipo de vaga</label>
                        <select id="filtro-tipo-vaga" class="select-filtro-relatorio">
                            <option value="">Todos</option>
                            <option value="CLT">CLT</option>
                            <option value="PJ">PJ</option>
                            <option value="Estágio">Estágio</option>
                            <option value="Temporário">Temporário</option>
                        </select>
                    </div>

                    <div class="campo-filtro">
                        <label for="filtro-localizacao-vaga">Localização</label>
                        <select id="filtro-localizacao-vaga" class="select-filtro-relatorio">
                            <option value="">Todas</option>
                            <option value="Sorocaba, SP">Sorocaba, SP</option>
                            <option value="São Paulo, SP">São Paulo, SP</option>
                            <option value="Remoto">Remoto</option>
                        </select>
                    </div>

                    <div class="campo-filtro">
                        <label for="filtro-palavra-chave-vaga">Palavra-chave</label>
                        <input
                            type="text"
                            id="filtro-palavra-chave-vaga"
                            class="input-filtro"
                            placeholder="Título da vaga, área ou descrição..."
                        />
                    </div>

                    <button type="submit" class="btn-aplicar-filtro">Gerar relatório</button>
                </form>
            </aside>

            <!-- Coluna Direita: Resultados do relatório -->
            <section class="coluna-resultados-relatorio">
                <div class="barra-topo-resultados">
                    <div class="info-resultados-titulo">
                        <h2>Resultados do relatório</h2>
                        <span id="contador-vagas">(10 vagas encontradas)</span>
                    </div>
                    <input
                        type="search"
                        id="busca-rapida-vaga"
                        class="input-busca-tabela"
                        placeholder="Buscar vaga, recrutador, área..."
                    />
                </div>

                <div id="container-tabela-vagas"></div>
            </section>
        </div>
    `;

    wrapper.appendChild(main);
    app.appendChild(wrapper);

    const dadosVagas = [
        { id: 1, cargo: 'Desenvolvedor Frontend', recrutador: 'Juliana Martins', area: 'TI', candidatos: 142, contratados: 2, status: 'Em andamento', dataCriacao: '10/09/2026', dataIso: '2026-09-10', tipo: 'CLT', localizacao: 'Sorocaba, SP' },
        { id: 2, cargo: 'Analista de Dados', recrutador: 'Rafael Costa', area: 'Dados', candidatos: 98, contratados: 1, status: 'Em andamento', dataCriacao: '05/09/2026', dataIso: '2026-09-05', tipo: 'CLT', localizacao: 'São Paulo, SP' },
        { id: 3, cargo: 'Analista de RH', recrutador: 'Larissa Souza', area: 'Recursos Humanos', candidatos: 76, contratados: 2, status: 'Em andamento', dataCriacao: '28/08/2026', dataIso: '2026-08-28', tipo: 'CLT', localizacao: 'Sorocaba, SP' },
        { id: 4, cargo: 'Suporte Técnico', recrutador: 'Carlos Mendes', area: 'Suporte', candidatos: 184, contratados: 3, status: 'Em andamento', dataCriacao: '20/08/2026', dataIso: '2026-08-20', tipo: 'CLT', localizacao: 'Sorocaba, SP' },
        { id: 5, cargo: 'UI/UX Designer', recrutador: 'Fernanda Lima', area: 'Design', candidatos: 63, contratados: 1, status: 'Concluída', dataCriacao: '15/08/2026', dataIso: '2026-08-15', tipo: 'PJ', localizacao: 'Remoto' },
        { id: 6, cargo: 'Vendedor Externo', recrutador: 'Pedro Almeida', area: 'Vendas', candidatos: 112, contratados: 4, status: 'Em andamento', dataCriacao: '10/08/2026', dataIso: '2026-08-10', tipo: 'CLT', localizacao: 'Sorocaba, SP' },
        { id: 7, cargo: 'Analista de Marketing', recrutador: 'Camila Rocha', area: 'Marketing', candidatos: 89, contratados: 1, status: 'Em andamento', dataCriacao: '02/08/2026', dataIso: '2026-08-02', tipo: 'PJ', localizacao: 'Remoto' },
        { id: 8, cargo: 'Estágio Administrativo', recrutador: 'Thiago Ferreira', area: 'Administrativo', candidatos: 230, contratados: 5, status: 'Pausada', dataCriacao: '25/07/2026', dataIso: '2026-07-25', tipo: 'Estágio', localizacao: 'Sorocaba, SP' },
        { id: 9, cargo: 'Analista Financeiro', recrutador: 'Aline Pereira', area: 'Financeiro', candidatos: 54, contratados: 1, status: 'Em andamento', dataCriacao: '18/07/2026', dataIso: '2026-07-18', tipo: 'CLT', localizacao: 'São Paulo, SP' },
        { id: 10, cargo: 'Assistente Comercial', recrutador: 'Gabriel Silva', area: 'Comercial', candidatos: 147, contratados: 2, status: 'Cancelada', dataCriacao: '10/07/2026', dataIso: '2026-07-10', tipo: 'Temporário', localizacao: 'Sorocaba, SP' }
    ];

    const paginacaoEl = document.createElement('div');
    paginacaoEl.className = 'paginacao-tabela-relatorio';
    paginacaoEl.innerHTML = `
        <button type="button" class="btn-pag-relatorio" disabled>&lt;</button>
        <button type="button" class="btn-pag-relatorio ativa">1</button>
        <span class="texto-pag-relatorio">de 3</span>
        <button type="button" class="btn-pag-relatorio">2</button>
        <button type="button" class="btn-pag-relatorio">&gt;</button>
    `;

    const tabela = criarTabela(
        [
            {
                chave: 'cargo',
                titulo: 'Cargo',
                render: (valor) => {
                    const strong = document.createElement('strong');
                    strong.className = 'texto-cargo-vaga';
                    strong.textContent = valor;
                    return strong;
                }
            },
            { chave: 'recrutador', titulo: 'Recrutador' },
            { chave: 'area', titulo: 'Área' },
            { chave: 'candidatos', titulo: 'Candidatos', alinhamento: 'centro' },
            { chave: 'contratados', titulo: 'Contratados', alinhamento: 'centro' },
            {
                chave: 'status',
                titulo: 'Status',
                alinhamento: 'centro',
                render: (valor) => {
                    const mapaClasse = {
                        'Em andamento': 'andamento',
                        'Concluída': 'concluida',
                        'Pausada': 'pausada',
                        'Cancelada': 'cancelada'
                    };
                    const badge = document.createElement('span');
                    badge.className = `badge-status-vaga ${mapaClasse[valor] || 'andamento'}`;
                    badge.textContent = valor;
                    return badge;
                }
            },
            { chave: 'dataCriacao', titulo: 'Data de criação', alinhamento: 'centro' },
            {
                chave: 'id',
                titulo: 'Ações',
                alinhamento: 'centro',
                render: (_, item) => criarBotaoMenu(() => {
                    console.log('Ações da vaga:', item.cargo);
                })
            }
        ],
        dadosVagas,
        {
            container: 'container-tabela-vagas',
            variante: 'limpa',
            acoes: false,
            rodape: {
                esquerda: `Total de registros: ${dadosVagas.length}`,
                direita: paginacaoEl
            }
        }
    );

    const contadorEl = document.getElementById('contador-vagas');
    const formFiltro = document.getElementById('form-filtro-vagas');
    const buscaRapidaInput = document.getElementById('busca-rapida-vaga');

    function aplicarFiltros() {
        const dataInicio = document.getElementById('filtro-vaga-data-inicio').value;
        const dataFim = document.getElementById('filtro-vaga-data-fim').value;
        const status = document.getElementById('filtro-status-vaga').value;
        const area = document.getElementById('filtro-area-vaga').value;
        const recrutador = document.getElementById('filtro-recrutador-vaga').value;
        const tipo = document.getElementById('filtro-tipo-vaga').value;
        const localizacao = document.getElementById('filtro-localizacao-vaga').value;
        const palavraChave = document.getElementById('filtro-palavra-chave-vaga').value.trim().toLowerCase();
        const buscaRapida = buscaRapidaInput.value.trim().toLowerCase();

        const filtrados = dadosVagas.filter((item) => {
            if (status && item.status !== status) return false;
            if (area && item.area !== area) return false;
            if (recrutador && item.recrutador !== recrutador) return false;
            if (tipo && item.tipo !== tipo) return false;
            if (localizacao && item.localizacao !== localizacao) return false;
            if (dataInicio && item.dataIso < dataInicio) return false;
            if (dataFim && item.dataIso > dataFim) return false;
            if (
                palavraChave &&
                !item.cargo.toLowerCase().includes(palavraChave) &&
                !item.area.toLowerCase().includes(palavraChave)
            ) {
                return false;
            }
            if (
                buscaRapida &&
                !item.cargo.toLowerCase().includes(buscaRapida) &&
                !item.recrutador.toLowerCase().includes(buscaRapida) &&
                !item.area.toLowerCase().includes(buscaRapida)
            ) {
                return false;
            }
            return true;
        });

        contadorEl.textContent = `(${filtrados.length} vagas encontradas)`;
        tabela.atualizar(filtrados);
    }

    formFiltro.addEventListener('submit', (e) => {
        e.preventDefault();
        aplicarFiltros();
    });

    document.getElementById('btn-limpar-filtros-vagas').addEventListener('click', () => {
        formFiltro.reset();
        buscaRapidaInput.value = '';
        aplicarFiltros();
    });

    buscaRapidaInput.addEventListener('input', aplicarFiltros);

    return wrapper;
}