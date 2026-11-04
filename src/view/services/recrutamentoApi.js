const CHAVE_DEMO = "conectaTalentThiago";

function salvarTemporariamente(tipo, dados) {
  const registros = JSON.parse(localStorage.getItem(CHAVE_DEMO) || "{}");
  registros[tipo] = dados;
  localStorage.setItem(CHAVE_DEMO, JSON.stringify(registros));
  return Promise.resolve({ sucesso: true, dados });
}

// Contratos temporários da View. Na integração, estas funções devem usar fetch relativo em /api.
export function criarVaga(dados) {
  return salvarTemporariamente("vagaCriada", dados);
}

export function atualizarVaga(dados) {
  return salvarTemporariamente("vagaAtualizada", dados);
}

export function criarRecrutador(dados) {
  return salvarTemporariamente("recrutador", dados);
}

export function atualizarPerfil(dados) {
  return salvarTemporariamente("perfil", dados);
}

export function alterarSenha(dados) {
  return salvarTemporariamente("alteracaoSenha", { alteradaEm: dados.alteradaEm });
}
