import { criarSidebar } from '../components/sidebar.js';
import {
    TODAS_AS_VAGAS,
    alternarFavoritoVaga,
    obterIdsVagasFavoritadas
} from './candidato-vagas.js';

const USUARIO_LOGADO = { nome: "João Oliveira", perfil: "candidato" };

function obterIniciais(texto = '') {
    const partes = texto.trim().split(/\s+/).filter(Boolean);
    if (partes.length === 0) return 'VG';
    if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
    return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
}

export function renderVagasFavoritasCandidato() {
    let busca = '';
    let modeloFiltro = 'Todos';
    let areaFiltro = 'Todas';
    let contratoFiltro = 'Todos';
    let paginaAtual = 1;
    let itensPorPagina = 6;

    const wrapper = document.createElement('div');
    wrapper.className = 'pagina-layout-dashboard page-vagas-favoritas-candidato';

    const sidebar = criarSidebar(USUARIO_LOGADO.perfil, USUARIO_LOGADO.nome);
    wrapper.appendChild(sidebar);

    const main = document.createElement('main');
    main.className = 'conteudo-principal fav-candidato-page';

    const cabecalho = document.createElement('header');
    cabecalho.className = 'header-saudacao fav-cabecalho';
    cabecalho.innerHTML = `
        <div>
            <h1 class="fav-titulo">Vagas Favoritadas</h1>
            <p class="fav-subtitulo">Acompanhe as oportunidades que você favoritou para se candidatar depois.</p>
        </div>
    `;
    main.appendChild(cabecalho);

    const filtrosCard = document.createElement('section');
    filtrosCard.className = 'fav-filtros-card';
    filtrosCard.innerHTML = `
        <div class="fav-busca-box">
            <span class="fav-busca-icone">🔍</span>
            <input
                type="text"
                class="fav-input-busca"
                placeholder="Buscar por título da vaga, empresa"
                aria-label="Buscar por título da vaga ou empresa"
            />
        </div>

        <select class="fav-select" data-filtro="modelo" aria-label="Filtrar por modalidade">
            <option value="Todos">Modalidade: Todas</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Remoto">Remoto</option>
            <option value="Presencial">Presencial</option>
        </select>

        <select class="fav-select" data-filtro="area" aria-label="Filtrar por área">
            <option value="Todas">Área: Todas</option>
            <option value="Dados">Dados</option>
            <option value="Tecnologia">Tecnologia</option>
        </select>

        <select class="fav-select" data-filtro="contrato" aria-label="Filtrar por contrato">
            <option value="Todos">Contrato: Todos</option>
            <option value="CLT">CLT</option>
            <option value="PJ">PJ</option>
        </select>

        <button type="button" class="fav-btn-limpar">↺ Limpar</button>
    `;
    main.appendChild(filtrosCard);

    const tabelaCard = document.createElement('section');
    tabelaCard.className = 'fav-tabela-card';
    tabelaCard.innerHTML = `
        <div class="fav-tabela-responsiva">
            <table class="fav-tabela">
                <thead>
                    <tr>
                        <th class="col-check">
                            <input type="checkbox" class="fav-check-todos" aria-label="Selecionar todas as vagas" />
                        </th>
                        <th>Vaga</th>
                        <th>Área</th>
                        <th>Localização</th>
                        <th>Contrato</th>
                        <th>Salário</th>
                        <th>Status</th>
                        <th class="text-right">Ações</th>
                    </tr>
                </thead>
                <tbody class="fav-tbody"></tbody>
            </table>
        </div>

        <div class="fav-rodape-paginacao">
            <span class="fav-resumo-paginacao"></span>
            <div class="fav-controles-paginacao">
                <label class="fav-label-por-pagina">
                    Itens por página:
                    <select class="fav-select-pagina" aria-label="Itens por página">
                        <option value="6" selected>6</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </label>
                <div class="fav-botoes-pagina">
                    <button type="button" class="fav-btn-pag fav-btn-anterior" aria-label="Página anterior">&lt;</button>
                    <span class="fav-pag-atual">1</span>
                    <button type="button" class="fav-btn-pag fav-btn-proxima" aria-label="Próxima página">&gt;</button>
                </div>
            </div>
        </div>
    `;
    main.appendChild(tabelaCard);
    wrapper.appendChild(main);

    const inputBusca = filtrosCard.querySelector('.fav-input-busca');
    const selectModelo = filtrosCard.querySelector('[data-filtro="modelo"]');
    const selectArea = filtrosCard.querySelector('[data-filtro="area"]');
    const selectContrato = filtrosCard.querySelector('[data-filtro="contrato"]');
    const btnLimpar = filtrosCard.querySelector('.fav-btn-limpar');

    const tbody = tabelaCard.querySelector('.fav-tbody');
    const checkTodos = tabelaCard.querySelector('.fav-check-todos');
    const resumoPaginacao = tabelaCard.querySelector('.fav-resumo-paginacao');
    const selectPorPagina = tabelaCard.querySelector('.fav-select-pagina');
    const btnAnterior = tabelaCard.querySelector('.fav-btn-anterior');
    const btnProxima = tabelaCard.querySelector('.fav-btn-proxima');
    const indicadorPagina = tabelaCard.querySelector('.fav-pag-atual');

    const renderTabela = () => {
        const idsFavoritos = obterIdsVagasFavoritadas();
        const vagasSalvas = TODAS_AS_VAGAS.filter((vaga) => idsFavoritos.includes(Number(vaga.id)));

        const filtradas = vagasSalvas.filter((vaga) => {
            const termo = busca.trim().toLowerCase();
            const matchBusca =
                !termo ||
                vaga.titulo.toLowerCase().includes(termo) ||
                (vaga.empresa || '').toLowerCase().includes(termo);

            const matchModelo = modeloFiltro === 'Todos' || vaga.modelo === modeloFiltro;
            const matchArea = areaFiltro === 'Todas' || (vaga.area || 'Dados') === areaFiltro;
            const matchContrato = contratoFiltro === 'Todos' || vaga.contrato === contratoFiltro;

            return matchBusca && matchModelo && matchArea && matchContrato;
        });

        const totalFiltrado = filtradas.length;
        const totalPaginas = Math.max(1, Math.ceil(totalFiltrado / itensPorPagina));
        if (paginaAtual > totalPaginas) {
            paginaAtual = totalPaginas;
        }

        const inicioIdx = (paginaAtual - 1) * itensPorPagina;
        const fimIdx = Math.min(inicioIdx + itensPorPagina, totalFiltrado);
        const paginaItens = filtradas.slice(inicioIdx, fimIdx);

        tbody.innerHTML = '';

        if (paginaItens.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td colspan="8" class="fav-estado-vazio">
                    ${
                        vagasSalvas.length === 0
                            ? 'Você ainda não favoritou nenhuma vaga nesta sessão. Vá em Buscar Vagas e clique em favoritar.'
                            : 'Nenhuma vaga favorita encontrada com os filtros selecionados.'
                    }
                </td>
            `;
            tbody.appendChild(tr);
        } else {
            paginaItens.forEach((vaga) => {
                const tr = document.createElement('tr');
                const empresaExibida = vaga.empresa && vaga.empresa.trim() ? vaga.empresa : 'Conecta Talent';
                const areaExibida = vaga.area || 'Dados';

                tr.innerHTML = `
                    <td class="col-check">
                        <input type="checkbox" class="fav-check-item" aria-label="Selecionar ${vaga.titulo}" />
                    </td>
                    <td>
                        <div class="fav-vaga-cell">
                            <span class="fav-avatar">${obterIniciais(vaga.titulo)}</span>
                            <div class="fav-vaga-info">
                                <span class="fav-vaga-titulo">${vaga.titulo}</span>
                                <span class="fav-vaga-empresa">${empresaExibida}</span>
                            </div>
                        </div>
                    </td>
                    <td>${areaExibida}</td>
                    <td>
                        <div class="fav-local-col">
                            <span class="fav-local-cidade">${vaga.localizacao}</span>
                            <span class="fav-local-mod">${vaga.modelo}</span>
                        </div>
                    </td>
                    <td>${vaga.contrato}</td>
                    <td>R$ ${vaga.salario}</td>
                    <td><span class="badge-favoritada">Favoritada</span></td>
                    <td class="text-right">
                        <button
                            type="button"
                            class="fav-btn-remover"
                            data-remover-id="${vaga.id}"
                            title="Remover dos favoritos"
                        >
                            ★ Remover
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        if (totalFiltrado === 0) {
            resumoPaginacao.textContent = 'Mostrando 0 de 0 vagas';
        } else {
            resumoPaginacao.textContent = `Mostrando ${inicioIdx + 1} a ${fimIdx} de ${totalFiltrado} vagas`;
        }

        indicadorPagina.textContent = String(paginaAtual);
        btnAnterior.disabled = paginaAtual <= 1;
        btnProxima.disabled = paginaAtual >= totalPaginas;
        if (checkTodos) checkTodos.checked = false;
    };

    inputBusca.addEventListener('input', (e) => {
        busca = e.target.value;
        paginaAtual = 1;
        renderTabela();
    });

    selectModelo.addEventListener('change', (e) => {
        modeloFiltro = e.target.value;
        paginaAtual = 1;
        renderTabela();
    });

    selectArea.addEventListener('change', (e) => {
        areaFiltro = e.target.value;
        paginaAtual = 1;
        renderTabela();
    });

    selectContrato.addEventListener('change', (e) => {
        contratoFiltro = e.target.value;
        paginaAtual = 1;
        renderTabela();
    });

    btnLimpar.addEventListener('click', () => {
        busca = '';
        modeloFiltro = 'Todos';
        areaFiltro = 'Todas';
        contratoFiltro = 'Todos';
        paginaAtual = 1;

        inputBusca.value = '';
        selectModelo.value = 'Todos';
        selectArea.value = 'Todas';
        selectContrato.value = 'Todos';

        renderTabela();
    });

    selectPorPagina.addEventListener('change', (e) => {
        itensPorPagina = Number(e.target.value) || 6;
        paginaAtual = 1;
        renderTabela();
    });

    btnAnterior.addEventListener('click', () => {
        if (paginaAtual > 1) {
            paginaAtual -= 1;
            renderTabela();
        }
    });

    btnProxima.addEventListener('click', () => {
        paginaAtual += 1;
        renderTabela();
    });

    checkTodos.addEventListener('change', (e) => {
        tbody.querySelectorAll('.fav-check-item').forEach((chk) => {
            chk.checked = e.target.checked;
        });
    });

    tbody.addEventListener('click', (e) => {
        const btnRemover = e.target.closest('[data-remover-id]');
        if (!btnRemover) return;

        const id = Number(btnRemover.dataset.removerId);
        if (id) {
            alternarFavoritoVaga(id);
            renderTabela();
        }
    });

    window.addEventListener('vagasFavoritasAlteradas', renderTabela);

    renderTabela();
    return wrapper;
}