//https://icon-sets.iconify.design/?query=eye

import criarInputsenha from "../utils/senhaVisibilidade.js";


const renderCadastroPage = (icons) => {
    const container = document.createElement('div');
    container.style.height = '100vh';
    container.className = "container";

    const formulario = document.createElement('form');
    formulario.className = 'form-cadastro';

    const labelNome = document.createElement('label');
    labelNome.setAttribute('for', 'nome');
    labelNome.innerText = 'Nome:';

    const inputNome = document.createElement('input');
    inputNome.setAttribute('type', 'text'); 
    inputNome.setAttribute('id', 'nome');
    inputNome.setAttribute('required', ''); 
    inputNome.placeholder = "Digite seu nome";

    const labelEmail = document.createElement('label');
    labelEmail.setAttribute('for', 'email');
    labelEmail.innerText = 'Email:';

    const inputEmail = document.createElement('input');
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('id', 'email');
    inputEmail.setAttribute('required', ''); 
    inputEmail.placeholder = "example@email.com";

    const labelSenha = document.createElement('label');
    labelSenha.setAttribute('for', 'password');
    labelSenha.innerText = 'Senha:';

    const inputSenha = document.createElement('input');
    inputSenha.setAttribute('type', 'password');
    inputSenha.setAttribute('id', 'password');
    inputSenha.setAttribute('required', ''); 
    const campoSenha = criarInputsenha(inputSenha, icons);

    const labelSenhaConfirmacao = document.createElement('label');
    labelSenhaConfirmacao.setAttribute('for', 'passwordConfirmacao');
    labelSenhaConfirmacao.innerText = 'Confirme sua senha:';

    const inputSenhaConfirmacao = document.createElement('input');
    inputSenhaConfirmacao.setAttribute('type', 'password');
    inputSenhaConfirmacao.setAttribute('id', 'passwordConfirmacao');
    inputSenhaConfirmacao.setAttribute('required', ''); 
    const campoConfirmarSenha = criarInputsenha(inputSenhaConfirmacao, icons)

    const btnEnviar = document.createElement('button');
    btnEnviar.setAttribute('type', 'submit');
    btnEnviar.setAttribute('id', 'enviar');
    btnEnviar.innerText = "Cadastrar"; 
    

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = inputNome.value.trim();
        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();
        const senhaConfirmacao = inputSenhaConfirmacao.value.trim();

        if (senha !== senhaConfirmacao) {
            alert("senhas não coincidem!");
            btnEnviar.disabled = true;
            return;
        }

        const usuario = {
            nome,
            email,
            senha
        };

        try {
            const resultado = await fetch("http://localhost:3000/autenticacao/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            const confirmacao = await resultado.json().catch(() => ({}));
            
            if (!resultado.ok) {
                alert(confirmacao.mensagem || confirmacao.error || "Erro ao cadastrar!");
                return;
            }

            alert("Cadastro realizado com sucesso!");
            return confirmacao;

        } catch (erro) {
            console.error("Erro na requisição:", erro);
            alert("Erro!");
        }
    });

    formulario.appendChild(labelNome);
    formulario.appendChild(inputNome);
    formulario.appendChild(labelEmail);
    formulario.appendChild(inputEmail);
    formulario.appendChild(labelSenha);
    formulario.appendChild(inputSenha);
    formulario.appendChild(campoSenha);
    formulario.appendChild(labelSenhaConfirmacao);
    formulario.appendChild(inputSenhaConfirmacao);
    formulario.appendChild(campoConfirmarSenha);
    formulario.appendChild(btnEnviar);

    container.appendChild(formulario);

    return container;
}

export default renderCadastroPage;