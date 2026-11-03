class Authcontroller {
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
                    .json({ erro: `Preencha todos os campos obrigatórios` });
            }

            const resultado = await AuthService.cadastrar(
                nome, email, senha
            );
            return res
                .status(201)
                .json({
                    mensagem: `Cadastro feito com sucesso!`,
                    usuario: resultado.user
                });

        } catch (erro) {
            return res
                .status(400)
                .json({erro: `Falha ao cadastrar ${erro.message}`});
        }

    }
}

export default Authcontroller;