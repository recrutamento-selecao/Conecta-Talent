// Lista centralizada das 7 etapas do cadastro de candidato
export const ETAPAS_CADASTRO = [
    { id: 1, titulo: "Dados pessoais" },
    { id: 2, titulo: "Formação acadêmica" },
    { id: 3, titulo: "Experiência profissional" },
    { id: 4, titulo: "Cursos / Certificados" },
    { id: 5, titulo: "Idiomas" },
    { id: 6, titulo: "Habilidades" },
    { id: 7, titulo: "Diversidade" }
];
 
/**
 * Cria o elemento do Stepper destacando a etapa ativa
 * @param {number} etapaAtivaId - Número da etapa atual (1 a 7)
 * @returns {HTMLElement} O elemento DOM do Stepper
 */
export function criarStepper(etapaAtivaId = 1) {
    const container = document.createElement("div");
    container.classList.add("stepper-container");
 
    // Linha horizontal de fundo que conecta todos os círculos
    const linhaConectora = document.createElement("div");
    linhaConectora.classList.add("stepper-linha-bg");
    container.appendChild(linhaConectora);
 
    // Renderiza cada etapa
    ETAPAS_CADASTRO.forEach((etapa) => {
        const item = document.createElement("div");
        item.classList.add("stepper-item");
 
        // Define a classe da etapa (ativa, concluída ou pendente)
        if (etapa.id === etapaAtivaId) {
            item.classList.add("ativo");
        } else if (etapa.id < etapaAtivaId) {
            item.classList.add("concluido");
        } else {
            item.classList.add("pendente");
        }
 
        item.innerHTML = `
            <div class="stepper-circulo">${etapa.id}</div>
            <span class="stepper-titulo">${etapa.titulo}</span>
        `;
 
        container.appendChild(item);
    });
 
    return container;
}