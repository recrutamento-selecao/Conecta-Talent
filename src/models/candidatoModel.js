import { supabaseAdmin } from "../config/supabase.js";

class candidatoModel {
    static async criar(id_usuario, dados) {
        const {
            data,
            error
        } = await supabaseAdmin.from("candidato").insert({
            id_usuario: id_usuario,
            cpf: dados.cpf,
            data_nascimento: dados.data_nascimento,
            linkedin: dados.linkedin,
            url_portfolio: dados.url_portfolio,



        }).select().single();

        if (error) {
            throw error;
        }

        return data;

    }

}

export default candidatoModel;