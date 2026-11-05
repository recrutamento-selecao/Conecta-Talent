import { renderCandidaturasRecentes } from './candidaturasrecentes.js';
import { renderProximasEntrevistas } from './proximasentrevistas.js';
import { renderVagasRecomendadas } from './vagasrecomendadas.js';
import { CANDIDATURAS, ENTREVISTAS, VAGAS_RECOMENDADAS } from '../utils/fixtures.js';

// Só o conteúdo do dashboard: a sidebar é montada uma única vez pelo app.js.
export function renderDashboardCandidato() {
    const pagina = document.createElement('section');
    pagina.className = 'dashboard-candidato';

    pagina.append(
        renderCandidaturasRecentes(CANDIDATURAS),
        renderProximasEntrevistas(ENTREVISTAS),
        renderVagasRecomendadas(VAGAS_RECOMENDADAS)
    );

    return pagina;
}