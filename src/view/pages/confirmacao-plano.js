import { criarModal } from '../components/modal.js';

export function abrirModalSucessoPlano(dadosPlano = {}) {
    const {
        planoAnterior = "Gratuito",
        valorAnterior = "R$ 0,00",
        novoPlano = "Empresarial/Educacional",
        valorNovo = "R$ 349,00",
        dataAlteracao = "22/09/2026 14:30",
        formaPagamento = "Mastercard •••• 1234",
        proximaCobranca = "05/10/2026 - R$ 349,00",
        emailContato = "contato@bluecore.com"
    } = dadosPlano;

    const conteudoHTML = `
        <div class="modal-sucesso-plano">
            <!-- 1. Ícone de Sucesso Verde -->
            <div class="icone-sucesso-container">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>

            <!-- 2. Cabeçalho -->
            <div class="cabecalho-sucesso-texto">
                <h2>Plano alterado com sucesso!</h2>
                <p>Sua assinatura foi atualizada e já está ativa.</p>
            </div>

            <!-- 3. Caixa de Informação de Recursos -->
            <div class="banner-proximos-passos">
                <div class="icone-info">ℹ</div>
                <div class="texto-proximos-passos">
                    <p>Agora você tem acesso a mais recursos para potenciar o seu processo de recrutamento.</p>
                </div>
            </div>

            <!-- 4. Comparativo de Planos (Anterior -> Novo) -->
            <div class="comparativo-planos-wrapper">
                <!-- Plano Anterior -->
                <div class="card-plano-item plano-antigo">
                    <div class="plano-header-tag">
                        <span>Plano anterior</span>
                        <span class="badge-cinzento">Anterior</span>
                    </div>
                    <div class="plano-info-detalhe">
                        <h4>${planoAnterior}</h4>
                        <span class="valor-plano">${valorAnterior}<small>/mês</small></span>
                    </div>
                </div>

                <!-- Seta de Transição -->
                <div class="seta-transicao">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>

                <!-- Novo Plano -->
                <div class="card-plano-item plano-novo">
                    <div class="plano-header-tag">
                        <span>Novo plano</span>
                        <span class="badge-status-ativo">Ativo</span>
                    </div>
                    <div class="plano-info-detalhe">
                        <h4>${novoPlano}</h4>
                        <span class="valor-plano">${valorNovo}<small>/mês</small></span>
                    </div>
                </div>
            </div>

            <!-- 5. Detalhes (Data, Pagamento, Próxima Cobrança) -->
            <div class="grid-detalhes-pagamento">
                <div class="detalhe-item">
                    <span class="detalhe-label">📅 Data da alteração</span>
                    <span class="detalhe-valor">${dataAlteracao}</span>
                </div>
                <div class="detalhe-item">
                    <span class="detalhe-label">💳 Forma de pagamento</span>
                    <span class="detalhe-valor">${formaPagamento}</span>
                </div>
                <div class="detalhe-item">
                    <span class="detalhe-label">🔄 Próxima cobrança</span>
                    <span class="detalhe-valor">${proximaCobranca}</span>
                </div>
            </div>

            <!-- 6. Aviso de E-mail Enviado -->
            <div class="aviso-email-enviado">
                <span>✓ Um e-mail de confirmação foi enviado para <strong>${emailContato}</strong> com os detalhes de sua assinatura.</span>
            </div>

            <!-- 7. Botão de Ação -->
            <div class="acoes-modal-centro">
                <button type="button" class="btn-primary-lista" id="btnMinhaAssinatura">
                    Ir para minha assinatura
                </button>
            </div>
        </div>
    `;

    const modal = criarModal({
        titulo: "",
        subtitulo: "",
        conteudoHTML: conteudoHTML,
        aoFechar: () => {
            window.location.href = '../index.html';
        }
    });

    modal.querySelector('#btnMinhaAssinatura')?.addEventListener('click', () => {
        modal.remove();
        window.location.href = 'minha-assinatura.html';
    });

    const appContainer = document.getElementById("app") || document.body;
    appContainer.appendChild(modal);
}

document.addEventListener('DOMContentLoaded', () => {
    abrirModalSucessoPlano();
});