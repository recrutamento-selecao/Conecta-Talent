import { criarSidebar } from "../components/sidebar.js";
import { criarCampo } from "../components/campos.js";
import { criarMensagem } from "../components/mensagem.js";
import { criarResultadoObjeto } from "../components/resultado.js";
import { criarElemento, criarPagina } from "../utils/dom.js";
import { emailValido, limparErros, mostrarErro, valorObrigatorio } from "../utils/validacao.js";
import { atualizarPerfil } from "../services/recrutamentoApi.js";

export function renderMeuPerfil(dadosIniciais = {}) {
  const { pagina, conteudo } = criarPagina("pagina-meu-perfil", "Meu perfil", "Gerencie as informações da empresa");
  const formulario = criarElemento("form", "formulario-pagina");
  const cartao = criarElemento("section", "cartao");
  const grade = criarElemento("div", "grade-campos duas-colunas");
  const mensagem = criarMensagem();
  const resultado = criarResultadoObjeto();
  const campos = {};
  const configuracoes = [
    ["razaoSocial", "Razão social"], ["nomeFantasia", "Nome fantasia"], ["cnpj", "CNPJ"],
    ["email", "E-mail corporativo", "email"], ["telefone", "Telefone"], ["site", "Site"],
    ["cep", "CEP"], ["rua", "Rua"], ["numero", "Número"], ["cidade", "Cidade"], ["estado", "Estado"],
    ["responsavel", "Responsável pela conta"], ["cargoResponsavel", "Cargo do responsável"],
  ];

  configuracoes.forEach(([nome, rotulo, tipo]) => {
    const campo = criarCampo({ nome, rotulo, tipo, valor: dadosIniciais[nome] || "" });
    campos[nome] = campo.campo;
    grade.append(campo.grupo);
  });
  const sobre = criarCampo({ nome: "sobre", rotulo: "Sobre a empresa", tipo: "textarea", valor: dadosIniciais.sobre || "" });

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    limparErros(formulario);
    mensagem.esconder();
    let valido = true;
    ["razaoSocial", "nomeFantasia", "cnpj", "responsavel"].forEach((nome) => {
      if (!valorObrigatorio(campos[nome].value)) {
        mostrarErro(campos[nome], "Campo obrigatório");
        valido = false;
      }
    });
    if (!emailValido(campos.email.value)) {
      mostrarErro(campos.email, "Informe um e-mail válido");
      valido = false;
    }
    if (!valido) return;

    const objeto = {
      empresa: {
        razaoSocial: campos.razaoSocial.value.trim(),
        nomeFantasia: campos.nomeFantasia.value.trim(),
        cnpj: campos.cnpj.value.trim(),
        email: campos.email.value.trim(),
        telefone: campos.telefone.value.trim(),
        site: campos.site.value.trim(),
        sobre: sobre.campo.value.trim(),
      },
      endereco: {
        cep: campos.cep.value.trim(), rua: campos.rua.value.trim(), numero: campos.numero.value.trim(),
        cidade: campos.cidade.value.trim(), estado: campos.estado.value.trim(),
      },
      responsavel: { nome: campos.responsavel.value.trim(), cargo: campos.cargoResponsavel.value.trim() },
      atualizadoEm: new Date().toISOString(),
    };
    await atualizarPerfil(objeto);
    resultado.atualizar(objeto);
    mensagem.mostrar("Perfil atualizado.");
  });

  const salvar = criarElemento("button", "botao-primario", "Salvar alterações");
  salvar.type = "submit";
  cartao.append(criarElemento("h2", "", "Informações da empresa"), grade, sobre.grupo);
  formulario.append(cartao, mensagem.elemento, salvar);
  conteudo.append(formulario, resultado.elemento);
  pagina.prepend(criarSidebar());
  return pagina;
}
