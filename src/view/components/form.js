
import criarInputSenha from "./senhaVisibilidade.js";

function createForm(config) {
    const container = document.createElement("div");
    const form = document.createElement("form");
    form.className = "meu-formulario";

    const icons = {
        invisibleIcon: {
            width: 24,
            height: 24,
            body: '<path d="M3 3l18 18M10.6 10.6a3 3 0 004.2 4.2M9.9 5.2A10.8 10.8 0 0112 5c5 0 9 5 9 7a9.5 9.5 0 01-2.1 3.2M6.2 6.2C3.9 7.5 2 10 2 12c0 2 4 7 10 7 1.2 0 2.3-.2 3.3-.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
        },
        visibleIcon: {
            width: 24,
            height: 24,
            body: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/>'
        }
    };

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

        if (input.type === "password") {
            grupo.appendChild(criarInputSenha(input, icons));
        } else {
            grupo.appendChild(input);
        }

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
