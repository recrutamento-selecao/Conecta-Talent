import { criarBarraBusca } from '../components/barra-busca.js';
import { criarFiltrosVagas } from '../components/filtros-vaga.js';
import { criarListaVagas } from '../components/lista-vagas.js';
import { criarHeader } from '../components/header.js';
import { abrirModalCandidatar } from './modal-candidatar-se.js'; 
// Importa o teu cliente Supabase configurado (ajusta o caminho se necessário)
// import { supabase } from '../services/supabaseClient.js';

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
 
export function renderVagasInicio() {
    let filtroTextoBusca = { cargo: "", local: "" };
    let filtrosCheckbox = {};
 
    // Lê os dados salvos da Home vindos via sessionStorage
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
 
    // Elemento principal utilizando a classe do CSS
    const main = document.createElement("main");
    main.classList.add("page-vagas-inicio");
 
    // 1. HEADER PÚBLICO
    main.appendChild(criarHeader({ mostrarNavegacao: false }));
 
    // Container da lista de vagas
    const containerListaVagasWrapper = document.createElement("div");
    containerListaVagasWrapper.classList.add("vi-lista-vagas-wrapper");
 
    // Função assíncrona para buscar e filtrar vagas diretamente no Supabase ou localmente
    async function atualizarVagasExibidas() {
        try {
            // Exemplo de consulta ao Supabase (ajusta o nome da tabela para a tua, ex: "vagas")
            /* 
            let query = supabase.from('vagas').select('*');

            if (filtroTextoBusca.cargo) {
                query = query.or(`titulo.ilike.%${filtroTextoBusca.cargo}%,empresa.ilike.%${filtroTextoBusca.cargo}%`);
            }

            if (filtroTextoBusca.local) {
                const cidadeLimpa = filtroTextoBusca.local.split('-')[0].trim();
                query = query.ilike('localizacao', `%${cidadeLimpa}%`);
            }

            if (filtrosCheckbox.localizacao && filtrosCheckbox.localizacao.length > 0) {
                query = query.in('localizacao', filtrosCheckbox.localizacao);
            }
            if (filtrosCheckbox.modelo && filtrosCheckbox.modelo.length > 0) {
                query = query.in('modelo', filtrosCheckbox.modelo);
            }
            if (filtrosCheckbox.contrato && filtrosCheckbox.contrato.length > 0) {
                query = query.in('contrato', filtrosCheckbox.contrato);
            }
            if (filtrosCheckbox.nivel && filtrosCheckbox.nivel.length > 0) {
                query = query.in('nivel', filtrosCheckbox.nivel);
            }

            const { data: vagasFiltradas, error } = await query;
            if (error) throw error;
            */

            // --- CÓDIGO DE TESTE LOCAL (Enquanto ligas a base de dados) ---
            const TODAS_AS_VAGAS_LOCAL = [
                { id: 1, titulo: "Analista de dados júnior", empresa: "Tech Data", localizacao: "Sorocaba, SP", modelo: "Híbrido", contrato: "CLT", nivel: "Júnior", salario: "3.500", dias: 2 },
                { id: 2, titulo: "Analista de dados Pleno", empresa: "FinTech SA", localizacao: "São Paulo, SP", modelo: "Híbrido", contrato: "CLT", nivel: "Pleno", salario: "6.800", dias: 2 },
                { id: 3, titulo: "Analista de dados júnior", empresa: "BlueCore Sistemas", localizacao: "Porto Feliz, SP", modelo: "Híbrido", contrato: "PJ", nivel: "Júnior", salario: "4.014", dias: 3 },
                { id: 4, titulo: "Desenvolvedor Frontend", empresa: "TechCorp", localizacao: "São Paulo, SP", modelo: "Remoto", contrato: "CLT", nivel: "Sênior", salario: "10.000", dias: 1 },
            ];

            const vagasFiltradas = TODAS_AS_VAGAS_LOCAL.filter((vaga) => {
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
            // -------------------------------------------------------------

            containerListaVagasWrapper.innerHTML = "";
            const listaVagasElemento = criarListaVagas(vagasFiltradas, true);
            
            // Adiciona o evento de clique nos botões "Candidatar-se" gerados na lista
            const botoesCandidatar = listaVagasElemento.querySelectorAll('.btn-candidatar');
            botoesCandidatar.forEach(botao => {
                botao.addEventListener('click', (e) => {
                    e.preventDefault();
                    abrirModalCandidatar(); // Abre o modal em cima da tela atual[cite: 11]
                });
            });

            containerListaVagasWrapper.appendChild(listaVagasElemento);

        } catch (err) {
            console.error("Erro ao carregar vagas:", err);
            containerListaVagasWrapper.innerHTML = `<p class="sem-vagas">Erro ao carregar as vagas. Tente novamente mais tarde.</p>`;
        }
    }
 
    // 2. BARRA DE BUSCA
    const topoContainer = document.createElement("div");
    topoContainer.classList.add("vi-topo-busca-container");
 
    const barraBuscaComponente = criarBarraBusca((cargo, local) => {
        filtroTextoBusca = { cargo, local };
        atualizarVagasExibidas();
    });
    barraBuscaComponente.classList.add("vi-barra-busca-wrapper");
 
    const inputsBusca = barraBuscaComponente.querySelectorAll('input');
    if (inputsBusca.length >= 2) {
        inputsBusca[0].value = filtroTextoBusca.cargo;
        inputsBusca[1].value = filtroTextoBusca.local;
    }
 
    topoContainer.appendChild(barraBuscaComponente);
    main.appendChild(topoContainer);
 
    // 3. CORPO: Filtros e Lista
    const layout = document.createElement("div");
    layout.classList.add("vi-layout-vagas-container");
 
    const filtrosComponente = criarFiltrosVagas(FILTROS_DO_BANCO, (filtrosAtivos) => {
        filtrosCheckbox = filtrosAtivos;
        atualizarVagasExibidas();
    });
    filtrosComponente.classList.add("vi-filtros-lateral");
 
    const areaCentralVagas = document.createElement("div");
    areaCentralVagas.classList.add("vi-area-central-vagas");
 
    areaCentralVagas.appendChild(containerListaVagasWrapper);
 
    layout.appendChild(filtrosComponente);
    layout.appendChild(areaCentralVagas);
    main.appendChild(layout);
 
    atualizarVagasExibidas();
 
    return main;
}