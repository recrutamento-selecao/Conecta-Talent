import conn from "../config/database.js";
import { criarRecrutador } from '../models/recrutadorModel.js';

class Authcontroller {
    async cadastrar(req, res) {
        try {
            const { nome, email, senha, tipo, cargo, id_empresa } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).json({
                    erro: "Preencha todos os campos obrigatórios"
                });
            }

            if (tipo === 'recrutador' && (!cargo || !cargo.trim() || !id_empresa)) {
                return res.status(400).json({
                    erro: "Cargo e empresa são obrigatórios para recrutador"
                });
            }

            const { data, error } = await conn.auth.signUp({
                email,
                password: senha,
                options: {
                    data: {
                        display_name: nome.trim(),
                        ...(tipo ? { tipo } : {})
                    }
                }
            });

            if (error) {
                return res.status(400).json({
                    erro: error.message
                });
            }

            if (!data?.user?.id) {
                return res.status(500).json({
                    erro: "Usuário criado no Auth sem ID retornado."
                });
            }

            let recrutador = null;

            if (tipo === 'recrutador') {
                recrutador = await criarRecrutador({
                    cargo: cargo.trim(),
                    id_usuario: data.user.id,
                    id_empresa
                });
            }

            return res.status(201).json({
                mensagem: "Cadastro feito com sucesso!",
                usuario: data.user,
                recrutador,
                requerConfirmacao: !data.session
            });

        } catch (erro) {
            if (erro.code === '23505') {
                return res.status(409).json({
                    erro: "Este usuário já possui cadastro como recrutador."
                });
            }

            if (erro.code === '23503') {
                return res.status(400).json({
                    erro: "Vínculo inválido: verifique usuário (public.usuario) e empresa (id_empresa)."
                });
            }

            return res.status(500).json({
                erro: `Falha ao cadastrar: ${erro.message}`
            });
        }
    }

    // login continua igual
}

export default new Authcontroller();