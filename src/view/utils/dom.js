export function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);

  if (classe) {
    elemento.className = classe;
  }

  if (texto !== undefined) {
    elemento.textContent = texto;
  }

  return elemento;
}

export function criarPagina(classeDaPagina, titulo, subtitulo) {
  const pagina = criarElemento("div", `pagina-recrutamento ${classeDaPagina}`);
  const conteudo = criarElemento("main", "pagina-conteudo");
  const cabecalho = criarElemento("header", "cabecalho-pagina");
  const tituloElemento = criarElemento("h1", "", titulo);

  cabecalho.append(tituloElemento);

  if (subtitulo) {
    cabecalho.append(criarElemento("p", "", subtitulo));
  }

  conteudo.append(cabecalho);
  pagina.append(conteudo);

  return { pagina, conteudo };
}
