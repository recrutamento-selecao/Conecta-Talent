import { renderHome } from "../pages/home.js";
import { renderPlanos } from "../pages/planos.js";
import { renderRecursos } from "../pages/recursos.js";
import { renderSobreNos } from "../pages/sobre-nos.js";
import { renderSuporte } from "../pages/suporte.js";
import { renderTipoCadastro } from "../pages/tipo-cadastro.js";
import { renderVerificacao } from "../pages/autenticacao2FA.js";
import { renderMFAConfig } from "../pages/mfaConfig.js";
import { renderDashboardCandidato } from "../pages/dashboard-candidato.js";
import { renderDashboardEmpresa } from "../pages/dashboard-empresa.js";
import { renderDashboardRecrutador } from "../pages/dashboard-recrutador.js";
import { renderDashboardAdministrador } from "../pages/dashboard-administrador.js";
import { renderCandidatoVagas } from "../pages/candidato-vagas.js";
import { renderMeusDados } from "../pages/meus-dados.js";
import { renderCriarVaga } from "../pages/criar-vaga.js";
import { renderConfiguracaoVaga } from "../pages/configuracao-vaga.js";
import { renderCadastrarRecrutador } from "../pages/cadastrar-recrutador.js";
import { renderConfiguracaoConta } from "../pages/configuracao-conta.js";
import { renderMeuPerfil } from "../pages/meu-perfil.js";
import { renderGerenciarVagas } from "../pages/gerenciar-vagas.js";
import { renderGerenciarRecrutadores } from "../pages/gerenciar-recrutadores.js";

function trocarEstiloPagina(nomePagina) {
  document.getElementById("estilo-Dinamico-pagina")?.remove();
  const estilos = {
    "dashboard-empresa": "./css/dashboard-empresa.css",
    "dashboard-candidato": "./css/dashboard-candidato.css",
    "dashboard-recrutador": "./css/dashboard-recrutador.css",
    "dashboard-administrador": "./css/dashboard-administrador.css",
    "autenticacao2FA": "./css/autenticacao2FA.css",
    "verificacao": "./css/autenticacao2FA.css",
    "mfa-config": "./css/mfaConfig.css",
    "cadastro": "./css/cadastro.css",
    "login": "./css/login.css",
    "candidato-vagas": "./css/candidato-vagas.css",
    "meus-dados": "./css/meus-dados.css",
    "gerenciar-vagas": "./css/gerenciar-vagas.css",
    "gerenciar-recrutadores": "./css/gerenciar-recrutador.css"
  };
  const caminhoCss = estilos[nomePagina];
  if (!caminhoCss) return;
  const link = document.createElement("link");
  link.id = "estilo-Dinamico-pagina";
  link.rel = "stylesheet";
  link.href = caminhoCss;
  document.head.appendChild(link);
}

export function iniciarRouter() {
  const app = document.getElementById("app");

  function exibir(nome, renderizar) {
    trocarEstiloPagina(nome);
    app.replaceChildren(renderizar());
  }

  function navegar() {
    const hash = window.location.hash || "#home";
    switch (hash) {
      case "#sobre-nos": exibir("sobre-nos", renderSobreNos); break;
      case "#recursos": exibir("recursos", renderRecursos); break;
      case "#planos": exibir("planos", renderPlanos); break;
      case "#suporte": exibir("suporte", renderSuporte); break;
      case "#tipo-cadastro": exibir("tipo-cadastro", renderTipoCadastro); break;
      case "#candidato-vagas": exibir("candidato-vagas", renderCandidatoVagas); break;
      case "#dashboard-candidato": exibir("dashboard-candidato", renderDashboardCandidato); break;
      case "#dashboard-empresa": exibir("dashboard-empresa", renderDashboardEmpresa); break;
      case "#dashboard-recrutador": exibir("dashboard-recrutador", renderDashboardRecrutador); break;
      case "#dashboard-administrador": exibir("dashboard-administrador", renderDashboardAdministrador); break;
      case "#verificacao":
      case "#2fa": exibir("verificacao", renderVerificacao); break;
      case "#mfa-config":
      case "#mfa": exibir("mfa-config", renderMFAConfig); break;
      case "#meus-dados":
      case "#meus-dados-candidato": exibir("meus-dados", renderMeusDados); break;
      case "#gerenciar-vagas": exibir("gerenciar-vagas", renderGerenciarVagas); break;
      case "#gerenciar-recrutadores": exibir("gerenciar-recrutadores", renderGerenciarRecrutadores); break;
      case "#criar-vaga": exibir("criar-vaga", renderCriarVaga); break;
      case "#configuracao-vaga": exibir("configuracao-vaga", renderConfiguracaoVaga); break;
      case "#cadastrar-recrutador": exibir("cadastrar-recrutador", renderCadastrarRecrutador); break;
      case "#configuracao-conta":
      case "#alterar-senha": exibir("configuracao-conta", renderConfiguracaoConta); break;
      case "#meu-perfil":
      case "#dados-empresa": exibir("meu-perfil", renderMeuPerfil); break;
      case "#home":
      default: exibir("home", renderHome); break;
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", navegar);
  navegar();
}