import { criarModal } from '../components/modal.js';

export function renderTipoCadastro() {
    const container = document.createElement('div');
    container.classList.add('page-tipo-cadastro');

    const conteudoPerfis = `
        <div class="modal-cards-perfil">
            <!-- Card Candidato -->
            <div class="card-perfil-opcao" data-perfil="candidato">
                <div class="perfil-icone-avatar">
                    <img src="./assets/icons/users-group.svg" alt="Candidato">
                </div>
                <h3>Candidato</h3>
                <p>Quero buscar vagas, acompanhar processos seletivos e mostrar meu talento.</p>
                <ul class="perfil-lista-beneficios">
                    <li>Cadastrar currículo</li>
                    <li>Encontrar vagas</li>
                    <li>Acompanhar candidaturas</li>
                </ul>
            </div>

            <!-- Card Empresa -->
            <div class="card-perfil-opcao" data-perfil="empresa">
                <div class="perfil-icone-avatar">
                    <img src="./assets/icons/briefcase.svg" alt="Empresa">
                </div>
                <h3>Empresa</h3>
                <p>Quero publicar vagas, gerenciar candidatos e encontrar os melhores talentos.</p>
                <ul class="perfil-lista-beneficios">
                    <li>Publicar vagas</li>
                    <li>Gerenciar processos seletivos</li>
                    <li>Acessar banco de talentos</li>
                </ul>
            </div>
        </div>
    `;

    const modalTipoConta = criarModal({
        titulo: "Crie sua conta no Conecta Talent",
        subtitulo: "Escolha o tipo de conta para continuar.",
        conteudoHTML: conteudoPerfis,
        aoFechar: () => {
            console.log("Modal fechado. Redirecionando para a home...");
            window.location.hash = '#home'; 
        }
    });

    modalTipoConta.querySelectorAll(".card-perfil-opcao").forEach(card => {
        card.addEventListener("click", () => {
            const perfil = card.getAttribute("data-perfil");
            modalTipoConta.remove();
            
            // Alterado para SPA Hash Routing em conformidade com o router.js
            if (perfil === 'candidato') {
                window.location.hash = '#dashboard-candidato';
            } else {
                window.location.hash = '#dashboard-empresa';
            }
        });
    });

    container.appendChild(modalTipoConta);
    return container;
}