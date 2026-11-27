import conn from "../config/database.js";

class AuthMiddleware {
    static async validarToken(req, res, next) {
        try {
            const authorization = req.headers.authorization;

            if (!authorization || !authorization.startsWith("Bearer ")) {
                return res.status(401).json({
                    erro: "Token de autenticação não informado."
                });
            }

            const tokenExtraction = authorization.slice(7).trim();

            if (!tokenExtraction) {
                return res.status(401).json({
                    erro: "Token de autenticação vazio."
                });
            }

            const { data, error } = await conn.auth.getUser(tokenExtraction);

            if (error || !data?.user) {
                return res.status(401).json({
                    erro: `Token inválido ou expirado: ${error?.message || "sessão não encontrada"}`
                });
            }

            req.usuario = data.user;
            req.tokenExtraction = tokenExtraction;
            next();
        } catch (error) {
            return res.status(500).json({
                erro: `Erro ao validar autenticação: ${error.message}`
            });
        }
    }
}

export default AuthMiddleware;