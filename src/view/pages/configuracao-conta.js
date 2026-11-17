import { criarSidebar } from "../components/sidebar.js";
import { criarCampo, criarSeletorSenha } from "../components/campos.js";
import { criarMensagem } from "../components/mensagem.js";
import { criarElemento, criarPagina, criarTituloCartao } from "../utils/dom.js";
import { alterarEmail, alterarSenha, solicitarExclusaoConta } from "../services/recrutamentoApi.js";
import { emailValido, senhaForte, senhasIguais } from "../utils/validacao.js";

function criarAcaoForm(botaoTexto) {
  const rodape = criarElemento("footer", "cartao-acoes");
  const mensagem = criarMensagem();
  const botao = criarElemento("button", "botao-primario", botaoTexto);
  botao.type = "submit";
  rodape.append(mensagem.elemento, botao);
  return { rodape, mensagem, botao };
}

export function renderConfiguracaoConta() {
  const { pagina, conteudo } = criarPagina("pagina-conta", "Conta e segurança", "Gerencie credenciais e ações sensíveis em áreas separadas.", { breadcrumb: "Configuração  /  Conta e segurança", badge: "Área protegida" });
  pagina.prepend(criarSidebar("empresa", "Empresa01"));
  const layout = criarElemento("div", "layout-conta");

  const emailForm = criarElemento("form", "cartao cartao-formulario");
  emailForm.append(criarTituloCartao("Alterar e-mail", "O novo endereço será usado no próximo acesso à plataforma."));
  const emailAtual = criarElemento("div", "email-atual");
  emailAtual.append(criarElemento("span", "", "E-mail atual"), criarElemento("strong", "", "contato@empresa.com.br"));
  const novoEmail = criarCampo({ nome: "novoEmail", rotulo: "Novo e-mail corporativo", tipo: "email", obrigatorio: true, placeholder: "novo@empresa.com.br", autocomplete: "email" });
  const confirmarEmail = criarCampo({ nome: "confirmarEmail", rotulo: "Confirmar novo e-mail", tipo: "email", obrigatorio: true, placeholder: "Repita o novo e-mail" });
  const acaoEmail = criarAcaoForm("Atualizar e-mail");
  const gradeEmail = criarElemento("div", "grade-campos duas-colunas");
  gradeEmail.append(novoEmail.grupo, confirmarEmail.grupo);
  emailForm.append(emailAtual, gradeEmail, acaoEmail.rodape);

  const senhaForm = criarElemento("form", "cartao cartao-formulario");
  senhaForm.append(criarTituloCartao("Alterar senha", "Use uma combinação exclusiva e mantenha sua conta protegida."));
  const gradeSenha = criarElemento("div", "grade-campos");
  const senhaAtual = criarSeletorSenha("Senha atual", "senhaAtual", { obrigatorio: true, autocomplete: "current-password" });
  const novaSenha = criarSeletorSenha("Nova senha", "novaSenha", { obrigatorio: true, autocomplete: "new-password" });
  const confirmarSenha = criarSeletorSenha("Confirmar nova senha", "confirmarNovaSenha", { obrigatorio: true, autocomplete: "new-password" });
  gradeSenha.append(senhaAtual.grupo, novaSenha.grupo, confirmarSenha.grupo);
  const regras = criarElemento("div", "regras-senha regras-senha-grade");
  ["Mínimo de 8 caracteres", "Uma letra maiúscula", "Uma letra minúscula", "Um número", "Um caractere especial"].forEach((regra) => regras.append(criarElemento("span", "", `✓ ${regra}`)));
  const acaoSenha = criarAcaoForm("Atualizar senha");
  senhaForm.append(gradeSenha, regras, acaoSenha.rodape);

  const exclusaoForm = criarElemento("form", "cartao cartao-formulario zona-perigo");
  exclusaoForm.append(criarTituloCartao("Excluir conta", "Esta ação é sensível. Na atividade, ela é apenas simulada localmente."));
  const alerta = criarElemento("div", "alerta-perigo");
  alerta.append(criarElemento("strong", "", "Atenção: ação irreversível em produção"), criarElemento("p", "", "Para confirmar, digite EXCLUIR no campo abaixo."));
  const confirmacao = criarCampo({ nome: "confirmarExclusao", rotulo: "Confirmação", obrigatorio: true, placeholder: "EXCLUIR" });
  const acaoExclusao = criarAcaoForm("Solicitar exclusão");
  acaoExclusao.botao.className = "botao-perigo";
  exclusaoForm.append(alerta, confirmacao.grupo, acaoExclusao.rodape);

  layout.append(emailForm, senhaForm, exclusaoForm);
  conteudo.append(layout);

  emailForm.addEventListener("submit", async (evento) => {
    evento.preventDefault(); acaoEmail.mensagem.esconder();
    if (!emailValido(novoEmail.campo.value) || novoEmail.campo.value !== confirmarEmail.campo.value) {
      acaoEmail.mensagem.mostrar("Informe e confirme um e-mail válido.", "erro"); return;
    }
    await alterarEmail({ email: novoEmail.campo.value.trim() });
    acaoEmail.mensagem.mostrar("E-mail alterado na simulação local.", "aviso");
  });

  senhaForm.addEventListener("submit", async (evento) => {
    evento.preventDefault(); acaoSenha.mensagem.esconder();
    if (!senhaAtual.campo.value) { acaoSenha.mensagem.mostrar("Informe a senha atual.", "erro"); return; }
    if (!senhaForte(novaSenha.campo.value)) { acaoSenha.mensagem.mostrar("A nova senha não atende aos critérios.", "erro"); return; }
    if (!senhasIguais(novaSenha.campo.value, confirmarSenha.campo.value)) { acaoSenha.mensagem.mostrar("As novas senhas não coincidem.", "erro"); return; }
    await alterarSenha();
    senhaAtual.campo.value = ""; novaSenha.campo.value = ""; confirmarSenha.campo.value = "";
    acaoSenha.mensagem.mostrar("Senha validada; somente a data da simulação foi armazenada.", "sucesso");
  });

  exclusaoForm.addEventListener("submit", async (evento) => {
    evento.preventDefault(); acaoExclusao.mensagem.esconder();
    if (confirmacao.campo.value.trim() !== "EXCLUIR") { acaoExclusao.mensagem.mostrar("Digite EXCLUIR exatamente como solicitado.", "erro"); return; }
    await solicitarExclusaoConta();
    acaoExclusao.mensagem.mostrar("Solicitação registrada apenas na simulação local.", "aviso");
    confirmacao.campo.value = "";
  });
  return pagina;
}