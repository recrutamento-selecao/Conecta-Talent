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