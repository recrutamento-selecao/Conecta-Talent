import { renderEmpresasCadastradas } from './empresascadastradas.js';
import { EMPRESAS_CADASTRADAS } from '../utils/fixtures.js';

// Só o conteúdo do dashboard: a sidebar é montada uma única vez pelo app.js.
export function renderDashboardAdministrador() {
    const pagina = document.createElement('section');
    pagina.className = 'dashboard-administrador';

    pagina.append(renderEmpresasCadastradas(EMPRESAS_CADASTRADAS));

    return pagina;
}