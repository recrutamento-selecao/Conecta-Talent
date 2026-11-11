import { criarBarraBusca } from '../components/barra-busca.js';
import { criarFiltrosVagas } from '../components/filtros-vaga.js';
import { criarListaVagas } from '../components/lista-vagas.js';


const TODAS_AS_VAGAS = [
    { id: 1, titulo: "Analista de dados júnior", empresa: "Tech Data", localizacao: "Sorocaba, SP", modelo: "Híbrido", contrato: "CLT", nivel: "Júnior", salario: "3.500", dias: 2 },
    { id: 2, titulo: "Analista de dados Pleno", empresa: "FinTech SA", localizacao: "São Paulo, SP", modelo: "Híbrido", contrato: "CLT", nivel: "Pleno", salario: "6.800", dias: 2 },
    { id: 3, titulo: "Analista de dados júnior", empresa: "BlueCore Sistemas", localizacao: "Porto Feliz, SP", modelo: "Híbrido", contrato: "PJ", nivel: "Júnior", salario: "4.014", dias: 3 },
    { id: 4, titulo: "Desenvolvedor Frontend", empresa: "TechCorp", localizacao: "São Paulo, SP", modelo: "Remoto", contrato: "CLT", nivel: "Sênior", salario: "10.000", dias: 1 }
];

const FILTROS_DO_BANCO = [
    {
        chave: "localizacao",
        titulo: "Localização",
        opcoes: [
            { rotulo: "São Paulo, SP", valor: "São Paulo, SP", selecionado: false },
            { rotulo: "Sorocaba, SP", valor: "Sorocaba, SP", selecionado: false },
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
    
    const main = document.createElement("main");

    main.classList.add("inicio-conteudo-principal", "inicio-container-publico"); 

    const layout = document.createElement("div");
    layout.style.display = "flex";
    layout.style.gap = "2rem";
    layout.style.alignItems = "flex-start";
    layout.style.padding = "2rem"; 
    layout.style.maxWidth = "1200px";
    layout.style.margin = "0 auto";

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
        
        containerListaVagasWrapper.appendChild(criarListaVagas(vagasFiltradas, true)); 
    };

    const barraBuscaComponente = criarBarraBusca((cargo, local) => {
        filtroTextoBusca = { cargo, local };
        atualizarVagasExibidas();
    });
    
    barraBuscaComponente.style.maxWidth = "1200px";
    barraBuscaComponente.style.margin = "2rem auto";
    barraBuscaComponente.style.padding = "0 2rem";
    
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
}