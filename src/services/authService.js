import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY
);

class AuthService {
    static async login(email, senha) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: senha
        });

        if (error) {
            throw new Error(error.message);
        }

        return {
            token: data.session?.access_token || null,
            session: data.session,
            user: data.user
        };
    }

    static async loginOAuth(provider, redirectTo) {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        return {
            url: data.url
        };
    }

    static async cadastrarCandidato(dados) {
        const { email, senha, nome, cpf, telefone } = dados;

        const { data, error } = await supabase.auth.signUp({
            email,
            password: senha,
            options: {
                data: {
                    nome,
                    cpf,
                    telefone,
                    perfil: "candidato"
                }
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        return {
            token: data.session?.access_token || null,
            session: data.session,
            user: data.user
        };
    }

    static async cadastrarEmpresa(dados) {
        const {
            email,
            senha,
            nomeEmpresa,
            cnpj,
            telefone,
            nomeFantasia,
            porte,
            tipo,
            endereco,
            cep,
            estado,
            cidade
        } = dados;

        const { data, error } = await supabase.auth.signUp({
            email,
            password: senha,
            options: {
                data: {
                    nomeEmpresa,
                    cnpj,
                    telefone,
                    nomeFantasia,
                    porte,
                    tipo,
                    endereco,
                    cep,
                    estado,
                    cidade,
                    perfil: "empresa"
                }
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        return {
            token: data.session?.access_token || null,
            session: data.session,
            user: data.user
        };
    }

    static async atualizarDadosEmpresa(usuario, dadosComplementares) {
        const { data, error } = await supabase.auth.updateUser({
            data: {
                ...usuario.user_metadata,
                ...dadosComplementares,
                perfil: "empresa"
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        return {
            user: data.user
        };
    }
}

export default AuthService;