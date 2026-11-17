const CHAVE_DEMO = "conectaTalentAtividade";

function lerRegistros() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_DEMO) || "{}");
  } catch {
    return {};
  }
}

function salvarTemporariamente(tipo, dados) {
  const registros = lerRegistros();
  registros[tipo] = dados;
  localStorage.setItem(CHAVE_DEMO, JSON.stringify(registros));
  return Promise.resolve({ sucesso: true, dados, armazenamento: "localStorage" });
}

export function obterDadosLocais(tipo) {
  return lerRegistros()[tipo] || null;
}

export function criarVaga(dados) {
  return salvarTemporariamente("vagaCriada", dados);
}

export function salvarRascunhoVaga(dados) {
  return salvarTemporariamente("rascunhoVaga", dados);
}

export function atualizarVaga(dados) {
  return salvarTemporariamente("vagaAtualizada", dados);
}

export function criarRecrutador(dados) {
  const dadosSeguros = { ...dados };
  delete dadosSeguros.senha;
  delete dadosSeguros.confirmacaoSenha;
  return salvarTemporariamente("recrutador", dadosSeguros);
}

export function atualizarPerfil(dados) {
  return salvarTemporariamente("perfil", dados);
}

export function alterarEmail(dados) {
  return salvarTemporariamente("alteracaoEmail", {
    email: dados.email,
    alteradoEm: new Date().toISOString()
  });
}

export function alterarSenha() {
  return salvarTemporariamente("alteracaoSenha", {
    alteradaEm: new Date().toISOString()
  });
}

export function solicitarExclusaoConta() {
  return salvarTemporariamente("solicitacaoExclusao", {
    solicitadaEm: new Date().toISOString(),
    status: "simulacao-local"
  });
}