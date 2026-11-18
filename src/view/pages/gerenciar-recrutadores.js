import { criarTabela } from '../components/table.js';
import { criarSidebar } from '../components/sidebar.js';

export function renderGerenciarRecrutadores() {
    const containerPagina = document.createElement('div');
    containerPagina.className = 'pagina-layout-dashboard';

    const sidebar = criarSidebar('empresa', 'Thaeny Soares');
    containerPagina.appendChild(sidebar);

    const conteudoPrincipal = document.createElement('main');
    conteudoPrincipal.className = 'conteudo-principal';

    const cabecalhoSecao = document.createElement('div');
    cabecalhoSecao.className = 'cabecalho-secao-acao';

    const blocoTitulos = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.className = 'titulo-pagina';
    h1.textContent = 'Gerenciar Recrutadores';
    
    const pSub = document.createElement('p');
    pSub.className = 'subtitulo-pagina';
    pSub.textContent = 'Visualize, cadastre e gerencie os recrutadores das empresas.';
    
    blocoTitulos.appendChild(h1);
    blocoTitulos.appendChild(pSub);

    const btnNovo = document.createElement('button');
    btnNovo.type = 'button';
    btnNovo.className = 'btn-primario';
    btnNovo.innerHTML = `+ Novo recrutador`;
    btnNovo.addEventListener('click', () => {
        // Redireciona para a rota de cadastro de recrutador
        window.location.hash = '#cadastrar-recrutador';
    });

    cabecalhoSecao.appendChild(blocoTitulos);
    cabecalhoSecao.appendChild(btnNovo);
    conteudoPrincipal.appendChild(cabecalhoSecao);

    // Dados base completos com permissões mockadas para cada recrutador
    const dadosRecrutadores = [
        { 
            id: 1, 
            nome: 'Ana Souza', 
            iniciais: 'AS', 
            cargo: 'Recrutador(a)', 
            email: 'ana.souza@bluecore.com', 
            empresa: 'BlueCore Sistemas', 
            status: 'Ativo', 
            ultimoAcesso: '22/09/2026 às 14:30', 
            telefone: '(15) 99876-5432', 
            dataCadastro: '10/03/2026',
            permissoes: { gerenciar_vagas: true, gerenciar_candidatos: true, processos_seletivos: true, agenda: true, relatorios: false, banco_talentos: false }
        },
        { 
            id: 2, 
            nome: 'Carlos Mendes', 
            iniciais: 'CM', 
            cargo: 'Recrutador(a)', 
            email: 'carlos.mendes@vagaspro.com', 
            empresa: 'VagasPro', 
            status: 'Ativo', 
            ultimoAcesso: '21/08/2026 às 10:15', 
            telefone: '(15) 98812-3344', 
            dataCadastro: '12/04/2026',
            permissoes: { gerenciar_vagas: true, gerenciar_candidatos: true, processos_seletivos: false, agenda: true, relatorios: true, banco_talentos: true }
        },
        { 
            id: 3, 
            nome: 'Juliana Lima', 
            iniciais: 'JL', 
            cargo: 'Recrutador(a)', 
            email: 'juliana.lima@techsol.com', 
            empresa: 'TechSol', 
            status: 'Ativo', 
            ultimoAcesso: '20/09/2026 às 16:42', 
            telefone: '(11) 97766-1122', 
            dataCadastro: '05/01/2026',
            permissoes: { gerenciar_vagas: true, gerenciar_candidatos: true, processos_seletivos: true, agenda: true, relatorios: true, banco_talentos: true }
        },
        { 
            id: 4, 
            nome: 'Rafael Costa', 
            iniciais: 'RC', 
            cargo: 'Recrutador(a)', 
            email: 'rafael.costa@innovare.com', 
            empresa: 'Innovare', 
            status: 'Pendente', 
            ultimoAcesso: '—', 
            telefone: '(11) 96655-4433', 
            dataCadastro: '15/05/2026',
            permissoes: { gerenciar_vagas: true, gerenciar_candidatos: false, processos_seletivos: false, agenda: false, relatorios: false, banco_talentos: false }
        },
        { 
            id: 5, 
            nome: 'Mariana Alves', 
            iniciais: 'MA', 
            cargo: 'Recrutador(a)', 
            email: 'mariana.alves@nextdigital.com', 
            empresa: 'NextDigital', 
            status: 'Ativo', 
            ultimoAcesso: '19/09/2026 às 11:20', 
            telefone: '(19) 95544-3322', 
            dataCadastro: '20/02/2026',
            permissoes: { gerenciar_vagas: true, gerenciar_candidatos: true, processos_seletivos: true, agenda: false, relatorios: false, banco_talentos: true }
        },
        { 
            id: 6, 
            nome: 'Bruno Ferreira', 
            iniciais: 'BF', 
            cargo: 'Recrutador(a)', 
            email: 'bruno.ferreira@dataon.com', 
            empresa: 'DataOn', 
            status: 'Inativo', 
            ultimoAcesso: '15/09/2026 às 09:10', 
            telefone: '(12) 94433-2211', 
            dataCadastro: '01/02/2026',
            permissoes: { gerenciar_vagas: false, gerenciar_candidatos: false, processos_seletivos: false, agenda: false, relatorios: false, banco_talentos: false }
        },
        { 
            id: 7, 
            nome: 'Camila Rocha', 
            iniciais: 'CR', 
            cargo: 'Recrutador(a)', 
            email: 'camila.rocha@horizonte.com', 
            empresa: 'Horizonte', 
            status: 'Ativo', 
            ultimoAcesso: '18/09/2026 às 13:55', 
            telefone: '(18) 93322-1100', 
            dataCadastro: '18/03/2026',
            permissoes: { gerenciar_vagas: true, gerenciar_candidatos: true, processos_seletivos: true, agenda: true, relatorios: true, banco_talentos: false }
        },
        { 
            id: 8, 
            nome: 'Lucas Martins', 
            iniciais: 'LM', 
            cargo: 'Recrutador(a)', 
            email: 'lucas.martins@talenthub.com', 
            empresa: 'TalentHub', 
            status: 'Ativo', 
            ultimoAcesso: '17/09/2026 às 08:30', 
            telefone: '(16) 92211-0099', 
            dataCadastro: '25/03/2026',
            permissoes: { gerenciar_vagas: true, gerenciar_candidatos: true, processos_seletivos: false, agenda: true, relatorios: false, banco_talentos: true }
        }
    ];

    // Extrair opções únicas para os filtros dinamicamente
    const empresasUnicas = [...new Set(dadosRecrutadores.map(item => item.empresa))];
    const statusUnicos = [...new Set(dadosRecrutadores.map(item => item.status))];
    const cargosUnicos = [...new Set(dadosRecrutadores.map(item => item.cargo))];

    // Barra de Filtros Interativa
    const barraFiltros = document.createElement('div');
    barraFiltros.className = 'barra-filtros-tabela';
    barraFiltros.innerHTML = `
        <div class="filtro-busca">
            <input type="text" placeholder="Buscar por nome, e-mail ou empresa..." id="input-busca-recrutador" />
        </div>
        <div class="filtro-selects">
            <select id="filtro-empresa">
                <option value="">Empresa: Todas</option>
                ${empresasUnicas.map(emp => `<option value="${emp}">${emp}</option>`).join('')}
            </select>
            <select id="filtro-status">
                <option value="">Status: Todos</option>
                ${statusUnicos.map(st => `<option value="${st}">${st}</option>`).join('')}
            </select>
            <select id="filtro-cargo">
                <option value="">Cargo: Todos</option>
                ${cargosUnicos.map(cg => `<option value="${cg}">${cg}</option>`).join('')}
            </select>
        </div>
    `;
    conteudoPrincipal.appendChild(barraFiltros);

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

    const colunas = [
        {
            chave: 'nome',
            titulo: 'Nome',
            ordenavel: true,
            render: (valor, item) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'celula-perfil-tabela';
                wrapper.innerHTML = `
                    <div class="avatar-iniciais">${item.iniciais}</div>
                    <div class="info-texto-tabela">
                        <strong>${valor}</strong>
                        <span>${item.cargo}</span>
                    </div>
                `;
                return wrapper;
            }
        },
        { chave: 'email', titulo: 'E-mail', ordenavel: true },
        { chave: 'cargo', titulo: 'Cargo' },
        {
            chave: 'status',
            titulo: 'Status',
            alinhamento: 'centro',
            render: (valor) => {
                const badge = document.createElement('span');
                const classeStatus = valor.toLowerCase() === 'ativo' ? 'badge-ativo' : (valor.toLowerCase() === 'pendente' ? 'badge-pendente' : 'badge-inativo');
                badge.className = `badge-status ${classeStatus}`;
                badge.textContent = valor;
                return badge;
            }
        },
        { chave: 'ultimoAcesso', titulo: 'Último acesso' }
    ];

    function mostrarDetalhesRecrutador(item) {
        containerDetalhes.style.display = 'block';

        const permissoesRecrutador = item.permissoes || {
            gerenciar_vagas: false,
            gerenciar_candidatos: false,
            processos_seletivos: false,
            agenda: false,
            relatorios: false,
            banco_talentos: false
        };

        function renderizarConteudoPainel(abaAtiva) {
            const corpoDetalhes = containerDetalhes.querySelector('.corpo-detalhes-dinamico');
            const btnInfo = containerDetalhes.querySelector('#aba-info');
            const btnPerm = containerDetalhes.querySelector('#aba-permissoes');
            
            if (abaAtiva === 'info') {
                btnInfo.classList.add('ativo');
                btnPerm.classList.remove('ativo');
                
                corpoDetalhes.innerHTML = `
                    <div class="lista-infos-detalhes">
                        <div class="item-info"><span class="rotulo-info">E-mail</span><span class="valor-info">${item.email}</span></div>
                        <div class="item-info"><span class="rotulo-info">Telefone</span><span class="valor-info">${item.telefone}</span></div>
                        <div class="item-info"><span class="rotulo-info">Cargo</span><span class="valor-info">${item.cargo}</span></div>
                        <div class="item-info"><span class="rotulo-info">Empresa</span><span class="valor-info">${item.empresa}</span></div>
                        <div class="item-info"><span class="rotulo-info">Data de cadastro</span><span class="valor-info">${item.dataCadastro}</span></div>
                        <div class="item-info"><span class="rotulo-info">Último acesso</span><span class="valor-info">${item.ultimoAcesso}</span></div>
                    </div>
                `;
            } else {
                btnPerm.classList.add('ativo');
                btnInfo.classList.remove('ativo');

                const listaOpcoesPermissao = [
                    { chave: 'gerenciar_vagas', titulo: 'Gerenciar vagas', desc: 'Criar, editar e encerrar vagas.' },
                    { chave: 'gerenciar_candidatos', titulo: 'Gerenciar candidatos', desc: 'Visualizar e acompanhar candidatos.' },
                    { chave: 'processos_seletivos', titulo: 'Processos seletivos', desc: 'Movimentar candidatos entre etapas.' },
                    { chave: 'agenda', titulo: 'Agenda', desc: 'Criar e gerenciar entrevistas.' },
                    { chave: 'relatorios', titulo: 'Relatórios', desc: 'Visualizar relatórios de recrutamento.' },
                    { chave: 'banco_talentos', titulo: 'Banco de talentos', desc: 'Acessar o banco de talentos da empresa.' }
                ];

                const htmlPermissoes = listaOpcoesPermissao.map(p => {
                    const ativo = permissoesRecrutador[p.chave];
                    return `
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border: 1px solid ${ativo ? '#e2e8f0' : '#f1f5f9'}; background-color: ${ativo ? '#ffffff' : '#f8fafc'}; border-radius: 8px; margin-bottom: 6px; text-align: left; width: 100%; box-sizing: border-box; opacity: ${ativo ? '1' : '0.6'};">
                            <div style="display: flex; flex-direction: column; gap: 2px;">
                                <strong style="font-size: 13px; color: #0f172a; font-weight: 500;">${p.titulo}</strong>
                                <span style="font-size: 11px; color: #64748b;">${p.desc}</span>
                            </div>
                            <span style="font-size: 12px; font-weight: 600; padding: 3px 8px; border-radius: 4px; background-color: ${ativo ? '#dcfce7' : '#fee2e2'}; color: ${ativo ? '#166534' : '#991b1b'};">
                                ${ativo ? 'Liberado' : 'Restrito'}
                            </span>
                        </div>
                    `;
                }).join('');

                corpoDetalhes.innerHTML = `
                    <div style="width: 100%; display: flex; flex-direction: column; text-align: left;">
                        <span style="font-size: 12px; color: #64748b; margin-bottom: 10px; display: block;">Módulos com acesso liberado para este recrutador:</span>
                        <div style="display: flex; flex-direction: column; gap: 2px;">
                            ${htmlPermissoes}
                        </div>
                    </div>
                `;
            }
        }

        containerDetalhes.innerHTML = `
            <div class="cabecalho-detalhes">
                <h3>Detalhes do recrutador</h3>
                <button type="button" class="btn-fechar-painel" id="fechar-painel">✕</button>
            </div>
            <div class="corpo-detalhes">
                <div class="avatar-grande">${item.iniciais}</div>
                <h4 class="nome-destaque">${item.nome}</h4>
                <p class="sub-destaque">${item.cargo} na ${item.empresa}</p>
                <div class="status-centralizado"><span class="badge-status badge-ativo">${item.status}</span></div>

                <div class="abas-detalhes">
                    <button class="aba-btn ativo" id="aba-info">Informações</button>
                    <button class="aba-btn" id="aba-permissoes">Permissões</button>
                </div>

                <div class="corpo-detalhes-dinamico" style="width: 100%;"></div>

                <div class="rodape-acoes-detalhes" style="margin-top: 20px;">
                    <button type="button" class="btn-secundario" id="btn-editar-detalhes">Editar</button>
                    <button type="button" class="btn-perigo" id="btn-excluir-detalhes">Excluir</button>
                </div>
            </div>
        `;

        // Renderizar Informações por padrão
        renderizarConteudoPainel('info');

        containerDetalhes.querySelector('#aba-info').addEventListener('click', () => renderizarConteudoPainel('info'));
        containerDetalhes.querySelector('#aba-permissoes').addEventListener('click', () => renderizarConteudoPainel('permissao'));

        containerDetalhes.querySelector('#fechar-painel').addEventListener('click', () => {
            containerDetalhes.style.display = 'none';
        });

        containerDetalhes.querySelector('#btn-editar-detalhes').addEventListener('click', () => {
            alert(`Editar recrutador: ${item.nome}`);
        });

        containerDetalhes.querySelector('#btn-excluir-detalhes').addEventListener('click', () => {
            alert(`Excluir recrutador: ${item.nome}`);
        });
    }

    let dadosAtuais = [...dadosRecrutadores];

    let instanciaTabela = criarTabela(colunas, dadosAtuais, {
        container: containerTabelaWrapper,
        selecionavel: true,
        zebra: false,
        rodape: {
            esquerda: `Mostrando 1 a ${dadosAtuais.length} de ${dadosRecrutadores.length} recrutadores`,
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
        aoEditar: (item) => mostrarDetalhesRecrutador(item),
        aoExcluir: (item) => {
            if(confirm(`Deseja realmente excluir ${item.nome}?`)) {
                alert('Recrutador excluído com sucesso.');
            }
        }
    });

    // Função de Filtragem
    function aplicarFiltros() {
        const inputBusca = document.getElementById('input-busca-recrutador');
        const selectEmpresa = document.getElementById('filtro-empresa');
        const selectStatus = document.getElementById('filtro-status');
        const selectCargo = document.getElementById('filtro-cargo');

        const termoBusca = inputBusca ? inputBusca.value.toLowerCase().trim() : '';
        const empresaSelecionada = selectEmpresa ? selectEmpresa.value : '';
        const statusSelecionado = selectStatus ? selectStatus.value : '';
        const cargoSelecionado = selectCargo ? selectCargo.value : '';

        dadosAtuais = dadosRecrutadores.filter(item => {
            const matchBusca = !termoBusca || 
                               item.nome.toLowerCase().includes(termoBusca) ||
                               item.email.toLowerCase().includes(termoBusca) ||
                               item.empresa.toLowerCase().includes(termoBusca);
            
            const matchEmpresa = !empresaSelecionada || item.empresa === empresaSelecionada;
            const matchStatus = !statusSelecionado || item.status === statusSelecionado;
            const matchCargo = !cargoSelecionado || item.cargo === cargoSelecionado;

            return matchBusca && matchEmpresa && matchStatus && matchCargo;
        });

        instanciaTabela.atualizar(dadosAtuais);
    }

    // Associar os eventos aos filtros
    setTimeout(() => {
        const inputBusca = document.getElementById('input-busca-recrutador');
        const selectEmpresa = document.getElementById('filtro-empresa');
        const selectStatus = document.getElementById('filtro-status');
        const selectCargo = document.getElementById('filtro-cargo');

        if (inputBusca) inputBusca.addEventListener('input', aplicarFiltros);
        if (selectEmpresa) selectEmpresa.addEventListener('change', aplicarFiltros);
        if (selectStatus) selectStatus.addEventListener('change', aplicarFiltros);
        if (selectCargo) selectCargo.addEventListener('change', aplicarFiltros);
    }, 50);

    containerTabelaWrapper.addEventListener('click', (e) => {
        const linha = e.target.closest('tr');
        if (linha && !e.target.closest('button') && !e.target.closest('input')) {
            const indexTR = Array.from(linha.parentNode.children).indexOf(linha);
            if (indexTR >= 0 && dadosAtuais[indexTR]) {
                mostrarDetalhesRecrutador(dadosAtuais[indexTR]);
            }
        }
    });

    return containerPagina;
}