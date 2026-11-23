import { criarSidebar } from '../components/sidebar.js';
import { criarTabela, criarBotaoMenu } from '../components/table.js';

export function renderRelatorioRecrutadores() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'pagina-relatorio-recrutadores-wrapper';

    wrapper.appendChild(criarSidebar('Empresa', 'Twelse LTDA'));

    const main = document.createElement('main');
    main.className = 'conteudo-principal';

    main.innerHTML = `
        <header class="cabecalho-pagina-padrao">
            <h1 class="titulo-pagina">Relatórios de Recrutadores</h1>
            <p class="subtitulo-pagina">Acompanhe o desempenho da sua equipe de recrutamento</p>
        </header>

        <div class="layout-relatorio-recrutadores-grid">
            <!-- Coluna Esquerda: Filtros do relatório -->
            <aside class="card-filtro-relatorio">
                <div class="filtro-cabecalho">
                    <div class="filtro-topo-linha">
                        <h2>Filtros do relatório</h2>
                        <button type="button" class="btn-limpar-tudo-topo" id="btn-limpar-filtros-recrutadores">Limpar tudo</button>
                    </div>
                
                </div>

                <form id="form-filtro-recrutadores" class="form-filtro-relatorio">
                    <div class="campo-filtro">
                        <label>Período de seleção</label>
                        <div class="linha-datas-filtro">
                            <input type="date" id="filtro-data-inicio" class="input-filtro" />
                            <span>até</span>
                            <input type="date" id="filtro-data-fim" class="input-filtro" />
                        </div>
                    </div>

                    <div class="campo-filtro">
                        <label for="filtro-status-recrutador">Status do recrutador</label>
                        <select id="filtro-status-recrutador" class="select-filtro-relatorio">
                            <option value="">Todos</option>
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                        </select>
                    </div>

                    <div class="campo-filtro">
                        <label for="filtro-area-recrutador">Área</label>
                        <select id="filtro-area-recrutador" class="select-filtro-relatorio">
                            <option value="">Todas</option>
                            <option value="Tecnologia">Tecnologia</option>
                            <option value="Produto">Produto</option>
                            <option value="Comercial">Comercial</option>
                        </select>
                    </div>

                    <div class="campo-filtro">
                        <label for="filtro-localizacao-recrutador">Localização</label>
                        <select id="filtro-localizacao-recrutador" class="select-filtro-relatorio">
                            <option value="">Todas</option>
                            <option value="Sorocaba, SP">Sorocaba, SP</option>
                            <option value="São Paulo, SP">São Paulo, SP</option>
                            <option value="Remoto">Remoto</option>
                        </select>
                    </div>

                    <div class="campo-filtro">
                        <label for="filtro-nome-recrutador">Buscar por nome</label>
                        <input
                            type="text"
                            id="filtro-nome-recrutador"
                            class="input-filtro"
                            placeholder="Nome do recrutador..."
                        />
                    </div>

                    <button type="submit" class="btn-aplicar-filtro">Aplicar filtros</button>
                </form>
            </aside>

            <!-- Coluna Direita: Resultados do relatório (criarTabela) -->
            <section class="coluna-resultados-relatorio">
                <div class="barra-topo-resultados">
                    <div class="info-resultados-titulo">
                        <h2>Resultados do relatório</h2>
                        <span id="contador-recrutadores">(8 recrutadores encontrados)</span>
                    </div>
                    <input
                        type="search"
                        id="busca-rapida-recrutador"
                        class="input-busca-tabela"
                        placeholder="Buscar recrutador..."
                    />
                </div>

                <div id="container-tabela-recrutadores"></div>
            </section>
        </div>
    `;

    wrapper.appendChild(main);
    app.appendChild(wrapper);

    const dadosRecrutadores = [
        { id: 1, nome: 'Amanda Ferreira', email: 'amanda.ferreira@empresa.com', vagasCriadas: 8, candidatos: 245, emAndamento: 18, contratados: 12, taxaConversao: '4.9%', status: 'Ativo', ultimaAtividade: 'Há 2 horas', area: 'Tecnologia', localizacao: 'Sorocaba, SP', data: '2026-09-10' },
        { id: 2, nome: 'Rafael Costa', email: 'rafael.costa@empresa.com', vagasCriadas: 6, candidatos: 182, emAndamento: 14, contratados: 8, taxaConversao: '4.4%', status: 'Ativo', ultimaAtividade: 'Há 5 horas', area: 'Produto', localizacao: 'São Paulo, SP', data: '2026-09-08' },
        { id: 3, nome: 'Larissa Souza', email: 'larissa.souza@empresa.com', vagasCriadas: 5, candidatos: 164, emAndamento: 11, contratados: 9, taxaConversao: '5.5%', status: 'Ativo', ultimaAtividade: 'Ontem', area: 'Comercial', localizacao: 'Remoto', data: '2026-09-05' },
        { id: 4, nome: 'Diego Almeida', email: 'diego.almeida@empresa.com', vagasCriadas: 9, candidatos: 312, emAndamento: 22, contratados: 15, taxaConversao: '4.8%', status: 'Ativo', ultimaAtividade: 'Há 1 hora', area: 'Tecnologia', localizacao: 'Sorocaba, SP', data: '2026-09-12' },
        { id: 5, nome: 'Fernanda Lima', email: 'fernanda.lima@empresa.com', vagasCriadas: 4, candidatos: 128, emAndamento: 9, contratados: 5, taxaConversao: '3.9%', status: 'Ativo', ultimaAtividade: 'Há 2 dias', area: 'Produto', localizacao: 'São Paulo, SP', data: '2026-08-29' },
        { id: 6, nome: 'Bruno Mendes', email: 'bruno.mendes@empresa.com', vagasCriadas: 7, candidatos: 219, emAndamento: 16, contratados: 10, taxaConversao: '4.6%', status: 'Ativo', ultimaAtividade: 'Há 3 horas', area: 'Comercial', localizacao: 'Sorocaba, SP', data: '2026-09-02' },
        { id: 7, nome: 'Camila Rocha', email: 'camila.rocha@empresa.com', vagasCriadas: 5, candidatos: 150, emAndamento: 7, contratados: 6, taxaConversao: '4.0%', status: 'Ativo', ultimaAtividade: 'Há 4 dias', area: 'Tecnologia', localizacao: 'Remoto', data: '2026-08-25' },
        { id: 8, nome: 'Thiago Vieira', email: 'thiago.vieira@empresa.com', vagasCriadas: 3, candidatos: 94, emAndamento: 0, contratados: 2, taxaConversao: '2.1%', status: 'Inativo', ultimaAtividade: 'Há 14 dias', area: 'Comercial', localizacao: 'São Paulo, SP', data: '2026-08-10' }
    ];

    const paginacaoEl = document.createElement('div');
    paginacaoEl.className = 'paginacao-tabela-relatorio';
    paginacaoEl.innerHTML = `
        <button type="button" class="btn-pag-relatorio" disabled>&lt;</button>
        <button type="button" class="btn-pag-relatorio ativa">1</button>
        <button type="button" class="btn-pag-relatorio" disabled>&gt;</button>
    `;

    const tabela = criarTabela(
        [
            {
                chave: 'nome',
                titulo: 'Recrutador',
                render: (valor, item) => {
                    const box = document.createElement('div');
                    box.className = 'celula-recrutador';

                    const strong = document.createElement('strong');
                    strong.textContent = valor;

                    const span = document.createElement('span');
                    span.textContent = item.email;

                    box.append(strong, span);
                    return box;
                }
            },
            { chave: 'vagasCriadas', titulo: 'Vagas criadas', alinhamento: 'centro' },
            { chave: 'candidatos', titulo: 'Candidatos', alinhamento: 'centro' },
            { chave: 'emAndamento', titulo: 'Em andamento', alinhamento: 'centro' },
            { chave: 'contratados', titulo: 'Contratados', alinhamento: 'centro' },
            { chave: 'taxaConversao', titulo: 'Taxa de conversão', alinhamento: 'centro' },
            {
                chave: 'status',
                titulo: 'Status',
                alinhamento: 'centro',
                render: (valor) => {
                    const badge = document.createElement('span');
                    badge.className = `badge-status-recrutador ${valor === 'Ativo' ? 'ativo' : 'inativo'}`;
                    badge.textContent = valor;
                    return badge;
                }
            },
            { chave: 'ultimaAtividade', titulo: 'Última atividade' },
            {
                chave: 'id',
                titulo: 'Ações',
                alinhamento: 'centro',
                render: (_, item) => criarBotaoMenu(() => {
                    console.log('Ações do recrutador:', item.nome);
                })
            }
        ],
        dadosRecrutadores,
        {
            container: 'container-tabela-recrutadores',
            variante: 'limpa',
            acoes: false,
            rodape: {
                esquerda: `Total de registros: ${dadosRecrutadores.length}`,
                direita: paginacaoEl
            }
        }
    );

    const contadorEl = document.getElementById('contador-recrutadores');
    const formFiltro = document.getElementById('form-filtro-recrutadores');
    const buscaRapidaInput = document.getElementById('busca-rapida-recrutador');

    function aplicarFiltros() {
        const dataInicio = document.getElementById('filtro-data-inicio').value;
        const dataFim = document.getElementById('filtro-data-fim').value;
        const status = document.getElementById('filtro-status-recrutador').value;
        const area = document.getElementById('filtro-area-recrutador').value;
        const localizacao = document.getElementById('filtro-localizacao-recrutador').value;
        const nomeFiltro = document.getElementById('filtro-nome-recrutador').value.trim().toLowerCase();
        const buscaRapida = buscaRapidaInput.value.trim().toLowerCase();

        const filtrados = dadosRecrutadores.filter((item) => {
            if (status && item.status !== status) return false;
            if (area && item.area !== area) return false;
            if (localizacao && item.localizacao !== localizacao) return false;
            if (dataInicio && item.data < dataInicio) return false;
            if (dataFim && item.data > dataFim) return false;
            if (nomeFiltro && !item.nome.toLowerCase().includes(nomeFiltro)) return false;
            if (buscaRapida && !item.nome.toLowerCase().includes(buscaRapida) && !item.email.toLowerCase().includes(buscaRapida)) {
                return false;
            }
            return true;
        });

        contadorEl.textContent = `(${filtrados.length} recrutadores encontrados)`;
        tabela.atualizar(filtrados);
    }


    formFiltro.addEventListener('submit', (e) => {
        e.preventDefault();
        aplicarFiltros();
    });

    document.getElementById('btn-limpar-filtros-recrutadores').addEventListener('click', () => {
        formFiltro.reset();
        buscaRapidaInput.value = '';
        aplicarFiltros();
    });

    buscaRapidaInput.addEventListener('input', aplicarFiltros);

    wrapper.appendChild(main);
    return wrapper;
}

