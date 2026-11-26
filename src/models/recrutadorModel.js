import { createClient } from '@supabase/supabase-js';

// Cliente com a secret key: só no backend, ignora RLS e permite auth.admin
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function convidarUsuarioRecrutador({ nome, email }) {
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email.trim(), {
    data: {
      display_name: nome.trim(),
      tipo: 'recrutador',
    },
  });

  if (error) throw error;
  return data?.user ?? null;
}

export async function garantirUsuarioRecrutador(id_usuario) {
  const { error } = await supabase
    .from('usuario')
    .upsert(
      {
        id_usuario,
        perfil_usuario: 'Recrutador',
        ativo: true,
      },
      { onConflict: 'id_usuario', ignoreDuplicates: true }
    );

  if (error) throw error;
}

export async function criarRecrutador({ cargo, id_usuario, id_empresa }) {
  const payload = {
    cargo: cargo.trim(),
    id_usuario,
    id_empresa: Number(id_empresa),
  };

  const { data, error } = await supabase
    .from('recrutador')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function buscarPorUsuario(id_usuario) {
  const { data, error } = await supabase
    .from('recrutador')
    .select('*')
    .eq('id_usuario', id_usuario)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function listarPorEmpresa(id_empresa) {
  const { data, error } = await supabase
    .from('recrutador')
    .select('*')
    .eq('id_empresa', Number(id_empresa));

  if (error) throw error;
  return data;
}

export async function atualizarRecrutador(id_recrutador, { cargo, id_empresa }) {
  const campos = {};
  if (cargo !== undefined) campos.cargo = cargo.trim();
  if (id_empresa !== undefined) campos.id_empresa = Number(id_empresa);

  if (Object.keys(campos).length === 0) {
    return null;
  }

  const { data, error } = await supabase
    .from('recrutador')
    .update(campos)
    .eq('id_recrutador', Number(id_recrutador))
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

// Busca metadados básicos no Auth (nome e status de confirmação de e-mail)
export async function buscarDadosAuth(id_usuario) {
  const { data, error } = await supabase.auth.admin.getUserById(id_usuario);

  if (error) {
    if (error.status === 404 || error.message?.toLowerCase().includes('not found')) {
      return {
        nome: null,
        email_confirmado: false,
        email: null,
      };
    }
    throw error;
  }

  const user = data?.user ?? null;
  const nome =
    user?.user_metadata?.display_name ??
    user?.user_metadata?.name ??
    null;

  const emailConfirmado = Boolean(user?.email_confirmed_at || user?.confirmed_at);

  return {
    nome,
    email_confirmado: emailConfirmado,
    email: user?.email ?? null,
  };
}

// O nome não existe em public.*; vem do user_metadata do Auth
export async function buscarNome(id_usuario) {
  const { nome } = await buscarDadosAuth(id_usuario);
  return nome;
}