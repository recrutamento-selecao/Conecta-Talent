import { criarBarraBusca } from '../components/barra-busca.js';
import { criarFiltrosVagas } from '../components/filtros-vaga.js';
import { criarListaVagas } from '../components/lista-vagas.js';
import { criarHeader } from '../components/header.js';

const TODAS_AS_VAGAS = [
   
    { id: 1, titulo: "Analista de dados júnior", empresa: "Tech Data", localizacao: "Sorocaba, SP", modelo: "Híbrido", contrato: "CLT", nivel: "Júnior", salario: "3.500", dias: 2 },
    { id: 2, titulo: "Analista de dados Pleno", empresa: "FinTech SA", localizacao: "São Paulo, SP", modelo: "Híbrido", contrato: "CLT", nivel: "Pleno", salario: "6.800", dias: 2 },
    { id: 3, titulo: "Analista de dados júnior", empresa: "BlueCore Sistemas", localizacao: "Porto Feliz, SP", modelo: "Híbrido", contrato: "PJ", nivel: "Júnior", salario: "4.014", dias: 3 },
    { id: 4, titulo: "Desenvolvedor Frontend", empresa: "TechCorp", localizacao: "São Paulo, SP", modelo: "Remoto", contrato: "CLT", nivel: "Sênior", salario: "10.000", dias: 1 },
    { id: 5, titulo: "Assistente Administrativo", empresa: "Grupo Votorantim Logística", localizacao: "Sorocaba, SP", modelo: "Presencial", contrato: "CLT", nivel: "Júnior", salario: "2.450", dias: 1 },
    { id: 6, titulo: "Atendente de Loja / Vendas", empresa: "Moda & Estilo Brasil", localizacao: "Sorocaba, SP", modelo: "Presencial", contrato: "CLT", nivel: "Júnior", salario: "2.100", dias: 1 },
    { id: 7, titulo: "Auxiliar de Logística e Estoque", empresa: "TransRápido Express", localizacao: "Porto Feliz, SP", modelo: "Presencial", contrato: "CLT", nivel: "Júnior", salario: "2.300", dias: 3 },
    { id: 8, titulo: "Analista de Marketing Digital", empresa: "Agência Impulso", localizacao: "São Paulo, SP", modelo: "Remoto", contrato: "PJ", nivel: "Pleno", salario: "4.800", dias: 2 },
    { id: 9, titulo: "Recepcionista Bilíngue", empresa: "Hotel Plaza Executive", localizacao: "Sorocaba, SP", modelo: "Presencial", contrato: "CLT", nivel: "Júnior", salario: "2.600", dias: 4 },
    { id: 10, titulo: "Técnico de Suporte em TI", empresa: "InovaSistemas", localizacao: "Votorantim, SP", modelo: "Híbrido", contrato: "CLT", nivel: "Júnior", salario: "2.900", dias: 1 },
    { id: 11, titulo: "Consultor Comercial Interno", empresa: "Conecta Soluções", localizacao: "Porto Feliz, SP", modelo: "Híbrido", contrato: "CLT", nivel: "Pleno", salario: "3.400", dias: 5 },
    { id: 12, titulo: "Assistente de Recursos Humanos", empresa: "RH Integrado", localizacao: "Sorocaba, SP", modelo: "Híbrido", contrato: "CLT", nivel: "Júnior", salario: "2.750", dias: 2 }
];

const FILTROS_DO_BANCO = [
    {
        chave: "localizacao",
        titulo: "Localização",
        opcoes: [
            { rotulo: "São Paulo, SP", valor: "São Paulo, SP", selecionado: false },
            { rotulo: "Sorocaba, SP", valor: "Sorocaba, SP", selecionado: false },
            { rotulo: "Votorantim, SP", valor: "Votorantim, SP", selecionado: false },
            { rotulo: "Porto Feliz, SP", valor: "Porto Feliz, SP", selecionado: false }
        ]
    },
    {
        chave: "modelo",
        titulo: "Modelo de trabalho",
        opcoes: [
            { rotulo: "Híbrido", valor: "Híbrido", selecionado: false },
            { rotulo: "Presencial", valor: "Presencial", selecionado: false },
            { rotulo: "Remoto", valor: "Remoto", selecionado: false }
        ]
    },
    {
        chave: "contrato",
        titulo: "Tipo de contrato",
        opcoes: [
            { rotulo: "CLT", valor: "CLT", selecionado: false },
            { rotulo: "PJ", valor: "PJ", selecionado: false }
        ]
    },
    {
        chave: "nivel",
        titulo: "Nível de experiência",
        opcoes: [
            { rotulo: "Júnior", valor: "Júnior", selecionado: false },
            { rotulo: "Pleno", valor: "Pleno", selecionado: false },
            { rotulo: "Sênior", valor: "Sênior", selecionado: false }
        ]
    }
];

let filtroTextoBusca = { cargo: "", local: "" };
let filtrosCheckbox = {};

export default function vagasInicio() {
    // Reseta os estados a cada abertura da página
    filtroTextoBusca = { cargo: "", local: "" };
    filtrosCheckbox = {};

    // Verifica se veio alguma busca ou tag clicada da tela Home
    const buscaSalva = sessionStorage.getItem('buscaInicial');
    if (buscaSalva) {
        try {
            const dados = JSON.parse(buscaSalva);
            filtroTextoBusca.cargo = dados.cargo || "";
            filtroTextoBusca.local = dados.localizacao || "";
        } catch (e) {
            console.error("Erro ao ler buscaInicial:", e);
        }
        sessionStorage.removeItem('buscaInicial');
    }

    const main = document.createElement("main");
    main.classList.add("inicio-conteudo-principal", "inicio-container-publico");

    // 1. HEADER PÚBLICO (Logo à esquerda + Botões Entrar / Cadastrar-se à direita)
    main.appendChild(criarHeader({ mostrarNavegacao: false }));

    // 2. BARRA DE BUSCA
    const topoContainer = document.createElement("div");
    topoContainer.style.display = "flex";
    topoContainer.style.justifyContent = "center";
    topoContainer.style.padding = "1.5rem 2.5rem 1rem 2.5rem";
    topoContainer.style.maxWidth = "1600px";
    topoContainer.style.margin = "0 auto";

    const barraBuscaComponente = criarBarraBusca((cargo, local) => {
        filtroTextoBusca = { cargo, local };
        atualizarVagasExibidas();
    });
    barraBuscaComponente.style.width = "100%";
    barraBuscaComponente.style.maxWidth = "1200px";
    barraBuscaComponente.style.margin = "0";

    // Preenche visualmente os inputs da barra de busca caso tenha vindo termo da Home
    const inputsBusca = barraBuscaComponente.querySelectorAll('input');
    if (inputsBusca.length >= 2) {
        inputsBusca[0].value = filtroTextoBusca.cargo;
        inputsBusca[1].value = filtroTextoBusca.local;
    }

    topoContainer.appendChild(barraBuscaComponente);
    main.appendChild(topoContainer);

    // 3. CORPO: Filtros bem à esquerda e lista de vagas centralizada no espaço restante
    const layout = document.createElement("div");
    layout.style.display = "flex";
    layout.style.gap = "2.5rem";
    layout.style.alignItems = "flex-start";
    layout.style.padding = "1rem 2.5rem 3rem 1.25rem";
    layout.style.maxWidth = "1600px";
    layout.style.margin = "0 auto";
    layout.style.boxSizing = "border-box";

    const areaCentralVagas = document.createElement("div");
    areaCentralVagas.style.flex = "1";
    areaCentralVagas.style.display = "flex";
    areaCentralVagas.style.justifyContent = "center";

    const containerListaVagasWrapper = document.createElement("div");
    containerListaVagasWrapper.style.width = "100%";
    containerListaVagasWrapper.style.maxWidth = "860px";

    areaCentralVagas.appendChild(containerListaVagasWrapper);

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
        containerListaVagasWrapper.appendChild(criarListaVagas(vagasFiltradas, true));
    };

    const filtrosComponente = criarFiltrosVagas(FILTROS_DO_BANCO, (filtrosAtivos) => {
        filtrosCheckbox = filtrosAtivos;
        atualizarVagasExibidas();
    });
    filtrosComponente.style.flexShrink = "0";

    layout.appendChild(filtrosComponente);
    layout.appendChild(areaCentralVagas);
    main.appendChild(layout);

    atualizarVagasExibidas();

    return main;
}