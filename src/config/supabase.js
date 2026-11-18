import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const supabaseSecret = process.env.SUPABASE_SECRET_KEY;

// Validação de segurança para garantir que as variáveis existem
if (!supabaseUrl) {
  console.error("❌ ERRO: A SUPABASE_URL veio vazia! O .env não foi lido.");
}

// CLIENTE ADMINISTRATIVO (Service Role) - SOMENTE NO BACKEND
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecret, {
  auth: {
    autoRefreshToken: false,
    detectSessionInUrl: false,
    persistSession: false
  }
});

// CLIENTE PÚBLICO (Anon/Publishable)
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;


