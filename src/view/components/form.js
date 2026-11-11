function createForm(config) {
    const container = document.createElement("div");

    const form = document.createElement("form");
    form.className = "meu-formulario";

    config.campos.forEach(campo => {
        const grupo = document.createElement("div");
        grupo.className = "grupo-campo";

        if (campo.label) {
            const label = document.createElement("label");
            label.innerText = campo.label;
            grupo.appendChild(label);
        }

        const input = document.createElement("input");
        input.type = campo.tipo || "text";
        input.name = campo.nome;
        input.placeholder = campo.placeholder || "";
        input.className = "campo-texto";
        input.required = true;

        grupo.appendChild(input);
        form.appendChild(grupo);
    });

    config.botoes.forEach(btn => {
        const botao = document.createElement("button");
        botao.type = btn.tipo || "button";
        botao.innerText = btn.texto;
        botao.className = btn.className || "botao-padrao";

        form.appendChild(botao);
    });

    container.appendChild(form);

    return container;
}

export default createForm;