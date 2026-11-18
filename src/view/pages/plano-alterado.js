import { criarSidebar } from '../components/sidebar.js';
import { criarCardSucesso } from '../components/card-sucesso.js';

const USUARIO_LOGADO = { nome: "Twelse LTDA", perfil: "empresa" };

export function renderPlanoAlterado() {
    const containerPrincipal = document.createElement("div");
    containerPrincipal.className = "pagina-confirmacao-plano-wrapper";

    // 1. Sidebar da aplicação
    const sidebar = criarSidebar(USUARIO_LOGADO.perfil, USUARIO_LOGADO.nome);
    containerPrincipal.appendChild(sidebar);

    // 2. Conteúdo Principal
    const main = document.createElement("main");
    main.classList.add("conteudo-principal");

    const tituloPagina = document.createElement("h1");
    tituloPagina.className = "titulo-pagina";
    tituloPagina.textContent = "Confirmação";
    main.appendChild(tituloPagina);

    // Layout em grelha (Card de sucesso + Painel lateral de resumo)
    const layoutGrid = document.createElement("div");
    layoutGrid.className = "layout-confirmacao-grid";

    // 3. Instancia o Componente de Card de Sucesso
    const cardSucesso = criarCardSucesso({
        titulo: "Plano alterado com sucesso!",
        descricao: "Sua assinatura foi atualizada e já está ativa.",
        botaoPrimarioTexto: "Ir para minha assinatura",
     
    });

    // 4. Slot com os detalhes da alteração e comparativo de planos
    const slotDetalhes = document.createElement("div");
    slotDetalhes.className = "detalhes-alteracao-plano";
    slotDetalhes.innerHTML = `
        <div class="alerta-recurso-extra">
            <svg class="icone-info-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <p>Agora você tem acesso a mais recursos para potenciar o seu processo de recrutamento.</p>
        </div>

        <div class="comparativo-planos">
            <div class="plano-box anterior">
                <span class="tag-estado">Anterior</span>
                <h4>Gratuito</h4>
                <p class="preco">R$ 0,00 <span class="periodo">/mês</span></p>
            </div>
            <div class="seta-transicao">→</div>
            <div class="plano-box novo">
                <span class="tag-estado ativo">Ativo</span>
                <h4>Empresarial/Educacional</h4>
                <p class="preco">R$ 349,00 <span class="periodo">/mês</span></p>
            </div>
        </div>

        <div class="info-adicional-grid">
            <div class="info-item">
                <span class="rotulo">Data da alteração</span>
                <strong>22/09/2026 14:30</strong>
            </div>
            <div class="info-item">
                <span class="rotulo">Forma de pagamento</span>
                <strong>Mastercard •••• 1234</strong>
            </div>
            <div class="info-item">
                <span class="rotulo">Próxima cobrança</span>
                <strong>05/10/2026<br>R$ 349,00</strong>
            </div>
        </div>

        <div class="aviso-email-confirmacao">
            ✓ Um e-mail de confirmação foi enviado para <strong>contato@twelse.com</strong> com os detalhes da sua assinatura.
        </div>
    `;
    
    cardSucesso.slot.appendChild(slotDetalhes);
    layoutGrid.appendChild(cardSucesso.element);

    // 5. Painel Lateral Direito ("Resumo da sua assinatura")
    const painelResumo = document.createElement("aside");
    painelResumo.className = "painel-resumo-assinatura";
    painelResumo.innerHTML = `
        <h3>Resumo da sua assinatura</h3>
        <div class="card-resumo-topo">
            <div class="info-plano-mini">
                <h4>Empresarial/Educacional</h4>
                <p>Para empresas com maior volume de contratações.</p>
            </div>
            <span class="badge-ativo-mini">Ativo</span>
        </div>
        <div class="preco-destaque">
            <strong>R$ 349,00</strong> <span class="periodo">/mês</span>
        </div>
        <ul class="lista-beneficios-resumo">
            <li>✓ Recrutadores ilimitados</li>
            <li>✓ Vagas em aberto</li>
            <li>✓ Banco de talentos ilimitado</li>
            <li>✓ Relatórios avançados</li>
            <li>✓ Suporte dedicado</li>
            <li>✓ Integrações e personalizações</li>
        </ul>
    `;
    layoutGrid.appendChild(painelResumo);

    main.appendChild(layoutGrid);
    containerPrincipal.appendChild(main);

    return containerPrincipal;
}