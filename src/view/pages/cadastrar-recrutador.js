import { criarSidebar } from "../components/sidebar.js";
import { criarCampo, criarSeletorSenha } from "../components/campos.js";
import { criarMensagem } from "../components/mensagem.js";
import { criarResultadoObjeto } from "../components/resultado.js";
import { criarElemento, criarPagina } from "../utils/dom.js";
import { emailValido, limparErros, mostrarErro, senhaForte, senhasIguais, valorObrigatorio } from "../utils/validacao.js";
import { criarRecrutador } from "../services/recrutamentoApi.js";

export function renderCadastrarRecrutador() {
  const { pagina, conteudo } = criarPagina("pagina-cadastrar-recrutador", "Cadastrar recrutador", "Cadastre os dados e as permissões do novo usuário");
  const formulario = criarElemento("form", "formulario-pagina");
  const cartao = criarElemento("section", "cartao");
  const grade = criarElemento("div", "grade-campos duas-colunas");
  const mensagem = criarMensagem();
  const resultado = criarResultadoObjeto();
  const nome = criarCampo({ nome: "nome", rotulo: "Nome completo" });
  const cpf = criarCampo({ nome: "cpf", rotulo: "CPF" });
  const cargo = criarCampo({ nome: "cargo", rotulo: "Cargo" });
  const email = criarCampo({ nome: "email", rotulo: "E-mail corporativo", tipo: "email" });
  const telefone = criarCampo({ nome: "telefone", rotulo: "Telefone" });
  const usuario = criarCampo({ nome: "usuario", rotulo: "Usuário" });
  const senha = criarSeletorSenha("Senha", "senha");
  const confirmar = criarSeletorSenha("Confirmar senha", "confirmarSenha");
  [nome, cpf, cargo, email, telefone, usuario, senha, confirmar].forEach((item) => grade.append(item.grupo));

  const permissoes = criarElemento("fieldset", "grupo-permissoes");
  permissoes.append(criarElemento("legend", "", "Permissões"));
  ["publicarVagas", "editarVagas", "visualizarVagas", "aprovarCandidatos", "reprovarCandidatos"].forEach((permissao) => {
    const label = criarElemento("label", "opcao-marcacao");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = permissao;
    input.checked = true;
    label.append(input, document.createTextNode(permissao.replace(/([A-Z])/g, " $1").toLowerCase()));
    permissoes.append(label);
  });

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    limparErros(formulario);
    mensagem.esconder();
    let valido = true;
    [[nome.campo, "Informe o nome"], [cpf.campo, "Informe o CPF"], [cargo.campo, "Informe o cargo"], [usuario.campo, "Informe o usuário"]].forEach(([campo, erro]) => {
      if (!valorObrigatorio(campo.value)) {
        mostrarErro(campo, erro);
        valido = false;
      }
    });
    if (!emailValido(email.campo.value)) {
      mostrarErro(email.campo, "Informe um e-mail válido");
      valido = false;
    }
    if (!senhaForte(senha.campo.value)) {
      mostrarErro(senha.campo, "Use 8 caracteres, maiúscula, minúscula, número e símbolo");
      valido = false;
    }
    if (!valorObrigatorio(confirmar.campo.value)) {
      mostrarErro(confirmar.campo, "Confirme a senha");
      valido = false;
    } else if (!senhasIguais(senha.campo.value, confirmar.campo.value)) {
      mostrarErro(confirmar.campo, "As senhas não coincidem");
      valido = false;
    }
    if (!valido) return;

    const objeto = {
      nome: nome.campo.value.trim(),
      cpf: cpf.campo.value.trim(),
      cargo: cargo.campo.value.trim(),
      email: email.campo.value.trim(),
      telefone: telefone.campo.value.trim(),
      usuario: usuario.campo.value.trim(),
      status: "ativo",
      permissoes: Array.from(permissoes.querySelectorAll("input:checked"), (input) => input.name),
    };
    await criarRecrutador(objeto);
    resultado.atualizar(objeto);
    mensagem.mostrar("Recrutador validado e preparado para cadastro.");
  });

  const salvar = criarElemento("button", "botao-primario", "Salvar recrutador");
  salvar.type = "submit";
  cartao.append(criarElemento("h2", "", "Dados do recrutador"), grade, permissoes);
  formulario.append(cartao, mensagem.elemento, salvar);
  conteudo.append(formulario, resultado.elemento);
  pagina.prepend(criarSidebar());
  return pagina;
}
