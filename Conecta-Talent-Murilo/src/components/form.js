function criarFormulario() {
    const formulario = document.createElement("form");
    formulario.className = "meu-formulario"; 

    const inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.placeholder = "Digite seu email";
    inputEmail.className = "campo-texto";

    const inputSenha = document.createElement("input");
    inputSenha.type = "password";
    inputSenha.placeholder = "Digite sua senha";
    inputSenha.className = "campo-texto";

    const botaoEnviar = document.createElement("button");
    botaoEnviar.type = "submit";
    botaoEnviar.innerText = "Entrar";
    botaoEnviar.className = "botao-enviar";

    formulario.appendChild(inputEmail);
    formulario.appendChild(inputSenha);
    formulario.appendChild(botaoEnviar);

    return formulario;
}