import { criarSidebar } from "../components/sidebar.js";
import { criarEditorEtapas } from "../components/etapas.js";
import { criarMensagem } from "../components/mensagem.js";
import { criarElemento, criarPagina, criarTituloCartao } from "../utils/dom.js";
import { atualizarVaga, obterDadosLocais } from "../services/recrutamentoApi.js";

const ETAPAS_INICIAIS = [
  { nome: "Triagem de currículos", tipo: "triagem", descricao: "Análise do perfil profissional.", duracao: "2 dias", responsavel: "RH", obrigatoria: true },
  { nome: "Entrevista com RH", tipo: "entrevista", descricao: "Conversa sobre experiências e cultura.", duracao: "45 minutos", responsavel: "Recrutamento", obrigatoria: true },
  { nome: "Entrevista técnica", tipo: "entrevista", descricao: "Avaliação dos conhecimentos da área.", duracao: "1 hora", responsavel: "Gestor da área", obrigatoria: true },
  { nome: "Proposta", tipo: "contratacao", descricao: "Alinhamento final e envio da proposta.", duracao: "1 dia", responsavel: "RH", obrigatoria: true }
];

export function renderConfiguracaoVaga() {
  const { pagina, conteudo } = criarPagina("pagina-configuracao-vaga", "Configuração da vaga", "Estruture um processo seletivo claro, previsível e fácil de acompanhar.", { breadcrumb: "Vagas  /  Configuração", badge: "Editor avançado" });
  pagina.prepend(criarSidebar("empresa", "Empresa01"));
  const mensagem = criarMensagem();
  const cartao = criarElemento("section", "cartao cartao-formulario");
  cartao.append(criarTituloCartao("Etapas de recrutamento", "Adicione, edite ou reorganize cada etapa. Testes podem conter perguntas e critérios de aprovação."));
  const dadosSalvos = obterDadosLocais("vagaAtualizada");
  const editor = criarEditorEtapas(dadosSalvos?.processo?.etapas || ETAPAS_INICIAIS);
  const rodape = criarElemento("footer", "acoes-formulario-vaga");
  const voltar = criarElemento("a", "botao-secundario link-como-botao", "Voltar para a vaga");
  voltar.href = "#criar-vaga";
  const salvar = criarElemento("button", "botao-primario", "Salvar configuração");
  salvar.type = "button";
  rodape.append(voltar, salvar);
  cartao.append(editor.elemento, mensagem.elemento, rodape);
  const dica = criarElemento("aside", "cartao faixa-dica");
  dica.append(criarElemento("span", "faixa-dica-icone", "✓"), criarElemento("div", "", "Boas práticas"));
  dica.lastElementChild.append(criarElemento("strong", "", "Mantenha o candidato informado"), criarElemento("p", "", "Use descrições objetivas, responsáveis definidos e apenas as avaliações necessárias para a decisão."));
  conteudo.append(dica, cartao);
  salvar.addEventListener("click", async () => {
    const etapas = editor.obterEtapas();
    if (!etapas.length) {
      mensagem.mostrar("Adicione ao menos uma etapa antes de salvar.", "erro");
      return;
    }
    await atualizarVaga({ processo: { etapas }, atualizadaEm: new Date().toISOString(), origem: "simulacao-local" });
    mensagem.mostrar("Configuração salva somente neste navegador (simulação com localStorage).", "aviso");
  });
  return pagina;
}