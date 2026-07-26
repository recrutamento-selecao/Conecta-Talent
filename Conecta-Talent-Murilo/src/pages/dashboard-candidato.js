import { criarSidebar } from "../components/sidebar.js";

const app = document.getElementById('app');

app.appendChild(criarSidebar("candidato", "João Silva"));
