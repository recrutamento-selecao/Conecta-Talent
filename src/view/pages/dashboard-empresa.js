
import { renderRecrutadores } from './recrutadores.js';
import { renderVagasCadastradas } from './vagascadastradas.js';
import { RECRUTADORES, VAGAS_CADASTRADAS } from '../utils/fixtures.js';

// Só o conteúdo do dashboard.
// A sidebar é montada uma única vez pelo app.js.
export function renderDashboardEmpresa() {
    const pagina = document.createElement('section');
    pagina.className = 'dashboard-empresa';

    pagina.append(
        renderRecrutadores(RECRUTADORES.itens),
        renderVagasCadastradas(VAGAS_CADASTRADAS.itens)
    );

    return pagina;
}
