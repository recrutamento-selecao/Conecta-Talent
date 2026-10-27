import { criarSidebar } from '../components/sidebar.js';
import { criarStepper } from '../components/stepper.js';
 
const USUARIO_LOGADO = { nome: "João Oliveira", perfil: "candidato" };
 
document.addEventListener('DOMContentLoaded', () => {
    // 1. Injeta a Sidebar no body
    const sidebar = criarSidebar(USUARIO_LOGADO.perfil, USUARIO_LOGADO.nome);
    document.body.appendChild(sidebar);
 
    // 2. Cria dinamicamente o elemento main (.conteudo-principal)
    const main = document.createElement("main");
    main.classList.add("conteudo-principal");
 
    // 3. Adiciona apenas o Stepper (Etapa 1) dentro do container principal
    const stepperElement = criarStepper(1);
    main.appendChild(stepperElement);
 
    // 4. Injeta a main no body
    document.body.appendChild(main);
});