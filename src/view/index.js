
import { criarBarraBusca } from './components/barra-busca.js';
import { criarFiltrosVagas } from './components/filtros-vaga.js';
import { criarListaVagas } from './components/lista-vagas.js';
import renderLoginPage from './pages/login.js';

renderLoginPage();
const USUARIO_LOGADO = { nome: "João Oliveira", perfil: "candidato" };

const TODAS_AS_VAGAS = [
    { id: 1, titulo: "Analista de dados júnior", empresa: "", localizacao: "Sorocaba, SP", modelo: "Híbrido", contrato: "CLT", nivel: "Júnior", salario: "3.500", dias: 2 },
    { id: 2, titulo: "Analista de dados Pleno", empresa: "", localizacao: "São Paulo, SP", modelo: "Híbrido", contrato: "CLT", nivel: "Pleno", salario: "6.800", dias: 2 },
    { id: 3, titulo: "Analista de dados júnior", empresa: "BlueCore Sistemas", localizacao: "Porto Feliz, SP", modelo: "Híbrido", contrato: "PJ", nivel: "Júnior", salario: "4.014", dias: 3 },
    { id: 4, titulo: "Desenvolvedor Frontend", empresa: "TechCorp", localizacao: "São Paulo, SP", modelo: "Remoto", contrato: "CLT", nivel: "Sênior", salario: "10.000", dias: 1 }
];

const FILTROS_DO_BANCO = [
    {
        chave: "localizacao",
        titulo: "Localização",
        opcoes: [
            { rotulo: "São Paulo, SP", valor: "São Paulo, SP", selecionado: true },
            { rotulo: "Sorocaba, SP", valor: "Sorocaba, SP", selecionado: true },
            { rotulo: "Porto Feliz, SP", valor: "Porto Feliz, SP", selecionado: true }
        ]
    },
    {
        chave: "modelo",
        titulo: "Modelo de trabalho",
        opcoes: [
            { rotulo: "Híbrido", valor: "Híbrido", selecionado: true },
            { rotulo: "Presencial", valor: "Presencial", selecionado: false },
            { rotulo: "Remoto", valor: "Remoto", selecionado: false }
        ]
    },
    {
        chave: "contrato",
        titulo: "Tipo de contrato",
        opcoes: [
            { rotulo: "CLT", valor: "CLT", selecionado: true },
            { rotulo: "PJ", valor: "PJ", selecionado: true }
        ]
    },
    {
        chave: "nivel",
        titulo: "Nível de experiência",
        opcoes: [
            { rotulo: "Júnior", valor: "Júnior", selecionado: true },
            { rotulo: "Pleno", valor: "Pleno", selecionado: true },
            { rotulo: "Sênior", valor: "Sênior", selecionado: false }
        ]
    }
];


let filtroTextoBusca = { cargo: "Analista de Dados", local: "Sorocaba - SP" };
let filtrosCheckbox = {};

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = criarSidebar(USUARIO_LOGADO.perfil, USUARIO_LOGADO.nome);
    document.body.appendChild(sidebar);

    const main = document.createElement("main");
    main.classList.add("conteudo-principal");

    const layout = document.createElement("div");
    layout.style.display = "flex";
    layout.style.gap = "1.5rem";
    layout.style.alignItems = "flex-start";

    const containerListaVagasWrapper = document.createElement("div");
    containerListaVagasWrapper.style.flex = "1";


    const atualizarVagasExibidas = () => {
        const vagasFiltradas = TODAS_AS_VAGAS.filter((vaga) => {

            const atendeCargo = !filtroTextoBusca.cargo ||
                vaga.titulo.toLowerCase().includes(filtroTextoBusca.cargo.toLowerCase()) ||
                vaga.empresa.toLowerCase().includes(filtroTextoBusca.cargo.toLowerCase());

            const atendeLocalTexto = !filtroTextoBusca.local ||
                vaga.localizacao.toLowerCase().includes(filtroTextoBusca.local.split('-')[0].trim().toLowerCase());


            const atendeLocal = !filtrosCheckbox.localizacao || filtrosCheckbox.localizacao.length === 0 || filtrosCheckbox.localizacao.includes(vaga.localizacao);
            const atendeModelo = !filtrosCheckbox.modelo || filtrosCheckbox.modelo.length === 0 || filtrosCheckbox.modelo.includes(vaga.modelo);
            const atendeContrato = !filtrosCheckbox.contrato || filtrosCheckbox.contrato.length === 0 || filtrosCheckbox.contrato.includes(vaga.contrato);
            const atendeNivel = !filtrosCheckbox.nivel || filtrosCheckbox.nivel.length === 0 || filtrosCheckbox.nivel.includes(vaga.nivel);

            return atendeCargo && atendeLocalTexto && atendeLocal && atendeModelo && atendeContrato && atendeNivel;
        });


        containerListaVagasWrapper.innerHTML = "";
        containerListaVagasWrapper.appendChild(criarListaVagas(vagasFiltradas));
    };


    const barraBuscaComponente = criarBarraBusca((cargo, local) => {
        filtroTextoBusca = { cargo, local };
        atualizarVagasExibidas();
    });
    main.appendChild(barraBuscaComponente);

    const filtrosComponente = criarFiltrosVagas(FILTROS_DO_BANCO, (filtrosAtivos) => {
        filtrosCheckbox = filtrosAtivos;
        atualizarVagasExibidas();
    });

    layout.appendChild(filtrosComponente);
    layout.appendChild(containerListaVagasWrapper);

    main.appendChild(layout);
    document.body.appendChild(main);

    atualizarVagasExibidas();


    document.addEventListener('DOMContentLoaded', () => {

        const container = document.createElement("div");
        container.id = "login-container";
        document.body.appendChild(container);

        renderLoginPage();
        document.addEventListener('DOMContentLoaded', () => {
    iniciarRouter();
});
    });

});
