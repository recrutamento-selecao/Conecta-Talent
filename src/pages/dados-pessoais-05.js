import { criarSidebar } from '../components/sidebar.js';
import { criarStepper } from '../components/stepper.js';
 
const USUARIO_LOGADO = { nome: "João Oliveira", perfil: "candidato" };
 
document.addEventListener('DOMContentLoaded', () => {
    
    const sidebar = criarSidebar(USUARIO_LOGADO.perfil, USUARIO_LOGADO.nome);
    document.body.appendChild(sidebar);
 
    const main = document.createElement("main");
    main.classList.add("conteudo-principal");
 
    const stepperElement = criarStepper(5);
    main.appendChild(stepperElement);
 
    document.body.appendChild(main);
});