import { criarRoteador } from './utils/router.js';
import { renderTeste } from './pages/teste.js';
import { criarSidebar } from './components/sidebar.js';

const app = document.getElementById('app');

const conteudo = document.createElement('main');
conteudo.id = 'conteudo';

const sidebar = criarSidebar('administrador', 'Nome do usuário');

app.replaceChildren(sidebar, conteudo);


criarRoteador({
    container: conteudo,
    rotaPadrao: '/teste',
    rotas: {
        '/teste': renderTeste
    }
});