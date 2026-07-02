const app = document.getElementById('app');

// HEADER
const header = document.createElement('header'); //cria header
header.classList.add('header');

const logo = document.createElement('h1'); //cria logo
logo.textContent = "Conecta Talent"; //coloca texto na logo
logo.classList.add('logo');

const navegacao = document.createElement('nav'); //cria nav
navegacao.classList.add('navegacao');

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


const btnCadastrar = document.createElement('button'); // cria o botão cadastrar
btnCadastrar.classList.add('btn-cadastrar');

btnEntrar.textContent = "Entrar";
btnCadastrar.textContent = "Cadastrar-se";

//MAIN
const main = document.createElement('main');
main.classList.add('main');

const section = document.createElement('section');
section.classList.add('hero'); /*Hero section - primeira seção de destaque da página(onde o usuário olha)*/

const heroConteudo = document.createElement('div');
heroConteudo.classList.add('hero-conteudo');


const tituloHero = document.createElement('h2');
tituloHero.classList.add('titulo-hero');
tituloHero.textContent = "Conectando você com as melhores oportunidades";

const descricaoHero = document.createElement('p');
descricaoHero.classList.add('descricao-hero');
descricaoHero.textContent = "Encontre a vaga para o seu perfil ou publique vagas e conecte-se com talentos incríveis."

const buscarVagasHero = document.createElement('div');
buscarVagasHero.classList.add('buscar-vagas-principal');

const conteudoBuscarVagas = document.createElement('div');
conteudoBuscarVagas.classList.add('conteudo-buscar');

const tituloVagasHero = document.createElement('h3');
tituloVagasHero.classList.add('encontre-vaga');
tituloVagasHero.textContent = 'Encontre sua vaga ideal!';

const tituloBusqueCargo = document.createElement('h4');
tituloBusqueCargo.classList.add('busque-cargos');
tituloBusqueCargo.textContent = 'Busque por cargo, palavra-chave ou localização.';

const inputBuscarVagas = document.createElement('input');
inputBuscarVagas.classList.add('input-buscar');
inputBuscarVagas.type = "search";
inputBuscarVagas.placeholder = "Cargo ou palavra-chave";

const inputLocalizacao = document.createElement('input');
inputLocalizacao.classList.add('input-localizar');
inputLocalizacao.type = "text";
inputLocalizacao.placeholder = "Localização";


const btnBuscarVagas = document.createElement('button');
btnBuscarVagas.classList.add('btn-buscar-vagas');
btnBuscarVagas.textContent = "Buscar vagas";

const heroImagem = document.createElement('div');
heroImagem.classList.add('hero-imagem');

const imagemHero = document.createElement('img');
imagemHero.classList.add("imagem-hero");
imagemHero.src = "img/hero2-bg.png";
imagemHero.alt = "Profissional utilizando notebook";

//CARDS

const cardsBeneficio = document.createElement('section');
cardsBeneficio.classList.add('cards-secao');

const tituloBeneficio = document.createElement('h4');
tituloBeneficio.classList.add('titulo-secao');
tituloBeneficio.textContent = 'Tudo que você precisa em um só lugar';

const subtituloBeneficio = document.createElement('p');
subtituloBeneficio.classList.add('susbtitulo-beneficio');
subtituloBeneficio.textContent = "Soluções inteligentes para candidatos e empresas";

const cardsContainer = document.createElement('div');
cardsContainer.classList.add('cards-container');


const cardCandidato = document.createElement('div');
cardCandidato.classList.add('card-beneficio');
const tituloCandidato = document.createElement('p');
tituloCandidato.classList.add('titulo-card');
tituloCandidato.textContent = "Para Candidatos";
const conteudoCandidato = document.createElement('p');
conteudoCandidato.classList.add('descricao-card');
conteudoCandidato.textContent = "Encontre oportunidades compatíveis com seu perfil, acompanhe suas candidaturas e conecte-se com empresas de forma rápida e simples.";

const cardEmpresa = document.createElement('div');
cardEmpresa.classList.add('card-beneficio');
const tituloEmpresa = document.createElement('p');
tituloEmpresa.classList.add('titulo-card');
tituloEmpresa.textContent = "Para Empresas";
const conteudoEmpresa = document.createElement('p');
conteudoEmpresa.classList.add('descricao-card');
conteudoEmpresa.textContent = "Publique vagas, gerencie recrutadores e encontre os profissionais ideais em uma plataforma moderna e intuitiva."


const cardProcessos = document.createElement('div');
cardProcessos.classList.add('card-beneficio');
const tituloProcessos = document.createElement('p');
tituloProcessos.classList.add('titulo-card');
tituloProcessos.textContent = "Processos simplificados";
const conteudoProcessos = document.createElement('p');
conteudoProcessos.classList.add('descricao-card');
conteudoProcessos.textContent = "Automatize etapas do recrutamento, organize candidatos e torne a seleção mais rápida e eficiente."


const cardSeguranca = document.createElement('div');
cardSeguranca.classList.add('card-beneficio');
const tituloSeguranca = document.createElement('p');
tituloSeguranca.classList.add('titulo-card');
tituloSeguranca.textContent = "Processos simplificados";
const conteudoSeguranca = document.createElement('p');
conteudoSeguranca.classList.add('descricao-card');
conteudoSeguranca.textContent = "Proteja os dados da sua empresa e dos seus candidatos com uma plataforma desenvolvida para oferecer privacidade e confiabilidade."


header.appendChild(logo); //coloca logo dentro do header
header.appendChild(navegacao) //coloca navegacao dentro do header
header.appendChild(acesso); //coloca acesso dentro do header - botões de acessar/cadastrar
acesso.appendChild(btnEntrar);
acesso.appendChild(btnCadastrar);

main.appendChild(section);
section.appendChild(heroConteudo);
section.appendChild(heroImagem);

heroConteudo.appendChild(tituloHero);
heroConteudo.appendChild(descricaoHero);
heroConteudo.appendChild(buscarVagasHero);

heroConteudo.appendChild(conteudoBuscarVagas);

conteudoBuscarVagas.appendChild(tituloVagasHero)
conteudoBuscarVagas.appendChild(tituloBusqueCargo)
buscarVagasHero.appendChild(inputBuscarVagas);
buscarVagasHero.appendChild(inputLocalizacao);
buscarVagasHero.appendChild(btnBuscarVagas);

heroImagem.appendChild(imagemHero);

cardsBeneficio.appendChild(tituloBeneficio);
cardsBeneficio.appendChild(subtituloBeneficio);
cardsBeneficio.appendChild(cardsContainer);

cardsContainer.appendChild(cardCandidato);
cardsContainer.appendChild(cardEmpresa);
cardsContainer.appendChild(cardProcessos);
cardsContainer.appendChild(cardSeguranca);

cardCandidato.appendChild(tituloCandidato);
cardCandidato.appendChild(conteudoCandidato);
cardEmpresa.appendChild(tituloEmpresa);
cardEmpresa.appendChild(conteudoEmpresa);
cardProcessos.appendChild(tituloProcessos);
cardProcessos.appendChild(conteudoProcessos);
cardSeguranca.appendChild(tituloSeguranca);
cardSeguranca.appendChild(conteudoSeguranca);


app.appendChild(header); //coloca header na página
app.appendChild(main); //coloca main na pagina
app.appendChild(cardsBeneficio); //cardsBeneficio na pagina


console.log(acesso);



