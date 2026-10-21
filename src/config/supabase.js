
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

// Validação de segurança para garantir que as variáveis existem
if (!supabaseUrl) {
  console.error("❌ ERRO: A SUPABASE_URL veio vazia! O .env não foi lido.");
}

// O createClient espera receber a URL e a Key separadas por vírgula, e não um objeto!
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;