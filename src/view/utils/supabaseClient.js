import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

let supabaseInstance = null;

async function getSupabase() {
    if (supabaseInstance) return supabaseInstance;

    try {
        const response = await fetch('/api/supabase-config');
        const config = await response.json();

        if (!config.supabaseUrl || !config.supabaseKey) {
            console.error("❌ ERRO: As variáveis do Supabase não foram carregadas do servidor!");
        }

        supabaseInstance = createClient(config.supabaseUrl, config.supabaseKey);
        return supabaseInstance;
    } catch (error) {
        console.error("Erro ao obter a configuração do Supabase:", error);
        throw error;
    }
}

// Objeto proxy exportado para manter a mesma interface compatível com o resto da aplicação
export const supabase = {
    auth: {
        async verifyOtp(...args) {
            const client = await getSupabase();
            return client.auth.verifyOtp(...args);
        },
        async signInWithOtp(...args) {
            const client = await getSupabase();
            return client.auth.signInWithOtp(...args);
        },
        async signOut(...args) {
            const client = await getSupabase();
            return client.auth.signOut(...args);
        },
        async getSession(...args) {
            const client = await getSupabase();
            return client.auth.getSession(...args);
        }
    }
};

export default supabase;