import conn from "../config/database.js";

class Authcontroller {
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({
                    erro: "Preencha o e-mail e a senha"
                });
            }

            const { data, error } = await conn.auth.signInWithPassword({
                email: email,
                password: senha
            });

            if (error) {
                return res.status(401).json({
                    erro: "E-mail ou senha incorretos"
                });
            }

            return res.status(200).json({
                mensagem: "Login realizado com sucesso!",
                usuario: data.user,
                sessao: data.session
            });

        } catch (erro) {
            return res.status(500).json({
                erro: `Falha ao realizar login: ${erro.message}`
            });
        }
    }
}

export default new Authcontroller();