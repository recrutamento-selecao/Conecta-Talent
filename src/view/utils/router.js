/**
 * Roteador único da SPA, baseado em hash (#/caminho).
 *
 * Contrato: cada rota é uma função render() que devolve um HTMLElement.
 * O roteador é quem coloca o elemento no container; a página nunca escreve
 * em document.body.
 *
 * Se um render lançar erro, o erro vai para o Console e aparece na tela,
 * em vez de deixar a área de conteúdo em branco.
 *
 * @param {Object} config
 * @param {HTMLElement} config.container                   onde as páginas são montadas
 * @param {Record<string, () => HTMLElement>} config.rotas  ex.: { '/dashboard-candidato': render }
 * @param {string} config.rotaPadrao                       usada quando o hash está vazio ou desconhecido
 */
export function criarRoteador({ container, rotas, rotaPadrao }) {
    function navegar() {
        const caminho = window.location.hash.slice(1) || rotaPadrao;
        const render = rotas[caminho] ?? rotas[rotaPadrao];

        try {
            container.replaceChildren(render());
        } catch (erro) {
            console.error(`Erro ao renderizar a rota ${caminho}:`, erro);

            const aviso = document.createElement('pre');
            aviso.textContent = `Erro ao renderizar ${caminho}\n${erro.message}`;
            container.replaceChildren(aviso);
        }
    }

    window.addEventListener('hashchange', navegar);
    navegar();

    return { navegar };
}

// Navegação programática (ex.: depois de concluir o cadastro).
export function irPara(caminho) {
    window.location.hash = caminho;
}