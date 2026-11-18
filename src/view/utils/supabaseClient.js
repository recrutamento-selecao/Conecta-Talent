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

// Objeto proxy completo com suporte ao signInWithPassword, MFA e métodos essenciais
export const supabase = {
    auth: {
        async signInWithPassword(...args) {
            const client = await getSupabase();
            return client.auth.signInWithPassword(...args);
        },
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
        },
        mfa: {
            async enroll(...args) {
                const client = await getSupabase();
                return client.auth.mfa.enroll(...args);
            },
            async challenge(...args) {
                const client = await getSupabase();
                return client.auth.mfa.challenge(...args);
            },
            async verify(...args) {
                const client = await getSupabase();
                return client.auth.mfa.verify(...args);
            },
            async unenroll(...args) {
                const client = await getSupabase();
                return client.auth.mfa.unenroll(...args);
            },
            async listFactors(...args) {
                const client = await getSupabase();
                return client.auth.mfa.listFactors(...args);
            }
        }
    }
};

export default supabase;