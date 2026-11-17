export function criarElemento(tag, classe = "", texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

export function criarPagina(classeDaPagina, titulo, subtitulo, opcoes = {}) {
  const pagina = criarElemento("div", `pagina-recrutamento ${classeDaPagina}`);
  const conteudo = criarElemento("main", "conteudo-principal pagina-conteudo");
  const cabecalho = criarElemento("header", "cabecalho-pagina");
  const breadcrumb = criarElemento("div", "breadcrumb-pagina", opcoes.breadcrumb || "Área da empresa");
  const linha = criarElemento("div", "cabecalho-pagina-linha");
  const blocoTitulo = criarElemento("div", "cabecalho-pagina-titulo");
  const tituloElemento = criarElemento("h1", "", titulo);
  blocoTitulo.append(tituloElemento);
  if (subtitulo) blocoTitulo.append(criarElemento("p", "", subtitulo));
  linha.append(blocoTitulo);
  if (opcoes.badge) linha.append(criarElemento("span", "badge-cabecalho", opcoes.badge));
  cabecalho.append(breadcrumb, linha);
  conteudo.append(cabecalho);
  pagina.append(conteudo);
  return { pagina, conteudo, cabecalho };
}

export function criarTituloCartao(titulo, subtitulo = "") {
  const cabecalho = criarElemento("header", "cabecalho-cartao");
  const textos = criarElemento("div", "");
  textos.append(criarElemento("h2", "", titulo));
  if (subtitulo) textos.append(criarElemento("p", "", subtitulo));
  cabecalho.append(textos);
  return cabecalho;
}