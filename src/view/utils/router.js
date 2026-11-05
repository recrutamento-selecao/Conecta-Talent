export function criarRoteador({ container, rotas, rotaPadrao }) {
    function navegar() {
        const caminho = window.location.hash.slice(1) || rotaPadrao;
        const render = rotas[caminho] ?? rotas[rotaPadrao];
        container.replaceChildren(render());
    }

    window.addEventListener('hashchange', navegar);
    navegar();

    return { navegar };
}

export function irPara(caminho) {
    window.location.hash = caminho;
}