import { criarSidebar } from '../components/sidebar.js';
import { criarStepper } from '../components/stepper.js';
import { criarCardSucesso } from '../components/card-sucesso.js';

export function renderCandidaturaEnviada(containerPai) {
    containerPai.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'pagina-candidatura-enviada-wrapper';

    // Sidebar
    const sidebar = criarSidebar('candidato', 'João Oliveira');
    wrapper.appendChild(sidebar);

    const conteudoPrincipal = document.createElement('main');
    conteudoPrincipal.className = 'conteudo-principal';

    conteudoPrincipal.innerHTML = `
        <div class="breadcrumb-pagina">Candidaturas &gt; Candidatar-se</div>
        <h1 class="titulo-pagina">Candidatar-se</h1>
        <p class="subtitulo-pagina">Preencha as informações abaixo para se candidatar a esta vaga.</p>
    `;

    // 1. Instancia o seu stepper existente
    const stepperEl = criarStepper({
        etapas: [
            { id: 1, titulo: "Currículo" },
            { id: 2, titulo: "Informações adicionais" },
            { id: 3, titulo: "Questionário" },
            { id: 4, titulo: "Revisão" },
            { id: 5, titulo: "Conclusão" }
        ],
        etapaAtual: 5
    });
    conteudoPrincipal.appendChild(stepperEl);

    const layoutGrid = document.createElement('div');
    layoutGrid.className = 'layout-candidatura-grid';

    const colunaEsquerda = document.createElement('div');
    colunaEsquerda.className = 'coluna-conteudo-central';

    // 2. Instancia o seu card de sucesso existente
    const cardSucesso = criarCardSucesso({
        titulo: "Candidatura enviada com sucesso!",
        descricao: "Sua candidatura para a vaga de Analista de Dados Júnior foi enviada para a BlueCore Sistemas.",
        mensagemAlerta: "A empresa poderá visualizar seu perfil e entrar em contato caso avance no processo seletivo.",
        botaoSecundarioTexto: "Ver minhas candidaturas",
        onBotaoSecundarioClick: () => { window.location.hash = ""; },
        botaoPrimarioTexto: "Explorar outras vagas",
        onBotaoPrimarioClick: () => { window.location.hash = "#candidato-vagas"; }
    });

    // 3. Preenche o slot do card com o resumo e próximos passos
    cardSucesso.slot.innerHTML = `
        <div class="bloco-resumo-candidatura" style="margin-top: 1.5rem; text-align: left;">
            <h3 style="font-size: 0.95rem; font-weight: 600; color: #0f172a; margin-bottom: 1rem;">Resumo da candidatura</h3>
            <div class="linha-resumo"><span class="rotulo" style="color: #64748b;">Vaga</span><span class="valor" style="font-weight: 500;">Analista de Dados Júnior</span></div>
            <div class="linha-resumo"><span class="rotulo" style="color: #64748b;">Empresa</span><span class="valor" style="font-weight: 500;">BlueCore Sistemas</span></div>
            <div class="linha-resumo"><span class="rotulo" style="color: #64748b;">Localização</span><span class="valor" style="font-weight: 500;">Sorocaba, SP</span></div>
            <div class="linha-resumo"><span class="rotulo" style="color: #64748b;">Modelo de trabalho</span><span class="valor" style="font-weight: 500;">Híbrido</span></div>
            <div class="linha-resumo"><span class="rotulo" style="color: #64748b;">Tipo de contrato</span><span class="valor" style="font-weight: 500;">CLT</span></div>
            <div class="linha-resumo"><span class="rotulo" style="color: #64748b;">Data de candidatura</span><span class="valor" style="font-weight: 500;">24/09/2026</span></div>
        </div>

        <div class="bloco-proximos-passos" style="margin-top: 1.25rem; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.25rem; text-align: left;">
            <h4 style="font-size: 0.9rem; font-weight: 600; color: #0f172a; margin-bottom: 0.75rem;">O que acontece agora?</h4>
            <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.825rem; color: #475569; display: flex; flex-direction: column; gap: 0.4rem;">
                <li>A empresa analisará seu currículo e suas respostas.</li>
                <li>Você poderá acompanhar o andamento em <strong>Minhas candidaturas</strong>.</li>
                <li>Caso seja selecionado(a) para a próxima etapa, você receberá uma notificação.</li>
            </ul>
        </div>
    `;

    colunaEsquerda.appendChild(cardSucesso.element);
    layoutGrid.appendChild(colunaEsquerda);

    // 4. Painel lateral da vaga à direita
    const painelLateral = document.createElement('aside');
    painelLateral.className = 'painel-detalhes-vaga-lateral';
    painelLateral.innerHTML = `
        <div class="cabecalho-vaga-lateral">
            <div class="icone-empresa-mini">B</div>
            <div>
                <h3>Analista de Dados Júnior</h3>
                <p class="empresa-nome">BlueCore Sistemas</p>
            </div>
            <button class="btn-favorito-lateral" title="Salvar vaga">
                <svg class="icone-svg-acao" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
            </button>
        </div>
        <div class="tags-vaga-lateral">
            <span>Sorocaba, SP</span> • <span>Híbrido</span> • <span>CLT</span> • <span>R$ 4.500 - R$ 5.500</span>
        </div>
        <div class="corpo-vaga-lateral">
            <h4>Descrição da vaga</h4>
            <p>Estamos em busca de um Analista de Dados Júnior para apoiar a construção de dashboards, análise de dados e geração de insights para o time de negócios.</p>
            <h4>Principais responsabilidades</h4>
            <ul>
                <li>Extrair, tratar e analisar dados de diferentes fontes;</li>
                <li>Desenvolver e manter dashboards em Power BI;</li>
                <li>Apoiar a automatização de processos;</li>
                <li>Trabalhar em conjunto com as áreas de negócio.</li>
            </ul>
            <h4>Requisitos</h4>
            <ul>
                <li>Conhecimento em SQL;</li>
                <li>Experiência com Power BI;</li>
                <li>Excel intermediário/avançado;</li>
                <li>Boa comunicação e trabalho em equipe.</li>
            </ul>
            <h4>Habilidades desejadas</h4>
            <div class="tags-habilidades">
                <span class="tag-habilidade">Power BI</span>
                <span class="tag-habilidade">SQL</span>
                <span class="tag-habilidade">Excel</span>
                <span class="tag-habilidade">Análise de Dados</span>
                <span class="tag-habilidade">Python</span>
            </div>
        </div>
    `;

    layoutGrid.appendChild(painelLateral);
    conteudoPrincipal.appendChild(layoutGrid);
    wrapper.appendChild(conteudoPrincipal);
    containerPai.appendChild(wrapper);
}