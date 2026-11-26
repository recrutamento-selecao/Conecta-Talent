import {
  convidarUsuarioRecrutador,
  garantirUsuarioRecrutador,
  criarRecrutador,
  buscarPorUsuario,
  listarPorEmpresa,
  atualizarRecrutador,
  buscarDadosAuth,
} from '../models/recrutadorModel.js';

function parseInteiroPositivo(valor) {
  const numero = Number(valor);
  if (!Number.isInteger(numero) || numero <= 0) {
    return null;
  }
  return numero;
}

function tratarErro(res, error) {
  if (error.code === '23505') {
    return res.status(409).json({ erro: 'Este usuário já é recrutador.' });
  }
  if (error.code === '23503') {
    return res.status(400).json({ erro: 'Usuário ou empresa inexistente.' });
  }
  if (error.code === '22P02') {
    return res.status(400).json({ erro: 'Identificador em formato inválido.' });
  }
  if (error?.status && error.status >= 400 && error.status < 500) {
    return res.status(400).json({ erro: error.message || 'Dados inválidos para convite.' });
  }
  console.error(error);
  return res.status(500).json({ erro: 'Erro interno do servidor.' });
}

export async function criar(req, res) {
  const { cargo, id_usuario, id_empresa, nome, email } = req.body;

  if (typeof cargo !== 'string' || !cargo.trim() || id_empresa === undefined) {
    return res.status(400).json({ erro: 'cargo e id_empresa são obrigatórios.' });
  }

  const idEmpresaInt = parseInteiroPositivo(id_empresa);
  if (!idEmpresaInt) {
    return res.status(400).json({ erro: 'id_empresa deve ser um número inteiro positivo.' });
  }

  const fluxoConvite = !id_usuario && (nome !== undefined || email !== undefined);

  if (fluxoConvite) {
    if (typeof nome !== 'string' || !nome.trim() || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ erro: 'nome e email são obrigatórios para convidar recrutador.' });
    }
  } else if (!id_usuario) {
    return res.status(400).json({ erro: 'Informe id_usuario ou (nome e email) para criar o recrutador.' });
  }

  try {
    let usuarioIdFinal = id_usuario;

    if (fluxoConvite) {
      const usuarioConvidado = await convidarUsuarioRecrutador({ nome, email });
      if (!usuarioConvidado?.id) {
        return res.status(500).json({ erro: 'Não foi possível obter o ID do usuário convidado.' });
      }
      usuarioIdFinal = usuarioConvidado.id;
    }

    await garantirUsuarioRecrutador(usuarioIdFinal);

    const recrutador = await criarRecrutador({
      cargo: cargo.trim(),
      id_usuario: usuarioIdFinal,
      id_empresa: idEmpresaInt,
    });

    const dadosAuth = await buscarDadosAuth(usuarioIdFinal);

    return res.status(201).json({
      ...recrutador,
      nome: dadosAuth.nome ?? (fluxoConvite ? nome.trim() : null),
      email: dadosAuth.email ?? (fluxoConvite ? email.trim() : null),
      email_confirmado: dadosAuth.email_confirmado,
    });
  } catch (error) {
    return tratarErro(res, error);
  }
}

export async function buscarPorIdUsuario(req, res) {
  try {
    const recrutador = await buscarPorUsuario(req.params.id_usuario);
    if (!recrutador) {
      return res.status(404).json({ erro: 'Recrutador não encontrado.' });
    }

    const { nome, email, email_confirmado } = await buscarDadosAuth(recrutador.id_usuario);
    return res.json({
      ...recrutador,
      nome,
      email,
      email_confirmado,
    });
  } catch (error) {
    return tratarErro(res, error);
  }
}

export async function listarDaEmpresa(req, res) {
  const idEmpresaInt = parseInteiroPositivo(req.params.id_empresa);
  if (!idEmpresaInt) {
    return res.status(400).json({ erro: 'id_empresa deve ser um número inteiro positivo.' });
  }

  try {
    const recrutadores = await listarPorEmpresa(idEmpresaInt);
    const comDadosAuth = await Promise.all(
      recrutadores.map(async (r) => {
        const { nome, email, email_confirmado } = await buscarDadosAuth(r.id_usuario);
        return {
          ...r,
          nome,
          email,
          email_confirmado,
        };
      })
    );
    return res.json(comDadosAuth);
  } catch (error) {
    return tratarErro(res, error);
  }
}

export async function atualizar(req, res) {
  const idRecrutadorInt = parseInteiroPositivo(req.params.id_recrutador);
  if (!idRecrutadorInt) {
    return res.status(400).json({ erro: 'id_recrutador deve ser um número inteiro positivo.' });
  }

  const { cargo, id_empresa } = req.body;
  const dadosAtualizacao = {};

  if (cargo !== undefined) {
    if (typeof cargo !== 'string' || !cargo.trim()) {
      return res.status(400).json({ erro: 'cargo não pode ser vazio.' });
    }
    dadosAtualizacao.cargo = cargo.trim();
  }

  if (id_empresa !== undefined) {
    const idEmpresaInt = parseInteiroPositivo(id_empresa);
    if (!idEmpresaInt) {
      return res.status(400).json({ erro: 'id_empresa deve ser um número inteiro positivo.' });
    }
    dadosAtualizacao.id_empresa = idEmpresaInt;
  }

  if (Object.keys(dadosAtualizacao).length === 0) {
    return res.status(400).json({ erro: 'Informe ao menos cargo ou id_empresa para atualizar.' });
  }

  try {
    const recrutador = await atualizarRecrutador(idRecrutadorInt, dadosAtualizacao);
    if (!recrutador) {
      return res.status(404).json({ erro: 'Recrutador não encontrado.' });
    }
    return res.json(recrutador);
  } catch (error) {
    return tratarErro(res, error);
  }
}