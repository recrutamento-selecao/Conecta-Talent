import { criarSidebar } from "../components/sidebar.js";
import { criarCampo, criarSeletorSenha } from "../components/campos.js";
import { criarMensagem } from "../components/mensagem.js";
import { criarElemento, criarPagina, criarTituloCartao } from "../utils/dom.js";
import { criarRecrutador } from "../services/recrutamentoApi.js";
import { emailValido, senhaForte, senhasIguais } from "../utils/validacao.js";

const PERMISSOES = [
  ["publicarVagas", "Publicar vagas", "Cria e disponibiliza novas oportunidades."],
  ["editarVagas", "Editar vagas", "Atualiza vagas existentes e seus processos."],
  ["visualizarVagas", "Visualizar vagas", "Consulta vagas, métricas e candidaturas."],
  ["aprovarCandidatos", "Aprovar candidatos", "Avança candidatos entre as etapas."],
  ["reprovarCandidatos", "Reprovar candidatos", "Registra reprovações e devolutivas."]
];

export function renderCadastrarRecrutador() {
  const { pagina, conteudo } = criarPagina("pagina-recrutador", "Cadastrar recrutador", "Convide uma pessoa para o time e controle exatamente o que ela poderá fazer.", { breadcrumb: "Recrutadores  /  Cadastrar", badge: "Novo acesso" });
  pagina.prepend(criarSidebar("empresa", "Empresa01"));
  const formulario = criarElemento("form", "formulario-recrutador");
  const mensagem = criarMensagem();

  const dados = criarElemento("section", "cartao cartao-formulario");
  dados.append(criarTituloCartao("Dados do recrutador", "Informações usadas para identificar o novo integrante."));
  const gradeDados = criarElemento("div", "grade-campos duas-colunas");
  const nome = criarCampo({ nome: "nomeRecrutador", rotulo: "Nome completo", obrigatorio: true, placeholder: "Ex: Ana Carolina Souza", autocomplete: "name" });
  const cpf = criarCampo({ nome: "cpfRecrutador", rotulo: "CPF", obrigatorio: true, placeholder: "000.000.000-00" });
  const cargo = criarCampo({ nome: "cargoRecrutador", rotulo: "Cargo", obrigatorio: true, placeholder: "Ex: Analista de RH" });
  const email = criarCampo({ nome: "emailRecrutador", rotulo: "E-mail corporativo", tipo: "email", obrigatorio: true, placeholder: "nome@empresa.com", autocomplete: "email" });
  const telefone = criarCampo({ nome: "telefoneRecrutador", rotulo: "Telefone", placeholder: "(11) 99999-9999", autocomplete: "tel" });
  gradeDados.append(nome.grupo, cpf.grupo, cargo.grupo, email.grupo, telefone.grupo);
  dados.append(gradeDados);

  const acesso = criarElemento("section", "cartao cartao-formulario");
  acesso.append(criarTituloCartao("Dados de acesso", "A senha é validada no formulário, mas não é armazenada na simulação local."));
  const gradeAcesso = criarElemento("div", "grade-campos duas-colunas");
  const usuario = criarCampo({ nome: "usuarioRecrutador", rotulo: "Usuário", obrigatorio: true, placeholder: "ana.souza", autocomplete: "username" });
  const senha = criarSeletorSenha("Senha temporária", "senhaRecrutador", { obrigatorio: true, autocomplete: "new-password" });
  const confirmacao = criarSeletorSenha("Confirmar senha", "confirmacaoSenha", { obrigatorio: true, autocomplete: "new-password" });
  gradeAcesso.append(usuario.grupo, senha.grupo, confirmacao.grupo);
  const regraSenha = criarElemento("div", "regras-senha");
  regraSenha.append(criarElemento("strong", "", "A senha precisa ter:"), criarElemento("span", "", "8 caracteres • letra maiúscula • minúscula • número • símbolo"));
  acesso.append(gradeAcesso, regraSenha);

  const permissoesCard = criarElemento("section", "cartao cartao-formulario cartao-permissoes");
  permissoesCard.append(criarTituloCartao("Permissões e status", "Selecione os acessos necessários. Eles podem ser alterados depois."));
  const gradePermissoes = criarElemento("div", "grade-permissoes-status");
  const listaPermissoes = criarElemento("div", "lista-permissoes");
  const controlesPermissao = new Map();
  PERMISSOES.forEach(([chave, titulo, descricao], indice) => {
    const item = criarElemento("label", "permissao-item");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = indice >= 2;
    const texto = criarElemento("span", "");
    texto.append(criarElemento("strong", "", titulo), criarElemento("small", "", descricao));
    item.append(checkbox, texto);
    listaPermissoes.append(item);
    controlesPermissao.set(chave, checkbox);
  });
  const status = criarElemento("div", "painel-status");
  status.append(criarElemento("h3", "", "Status do acesso"), criarElemento("p", "", "Recrutadores inativos não conseguem entrar na plataforma."));
  const ativo = document.createElement("input");
  ativo.type = "radio"; ativo.name = "statusRecrutador"; ativo.value = "ativo"; ativo.checked = true;
  const inativo = document.createElement("input");
  inativo.type = "radio"; inativo.name = "statusRecrutador"; inativo.value = "inativo";
  const labelAtivo = criarElemento("label", "opcao-radio"); labelAtivo.append(ativo, criarElemento("span", "", "Ativo"));
  const labelInativo = criarElemento("label", "opcao-radio"); labelInativo.append(inativo, criarElemento("span", "", "Inativo"));
  status.append(labelAtivo, labelInativo);
  gradePermissoes.append(listaPermissoes, status);
  permissoesCard.append(gradePermissoes);

  const acoes = criarElemento("footer", "barra-acoes-flutuante");
  const cancelar = criarElemento("a", "botao-secundario link-como-botao", "Cancelar");
  cancelar.href = "#dashboard-empresa";
  const salvar = criarElemento("button", "botao-primario", "Salvar recrutador");
  salvar.type = "submit";
  acoes.append(mensagem.elemento, cancelar, salvar);
  formulario.append(dados, acesso, permissoesCard, acoes);
  conteudo.append(formulario);

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    mensagem.esconder();
    if (![nome.campo.value, cpf.campo.value, cargo.campo.value, email.campo.value, usuario.campo.value, senha.campo.value, confirmacao.campo.value].every((valor) => valor.trim())) {
      mensagem.mostrar("Preencha todos os campos obrigatórios.", "erro"); return;
    }
    if (!emailValido(email.campo.value)) { mensagem.mostrar("Informe um e-mail corporativo válido.", "erro"); return; }
    if (!senhaForte(senha.campo.value)) { mensagem.mostrar("A senha temporária não atende aos critérios de segurança.", "erro"); return; }
    if (!senhasIguais(senha.campo.value, confirmacao.campo.value)) { mensagem.mostrar("A confirmação de senha está diferente.", "erro"); return; }
    const permissoes = Object.fromEntries([...controlesPermissao].map(([chave, controle]) => [chave, controle.checked]));
    await criarRecrutador({
      nome: nome.campo.value.trim(), cpf: cpf.campo.value.trim(), cargo: cargo.campo.value.trim(),
      email: email.campo.value.trim(), telefone: telefone.campo.value.trim(), usuario: usuario.campo.value.trim(),
      permissoes, status: ativo.checked ? "ativo" : "inativo", criadoEm: new Date().toISOString(), origem: "simulacao-local"
    });
    mensagem.mostrar("Recrutador salvo neste navegador. A senha não foi armazenada.", "sucesso");
    senha.campo.value = ""; confirmacao.campo.value = "";
  });
  return pagina;
}