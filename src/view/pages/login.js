const renderLoginPage = () => {
    const container = document.createElement('div');
    container.style.height = '100vh';
    container.className = "container"

    const formulario = document.createElement('form');
    formulario.className = 'form-login';

    const labelEmail = document.createElement('label');
    labelEmail.setAttribute('for', 'email');
    labelEmail.innerText = 'E-mail:';

    const inputEmail = document.createElement('input');
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('id', 'email');
    inputEmail.setAttribute('required', ''); 
    inputEmail.placeholder = "example@email.com";

    const labelSenha = document.createElement('label');
    labelSenha.setAttribute('for', 'senha');
    labelSenha.innerText = 'Senha:';

    const inputSenha = document.createElement('input');
    inputSenha.setAttribute('type', 'password');
    inputSenha.setAttribute('id', 'password');
    inputSenha.setAttribute('required', ''); 

    const btnEnviar = document.createElement('button');
    btnEnviar.setAttribute('type', 'submit');
    btnEnviar.setAttribute('id', 'enviar');
    btnEnviar.innerText = "Entrar";

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();
        const usuario = {
            email,
            senha
        };
        try {
            const resultado = await fetch("http://localhost:3000/autenticacao/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usuario)
                }
            );

            const confirmacao = await resultado.json();
            
            if (!resultado.ok) {
                alert("Conta inexistente!");
                return; 
            }

            alert("Login realizado com sucesso!");
            return confirmacao;

        } catch (erro) {
            console.error(erro);
            alert("Erro ao logar!");
        }
    });

    formulario.appendChild(labelEmail);
    formulario.appendChild(inputEmail);
    formulario.appendChild(labelSenha);
    formulario.appendChild(inputSenha);
    formulario.appendChild(btnEnviar);

    container.appendChild(formulario);

    return container;
}

export default renderLoginPage;