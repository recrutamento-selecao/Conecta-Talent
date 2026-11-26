import { renderRecrutadores } from './recrutadores.js';
import { renderVagasCadastradas } from './vagascadastradas.js';
import { renderAdicionarRecrutador } from './adicionar-recrutador.js';
import { RECRUTADORES, VAGAS_CADASTRADAS } from '../utils/fixtures.js';

function obterEmpresaAtiva() {
    try {
        const bruto =
            sessionStorage.getItem('empresa') ||
            localStorage.getItem('empresa') ||
            sessionStorage.getItem('usuario') ||
            localStorage.getItem('usuario');

        if (bruto) {
            const parsed = JSON.parse(bruto);
            const idEmpresa =
                parsed?.id_empresa ??
                parsed?.idEmpresa ??
                parsed?.empresa?.id_empresa ??
                parsed?.empresa?.id ??
                null;

            const nomeEmpresa =
                parsed?.razao_social ??
                parsed?.nomeEmpresa ??
                parsed?.empresa?.razao_social ??
                parsed?.empresa?.nome ??
                '';

            if (idEmpresa) {
                return { idEmpresa, nomeEmpresa };
            }
        }
    } catch {
        // Ignora JSON malformado no storage
    }

    return {
        idEmpresa: RECRUTADORES?.idEmpresa ?? null,
        nomeEmpresa: RECRUTADORES?.nomeEmpresa ?? ''
    };
}

// Só o conteúdo do dashboard.
// A sidebar é montada uma única vez pelo app.js.
export function renderDashboardEmpresa(opcoes = {}) {
    const pagina = document.createElement('section');
    pagina.className = 'dashboard-empresa';

    const empresaArmazenada = obterEmpresaAtiva();
    const idEmpresa = opcoes.idEmpresa ?? empresaArmazenada.idEmpresa;
    const nomeEmpresa = opcoes.nomeEmpresa ?? empresaArmazenada.nomeEmpresa;

    function montarVisaoPrincipal() {
        pagina.replaceChildren(
            renderRecrutadores({
                idEmpresa,
                nomeEmpresa,
                recrutadores: RECRUTADORES.itens,
                aoAdicionar: ({ idEmpresa: empresaId, recarregar }) => {
                    const telaCadastro = renderAdicionarRecrutador({
                        idEmpresa: empresaId ?? idEmpresa,
                        nomeEmpresa,
                        aoCancelar: () => {
                            montarVisaoPrincipal();
                        },
                        aoSucesso: async () => {
                            montarVisaoPrincipal();
                            if (typeof recarregar === 'function') {
                                await recarregar();
                            }
                        }
                    });

                    pagina.replaceChildren(telaCadastro);
                }
            }),
            renderVagasCadastradas(VAGAS_CADASTRADAS.itens)
        );
    }

    montarVisaoPrincipal();

    return pagina;
}