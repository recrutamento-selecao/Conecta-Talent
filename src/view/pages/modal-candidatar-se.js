import { criarModal } from '../components/modal.js';

export function abrirModalCandidatar() {
    // Remove qualquer modal de candidatura anterior que possa ter ficado preso no DOM
    const modalAntigo = document.querySelector('.modal-overlay');
    if (modalAntigo) {
        modalAntigo.remove();
    }

    const conteudoDiv = document.createElement('div');
    conteudoDiv.style.cssText = `
        display: flex; 
        flex-direction: column; 
        gap: 0.85rem; 
        width: 100%; 
        max-width: 400px; 
        margin: 0 auto;
    `;

    conteudoDiv.innerHTML = `
        <button type="button" id="modalBtnEntrar" style="
            background-color: #1d4ed8;
            color: #ffffff;
            border: none;
            padding: 0.85rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: background-color 0.2s;
            text-align: center;
        ">Sim, já tenho conta (Entrar)</button>

        <button type="button" id="modalBtnCadastro" style="
            background-color: #ffffff;
            color: #1d4ed8;
            border: 1px solid #cbd5e1;
            padding: 0.85rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: background-color 0.2s;
            text-align: center;
        ">Não, quero me cadastrar</button>
    `;

    const modalElemento = criarModal({
        titulo: "Quase lá!",
        subtitulo: "Para se candidatar a esta vaga, você já possui uma conta na Conecta Talent?",
        conteudoHTML: conteudoDiv,
        aoFechar: () => {
            console.log("Modal de candidatura fechado");
        }
    });

    // Usa 'pointerdown' ou 'click' com stopPropagation para garantir resposta imediata no 1º toque/clique
    const btnEntrar = modalElemento.querySelector('#modalBtnEntrar');
    const btnCadastro = modalElemento.querySelector('#modalBtnCadastro');

    btnEntrar.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        modalElemento.remove();
        window.location.hash = '#login';
    });

    btnCadastro.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        modalElemento.remove();
        window.location.hash = '#tipo-cadastro';
    });

    document.body.appendChild(modalElemento);
}