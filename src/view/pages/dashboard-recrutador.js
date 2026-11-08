import { renderVagasCadastradas } from './vagascadastradas.js';
import { renderTriagem } from './triagem.js';
import { VAGAS_CADASTRADAS, CANDIDATOS_TRIAGEM } from '../utils/fixtures.js';

// Só o conteúdo do dashboard: a sidebar é montada uma única vez pelo app.js.
export function renderDashboardRecrutador() {
    const pagina = document.createElement('section');
    pagina.className = 'dashboard-recrutador';

    pagina.append(
        renderVagasCadastradas(VAGAS_CADASTRADAS),
        renderTriagem(CANDIDATOS_TRIAGEM)
    );

    return pagina;
}