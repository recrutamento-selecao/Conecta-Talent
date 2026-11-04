import { criarModal } from '../components/modal.js';

export function abrirModalSucessoRecrutador(dadosRecrutador = {}) {
    const {
        nome = "Ana Souza",
        iniciais = "AS",
        email = "ana.souza@bluecore.com",
        empresa = "BlueCore Sistemas",
        cargo = "Recrutadora",
        status = "Ativo"
    } = dadosRecrutador;

    const conteudoHTML = `
        <div class="modal-sucesso-recrutador">
            <!-- 1. Ícone de Sucesso em Destaque no Topo -->
            <div class="icone-sucesso-container">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>

            <!-- 2. Cabeçalho integrado de Sucesso -->
            <div class="cabecalho-sucesso-texto">
                <h2>Recrutador cadastrado com sucesso!</h2>
                <p>O recrutador foi adicionado à empresa e já pode aceder ao sistema. Um e-mail de boas-vindas foi enviado com as instruções de acesso.</p>
            </div>

            <!-- 3. Card de Dados do Recrutador -->
            <div class="card-detalhes-recrutador">
                <div class="avatar-iniciais">${iniciais}</div>
                <div class="info-recrutador">
                    <h3>${nome}</h3>
                    <div class="meta-recrutador">
                        <span><img src="../assets/icons/envelope-fill.svg" alt=""> ${email}</span>
                        <span><img src="../assets/icons/buildings-fill.svg" alt=""> ${empresa}</span>
                        <span><img src="../assets/icons/people-fill.svg" alt=""> ${cargo}</span>
                        <span class="badge-status-ativo">• ${status}</span>
                    </div>
                </div>
            </div>

            <!-- 4. Caixinha de Próximos Passos -->
            <div class="banner-proximos-passos">
                <div class="icone-info">ℹ</div>
                <div class="texto-proximos-passos">
                    <strong>Próximos passos</strong>
                    <p>O recrutador receberá um e-mail com as instruções para criar a senha de acesso. Após o primeiro acesso, ele poderá gerenciar as vagas e candidatos conforme as permissões definidas.</p>
                </div>
            </div>

            <!-- 5. Ações (Botões Alinhados) -->
            <div class="acoes-modal-recrutador">
                <button type="button" class="btn-outline-cadastrar" id="btnCadastrarOutro">
                    👤 Cadastrar outro recrutador
                </button>
                <button type="button" class="btn-primary-lista" id="btnIrParaLista">
                    Ir para a lista de recrutadores →
                </button>
            </div>
        </div>
    `;

    const modal = criarModal({
        titulo: "", // Deixamos vazio pois o título agora está integrado e estruturado no HTML acima para melhor hierarquia visual
        subtitulo: "",
        conteudoHTML: conteudoHTML,
        aoFechar: () => {
            console.log("Modal de recrutador fechado.");
            window.location.href = '../index.html';
        }
    });

    // Eventos dos botões de ação
    modal.querySelector('#btnCadastrarOutro')?.addEventListener('click', () => {
        modal.remove();
        // Podes adicionar aqui a lógica para reabrir o formulário de cadastro de recrutador
        console.log("Ação: Cadastrar outro recrutador");
    });

    modal.querySelector('#btnIrParaLista')?.addEventListener('click', () => {
        modal.remove();
        window.location.href = 'gerenciar-recrutadores.html';
    });

    const appContainer = document.getElementById("app") || document.body;
    appContainer.appendChild(modal);
}

// Auto-executa a abertura do modal quando o DOM estiver carregado nesta página
document.addEventListener('DOMContentLoaded', () => {
    abrirModalSucessoRecrutador();
});