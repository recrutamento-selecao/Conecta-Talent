const container = document.getElementById("login-container");

// Título "Acesse sua conta"
const titulo = document.createElement("h2");
titulo.innerText = "Acesse sua conta";
titulo.className = "titulo-login";

// Caixa para os botões de tipo de perfil: Candidato e Empresa
const boxPerfil = document.createElement("div");
boxPerfil.className = "caixa-botoes-perfil";

const botaoCandidato = document.createElement("button");
botaoCandidato.innerText = "Candidato";
botaoCandidato.className = "botao-perfil";

const botaoEmpresa = document.createElement("button");
botaoEmpresa.innerText = "Empresa";
botaoEmpresa.className = "botao-perfil";

boxPerfil.appendChild(botaoCandidato);
boxPerfil.appendChild(botaoEmpresa);

// Crie uma conta
const CriarConta = document.createElement("a");
CriarConta.innerText = "Não tem uma conta? Crie uma";
CriarConta.href = "#";
CriarConta.className = "criar-conta";

// Formulário criado no outro arquivo
const meuForm = criarFormulario();

// Esqueceu a senha
const EsqueceuSenha = document.createElement("a");
EsqueceuSenha.innerText = "Esqueceu a minha senha";
EsqueceuSenha.href = "#";
EsqueceuSenha.className = "esqueceu-senha";

// Caixa para os botões de login social: Google e Microsoft
const boxSocial = document.createElement("div");
boxSocial.className = "caixa-botoes-sociais";

const botaoGoogle = document.createElement("button");
botaoGoogle.innerText = "Google";
botaoGoogle.className = "botao-social";

const botaoMicrosoft = document.createElement("button");
botaoMicrosoft.innerText = "Microsoft";
botaoMicrosoft.className = "botao-social";

boxSocial.appendChild(botaoGoogle);
boxSocial.appendChild(botaoMicrosoft);

// Adicionando os elementos na tela com as caixas agrupadoras
container.appendChild(titulo);
container.appendChild(boxPerfil);
container.appendChild(CriarConta);
container.appendChild(meuForm);
container.appendChild(EsqueceuSenha);
container.appendChild(boxSocial);