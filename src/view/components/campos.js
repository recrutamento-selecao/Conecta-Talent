export function criarCampo(configuracao) {
    const grupo = document.createElement("label");
    grupo.className = `grupo-campo ${configuracao.classe || ""}`.trim();

    const rotulo = document.createElement("span");
    rotulo.className = "campo-rotulo";
    rotulo.textContent = configuracao.rotulo;

    if (configuracao.obrigatorio) {
        const obrigatorio = document.createElement("b");
        obrigatorio.className = "campo-obrigatorio";
        obrigatorio.textContent = " *";
        rotulo.appendChild(obrigatorio);
    }

    const tag = configuracao.tipo === "textarea" ? "textarea" : configuracao.tipo === "select" ? "select" : "input";
    const campo = document.createElement(tag);
    campo.name = configuracao.nome;
    campo.id = configuracao.id || configuracao.nome;

    if (tag === "input") campo.type = configuracao.tipo || "text";
    if (configuracao.placeholder) campo.placeholder = configuracao.placeholder;
    if (configuracao.min !== undefined) campo.min = configuracao.min;
    if (configuracao.max !== undefined) campo.max = configuracao.max;
    if (configuracao.step !== undefined) campo.step = configuracao.step;
    if (configuracao.autocomplete) campo.autocomplete = configuracao.autocomplete;
    if (configuracao.obrigatorio) campo.required = true;

    if (configuracao.opcoes) {
        if (configuracao.placeholder) {
            const placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.disabled = Boolean(configuracao.obrigatorio);
            placeholder.textContent = configuracao.placeholder;
            campo.appendChild(placeholder);
        }
        configuracao.opcoes.forEach((opcao) => {
            const option = document.createElement("option");
            option.value = opcao.valor ?? opcao;
            option.textContent = opcao.rotulo || opcao;
            campo.appendChild(option);
        });
    }

    if (configuracao.valor !== undefined && configuracao.valor !== null) {
        campo.value = configuracao.valor;
    }

    grupo.appendChild(rotulo);
    grupo.appendChild(campo);

    if (configuracao.ajuda) {
        const ajuda = document.createElement("small");
        ajuda.className = "campo-ajuda";
        ajuda.textContent = configuracao.ajuda;
        grupo.appendChild(ajuda);
    }

    return { grupo, campo };
}

export function criarSeletorSenha(rotulo, nome, opcoes = {}) {
    const resultado = criarCampo({ 
        rotulo, 
        nome, 
        tipo: "password", 
        obrigatorio: opcoes.obrigatorio, 
        autocomplete: opcoes.autocomplete 
    });

    const linha = document.createElement("div");
    linha.className = "campo-senha";

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao-olho";
    botao.textContent = "Mostrar";
    botao.setAttribute("aria-label", `Mostrar ${rotulo.toLowerCase()}`);

    resultado.grupo.replaceChild(linha, resultado.campo);
    linha.appendChild(resultado.campo);
    linha.appendChild(botao);

    botao.addEventListener("click", () => {
        const exibir = resultado.campo.type === "password";
        resultado.campo.type = exibir ? "text" : "password";
        botao.textContent = exibir ? "Ocultar" : "Mostrar";
        botao.setAttribute("aria-label", `${exibir ? "Ocultar" : "Mostrar"} ${rotulo.toLowerCase()}`);
    });

    return resultado;
}