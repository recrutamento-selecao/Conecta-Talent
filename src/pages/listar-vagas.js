import { criarSidebar } from "../components/sidebar.js";
import { criarCardIndicador } from "../components/card-indicador.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("listar-vagas");

const cabecalhoPagina = document.createElement('div');
cabecalhoPagina.classList.add('cabecalho-pagina');

const infoCabecalho = document.createElement('div');
infoCabecalho.classList.add('info-cabecalho');

const tituloPagina = document.createElement('h1');
tituloPagina.classList.add('titulo-pagina');
tituloPagina.textContent = 'Gerenciar vagas';

const descricaoPagina = document.createElement('p');
descricaoPagina.classList.add('descricao-pagina');
descricaoPagina.textContent = 'Gerencie as vagas publicadas pela sua empresa';

const btnCriarVaga = document.createElement('button');
btnCriarVaga.classList.add('btn-criar-vaga');

const iconeAdicionar = document.createElement('span');
iconeAdicionar.classList.add('icone-adicionar');
iconeAdicionar.textContent = '+';

const textoBotao = document.createElement('span');
textoBotao.textContent = 'Criar nova vaga';


const containerIndicadores = document.createElement('div');
containerIndicadores.classList.add('container-indicadores');

const vagasAtivas = {
    titulo: 'Vagas ativas',
    valor: 22,
    icone: '../assets/icons/briefcase.svg',
    descricaoImagem: 'Ícone de vagas ativas',
    variacao: '↑ 12% no mês anterior'
};

const vagasTriagem = {
    titulo: 'Em triagem',
    valor: 12,
    icone: '../assets/icons/users-group.svg',
    descricaoImagem: 'Ícone de vagas em triagem',
    variacao: '↑ 12% no mês anterior'
};

const contratacoes = {
    titulo: 'Contratações',
    valor: 21,
    icone: '../assets/icons/user-check.svg',
    descricaoImagem: 'Ícone de contratações',
    variacao: '↑ 12% no mês anterior'
};

const cardVagasAtivas = criarCardIndicador(vagasAtivas);

const cardVagasTriagem = criarCardIndicador(vagasTriagem);

const cardContratacoes = criarCardIndicador(contratacoes);


app.appendChild(criarSidebar("empresa", "Kiron LTDA"));
app.appendChild(main);
main.appendChild(cabecalhoPagina);
cabecalhoPagina.appendChild(infoCabecalho);
infoCabecalho.appendChild(tituloPagina);
infoCabecalho.appendChild(descricaoPagina);
cabecalhoPagina.appendChild(btnCriarVaga);
btnCriarVaga.appendChild(iconeAdicionar);
btnCriarVaga.appendChild(textoBotao);
main.appendChild(containerIndicadores);
containerIndicadores.appendChild(cardVagasAtivas);
containerIndicadores.appendChild(cardVagasTriagem);
containerIndicadores.appendChild(cardContratacoes);