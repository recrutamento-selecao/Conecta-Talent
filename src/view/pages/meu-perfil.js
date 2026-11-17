import { criarSidebar } from "../components/sidebar.js";
import { criarCampo } from "../components/campos.js";
import { criarMensagem } from "../components/mensagem.js";
import { criarElemento, criarPagina, criarTituloCartao } from "../utils/dom.js";
import { atualizarPerfil, obterDadosLocais } from "../services/recrutamentoApi.js";

export function renderMeuPerfil() {
  const { pagina, conteudo } = criarPagina("pagina-perfil-empresa", "Dados da empresa", "Mantenha o perfil institucional completo e confiável para candidatos.", { breadcrumb: "Configuração  /  Dados da empresa", badge: "Perfil 78% completo" });
  pagina.prepend(criarSidebar("empresa", "Empresa01"));
  const salvo = obterDadosLocais("perfil") || {};
  const formulario = criarElemento("form", "formulario-perfil");
  const mensagem = criarMensagem();

  const identidade = criarElemento("section", "cartao cartao-formulario");
  identidade.append(criarTituloCartao("Identidade da empresa", "Dados públicos usados nas vagas e na página institucional."));
  const marca = criarElemento("div", "bloco-marca");
  const logo = criarElemento("div", "logo-empresa-preview", "CT");
  const marcaTexto = criarElemento("div", "");
  marcaTexto.append(criarElemento("strong", "", "Logo da empresa"), criarElemento("span", "", "PNG ou JPG • máximo de 2 MB"));
  const alterarLogo = criarElemento("button", "botao-secundario botao-compacto", "Alterar logo");
  alterarLogo.type = "button";
  alterarLogo.addEventListener("click", () => mensagem.mostrar("Upload de logo demonstrativo; integração com arquivos depende da API.", "aviso"));
  marca.append(logo, marcaTexto, alterarLogo);
  const gradeIdentidade = criarElemento("div", "grade-campos duas-colunas");
  const razao = criarCampo({ nome: "razaoSocial", rotulo: "Razão social", obrigatorio: true, valor: salvo.razaoSocial || "Empresa Tecnologia e Soluções Ltda." });
  const fantasia = criarCampo({ nome: "nomeFantasia", rotulo: "Nome fantasia", obrigatorio: true, valor: salvo.nomeFantasia || "Conecta Talent" });
  const cnpj = criarCampo({ nome: "cnpj", rotulo: "CNPJ", obrigatorio: true, valor: salvo.cnpj || "12.345.678/0001-90" });
  const email = criarCampo({ nome: "emailCorporativo", rotulo: "E-mail corporativo", tipo: "email", valor: salvo.emailCorporativo || "contato@empresa.com.br" });
  const telefone = criarCampo({ nome: "telefoneEmpresa", rotulo: "Telefone", valor: salvo.telefone || "(11) 99876-5432" });
  const site = criarCampo({ nome: "siteEmpresa", rotulo: "Site", valor: salvo.site || "www.conectatalent.com.br" });
  gradeIdentidade.append(razao.grupo, fantasia.grupo, cnpj.grupo, email.grupo, telefone.grupo, site.grupo);
  identidade.append(marca, gradeIdentidade);

  const endereco = criarElemento("section", "cartao cartao-formulario");
  endereco.append(criarTituloCartao("Endereço", "Informe a sede ou principal unidade da empresa."));
  const gradeEndereco = criarElemento("div", "grade-campos grade-endereco");
  const cep = criarCampo({ nome: "cep", rotulo: "CEP", valor: salvo.cep || "04567-890" });
  const rua = criarCampo({ nome: "rua", rotulo: "Rua", valor: salvo.rua || "Rua das Palmeiras" });
  const numero = criarCampo({ nome: "numero", rotulo: "Número", valor: salvo.numero || "1000" });
  const cidade = criarCampo({ nome: "cidade", rotulo: "Cidade", valor: salvo.cidade || "Sorocaba" });
  const estado = criarCampo({ nome: "estado", rotulo: "Estado", valor: salvo.estado || "São Paulo" });
  const complemento = criarCampo({ nome: "complemento", rotulo: "Complemento", valor: salvo.complemento || "" });
  gradeEndereco.append(cep.grupo, rua.grupo, numero.grupo, cidade.grupo, estado.grupo, complemento.grupo);
  endereco.append(gradeEndereco);

  const sobre = criarElemento("section", "cartao cartao-formulario");
  sobre.append(criarTituloCartao("Sobre a empresa", "Conte brevemente o propósito e a cultura da organização."));
  const descricao = criarCampo({ nome: "sobreEmpresa", rotulo: "Descrição institucional", tipo: "textarea", valor: salvo.sobre || "Somos uma empresa dedicada a conectar talentos e oportunidades, tornando o recrutamento mais simples, ágil e eficiente." });
  sobre.append(descricao.grupo);

  const acoes = criarElemento("footer", "barra-acoes-flutuante");
  const cancelar = criarElemento("a", "botao-secundario link-como-botao", "Cancelar"); cancelar.href = "#dashboard-empresa";
  const salvar = criarElemento("button", "botao-primario", "Salvar alterações"); salvar.type = "submit";
  acoes.append(mensagem.elemento, cancelar, salvar);
  formulario.append(identidade, endereco, sobre, acoes);
  conteudo.append(formulario);

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (!razao.campo.value.trim() || !fantasia.campo.value.trim() || !cnpj.campo.value.trim()) { mensagem.mostrar("Preencha os dados obrigatórios da empresa.", "erro"); return; }
    await atualizarPerfil({
      razaoSocial: razao.campo.value.trim(), nomeFantasia: fantasia.campo.value.trim(), cnpj: cnpj.campo.value.trim(),
      emailCorporativo: email.campo.value.trim(), telefone: telefone.campo.value.trim(), site: site.campo.value.trim(),
      cep: cep.campo.value.trim(), rua: rua.campo.value.trim(), numero: numero.campo.value.trim(), cidade: cidade.campo.value.trim(), estado: estado.campo.value.trim(), complemento: complemento.campo.value.trim(),
      sobre: descricao.campo.value.trim(), atualizadaEm: new Date().toISOString(), origem: "simulacao-local"
    });
    mensagem.mostrar("Perfil salvo somente neste navegador (simulação com localStorage).", "aviso");
  });
  return pagina;
}