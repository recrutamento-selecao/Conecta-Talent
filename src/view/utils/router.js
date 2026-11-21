import { renderHome } from '../pages/home.js';
import { renderPlanos } from '../pages/planos.js';
import { renderRecursos } from '../pages/recursos.js';
import { renderSobreNos } from '../pages/sobre-nos.js';
import { renderSuporte } from '../pages/suporte.js';
import { renderTipoCadastro } from '../pages/tipo-cadastro.js';
// Certifique-se de importar o renderLogin se for usar a rota de login:
// import { renderLogin } from '../pages/login.js';
import { renderModalExcluirConta } from '../pages/modal-excluir-conta.js';
import { renderModalExcluirRecrutador } from '../pages/modal-excluir-recrutador.js';
import { renderModalPausarVaga } from '../pages/modal-pausar-vaga.js';
import { renderModalBloquearUsuario } from '../pages/modal-bloquear-usuario.js';
import { renderModalExcluirUsuario } from '../pages/modal-excluir-usuario.js';
import { renderModalBloqueioSucesso } from '../pages/modal-bloqueio-sucesso.js';
import { renderModalExclusaoSucesso } from '../pages/modal-exclusao-sucesso.js';
import { renderModalPlanoCriado } from '../pages/modal-plano-criado.js';
import { renderModalConfirmarAlteracoes } from '../pages/modal-confirmar-alteracoes.js';
import { renderModalPlanoAtualizado } from '../pages/modal-plano-atualizado.js';
import { renderModalEtapaAdicionada } from '../pages/modal-etapa-adicionada.js';
import { renderModalMoverCandidato } from '../pages/modal-mover-candidato.js';
import { renderModalCandidatoMovido } from '../pages/modal-candidato-movido.js';
import { renderModalAgendarEntrevista } from '../pages/modal-agendar-entrevista.js';
import { renderModalEntrevistaAgendada } from '../pages/modal-entrevista-agendada.js';
import { renderModalCancelarAssinatura } from '../pages/modal-cancelar-assinatura.js';


function trocarEstiloPagina(nomePagina) {
    const estiloAnterior = document.getElementById('estilo-Dinamico-pagina');
    if (estiloAnterior) {
        estiloAnterior.remove();
    }

    const estilosMap = {
        'candidato-vagas': './view/css/candidato-vagas.css',
        'home': './view/css/home.css',
        'sobre-nos': './view/css/sobre-nos.css',
        'recursos': './view/css/recursos.css',
        'planos': './view/css/planos.css',
        'suporte': './view/css/suporte.css',
        'tipo-cadastro': './view/css/tipo-cadastro.css',
        'login': './view/css/login.css'
    };

    const caminhoCss = estilosMap[nomePagina];

    if (caminhoCss) {
        const link = document.createElement('link');
        link.id = 'estilo-Dinamico-pagina';
        link.rel = 'stylesheet';
        link.href = caminhoCss;
        document.head.appendChild(link);
    }
}

export function iniciarRouter() {
    const app = document.getElementById('app');

    function navegar() {
        const hash = window.location.hash;
        app.innerHTML = '';

        switch (hash) {
            case '#login':
                trocarEstiloPagina('login');
                // app.appendChild(renderLogin());
                break;
            case '#tipo-cadastro':
                trocarEstiloPagina('tipo-cadastro');
                app.appendChild(renderTipoCadastro());
                break;
            case '#sobre-nos':
                trocarEstiloPagina('sobre-nos');
                app.appendChild(renderSobreNos());
                break;
            case '#recursos':
                trocarEstiloPagina('recursos');
                app.appendChild(renderRecursos());
                break;
            case '#planos':
                trocarEstiloPagina('planos');
                app.appendChild(renderPlanos());
                break;
            case '#suporte':
                trocarEstiloPagina('suporte');
                app.appendChild(renderSuporte());
                break;
            case '#excluir-conta':
                app.appendChild(renderModalExcluirConta({
                    aoConfirmar: () => alert('Conta excluída com sucesso!'),
                    aoCancelar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#excluir-recrutador':
                app.appendChild(renderModalExcluirRecrutador({
                    nomeRecrutador: 'Carlos Silva',
                    aoConfirmar: () => alert('Recrutador excluído com sucesso!'),
                    aoCancelar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#pausar-vaga':
                app.appendChild(renderModalPausarVaga({
                    aoPausar: () => alert('Vaga pausada com sucesso!'),
                    aoCancelar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#bloquear-usuario':
                app.appendChild(renderModalBloquearUsuario({
                    // Motivos de exemplo, só para testar a rota. Troque pela lista real.
                    motivos: ['Violação dos termos de uso', 'Atividade suspeita', 'Outro'],
                    aoConfirmar: ({ motivo, observacoes }) => {
                        console.log('Bloqueio:', { motivo, observacoes });
                        alert('Usuário bloqueado com sucesso!');
                    },
                    aoCancelar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#excluir-usuario':
                app.appendChild(renderModalExcluirUsuario({
                    // Motivos de exemplo, só para testar a rota. Troque pela lista real.
                    motivos: ['Solicitação do usuário', 'Violação dos termos de uso', 'Outro'],
                    aoConfirmar: ({ motivo }) => {
                        console.log('Exclusão:', { motivo });
                        alert('Usuário excluído com sucesso!');
                    },
                    aoCancelar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#bloqueio-sucesso':
                app.appendChild(renderModalBloqueioSucesso({
                    // Dados de exemplo, só para testar a rota.
                    nome: 'BlueCore Sistemas',
                    tipo: 'Empresa',
                    motivo: 'Violação dos termos de uso',
                    observacoes: 'Usuário realizou cadastro com informações inconsistentes.',
                    aoFechar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#exclusao-sucesso':
                app.appendChild(renderModalExclusaoSucesso({
                    // Dados de exemplo, só para testar a rota.
                    nome: 'BlueCore Sistemas',
                    tipo: 'Empresa',
                    motivo: 'Solicitação do usuário',
                    observacoes: 'Exclusão solicitada pela empresa.\nTodos os dados foram removidos do sistema.',
                    aoFechar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#plano-criado':
                app.appendChild(renderModalPlanoCriado({
                    // Dados de exemplo, só para testar a rota.
                    plano: {
                        nome: 'Profissional',
                        precoMensal: 149.9,
                        precoAnual: 1499,
                        recrutadores: 5,
                        vagas: 50,
                        candidatos: 1000,
                        status: 'Ativo'
                    },
                    aoIrParaPlanos: () => { window.location.hash = '#home'; }, // trocar pela rota de Gerenciar Planos
                    aoFechar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#confirmar-alteracoes':
                app.appendChild(renderModalConfirmarAlteracoes({
                    // Dados de exemplo, só para testar a rota.
                    nomePlano: 'Profissional',
                    alteracoes: [
                        { rotulo: 'Preço mensal', de: 149.9, para: 179.9, formato: 'moeda' },
                        { rotulo: 'Preço anual', de: 1499, para: 1799, formato: 'moeda' },
                        { rotulo: 'Recrutadores', de: 5, para: 10 },
                        { rotulo: 'Vagas', de: 50, para: 100 },
                        { rotulo: 'Candidatos', de: 1000, para: 2000 }
                    ],
                    aoConfirmar: () => alert('Alterações salvas com sucesso!'),
                    aoCancelar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#plano-atualizado':
                app.appendChild(renderModalPlanoAtualizado({
                    // Dados de exemplo, só para testar a rota.
                    plano: {
                        nome: 'Profissional',
                        precoMensal: 179.9,
                        precoAnual: 1799,
                        recrutadores: 10,
                        vagas: 100,
                        candidatos: 2000,
                        status: 'Ativo'
                    },
                    aoIrParaPlanos: () => { window.location.hash = '#home'; }, // trocar pela rota de Gerenciar Planos
                    aoFechar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#etapa-adicionada':
                app.appendChild(renderModalEtapaAdicionada({
                    // Dados de exemplo, só para testar a rota.
                    etapa: {
                        nome: 'Teste técnico',
                        tipo: 'Teste',
                        perguntas: 5,
                        duracao: 30,
                        notaMinima: 70
                    },
                    aoAdicionarOutra: () => { window.location.hash = '#home'; }, // trocar pela rota de nova etapa
                    aoVoltar: () => { window.location.hash = '#home'; }, // trocar pela rota do processo seletivo
                    aoFechar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#mover-candidato':
                app.appendChild(renderModalMoverCandidato({
                    // Dados de exemplo, só para testar a rota.
                    candidato: { nome: 'Ana Clara Silva', cargo: 'Analista de Dados', vaga: 'Analista de Dados Jr.' },
                    etapaAtual: { nome: 'Triagem', status: 'Em andamento' },
                    etapas: [
                        { valor: 'teste-tecnico', nome: 'Teste técnico', descricao: 'Teste de conhecimentos definido pelo recrutador.' },
                        { valor: 'entrevista', nome: 'Entrevista', descricao: 'Entrevista com o recrutador ou responsável pela vaga.' },
                        { valor: 'contratacao', nome: 'Contratação', descricao: 'Etapa final para candidatos aprovados.' }
                    ],
                    aoConfirmar: ({ etapa }) => {
                        console.log('Mover para:', etapa);
                        alert('Candidato movido com sucesso!');
                    },
                    aoCancelar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#candidato-movido':
                app.appendChild(renderModalCandidatoMovido({
                    // Dados de exemplo, só para testar a rota.
                    candidato: { nome: 'Ana Clara Silva', cargo: 'Analista de Dados' },
                    vaga: { titulo: 'Analista de Dados Jr.', empresa: 'Tech Soluções' },
                    etapaAnterior: 'Triagem',
                    etapaNova: 'Teste técnico',
                    dataMovimentacao: '12/09/2026 às 14:32',
                    movidoPor: { nome: 'Juliana Martins', cargo: 'Recrutadora' },
                    observacao: 'O candidato foi encaminhado para a próxima etapa.',
                    aoVerCandidatura: () => { window.location.hash = '#home'; }, // trocar pela rota da candidatura
                    aoFechar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#agendar-entrevista':
                app.appendChild(renderModalAgendarEntrevista({
                    // Dados de exemplo, só para testar a rota.
                    candidato: {
                        nome: 'Ana Clara Silva',
                        cargo: 'Analista de Dados',
                        local: 'São Paulo - SP',
                        modalidade: 'Híbrido',
                        email: 'ana.clara@email.com',
                        telefone: '(11) 91234-5678'
                    },
                    vaga: { titulo: 'Analista de Dados Jr.', empresa: 'Tech Soluções' },
                    entrevistadores: [
                        { id: 1, nome: 'Juliana Martins' },
                        { id: 2, nome: 'Ricardo Pereira' },
                        { id: 3, nome: 'Carlos Silva' }
                    ],
                    entrevistadoresSelecionados: [1, 2],
                    dataInicial: new Date(2026, 8, 15),
                    dataMinima: new Date(2026, 0, 1), // no uso real, omitir para bloquear datas passadas
                    horarioInicial: '10:00',
                    linkInicial: 'https://meet.google.com/abc-defg-hij',
                    aoConfirmar: (dados) => {
                        console.log('Agendamento:', dados);
                        alert('Entrevista agendada com sucesso!');
                    },
                    aoCancelar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#entrevista-agendada':
                app.appendChild(renderModalEntrevistaAgendada({
                    // Dados de exemplo, só para testar a rota.
                    candidato: { nome: 'Ana Clara Silva', cargo: 'Analista de Dados' },
                    vaga: { titulo: 'Analista de Dados Jr.', empresa: 'Tech Soluções' },
                    data: '2026-09-15',
                    horario: '10:00',
                    duracao: 60,
                    tipo: 'online',
                    link: 'https://meet.google.com/abc-defg-hij',
                    entrevistadores: [{ nome: 'Juliana Martins' }, { nome: 'Ricardo Pereira' }],
                    observacoes: 'Entrevista sobre experiência em Power BI e SQL.',
                    aoFechar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#cancelar-assinatura':
                app.appendChild(renderModalCancelarAssinatura({
                    // Dados de exemplo, só para testar a rota.
                    dataFimPeriodo: '05/10/2026',
                    planoDestino: 'Gratuito',
                    diasRetencao: 90,
                    aoConfirmar: ({ motivo, feedback }) => {
                        console.log('Cancelamento:', { motivo, feedback });
                        alert('Assinatura cancelada.');
                    },
                    aoVoltar: () => { window.location.hash = '#home'; }
                }));
                break;
            case '#home':
            case '':
            default:
                trocarEstiloPagina('home');
                app.appendChild(renderHome());
                break;
        }

        window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', navegar);
    window.addEventListener('load', navegar);
}