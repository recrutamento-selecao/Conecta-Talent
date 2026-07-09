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
tituloHero.textContent = "Conectando você com as melhores oportunidades.";

const descricaoHero = document.createElement('p');
descricaoHero.classList.add('descricao-hero');
descricaoHero.textContent = "Encontre a vaga para o seu perfil ou publique vagas e conecte-se com talentos incríveis."

const areaBusca = document.createElement('div');
areaBusca.classList.add('area-buscar-vagas');

const tituloVagasHero = document.createElement('h3');
tituloVagasHero.classList.add('encontre-vaga');
tituloVagasHero.textContent = 'Encontre sua vaga ideal!';

const tituloBusqueCargo = document.createElement('h4');
tituloBusqueCargo.classList.add('busque-cargos');
tituloBusqueCargo.textContent = 'Busque por cargo, palavra-chave ou localização.';

const areaBuscaInput = document.createElement('div');
areaBuscaInput.classList.add('area-busca-input');
const campoBuscarVagas = document.createElement('div');
campoBuscarVagas.classList.add('campo-buscar-vagas');
const inputBuscarVagas = document.createElement('input');
inputBuscarVagas.classList.add('input-buscar');
inputBuscarVagas.type = "search";
inputBuscarVagas.placeholder = "Cargo ou palavra-chave";
const iconePesquisar = document.createElement('img');
iconePesquisar.src = "assets/icons/search.svg";
iconePesquisar.classList.add('icone-pesquisar');


const campoBuscarLocalizacao = document.createElement('div');
campoBuscarLocalizacao.classList.add('campo-buscar-localizacao');
const inputLocalizacao = document.createElement('input'); 
inputLocalizacao.classList.add('input-localizar');
inputLocalizacao.type = "text";
inputLocalizacao.placeholder = "Localização";
const iconeLocalizacao = document.createElement('img');
iconeLocalizacao.src = "assets/icons/map-pin.svg";
iconeLocalizacao.classList.add('icone-localizacao');


const campobtnBuscar = document.createElement('div');
campobtnBuscar.classList.add('campo-btn-buscar');
const btnBuscarVagas = document.createElement('button');
btnBuscarVagas.classList.add('btn-buscar-vagas');
const iconePesquisarBranco = document.createElement('img');
iconePesquisarBranco.classList.add('icone-pesquisar-branco');
iconePesquisarBranco.src = "assets/icons/search-branco.svg";
btnBuscarVagas.textContent = "Buscar vagas";


const heroImagem = document.createElement('div');
heroImagem.classList.add('hero-imagem');

const imagemHero = document.createElement('img');
imagemHero.classList.add("imagem-hero");
imagemHero.src = "assets/images/hero2-bg.png";
imagemHero.alt = "Profissional utilizando notebook";

//CARDS - Beneficios

const cardsBeneficio = document.createElement('section');
cardsBeneficio.classList.add('cards-secao');

const tituloBeneficio = document.createElement('h2');
tituloBeneficio.classList.add('titulo-secao');
tituloBeneficio.textContent = 'Tudo que você precisa em um só lugar';

const subtituloBeneficio = document.createElement('p');
subtituloBeneficio.classList.add('susbtitulo-beneficio');
subtituloBeneficio.textContent = "Soluções inteligentes para candidatos e empresas";

const cardsContainer = document.createElement('div');
cardsContainer.classList.add('cards-container');


const cardCandidato = document.createElement('div');
cardCandidato.classList.add('card-candidato');
const tituloCandidato = document.createElement('p');
tituloCandidato.classList.add('titulo-card');
tituloCandidato.textContent = "Para Candidatos";
const conteudoCandidato = document.createElement('p');
const iconeCandidato = document.createElement('img');
iconeCandidato.classList = 'icone-beneficio';
iconeCandidato.src = "assets/images/icons/people.svg"
iconeCandidato.alt = "Candidatos";
conteudoCandidato.classList.add('descricao-card');
conteudoCandidato.textContent = "Encontre oportunidades compatíveis com seu perfil, acompanhe suas candidaturas e conecte-se com empresas de forma rápida e simples.";
const btnSaibaCandidato = document.createElement('button');
btnSaibaCandidato.classList.add('saiba-mais');
btnSaibaCandidato.textContent = "Saiba mais \u2192";


const cardEmpresa = document.createElement('div');
cardEmpresa.classList.add('card-empresa');
const tituloEmpresa = document.createElement('p');
tituloEmpresa.classList.add('titulo-card');
tituloEmpresa.textContent = "Para Empresas";
const iconeEmpresa = document.createElement('img');
iconeEmpresa.classList = 'icone-beneficio';
iconeEmpresa.src = "assets/images/icons/building.svg"
iconeEmpresa.alt = "Empresas";
const conteudoEmpresa = document.createElement('p');
conteudoEmpresa.classList.add('descricao-card');
conteudoEmpresa.textContent = "Publique vagas, gerencie recrutadores e encontre os profissionais ideais em uma plataforma moderna e intuitiva."
const btnSaibaEmpresa = document.createElement('button');
btnSaibaEmpresa.classList.add('saiba-mais');
btnSaibaEmpresa.textContent = "Saiba mais \u2192";

const cardProcessos = document.createElement('div');
cardProcessos.classList.add('card-processo');
const iconeProcesso = document.createElement('img');
iconeProcesso.classList = 'icone-beneficio';
iconeProcesso.src = "assets/images/icons/clipboard2-check.svg"
iconeProcesso.alt = "Processos simplificados";
const tituloProcessos = document.createElement('p');
tituloProcessos.classList.add('titulo-card');
tituloProcessos.textContent = "Processos simplificados";
const conteudoProcessos = document.createElement('p');
conteudoProcessos.classList.add('descricao-card');
conteudoProcessos.textContent = "Automatize etapas do recrutamento, organize candidatos e torne a seleção mais rápida e eficiente."
const btnSaibaProcesso = document.createElement('button');
btnSaibaProcesso.classList.add('saiba-mais');
btnSaibaProcesso.textContent = "Saiba mais \u2192";

const cardSeguranca = document.createElement('div');
cardSeguranca.classList.add('card-seguranca');
const iconeSeguranca = document.createElement('img');
iconeSeguranca.classList = 'icone-beneficio';
iconeSeguranca.src = "assets/images/icons/shield-check.svg";
iconeSeguranca.alt = "Segurança e confiabilidade";
const tituloSeguranca = document.createElement('p');
tituloSeguranca.classList.add('titulo-card');
tituloSeguranca.textContent = "Segurança e confiança";
const conteudoSeguranca = document.createElement('p');
conteudoSeguranca.classList.add('descricao-card');
conteudoSeguranca.textContent = "Proteja os dados da sua empresa e dos seus candidatos com uma plataforma desenvolvida para oferecer privacidade e confiabilidade."
const btnSaibaSeguranca = document.createElement('button');
btnSaibaSeguranca.classList.add('saiba-mais');
btnSaibaSeguranca.textContent = "Saiba mais \u2192";

//CARDS - Como funciona

const cardsComoFunciona = document.createElement('section');
cardsComoFunciona.classList.add('secao-funciona');
const tituloComoFunciona = document.createElement('h2');
tituloComoFunciona.classList.add('titulo-funciona');
tituloComoFunciona.textContent = "COMO FUNCIONA";
const susbtituloComoFunciona = document.createElement('h3');
susbtituloComoFunciona.classList.add('subtitulo-funciona');
susbtituloComoFunciona.textContent = "Um processo simples para conectar talentos e oportunidades";
const descricaoComoFunciona = document.createElement('p');
descricaoComoFunciona.classList.add('descricao-funciona');
descricaoComoFunciona.textContent = 'Seja para encontrar sua próxima oportunidade ou para contratar os melhores profissionais, a Conecta Talent facilita cada passo do processo'

const containerFunciona = document.createElement('div');
containerFunciona.classList.add('container-funciona');

const candidatoFunciona = document.createElement('div');
candidatoFunciona.classList.add('candidato-funciona');
const cabecalhoFuncionaCandidato = document.createElement('div');
cabecalhoFuncionaCandidato.classList.add('cabecalho-candidato');
const iconeFuncionaCandidato = document.createElement('img');
iconeFuncionaCandidato.classList.add('icone-funciona-candidato');
iconeFuncionaCandidato.src = "assets/images/icons/people.svg"
const textoFuncionaCandidato = document.createElement('div');
textoFuncionaCandidato.classList.add('texto-funciona-candidato');
const tituloFuncionaCandidato = document.createElement('h3');
tituloFuncionaCandidato.classList.add('titulo-funciona-candidato');
tituloFuncionaCandidato.textContent = "Para Candidatos";
const subtituloFuncionaCandidato = document.createElement('p');
subtituloFuncionaCandidato.classList.add('subtitulo-funciona-candidato');
subtituloFuncionaCandidato.textContent = "Encontre vagas e impulsione sua carreira.";

const passosCandidato = document.createElement('div');
passosCandidato.classList.add('passo-candidato');
const passosCandidato1 = document.createElement('div');
passosCandidato1.classList.add('passo-candidato1');
const conteudoPasso1 = document.createElement('div');
conteudoPasso1.classList.add('conteudo-passo1')
const numeroPasso1 = document.createElement('div');
numeroPasso1.classList.add('numero-candidato-passo1');
numeroPasso1.textContent = "1";
const linhaPasso1 = document.createElement('div');
linhaPasso1.classList.add('linha-passo1');
const tituloPasso1 = document.createElement('div');
tituloPasso1.classList.add('titulo-passo1');
tituloPasso1.textContent = "Crie sua conta";
const descricaoPasso1 = document.createElement('div');
descricaoPasso1.classList.add('descricao-passo1');
descricaoPasso1.textContent = "Cadastre-se gratuitamente e tenha acesso a todas as oportunidades."

const passosCandidato2 = document.createElement('div');
passosCandidato2.classList.add('passo-candidato2');
const conteudoPasso2 = document.createElement('div');
conteudoPasso2.classList.add('conteudo-passo2')
const numeroPasso2 = document.createElement('div');
numeroPasso2.classList.add('numero-candidato-passo2');
numeroPasso2.textContent = "2";
const linhaPasso2 = document.createElement('div');
linhaPasso2.classList.add('linha-passo2');
const tituloPasso2 = document.createElement('div');
tituloPasso2.classList.add('titulo-passo2');
tituloPasso2.textContent = "Complete seu perfil";
const descricaoPasso2 = document.createElement('div');
descricaoPasso2.classList.add('descricao-passo2');
descricaoPasso2.textContent = "Adicione suas informações, experiências e habilidades para se destacar."

const passosCandidato3 = document.createElement('div');
passosCandidato3.classList.add('passo-candidato3');
const conteudoPasso3 = document.createElement('div');
conteudoPasso3.classList.add('conteudo-passo3')
const numeroPasso3 = document.createElement('div');
numeroPasso3.classList.add('numero-candidato-passo3');
numeroPasso3.textContent = "3";
const linhaPasso3 = document.createElement('div');
linhaPasso3.classList.add('linha-passo3');
const tituloPasso3 = document.createElement('div');
tituloPasso3.classList.add('titulo-passo3');
tituloPasso3.textContent = "Encontre vagas";
const descricaoPasso3 = document.createElement('div');
descricaoPasso3.classList.add('descricao-passo3');
descricaoPasso3.textContent = "Busque oportunidades compatíveis com o seu perfil e objetivos.";

const passosCandidato4 = document.createElement('div');
passosCandidato4.classList.add('passo-candidato4');
const conteudoPasso4 = document.createElement('div');
conteudoPasso4.classList.add('conteudo-passo4')
const numeroPasso4 = document.createElement('div');
numeroPasso4.classList.add('numero-candidato-passo4');
numeroPasso4.textContent = "4";
const linhaPasso4 = document.createElement('div');
linhaPasso4.classList.add('linha-passo4');
const tituloPasso4 = document.createElement('div');
tituloPasso4.classList.add('titulo-passo4');
tituloPasso4.textContent = "Candidate-se";
const descricaoPasso4 = document.createElement('div');
descricaoPasso4.classList.add('descricao-passo4');
descricaoPasso4.textContent = "Envie sua candidatura e acompanhe o andamento em tempo real.";

const passosCandidato5 = document.createElement('div');
passosCandidato5.classList.add('passo-candidato5');
const conteudoPasso5 = document.createElement('div');
conteudoPasso5.classList.add('conteudo-passo5')
const numeroPasso5 = document.createElement('div');
numeroPasso5.classList.add('numero-candidato-passo5');
numeroPasso5.textContent = "5";
const linhaPasso5 = document.createElement('div');
linhaPasso5.classList.add('linha-passo5');
const tituloPasso5 = document.createElement('div');
tituloPasso5.classList.add('titulo-passo5');
tituloPasso5.textContent = "Seja contratado";
const descricaoPasso5 = document.createElement('div');
descricaoPasso5.classList.add('descricao-passo5');
descricaoPasso5.textContent = "Conecte-se com empresas e conquiste sua próxima oportunidade.";

const empresaFunciona = document.createElement('div');
empresaFunciona.classList.add('empresa-funciona');
const cabecalhoFuncionaEmpresa = document.createElement('div');
cabecalhoFuncionaEmpresa.classList.add('cabecalho-empresa');

const iconeFuncionaEmpresa = document.createElement('img');
iconeFuncionaEmpresa.classList.add('icone-funciona-empresa');
iconeFuncionaEmpresa.src = "assets/images/icons/building.svg";

const textoFuncionaEmpresa = document.createElement('div');
textoFuncionaEmpresa.classList.add('texto-funciona-empresa');

const tituloFuncionaEmpresa = document.createElement('h3');
tituloFuncionaEmpresa.classList.add('titulo-funciona-empresa');
tituloFuncionaEmpresa.textContent = "Para Empresas";

const subtituloFuncionaEmpresa = document.createElement('p');
subtituloFuncionaEmpresa.classList.add('subtitulo-funciona-empresa');
subtituloFuncionaEmpresa.textContent = "Encontre os melhores talentos para sua equipe.";

const passosEmpresa = document.createElement('div');
passosEmpresa.classList.add('passo-empresa');

const passoEmpresa1 = document.createElement('div');
passoEmpresa1.classList.add('passo-empresa1');
const conteudoPassoEmpresa1 = document.createElement('div');
conteudoPassoEmpresa1.classList.add('conteudo-passo-empresa1');
const numeroPassoEmpresa1 = document.createElement('div');
numeroPassoEmpresa1.classList.add('numero-passo-empresa1');
numeroPassoEmpresa1.textContent = "1";
const linhaPassoEmpresa1 = document.createElement('div');
linhaPassoEmpresa1.classList.add('linha-empresa-1');
const tituloPassoEmpresa1 = document.createElement('div');
tituloPassoEmpresa1.classList.add('titulo-passo-empresa1');
tituloPassoEmpresa1.textContent = "Cadastre sua empresa";
const descricaoPassoEmpresa1 = document.createElement('div');
descricaoPassoEmpresa1.classList.add('descricao-passo-empresa1');
descricaoPassoEmpresa1.textContent = "Crie uma conta empresarial e configure seu perfil.";

const passoEmpresa2 = document.createElement('div');
passoEmpresa2.classList.add('passo-empresa2');
const conteudoPassoEmpresa2 = document.createElement('div');
conteudoPassoEmpresa2.classList.add('conteudo-passo-empresa2');
const numeroPassoEmpresa2 = document.createElement('div');
numeroPassoEmpresa2.classList.add('numero-passo-empresa2');
numeroPassoEmpresa2.textContent = "2";
const linhaPassoEmpresa2 = document.createElement('div');
linhaPassoEmpresa2.classList.add('linha-empresa-2');
const tituloPassoEmpresa2 = document.createElement('div');
tituloPassoEmpresa2.classList.add('titulo-passo-empresa2');
tituloPassoEmpresa2.textContent = "Publique uma vaga";
const descricaoPassoEmpresa2 = document.createElement('div');
descricaoPassoEmpresa2.classList.add('descricao-passo-empresa2');
descricaoPassoEmpresa2.textContent = "Descreva a vaga e os requisitos para encontrar o candidato ideal.";

const passoEmpresa3 = document.createElement('div');
passoEmpresa3.classList.add('passo-empresa3');
const conteudoPassoEmpresa3 = document.createElement('div');
conteudoPassoEmpresa3.classList.add('conteudo-passo-empresa3');
const numeroPassoEmpresa3 = document.createElement('div');
numeroPassoEmpresa3.classList.add('numero-passo-empresa3');
numeroPassoEmpresa3.textContent = "3";
const linhaPassoEmpresa3 = document.createElement('div');
linhaPassoEmpresa3.classList.add('linha-empresa-3');
const tituloPassoEmpresa3 = document.createElement('div');
tituloPassoEmpresa3.classList.add('titulo-passo-empresa3');
tituloPassoEmpresa3.textContent = "Receba candidatos";
const descricaoPassoEmpresa3 = document.createElement('div');
descricaoPassoEmpresa3.classList.add('descricao-passo-empresa3');
descricaoPassoEmpresa3.textContent = "Visualize currículos e acompanhe todas as candidaturas.";

const passoEmpresa4 = document.createElement('div');
passoEmpresa4.classList.add('passo-empresa4');
const conteudoPassoEmpresa4 = document.createElement('div');
conteudoPassoEmpresa4.classList.add('conteudo-passo-empresa4');
const numeroPassoEmpresa4 = document.createElement('div');
numeroPassoEmpresa4.classList.add('numero-passo-empresa4');
numeroPassoEmpresa4.textContent = "4";
const linhaPassoEmpresa4 = document.createElement('div');
linhaPassoEmpresa4.classList.add('linha-empresa-4');
const tituloPassoEmpresa4 = document.createElement('div');
tituloPassoEmpresa4.classList.add('titulo-passo-empresa4');
tituloPassoEmpresa4.textContent = "Faça a triagem";
const descricaoPassoEmpresa4 = document.createElement('div');
descricaoPassoEmpresa4.classList.add('descricao-passo-empresa4');
descricaoPassoEmpresa4.textContent = "Organize entrevistas e acompanhe cada etapa do processo seletivo.";

const passoEmpresa5 = document.createElement('div');
passoEmpresa5.classList.add('passo-empresa5');
const conteudoPassoEmpresa5 = document.createElement('div');
conteudoPassoEmpresa5.classList.add('conteudo-passo-empresa5');
const numeroPassoEmpresa5 = document.createElement('div');
numeroPassoEmpresa5.classList.add('numero-passo-empresa5');
numeroPassoEmpresa5.textContent = "5";
const linhaPassoEmpresa5 = document.createElement('div');
linhaPassoEmpresa5.classList.add('linha-empresa-5');
const tituloPassoEmpresa5 = document.createElement('div');
tituloPassoEmpresa5.classList.add('titulo-passo-empresa5');
tituloPassoEmpresa5.textContent = "Contrate";
const descricaoPassoEmpresa5 = document.createElement('div');
descricaoPassoEmpresa5.classList.add('descricao-passo-empresa5');
descricaoPassoEmpresa5.textContent = "Escolha o profissional ideal e fortaleça sua equipe.";

//SEÇÃO FAQ

const secaoFaq = document.createElement('section');
secaoFaq.classList.add('secao-faq');
const tituloFaq = document.createElement('h2');
tituloFaq.classList.add('titulo-faq');
tituloFaq.textContent = "PERGUNTAS FREQUENTES";
const subtituloFaq = document.createElement('h3');
subtituloFaq.classList.add('subtitulo-faq');
subtituloFaq.textContent = "Tire suas dúvidas sobre a Conecta Talent";
const descricaoFaq = document.createElement('p');
descricaoFaq.classList.add('descricao-faq');
descricaoFaq.textContent = "Encontre respostas para as perguntas mais comuns de candidatos e empresas."
const containerFaq = document.createElement('div');
containerFaq.classList.add('container-faq');

const itemFaq1 = document.createElement('div');
itemFaq1.classList.add('item-faq1');
const pergunta1 = document.createElement('button');
pergunta1.classList.add('pergunta-faq1');
pergunta1.textContent = "Como faço para criar uma conta?"
const resposta1 = document.createElement('p');
resposta1.classList.add('resposta-faq1');
resposta1.textContent = "Cadastrar-se, escolha se deseja criar uma conta como candidato ou empresa e preencha as informações solicitadas."

const itemFaq2 = document.createElement('div');
itemFaq2.classList.add('item-faq2');
const pergunta2 = document.createElement('button');
pergunta2.classList.add('pergunta-faq2');
pergunta2.textContent = "O cadastro é gratuito?"
const resposta2 = document.createElement('p');
resposta2.classList.add('resposta-faq2');
resposta2.textContent = "Sim. O cadastro na Conecta Talent é gratuito para candidatos e empresas."

const itemFaq3 = document.createElement('div');
itemFaq3.classList.add('item-faq3');
const pergunta3 = document.createElement('button');
pergunta3.classList.add('pergunta-faq3');
pergunta3.textContent = "Como posso me candidatar a uma vaga?"
const resposta3 = document.createElement('p');
resposta3.classList.add('resposta-faq3');
resposta3.textContent = "Após completar seu perfil, basta acessar a lista de vagas, escolher a oportunidade desejada e clicar em Candidatar-se. "

const itemFaq4 = document.createElement('div');
itemFaq4.classList.add('item-faq4');
const pergunta4 = document.createElement('button');
pergunta4.classList.add('pergunta-faq4');
pergunta4.textContent = "Como uma empresa publica uma vaga?"
const resposta4 = document.createElement('p');
resposta4.classList.add('resposta-faq4');
resposta4.textContent = "Após criar uma conta empresarial, acesse o painel da empresa, informe os detalhes da oportunidade e clique em publicar vaga. "

const itemFaq5 = document.createElement('div');
itemFaq5.classList.add('item-faq5');
const pergunta5 = document.createElement('button');
pergunta5.classList.add('pergunta-faq5');
pergunta5.textContent = "Posso acompanhar minhas candidaturas?"
const resposta5 = document.createElement('p');
resposta5.classList.add('resposta-faq5');
resposta5.textContent = "Sim. No painel do candidato você pode visualizar todas as vagas para as quais se candidatou e acompanhar o status de cada processo. "

const itemFaq6 = document.createElement('div');
itemFaq6.classList.add('item-faq6');
const pergunta6 = document.createElement('button');
pergunta6.classList.add('pergunta-faq6');
pergunta6.textContent = "Meus dados estão seguros?"
const resposta6 = document.createElement('p');
resposta6.classList.add('resposta-faq6');
resposta6.textContent = " Sim. A Conecta Talent utiliza boas práticas de segurança para proteger as informações de candidatos e empresas. "


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
heroImagem.appendChild(imagemHero);
heroConteudo.appendChild(areaBusca); //aqui começa a área que busca vaga
areaBusca.appendChild(tituloVagasHero);
areaBusca.appendChild(tituloBusqueCargo);
areaBusca.appendChild(areaBuscaInput);
areaBuscaInput.appendChild(campoBuscarVagas);
campoBuscarVagas.appendChild(iconePesquisar);
campoBuscarVagas.appendChild(inputBuscarVagas);
areaBuscaInput.appendChild(campoBuscarLocalizacao);
campoBuscarLocalizacao.appendChild(iconeLocalizacao);
campoBuscarLocalizacao.appendChild(inputLocalizacao);
areaBuscaInput.appendChild(campobtnBuscar);
campobtnBuscar.appendChild(btnBuscarVagas);
btnBuscarVagas.appendChild(iconePesquisarBranco);

cardsBeneficio.appendChild(tituloBeneficio);
cardsBeneficio.appendChild(subtituloBeneficio);
cardsBeneficio.appendChild(cardsContainer);

cardsContainer.appendChild(cardCandidato);
cardCandidato.appendChild(iconeCandidato);
cardCandidato.appendChild(tituloCandidato); 
cardCandidato.appendChild(conteudoCandidato);
cardCandidato.appendChild(btnSaibaCandidato);
cardsContainer.appendChild(cardEmpresa);
cardEmpresa.appendChild(iconeEmpresa);
cardEmpresa.appendChild(btnSaibaEmpresa);
cardsContainer.appendChild(cardProcessos);
cardProcessos.appendChild(iconeProcesso);
cardProcessos.appendChild(btnSaibaProcesso);
cardsContainer.appendChild(cardSeguranca);
cardSeguranca.appendChild(iconeSeguranca);
cardSeguranca.appendChild(btnSaibaSeguranca);

cardCandidato.appendChild(tituloCandidato);
cardCandidato.appendChild(conteudoCandidato);
cardEmpresa.appendChild(tituloEmpresa);
cardEmpresa.appendChild(conteudoEmpresa);
cardProcessos.appendChild(tituloProcessos);
cardProcessos.appendChild(conteudoProcessos);
cardSeguranca.appendChild(tituloSeguranca);
cardSeguranca.appendChild(conteudoSeguranca);

cardsComoFunciona.appendChild(tituloComoFunciona);
cardsComoFunciona.appendChild(susbtituloComoFunciona);
cardsComoFunciona.appendChild(descricaoComoFunciona);
cardsComoFunciona.appendChild(containerFunciona);
containerFunciona.appendChild(candidatoFunciona);
candidatoFunciona.appendChild(cabecalhoFuncionaCandidato);
cabecalhoFuncionaCandidato.appendChild(iconeFuncionaCandidato);
cabecalhoFuncionaCandidato.appendChild(textoFuncionaCandidato);
textoFuncionaCandidato.appendChild(tituloFuncionaCandidato);
textoFuncionaCandidato.appendChild(subtituloFuncionaCandidato);
containerFunciona.appendChild(empresaFunciona);
candidatoFunciona.appendChild(passosCandidato);
passosCandidato.appendChild(passosCandidato1)
passosCandidato1.appendChild(numeroPasso1);
passosCandidato1.appendChild(linhaPasso1);
passosCandidato1.appendChild(conteudoPasso1);
conteudoPasso1.appendChild(tituloPasso1);
conteudoPasso1.appendChild(descricaoPasso1);

passosCandidato.appendChild(passosCandidato2)
passosCandidato2.appendChild(numeroPasso2);
passosCandidato2.appendChild(linhaPasso2);
passosCandidato2.appendChild(conteudoPasso2);
conteudoPasso2.appendChild(tituloPasso2);
conteudoPasso2.appendChild(descricaoPasso2);

passosCandidato.appendChild(passosCandidato3)
passosCandidato3.appendChild(numeroPasso3);
passosCandidato3.appendChild(linhaPasso3);
passosCandidato3.appendChild(conteudoPasso3);
conteudoPasso3.appendChild(tituloPasso3);
conteudoPasso3.appendChild(descricaoPasso3);

passosCandidato.appendChild(passosCandidato4)
passosCandidato4.appendChild(numeroPasso4);
passosCandidato4.appendChild(linhaPasso4);
passosCandidato4.appendChild(conteudoPasso4);
conteudoPasso4.appendChild(tituloPasso4);
conteudoPasso4.appendChild(descricaoPasso4);

passosCandidato.appendChild(passosCandidato5)
passosCandidato5.appendChild(numeroPasso5);
passosCandidato5.appendChild(linhaPasso5);
passosCandidato5.appendChild(conteudoPasso5);
conteudoPasso5.appendChild(tituloPasso5);
conteudoPasso5.appendChild(descricaoPasso5);

empresaFunciona.appendChild(cabecalhoFuncionaEmpresa);
cabecalhoFuncionaEmpresa.appendChild(iconeFuncionaEmpresa);
cabecalhoFuncionaEmpresa.appendChild(textoFuncionaEmpresa);

textoFuncionaEmpresa.appendChild(tituloFuncionaEmpresa);
textoFuncionaEmpresa.appendChild(subtituloFuncionaEmpresa);

empresaFunciona.appendChild(passosEmpresa);


passosEmpresa.appendChild(passoEmpresa1);
passoEmpresa1.appendChild(numeroPassoEmpresa1);
passoEmpresa1.appendChild(linhaPassoEmpresa1);
passoEmpresa1.appendChild(conteudoPassoEmpresa1);
conteudoPassoEmpresa1.appendChild(tituloPassoEmpresa1);
conteudoPassoEmpresa1.appendChild(descricaoPassoEmpresa1);


passosEmpresa.appendChild(passoEmpresa2);
passoEmpresa2.appendChild(numeroPassoEmpresa2);
passoEmpresa2.appendChild(linhaPassoEmpresa2);
passoEmpresa2.appendChild(conteudoPassoEmpresa2);
conteudoPassoEmpresa2.appendChild(tituloPassoEmpresa2);
conteudoPassoEmpresa2.appendChild(descricaoPassoEmpresa2);

passosEmpresa.appendChild(passoEmpresa3);
passoEmpresa3.appendChild(numeroPassoEmpresa3);
passoEmpresa3.appendChild(linhaPassoEmpresa3);
passoEmpresa3.appendChild(conteudoPassoEmpresa3);
conteudoPassoEmpresa3.appendChild(tituloPassoEmpresa3);
conteudoPassoEmpresa3.appendChild(descricaoPassoEmpresa3);


passosEmpresa.appendChild(passoEmpresa4);
passoEmpresa4.appendChild(numeroPassoEmpresa4);
passoEmpresa4.appendChild(linhaPassoEmpresa4);
passoEmpresa4.appendChild(conteudoPassoEmpresa4);
conteudoPassoEmpresa4.appendChild(tituloPassoEmpresa4);
conteudoPassoEmpresa4.appendChild(descricaoPassoEmpresa4);

passosEmpresa.appendChild(passoEmpresa5);
passoEmpresa5.appendChild(numeroPassoEmpresa5);
passoEmpresa5.appendChild(linhaPassoEmpresa5);
passoEmpresa5.appendChild(conteudoPassoEmpresa5);
conteudoPassoEmpresa5.appendChild(tituloPassoEmpresa5);
conteudoPassoEmpresa5.appendChild(descricaoPassoEmpresa5);

secaoFaq.appendChild(tituloFaq);
secaoFaq.appendChild(subtituloFaq);
secaoFaq.appendChild(descricaoFaq);
secaoFaq.appendChild(containerFaq);
containerFaq.appendChild(itemFaq1)
itemFaq1.appendChild(pergunta1);
itemFaq1.appendChild(resposta1);

containerFaq.appendChild(itemFaq2)
itemFaq2.appendChild(pergunta2);
itemFaq2.appendChild(resposta2);

containerFaq.appendChild(itemFaq3)
itemFaq3.appendChild(pergunta3);
itemFaq3.appendChild(resposta3);

containerFaq.appendChild(itemFaq4)
itemFaq4.appendChild(pergunta4);
itemFaq4.appendChild(resposta4);

containerFaq.appendChild(itemFaq5)
itemFaq5.appendChild(pergunta5);
itemFaq5.appendChild(resposta5);

containerFaq.appendChild(itemFaq6)
itemFaq6.appendChild(pergunta6);
itemFaq6.appendChild(resposta6);

app.appendChild(header); //coloca header na página
app.appendChild(main); //coloca main na pagina
app.appendChild(cardsBeneficio); //cardsBeneficio na pagina
app.appendChild(cardsComoFunciona); //cardsComoFunciona na pagina
app.appendChild(secaoFaq); // coloca FAQ na página

console.log(acesso);



