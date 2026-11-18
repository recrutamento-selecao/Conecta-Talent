//VALIDA as permissões de acesso por cada tipo de usuário(gera um token a cada usuário se autentica)

import supabase from "../config/supabase";


class AuthMiddleware {
    static async validarToken(req, res) {
        try {
            const authorization = req.headers.authorization;
            if (!authorization?.startsWith("Bearer")) {
                return res.status(401).json({
                    erro: `Token não informado: ${erro.message}`
                });
            }
            const tokenExtraction = authorization.slice(7);
            const {
                data,
                erro
            } = await supabase.auth.getUser(tokenExtraction);

            if (erro || !data.user) {
                return res.status(401).json({
                    erro: `Token inválido ou expirado: ${erro.message}`
                });
            }

            req.usuario = data.user;
            req.tokenExtraction = tokenExtraction;
        }

        catch (erro) {
            return res.status(500).json({
                erro: `Erro ao validar a autenticação: ${erro.message}`
            });
        }
    }
}
