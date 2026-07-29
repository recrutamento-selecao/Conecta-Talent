import { criarSidebar } from "../components/sidebar.js";
import { criarCardIndicador } from "../components/card-indicador.js";

const app = document.getElementById("app");

const main = document.createElement("main");
main.classList.add("listar-recrutadores");

const cabecalhoPagina = document.createElement('div');
cabecalhoPagina.classList.add('cabecalho-pagina');

const infoCabecalho = document.createElement('div');
infoCabecalho.classList.add('info-cabecalho');

const tituloPagina = document.createElement('h1');
tituloPagina.classList.add('titulo-pagina');
tituloPagina.textContent = 'Gerenciar recrutadores';

const descricaoPagina = document.createElement('p');
descricaoPagina.classList.add('descricao-pagina');
descricaoPagina.textContent = 'Gerencie os recrutadores cadastrados na sua empresa';

const btnCadastrarRecrutador = document.createElement('button');
btnCadastrarRecrutador.classList.add('btn-cadastrar-recrutador');

const iconeAdicionar = document.createElement('span');
iconeAdicionar.classList.add('icone-adicionar');
iconeAdicionar.textContent = '+';

const textoBotao = document.createElement('span');
textoBotao.textContent = 'Cadastrar recrutador';


const containerIndicadores = document.createElement('div');
containerIndicadores.classList.add('container-indicadores');

const totalRecrutadores = {
    titulo: 'Total de recrutadores',
    valor: 6,
    icone: "../assets/icons/users-group.svg",
    descricaoImagem: 'Ícone de recrutadores'
};

const recrutadoresAtivos = {
    titulo: 'Ativos',
    valor: 4,
    icone: '',
    descricaoImagem: 'Ícone ativo'
};

const recrutadoresInativos = {
    titulo: 'Inativos',
    valor: 2,
    icone: '',
    descricaoImagem: 'Ícone inativo'
};

const recrutadoresAcessoTotal = {
    titulo: 'Com acesso total',
    valor: 2,
    icone: '',
    descricaoImagem: 'Ícone acesso total'
};

const cardTotalRecrutadores = criarCardIndicador(totalRecrutadores);

const cardRecrutadoresAtivos = criarCardIndicador(recrutadoresAtivos);

const cardRecrutadoresInativos = criarCardIndicador(recrutadoresInativos);

const cardRecrutadoresAcessoTotal = criarCardIndicador(recrutadoresAcessoTotal);


app.appendChild(criarSidebar("empresa", "Kiron LTDA"));
app.appendChild(main);
main.appendChild(cabecalhoPagina);
cabecalhoPagina.appendChild(infoCabecalho);
infoCabecalho.appendChild(tituloPagina);
infoCabecalho.appendChild(descricaoPagina);
cabecalhoPagina.appendChild(btnCadastrarRecrutador);
btnCadastrarRecrutador.appendChild(iconeAdicionar);
btnCadastrarRecrutador.appendChild(textoBotao);
main.appendChild(containerIndicadores);
containerIndicadores.appendChild(cardTotalRecrutadores);
containerIndicadores.appendChild(cardRecrutadoresAtivos);
containerIndicadores.appendChild(cardRecrutadoresInativos);
containerIndicadores.appendChild(cardRecrutadoresAcessoTotal);

