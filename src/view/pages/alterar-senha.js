import { criarSidebar } from "../components/sidebar.js";
import { criarSeletorSenha } from "../components/campos.js";
import { criarMensagem } from "../components/mensagem.js";
import { criarResultadoObjeto } from "../components/resultado.js";
import { criarElemento, criarPagina } from "../utils/dom.js";
import { limparErros, mostrarErro, senhaForte, senhasIguais, valorObrigatorio } from "../utils/validacao.js";
import { alterarSenha } from "../services/recrutamentoApi.js";

export function renderAlterarSenha() {
  const { pagina, conteudo } = criarPagina("pagina-alterar-senha", "Alterar senha", "Atualize sua senha de acesso com segurança");
  const formulario = criarElemento("form", "formulario-pagina formulario-senha");
  const cartao = criarElemento("section", "cartao");
  const atual = criarSeletorSenha("Senha atual", "senhaAtual");
  const nova = criarSeletorSenha("Nova senha", "novaSenha");
  const confirmar = criarSeletorSenha("Confirmar nova senha", "confirmarSenha");
  const regras = criarElemento("ul", "regras-senha");
  ["Mínimo de 8 caracteres", "Uma letra maiúscula", "Uma letra minúscula", "Um número", "Um caractere especial"].forEach((regra) => regras.append(criarElemento("li", "", regra)));
  const mensagem = criarMensagem();
  const resultado = criarResultadoObjeto();

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    limparErros(formulario);
    mensagem.esconder();
    let valido = true;
    if (!valorObrigatorio(atual.campo.value)) {
      mostrarErro(atual.campo, "Informe a senha atual");
      valido = false;
    }
    if (!senhaForte(nova.campo.value)) {
      mostrarErro(nova.campo, "A nova senha não atende aos requisitos");
      valido = false;
    }
    if (!valorObrigatorio(confirmar.campo.value)) {
      mostrarErro(confirmar.campo, "Confirme a nova senha");
      valido = false;
    } else if (!senhasIguais(nova.campo.value, confirmar.campo.value)) {
      mostrarErro(confirmar.campo, "As senhas não coincidem");
      valido = false;
    }
    if (!valido) return;

    const objeto = { alteradaEm: new Date().toISOString(), sessaoAtualMantida: true };
    await alterarSenha(objeto);
    resultado.atualizar(objeto);
    mensagem.mostrar("Senha validada e preparada para atualização.");
    formulario.reset();
  });

  const salvar = criarElemento("button", "botao-primario", "Atualizar senha");
  salvar.type = "submit";
  cartao.append(criarElemento("h2", "", "Dados de segurança"), atual.grupo, nova.grupo, confirmar.grupo, regras);
  formulario.append(cartao, mensagem.elemento, salvar);
  conteudo.append(formulario, resultado.elemento);
  pagina.prepend(criarSidebar());
  return pagina;
}
