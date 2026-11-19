import { criarModal } from '../components/modal.js';

const BASE_BTN = 'height: 56px; border-radius: 10px; font-family: inherit; font-weight: 600; font-size: 0.95rem; cursor: pointer; box-sizing: border-box; transition: background-color 0.2s;';
const ESTILO_AZUL_OUTLINE = `${BASE_BTN} flex: 1; background-color: #ffffff; border: 1.5px solid #1a3bc2; color: #1a3bc2;`;
const ESTILO_AZUL_CHEIO = `${BASE_BTN} flex: 1; background-color: #1a3bc2; border: 1.5px solid #1a3bc2; color: #ffffff;`;
const ESTILO_PAUSAR = `${BASE_BTN} width: 100%; background-color: #ffffff; border: 1.5px solid #e9a63a; color: #d98a00;`;

export function renderModalPausarVaga({ aoEditar, aoDuplicar, aoCandidaturas, aoPausar, aoCancelar } = {}) {
    const conteudoHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem; font-family: 'Inter', sans-serif;">
            <h2 style="margin: 0; font-size: 1.35rem; font-weight: 700; color: #1e293b;">Ações</h2>

            <div style="display: flex; gap: 1rem; width: 100%;">
                <button type="button" id="btnEditarVaga" style="${ESTILO_AZUL_OUTLINE}">Editar vaga</button>
                <button type="button" id="btnDuplicarVaga" style="${ESTILO_AZUL_OUTLINE}">Duplicar vaga</button>
                <button type="button" id="btnCandidaturas" style="${ESTILO_AZUL_CHEIO}">Candidaturas</button>
            </div>

            <button type="button" id="btnPausarVaga" style="${ESTILO_PAUSAR}">Pausar vaga</button>
        </div>
    `;

    const fecharPadrao = () => {
        if (aoCancelar) aoCancelar();
        else window.location.hash = '#home';
    };

    const modal = criarModal({
        conteudoHTML,
        aoFechar: fecharPadrao
    });

    const btnEditar = modal.querySelector('#btnEditarVaga');
    const btnDuplicar = modal.querySelector('#btnDuplicarVaga');
    const btnCandidaturas = modal.querySelector('#btnCandidaturas');
    const btnPausar = modal.querySelector('#btnPausarVaga');

    const hover = (btn, normal, sobre) => {
        btn.addEventListener('mouseenter', () => btn.style.backgroundColor = sobre);
        btn.addEventListener('mouseleave', () => btn.style.backgroundColor = normal);
    };
    hover(btnEditar, '#ffffff', '#eff3ff');
    hover(btnDuplicar, '#ffffff', '#eff3ff');
    hover(btnCandidaturas, '#1a3bc2', '#152f9c');
    hover(btnPausar, '#ffffff', '#fffbeb');

    btnEditar.addEventListener('click', () => aoEditar?.());
    btnDuplicar.addEventListener('click', () => aoDuplicar?.());
    btnCandidaturas.addEventListener('click', () => aoCandidaturas?.());

    btnPausar.addEventListener('click', async () => {
        btnPausar.disabled = true;
        btnPausar.textContent = 'Pausando...';

        if (aoPausar) {
            await aoPausar();
        }

        modal.remove();
    });

    return modal;
}

export function abrirModalPausarVaga(opcoes = {}) {
    const modal = renderModalPausarVaga({
        ...opcoes,
        aoCancelar: () => {
            if (opcoes.aoCancelar) opcoes.aoCancelar();
        }
    });
    document.body.appendChild(modal);
}