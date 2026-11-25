import { criarSidebar } from "../components/sidebar.js";

const DADOS_INICIAIS_EMPRESA = {
  razaoSocial: "Banco do Brasil S.A.",
  nomeFantasia: "Banco do Brasil",
  cnpj: "00.000.000/0001-91",
  unidade: "Unidade Sorocaba - Campolim",
  tipoEmpresa: "Filial",
  porteEmpresa: "Grande porte",
  telefones: [
    {
      id: "tel-1",
      ddi: "55",
      ddd: "15",
      numero: "3211-0000",
      tipoTelefone: "Comercial"
    }
  ],
  cep: "18035-000",
  logradouro: "Av. Antônio Carlos Comitre",
  numero: "1200",
  complemento: "Conjunto 42",
  bairro: "Parque Campolim",
  cidade: "Sorocaba",
  estado: "SP"
};

const ESTADOS_BR = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const TIPOS_TELEFONE = ["Comercial", "WhatsApp", "Celular", "Fixo", "SAC / Central"];

function escaparHtml(texto = "") {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clonarDados(dados) {
  return {
    ...dados,
    telefones: (dados.telefones || []).map(tel => ({ ...tel }))
  };
}

function formatarCnpj(valor = "") {
  const digitos = valor.replace(/\D/g, "").slice(0, 14);
  return digitos
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function formatarNumeroTelefone(valor = "") {
  const digitos = valor.replace(/\D/g, "").slice(0, 9);
  if (digitos.length <= 8) {
    return digitos.replace(/^(\d{4})(\d)/, "$1-$2");
  }
  return digitos.replace(/^(\d{5})(\d)/, "$1-$2");
}

function formatarCep(valor = "") {
  const digitos = valor.replace(/\D/g, "").slice(0, 8);
  return digitos.replace(/^(\d{5})(\d)/, "$1-$2");
}

export function renderMeusDadosEmpresa(usuarioLogado = "Empresa") {
  const container = document.createElement("div");
  container.className = "pagina-layout-dashboard de-layout";

  const sidebar = criarSidebar("empresa", usuarioLogado);
  container.appendChild(sidebar);

  const main = document.createElement("main");
  main.className = "conteudo-principal de-main";
  container.appendChild(main);

  let dadosSalvos = clonarDados(DADOS_INICIAIS_EMPRESA);
  let rascunho = clonarDados(dadosSalvos);
  let modoEdicao = false;
  let mensagemFeedback = null;
  let contadorTelefone = rascunho.telefones.length + 1;

  function validarFormulario(dados) {
    if (!dados.razaoSocial.trim() || !dados.nomeFantasia.trim()) {
      return "Preencha a Razão social e o Nome fantasia.";
    }
    if (dados.cnpj.replace(/\D/g, "").length !== 14) {
      return "Informe um CNPJ válido com 14 dígitos.";
    }
    if (!dados.unidade.trim()) {
      return "Informe a Unidade da empresa (ex.: Matriz, Unidade Sorocaba).";
    }

    const telefones = dados.telefones || [];
    if (telefones.length === 0) {
      return "Adicione pelo menos um telefone de contato.";
    }

    for (let i = 0; i < telefones.length; i++) {
      const tel = telefones[i];
      if (!tel.ddd.trim() || !tel.numero.trim()) {
        return `Preencha o DDD e o número do telefone ${i + 1}.`;
      }
    }

    if (!dados.cidade.trim() || !dados.estado.trim()) {
      return "Preencha a Cidade e o Estado (UF).";
    }
    return null;
  }

  function renderizarTelefones(telefones, disabledAttr) {
    return telefones
      .map((tel, index) => {
        const podeRemover = modoEdicao && telefones.length > 1;

        return `
          <div class="de-telefone-item" data-tel-index="${index}">
            <div class="de-telefone-topo">
              <span class="de-telefone-rotulo">Telefone ${index + 1}</span>
              ${
                podeRemover
                  ? `<button type="button" class="de-btn-remover-tel" data-remover-tel="${index}">Remover</button>`
                  : ""
              }
            </div>

            <div class="de-grid-endereco">
              <div class="de-field de-span-2">
                <label for="de-ddi-${index}" class="de-label">DDI</label>
                <input
                  id="de-ddi-${index}"
                  data-tel-campo="ddi"
                  data-tel-index="${index}"
                  type="text"
                  inputmode="numeric"
                  maxlength="3"
                  class="de-input"
                  value="${escaparHtml(tel.ddi)}"
                  ${disabledAttr}
                />
              </div>

              <div class="de-field de-span-2">
                <label for="de-ddd-${index}" class="de-label">DDD <span class="de-required">*</span></label>
                <input
                  id="de-ddd-${index}"
                  data-tel-campo="ddd"
                  data-tel-index="${index}"
                  type="text"
                  inputmode="numeric"
                  maxlength="2"
                  class="de-input"
                  value="${escaparHtml(tel.ddd)}"
                  ${disabledAttr}
                />
              </div>

              <div class="de-field de-span-4">
                <label for="de-numero-tel-${index}" class="de-label">Número <span class="de-required">*</span></label>
                <input
                  id="de-numero-tel-${index}"
                  data-tel-campo="numero"
                  data-tel-index="${index}"
                  type="text"
                  inputmode="tel"
                  class="de-input"
                  value="${escaparHtml(tel.numero)}"
                  ${disabledAttr}
                />
              </div>

              <div class="de-field de-span-4">
                <label for="de-tipo-tel-${index}" class="de-label">Tipo de telefone</label>
                <select
                  id="de-tipo-tel-${index}"
                  data-tel-campo="tipoTelefone"
                  data-tel-index="${index}"
                  class="de-select"
                  ${disabledAttr}
                >
                  ${TIPOS_TELEFONE.map(
                    tipo =>
                      `<option value="${escaparHtml(tipo)}" ${tel.tipoTelefone === tipo ? "selected" : ""}>${escaparHtml(tipo)}</option>`
                  ).join("")}
                </select>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderizar() {
    const disabledAttr = modoEdicao ? "" : "disabled";

    main.innerHTML = `
      <header class="de-header">
        <div>
          <h1 class="de-title">Dados da empresa</h1>
          <p class="de-subtitle">Gerencie as informações cadastrais, unidade, contato e endereço da empresa.</p>
        </div>

        <div class="de-header-actions">
          ${
            !modoEdicao
              ? `<button type="button" id="btn-editar-empresa" class="de-btn-primary">Editar dados</button>`
              : `
                <button type="button" id="btn-cancelar-empresa" class="de-btn-secondary">Cancelar</button>
                <button type="submit" form="form-dados-empresa" id="btn-salvar-empresa" class="de-btn-primary">Salvar alterações</button>
              `
          }
        </div>
      </header>

      ${
        mensagemFeedback
          ? `<div class="de-feedback de-feedback--${mensagemFeedback.tipo}" role="status">${escaparHtml(mensagemFeedback.texto)}</div>`
          : ""
      }

      <form id="form-dados-empresa" class="de-form" novalidate>
        <section class="de-card" aria-labelledby="sec-institucional">
          <div class="de-card-header">
            <h2 id="sec-institucional" class="de-card-title">
              <span class="de-card-icon" aria-hidden="true">🏢</span>
              Identificação institucional
            </h2>
            <p class="de-card-desc">Dados principais de identificação e classificação da empresa.</p>
          </div>

          <div class="de-grid-2">
            <div class="de-field">
              <label for="de-razao-social" class="de-label">Razão social <span class="de-required">*</span></label>
              <input
                id="de-razao-social"
                name="razaoSocial"
                type="text"
                class="de-input"
                value="${escaparHtml(rascunho.razaoSocial)}"
                ${disabledAttr}
              />
            </div>

            <div class="de-field">
              <label for="de-nome-fantasia" class="de-label">Nome fantasia <span class="de-required">*</span></label>
              <input
                id="de-nome-fantasia"
                name="nomeFantasia"
                type="text"
                class="de-input"
                value="${escaparHtml(rascunho.nomeFantasia)}"
                ${disabledAttr}
              />
            </div>

            <div class="de-field">
              <label for="de-cnpj" class="de-label">CNPJ <span class="de-required">*</span></label>
              <input
                id="de-cnpj"
                name="cnpj"
                type="text"
                inputmode="numeric"
                class="de-input"
                value="${escaparHtml(rascunho.cnpj)}"
                ${disabledAttr}
              />
            </div>

            <div class="de-field">
              <label for="de-unidade" class="de-label">Unidade <span class="de-required">*</span></label>
              <input
                id="de-unidade"
                name="unidade"
                type="text"
                placeholder="Ex.: Matriz, Unidade Sorocaba, Unidade São Paulo"
                class="de-input"
                value="${escaparHtml(rascunho.unidade)}"
                ${disabledAttr}
              />
            </div>

            <div class="de-field">
              <label for="de-tipo-empresa" class="de-label">Tipo de empresa</label>
              <select id="de-tipo-empresa" name="tipoEmpresa" class="de-select" ${disabledAttr}>
                ${["Matriz", "Filial", "Empresa Privada", "Empresa Pública", "Instituição de Ensino", "ONG / Terceiro Setor"]
                  .map(
                    tipo =>
                      `<option value="${escaparHtml(tipo)}" ${rascunho.tipoEmpresa === tipo ? "selected" : ""}>${escaparHtml(tipo)}</option>`
                  )
                  .join("")}
              </select>
            </div>

            <div class="de-field">
              <label for="de-porte-empresa" class="de-label">Porte da empresa</label>
              <select id="de-porte-empresa" name="porteEmpresa" class="de-select" ${disabledAttr}>
                ${["MEI", "Microempresa", "Pequeno porte", "Médio porte", "Grande porte"]
                  .map(
                    porte =>
                      `<option value="${escaparHtml(porte)}" ${rascunho.porteEmpresa === porte ? "selected" : ""}>${escaparHtml(porte)}</option>`
                  )
                  .join("")}
              </select>
            </div>
          </div>
        </section>

        <section class="de-card" aria-labelledby="sec-contato">
          <div class="de-card-header de-card-header--row">
            <div>
              <h2 id="sec-contato" class="de-card-title">
                <span class="de-card-icon" aria-hidden="true">📞</span>
                Telefone de contato
              </h2>
              <p class="de-card-desc">Telefones vinculados à unidade da empresa.</p>
            </div>

            ${
              modoEdicao
                ? `<button type="button" id="btn-adicionar-telefone" class="de-btn-adicionar-tel">+ Novo telefone</button>`
                : ""
            }
          </div>

          <div class="de-telefones-lista">
            ${renderizarTelefones(rascunho.telefones, disabledAttr)}
          </div>
        </section>

        <section class="de-card" aria-labelledby="sec-endereco">
          <div class="de-card-header">
            <h2 id="sec-endereco" class="de-card-title">
              <span class="de-card-icon" aria-hidden="true">📍</span>
              Endereço da unidade
            </h2>
            <p class="de-card-desc">Localização física desta unidade da empresa.</p>
          </div>

          <div class="de-grid-endereco">
            <div class="de-field de-span-2">
              <label for="de-cep" class="de-label">CEP</label>
              <input
                id="de-cep"
                name="cep"
                type="text"
                inputmode="numeric"
                class="de-input"
                value="${escaparHtml(rascunho.cep)}"
                ${disabledAttr}
              />
            </div>

            <div class="de-field de-span-6">
              <label for="de-logradouro" class="de-label">Logradouro</label>
              <input
                id="de-logradouro"
                name="logradouro"
                type="text"
                class="de-input"
                value="${escaparHtml(rascunho.logradouro)}"
                ${disabledAttr}
              />
            </div>

            <div class="de-field de-span-2">
              <label for="de-numero" class="de-label">Número</label>
              <input
                id="de-numero"
                name="numero"
                type="text"
                class="de-input"
                value="${escaparHtml(rascunho.numero)}"
                ${disabledAttr}
              />
            </div>

            <div class="de-field de-span-2">
              <label for="de-complemento" class="de-label">Complemento</label>
              <input
                id="de-complemento"
                name="complemento"
                type="text"
                class="de-input"
                value="${escaparHtml(rascunho.complemento)}"
                ${disabledAttr}
              />
            </div>

            <div class="de-field de-span-5">
              <label for="de-bairro" class="de-label">Bairro</label>
              <input
                id="de-bairro"
                name="bairro"
                type="text"
                class="de-input"
                value="${escaparHtml(rascunho.bairro)}"
                ${disabledAttr}
              />
            </div>

            <div class="de-field de-span-5">
              <label for="de-cidade" class="de-label">Cidade <span class="de-required">*</span></label>
              <input
                id="de-cidade"
                name="cidade"
                type="text"
                class="de-input"
                value="${escaparHtml(rascunho.cidade)}"
                ${disabledAttr}
              />
            </div>

            <div class="de-field de-span-2">
              <label for="de-estado" class="de-label">Estado (UF) <span class="de-required">*</span></label>
              <select id="de-estado" name="estado" class="de-select" ${disabledAttr}>
                ${ESTADOS_BR.map(
                  uf => `<option value="${uf}" ${rascunho.estado === uf ? "selected" : ""}>${uf}</option>`
                ).join("")}
              </select>
            </div>
          </div>
        </section>

        ${
          modoEdicao
            ? `
              <div class="de-footer-actions">
                <button type="button" id="btn-cancelar-empresa-rodape" class="de-btn-secondary">Cancelar</button>
                <button type="submit" class="de-btn-primary">Salvar alterações</button>
              </div>
            `
            : ""
        }
      </form>
    `;

    const form = main.querySelector("#form-dados-empresa");

    main.querySelector("#btn-editar-empresa")?.addEventListener("click", () => {
      rascunho = clonarDados(dadosSalvos);
      modoEdicao = true;
      mensagemFeedback = null;
      renderizar();
    });

    const cancelarEdicao = () => {
      rascunho = clonarDados(dadosSalvos);
      modoEdicao = false;
      mensagemFeedback = null;
      renderizar();
    };

    main.querySelector("#btn-cancelar-empresa")?.addEventListener("click", cancelarEdicao);
    main.querySelector("#btn-cancelar-empresa-rodape")?.addEventListener("click", cancelarEdicao);

    main.querySelector("#btn-adicionar-telefone")?.addEventListener("click", () => {
      const telefoneBase = rascunho.telefones[0] || { ddi: "55", ddd: "" };
      rascunho.telefones.push({
        id: `tel-${contadorTelefone++}`,
        ddi: telefoneBase.ddi || "55",
        ddd: telefoneBase.ddd || "",
        numero: "",
        tipoTelefone: "WhatsApp"
      });
      renderizar();
    });

    main.querySelectorAll("[data-remover-tel]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-remover-tel"));
        if (!Number.isNaN(idx) && rascunho.telefones.length > 1) {
          rascunho.telefones.splice(idx, 1);
          renderizar();
        }
      });
    });

    form?.addEventListener("input", e => {
      const target = e.target;
      if (!target) return;

      const telCampo = target.getAttribute("data-tel-campo");
      const telIndex = Number(target.getAttribute("data-tel-index"));

      if (telCampo && !Number.isNaN(telIndex) && rascunho.telefones[telIndex]) {
        let valor = target.value;
        if (telCampo === "ddi") {
          valor = valor.replace(/\D/g, "").slice(0, 3);
          target.value = valor;
        } else if (telCampo === "ddd") {
          valor = valor.replace(/\D/g, "").slice(0, 2);
          target.value = valor;
        } else if (telCampo === "numero") {
          valor = formatarNumeroTelefone(valor);
          target.value = valor;
        }
        rascunho.telefones[telIndex][telCampo] = valor;
        return;
      }

      if (!target.name) return;

      let valor = target.value;
      if (target.name === "cnpj") {
        valor = formatarCnpj(valor);
        target.value = valor;
      } else if (target.name === "cep") {
        valor = formatarCep(valor);
        target.value = valor;
      }

      rascunho[target.name] = valor;
    });

    form?.addEventListener("change", e => {
      const target = e.target;
      if (!target) return;

      const telCampo = target.getAttribute("data-tel-campo");
      const telIndex = Number(target.getAttribute("data-tel-index"));

      if (telCampo && !Number.isNaN(telIndex) && rascunho.telefones[telIndex]) {
        rascunho.telefones[telIndex][telCampo] = target.value;
        return;
      }

      if (!target.name) return;
      rascunho[target.name] = target.value;
    });

    form?.addEventListener("submit", e => {
      e.preventDefault();
      const erro = validarFormulario(rascunho);
      if (erro) {
        mensagemFeedback = { tipo: "erro", texto: erro };
        renderizar();
        return;
      }

      dadosSalvos = clonarDados(rascunho);
      modoEdicao = false;
      mensagemFeedback = {
        tipo: "sucesso",
        texto: "Dados da empresa atualizados com sucesso."
      };
      renderizar();
    });
  }

  renderizar();
  return container;
}