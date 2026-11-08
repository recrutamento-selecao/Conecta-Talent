// Dados simulados temporários. Remover quando houver autenticação e API.
export const USUARIO_SIMULADO = { nome: 'Usuário Simulado' };

// Futuramente: fetch('/api/candidato/candidaturas')
export const CANDIDATURAS = [
    { id: 1, vaga: 'Desenvolvedor Front-end', empresa: 'TechCorp Brasil', local: 'São Paulo - SP',       status: 'Em análise', dataCandidatura: '2026-09-15' },
    { id: 2, vaga: 'UX Designer',              empresa: 'Recruta+',        local: 'Rio de Janeiro - RJ',  status: 'Entrevista', dataCandidatura: '2026-09-12' },
    { id: 3, vaga: 'Analista de Dados',        empresa: 'StartUp Valley',  local: 'Florianópolis - SC',   status: 'Aprovado',   dataCandidatura: '2026-09-08' },
    { id: 4, vaga: 'Product Manager',          empresa: 'Global RH',       local: 'Belo Horizonte - MG',  status: 'Recusado',   dataCandidatura: '2026-09-05' },
    { id: 5, vaga: 'Dev Backend',              empresa: 'Educa Talentos',  local: 'Curitiba - PR',        status: 'Em análise', dataCandidatura: '2026-09-01' }
];

// Futuramente: fetch('/api/entrevistas/proximas')
export const ENTREVISTAS = [
    { id: 1, candidato: 'Ana Carolina Silva', vaga: 'Desenvolvedora Full Stack', dataHora: '2026-09-25T14:00:00', status: 'Agendada' },
    { id: 2, candidato: 'Ricardo Mendes',     vaga: 'Designer UX/UI',           dataHora: '2026-09-26T10:30:00', status: 'Confirmada' }
];

// Futuramente: fetch('/api/candidato/vagas-recomendadas')
export const VAGAS_RECOMENDADAS = [
    { id: 1, titulo: 'Desenvolvedor Full Stack', empresa: 'TechCorp Brasil', local: 'São Paulo - SP',      sigla: 'TC', salva: false },
    { id: 2, titulo: 'Designer de Produto',      empresa: 'Recruta+',        local: 'Rio de Janeiro - RJ', sigla: 'R+', salva: false },
    { id: 3, titulo: 'Engenheiro de Dados',      empresa: 'StartUp Valley',  local: 'Florianópolis - SC',  sigla: 'SV', salva: false },
    { id: 4, titulo: 'Gerente de Projetos',      empresa: 'Global RH',       local: 'Belo Horizonte - MG', sigla: 'GR', salva: false },
    { id: 5, titulo: 'Analista de Marketing',    empresa: 'Educa Talentos',  local: 'Curitiba - PR',       sigla: 'ET', salva: false }
];

// Futuramente: fetch('/api/usuarios')
export const USUARIOS = [
    { id: 1,  nome: 'BlueCore Sistemas',  email: 'contato@bluecore.com',          tipo: 'Empresa',    empresa: null,                 status: 'Ativo',      dataCadastro: '2026-09-20', ultimoAcesso: '2026-09-20T10:24:00' },
    { id: 2,  nome: 'Ana Souza',          email: 'ana.souza@bluecore.com',        tipo: 'Recrutador', empresa: 'BlueCore Sistemas',  status: 'Ativo',      dataCadastro: '2026-09-21', ultimoAcesso: '2026-09-22T14:18:00' },
    { id: 3,  nome: 'João Silva',         email: 'joao.silva@email.com',          tipo: 'Candidato',  empresa: null,                 status: 'Ativo',      dataCadastro: '2026-09-22', ultimoAcesso: '2026-09-22T09:15:00' },
    { id: 4,  nome: 'TechSol Tecnologia', email: 'contato@techsol.com',           tipo: 'Empresa',    empresa: null,                 status: 'Em análise', dataCadastro: '2026-09-18', ultimoAcesso: null },
    { id: 5,  nome: 'Marina Costa',       email: 'marina.costa@techsol.com',      tipo: 'Recrutador', empresa: 'TechSol Tecnologia', status: 'Ativo',      dataCadastro: '2026-09-18', ultimoAcesso: '2026-09-21T16:40:00' },
    { id: 6,  nome: 'Pedro Ramos',        email: 'pedro.ramos@email.com',         tipo: 'Candidato',  empresa: null,                 status: 'Inativo',    dataCadastro: '2026-09-15', ultimoAcesso: '2026-09-10T11:23:00' },
    { id: 7,  nome: 'Innovare RH',        email: 'contato@innovare.com',          tipo: 'Empresa',    empresa: null,                 status: 'Ativo',      dataCadastro: '2026-09-14', ultimoAcesso: '2026-09-22T08:50:00' },
    { id: 8,  nome: 'Luciana Mendes',     email: 'luciana.mendes@innovare.com',   tipo: 'Recrutador', empresa: 'Innovare RH',        status: 'Ativo',      dataCadastro: '2026-09-14', ultimoAcesso: '2026-09-22T13:27:00' },
    { id: 9,  nome: 'Carlos Pereira',     email: 'carlos.pereira@email.com',      tipo: 'Candidato',  empresa: null,                 status: 'Ativo',      dataCadastro: '2026-09-12', ultimoAcesso: '2026-09-21T17:05:00' },
    { id: 10, nome: 'EducaMais',          email: 'contato@educamais.com',         tipo: 'Empresa',    empresa: null,                 status: 'Bloqueado',  dataCadastro: '2026-09-10', ultimoAcesso: null }
];

// Futuramente: fetch('/api/empresas')
export const EMPRESAS_CADASTRADAS = [
    { id: 1, empresa: 'TechCorp Brasil', recrutadores: 12, vagas: 28, plano: 'Empresarial' },
    { id: 2, empresa: 'Recruta+',        recrutadores: 8,  vagas: 15, plano: 'Profissional' },
    { id: 3, empresa: 'StartUp Valley',  recrutadores: 3,  vagas: 7,  plano: 'Gratuito' },
    { id: 4, empresa: 'Global RH',       recrutadores: 22, vagas: 45, plano: 'Empresarial' },
    { id: 5, empresa: 'Educa Talentos',  recrutadores: 5,  vagas: 12, plano: 'Educacional' }
];

// Futuramente: fetch('/api/empresa/recrutadores')
export const RECRUTADORES = {
    ativos: 3,
    itens: [
        { id: 1, nome: 'Rafael Costa', empresa: 'Twelse LTDA', email: 'rafael@email.com',  status: 'Ativo' },
        { id: 2, nome: 'Beatriz Silva', empresa: 'Twelse LTDA', email: 'beatriz@email.com', status: 'Ativo' },
        { id: 3, nome: 'Lucas Mendes', empresa: 'Twelse LTDA', email: 'lucas@email.com',   status: 'Ativo' }
    ]
};

// Futuramente: fetch('/api/empresa/vagas')
export const VAGAS_CADASTRADAS = {
    total: 18,
    ativas: 2,
    itens: [
        { id: 1, cargo: 'Analista de Marketing',   area: 'Marketing',        status: 'Ativa',    candidatos: 48, etapaAtual: 'Triagem' },
        { id: 2, cargo: 'Desenvolvedor Front-end', area: 'Tecnologia',       status: 'Ativa',    candidatos: 36, etapaAtual: 'Entrevista' },
        { id: 3, cargo: 'Analista de RH',          area: 'Recursos Humanos', status: 'Pausada',  candidatos: 15, etapaAtual: 'Avaliação' },
        { id: 4, cargo: 'Designer UI/UX',          area: 'Design',           status: 'Rascunho', candidatos: 0,  etapaAtual: null }
    ]
};

// Futuramente: fetch('/api/candidatos/triagem')
export const CANDIDATOS_TRIAGEM = [
    { id: 1, nome: 'Juliana Carvalho',     email: 'juliana.carvalho@email.com', telefone: '(11)98765-5698', inscricao: '16/05/2025', diasAtras: 2, experiencia: '3 anos', area: 'Recursos humanos',  status: 'Em triagem' },
    { id: 2, nome: 'Pedro Henrique Silva', email: 'pedro.hsilva@email.com',     telefone: '(11)98765-5698', inscricao: '11/04/2025', diasAtras: 2, experiencia: '4 anos', area: 'Marketing',         status: 'Em triagem' },
    { id: 3, nome: 'Amanda Lima',          email: 'amandalima@email.com',       telefone: '(11)98765-5698', inscricao: '05/06/2025', diasAtras: 2, experiencia: '2 anos', area: 'Design gráfico',    status: 'Em triagem' },
    { id: 4, nome: 'Jurandir Gomes',       email: 'jurandir.gomes@email.com',   telefone: '(11)98765-5698', inscricao: '01/03/2025', diasAtras: 2, experiencia: '5 anos', area: 'Gestão de empresa', status: 'Em triagem' },
    { id: 5, nome: 'Vitor Preste',         email: 'vitor.preste@email.com',     telefone: '(11)98765-5698', inscricao: '17/05/2025', diasAtras: 2, experiencia: '7 anos', area: 'Marketing',         status: 'Em triagem' }
];