import { supabaseAdmin } from "../config/supabase.js";

class recrutadorModel {
    static async criar(id_usuario, dados) {
        const {
            data,
            error
        } = await supabaseAdmin.from("recrutador").insert({
            id_usuario: id_usuario,
            cargo: dados.cargo
        }).select().single();

        if (error) {
            throw error;
        }

        return data;

    }

}

export default recrutadorModel;