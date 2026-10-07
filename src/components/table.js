export const ICONES = {
    empresa: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
    editar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
    excluir: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
    menu: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="12" cy="19" r="1.7"/></svg>`,
    favorito: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
    ordenar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>`,
    usuarioMais: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>`
};

const CLASSE_ALINHAMENTO = {
    direita: 'col-direita',
    centro: 'col-centro'
};

// Texto ou elemento.
function anexarConteudo(elemento, conteudo) {
    if (conteudo instanceof Node) {
        elemento.appendChild(conteudo);
    } else {
        elemento.textContent = conteudo ?? '';
    }
}

// Sempre texto ou Node: nada vindo da API/banco vira HTML.
function preencherCelula(td, valor) {
    anexarConteudo(td, valor);
}

function criarBotaoAcao(classe, icone, titulo, aoClicar) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = classe;
    botao.title = titulo;
    botao.setAttribute('aria-label', titulo);
    botao.innerHTML = icone;
    botao.addEventListener('click', aoClicar);
    return botao;
}

// Botão ⋮ (menu de ações da linha).
export function criarBotaoMenu(aoClicar, titulo = 'Ações') {
    return criarBotaoAcao('btn-menu', ICONES.menu, titulo, aoClicar);
}

// Link padrão do cabeçalho do card (ex.: "Ver todas →").
export function criarLinkAcao(texto, href = '#') {
    const link = document.createElement('a');
    link.className = 'link-acao';
    link.href = href;
    link.textContent = texto;
    return link;
}

function criarCheckbox(rotulo, aoMudar) {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'tabela-check';
    input.setAttribute('aria-label', rotulo);
    input.addEventListener('change', () => aoMudar(input.checked));
    return input;
}

function ordenar(dados, { chave, direcao }) {
    const fator = direcao === 'desc' ? -1 : 1;
    return [...dados].sort((a, b) => {
        const x = a[chave];
        const y = b[chave];
        if (x == null && y == null) return 0;
        if (x == null) return 1; // vazios sempre no fim
        if (y == null) return -1;
        if (typeof x === 'number' && typeof y === 'number') return (x - y) * fator;
        return String(x).localeCompare(String(y), 'pt-BR', { numeric: true, sensitivity: 'base' }) * fator;
    });
}

function criarCabecalhoCard({ titulo, subtitulo, acaoTitulo }) {
    const cabecalho = document.createElement('div');
    cabecalho.className = 'tabela-cabecalho';

    const textos = document.createElement('div');

    if (titulo) {
        const h2 = document.createElement('h2');
        h2.className = 'tabela-titulo';
        h2.textContent = titulo;
        textos.appendChild(h2);
    }

    if (subtitulo) {
        const p = document.createElement('p');
        p.className = 'tabela-subtitulo';
        p.textContent = subtitulo;
        textos.appendChild(p);
    }

    cabecalho.appendChild(textos);

    if (acaoTitulo) {
        const acao = document.createElement('div');
        acao.className = 'tabela-cabecalho-acao';
        anexarConteudo(acao, acaoTitulo);
        cabecalho.appendChild(acao);
    }

    return cabecalho;
}

function criarRodape({ esquerda, direita }) {
    const rodape = document.createElement('div');
    rodape.className = 'tabela-rodape';

    if (esquerda) {
        const span = document.createElement('span');
        anexarConteudo(span, esquerda);
        rodape.appendChild(span);
    }

    if (direita) {
        const span = document.createElement('span');
        anexarConteudo(span, direita);
        rodape.appendChild(span);
    }

    return rodape;
}

/**
 * colunas: [{ chave, titulo, render?(valor, item), alinhamento?: 'direita' | 'centro',
 *             largura?: '120px', ordenavel?: boolean }]
 *          render() deve devolver texto ou elemento (nunca HTML em string).
 * dados:   array de objetos (cada um com `id`)
 * opcoes:  {
 *   container?:    id ou elemento onde a tabela é desenhada (padrão 'app'),
 *   titulo?, subtitulo?,
 *   acaoTitulo?:   texto ou elemento à direita do título (link, botão),
 *   rodape?:       { esquerda?, direita? } (texto ou elemento),
 *   variante?:     'limpa' (sem borda interna, cabeçalho cinza) | 'plana' (sem card, cabeçalho simples),
 *   cabecalho?:    boolean (padrão true; false = sem linha de cabeçalho),
 *   lista?:        boolean (padrão = !cabecalho; true = visual de lista, sem moldura),
 *   acoes?:        boolean (padrão true; coluna com editar/excluir),
 *   zebra?:        boolean (padrão false),
 *   selecionavel?: boolean (padrão false; coluna de checkboxes),
 *   aoSelecionar?(itensSelecionados),
 *   aoEditar?(item), aoExcluir?(item)
 * }
 */
export function criartabela(colunas, dados, opcoes = {}) {
    const {
        container = 'app',
        titulo = '',
        subtitulo = '',
        acaoTitulo = null,
        rodape = null,
        variante = '',
        cabecalho = true,
        lista = !cabecalho,
        acoes = true,
        zebra = false,
        selecionavel = false,
        aoSelecionar,
        aoEditar,
        aoExcluir
    } = opcoes;

    const app = typeof container === 'string' ? document.getElementById(container) : container;
    if (!app) return;

    const itens = dados || [];
    const selecionados = new Set();
    let ordem = null; // { chave, direcao }

    function desenhar() {
        const linhas = ordem ? ordenar(itens, ordem) : itens;
        const checksLinhas = [];
        let checkTodos = null;

        function atualizarSelecao() {
            if (checkTodos) {
                const todos = linhas.length > 0 && linhas.every(i => selecionados.has(i.id));
                const algum = linhas.some(i => selecionados.has(i.id));
                checkTodos.checked = todos;
                checkTodos.indeterminate = algum && !todos;
            }
            if (aoSelecionar) aoSelecionar(itens.filter(i => selecionados.has(i.id)));
        }

        app.innerHTML = '';

        const card = document.createElement('section');
        card.className = variante ? `tabela-card tabela-card--${variante}` : 'tabela-card';

        if (titulo || acaoTitulo) {
            card.appendChild(criarCabecalhoCard({ titulo, subtitulo, acaoTitulo }));
        }

        const wrapper = document.createElement('div');
        wrapper.className = lista ? 'tabela-wrapper tabela-wrapper--lista' : 'tabela-wrapper';

        const tabela = document.createElement('table');
        tabela.className = zebra ? 'tabela tabela--zebra' : 'tabela';

        // Cabeçalho
        if (cabecalho) {
            const thead = document.createElement('thead');
            const trHead = document.createElement('tr');

            if (selecionavel) {
                const th = document.createElement('th');
                th.className = 'col-check';
                checkTodos = criarCheckbox('Selecionar todos', marcado => {
                    linhas.forEach((item, i) => {
                        if (marcado) selecionados.add(item.id);
                        else selecionados.delete(item.id);
                        checksLinhas[i].checked = marcado;
                        checksLinhas[i].closest('tr').classList.toggle('selecionada', marcado);
                    });
                    atualizarSelecao();
                });
                th.appendChild(checkTodos);
                trHead.appendChild(th);
            }

            colunas.forEach(coluna => {
                const th = document.createElement('th');
                if (CLASSE_ALINHAMENTO[coluna.alinhamento]) th.className = CLASSE_ALINHAMENTO[coluna.alinhamento];
                if (coluna.largura) th.style.width = coluna.largura;

                if (coluna.ordenavel) {
                    const botao = document.createElement('button');
                    botao.type = 'button';
                    botao.className = 'btn-ordenar';
                    botao.append(document.createTextNode(coluna.titulo));

                    const icone = document.createElement('span');
                    icone.innerHTML = ICONES.ordenar;
                    botao.appendChild(icone);

                    if (ordem && ordem.chave === coluna.chave) {
                        th.setAttribute('aria-sort', ordem.direcao === 'asc' ? 'ascending' : 'descending');
                    }

                    botao.addEventListener('click', () => {
                        const mesma = ordem && ordem.chave === coluna.chave;
                        ordem = {
                            chave: coluna.chave,
                            direcao: mesma && ordem.direcao === 'asc' ? 'desc' : 'asc'
                        };
                        desenhar();
                    });

                    th.appendChild(botao);
                } else {
                    th.textContent = coluna.titulo;
                }

                trHead.appendChild(th);
            });

            if (acoes) {
                const th = document.createElement('th');
                th.className = 'col-acoes';
                th.textContent = 'AÇÕES';
                trHead.appendChild(th);
            }

            thead.appendChild(trHead);
            tabela.appendChild(thead);
        }

        // Corpo
        const tbody = document.createElement('tbody');

        if (linhas.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = colunas.length + (acoes ? 1 : 0) + (selecionavel ? 1 : 0);
            td.className = 'tabela-vazia';
            td.textContent = 'Nenhum registro encontrado.';
            tr.appendChild(td);
            tbody.appendChild(tr);
        }

        linhas.forEach(item => {
            const tr = document.createElement('tr');

            if (selecionavel) {
                const td = document.createElement('td');
                td.className = 'col-check';
                const check = criarCheckbox('Selecionar linha', marcado => {
                    if (marcado) selecionados.add(item.id);
                    else selecionados.delete(item.id);
                    tr.classList.toggle('selecionada', marcado);
                    atualizarSelecao();
                });
                if (selecionados.has(item.id)) {
                    check.checked = true;
                    tr.classList.add('selecionada');
                }
                checksLinhas.push(check);
                td.appendChild(check);
                tr.appendChild(td);
            }

            colunas.forEach(coluna => {
                const td = document.createElement('td');
                if (CLASSE_ALINHAMENTO[coluna.alinhamento]) td.className = CLASSE_ALINHAMENTO[coluna.alinhamento];
                if (coluna.largura) td.style.width = coluna.largura;
                const valor = item[coluna.chave];
                preencherCelula(td, coluna.render ? coluna.render(valor, item) : valor);
                tr.appendChild(td);
            });

            if (acoes) {
                const td = document.createElement('td');
                td.className = 'col-acoes';
                const div = document.createElement('div');
                div.className = 'acoes';
                div.appendChild(criarBotaoAcao('btn-editar', ICONES.editar, 'Editar', () => aoEditar && aoEditar(item)));
                div.appendChild(criarBotaoAcao('btn-excluir', ICONES.excluir, 'Excluir', () => aoExcluir && aoExcluir(item)));
                td.appendChild(div);
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        });
        tabela.appendChild(tbody);

        wrapper.appendChild(tabela);
        card.appendChild(wrapper);

        if (rodape) {
            card.appendChild(criarRodape(rodape));
        }

        app.appendChild(card);

        if (checkTodos) {
            const todos = linhas.length > 0 && linhas.every(i => selecionados.has(i.id));
            const algum = linhas.some(i => selecionados.has(i.id));
            checkTodos.checked = todos;
            checkTodos.indeterminate = algum && !todos;
        }
    }

    desenhar();
}