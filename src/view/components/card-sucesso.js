export function criarCardSucesso({ titulo, descricao, mensagemAlerta, botaoSecundarioTexto, onBotaoSecundarioClick, botaoPrimarioTexto, onBotaoPrimarioClick }) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("componente-card-sucesso");

    // Topo com o ícone de check e textos
    const topoSucesso = document.createElement("div");
    topoSucesso.classList.add("topo-sucesso");
    topoSucesso.innerHTML = `
        <div class="icone-check-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2>${titulo}</h2>
        <p>${descricao}</p>
    `;
    cardContainer.appendChild(topoSucesso);

    // Alerta opcional
    if (mensagemAlerta) {
        const alertaSucesso = document.createElement("div");
        alertaSucesso.classList.add("alerta-sucesso-perfil");
        alertaSucesso.innerHTML = `✓ ${mensagemAlerta}`;
        cardContainer.appendChild(alertaSucesso);
    }

    // Slot para conteúdo personalizado (como o grid de resumo do perfil)
    const slotConteudo = document.createElement("div");
    slotConteudo.classList.add("slot-conteudo-card");
    cardContainer.appendChild(slotConteudo);

    // Rodapé com botões de ação
    const botoesAcao = document.createElement("div");
    botoesAcao.classList.add("botoes-acao-footer");

    if (botaoSecundarioTexto) {
        const btnSec = document.createElement("button");
        btnSec.classList.add("btn-secundario-acao");
        btnSec.textContent = botaoSecundarioTexto;
        if (onBotaoSecundarioClick) btnSec.addEventListener("click", onBotaoSecundarioClick);
        botoesAcao.appendChild(btnSec);
    }

    if (botaoPrimarioTexto) {
        const btnPrim = document.createElement("button");
        btnPrim.classList.add("btn-primario-acao");
        btnPrim.innerHTML = `${botaoPrimarioTexto} &rarr;`;
        if (onBotaoPrimarioClick) btnPrim.addEventListener("click", onBotaoPrimarioClick);
        botoesAcao.appendChild(btnPrim);
    }

    cardContainer.appendChild(botoesAcao);

    // Retorna o elemento e uma referência ao slot para inserires itens lá dentro se precisares
    return { element: cardContainer, slot: slotConteudo };
}