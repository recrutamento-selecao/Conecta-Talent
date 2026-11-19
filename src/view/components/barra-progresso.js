export function criarBarraProgresso({ etapaAtual = "Triagem", percentual = 40 } = {}) {
    const progressoLimitado = Math.max(0, Math.min(100, Number(percentual) || 0));

    const container = document.createElement("div");
    container.className = "componente-barra-progresso";

    container.innerHTML = `
        <div class="barra-progresso-cabecalho">
            <span class="barra-progresso-etapa">Etapa atual: <strong>${etapaAtual}</strong></span>
            <span class="barra-progresso-porcentagem">${progressoLimitado}%</span>
        </div>
        <div class="barra-progresso-trilha" role="progressbar" aria-valuenow="${progressoLimitado}" aria-valuemin="0" aria-valuemax="100">
            <div class="barra-progresso-preenchimento" style="width: ${progressoLimitado}%;"></div>
        </div>
    `;

    return container;
}