import { iniciarRoteador } from "./utils/router.js";
import { renderCriarVaga } from "./pages/criar-vaga.js";
import { renderConfiguracaoVaga } from "./pages/configuracao-vaga.js";
import { renderCadastrarRecrutador } from "./pages/cadastrar-recrutador.js";
import { renderMeuPerfil } from "./pages/meu-perfil.js";
import { renderAlterarSenha } from "./pages/alterar-senha.js";

const rotas = {
  "criar-vaga": renderCriarVaga,
  "configuracao-vaga": renderConfiguracaoVaga,
  "cadastrar-recrutador": renderCadastrarRecrutador,
  "meu-perfil": renderMeuPerfil,
  "alterar-senha": renderAlterarSenha,
};

iniciarRoteador(document.querySelector("#app"), rotas, "criar-vaga");
