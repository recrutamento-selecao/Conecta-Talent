import { criarElemento } from "../utils/dom.js";

const itens = [
  ["criar-vaga", "Criar vaga"],
  ["configuracao-vaga", "Configurar vaga"],
  ["cadastrar-recrutador", "Cadastrar recrutador"],
  ["meu-perfil", "Meu perfil"],
  ["alterar-senha", "Alterar senha"],
];

export function criarSidebar() {
  const sidebar = criarElemento("aside", "sidebar-comum");
  const marca = criarElemento("div", "sidebar-marca", "Conecta Talent");
  const navegacao = criarElemento("nav", "sidebar-menu");
  const rotaAtual = window.location.hash.replace(/^#\/?/, "");

  itens.forEach(([rota, rotulo]) => {
    const link = criarElemento("a", rotaAtual === rota ? "ativo" : "", rotulo);
    link.href = `#${rota}`;
    navegacao.append(link);
  });

  const conta = criarElemento("div", "sidebar-conta");
  conta.append(criarElemento("strong", "", "Empresa01"));
  conta.append(criarElemento("span", "", "Recrutamento"));
  sidebar.append(marca, navegacao, conta);

  return sidebar;
}
