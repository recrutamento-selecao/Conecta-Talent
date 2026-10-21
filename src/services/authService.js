import supabase from "../config/supabase.js";

class AuthService {
    static async cadastrar(nome, email, senha) {

        const { data, error } = await supabase.auth.signUp(
            {
                email,
                password: senha,
                options: {
                    data: {
                        nome
                    }
                }
            }
        );

    if(error) throw error;
        return data;
    }
}
export default AuthService;