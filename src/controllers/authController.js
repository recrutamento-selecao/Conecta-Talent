import AuthService from "../services/authServices.js";
class AuthController {
    async cadastrar(req) {
        try {
            const {
                nome,
                email,
                senha
            } = req.body

            if (!nome || !email || !senha) {
                return res
                    .status(400)
                    .json({
                        erro: `Preencha todos os
                         campos obrigatórios`});
            }
            const resultado = await AuthService.cadastrar(
                nome, email, senha
            );
            return res
                .status(201)
                .json({
                    mensagem: ` Cadastro feito com sucesso!`,
                    usuario: resultado.user,
                    requerConfirmacao: !resultado.session
                });
        }
        catch (erro) {
            return res
                .status(400)
                .json({ erro: `Falha ao cadastrar: ${erro.massage}` });
        }
    }
}

export default AuthController;