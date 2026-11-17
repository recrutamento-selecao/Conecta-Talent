import { criarTabela } from '../components/table.js';
import { criarSidebar } from '../components/sidebar.js';

export function renderGerenciarVagas() {
    const containerPagina = document.createElement('div');
    containerPagina.className = 'pagina-layout-dashboard';

    const sidebar = criarSidebar('empresa', 'Thaeny Soares');
    containerPagina.appendChild(sidebar);

    const conteudoPrincipal = document.createElement('main');
    conteudoPrincipal.className = 'conteudo-principal';

    const h1 = document.createElement('h1');
    h1.className = 'titulo-pagina';
    h1.textContent = 'Gerenciar vagas';
    conteudoPrincipal.appendChild(h1);

    const pSub = document.createElement('p');
    pSub.className = 'subtitulo-pagina';
    pSub.textContent = 'Visualize e gerencie todas as vagas da sua empresa.';
    conteudoPrincipal.appendChild(pSub);

    // Dados base de exemplo (KPIs e tabela)
    const dadosVagas = [
        { id: 1, codigo: '#VAG-0012', titulo: 'Analista de Dados Jr.', recrutador: 'Ana Souza', iniciais: 'AS', tipo: 'Efetivo', modalidade: 'Híbrido', candidatos: 28, status: 'Aguardando aprovação', dataCriacao: '22/09/2026 às 14:30', localizacao: 'Sorocaba - SP', faixaSalaria: 'R$ 3.000 - R$ 5.000' },
        { id: 2, codigo: '#VAG-0011', titulo: 'Desenvolvedor Front-end', recrutador: 'Carlos Lima', iniciais: 'CL', tipo: 'Efetivo', modalidade: 'Remoto', candidatos: 45, status: 'Ativa', dataCriacao: '20/09/2026 às 10:12', localizacao: 'São Paulo - SP', faixaSalaria: 'R$ 6.000 - R$ 8.000' },
        { id: 3, codigo: '#VAG-0010', titulo: 'Assistente Administrativo', recrutador: 'Mariana Alves', iniciais: 'MA', tipo: 'Efetivo', modalidade: 'Presencial', candidatos: 12, status: 'Ativa', dataCriacao: '18/09/2026 às 10:45', localizacao: 'Votorantim - SP', faixaSalaria: 'R$ 2.200 - R$ 2.800' },
        { id: 4, codigo: '#VAG-0009', titulo: 'Designer UX/UI', recrutador: 'João Pereira', iniciais: 'JP', tipo: 'Efetivo', modalidade: 'Remoto', candidatos: 0, status: 'Rascunho', dataCriacao: '15/09/2026 às 09:18', localizacao: 'Remoto', faixaSalaria: 'R$ 5.000 - R$ 7.000' },
        { id: 5, codigo: '#VAG-0008', titulo: 'Analista de RH', recrutador: 'Natália Rocha', iniciais: 'NR', tipo: 'Efetivo', modalidade: 'Híbrido', candidatos: 67, status: 'Encerrada', dataCriacao: '10/09/2026 às 11:20', localizacao: 'Itu - SP', faixaSalaria: 'R$ 4.000 - R$ 5.500' },
        { id: 6, codigo: '#VAG-0007', titulo: 'Estagiário de Marketing', recrutador: 'Lucas Mendes', iniciais: 'LM', tipo: 'Estágio', modalidade: 'Remoto', candidatos: 19, status: 'Ativa', dataCriacao: '08/09/2026 às 08:50', localizacao: 'Remoto', faixaSalaria: 'R$ 1.500' },
        { id: 7, codigo: '#VAG-0006', titulo: 'Analista de Suporte TI', recrutador: 'Fernanda Silva', iniciais: 'FS', tipo: 'Efetivo', modalidade: 'Presencial', candidatos: 23, status: 'Aguardando aprovação', dataCriacao: '01/09/2026 às 14:22', localizacao: 'Sorocaba - SP', faixaSalaria: 'R$ 3.500 - R$ 4.500' }
    ];

    // Cards de KPI no Topo
    const totalVagas = dadosVagas.length;
    const ativas = dadosVagas.filter(v => v.status === 'Ativa').length;
    const aguardando = dadosVagas.filter(v => v.status === 'Aguardando aprovação').length;
    const encerradas = dadosVagas.filter(v => v.status === 'Encerrada').length;
    const rascunhos = dadosVagas.filter(v => v.status === 'Rascunho').length;

    const containerKpis = document.createElement('div');
    containerKpis.className = 'container-kpis-vagas';
    containerKpis.innerHTML = `
        <div class="card-kpi"><span>Total de vagas</span><h3>${totalVagas}</h3></div>
        <div class="card-kpi"><span>Vagas ativas</span><h3>${ativas} <span class="indicador-ponto ponto-verde"></span></h3></div>
        <div class="card-kpi"><span>Aguardando aprovação</span><h3>${aguardando} <span class="indicador-ponto ponto-amarelo"></span></h3></div>
        <div class="card-kpi"><span>Encerradas</span><h3>${encerradas} <span class="indicador-ponto ponto-vermelho"></span></h3></div>
        <div class="card-kpi"><span>Rascunhos</span><h3>${rascunhos}</h3></div>
    `;
    conteudoPrincipal.appendChild(containerKpis);

    // Barra de Filtros
    const tiposUnicos = [...new Set(dadosVagas.map(v => v.tipo))];
    const modalidadesUnicas = [...new Set(dadosVagas.map(v => v.modalidade))];
    const statusUnicos = [...new Set(dadosVagas.map(v => v.status))];

    const barraFiltros = document.createElement('div');
    barraFiltros.className = 'barra-filtros-tabela';
    barraFiltros.innerHTML = `
        <div class="filtro-busca">
            <input type="text" placeholder="Buscar por título da vaga, recrutador ou código..." id="input-busca-vaga" />
        </div>
        <div class="filtro-selects">
            <select id="filtro-status">
                <option value="">Status: Todos</option>
                ${statusUnicos.map(st => `<option value="${st}">${st}</option>`).join('')}
            </select>
            <select id="filtro-tipo">
                <option value="">Tipo de vaga: Todos</option>
                ${tiposUnicos.map(tp => `<option value="${tp}">${tp}</option>`).join('')}
            </select>
            <select id="filtro-modalidade">
                <option value="">Modalidade: Todas</option>
                ${modalidadesUnicas.map(md => `<option value="${md}">${md}</option>`).join('')}
            </select>
        </div>
    `;
    conteudoPrincipal.appendChild(barraFiltros);

    // Layout Grid (Tabela + Painel Lateral)
    const layoutGrid = document.createElement('div');
    layoutGrid.className = 'layout-tabela-detalhes';

    const containerTabelaWrapper = document.createElement('div');
    containerTabelaWrapper.className = 'container-tabela-principal';
    
    const containerDetalhes = document.createElement('div');
    containerDetalhes.className = 'painel-detalhes-lateral';
    containerDetalhes.style.display = 'none';

    layoutGrid.appendChild(containerTabelaWrapper);
    layoutGrid.appendChild(containerDetalhes);
    conteudoPrincipal.appendChild(layoutGrid);
    containerPagina.appendChild(conteudoPrincipal);

    // Definição das Colunas da Tabela
    const colunas = [
        {
            chave: 'titulo',
            titulo: 'Título da vaga',
            ordenavel: true,
            render: (valor, item) => {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = `<strong>${valor}</strong><br/><small style="color: #64748b; font-family: monospace;">${item.codigo}</small>`;
                return wrapper;
            }
        },
        {
            chave: 'recrutador',
            titulo: 'Recrutador responsável',
            render: (valor, item) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'celula-perfil-tabela';
                wrapper.innerHTML = `
                    <div class="avatar-iniciais">${item.iniciais}</div>
                    <span>${valor}</span>
                `;
                return wrapper;
            }
        },
        { chave: 'tipo', titulo: 'Tipo' },
        { chave: 'modalidade', titulo: 'Modalidade' },
        { chave: 'candidatos', titulo: 'Candidatos', alinhamento: 'centro' },
        {
            chave: 'status',
            titulo: 'Status',
            alinhamento: 'centro',
            render: (valor) => {
                const badge = document.createElement('span');
                const classe = valor === 'Ativa' ? 'badge-ativo' : (valor === 'Aguardando aprovação' ? 'badge-pendente' : 'badge-inativo');
                badge.className = `badge-status ${classe}`;
                badge.textContent = valor;
                return badge;
            }
        },
        { chave: 'dataCriacao', titulo: 'Data de criação' }
    ];

    // Painel Lateral de Detalhes da Vaga
    function mostrarDetalhesVaga(item) {
        containerDetalhes.style.display = 'block';
        containerDetalhes.innerHTML = `
            <div class="cabecalho-detalhes-vaga">
                <div class="titulo-vaga-painel">
                    <h3>${item.titulo}</h3>
                    <span class="codigo-vaga-painel">${item.codigo}</span>
                </div>
                <button type="button" class="btn-fechar-painel" id="fechar-painel">✕</button>
            </div>
            
            <div style="margin-bottom: 16px;">
                <span class="badge-status badge-pendente">${item.status}</span>
            </div>

            <div class="abas-detalhes">
                <button class="aba-btn ativo">Informações</button>
                <button class="aba-btn">Descrição</button>
                <button class="aba-btn">Requisitos</button>
                <button class="aba-btn">Etapas</button>
            </div>

            <div class="lista-infos-detalhes">
                <div class="item-info"><span class="rotulo-info">Tipo de contratação</span><span class="valor-info">${item.tipo}</span></div>
                <div class="item-info"><span class="rotulo-info">Modalidade</span><span class="valor-info">${item.modalidade}</span></div>
                <div class="item-info"><span class="rotulo-info">Localização</span><span class="valor-info">${item.localizacao}</span></div>
                <div class="item-info"><span class="rotulo-info">Faixa salarial</span><span class="valor-info">${item.faixaSalaria}</span></div>
                <div class="item-info"><span class="rotulo-info">Data de criação</span><span class="valor-info">${item.dataCriacao}</span></div>
            </div>

            <div class="secao-recrutador-responsavel">
                <h5>Recrutador responsável</h5>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="avatar-iniciais">${item.iniciais}</div>
                    <div>
                        <strong>${item.recrutador}</strong><br/>
                        <span style="font-size: 12px; color: #64748b;">Recrutador(a)</span>
                    </div>
                </div>
            </div>

            <div class="rodape-acoes-aprovacao">
                <button type="button" class="btn-aprovar">✓ Aprovar e publicar</button>
                <button type="button" class="btn-solicitar">Solicitar alterações</button>
                <button type="button" class="btn-reprovar">✕ Reprovar</button>
            </div>
        `;

        containerDetalhes.querySelector('#fechar-painel').addEventListener('click', () => {
            containerDetalhes.style.display = 'none';
        });
    }

    let dadosAtuais = [...dadosVagas];

    let instanciaTabela = criarTabela(colunas, dadosAtuais, {
        container: containerTabelaWrapper,
        selecionavel: true,
        zebra: false,
        rodape: {
            esquerda: `Mostrando 1 a ${dadosAtuais.length} de ${dadosVagas.length} vagas`,
            direita: `
                <div class="paginacao-container">
                    <button class="pag-btn">‹</button>
                    <button class="pag-btn ativo">1</button>
                    <button class="pag-btn">›</button>
                    <span class="texto-itens-pagina">Itens por página</span>
                    <select class="select-itens-pagina"><option>8</option><option>15</option></select>
                </div>
            `
        },
        aoEditar: (item) => mostrarDetalhesVaga(item),
        aoExcluir: (item) => {
            if(confirm(`Deseja realmente excluir a vaga ${item.titulo}?`)) {
                alert('Vaga excluída com sucesso.');
            }
        }
    });

    // Lógica de Filtros Reativos
    function aplicarFiltros() {
        const termoBusca = document.getElementById('input-busca-vaga').value.toLowerCase().trim();
        const statusSel = document.getElementById('filtro-status').value;
        const tipoSel = document.getElementById('filtro-tipo').value;
        const modalidadeSel = document.getElementById('filtro-modalidade').value;

        dadosAtuais = dadosVagas.filter(item => {
            const matchBusca = !termoBusca || 
                               item.titulo.toLowerCase().includes(termoBusca) ||
                               item.recrutador.toLowerCase().includes(termoBusca) ||
                               item.codigo.toLowerCase().includes(termoBusca);
            
            const matchStatus = !statusSel || item.status === statusSel;
            const matchTipo = !tipoSel || item.tipo === tipoSel;
            const matchModalidade = !modalidadeSel || item.modalidade === modalidadeSel;

            return matchBusca && matchStatus && matchTipo && matchModalidade;
        });

        instanciaTabela.atualizar(dadosAtuais);
    }

    setTimeout(() => {
        document.getElementById('input-busca-vaga').addEventListener('input', aplicarFiltros);
        document.getElementById('filtro-status').addEventListener('change', aplicarFiltros);
        document.getElementById('filtro-tipo').addEventListener('change', aplicarFiltros);
        document.getElementById('filtro-modalidade').addEventListener('change', aplicarFiltros);
    }, 50);

    containerTabelaWrapper.addEventListener('click', (e) => {
        const linha = e.target.closest('tr');
        if (linha && !e.target.closest('button') && !e.target.closest('input')) {
            const indexTR = Array.from(linha.parentNode.children).indexOf(linha);
            if (indexTR >= 0 && dadosAtuais[indexTR]) {
                mostrarDetalhesVaga(dadosAtuais[indexTR]);
            }
        }
    });

    return containerPagina;
}