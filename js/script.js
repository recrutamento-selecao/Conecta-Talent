const app = document.getElementById('app');

// HEADER
const header = document.createElement('header'); //cria header
header.classList.add('header');

const logo = document.createElement('h1'); //cria logo
logo.textContent = "Conecta Talent" //coloca texto na logo
logo.classList.add('logo')

const navegacao = document.createElement('nav'); //cria nav
navegacao.classList.add('navegacao')

const menu = [ //isso é um array
    "Sobre nós",
    "Recursos",
    "Planos",
    "Suporte"
];

menu.forEach((menu) => { //percorre o array inteiro, um item de cada vez.
    const btnMenu = document.createElement('button'); //cria um botao a cada repeticao do forEach
    btnMenu.textContent = menu; //coloca texto do item do array dentro do botão
    navegacao.appendChild(btnMenu); // o botão é colocado dentro do elemento navegacao
    btnMenu.classList.add("btn-menu")
});

const acesso = document.createElement('div'); //cria div 
acesso.classList.add('acesso');

const btnEntrar = document.createElement('button') // cria o botão entrar
btnEntrar.classList.add('btn-entrar');


const btnCadastrar = document.createElement('button') // cria o botão cadastrar
btnCadastrar.classList.add('btn-cadastrar')

btnEntrar.textContent = "Entrar";
btnCadastrar.textContent = "Cadastrar-se";


header.appendChild(logo); //coloca logo dentro do header
header.appendChild(navegacao) //coloca navegacao dentro do header
header.appendChild(acesso); //coloca acesso dentro do header - botões de acessar/cadastrar
acesso.appendChild(btnEntrar);
acesso.appendChild(btnCadastrar);
app.appendChild(header); //coloca header na página


console.log(acesso);