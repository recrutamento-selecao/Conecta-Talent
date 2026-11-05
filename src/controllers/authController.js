import conn from "../config/database.js";

class Authcontroller {
    async cadastrar(req, res) {
        try {
            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).json({
                    erro: "Preencha todos os campos obrigatórios"
                });
            }

            const { data, error } = await conn.auth.signUp({
                email: email,
                password: senha,
                options: {
                    data: {
                        nome: nome
                    }
                }
            });

            if (error) {
                return res.status(400).json({
                    erro: error.message
                });
            }

            return res.status(201).json({
                mensagem: "Cadastro feito com sucesso!",
                usuario: data.user,
                requerConfirmacao: !data.session
            });

        } catch (erro) {
            return res.status(500).json({
                erro: `Falha ao cadastrar: ${erro.message}`
            });
        }
    }

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