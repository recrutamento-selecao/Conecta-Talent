export function obterRotaAtual() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return hash || "";
}

export function navegarPara(rota) {
  window.location.hash = rota;
}

export function iniciarRoteador(app, rotas, rotaInicial) {
  function renderizar() {
    const rota = obterRotaAtual() || rotaInicial;
    const renderPagina = rotas[rota] || rotas[rotaInicial];

    if (!rotas[rota]) {
      window.history.replaceState(null, "", `#${rotaInicial}`);
    }

    app.replaceChildren(renderPagina());
  }

  window.addEventListener("hashchange", renderizar);
  renderizar();
}
