import AuthService from '../services/authService.js';

class AuthController {
    static async login(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
        }

        try {
            const resultado = await AuthService.login(email, senha);
            return res.status(200).json({
                mensagem: 'Login realizado com sucesso!',
                session: resultado.session,
                user: resultado.user
            });
        } catch (err) {
            return res.status(401).json({ erro: err.message || 'Credenciais inválidas.' });
        }
    }

    static async loginOAuth(req, res) {
        const { provider, redirectTo } = req.body;
        const provedoresPermitidos = {
            google: 'google',
            microsoft: 'azure'
        };

        const providerSupabase = provedoresPermitidos[provider];
        if (!providerSupabase) {
            return res.status(400).json({ erro: 'Provedor social inválido.' });
        }

        try {
            const resultado = await AuthService.loginOAuth(providerSupabase, redirectTo);
            return res.status(200).json({
                url: resultado.url
            });
        } catch (err) {
            return res.status(400).json({ erro: err.message || 'Erro ao iniciar login social.' });
        }
    }

    static async cadastrarCandidato(req, res) {
        const { email, senha, nome, cpf, telefone } = req.body;

        if (!email || !senha || !nome) {
            return res.status(400).json({ erro: 'Nome, e-mail e senha são obrigatórios.' });
        }

        try {
            const resultado = await AuthService.cadastrarCandidato({
                email,
                senha,
                nome,
                cpf,
                telefone
            });
            return res.status(201).json({
                mensagem: 'Cadastro realizado com sucesso!',
                session: resultado.session,
                user: resultado.user
            });
        } catch (err) {
            return res.status(400).json({ erro: err.message || 'Erro ao cadastrar.' });
        }
    }

    static async cadastrarEmpresa(req, res) {
        const { email, senha, nomeEmpresa, cnpj } = req.body;

        if (!email || !senha || !nomeEmpresa || !cnpj) {
            return res.status(400).json({ erro: 'Dados obrigatórios da empresa não preenchidos.' });
        }

        try {
            const resultado = await AuthService.cadastrarEmpresa(req.body);
            return res.status(201).json({
                mensagem: 'Empresa cadastrada com sucesso!',
                session: resultado.session,
                user: resultado.user
            });
        } catch (err) {
            return res.status(400).json({ erro: err.message || 'Erro ao cadastrar empresa.' });
        }
    }
}

export default AuthController;