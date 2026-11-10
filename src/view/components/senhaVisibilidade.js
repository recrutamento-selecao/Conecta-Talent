
const SVG_RENDER = "http://www.w3.org/2000/svg";

const renderIcons = (btnIcon, data) => {
    const svg = document.createElementNS(SVG_RENDER, "svg");

    const width = data.width || 16;
    const height = data.height || 16;

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = data.body;

    btnIcon.replaceChildren(svg);
};

const criarInputSenha = (input, icons) => {
    const divSenha = document.createElement("div");
    divSenha.className = "divSenha";

    const btnVisibilidade = document.createElement("button");
    btnVisibilidade.type = "button";
    btnVisibilidade.className = "btnVisibilidade";
    btnVisibilidade.setAttribute("aria-label", "Senha oculta");
    btnVisibilidade.setAttribute("aria-pressed", "false");

    renderIcons(btnVisibilidade, icons.invisibleIcon);

    btnVisibilidade.addEventListener("click", () => {
        const inputEstaVisivel = input.type === "text";

        input.type = inputEstaVisivel ? "password" : "text";

        btnVisibilidade.setAttribute(
            "aria-label",
            inputEstaVisivel ? "Senha oculta" : "Senha visível"
        );

        btnVisibilidade.setAttribute(
            "aria-pressed",
            String(!inputEstaVisivel)
        );

        renderIcons(
            btnVisibilidade,
            inputEstaVisivel ? icons.invisibleIcon : icons.visibleIcon
        );
    });

    divSenha.append(input, btnVisibilidade);

    return divSenha;
};

export default criarInputSenha;
